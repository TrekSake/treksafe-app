import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AlertTriangle, LogOut, Navigation, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { MobileShell } from '@/components/Layout';
import { ThemeToggle } from '@/components/ThemeToggle';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-0.5 text-xs font-medium ${
    isActive ? 'text-primary' : 'text-muted-foreground'
  }`;

export function RescatistaLayout() {
  const { user, logout } = useAuth();
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
          <div className="flex items-center gap-1">
            <ThemeToggle compact />
            <button type="button" onClick={handleLogout} aria-label="Cerrar sesión" className="btn-touch">
              <LogOut size={20} className="opacity-70" />
            </button>
          </div>
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
