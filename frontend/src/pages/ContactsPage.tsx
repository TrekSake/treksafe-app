import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { createContact, deleteContact, getContacts, type EmergencyContact } from '@/services/user';
import { cacheContacts } from '@/lib/offlineContacts';
import { FieldError, FieldLabel } from '@/components/Layout';
import { isValidEmail, isValidPhone } from '@/lib/validation';

export function ContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [fullName, setFullName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = () => {
    getContacts()
      .then((r) => {
        setContacts(r.contacts);
        void cacheContacts(r.contacts);
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'));
  };

  useEffect(() => {
    load();
  }, []);

  const canAdd =
    fullName.trim().length >= 2 &&
    relationship.trim().length >= 2 &&
    isValidPhone(phone) &&
    isValidEmail(email);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAdd) return;
    setError('');
    setLoading(true);
    try {
      await createContact({ fullName, relationship, phone, email });
      setFullName('');
      setRelationship('');
      setPhone('');
      setEmail('');
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear contacto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`¿Eliminar a ${name} de tus contactos de emergencia?`)) return;
    try {
      await deleteContact(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  };

  return (
    <div className="px-6 py-6">
      <Link to="/senderista/perfil" className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
        <ChevronLeft size={16} /> Perfil
      </Link>

      <h2 className="text-xl font-bold mb-6">Contactos de emergencia</h2>

      {error && <div className="error-banner mb-4">{error}</div>}

      <div className="space-y-3 mb-8">
        {contacts.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-4 flex justify-between gap-3">
            <div>
              <p className="font-semibold">{c.full_name}</p>
              <p className="text-xs text-muted-foreground">{c.relationship}</p>
              <p className="text-sm mt-1">{c.phone}</p>
              <p className="text-sm text-muted-foreground">{c.email}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(c.id, c.full_name)}
              aria-label="Eliminar"
              className="btn-touch"
            >
              <Trash2 size={18} className="text-destructive" />
            </button>
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-sm text-muted-foreground">Aún no tienes contactos registrados.</p>
        )}
      </div>

      <h3 className="font-semibold mb-3">Agregar contacto</h3>
      <form onSubmit={handleAdd} className="space-y-3">
        <div>
          <FieldLabel>Nombre completo</FieldLabel>
          <input className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <FieldLabel>Parentesco</FieldLabel>
          <input className="input-field" value={relationship} onChange={(e) => setRelationship(e.target.value)} />
        </div>
        <div>
          <FieldLabel>Teléfono</FieldLabel>
          <input className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {!phone || isValidPhone(phone) ? null : <FieldError message="Teléfono inválido" />}
        </div>
        <div>
          <FieldLabel>Correo</FieldLabel>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!email || isValidEmail(email) ? null : <FieldError message="Correo inválido" />}
        </div>
        <button type="submit" className="btn-primary" disabled={!canAdd || loading}>
          {loading ? 'Guardando…' : 'Agregar contacto'}
        </button>
      </form>
    </div>
  );
}
