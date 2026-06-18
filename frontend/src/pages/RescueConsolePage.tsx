import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  Search,
  User,
} from 'lucide-react';
import {
  getRescueExpeditions,
  type RescueExpedition,
  type RescueExpeditionRiskLevel,
} from '@/services/rescue';

const RISK_META: Record<
  RescueExpeditionRiskLevel,
  { label: string; badge: string; card: string; dot: string }
> = {
  green: {
    label: 'En plazo',
    badge: 'bg-emerald-100 text-emerald-700',
    card: 'border-emerald-200 bg-emerald-50/30',
    dot: 'bg-emerald-500',
  },
  yellow: {
    label: 'Próximo al límite',
    badge: 'bg-amber-100 text-amber-700',
    card: 'border-amber-200 bg-amber-50/40',
    dot: 'bg-amber-500',
  },
  red: {
    label: 'Alerta activa',
    badge: 'bg-red-100 text-red-700',
    card: 'border-red-300 bg-red-50/50',
    dot: 'bg-red-600',
  },
};

function formatDt(iso: string): string {
  return new Date(iso).toLocaleString('es-PE', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatTimeStatus(exp: RescueExpedition): string {
  if (exp.riskLevel === 'red') {
    if (exp.minutesOverdue && exp.minutesOverdue > 0) {
      const h = Math.floor(exp.minutesOverdue / 60);
      const m = exp.minutesOverdue % 60;
      return h > 0 ? `Vencido ${h}h ${m}m` : `Vencido ${m} min`;
    }
    return 'Plazo vencido';
  }
  if (exp.minutesRemaining != null) {
    const h = Math.floor(exp.minutesRemaining / 60);
    const m = exp.minutesRemaining % 60;
    return h > 0 ? `${h}h ${m}m restantes` : `${m} min restantes`;
  }
  return `Límite: ${formatDt(exp.deadlineAt)}`;
}

export function RescueConsolePage() {
  const [expeditions, setExpeditions] = useState<RescueExpedition[]>([]);
  const [zoneInput, setZoneInput] = useState('');
  const [appliedZone, setAppliedZone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadExpeditions = useCallback(() => {
    setError('');
    getRescueExpeditions(appliedZone || undefined)
      .then((r) => setExpeditions(r.expeditions))
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar expediciones'))
      .finally(() => setLoading(false));
  }, [appliedZone]);

  useEffect(() => {
    setLoading(true);
    loadExpeditions();
    const poll = setInterval(loadExpeditions, 30_000);
    return () => clearInterval(poll);
  }, [loadExpeditions]);

  const counts = useMemo(
    () => ({
      green: expeditions.filter((e) => e.riskLevel === 'green').length,
      yellow: expeditions.filter((e) => e.riskLevel === 'yellow').length,
      red: expeditions.filter((e) => e.riskLevel === 'red').length,
    }),
    [expeditions],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedZone(zoneInput.trim());
  };

  const handleClearZone = () => {
    setZoneInput('');
    setAppliedZone('');
  };

  return (
    <div className="px-6 py-6">
      <p className="text-sm text-muted-foreground mb-4">
        Monitoreo en tiempo real de expediciones en curso y alertas activas.
      </p>

      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={zoneInput}
            onChange={(e) => setZoneInput(e.target.value)}
            placeholder="Filtrar por zona o destino…"
            className="input-field pl-9"
            aria-label="Filtrar por zona"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl text-sm font-semibold">
          Buscar
        </button>
      </form>

      {appliedZone && (
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="text-muted-foreground">
            Zona: <strong className="text-foreground">{appliedZone}</strong>
          </span>
          <button type="button" onClick={handleClearZone} className="text-primary font-semibold">
            Limpiar
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 mb-6">
        {(['green', 'yellow', 'red'] as const).map((level) => (
          <div
            key={level}
            className={`rounded-2xl border p-3 text-center ${RISK_META[level].card}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full mx-auto mb-2 ${RISK_META[level].dot}`} />
            <p className="text-xl font-bold">{counts[level]}</p>
            <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
              {RISK_META[level].label}
            </p>
          </div>
        ))}
      </div>

      {error && <div className="error-banner mb-4">{error}</div>}

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando expediciones…</p>
      ) : expeditions.length === 0 ? (
        <div className="bg-muted rounded-2xl p-5 text-sm text-muted-foreground">
          {appliedZone
            ? 'No hay expediciones activas en esa zona.'
            : 'No hay expediciones en curso ni alertas activas.'}
        </div>
      ) : (
        <div className="space-y-3">
          {expeditions.map((exp) => (
            <ExpeditionCard key={exp.expeditionId} expedition={exp} />
          ))}
        </div>
      )}
    </div>
  );
}

function ExpeditionCard({ expedition }: { expedition: RescueExpedition }) {
  const meta = RISK_META[expedition.riskLevel];

  return (
    <article className={`border rounded-2xl p-4 ${meta.card}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${meta.dot}`} />
          <div className="min-w-0">
            <p className="font-semibold truncate">{expedition.endLocation}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <User size={12} /> {expedition.hikerFullName}
            </p>
          </div>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${meta.badge}`}>
          {meta.label}
        </span>
      </div>

      <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
        <p className="flex items-center gap-2">
          <MapPin size={14} className="flex-shrink-0" />
          <span className="truncate">
            {expedition.startLocation} → {expedition.endLocation}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <Phone size={14} /> {expedition.hikerPhone}
        </p>
        <p className="flex items-center gap-2 font-medium text-foreground">
          <Clock size={14} /> {formatTimeStatus(expedition)}
        </p>
        <p className="text-xs">Límite: {formatDt(expedition.deadlineAt)}</p>
      </div>

      {expedition.riskLevel === 'red' && (
        <Link
          to={`/rescatista/alertas/${expedition.expeditionId}`}
          className="w-full py-2.5 bg-destructive text-destructive-foreground font-semibold rounded-xl text-sm flex items-center justify-center gap-2"
        >
          <AlertTriangle size={16} />
          {expedition.confirmedByMe ? 'Ver ficha y bitácora' : 'Gestionar alerta'}
        </Link>
      )}
    </article>
  );
}
