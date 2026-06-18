import { useState } from "react";
import { Mountain, Shield, User, Check, Heart, ChevronLeft } from "lucide-react";

import {
  SenderistBottomNav,
  SenderistHome,
  SenderistCrearExpedicion,
  SenderistExpedicionActiva,
  SenderistRetornoConfirmado,
  SenderistAlertaEmergencia,
  SenderistPerfil,
  SenderistHistorial,
  // Sprint 7
  SenderistPrivacidad,
  SenderistSolicitudDatos,
  SenderistOffline,
  SenderistCoordenadas,
  // Sprint 8
  SenderistHomeOptimizado,
  SenderistModoOscuro,
  SenderistRecordatorio,
  SenderistExpedicionRecordatorio,
} from "./components/senderista";
import { RescatistaLayout } from "./components/rescatista";

type Role = "senderista" | "rescatista" | null;

const I = "w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground";

// ── Login (con acceso rápido demo integrado) ─────────────────────────────────

function LoginScreen({
  onLogin,
  onRegistro,
  onRegistroRescatista,
}: {
  onLogin: (role: Role, screen: string) => void;
  onRegistro: () => void;
  onRegistroRescatista: () => void;
}) {
  const [tab, setTab] = useState<"senderista" | "rescatista">("senderista");

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto px-6 flex flex-col py-10">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
          <Mountain size={30} className="text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold tracking-tight">TrekSafe</h1>
        <p className="text-muted-foreground text-sm mt-1">Seguridad en expediciones de montaña</p>
      </div>

      {/* Pestañas de rol */}
      <div className="flex bg-muted rounded-xl p-1 mb-5">
        {(["senderista", "rescatista"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === t ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
            }`}
          >
            {t === "senderista" ? "Senderista" : "Rescatista"}
          </button>
        ))}
      </div>

      {/* Título */}
      <h2 className="text-xl font-display font-bold mb-4">Iniciar sesión</h2>

      {/* Formulario */}
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5">Correo electrónico</label>
          <input
            type="email"
            placeholder="tu@correo.pe"
            defaultValue={tab === "senderista" ? "elena@treksafe.pe" : "carlos@rescate.gob.pe"}
            className={I}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5">Contraseña</label>
          <input type="password" defaultValue="••••••••" className={I} />
        </div>
        <button
          onClick={() => onLogin(tab, tab === "rescatista" ? "rescatista-panel" : "inicio")}
          className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-xl shadow-md shadow-primary/25 hover:bg-primary/90 active:scale-[0.98] transition-all"
        >
          Iniciar sesión
        </button>
      </div>

      {/* Enlace crear cuenta */}
      <p className="text-center text-sm text-muted-foreground mb-8">
        ¿No tienes cuenta?{" "}
        <button
          onClick={tab === "rescatista" ? onRegistroRescatista : onRegistro}
          className="text-primary font-semibold hover:underline"
        >
          Crear cuenta
        </button>
      </p>

      {/* ─── Acceso rápido para demo ─── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <p className="text-xs text-muted-foreground font-medium whitespace-nowrap">Acceso rápido para demo</p>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="space-y-3">
          {/* Demo senderista */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-primary">Senderista</p>
                <p className="text-xs text-muted-foreground">senderista@treksafe.pe / demo123</p>
              </div>
              <Mountain size={18} className="text-primary" />
            </div>
            <button
              onClick={() => onLogin("senderista", "inicio")}
              className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Entrar como Senderista
            </button>
          </div>

          {/* Demo rescatista */}
          <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-secondary">Rescatista</p>
                <p className="text-xs text-muted-foreground">rescatista@treksafe.pe / demo123</p>
              </div>
              <Shield size={18} className="text-secondary" />
            </div>
            <button
              onClick={() => onLogin("rescatista", "rescatista-panel")}
              className="w-full py-2.5 bg-secondary text-secondary-foreground text-sm font-semibold rounded-xl hover:bg-secondary/90 transition-colors"
            >
              Entrar como Rescatista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Registro Senderista (Onboarding — 3 pasos) ───────────────────────────────

function RegistroSenderista({
  onComplete,
  onCrearExpedicion,
  onBack,
}: {
  onComplete: () => void;
  onCrearExpedicion: () => void;
  onBack: () => void;
}) {
  const [paso, setPaso] = useState(1);
  const [completado, setCompletado] = useState(false);

  const PASOS = [
    { label: "Cuenta", Icon: User },
    { label: "Salud", Icon: Heart },
    { label: "Contactos", Icon: Shield },
  ];
  const titulos = ["Información de Cuenta", "Información Médica", "Contactos de Emergencia"];
  const subtitulos = [
    "Crea tu cuenta en TrekSafe",
    "Esta información es clave para los equipos de rescate",
    "¿A quién notificamos en caso de emergencia?",
  ];

  // ── Pantalla de éxito ──
  if (completado) {
    return (
      <div className="min-h-screen bg-background max-w-sm mx-auto flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
            <Check size={36} className="text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-display font-bold mb-3">Cuenta creada correctamente</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Tu perfil de seguridad ha sido configurado. Ahora puedes registrar una expedición desde el inicio.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onComplete}
            className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl shadow-md shadow-primary/25 hover:bg-primary/90 transition-all"
          >
            Ir al inicio
          </button>
          <button
            onClick={onCrearExpedicion}
            className="w-full py-4 bg-card border border-border text-foreground font-semibold rounded-2xl hover:bg-muted transition-colors"
          >
            Registrar expedición
          </button>
        </div>
      </div>
    );
  }

  // ── Wizard de 3 pasos ──
  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto px-6 flex flex-col py-10">
      {/* Indicador de progreso */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          {PASOS.map(({ label, Icon }, i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                i + 1 < paso ? "bg-primary text-primary-foreground" :
                i + 1 === paso ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                "bg-muted text-muted-foreground"
              }`}>
                {i + 1 < paso ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span className={`text-xs font-medium ${i + 1 <= paso ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-muted rounded-full mx-5 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((paso - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">Paso {paso} de 3</p>
        <h2 className="text-2xl font-display font-bold">{titulos[paso - 1]}</h2>
        <p className="text-muted-foreground text-sm mt-1">{subtitulos[paso - 1]}</p>
      </div>

      <div className="flex-1 space-y-4">
        {paso === 1 && (
          <>
            <div><label className="text-sm font-semibold block mb-1.5">Nombre completo</label><input type="text" placeholder="Tu nombre completo" className={I} /></div>
            <div><label className="text-sm font-semibold block mb-1.5">Correo electrónico</label><input type="email" placeholder="tu@correo.pe" className={I} /></div>
            <div><label className="text-sm font-semibold block mb-1.5">Contraseña</label><input type="password" placeholder="Crea una contraseña segura" className={I} /></div>
            <div><label className="text-sm font-semibold block mb-1.5">Confirmar contraseña</label><input type="password" placeholder="Repite tu contraseña" className={I} /></div>
          </>
        )}
        {paso === 2 && (
          <>
            <div>
              <label className="text-sm font-semibold block mb-1.5">Grupo sanguíneo</label>
              <select className={I}>{["A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"].map(t => <option key={t}>{t}</option>)}</select>
            </div>
            <div><label className="text-sm font-semibold block mb-1.5">Alergias</label><input type="text" placeholder="Ej: Penicilina, Polen" className={I} /></div>
            <div><label className="text-sm font-semibold block mb-1.5">Condiciones médicas</label><textarea placeholder="Condiciones o medicamentos relevantes..." className={`${I} h-20 resize-none`} /></div>
            <div><label className="text-sm font-semibold block mb-1.5">Medicamentos habituales</label><input type="text" placeholder="Ej: Vitamina D, Aspirina" className={I} /></div>
          </>
        )}
        {paso === 3 && (
          <>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs text-primary leading-relaxed">
              Agrega al menos un contacto. Serán notificados si no confirmas tu retorno a tiempo.
            </div>
            <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <div><label className="text-xs font-semibold block mb-1">Nombre completo</label><input type="text" placeholder="Nombre del contacto" className={I} /></div>
              <div><label className="text-xs font-semibold block mb-1">Parentesco</label><input type="text" placeholder="Ej: Madre, Hermano" className={I} /></div>
              <div><label className="text-xs font-semibold block mb-1">Teléfono</label><input type="tel" placeholder="+51 987 000 000" className={I} /></div>
              <div><label className="text-xs font-semibold block mb-1">Correo electrónico</label><input type="email" placeholder="correo@ejemplo.pe" className={I} /></div>
            </div>
            <button className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground text-sm font-medium flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors">
              + Agregar contacto
            </button>
          </>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={paso === 1 ? onBack : () => setPaso(s => s - 1)}
          className="flex-1 py-3.5 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
        >
          {paso === 1 ? "← Volver" : "Anterior"}
        </button>
        <button
          onClick={() => paso < 3 ? setPaso(s => s + 1) : setCompletado(true)}
          className="flex-1 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-xl shadow-md shadow-primary/25 hover:bg-primary/90 transition-all"
        >
          {paso < 3 ? "Continuar" : "Crear cuenta"}
        </button>
      </div>
    </div>
  );
}

// ── Registro Rescatista ───────────────────────────────────────────────────────

function RegistroRescatista({ onSuccess, onBack }: { onSuccess: () => void; onBack: () => void }) {
  const [estado, setEstado] = useState<"idle" | "success" | "error">("idle");
  const [credencial, setCredencial] = useState("");

  const validar = () => {
    setEstado(credencial.trim().toUpperCase().startsWith("CRA-") ? "success" : "error");
  };

  if (estado === "success") {
    return (
      <div className="min-h-screen bg-background max-w-sm mx-auto flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
            <Check size={32} className="text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Credenciales Validadas</h1>
        <p className="text-muted-foreground text-sm mb-8">Tu cuenta de rescatista ha sido creada correctamente.</p>
        <button onClick={onSuccess} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl shadow-md shadow-primary/25 hover:bg-primary/90 transition-all">
          Ingresar al Panel de Rescate
        </button>
      </div>
    );
  }

  if (estado === "error") {
    return (
      <div className="min-h-screen bg-background max-w-sm mx-auto flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <div className="w-14 h-14 bg-destructive/20 border-2 border-destructive rounded-full flex items-center justify-center">
            <Shield size={28} className="text-destructive" />
          </div>
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">No se Pudo Validar la Credencial</h1>
        <p className="text-muted-foreground text-sm mb-8">Los datos ingresados no coinciden con el registro simulado de credenciales.</p>
        <button onClick={() => setEstado("idle")} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl mb-3">
          Revisar datos
        </button>
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto px-6 py-10">
      <button onClick={onBack} className="flex items-center gap-1 text-xs text-muted-foreground mb-6 hover:text-foreground transition-colors">
        <ChevronLeft size={16} /> Volver
      </button>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
          <Shield size={20} className="text-secondary-foreground" />
        </div>
        <h1 className="text-xl font-display font-bold">Registro de Rescatista</h1>
      </div>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        Valida tus credenciales institucionales para acceder al panel de rescate.
      </p>
      <div className="space-y-4 mb-6">
        <div><label className="text-sm font-semibold block mb-1.5">Nombre completo</label><input type="text" placeholder="Tu nombre completo" className={I} /></div>
        <div><label className="text-sm font-semibold block mb-1.5">Correo electrónico</label><input type="email" placeholder="tu@institucion.pe" className={I} /></div>
        <div><label className="text-sm font-semibold block mb-1.5">Contraseña</label><input type="password" placeholder="Crea una contraseña segura" className={I} /></div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Institución</label>
          <select className={I}>
            <option>Brigada de Rescate Andina</option>
            <option>Policía Nacional del Perú</option>
            <option>Cuerpo General de Bomberos</option>
            <option>AGMP</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Número de credencial</label>
          <input type="text" placeholder="Ej: CRA-2024-0001" value={credencial} onChange={e => setCredencial(e.target.value)} className={I} />
          <p className="text-xs text-muted-foreground mt-1">Credencial de prueba: <span className="font-semibold text-primary">CRA-2024-0001</span></p>
        </div>
        <div><label className="text-sm font-semibold block mb-1.5">Fecha de nacimiento</label><input type="date" className={I} /></div>
      </div>
      <button onClick={validar} className="w-full py-4 bg-secondary text-secondary-foreground font-display font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-secondary/90 transition-all shadow-md">
        <Shield size={18} /> Validar y crear cuenta
      </button>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [role, setRole] = useState<Role>(null);
  const [screen, setScreen] = useState("login");
  const [expEstado, setExpEstado] = useState("activa");
  const [demoOpen, setDemoOpen] = useState(false);

  const handleLogin = (r: Role, s: string) => { setRole(r); setScreen(s); };
  const handleNav = (s: string) => {
    if (s === "login") { setRole(null); setScreen("login"); return; }
    setScreen(s);
  };

  const senderistNavScreens = [
    "inicio", "crear-expedicion", "expedicion-activa", "retorno-confirmado",
    "alerta-emergencia", "perfil", "historial-senderista",
    // Sprint 7
    "privacidad", "solicitud-datos", "offline", "coordenadas",
    // Sprint 8
    "home-optimizado", "recordatorio", "expedicion-recordatorio",
    // modo-oscuro renders its own nav, still valid senderista screen
    "modo-oscuro",
  ];
  const activeNavTab =
    screen === "inicio" ? "inicio" :
    (screen === "expedicion-activa" || screen === "crear-expedicion") ? "expedicion-activa" :
    "perfil";

  const DEMO_AUTH = [
    { id: "login", label: "Inicio de sesión" },
    { id: "registro", label: "Registro Senderista" },
    { id: "registro-rescatista", label: "Registro Rescatista" },
  ];
  const DEMO_SENDERISTA = [
    { id: "inicio", label: "Inicio" },
    { id: "crear-expedicion", label: "Crear Expedición" },
    { id: "expedicion-activa", label: "Expedición Activa" },
    { id: "retorno-confirmado", label: "¡Retorno Confirmado!" },
    { id: "alerta-emergencia", label: "Alerta de Emergencia" },
    { id: "perfil", label: "Mi Perfil" },
    { id: "historial-senderista", label: "Historial de Expediciones" },
    // Sprint 7
    { id: "privacidad", label: "Fig. 41 · Configuración de privacidad" },
    { id: "solicitud-datos", label: "Fig. 42 · Solicitud de datos" },
    { id: "offline", label: "Fig. 43 · Formulario offline" },
    { id: "coordenadas", label: "Fig. 44 · Validación coordenadas" },
    // Sprint 8
    { id: "home-optimizado", label: "Fig. 45 · Home optimizado" },
    { id: "modo-oscuro", label: "Fig. 46 · Modo oscuro" },
    { id: "recordatorio", label: "Fig. 47 · Notificación preventiva" },
    { id: "expedicion-recordatorio", label: "Fig. 48 · Expd. con recordatorio" },
  ];
  const DEMO_RESCATISTA = [
    { id: "rescatista-panel", label: "Panel de Control" },
    { id: "rescatista-expediciones", label: "Expediciones" },
    { id: "rescatista-alertas", label: "Gestión de Alertas" },
    { id: "rescatista-detalle-alerta", label: "Detalle de Alerta" },
    { id: "rescatista-rescates", label: "Operaciones de Rescate" },
    { id: "rescatista-perfil", label: "Mi Perfil" },
    { id: "rescatista-historial", label: "Historial de Rescates" },
  ];

  const demoScreens = role === "rescatista" ? DEMO_RESCATISTA : role === "senderista" ? DEMO_SENDERISTA : DEMO_AUTH;

  const renderContent = () => {
    if (!role || screen === "login") {
      return <LoginScreen onLogin={handleLogin} onRegistro={() => { setRole("senderista"); setScreen("registro"); }} onRegistroRescatista={() => { setRole("senderista"); setScreen("registro-rescatista"); }} />;
    }
    if (screen === "registro") {
      return <RegistroSenderista
        onComplete={() => handleLogin("senderista", "inicio")}
        onCrearExpedicion={() => handleLogin("senderista", "crear-expedicion")}
        onBack={() => { setRole(null); setScreen("login"); }}
      />;
    }
    if (screen === "registro-rescatista") {
      return <RegistroRescatista onSuccess={() => handleLogin("rescatista", "rescatista-panel")} onBack={() => { setRole(null); setScreen("login"); }} />;
    }
    if (role === "rescatista") {
      return <RescatistaLayout screen={screen} onNav={handleNav} />;
    }
    // Senderista
    switch (screen) {
      case "inicio":             return <SenderistHome onNav={handleNav} estado={expEstado} setEstado={setExpEstado} />;
      case "crear-expedicion":   return <SenderistCrearExpedicion onNav={handleNav} />;
      case "expedicion-activa":  return <SenderistExpedicionActiva onNav={handleNav} />;
      case "retorno-confirmado": return <SenderistRetornoConfirmado onNav={handleNav} />;
      case "alerta-emergencia":  return <SenderistAlertaEmergencia onNav={handleNav} />;
      case "perfil":                    return <SenderistPerfil onNav={handleNav} />;
      case "historial-senderista":      return <SenderistHistorial onNav={handleNav} />;
      // Sprint 7
      case "privacidad":                return <SenderistPrivacidad onNav={handleNav} />;
      case "solicitud-datos":           return <SenderistSolicitudDatos onNav={handleNav} />;
      case "offline":                   return <SenderistOffline onNav={handleNav} />;
      case "coordenadas":               return <SenderistCoordenadas onNav={handleNav} />;
      // Sprint 8
      case "home-optimizado":           return <SenderistHomeOptimizado onNav={handleNav} />;
      case "modo-oscuro":               return <SenderistModoOscuro onNav={handleNav} />;
      case "recordatorio":              return <SenderistRecordatorio onNav={handleNav} />;
      case "expedicion-recordatorio":   return <SenderistExpedicionRecordatorio onNav={handleNav} />;
      default:                          return <SenderistHome onNav={handleNav} estado={expEstado} setEstado={setExpEstado} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}

      {/* modo-oscuro renders its own dark nav; recordatorio shows over a bg */}
      {role === "senderista" && senderistNavScreens.includes(screen) && screen !== "modo-oscuro" && screen !== "recordatorio" && (
        <SenderistBottomNav activo={activeNavTab} onNav={handleNav} />
      )}

      {/* Demo navigator */}
      <div className="fixed bottom-20 right-4 z-50">
        {demoOpen && (
          <div className="absolute bottom-12 right-0 bg-card border border-border rounded-2xl shadow-2xl p-2 w-56 mb-1">
            <p className="text-xs font-bold text-muted-foreground px-2 py-1.5 uppercase tracking-widest">Pantallas Demo</p>
            {demoScreens.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  if (id === "login" || id === "registro" || id === "registro-rescatista") setRole("senderista");
                  handleNav(id);
                  setDemoOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                  screen === id ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
            {role && (
              <div className="border-t border-border mt-1 pt-1">
                <button
                  onClick={() => { setRole(null); setScreen("login"); setDemoOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-muted-foreground hover:bg-muted transition-colors"
                >
                  ← Inicio de sesión
                </button>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setDemoOpen(d => !d)}
          className="w-10 h-10 bg-secondary text-secondary-foreground rounded-full shadow-lg flex items-center justify-center text-base font-bold hover:bg-secondary/90 transition-colors"
        >
          ☰
        </button>
      </div>
    </div>
  );
}
