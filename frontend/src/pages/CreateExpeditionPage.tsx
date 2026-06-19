import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Globe, Plus, WifiOff, X } from 'lucide-react';
import { FieldError, FieldLabel } from '@/components/Layout';
import { CoordinatePickerMapLazy } from '@/components/maps/CoordinatePickerMapLazy';
import type { CoordinatePickerTarget } from '@/components/maps/CoordinatePickerMap';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { validateCoordinateInput } from '@/lib/coordinates';
import { cacheContacts, getCachedContacts } from '@/lib/offlineContacts';
import {
  listExpeditionDrafts,
  listRouteTemplates,
  removeExpeditionDraft,
  saveExpeditionDraft,
  saveRouteTemplate,
  type RouteTemplate,
} from '@/lib/offlineExpedition';
import { getContacts, type EmergencyContact } from '@/services/user';
import { createExpedition } from '@/services/expedition';

export function CreateExpeditionPage() {
  const navigate = useNavigate();
  const online = useOnlineStatus();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [templates, setTemplates] = useState<RouteTemplate[]>([]);
  const [pendingDrafts, setPendingDrafts] = useState(0);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startCoordinates, setStartCoordinates] = useState('');
  const [endCoordinates, setEndCoordinates] = useState('');
  const [startCoordError, setStartCoordError] = useState('');
  const [endCoordError, setEndCoordError] = useState('');
  const [startTime, setStartTime] = useState('');
  const [estimatedReturnTime, setEstimatedReturnTime] = useState('');
  const [toleranceMinutes, setToleranceMinutes] = useState(30);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [companionNames, setCompanionNames] = useState<string[]>(['']);
  const [pickerTarget, setPickerTarget] = useState<CoordinatePickerTarget>('start');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void listRouteTemplates().then(setTemplates);
    void listExpeditionDrafts().then((d) => setPendingDrafts(d.length));

    if (online) {
      getContacts()
        .then((r) => {
          setContacts(r.contacts);
          void cacheContacts(r.contacts);
        })
        .catch(() => {
          void getCachedContacts().then(setContacts);
        });
    } else {
      void getCachedContacts().then(setContacts);
    }
  }, [online]);

  useEffect(() => {
    if (!online) return;

    const syncDrafts = async () => {
      const drafts = await listExpeditionDrafts();
      if (drafts.length === 0) return;

      for (const draft of drafts) {
        try {
          await createExpedition({
            startLocation: draft.startLocation,
            endLocation: draft.endLocation,
            startCoordinates: draft.startCoordinates || undefined,
            endCoordinates: draft.endCoordinates || undefined,
            startTime: draft.startTime,
            estimatedReturnTime: draft.estimatedReturnTime,
            toleranceMinutes: draft.toleranceMinutes,
            contactIds: draft.contactIds,
            companionNames: draft.companionNames,
          });
          await removeExpeditionDraft(draft.id);
        } catch {
          break;
        }
      }

      const remaining = await listExpeditionDrafts();
      setPendingDrafts(remaining.length);
      if (remaining.length === 0) {
        setInfo('Borradores offline sincronizados con el servidor.');
      }
    };

    void syncDrafts();
  }, [online]);

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

  const applyTemplate = (template: RouteTemplate) => {
    setStartLocation(template.startLocation);
    setEndLocation(template.endLocation);
    setStartCoordinates(template.startCoordinates ?? '');
    setEndCoordinates(template.endCoordinates ?? '');
    setToleranceMinutes(template.toleranceMinutes);
    setStartCoordError('');
    setEndCoordError('');
  };

  const validateCoords = (): boolean => {
    let ok = true;
    if (startCoordinates.trim()) {
      const err = validateCoordinateInput(startCoordinates);
      setStartCoordError(err ?? '');
      if (err) ok = false;
    } else {
      setStartCoordError('');
    }
    if (endCoordinates.trim()) {
      const err = validateCoordinateInput(endCoordinates);
      setEndCoordError(err ?? '');
      if (err) ok = false;
    } else {
      setEndCoordError('');
    }
    if (startTime && estimatedReturnTime && new Date(estimatedReturnTime) <= new Date(startTime)) {
      setError('La hora de retorno debe ser posterior a la hora de salida');
      ok = false;
    } else if (!error.startsWith('La hora')) {
      setError('');
    }
    return ok;
  };

  const validCompanions = companionNames.map((n) => n.trim()).filter((n) => n.length >= 2);

  const canSubmit =
    startLocation.trim().length >= 3 &&
    endLocation.trim().length >= 3 &&
    startTime &&
    estimatedReturnTime &&
    selectedContactIds.length > 0 &&
    validCompanions.length > 0 &&
    !startCoordError &&
    !endCoordError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !validateCoords()) return;

    const payload = {
      startLocation: startLocation.trim(),
      endLocation: endLocation.trim(),
      startCoordinates: startCoordinates.trim() || undefined,
      endCoordinates: endCoordinates.trim() || undefined,
      startTime: new Date(startTime).toISOString(),
      estimatedReturnTime: new Date(estimatedReturnTime).toISOString(),
      toleranceMinutes,
      contactIds: selectedContactIds,
      companionNames: validCompanions,
    };

    setError('');
    setInfo('');
    setLoading(true);

    if (!online) {
      await saveExpeditionDraft({
        ...payload,
        startCoordinates: startCoordinates.trim(),
        endCoordinates: endCoordinates.trim(),
      });
      await saveRouteTemplate({
        startLocation: payload.startLocation,
        endLocation: payload.endLocation,
        startCoordinates: payload.startCoordinates,
        endCoordinates: payload.endCoordinates,
        toleranceMinutes: payload.toleranceMinutes,
      });
      const remaining = await listExpeditionDrafts();
      setPendingDrafts(remaining.length);
      setTemplates(await listRouteTemplates());
      setInfo('Sin conexión: borrador guardado en caché offline (Service Worker) para sincronizar después.');
      setLoading(false);
      return;
    }

    try {
      const { expedition } = await createExpedition(payload);
      await saveRouteTemplate({
        startLocation: payload.startLocation,
        endLocation: payload.endLocation,
        startCoordinates: payload.startCoordinates,
        endCoordinates: payload.endCoordinates,
        toleranceMinutes: payload.toleranceMinutes,
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
      <p className="text-sm text-muted-foreground mb-4">Registra tu itinerario y contactos de alerta.</p>

      {!online && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-100 text-sm flex items-center gap-2">
          <WifiOff size={16} /> Modo offline: plantillas y borradores en caché del Service Worker.
        </div>
      )}

      {pendingDrafts > 0 && online && (
        <div className="mb-4 p-3 rounded-xl bg-primary/10 text-primary text-sm">
          {pendingDrafts} borrador(es) pendiente(s) de sincronización.
        </div>
      )}

      {info && <div className="mb-4 p-3 rounded-xl bg-primary/10 text-primary text-sm">{info}</div>}
      {error && <div className="error-banner mb-4">{error}</div>}

      {templates.length > 0 && (
        <div className="mb-6">
          <FieldLabel>Plantillas de ruta frecuente</FieldLabel>
          <div className="flex gap-2 overflow-x-auto pb-1 mt-2">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyTemplate(t)}
                className="flex-shrink-0 px-3 py-2 bg-card border border-border rounded-xl text-xs font-medium"
              >
                {t.endLocation}
              </button>
            ))}
          </div>
        </div>
      )}

      {contacts.length === 0 && (
        <div className="error-banner mb-4">
          {online ? (
            <>
              Debes registrar al menos un contacto en{' '}
              <Link to="/senderista/perfil/contactos" className="underline font-semibold">
                Perfil → Contactos
              </Link>
            </>
          ) : (
            'Sin contactos en caché. Conéctate una vez para sincronizar contactos antes de salir offline.'
          )}
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
          <FieldLabel>Coordenadas de salida (opcional)</FieldLabel>
          <input
            className={`input-field ${startCoordError ? 'input-error' : ''}`}
            value={startCoordinates}
            onChange={(e) => {
              setStartCoordinates(e.target.value);
              if (startCoordError) setStartCoordError('');
            }}
            onBlur={() => {
              if (startCoordinates.trim()) {
                setStartCoordError(validateCoordinateInput(startCoordinates) ?? '');
              }
            }}
            placeholder="-9.5105, -77.5275"
          />
          {startCoordError && <FieldError message={startCoordError} />}
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Globe size={12} /> Formato decimal. Ejemplo: -9.0105, -77.6042
          </p>
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
          <FieldLabel>Coordenadas de destino (opcional)</FieldLabel>
          <input
            className={`input-field ${endCoordError ? 'input-error' : ''}`}
            value={endCoordinates}
            onChange={(e) => {
              setEndCoordinates(e.target.value);
              if (endCoordError) setEndCoordError('');
            }}
            onBlur={() => {
              if (endCoordinates.trim()) {
                setEndCoordError(validateCoordinateInput(endCoordinates) ?? '');
              }
            }}
            placeholder="-9.0105, -77.6042"
          />
          {endCoordError && <FieldError message={endCoordError} />}
        </div>

        {online && (
          <div>
            <FieldLabel>Ubicación en mapa (opcional)</FieldLabel>
            <CoordinatePickerMapLazy
              className="mt-2"
              activeTarget={pickerTarget}
              onActiveTargetChange={setPickerTarget}
              startCoordinates={startCoordinates}
              endCoordinates={endCoordinates}
              startLabel={startLocation}
              endLabel={endLocation}
              onStartChange={(value) => {
                setStartCoordinates(value);
                if (startCoordError) setStartCoordError('');
              }}
              onEndChange={(value) => {
                setEndCoordinates(value);
                if (endCoordError) setEndCoordError('');
              }}
              onStartError={setStartCoordError}
              onEndError={setEndCoordError}
            />
          </div>
        )}

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
          {loading
            ? 'Registrando…'
            : online
              ? 'Registrar expedición'
              : 'Guardar borrador offline'}
        </button>
      </form>
    </div>
  );
}
