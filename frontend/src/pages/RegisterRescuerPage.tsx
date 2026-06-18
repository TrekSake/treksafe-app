import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, Shield } from 'lucide-react';
import { registerRescuer } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';
import { isStrongPassword, isValidEmail } from '@/lib/validation';
import { FieldLabel, MobileShell } from '@/components/Layout';

type ViewState = 'form' | 'success' | 'error';

export function RegisterRescuerPage() {
  const navigate = useNavigate();
  const { loginSession } = useAuth();

  const [view, setView] = useState<ViewState>('form');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState<'AGMP' | 'MINCETUR'>('AGMP');
  const [credentialNumber, setCredentialNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !isValidEmail(email) || !isStrongPassword(password)) {
      setFormError('Complete todos los campos correctamente');
      return;
    }
    if (!credentialNumber.trim() || !birthDate) {
      setFormError('Credencial y fecha de nacimiento son obligatorios');
      return;
    }

    setLoading(true);
    try {
      const res = await registerRescuer({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        institution,
        credentialNumber: credentialNumber.trim(),
        birthDate,
      });
      loginSession(res.token, res.user);
      setView('success');
    } catch (err) {
      const status = (err as Error & { status?: number }).status;
      if (status === 403) {
        setView('error');
      } else {
        setFormError(err instanceof Error ? err.message : 'Error al registrar');
      }
    } finally {
      setLoading(false);
    }
  };

  if (view === 'success') {
    return (
      <MobileShell>
        <div className="px-6 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
              <Check size={32} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Credenciales Validadas</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Tu cuenta de rescatista ha sido creada correctamente.
          </p>
          <button type="button" className="btn-primary" onClick={() => navigate('/rescatista')}>
            Ingresar al Panel de Rescate
          </button>
        </div>
      </MobileShell>
    );
  }

  if (view === 'error') {
    return (
      <MobileShell>
        <div className="px-6 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-destructive/20 border-2 border-destructive rounded-full flex items-center justify-center">
              <Shield size={28} className="text-destructive" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">No se Pudo Validar la Credencial</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Los datos ingresados no coinciden con el registro simulado de credenciales
            institucionales (AGMP/MINCETUR).
          </p>
          <button type="button" className="btn-primary mb-3" onClick={() => setView('form')}>
            Revisar datos
          </button>
          <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Volver al inicio
          </Link>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className="px-6 py-10">
        <Link
          to="/login"
          className="flex items-center gap-1 text-xs text-muted-foreground mb-6 hover:text-foreground"
        >
          <ChevronLeft size={16} /> Volver
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-secondary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Registro de Rescatista</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-6">
          Valida tus credenciales institucionales para acceder al panel de rescate.
        </p>

        {formError && <div className="error-banner mb-4">{formError}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>Nombre completo</FieldLabel>
            <input
              className="input-field"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Carlos Mendoza Quispe"
            />
          </div>
          <div>
            <FieldLabel>Correo electrónico</FieldLabel>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@institucion.pe"
            />
          </div>
          <div>
            <FieldLabel>Contraseña</FieldLabel>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña segura"
            />
          </div>
          <div>
            <FieldLabel>Institución</FieldLabel>
            <select
              className="input-field"
              value={institution}
              onChange={(e) => setInstitution(e.target.value as 'AGMP' | 'MINCETUR')}
            >
              <option value="AGMP">AGMP</option>
              <option value="MINCETUR">MINCETUR</option>
            </select>
          </div>
          <div>
            <FieldLabel>Número de credencial</FieldLabel>
            <input
              className="input-field"
              value={credentialNumber}
              onChange={(e) => setCredentialNumber(e.target.value)}
              placeholder="AGMP-2024-00158"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Prueba válida: <span className="font-semibold text-primary">AGMP-2024-00158</span>{' '}
              · Carlos Mendoza Quispe · 1985-03-14
            </p>
          </div>
          <div>
            <FieldLabel>Fecha de nacimiento</FieldLabel>
            <input
              type="date"
              className="input-field"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-secondary flex items-center justify-center gap-2" disabled={loading}>
            <Shield size={18} />
            {loading ? 'Validando…' : 'Validar y crear cuenta'}
          </button>
        </form>
      </div>
    </MobileShell>
  );
}
