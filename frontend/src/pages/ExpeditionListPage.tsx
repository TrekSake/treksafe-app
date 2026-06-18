import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Plus } from 'lucide-react';
import { getExpeditions, type Expedition } from '@/services/expedition';

const STATUS_LABEL: Record<string, string> = {
  programmed: 'Programada',
  in_progress: 'En curso',
  completed: 'Completada',
  alert: 'Alerta',
};

export function ExpeditionListPage() {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getExpeditions()
      .then((r) => setExpeditions(r.expeditions))
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'));
  }, []);

  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Expediciones</h2>
        <Link
          to="/senderista/expedicion/nueva"
          className="flex items-center gap-1 text-sm text-primary font-semibold"
        >
          <Plus size={16} /> Nueva
        </Link>
      </div>

      {error && <div className="error-banner mb-4">{error}</div>}

      <div className="space-y-3">
        {expeditions.map((exp) => {
          const isActive = exp.status === 'in_progress';
          const card = (
            <div
              className={`bg-card border border-border rounded-2xl p-4 ${
                isActive ? 'border-primary/30' : ''
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <p className="font-semibold">{exp.end_location}</p>
                  <p className="text-xs text-muted-foreground mt-1">Desde: {exp.start_location}</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded-lg bg-muted">
                  {STATUS_LABEL[exp.status] ?? exp.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Salida: {new Date(exp.start_time).toLocaleString('es-PE')}
              </p>
              <p className="text-sm text-muted-foreground">
                Retorno: {new Date(exp.estimated_return_time).toLocaleString('es-PE')}
              </p>
              {isActive && (
                <p className="text-sm text-primary font-semibold mt-3 flex items-center gap-1">
                  Ver expedición activa <ChevronRight size={16} />
                </p>
              )}
            </div>
          );

          return isActive ? (
            <Link key={exp.id} to="/senderista/expedicion/activa" className="block">
              {card}
            </Link>
          ) : (
            <div key={exp.id}>{card}</div>
          );
        })}
        {expeditions.length === 0 && (
          <p className="text-sm text-muted-foreground">No hay expediciones registradas.</p>
        )}
      </div>
    </div>
  );
}
