import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, X } from 'lucide-react';
import { getContacts, type EmergencyContact } from '@/services/user';
import { createExpedition } from '@/services/expedition';
import { FieldError, FieldLabel } from '@/components/Layout';

export function CreateExpeditionPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [estimatedReturnTime, setEstimatedReturnTime] = useState('');
  const [toleranceMinutes, setToleranceMinutes] = useState(30);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [companionNames, setCompanionNames] = useState<string[]>(['']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getContacts()
      .then((r) => setContacts(r.contacts))
      .catch(() => setContacts([]));
  }, []);

  const toggleContact = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const updateCompanion = (index: number, value: string) => {
    setCompanionNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  };

  const addCompanion = () => setCompanionNames((prev) => [...prev, '']);
  const removeCompanion = (index: number) =>
    setCompanionNames((prev) => prev.filter((_, i) => i !== index));

  const validCompanions = companionNames.map((n) => n.trim()).filter((n) => n.length >= 2);

  const canSubmit =
    startLocation.trim().length >= 3 &&
    endLocation.trim().length >= 3 &&
    startTime &&
    estimatedReturnTime &&
    selectedContactIds.length > 0 &&
    validCompanions.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setLoading(true);
    try {
      const startIso = new Date(startTime).toISOString();
      const returnIso = new Date(estimatedReturnTime).toISOString();

      const { expedition } = await createExpedition({
        startLocation: startLocation.trim(),
        endLocation: endLocation.trim(),
        startTime: startIso,
        estimatedReturnTime: returnIso,
        toleranceMinutes,
        contactIds: selectedContactIds,
        companionNames: validCompanions,
      });
      navigate(
        expedition.status === 'in_progress'
          ? '/senderista/expedicion/activa'
          : '/senderista/expedicion',
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar expedición');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <Link to="/senderista/expedicion" className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <ChevronLeft size={16} /> Expediciones
      </Link>

      <h2 className="text-xl font-bold mb-1">Nueva expedición</h2>
      <p className="text-sm text-muted-foreground mb-6">Registra tu itinerario y contactos de alerta.</p>

      {error && <div className="error-banner mb-4">{error}</div>}

      {contacts.length === 0 && (
        <div className="error-banner mb-4">
          Debes registrar al menos un contacto en{' '}
          <Link to="/senderista/perfil/contactos" className="underline font-semibold">
            Perfil → Contactos
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FieldLabel>Ubicación inicial</FieldLabel>
          <input
            className="input-field"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="Ej: Cebollapampa, Huaraz"
          />
        </div>
        <div>
          <FieldLabel>Destino / Nevado</FieldLabel>
          <input
            className="input-field"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="Ej: Laguna 69"
          />
        </div>
        <div>
          <FieldLabel>Fecha y hora de salida</FieldLabel>
          <input
            type="datetime-local"
            className="input-field"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Retorno estimado</FieldLabel>
          <input
            type="datetime-local"
            className="input-field"
            value={estimatedReturnTime}
            onChange={(e) => setEstimatedReturnTime(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel>Tolerancia (minutos)</FieldLabel>
          <input
            type="number"
            min={1}
            max={480}
            className="input-field"
            value={toleranceMinutes}
            onChange={(e) => setToleranceMinutes(Number(e.target.value))}
          />
        </div>

        <div>
          <FieldLabel>Contactos de alerta</FieldLabel>
          <div className="space-y-2 mt-2">
            {contacts.map((c) => (
              <label key={c.id} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                <input
                  type="checkbox"
                  checked={selectedContactIds.includes(c.id)}
                  onChange={() => toggleContact(c.id)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm">
                  {c.full_name} · {c.email}
                </span>
              </label>
            ))}
          </div>
          {selectedContactIds.length === 0 && (
            <FieldError message="Selecciona al menos un contacto" />
          )}
        </div>

        <div>
          <FieldLabel>Acompañantes de la cordada</FieldLabel>
          <div className="space-y-2 mt-2">
            {companionNames.map((name, index) => (
              <div key={index} className="flex gap-2">
                <input
                  className="input-field"
                  value={name}
                  onChange={(e) => updateCompanion(index, e.target.value)}
                  placeholder="Nombre completo"
                />
                {companionNames.length > 1 && (
                  <button type="button" onClick={() => removeCompanion(index)}>
                    <X size={18} className="text-muted-foreground mt-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addCompanion}
            className="mt-2 text-sm text-primary font-semibold flex items-center gap-1"
          >
            <Plus size={16} /> Agregar acompañante
          </button>
        </div>

        <button type="submit" className="btn-primary" disabled={!canSubmit || loading}>
          {loading ? 'Registrando…' : 'Registrar expedición'}
        </button>
      </form>
    </div>
  );
}
