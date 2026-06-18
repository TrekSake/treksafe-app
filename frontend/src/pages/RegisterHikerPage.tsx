import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronLeft } from 'lucide-react';
import { registerHiker } from '@/services/auth';
import { useAuth } from '@/context/AuthContext';
import {
  getPasswordStrength,
  isStrongPassword,
  isValidDni,
  isValidEmail,
  isValidPhone,
} from '@/lib/validation';
import { FieldError, FieldLabel, MobileShell } from '@/components/Layout';

export function RegisterHikerPage() {
  const navigate = useNavigate();
  const { loginSession } = useAuth();

  const [fullName, setFullName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const errors = {
    fullName: !fullName.trim() ? 'Nombre completo obligatorio' : '',
    documentId: !isValidDni(documentId) ? 'DNI de 8 dígitos requerido' : '',
    email: !isValidEmail(email) ? 'Correo inválido' : '',
    phone: !isValidPhone(phone) ? 'Celular inválido' : '',
    password: !isStrongPassword(password) ? 'Contraseña no cumple requisitos' : '',
    confirmPassword:
      confirmPassword !== password ? 'Las contraseñas no coinciden' : '',
    privacyConsent: !privacyConsent
      ? 'Debe aceptar el tratamiento de datos (Ley N° 29733)'
      : '',
  };

  const canSubmit =
    !Object.values(errors).some(Boolean) &&
    privacyConsent &&
    fullName &&
    documentId &&
    email &&
    phone &&
    password &&
    confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      documentId: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      privacyConsent: true,
    });
    if (!canSubmit) return;

    setError('');
    setLoading(true);
    try {
      const res = await registerHiker({
        fullName: fullName.trim(),
        documentId: documentId.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        privacyConsent: true,
      });
      loginSession(res.token, res.user);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <MobileShell>
        <div className="px-6 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Check size={36} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-3">Cuenta creada correctamente</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Tu perfil de senderista está listo. Puedes continuar al panel principal.
          </p>
          <button type="button" className="btn-primary" onClick={() => navigate('/senderista')}>
            Ir al inicio
          </button>
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

        <h1 className="text-2xl font-bold mb-1">Registro de Senderista</h1>
        <p className="text-muted-foreground text-sm mb-6">Paso 1 — Información de cuenta</p>

        {error && <div className="error-banner mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <FieldLabel>Nombre completo</FieldLabel>
            <input
              className={`input-field ${touched.fullName && errors.fullName ? 'input-error' : ''}`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
              placeholder="Tu nombre completo"
            />
            <FieldError message={touched.fullName ? errors.fullName : undefined} />
          </div>

          <div>
            <FieldLabel>DNI</FieldLabel>
            <input
              className={`input-field ${touched.documentId && errors.documentId ? 'input-error' : ''}`}
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value.replace(/\D/g, '').slice(0, 8))}
              onBlur={() => setTouched((t) => ({ ...t, documentId: true }))}
              placeholder="45879632"
              inputMode="numeric"
            />
            <FieldError message={touched.documentId ? errors.documentId : undefined} />
          </div>

          <div>
            <FieldLabel>Correo electrónico</FieldLabel>
            <input
              type="email"
              className={`input-field ${touched.email && errors.email ? 'input-error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="tu@correo.pe"
            />
            <FieldError message={touched.email ? errors.email : undefined} />
          </div>

          <div>
            <FieldLabel>Celular</FieldLabel>
            <input
              type="tel"
              className={`input-field ${touched.phone && errors.phone ? 'input-error' : ''}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              placeholder="+51987654321"
            />
            <FieldError message={touched.phone ? errors.phone : undefined} />
          </div>

          <div>
            <FieldLabel>Contraseña</FieldLabel>
            <input
              type="password"
              className={`input-field ${touched.password && errors.password ? 'input-error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="Mín. 8 caracteres, mayúscula, minúscula y número"
            />
            {password && (
              <p className="text-xs mt-1 text-muted-foreground">
                Fortaleza: <span className="font-semibold">{strength.label}</span>
              </p>
            )}
            <FieldError message={touched.password ? errors.password : undefined} />
          </div>

          <div>
            <FieldLabel>Confirmar contraseña</FieldLabel>
            <input
              type="password"
              className={`input-field ${touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, confirmPassword: true }))}
            />
            <FieldError message={touched.confirmPassword ? errors.confirmPassword : undefined} />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyConsent}
              onChange={(e) => setPrivacyConsent(e.target.checked)}
              onBlur={() => setTouched((t) => ({ ...t, privacyConsent: true }))}
              className="mt-1 w-4 h-4 accent-primary"
            />
            <span className="text-sm leading-relaxed">
              Acepto el tratamiento de mis datos personales conforme a la{' '}
              <strong>Ley N° 29733</strong> de protección de datos personales.
            </span>
          </label>
          <FieldError message={touched.privacyConsent ? errors.privacyConsent : undefined} />

          <button type="submit" className="btn-primary mt-2" disabled={!canSubmit || loading}>
            {loading ? 'Creando cuenta…' : 'Continuar'}
          </button>
        </form>
      </div>
    </MobileShell>
  );
}
