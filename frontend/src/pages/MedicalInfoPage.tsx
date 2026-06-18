import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { getMedicalInfo, saveMedicalInfo } from '@/services/user';
import { FieldError, FieldLabel } from '@/components/Layout';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export function MedicalInfoPage() {
  const [bloodType, setBloodType] = useState<string>('O+');
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMedicalInfo()
      .then(({ medicalInfo }) => {
        if (!medicalInfo) return;
        setBloodType(medicalInfo.bloodType);
        setAllergies(medicalInfo.allergies);
        setConditions(medicalInfo.conditions);
        setMedications(medicalInfo.medications);
        setConsent(medicalInfo.consentSigned);
      })
      .catch(() => undefined);
  }, []);

  const canSave = consent && bloodType;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await saveMedicalInfo({
        bloodType,
        allergies,
        conditions,
        medications,
        consentSigned: true,
      });
      setSuccess('Ficha médica guardada correctamente');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-6">
      <Link to="/senderista/perfil" className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <ChevronLeft size={16} /> Perfil
      </Link>

      <h2 className="text-xl font-bold mb-1">Ficha médica</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Datos cifrados en servidor (AES-256). Solo visibles en alerta activa.
      </p>

      {error && <div className="error-banner mb-4">{error}</div>}
      {success && (
        <div className="bg-primary/10 border border-primary/30 text-primary rounded-xl p-3 text-sm mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FieldLabel>Grupo sanguíneo</FieldLabel>
          <select className="input-field" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            {BLOOD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel>Alergias</FieldLabel>
          <input
            className="input-field"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            placeholder="Ej: Penicilina"
          />
        </div>

        <div>
          <FieldLabel>Condiciones médicas</FieldLabel>
          <textarea
            className="input-field min-h-20 resize-none"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            placeholder="Condiciones preexistentes relevantes"
          />
        </div>

        <div>
          <FieldLabel>Medicamentos habituales</FieldLabel>
          <input
            className="input-field"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            placeholder="Ej: Ibuprofeno"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 accent-primary"
          />
          <span className="text-sm leading-relaxed">
            Autorizo revelar estos datos únicamente en situaciones de alerta activa (Ley N° 29733).
          </span>
        </label>
        {!consent && <FieldError message="El consentimiento es obligatorio para guardar" />}

        <button type="submit" className="btn-primary" disabled={!canSave || loading}>
          {loading ? 'Guardando…' : 'Guardar ficha médica'}
        </button>
      </form>
    </div>
  );
}
