import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  Clock,
  MapPin,
  Shield,
  Users,
  X,
} from 'lucide-react';
import { CheckInConfirmDialog } from '@/components/CheckInConfirmDialog';
import { useCountdown } from '@/hooks/useCountdown';
import { clearReminderDismissal } from '@/lib/returnReminder';
import { getActiveExpedition, type ActiveExpedition } from '@/services/expedition';

function formatTime(iso: string): string {
  return new Date(iso).toLocaleString('es-PE', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ActiveExpeditionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [expedition, setExpedition] = useState<ActiveExpedition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const countdown = useCountdown(expedition?.deadlineAt, expedition?.startTime);

  useEffect(() => {
    if (searchParams.get('checkIn') === '1') {
      setCheckInOpen(true);
    }
  }, [searchParams]);

  const loadActive = () => {
    getActiveExpedition()
      .then((r) => setExpedition(r.expedition))
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadActive();
    const poll = setInterval(() => {
      getActiveExpedition()
        .then((r) => setExpedition(r.expedition))
        .catch(() => undefined);
    }, 30_000);
    return () => clearInterval(poll);
  }, []);

  const handleCheckInSuccess = (checkedInAt: string) => {
    if (expedition) clearReminderDismissal(expedition.id);
    setCheckInOpen(false);
    navigate('/senderista/expedicion/confirmada', {
      state: {
        endLocation: expedition?.endLocation,
        checkedInAt,
      },
    });
  };

  if (loading) {
    return (
      <div className="px-6 py-12 text-center text-sm text-muted-foreground">Cargando expedición…</div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-6">
        <div className="error-banner mb-4">{error}</div>
        <Link to="/senderista/expedicion" className="text-sm text-primary font-semibold">
          Volver al listado
        </Link>
      </div>
    );
  }

  if (!expedition) {
    return (
      <div className="px-6 py-6">
        <Link to="/senderista" className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <ChevronLeft size={16} /> Inicio
        </Link>
        <h2 className="text-xl font-bold mb-2">Sin expedición activa</h2>
        <p className="text-sm text-muted-foreground mb-6">
          No tienes una ruta en curso. Registra una nueva expedición o revisa las programadas.
        </p>
        <div className="space-y-3">
          <Link to="/senderista/expedicion/nueva" className="btn-primary block text-center">
            Nueva expedición
          </Link>
          <Link
            to="/senderista/expedicion"
            className="block text-center py-3 text-sm font-semibold text-primary"
          >
            Ver mis expediciones
          </Link>
        </div>
      </div>
    );
  }

  const timerBg = countdown.expired
    ? 'bg-destructive'
    : countdown.isUrgent
      ? 'bg-amber-500'
      : 'bg-secondary';

  return (
    <div className="px-6 py-6 pb-8">
      {countdown.isUrgent && !countdown.expired && !bannerDismissed && (
        <div className="urgent-banner -mx-6 -mt-6 mb-4 flex items-center gap-3 px-5 py-3">
          <AlertTriangle size={18} className="flex-shrink-0" />
          <p className="text-sm font-semibold flex-1">
            Faltan {countdown.hours * 60 + countdown.minutes} min para tu límite — confirma retorno
          </p>
          <button
            type="button"
            onClick={() => setBannerDismissed(true)}
            className="btn-touch opacity-70 hover:opacity-100"
            aria-label="Cerrar aviso"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <Link to="/senderista" className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <ChevronLeft size={16} /> Inicio
      </Link>

      <p className="text-xs text-muted-foreground uppercase tracking-wide">Expedición activa</p>
      <h2 className="text-xl font-bold mb-5 leading-tight">{expedition.endLocation}</h2>

      {countdown.expired && (
        <div className="error-banner mb-4 flex items-start gap-2">
          <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
          <span>Plazo vencido. El sistema puede escalar tu expedición a alerta automáticamente.</span>
        </div>
      )}

      {countdown.isUrgent && !countdown.expired && (
        <div className="urgent-banner-subtle mb-4">
          Faltan menos de 30 minutos para el límite. Confirma tu retorno a tiempo para evitar una
          alerta automática.
        </div>
      )}

      <div className={`${timerBg} rounded-3xl px-6 py-8 text-center mb-5`}>
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
          Tiempo restante
        </p>
        <div className="flex items-end justify-center gap-1 mb-6">
          <span className="font-extrabold text-6xl text-white leading-none">
            {String(countdown.hours).padStart(2, '0')}
          </span>
          <span className="font-medium text-2xl text-white/40 mb-2">h</span>
          <span className="font-extrabold text-6xl text-white leading-none mx-1">
            {String(countdown.minutes).padStart(2, '0')}
          </span>
          <span className="font-medium text-2xl text-white/40 mb-2">m</span>
          <span className="font-extrabold text-6xl text-white leading-none">
            {String(countdown.seconds).padStart(2, '0')}
          </span>
          <span className="font-medium text-2xl text-white/40 mb-2">s</span>
        </div>
        <div className="h-1.5 bg-white/15 rounded-full overflow-hidden mb-2.5">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000"
            style={{ width: `${countdown.progressPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/40">
          <span>Salida {formatTime(expedition.startTime)}</span>
          <span>Límite {formatTime(expedition.deadlineAt)}</span>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border divide-y divide-border mb-4">
        {[
          { Icon: MapPin, label: 'Inicio', value: expedition.startLocation },
          { Icon: MapPin, label: 'Destino', value: expedition.endLocation },
          { Icon: Clock, label: 'Retorno estimado', value: formatTime(expedition.estimatedReturnTime) },
          {
            Icon: Users,
            label: 'Participantes',
            value: `${expedition.companionCount + 1} personas`,
          },
          { Icon: Activity, label: 'Tolerancia', value: `${expedition.toleranceMinutes} min` },
          {
            Icon: Shield,
            label: 'Contactos protegidos',
            value: `${expedition.contactCount} contactos`,
          },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3">
            <Icon size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground w-28 flex-shrink-0">{label}</span>
            <span className="text-sm font-medium flex-1">{value}</span>
          </div>
        ))}
      </div>

      {expedition.companions.length > 0 && (
        <div className="bg-muted rounded-2xl p-4 mb-4 text-sm">
          <p className="font-semibold mb-1">Cordada</p>
          <p className="text-muted-foreground">{expedition.companions.join(', ')}</p>
        </div>
      )}

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={15} className="text-primary" />
          <span className="text-sm font-bold text-primary">Monitoreo activo</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tus contactos serán notificados si no confirmas tu retorno antes del límite declarado.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setCheckInOpen(true)}
        className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 text-lg"
      >
        <CheckCircle size={22} />
        Registrar retorno seguro
      </button>

      <CheckInConfirmDialog
        expeditionId={expedition.id}
        open={checkInOpen}
        onClose={() => setCheckInOpen(false)}
        onSuccess={handleCheckInSuccess}
      />
    </div>
  );
}
