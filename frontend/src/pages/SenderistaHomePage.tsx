import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Phone, MapPin, Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getActiveExpedition, type ActiveExpedition } from '@/services/expedition';

export function SenderistaHomePage() {
  const { user } = useAuth();
  const [active, setActive] = useState<ActiveExpedition | null>(null);

  useEffect(() => {
    getActiveExpedition()
      .then((r) => setActive(r.expedition))
      .catch(() => setActive(null));
  }, []);

  return (
    <div className="px-6 py-6 space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Bienvenido</p>
        <p className="font-semibold text-lg">{user?.email}</p>
      </div>

      {active ? (
        <Link
          to="/senderista/expedicion/activa"
          className="block bg-primary/5 border border-primary/20 rounded-2xl p-4 hover:bg-primary/10 transition-colors"
        >
          <p className="text-xs font-bold text-primary uppercase mb-1">Expedición activa</p>
          <p className="font-semibold">{active.endLocation}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Límite: {new Date(active.deadlineAt).toLocaleString('es-PE')}
          </p>
          <p className="text-sm text-primary font-semibold mt-3 flex items-center gap-1">
            Ver expedición <ChevronRight size={16} />
          </p>
        </Link>
      ) : (
        <div className="bg-muted rounded-2xl p-4 text-sm text-muted-foreground">
          No tienes expediciones en curso. Registra tu próxima ruta.
        </div>
      )}

      <div className="grid gap-3">
        <Link
          to="/senderista/expedicion/nueva"
          className="flex items-center gap-3 bg-primary text-primary-foreground rounded-2xl p-4 min-h-[56px] font-semibold text-base"
        >
          <Plus size={20} />
          Nueva expedición
        </Link>

        <Link
          to="/senderista/perfil/medica"
          className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4 min-h-[52px]"
        >
          <Heart size={20} className="text-primary" />
          Ficha médica
        </Link>

        <Link
          to="/senderista/perfil/contactos"
          className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4"
        >
          <Phone size={20} className="text-primary" />
          Contactos de emergencia
        </Link>

        <Link
          to="/senderista/expedicion"
          className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4"
        >
          <MapPin size={20} className="text-primary" />
          Mis expediciones
        </Link>
      </div>
    </div>
  );
}
