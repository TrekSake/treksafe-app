import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle, ChevronLeft, Database, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { revokePersonalData, type DataRevocationAction } from '@/services/user';

export function DataRevocationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [modal, setModal] = useState<DataRevocationAction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'delete_personal' || action === 'anonymize_routes') {
      setModal(action);
    }
  }, [searchParams]);

  const handleConfirm = async () => {
    if (!modal) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const result = await revokePersonalData(modal);
      setSuccess(result.message);
      setModal(null);
      if (modal === 'delete_personal') {
        setTimeout(() => {
          logout();
          navigate('/login', { replace: true });
        }, 2000);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo procesar la solicitud');
      setModal(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-6 pb-8">
      <Link
        to="/senderista/perfil/privacidad"
        className="flex items-center gap-1 text-sm text-muted-foreground mb-4"
      >
        <ChevronLeft size={18} /> Privacidad
      </Link>

      <h2 className="text-xl font-bold mb-1">Solicitud de datos personales</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Ejerce tus derechos de acceso, rectificación, cancelación y oposición.
      </p>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 mb-6">
        <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-900 dark:text-amber-100 leading-relaxed">
          No puedes revocar datos si tienes una expedición en curso o en alerta activa.
        </p>
      </div>

      {error && <div className="error-banner mb-4">{error}</div>}
      {success && (
        <div className="mb-4 p-3 rounded-xl bg-primary/10 text-primary text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Trash2 size={20} className="text-destructive" />
            <h3 className="font-bold">Eliminar mis datos</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Elimina ficha médica, contactos de emergencia y expediciones finalizadas o programadas.
          </p>
          <button
            type="button"
            onClick={() => setModal('delete_personal')}
            className="w-full py-3 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl font-semibold text-sm"
          >
            Solicitar eliminación
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Database size={20} className="text-amber-600" />
            <h3 className="font-bold">Anonimizar historial</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Conserva el conteo de expediciones completadas sin ubicaciones ni cordada identificable.
          </p>
          <button
            type="button"
            onClick={() => setModal('anonymize_routes')}
            className="w-full py-3 bg-amber-500/10 text-amber-800 dark:text-amber-200 border border-amber-500/30 rounded-xl font-semibold text-sm"
          >
            Solicitar anonimización
          </button>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => !loading && setModal(null)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="revoke-dialog-title"
            className="relative w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl"
          >
            <h3 id="revoke-dialog-title" className="font-bold text-lg mb-2 text-center">
              Confirmar solicitud
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-5 leading-relaxed">
              {modal === 'delete_personal'
                ? 'Se eliminarán datos personales sensibles de forma irreversible.'
                : 'Las rutas completadas quedarán anonimizadas en el sistema.'}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setModal(null)}
                disabled={loading}
                className="flex-1 py-3 border border-border rounded-xl font-medium text-sm"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm"
              >
                {loading ? 'Procesando…' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
