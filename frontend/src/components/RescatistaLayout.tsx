import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AlertTriangle, LogOut, Moon, Navigation, Shield, Sun } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { MobileShell } from '@/components/Layout';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-0.5 text-xs font-medium ${
    isActive ? 'text-primary' : 'text-muted-foreground'
  }`;

export function RescatistaLayout() {
  const { user, logout } = useAuth();
  const { toggleDark, resolved } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MobileShell>
      <div className="min-h-screen flex flex-col pb-20">
        <header className="px-6 py-4 flex items-center justify-between border-b border-border bg-secondary text-secondary-foreground">
          <div className="flex items-center gap-2">
            <Shield size={22} className="text-primary" />
            <div>
              <h1 className="text-lg font-bold leading-tight">Consola de Rescate</h1>
              <p className="text-xs opacity-70">{user?.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleDark}
            className="btn-touch opacity-70 hover:opacity-100 mr-2"
            aria-label={resolved === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {resolved === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button type="button" onClick={handleLogout} aria-label="Cerrar sesión">
            <LogOut size={20} className="opacity-70" />
          </button>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border px-12 py-3 flex justify-between">
          <NavLink to="/rescatista/consola" className={navClass}>
            <Navigation size={22} />
            Consola
          </NavLink>
          <NavLink to="/rescatista/alertas" className={navClass}>
            <AlertTriangle size={22} />
            Alertas
          </NavLink>
        </nav>
      </div>
    </MobileShell>
  );
}
