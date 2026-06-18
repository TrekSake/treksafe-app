import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mountain, Shield } from 'lucide-react';
import { login } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';
import { FieldLabel, LogoHeader, MobileShell } from '@/components/Layout';

type LoginTab = 'senderista' | 'rescatista';

export function LoginPage() {
  const navigate = useNavigate();
  const { loginSession } = useAuth();
  const [tab, setTab] = useState<LoginTab>('senderista');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email, password });
      loginSession(res.token, res.user);
      navigate(res.user.role === 'rescatista' ? '/rescatista' : '/senderista');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setLoading(true);
    try {
      const res = await login({ email: demoEmail, password: demoPassword });
      loginSession(res.token, res.user);
      navigate(res.user.role === 'rescatista' ? '/rescatista' : '/senderista');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en acceso demo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileShell>
      <div className="px-6 flex flex-col py-10">
        <LogoHeader />

        <div className="flex bg-muted rounded-xl p-1 mb-5">
          {(['senderista', 'rescatista'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === t ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'
              }`}
            >
              {t === 'senderista' ? 'Senderista' : 'Rescatista'}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>

        {error && <div className="error-banner mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <FieldLabel>Correo electrónico</FieldLabel>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.pe"
              className="input-field"
              required
            />
          </div>
          <div>
            <FieldLabel>Contraseña</FieldLabel>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Ingresando…' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mb-8">
          ¿No tienes cuenta?{' '}
          <Link
            to={tab === 'rescatista' ? '/register/rescuer' : '/register/hiker'}
            className="text-primary font-semibold hover:underline"
          >
            Crear cuenta
          </Link>
        </p>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <p className="text-xs text-muted-foreground font-medium whitespace-nowrap">
              Acceso rápido para demo
            </p>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-3">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-bold text-primary">Senderista</p>
                  <p className="text-xs text-muted-foreground">senderista@treksafe.pe</p>
                </div>
                <Mountain size={18} className="text-primary" />
              </div>
              <button
                type="button"
                onClick={() => demoLogin('senderista@treksafe.pe', 'Treksafe123!')}
                className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl"
                disabled={loading}
              >
                Entrar como Senderista
              </button>
            </div>

            <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-bold text-secondary">Rescatista</p>
                  <p className="text-xs text-muted-foreground">rescatista@treksafe.pe</p>
                </div>
                <Shield size={18} className="text-secondary" />
              </div>
              <button
                type="button"
                onClick={() => demoLogin('rescatista@treksafe.pe', 'Treksafe123!')}
                className="w-full py-2.5 bg-secondary text-secondary-foreground text-sm font-semibold rounded-xl"
                disabled={loading}
              >
                Entrar como Rescatista
              </button>
            </div>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}
