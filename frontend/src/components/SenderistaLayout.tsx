import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, Map, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { MobileShell } from '@/components/Layout';
import { getActiveExpedition } from '@/services/expedition';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-0.5 text-xs font-medium ${
    isActive ? 'text-primary' : 'text-muted-foreground'
  }`;

function ExpeditionNavLink() {
  const [to, setTo] = useState('/senderista/expedicion');

  useEffect(() => {
    getActiveExpedition()
      .then((r) => {
        if (r.expedition) setTo('/senderista/expedicion/activa');
      })
      .catch(() => undefined);
  }, []);

  return (
    <NavLink to={to} className={navClass}>
      <Map size={22} />
      Expedición
    </NavLink>
  );
}

export function SenderistaLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MobileShell>
      <div className="min-h-screen flex flex-col pb-20">
        <header className="px-6 py-4 flex items-center justify-between border-b border-border">
          <h1 className="text-lg font-bold">TrekSafe</h1>
          <button type="button" onClick={handleLogout} aria-label="Cerrar sesión">
            <LogOut size={20} className="text-muted-foreground" />
          </button>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border px-8 py-3 flex justify-between">
          <NavLink to="/senderista" end className={navClass}>
            <Home size={22} />
            Inicio
          </NavLink>
          <ExpeditionNavLink />
          <NavLink to="/senderista/perfil" className={navClass}>
            <User size={22} />
            Perfil
          </NavLink>
        </nav>
      </div>
    </MobileShell>
  );
}
