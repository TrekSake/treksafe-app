import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Mountain } from 'lucide-react';
import {
  getExpeditionHistory,
  type CompletedExpedition,
  type ExpeditionHistoryStats,
} from '@/services/expedition';

function formatDt(iso: string): string {
  return new Date(iso).toLocaleString('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function ExpeditionHistoryPage() {
  const [expeditions, setExpeditions] = useState<CompletedExpedition[]>([]);
  const [stats, setStats] = useState<ExpeditionHistoryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getExpeditionHistory()
      .then((r) => {
        setExpeditions(r.expeditions);
        setStats(r.stats);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar historial'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-6 py-6">
      <Link
        to="/senderista/perfil"
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
      >
        <ChevronLeft size={18} /> Perfil
      </Link>

      <h2 className="text-xl font-bold mb-1">Historial de montaña</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Expediciones finalizadas con check-in confirmado.
      </p>

      {error && <div className="error-banner mb-4">{error}</div>}

      {stats && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card border border-border rounded-2xl p-4">
            <Mountain size={18} className="text-primary mb-2" />
            <p className="text-2xl font-bold">{stats.totalCompleted}</p>
            <p className="text-xs text-muted-foreground">Completadas</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <MapPin size={18} className="text-secondary mb-2" />
            <p className="text-2xl font-bold">{stats.uniqueDestinations}</p>
            <p className="text-xs text-muted-foreground">Destinos distintos</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 col-span-2">
            <p className="text-sm text-muted-foreground">Duración media declarada</p>
            <p className="text-xl font-bold mt-1">{stats.averageDurationHours} h</p>
            {stats.lastCompletedAt && (
              <p className="text-xs text-muted-foreground mt-2">
                Última: {formatDt(stats.lastCompletedAt)}
              </p>
            )}
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-muted-foreground">Cargando historial…</p>
      ) : expeditions.length === 0 ? (
        <div className="bg-muted rounded-2xl p-5 text-sm text-muted-foreground">
          Aún no tienes expediciones completadas. Confirma tu retorno al finalizar cada ruta.
        </div>
      ) : (
        <div className="space-y-3">
          {expeditions.map((exp) => (
            <div key={exp.id} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold">{exp.end_location}</p>
                  <p className="text-xs text-muted-foreground mt-1">Desde: {exp.start_location}</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-primary/10 text-primary">
                  Completada
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Salida: {formatDt(exp.start_time)}
              </p>
              <p className="text-sm text-muted-foreground">
                Retorno: {formatDt(exp.estimated_return_time)}
              </p>
              {exp.updated_at && (
                <p className="text-xs text-primary font-medium mt-2">
                  Check-in: {formatDt(exp.updated_at)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
