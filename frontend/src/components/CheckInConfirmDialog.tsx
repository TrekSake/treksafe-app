import { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { checkInExpedition } from '@/services/expedition';
import { FieldLabel } from '@/components/Layout';

type Props = {
  expeditionId: string;
  open: boolean;
  onClose: () => void;
  onSuccess: (checkedInAt: string) => void;
};

export function CheckInConfirmDialog({ expeditionId, open, onClose, onSuccess }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setError('');
    setLoading(true);
    try {
      const result = await checkInExpedition(expeditionId, password);
      setPassword('');
      onSuccess(result.checkedInAt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo confirmar el retorno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-24">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} aria-hidden />
      <div className="relative w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-primary" />
            <h3 className="font-bold">Confirmar retorno seguro</h3>
          </div>
          <button type="button" onClick={handleClose} aria-label="Cerrar">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Ingresa tu contraseña para cerrar la expedición y confirmar que regresaste a salvo.
        </p>

        {error && <div className="error-banner mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>Contraseña</FieldLabel>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña de cuenta"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary" disabled={!password || loading}>
            {loading ? 'Confirmando…' : 'Registrar retorno seguro'}
          </button>
        </form>
      </div>
    </div>
  );
}
