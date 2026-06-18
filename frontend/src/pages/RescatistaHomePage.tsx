import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { confirmRescueAlert, getRescueAlerts, type RescueAlert } from '@/services/rescue';

const RESCUE_STATUS_LABEL: Record<string, string> = {
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

export function RescatistaHomePage() {
  const [alerts, setAlerts] = useState<RescueAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const loadAlerts = useCallback(() => {
    setError('');
    getRescueAlerts()
      .then((r) => setAlerts(r.alerts))
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar alertas'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadAlerts();
    const poll = setInterval(loadAlerts, 30_000);
    return () => clearInterval(poll);
  }, [loadAlerts]);

  const handleConfirm = async (expeditionId: string) => {
    setConfirmingId(expeditionId);
    setError('');
    try {
      await confirmRescueAlert(expeditionId);
      loadAlerts();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo confirmar la alerta');
    } finally {
      setConfirmingId(null);
    }
  };

  const pending = alerts.filter((a) => !a.confirmedByMe);
  const confirmed = alerts.filter((a) => a.confirmedByMe);

  return (
    <div className="px-6 py-6 pb-8">
      <p className="text-sm text-muted-foreground mb-4">
        Expediciones en alerta que requieren confirmación de recepción.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
            <p className="text-2xl font-bold text-destructive">{pending.length}</p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
            <p className="text-2xl font-bold text-primary">{confirmed.length}</p>
            <p className="text-xs text-muted-foreground">Confirmadas</p>
          </div>
        </div>

      {error && <div className="error-banner mb-4">{error}</div>}

      {loading ? (
          <p className="text-sm text-muted-foreground">Cargando alertas…</p>
        ) : alerts.length === 0 ? (
          <div className="bg-muted rounded-2xl p-5 text-sm text-muted-foreground">
            No hay expediciones en alerta en este momento.
          </div>
        ) : (
          <div className="space-y-4">
            {pending.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-destructive uppercase tracking-wide mb-3 flex items-center gap-1">
                  <AlertTriangle size={14} /> Requieren confirmación
                </h2>
                <div className="space-y-3">
                  {pending.map((alert) => (
                    <AlertCard
                      key={alert.expeditionId}
                      alert={alert}
                      confirming={confirmingId === alert.expeditionId}
                      onConfirm={() => handleConfirm(alert.expeditionId)}
                    />
                  ))}
                </div>
              </section>
            )}

            {confirmed.length > 0 && (
              <section>
                <h2 className="text-xs font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-1">
                  <CheckCircle size={14} /> Confirmadas por ti
                </h2>
                <div className="space-y-3">
                  {confirmed.map((alert) => (
                    <AlertCard key={alert.expeditionId} alert={alert} confirmed />
                  ))}
                </div>
              </section>
            )}
        </div>
      )}
    </div>
  );
}

function AlertCard({
  alert,
  confirmed,
  confirming,
  onConfirm,
}: {
  alert: RescueAlert;
  confirmed?: boolean;
  confirming?: boolean;
  onConfirm?: () => void;
}) {
  return (
    <div
      className={`bg-card border rounded-2xl p-4 ${
        confirmed ? 'border-primary/30' : 'border-destructive/30'
      }`}
    >
      <div className="flex justify-between items-start gap-2 mb-3">
        <div>
          <p className="font-semibold">{alert.endLocation}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <User size={12} /> {alert.hikerFullName}
          </p>
        </div>
        {confirmed ? (
          <span className="text-xs font-bold px-2 py-1 rounded-lg bg-primary/10 text-primary">
            Confirmada
          </span>
        ) : (
          <span className="text-xs font-bold px-2 py-1 rounded-lg bg-destructive/10 text-destructive">
            Pendiente
          </span>
        )}
      </div>

      <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
        <p className="flex items-center gap-2">
          <MapPin size={14} /> {alert.startLocation} → {alert.endLocation}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={14} /> {alert.hikerPhone}
        </p>
        <p className="flex items-center gap-2">
          <Clock size={14} /> Alerta desde {formatDt(alert.alertSince)}
        </p>
        <p className="text-xs">Límite declarado: {formatDt(alert.deadlineAt)}</p>
      </div>

      {confirmed && alert.confirmedAt && (
        <p className="text-xs text-primary font-medium mb-2">
          Confirmaste el {formatDt(alert.confirmedAt)}
          {alert.rescueStatus && ` · ${RESCUE_STATUS_LABEL[alert.rescueStatus] ?? alert.rescueStatus}`}
        </p>
      )}

      {!confirmed && onConfirm && (
        <div className="space-y-2">
          <Link
            to={`/rescatista/alertas/${alert.expeditionId}`}
            className="w-full py-2.5 border border-border font-semibold rounded-xl text-sm flex items-center justify-center"
          >
            Ver ficha de emergencia
          </Link>
          <button
            type="button"
            onClick={onConfirm}
            disabled={confirming}
            className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            {confirming ? 'Confirmando…' : 'Confirmar recepción'}
          </button>
        </div>
      )}

      {confirmed && (
        <Link
          to={`/rescatista/alertas/${alert.expeditionId}`}
          className="w-full py-2.5 bg-primary/10 text-primary font-semibold rounded-xl text-sm flex items-center justify-center"
        >
          Ver ficha y bitácora
        </Link>
      )}
    </div>
  );
}
