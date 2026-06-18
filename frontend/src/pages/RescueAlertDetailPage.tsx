import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  Clock,
  Heart,
  MapPin,
  Phone,
  Users,
} from 'lucide-react';
import {
  confirmRescueAlert,
  getRescueAlertDetail,
  updateRescueLog,
  type RescueAlertDetail,
  type RescueStatus,
} from '@/services/rescue';

const RESCUE_STATUS_LABEL: Record<RescueStatus, string> = {
  en_busqueda: 'En búsqueda',
  localizados: 'Localizados',
  cerrado: 'Cerrado',
};

function formatDt(iso: string): string {
  return new Date(iso).toLocaleString('es-PE', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function RescueAlertDetailPage() {
  const { expeditionId } = useParams<{ expeditionId: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<RescueAlertDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusRescue, setStatusRescue] = useState<RescueStatus>('en_busqueda');
  const [notes, setNotes] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const loadDetail = useCallback(() => {
    if (!expeditionId) return;
    setError('');
    getRescueAlertDetail(expeditionId)
      .then((r) => {
        setDetail(r.alert);
        if (r.alert.rescueLog) {
          setStatusRescue(r.alert.rescueLog.statusRescue as RescueStatus);
          setNotes(r.alert.rescueLog.notes ?? '');
        }
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar ficha'))
      .finally(() => setLoading(false));
  }, [expeditionId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const handleConfirm = async () => {
    if (!expeditionId) return;
    setConfirming(true);
    setError('');
    try {
      await confirmRescueAlert(expeditionId);
      loadDetail();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo confirmar');
    } finally {
      setConfirming(false);
    }
  };

  const handleSaveLog = async () => {
    if (!expeditionId) return;
    setSaving(true);
    setError('');
    setSavedMsg('');
    try {
      await updateRescueLog(expeditionId, { statusRescue, notes: notes.trim() || undefined });
      setSavedMsg('Bitácora guardada');
      loadDetail();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo guardar');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="px-6 py-6 text-sm text-muted-foreground">Cargando ficha de emergencia…</p>;
  }

  if (!detail) {
    return (
      <div className="px-6 py-6">
        <div className="error-banner mb-4">{error || 'Alerta no encontrada'}</div>
        <button type="button" onClick={() => navigate('/rescatista/alertas')} className="text-primary text-sm font-semibold">
          Volver a alertas
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-6 pb-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
      >
        <ChevronLeft size={18} /> Volver
      </button>

      <div className="flex items-start justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold">{detail.endLocation}</h2>
          <p className="text-sm text-muted-foreground mt-1">{detail.hikerFullName}</p>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-lg bg-red-100 text-red-700">
          Alerta activa
        </span>
      </div>

      {error && <div className="error-banner mb-4">{error}</div>}
      {savedMsg && (
        <div className="mb-4 p-3 rounded-xl bg-primary/10 text-primary text-sm font-medium">
          {savedMsg}
        </div>
      )}

      {!detail.rescueLog && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-3">
            Confirma la recepción de esta alerta para habilitar la bitácora de rescate.
          </p>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={confirming}
            className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            {confirming ? 'Confirmando…' : 'Confirmar recepción'}
          </button>
        </div>
      )}

      <section className="bg-card border border-border rounded-2xl p-4 mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1">
          <MapPin size={14} /> Ruta declarada
        </h3>
        <p className="font-medium">{detail.startLocation} → {detail.endLocation}</p>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock size={14} /> Salida: {formatDt(detail.startTime)}
          </p>
          <p className="flex items-center gap-2">
            <Clock size={14} /> Retorno estimado: {formatDt(detail.estimatedReturnTime)}
          </p>
          <p className="flex items-center gap-2">
            <AlertTriangle size={14} /> Límite: {formatDt(detail.deadlineAt)}
          </p>
          <p className="text-xs">Alerta desde {formatDt(detail.alertSince)}</p>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm">
          <Phone size={14} className="text-muted-foreground" /> {detail.hikerPhone}
        </p>
      </section>

      <section className="bg-card border border-border rounded-2xl p-4 mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1">
          <Users size={14} /> Cordada
        </h3>
        <p className="text-sm">
          {detail.companions.length > 0 ? detail.companions.join(', ') : 'Sin acompañantes declarados'}
        </p>
      </section>

      {detail.emergencyContacts.length > 0 && (
        <section className="bg-card border border-border rounded-2xl p-4 mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
            Contactos de emergencia
          </h3>
          <div className="space-y-3">
            {detail.emergencyContacts.map((c) => (
              <div key={`${c.fullName}-${c.phone}`} className="text-sm">
                <p className="font-medium">{c.fullName}</p>
                <p className="text-muted-foreground text-xs">{c.relationship}</p>
                <p className="text-muted-foreground">{c.phone} · {c.email}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-card border border-border rounded-2xl p-4 mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1">
          <Heart size={14} /> Ficha médica autorizada
        </h3>
        {detail.medical ? (
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-muted-foreground text-xs">Tipo de sangre</dt>
              <dd className="font-medium">{detail.medical.bloodType}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">Alergias</dt>
              <dd>{detail.medical.allergies || 'No declaradas'}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">Condiciones</dt>
              <dd>{detail.medical.conditions || 'No declaradas'}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">Medicación</dt>
              <dd>{detail.medical.medications || 'No declarada'}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">Sin ficha médica autorizada registrada.</p>
        )}
      </section>

      {detail.rescueLog && (
        <section className="bg-card border border-border rounded-2xl p-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3">
            Bitácora de rescate
          </h3>
          <label className="block text-sm font-medium mb-1.5" htmlFor="rescue-status">
            Estado del incidente
          </label>
          <select
            id="rescue-status"
            value={statusRescue}
            onChange={(e) => setStatusRescue(e.target.value as RescueStatus)}
            className="input-field mb-4"
          >
            {(Object.keys(RESCUE_STATUS_LABEL) as RescueStatus[]).map((s) => (
              <option key={s} value={s}>
                {RESCUE_STATUS_LABEL[s]}
              </option>
            ))}
          </select>

          <label className="block text-sm font-medium mb-1.5" htmlFor="rescue-notes">
            Notas operativas
          </label>
          <textarea
            id="rescue-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Registro de acciones, ubicación, coordinación…"
            className="input-field min-h-24 resize-none mb-4"
          />

          {detail.rescueLog.updatedAt && (
            <p className="text-xs text-muted-foreground mb-3">
              Última actualización: {formatDt(detail.rescueLog.updatedAt)}
            </p>
          )}

          <button
            type="button"
            onClick={handleSaveLog}
            disabled={saving}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl"
          >
            {saving ? 'Guardando…' : 'Guardar bitácora'}
          </button>
        </section>
      )}

      <Link
        to="/rescatista/alertas"
        className="block text-center text-sm text-primary font-semibold mt-6"
      >
        Ver todas las alertas
      </Link>
    </div>
  );
}
