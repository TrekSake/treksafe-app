import { useState } from "react";
import {
  Mountain, Shield, MapPin, Clock, Users, Plus, Check, AlertCircle,
  Phone, Mail, CheckCircle, ChevronRight, ChevronLeft, Navigation,
  Activity, Heart, Bell, User, Home, Compass, Trash2, Edit, Zap, X,
  WifiOff, Wifi, Lock, Globe, Database, AlertTriangle,
} from "lucide-react";

// ── Constantes ───────────────────────────────────────────────────────────────

const I = "w-full px-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground";

const EXPEDICION = {
  nombre: "Laguna 69 — Cordillera Blanca",
  puntoInicio: "Yungay, Ancash",
  puntoDestino: "Laguna 69 (4,600 m.s.n.m.)",
  ruta: "Yungay → Llanganuco → Laguna 69",
  salida: "05:30",
  regresoEstimado: "17:00",
  participantes: 3,
  dificultad: "Moderado",
  progreso: 42,
  contactos: 2,
};

const CONTACTOS_INICIALES = [
  { id: 1, nombre: "Luis Mamani", parentesco: "Hermano", telefono: "+51 987 012 345", correo: "luis.mamani@correo.pe" },
  { id: 2, nombre: "Carmen Torres", parentesco: "Madre", telefono: "+51 987 654 321", correo: "carmen.torres@correo.pe" },
];

const HISTORIAL_DATA = [
  { nombre: "Laguna Humantay", fecha: "8 jun 2026", km: "14.2 km", estado: "Completado", dif: "Moderado" },
  { nombre: "Marcahuasi", fecha: "23 may 2026", km: "9.6 km", estado: "Completado", dif: "Fácil" },
  { nombre: "Nevado Huascarán", fecha: "2 abr 2026", km: "38.5 km", estado: "Completado", dif: "Experto" },
  { nombre: "Ausangate", fecha: "14 mar 2026", km: "22.0 km", estado: "Completado", dif: "Difícil" },
  { nombre: "Laguna 69", fecha: "1 feb 2026", km: "13.8 km", estado: "Completado", dif: "Moderado" },
];

// ── Helpers UI ───────────────────────────────────────────────────────────────

function ModalBackdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {children}
    </div>
  );
}
function ModalCard({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl">{children}</div>;
}

// Toggle row component
function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-sm font-medium">{label}</span>
      <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 flex-shrink-0 ${value ? "bg-primary" : "bg-muted"}`}>
        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

// ── Bottom Nav ──────────────────────────────────────────────────────────────

export function SenderistBottomNav({ activo, onNav }: { activo: string; onNav: (s: string) => void }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border z-40">
      <div className="flex">
        {[
          { id: "inicio", Icon: Home, label: "Inicio" },
          { id: "expedicion-activa", Icon: Compass, label: "Expedición" },
          { id: "perfil", Icon: User, label: "Perfil" },
        ].map(({ id, Icon, label }) => (
          <button key={id} onClick={() => onNav(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${activo === id ? "text-primary" : "text-muted-foreground"}`}
          >
            <Icon size={22} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ── Inicio ──────────────────────────────────────────────────────────────────

export function SenderistHome({ onNav, estado, setEstado }: {
  onNav: (s: string) => void; estado: string; setEstado: (s: string) => void;
}) {
  type Cfg = { bg: string; titulo: string; sub: string; dot: string; cta: string; ctaColor: string; ctaScreen: string; CtaIcon: React.ComponentType<{ size: number }> };
  const CFG: Record<string, Cfg> = {
    ninguna: { bg: "bg-primary", titulo: "Sin Expedición Activa", sub: "Registra tu próxima salida para estar protegido", dot: "bg-green-300", cta: "Crear Expedición", CtaIcon: Plus, ctaScreen: "crear-expedicion", ctaColor: "bg-white text-primary hover:bg-white/90" },
    activa: { bg: "bg-primary", titulo: "Expedición Activa", sub: "Laguna 69 — Cordillera Blanca", dot: "bg-green-300 animate-pulse", cta: "Ver expedición", CtaIcon: ChevronRight, ctaScreen: "expedicion-activa", ctaColor: "bg-white text-primary hover:bg-white/90" },
    "por-vencer": { bg: "bg-amber-500", titulo: "Próximo a Vencer", sub: "Confirma tu retorno en 1h 20m", dot: "bg-amber-200 animate-pulse", cta: "Confirmar Retorno Seguro", CtaIcon: Check, ctaScreen: "expedicion-activa", ctaColor: "bg-white text-amber-700 hover:bg-white/90" },
    emergencia: { bg: "bg-destructive", titulo: "Alerta Activa", sub: "Contactos notificados — retrasado 4h 30m", dot: "bg-red-200 animate-ping", cta: "Ver Alerta Activa", CtaIcon: AlertCircle, ctaScreen: "alerta-emergencia", ctaColor: "bg-white text-destructive hover:bg-white/90" },
  };
  const cfg = CFG[estado] ?? CFG.ninguna;
  const { CtaIcon } = cfg;

  return (
    <div className="min-h-screen bg-background pb-24 max-w-sm mx-auto">
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div><p className="text-xs text-muted-foreground">Buenos días,</p><h1 className="text-xl font-display font-bold">Elena Mamani</h1></div>
        <button className="w-10 h-10 bg-card rounded-full border border-border flex items-center justify-center shadow-sm"><Bell size={18} /></button>
      </div>
      <div className="px-5 mb-5">
        <div className={`${cfg.bg} rounded-3xl p-6 shadow-xl`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Estado de Seguridad</p>
              <h2 className="text-white font-display font-bold text-xl leading-tight">{cfg.titulo}</h2>
              <p className="text-white/70 text-sm mt-0.5">{cfg.sub}</p>
            </div>
            <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${cfg.dot}`} />
          </div>
          {estado === "activa" && (
            <div className="bg-white/15 rounded-2xl px-4 py-3 mb-4">
              <div className="flex justify-between text-sm mb-2"><span className="text-white/70">Tiempo restante</span><span className="text-white font-display font-bold">12h 30m</span></div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: `${EXPEDICION.progreso}%` }} /></div>
            </div>
          )}
          <button onClick={() => onNav(cfg.ctaScreen)} className={`w-full py-3.5 font-display font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all ${cfg.ctaColor}`}>
            <CtaIcon size={18} /> {cfg.cta}
          </button>
        </div>
      </div>
      <div className="px-5 mb-5">
        <p className="text-xs text-muted-foreground mb-2 font-medium">Demo — Cambiar Estado</p>
        <div className="flex gap-1.5">
          {[{ id: "ninguna", label: "Seguro" }, { id: "activa", label: "Activa" }, { id: "por-vencer", label: "Alerta" }, { id: "emergencia", label: "SOS" }].map(({ id, label }) => (
            <button key={id} onClick={() => setEstado(id)} className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${estado === id ? "bg-foreground text-background" : "bg-card border border-border text-muted-foreground"}`}>{label}</button>
          ))}
        </div>
      </div>
      <div className="px-5 mb-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Resumen</h3>
        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Expediciones", valor: "14", Icon: Navigation, color: "text-primary" }, { label: "Contactos", valor: "2", Icon: Users, color: "text-secondary" }, { label: "Regresos Seguros", valor: "100%", Icon: Shield, color: "text-primary" }].map(({ label, valor, Icon, color }) => (
            <div key={label} className="bg-card rounded-2xl p-4 border border-border"><Icon size={18} className={`${color} mb-2`} /><p className="text-xl font-display font-bold">{valor}</p><p className="text-xs text-muted-foreground">{label}</p></div>
          ))}
        </div>
      </div>
      <div className="px-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Historial Reciente</h3>
        <div className="space-y-2.5">
          {[{ nombre: "Laguna Humantay", fecha: "8 jun", km: "14.2 km" }, { nombre: "Marcahuasi", fecha: "23 may", km: "9.6 km" }].map(({ nombre, fecha, km }) => (
            <div key={nombre} className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Mountain size={18} className="text-primary" /></div>
              <div className="flex-1"><p className="font-semibold text-sm">{nombre}</p><p className="text-xs text-muted-foreground">{fecha} · {km}</p></div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Completado</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Crear Expedición ────────────────────────────────────────────────────────
// FIXED: button now at bottom-16 (above the 64px bottom nav)

export function SenderistCrearExpedicion({ onNav }: { onNav: (s: string) => void }) {
  const [dificultad, setDificultad] = useState("Moderado");
  const [seleccionados, setSeleccionados] = useState([0, 1]);
  const toggle = (i: number) => setSeleccionados(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={() => onNav("inicio")} className="text-muted-foreground"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-display font-bold">Nueva Expedición</h1>
      </div>
      {/* pb-52: space for fixed button (56px) + bottom nav (64px) + gap */}
      <div className="px-5 pb-52 space-y-5">
        <input type="text" defaultValue="Laguna 69 — Cordillera Blanca" placeholder="Nombre de la expedición..." className="w-full text-2xl font-display font-bold bg-transparent border-b-2 border-primary/30 pb-2 focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground/40 transition-colors" />
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Punto de Inicio</label>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3"><MapPin size={15} className="text-primary flex-shrink-0" /><input type="text" defaultValue="Yungay, Ancash" className="flex-1 bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground" /></div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Punto de Destino</label>
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3"><MapPin size={15} className="text-amber-500 flex-shrink-0" /><input type="text" defaultValue="Laguna 69 (4,600 m.s.n.m.)" className="flex-1 bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground" /></div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Horario</label>
          <div className="grid grid-cols-2 gap-3">
            {[{ label: "Fecha de Salida", val: "14 jun. 2026" }, { label: "Hora de Salida", val: "05:30" }, { label: "Retorno Estimado", val: "17:00" }, { label: "Participantes", val: "3 personas" }].map(({ label, val }) => (
              <div key={label} className="bg-card border border-border rounded-xl px-4 py-3"><p className="text-xs text-muted-foreground mb-0.5">{label}</p><p className="text-sm font-semibold">{val}</p></div>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Dificultad</label>
          <div className="flex gap-2">
            {["Fácil", "Moderado", "Difícil", "Experto"].map(d => (
              <button key={d} onClick={() => setDificultad(d)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${dificultad === d ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Contactos a Notificar</label>
          <div className="flex flex-wrap gap-2">
            {CONTACTOS_INICIALES.map((c, i) => (
              <button key={c.id} onClick={() => toggle(i)} className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm font-semibold transition-all ${seleccionados.includes(i) ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-foreground"}`}>
                {seleccionados.includes(i) && <Check size={13} />}{c.nombre.split(" ")[0]}
                <span className={`text-xs font-normal ${seleccionados.includes(i) ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{c.parentesco}</span>
              </button>
            ))}
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"><Plus size={13} /> Agregar</button>
          </div>
        </div>
        <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Observaciones</label><textarea placeholder="Condiciones del terreno, equipamiento, consideraciones especiales..." className={`${I} h-20 resize-none`} /></div>
      </div>
      {/* Fixed button at bottom-16 → sits above the 64px bottom nav */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm px-5 pb-3 pt-3 bg-background border-t border-border">
        <button onClick={() => onNav("expedicion-activa")} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
          <Navigation size={20} /> Registrar Expedición
        </button>
      </div>
    </div>
  );
}

// ── Expedición Activa ───────────────────────────────────────────────────────
// FIXED: increased bottom padding so buttons aren't hidden

export function SenderistExpedicionActiva({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto pb-32">
      <div className="px-5 pt-14 pb-2 flex items-center gap-3">
        <button onClick={() => onNav("inicio")} className="text-muted-foreground flex-shrink-0"><ChevronLeft size={24} /></button>
        <div><p className="text-xs text-muted-foreground">Expedición Activa</p><h1 className="text-lg font-display font-bold leading-tight">{EXPEDICION.nombre}</h1></div>
      </div>
      <div className="mx-5 mt-3 mb-5">
        <div className="bg-secondary rounded-3xl px-6 py-8 text-center">
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Tiempo Restante</p>
          <div className="flex items-end justify-center gap-1 mb-6">
            <span className="font-display font-extrabold text-8xl text-white leading-none">12</span>
            <span className="font-display font-medium text-3xl text-white/40 mb-3">h</span>
            <span className="font-display font-extrabold text-8xl text-white leading-none mx-1">30</span>
            <span className="font-display font-medium text-3xl text-white/40 mb-3">m</span>
          </div>
          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden mb-2.5"><div className="h-full bg-primary rounded-full" style={{ width: `${EXPEDICION.progreso}%` }} /></div>
          <div className="flex justify-between text-xs text-white/35"><span>Salida {EXPEDICION.salida}</span><span>Retorno {EXPEDICION.regresoEstimado}</span></div>
        </div>
      </div>
      <div className="mx-5 mb-4 bg-card rounded-2xl border border-border divide-y divide-border">
        {[
          { Icon: MapPin, label: "Punto de Inicio", value: EXPEDICION.puntoInicio },
          { Icon: MapPin, label: "Punto de Destino", value: EXPEDICION.puntoDestino },
          { Icon: Clock, label: "Retorno Estimado", value: "Hoy a las " + EXPEDICION.regresoEstimado },
          { Icon: Users, label: "Participantes", value: `${EXPEDICION.participantes} personas` },
          { Icon: Activity, label: "Dificultad", value: EXPEDICION.dificultad },
          { Icon: Shield, label: "Contactos Protegidos", value: `${EXPEDICION.contactos} contactos activos` },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3">
            <Icon size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground w-32 flex-shrink-0">{label}</span>
            <span className="text-sm font-medium flex-1">{value}</span>
          </div>
        ))}
      </div>
      <div className="mx-5 mb-5 bg-primary/5 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2"><Shield size={15} className="text-primary" /><span className="text-sm font-bold text-primary">Monitoreo de Seguridad Activo</span></div>
        <p className="text-xs text-foreground/60 leading-relaxed">Tus contactos de emergencia serán notificados automáticamente si no confirmas tu regreso antes de la hora estimada.</p>
      </div>
      <div className="mx-5 space-y-3">
        <button onClick={() => onNav("retorno-confirmado")} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all text-lg">
          <CheckCircle size={22} /> Confirmar Retorno Seguro
        </button>
        <button onClick={() => onNav("alerta-emergencia")} className="w-full py-3 border border-destructive/30 text-destructive font-medium rounded-2xl flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors text-sm">
          <AlertCircle size={16} /> Simular alerta (demo)
        </button>
      </div>
    </div>
  );
}

// ── Retorno Confirmado ──────────────────────────────────────────────────────
// FIXED: pb-20 offsets vertical center above the nav bar

export function SenderistRetornoConfirmado({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto flex flex-col items-center justify-center px-6 text-center pb-20">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30"><Check size={36} className="text-primary-foreground" /></div>
      </div>
      <h1 className="text-3xl font-display font-bold mb-2">¡Retorno Confirmado!</h1>
      <p className="text-muted-foreground mb-8 text-sm">Has regresado de forma segura.</p>
      <div className="w-full bg-card rounded-2xl border border-border p-5 mb-8 text-left space-y-3.5">
        {[
          { label: "Expedición", valor: EXPEDICION.nombre },
          { label: "Hora de Check-in", valor: "Hoy a las 16:47" },
          { label: "Estado", valor: "Finalizada", verde: true },
          { label: "Contactos Notificados", valor: "Luis Mamani, Carmen Torres" },
        ].map(({ label, valor, verde }) => (
          <div key={label} className="flex justify-between items-start gap-3">
            <span className="text-sm text-muted-foreground flex-shrink-0">{label}</span>
            <span className={`text-sm font-semibold text-right ${verde ? "text-primary bg-primary/10 px-2.5 py-0.5 rounded-full" : "text-foreground"}`}>{valor}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full">
        <button onClick={() => onNav("inicio")} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl shadow-md shadow-primary/25 hover:bg-primary/90 transition-all">Volver al Inicio</button>
        <button onClick={() => onNav("crear-expedicion")} className="w-full py-4 bg-card border border-border text-foreground font-medium rounded-2xl hover:bg-muted transition-colors">Registrar Nueva Expedición</button>
      </div>
    </div>
  );
}

// ── Alerta Crítica ──────────────────────────────────────────────────────────
// FIXED: fixed button at bottom-16, content pb-44

export function SenderistAlertaEmergencia({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-red-50 max-w-sm mx-auto pb-44">
      <div className="bg-destructive px-5 pt-14 pb-10">
        <div className="flex items-center gap-2 mb-3"><div className="w-2.5 h-2.5 bg-red-300 rounded-full animate-ping" /><span className="text-red-100 text-xs font-bold uppercase tracking-widest">Alerta Crítica Activa</span></div>
        <h1 className="text-white font-display font-bold text-3xl mb-1">Alerta Crítica Activa</h1>
        <p className="text-red-100/80 text-sm">No se confirmó el retorno a tiempo.</p>
      </div>
      <div className="px-5 -mt-4 mb-5">
        <div className="bg-card rounded-2xl border border-red-200 shadow-sm p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[{ label: "Retorno Esperado", val: "17:00" }, { label: "Hora Actual", val: "21:30" }, { label: "Tiempo de Retraso", val: "4h 30m", danger: true }].map(({ label, val, danger }) => (
              <div key={label}><p className="text-xs text-muted-foreground mb-1">{label}</p><p className={`font-display font-bold ${danger ? "text-destructive" : "text-foreground"}`}>{val}</p></div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-5 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Expedición</h3>
        <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
          {[{ Icon: MapPin, label: "Ruta", value: EXPEDICION.ruta }, { Icon: Users, label: "Participantes", value: "3 personas" }, { Icon: Activity, label: "Dificultad", value: EXPEDICION.dificultad }].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3"><Icon size={14} className="text-muted-foreground" /><span className="text-xs text-muted-foreground w-20">{label}</span><span className="text-sm font-medium">{value}</span></div>
          ))}
        </div>
      </div>
      <div className="px-5 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Notificaciones Enviadas</h3>
        <div className="space-y-2">
          {["Luis Mamani (Hermano)", "Carmen Torres (Madre)", "Brigada de Rescate Andina — Región Ancash"].map(nombre => (
            <div key={nombre} className="bg-card rounded-xl border border-border px-4 py-3 flex items-center gap-3">
              <CheckCircle size={16} className="text-primary flex-shrink-0" /><span className="text-sm font-medium">{nombre}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Fixed above bottom nav */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm px-5 pb-3 pt-3 bg-red-50 border-t border-red-200">
        <button onClick={() => onNav("retorno-confirmado")} className="w-full py-4 bg-destructive text-destructive-foreground font-display font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-500/30 text-lg hover:bg-destructive/90 transition-all">
          <CheckCircle size={22} /> Estoy a Salvo — Confirmar Retorno
        </button>
      </div>
    </div>
  );
}

// ── Perfil (con modales) ────────────────────────────────────────────────────

export function SenderistPerfil({ onNav }: { onNav: (s: string) => void }) {
  type Contacto = typeof CONTACTOS_INICIALES[0];
  const [contactos, setContactos] = useState<Contacto[]>(CONTACTOS_INICIALES);
  const [modal, setModal] = useState<string | null>(null);
  const [selectedContacto, setSelectedContacto] = useState<Contacto | null>(null);
  const [notif, setNotif] = useState({ correo: true, app: true, alertas: true, retorno: true, sistema: false });
  type NotifKey = keyof typeof notif;
  const closeModal = () => { setModal(null); setSelectedContacto(null); };
  const eliminarContacto = () => { if (selectedContacto) setContactos(c => c.filter(x => x.id !== selectedContacto.id)); closeModal(); };

  return (
    <>
      <div className="min-h-screen bg-background max-w-sm mx-auto pb-24">
        <div className="px-5 pt-14 pb-5"><h1 className="text-2xl font-display font-bold">Mi Perfil</h1></div>
        {/* Resumen */}
        <div className="px-5 mb-5">
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"><User size={26} className="text-primary" /></div>
              <div><h2 className="font-display font-bold text-lg">Elena Mamani</h2><p className="text-muted-foreground text-sm">elena@treksafe.pe</p><p className="text-muted-foreground text-xs">+51 987 654 321</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-primary/5 rounded-xl p-3 text-center"><p className="text-2xl font-display font-bold text-primary">14</p><p className="text-xs text-muted-foreground">Expediciones registradas</p></div>
              <div className="bg-primary/5 rounded-xl p-3 text-center"><p className="text-2xl font-display font-bold text-primary">100%</p><p className="text-xs text-muted-foreground">Retornos seguros</p></div>
            </div>
          </div>
        </div>
        {/* Datos personales */}
        <div className="px-5 mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Datos Personales</h3>
          <div className="bg-card rounded-2xl border border-border">
            <div className="divide-y divide-border">
              {[{ label: "Nombre", valor: "Elena Mamani" }, { label: "Correo", valor: "elena@treksafe.pe" }, { label: "Teléfono", valor: "+51 987 654 321" }].map(({ label, valor }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3.5"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium">{valor}</span></div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border">
              <button onClick={() => setModal("edit-personal")} className="w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"><Edit size={14} /> Editar datos personales</button>
            </div>
          </div>
        </div>
        {/* Información médica */}
        <div className="px-5 mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Información Médica</h3>
          <div className="bg-card rounded-2xl border border-border">
            <div className="divide-y divide-border">
              {[{ label: "Grupo Sanguíneo", valor: "A+" }, { label: "Alergias", valor: "Penicilina, Polen" }, { label: "Condiciones Médicas", valor: "Ninguna conocida" }, { label: "Medicamentos Habituales", valor: "Vitamina D3" }].map(({ label, valor }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3.5"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium">{valor}</span></div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-border">
              <button onClick={() => setModal("edit-medico")} className="w-full py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors"><Edit size={14} /> Editar información médica</button>
            </div>
          </div>
        </div>
        {/* Contactos */}
        <div className="px-5 mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Contactos de Emergencia</h3>
          <div className="space-y-3 mb-3">
            {contactos.map(c => (
              <div key={c.id} className="bg-card rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div><p className="font-bold text-sm">{c.nombre}</p><span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{c.parentesco}</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => { setSelectedContacto(c); setModal("edit-contacto"); }} className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80"><Edit size={14} className="text-muted-foreground" /></button>
                    <button onClick={() => { setSelectedContacto(c); setModal("delete"); }} className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100"><Trash2 size={14} className="text-destructive" /></button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Phone size={12} /> {c.telefono}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Mail size={12} /> {c.correo}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setModal("add-contacto")} className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-muted-foreground font-medium flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors text-sm"><Plus size={16} /> Agregar contacto</button>
        </div>
        {/* Notificaciones */}
        <div className="px-5 mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Notificaciones</h3>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {([
              { key: "correo" as NotifKey, label: "Notificaciones por correo" },
              { key: "app" as NotifKey, label: "Notificaciones de la aplicación" },
              { key: "alertas" as NotifKey, label: "Alertas de expedición" },
              { key: "retorno" as NotifKey, label: "Recordatorios de retorno" },
              { key: "sistema" as NotifKey, label: "Notificaciones del sistema" },
            ] as { key: NotifKey; label: string }[]).map(({ key, label }) => (
              <ToggleRow key={key} label={label} value={notif[key]} onChange={() => setNotif(n => ({ ...n, [key]: !n[key] }))} />
            ))}
          </div>
        </div>
        {/* Historial */}
        <div className="px-5 mb-4">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Historial y Estadísticas</h3>
          <div className="bg-card rounded-2xl border border-border">
            <div className="grid grid-cols-3 divide-x divide-border">
              {[{ label: "Finalizadas", val: "14" }, { label: "Regresos Seguros", val: "14" }, { label: "Alertas", val: "0" }].map(({ label, val }) => (
                <div key={label} className="p-4 text-center"><p className="text-2xl font-display font-bold">{val}</p><p className="text-xs text-muted-foreground mt-0.5 leading-tight">{label}</p></div>
              ))}
            </div>
            <div className="px-4 pb-4 pt-2 border-t border-border space-y-2">
              {HISTORIAL_DATA.slice(0, 2).map(e => (<div key={e.nombre} className="flex items-center justify-between text-sm"><span className="text-muted-foreground truncate">{e.nombre}</span><span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{e.fecha}</span></div>))}
              <button onClick={() => onNav("historial-senderista")} className="w-full mt-1 py-2.5 bg-muted text-foreground rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-muted/80"><Navigation size={14} /> Ver historial</button>
            </div>
          </div>
        </div>
        {/* Privacidad */}
        <div className="px-5 mb-5">
          <button onClick={() => onNav("privacidad")} className="w-full bg-card rounded-2xl border border-border px-4 py-3.5 flex items-center gap-3 hover:bg-muted/40 transition-colors">
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0"><Lock size={18} className="text-muted-foreground" /></div>
            <div className="flex-1 text-left"><p className="font-semibold text-sm">Configuración de privacidad</p><p className="text-xs text-muted-foreground">Consentimiento, datos y gestión</p></div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>
        <div className="px-5">
          <button onClick={() => onNav("login")} className="w-full py-3.5 border border-border text-muted-foreground font-medium rounded-2xl hover:bg-muted transition-colors text-sm">Cerrar Sesión</button>
        </div>
      </div>

      {/* Modales */}
      {modal === "edit-personal" && (
        <ModalBackdrop onClose={closeModal}>
          <ModalCard>
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-display font-bold">Editar datos personales</h2><button onClick={closeModal}><X size={20} className="text-muted-foreground" /></button></div>
            <div className="space-y-3 mb-5">
              <div><label className="text-sm font-semibold block mb-1">Nombre completo</label><input defaultValue="Elena Mamani" className={I} /></div>
              <div><label className="text-sm font-semibold block mb-1">Correo electrónico</label><input defaultValue="elena@treksafe.pe" className={I} /></div>
              <div><label className="text-sm font-semibold block mb-1">Teléfono</label><input defaultValue="+51 987 654 321" className={I} /></div>
            </div>
            <div className="flex gap-3"><button onClick={closeModal} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm hover:bg-muted">Cancelar</button><button onClick={closeModal} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">Guardar cambios</button></div>
          </ModalCard>
        </ModalBackdrop>
      )}
      {modal === "edit-medico" && (
        <ModalBackdrop onClose={closeModal}>
          <ModalCard>
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-display font-bold">Editar información médica</h2><button onClick={closeModal}><X size={20} className="text-muted-foreground" /></button></div>
            <div className="space-y-3 mb-5">
              <div><label className="text-sm font-semibold block mb-1">Grupo sanguíneo</label><select className={I}><option>A+</option><option>O+</option><option>B+</option><option>AB+</option></select></div>
              <div><label className="text-sm font-semibold block mb-1">Alergias</label><input defaultValue="Penicilina, Polen" className={I} /></div>
              <div><label className="text-sm font-semibold block mb-1">Condiciones médicas</label><input defaultValue="Ninguna conocida" className={I} /></div>
              <div><label className="text-sm font-semibold block mb-1">Medicamentos habituales</label><input defaultValue="Vitamina D3" className={I} /></div>
            </div>
            <div className="flex gap-3"><button onClick={closeModal} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm hover:bg-muted">Cancelar</button><button onClick={closeModal} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">Guardar cambios</button></div>
          </ModalCard>
        </ModalBackdrop>
      )}
      {(modal === "add-contacto" || modal === "edit-contacto") && (
        <ModalBackdrop onClose={closeModal}>
          <ModalCard>
            <div className="flex items-center justify-between mb-5"><h2 className="text-lg font-display font-bold">{modal === "add-contacto" ? "Agregar contacto" : "Editar contacto"}</h2><button onClick={closeModal}><X size={20} className="text-muted-foreground" /></button></div>
            <div className="space-y-3 mb-5">
              <div><label className="text-sm font-semibold block mb-1">Nombre completo</label><input defaultValue={selectedContacto?.nombre ?? ""} placeholder="Nombre" className={I} /></div>
              <div><label className="text-sm font-semibold block mb-1">Parentesco</label><input defaultValue={selectedContacto?.parentesco ?? ""} placeholder="Ej: Madre, Hermano" className={I} /></div>
              <div><label className="text-sm font-semibold block mb-1">Teléfono</label><input defaultValue={selectedContacto?.telefono ?? ""} placeholder="+51 987 000 000" className={I} /></div>
              <div><label className="text-sm font-semibold block mb-1">Correo electrónico</label><input defaultValue={selectedContacto?.correo ?? ""} placeholder="correo@ejemplo.pe" className={I} /></div>
            </div>
            <div className="flex gap-3"><button onClick={closeModal} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm hover:bg-muted">Cancelar</button><button onClick={closeModal} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">Guardar contacto</button></div>
          </ModalCard>
        </ModalBackdrop>
      )}
      {modal === "delete" && selectedContacto && (
        <ModalBackdrop onClose={closeModal}>
          <ModalCard>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-destructive" /></div>
            <h2 className="text-lg font-display font-bold text-center mb-2">Eliminar contacto</h2>
            <p className="text-sm text-muted-foreground text-center mb-1"><strong className="text-foreground">{selectedContacto.nombre}</strong></p>
            <p className="text-sm text-muted-foreground text-center mb-5">Este contacto ya no será notificado en nuevas expediciones.</p>
            <div className="flex gap-3"><button onClick={closeModal} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm">Cancelar</button><button onClick={eliminarContacto} className="flex-1 py-3 bg-destructive text-destructive-foreground rounded-xl font-semibold text-sm">Eliminar</button></div>
          </ModalCard>
        </ModalBackdrop>
      )}
    </>
  );
}

// ── Historial de Expediciones ───────────────────────────────────────────────

export function SenderistHistorial({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto pb-24">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={() => onNav("perfil")} className="text-muted-foreground"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-display font-bold">Historial de Expediciones</h1>
      </div>
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Finalizadas", val: "14", color: "text-primary" }, { label: "Regresos seguros", val: "14", color: "text-primary" }, { label: "Alertas generadas", val: "0", color: "text-muted-foreground" }].map(({ label, val, color }) => (
            <div key={label} className="bg-card rounded-2xl border border-border p-4 text-center"><p className={`text-3xl font-display font-bold ${color}`}>{val}</p><p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p></div>
          ))}
        </div>
      </div>
      <div className="px-5 space-y-3">
        {HISTORIAL_DATA.map(e => (
          <div key={e.nombre} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Mountain size={18} className="text-primary" /></div>
            <div className="flex-1"><p className="font-semibold text-sm">{e.nombre}</p><p className="text-xs text-muted-foreground">{e.fecha} · {e.km} · {e.dif}</p></div>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full flex-shrink-0">{e.estado}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SPRINT 7 — PRIVACIDAD, OFFLINE, COORDENADAS
// ════════════════════════════════════════════════════════════════════════════

// ── Figura 41: Configuración de Privacidad ──────────────────────────────────

export function SenderistPrivacidad({ onNav }: { onNav: (s: string) => void }) {
  const [toggles, setToggles] = useState({ medica: true, contactos: true, rescate: true });
  type TKey = keyof typeof toggles;

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto pb-24">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={() => onNav("perfil")} className="text-muted-foreground"><ChevronLeft size={24} /></button>
        <div><h1 className="text-xl font-display font-bold">Configuración de Privacidad</h1></div>
      </div>

      {/* Sección 1: Datos personales */}
      <div className="px-5 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Datos Personales y Sensibles</h3>
        <div className="bg-card rounded-2xl border border-border p-4 flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Lock size={18} className="text-primary" /></div>
          <p className="text-sm text-muted-foreground leading-relaxed">Gestiona el uso de tu información médica, contactos de emergencia y rutas registradas.</p>
        </div>
      </div>

      {/* Sección 2: Consentimiento */}
      <div className="px-5 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Consentimiento</h3>
        <div className="bg-card rounded-2xl border border-border divide-y divide-border">
          {([
            { key: "medica" as TKey, label: "Permitir uso de información médica en emergencias" },
            { key: "contactos" as TKey, label: "Permitir notificación a contactos de emergencia" },
            { key: "rescate" as TKey, label: "Permitir compartir datos con equipos de rescate en caso de alerta" },
          ] as { key: TKey; label: string }[]).map(({ key, label }) => (
            <ToggleRow key={key} label={label} value={toggles[key]} onChange={() => setToggles(t => ({ ...t, [key]: !t[key] }))} />
          ))}
        </div>
      </div>

      {/* Sección 3: Gestión de datos */}
      <div className="px-5 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Gestión de Datos</h3>
        <div className="space-y-3">
          <button onClick={() => onNav("solicitud-datos")} className="w-full bg-card border border-border rounded-2xl px-4 py-4 flex items-center gap-3 hover:bg-muted/40 transition-colors">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0"><Trash2 size={18} className="text-destructive" /></div>
            <div className="flex-1 text-left"><p className="font-semibold text-sm">Solicitar eliminación de datos</p><p className="text-xs text-muted-foreground">Eliminar datos personales y médicos</p></div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
          <button onClick={() => onNav("solicitud-datos")} className="w-full bg-card border border-border rounded-2xl px-4 py-4 flex items-center gap-3 hover:bg-muted/40 transition-colors">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0"><Database size={18} className="text-amber-600" /></div>
            <div className="flex-1 text-left"><p className="font-semibold text-sm">Anonimizar historial de rutas</p><p className="text-xs text-muted-foreground">Conservar solo datos estadísticos</p></div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Sección 4: Estado de privacidad */}
      <div className="px-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Estado de Privacidad</h3>
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-3">
          {[
            { Icon: Shield, label: "Datos protegidos", val: "Activo", ok: true },
            { Icon: CheckCircle, label: "Consentimiento activo", val: "Sí", ok: true },
            { Icon: Clock, label: "Última actualización", val: "14 jun 2026", ok: false },
          ].map(({ Icon, label, val, ok }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Icon size={14} className="text-primary" /><span className="text-sm text-foreground">{label}</span></div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${ok ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Figura 42: Solicitud de Datos ───────────────────────────────────────────

export function SenderistSolicitudDatos({ onNav }: { onNav: (s: string) => void }) {
  const [modal, setModal] = useState<"eliminar" | "anonimizar" | "ok" | null>(null);
  const [tipo, setTipo] = useState("");

  const abrir = (t: "eliminar" | "anonimizar") => { setTipo(t); setModal(t); };
  const confirmar = () => setModal("ok");
  const cerrar = () => setModal(null);

  return (
    <>
      <div className="min-h-screen bg-background max-w-sm mx-auto pb-24">
        <div className="px-5 pt-14 pb-4 flex items-center gap-3">
          <button onClick={() => onNav("privacidad")} className="text-muted-foreground"><ChevronLeft size={24} /></button>
          <div><h1 className="text-xl font-display font-bold">Solicitud de Datos Personales</h1></div>
        </div>

        <div className="px-5 mb-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">Las solicitudes serán procesadas por el sistema. El proceso puede tomar hasta 72 horas.</p>
          </div>
        </div>

        <div className="px-5 space-y-4">
          {/* Opción 1: Eliminar */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center"><Trash2 size={18} className="text-destructive" /></div>
              <h3 className="font-display font-bold">Eliminar mis datos</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Se eliminarán tus datos personales, médicos y contactos asociados, según corresponda.</p>
            <button onClick={() => abrir("eliminar")} className="w-full py-3 bg-red-50 text-destructive border border-red-200 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors">
              Solicitar eliminación
            </button>
          </div>

          {/* Opción 2: Anonimizar */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Database size={18} className="text-amber-600" /></div>
              <h3 className="font-display font-bold">Anonimizar historial</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Tus rutas anteriores se conservarán solo con fines estadísticos, sin información personal asociada.</p>
            <button onClick={() => abrir("anonimizar")} className="w-full py-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl font-semibold text-sm hover:bg-amber-100 transition-colors">
              Solicitar anonimización
            </button>
          </div>
        </div>
      </div>

      {/* Modal confirmación */}
      {(modal === "eliminar" || modal === "anonimizar") && (
        <ModalBackdrop onClose={cerrar}>
          <ModalCard>
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4"><AlertTriangle size={22} className="text-amber-600" /></div>
            <h3 className="font-display font-bold text-lg text-center mb-2">Confirmar solicitud</h3>
            <p className="text-sm text-muted-foreground text-center mb-5 leading-relaxed">Esta acción será procesada por el sistema y puede afectar la disponibilidad de tu historial.</p>
            <div className="flex gap-3">
              <button onClick={cerrar} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm">Cancelar</button>
              <button onClick={confirmar} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">Confirmar solicitud</button>
            </div>
          </ModalCard>
        </ModalBackdrop>
      )}

      {/* Success */}
      {modal === "ok" && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-24 px-5">
          <div className="absolute inset-0 bg-black/20" onClick={cerrar} />
          <div className="relative w-full max-w-sm bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3">
            <CheckCircle size={22} className="flex-shrink-0" />
            <p className="font-semibold text-sm">Solicitud registrada correctamente</p>
          </div>
        </div>
      )}
    </>
  );
}

// ── Figura 43: Formulario Offline ───────────────────────────────────────────

export function SenderistOffline({ onNav }: { onNav: (s: string) => void }) {
  const [conexion, setConexion] = useState<"offline" | "online">("offline");
  const [dificultad, setDificultad] = useState("Moderado");

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Banner de estado de conexión */}
      {conexion === "offline" ? (
        <div className="bg-amber-500 px-5 py-3 flex items-start gap-3">
          <WifiOff size={18} className="text-white flex-shrink-0 mt-0.5" />
          <div><p className="text-white font-bold text-sm">Modo sin conexión</p><p className="text-white/80 text-xs mt-0.5 leading-snug">Puedes completar la información básica. Se sincronizará cuando recuperes conexión.</p></div>
        </div>
      ) : (
        <div className="bg-primary px-5 py-3 flex items-center gap-3">
          <Wifi size={18} className="text-white flex-shrink-0" />
          <div><p className="text-white font-bold text-sm">Conexión recuperada</p><p className="text-white/80 text-xs">Puedes sincronizar los datos guardados.</p></div>
        </div>
      )}

      <div className="px-5 pt-4 pb-4 flex items-center gap-3">
        <button onClick={() => onNav("inicio")} className="text-muted-foreground"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-display font-bold">Formulario Offline de Expedición</h1>
      </div>

      {/* Demo toggle */}
      <div className="px-5 mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-medium">Demo — Cambiar estado de conexión</p>
        <div className="flex gap-2">
          <button onClick={() => setConexion("offline")} className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 ${conexion === "offline" ? "bg-amber-500 text-white" : "bg-card border border-border text-muted-foreground"}`}><WifiOff size={12} /> Sin conexión</button>
          <button onClick={() => setConexion("online")} className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 ${conexion === "online" ? "bg-primary text-white" : "bg-card border border-border text-muted-foreground"}`}><Wifi size={12} /> Con conexión</button>
        </div>
      </div>

      {/* Status card */}
      <div className="px-5 mb-4">
        <div className={`rounded-2xl border p-4 flex items-start gap-3 ${conexion === "offline" ? "bg-amber-50 border-amber-200" : "bg-primary/5 border-primary/20"}`}>
          {conexion === "offline" ? <Clock size={16} className="text-amber-600 flex-shrink-0 mt-0.5" /> : <CheckCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />}
          <div>
            <p className={`font-bold text-sm ${conexion === "offline" ? "text-amber-700" : "text-primary"}`}>{conexion === "offline" ? "Guardado temporal" : "Listo para sincronizar"}</p>
            <p className={`text-xs mt-0.5 leading-relaxed ${conexion === "offline" ? "text-amber-600" : "text-primary/70"}`}>
              {conexion === "offline" ? "Los datos se almacenarán en el dispositivo hasta recuperar conexión." : "Los datos guardados están listos para sincronizarse con el servidor."}
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="px-5 pb-44 space-y-4">
        <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Nombre de la ruta</label><input type="text" placeholder="Ej: Laguna 69 — Cordillera Blanca" className={I} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Punto de inicio</label><input type="text" placeholder="Yungay, Ancash" className={I} /></div>
          <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Punto de destino</label><input type="text" placeholder="Laguna 69" className={I} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Fecha de salida</label><input type="date" className={I} /></div>
          <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Hora de salida</label><input type="time" className={I} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Retorno estimado</label><input type="time" className={I} /></div>
          <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Participantes</label><input type="number" defaultValue="1" className={I} /></div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Dificultad</label>
          <div className="flex gap-2">
            {["Fácil", "Moderado", "Difícil", "Experto"].map(d => (
              <button key={d} onClick={() => setDificultad(d)} className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${dificultad === d ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}>{d}</button>
            ))}
          </div>
        </div>
        <div><label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Observaciones</label><textarea placeholder="Condiciones del terreno, equipamiento..." className={`${I} h-16 resize-none`} /></div>
      </div>

      {/* Fixed button above nav */}
      <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-sm px-5 pb-3 pt-3 bg-background border-t border-border">
        {conexion === "offline" ? (
          <button className="w-full py-4 bg-amber-500 text-white font-display font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25">
            <WifiOff size={18} /> Guardar sin conexión
          </button>
        ) : (
          <button className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
            <Wifi size={18} /> Sincronizar ahora
          </button>
        )}
      </div>
    </div>
  );
}

// ── Figura 44: Validación de Coordenadas ────────────────────────────────────

export function SenderistCoordenadas({ onNav }: { onNav: (s: string) => void }) {
  const [estado, setEstado] = useState<"idle" | "validas" | "invalidas">("idle");
  const [lat, setLat] = useState("-9.0105");
  const [lon, setLon] = useState("-77.6042");

  const validar = () => {
    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);
    if (!isNaN(latNum) && !isNaN(lonNum) && Math.abs(latNum) <= 90 && Math.abs(lonNum) <= 180 && lat !== "" && lon !== "") {
      setEstado("validas");
    } else {
      setEstado("invalidas");
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto pb-24">
      <div className="px-5 pt-14 pb-4 flex items-center gap-3">
        <button onClick={() => onNav("inicio")} className="text-muted-foreground"><ChevronLeft size={24} /></button>
        <h1 className="text-xl font-display font-bold">Validación de Coordenadas</h1>
      </div>

      <div className="px-5 space-y-5">
        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-4 flex items-start gap-3">
          <Globe size={15} className="text-secondary flex-shrink-0 mt-0.5" />
          <p className="text-xs text-secondary leading-relaxed">Ingresa coordenadas en formato decimal.<br />Ejemplo: <strong>-9.0105, -77.6042</strong></p>
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Latitud</label>
          <input type="text" value={lat} onChange={e => setLat(e.target.value)} placeholder="-9.0105" className={I} />
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Longitud</label>
          <input type="text" value={lon} onChange={e => setLon(e.target.value)} placeholder="-77.6042" className={I} />
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 block">Referencia del lugar</label>
          <input type="text" placeholder="Ej: Laguna 69, Cordillera Blanca" className={I} />
        </div>

        {/* Demo: simulate invalid */}
        <div className="flex gap-2">
          <button onClick={() => { setLat("-9.0105"); setLon("-77.6042"); setEstado("idle"); }} className="flex-1 py-2 text-xs font-semibold bg-card border border-border rounded-xl text-muted-foreground">Coordenadas válidas</button>
          <button onClick={() => { setLat("abc"); setLon("xyz"); setEstado("idle"); }} className="flex-1 py-2 text-xs font-semibold bg-card border border-border rounded-xl text-muted-foreground">Coordenadas inválidas</button>
        </div>

        <button onClick={validar} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-primary/25 hover:bg-primary/90 transition-all">
          <Globe size={18} /> Validar coordenadas
        </button>

        {/* Resultado: válidas */}
        {estado === "validas" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={18} className="text-emerald-600" />
              <span className="font-bold text-emerald-700">Coordenadas válidas</span>
            </div>
            <div className="space-y-2">
              {[{ label: "Latitud", val: lat }, { label: "Longitud", val: lon }, { label: "Zona aproximada", val: "Cordillera Blanca, Ancash" }, { label: "Estado", val: "Listo para registrar" }].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-emerald-700">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resultado: inválidas */}
        {estado === "invalidas" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={18} className="text-destructive" />
              <span className="font-bold text-destructive">Formato de coordenadas inválido</span>
            </div>
            <p className="text-sm text-red-600 mb-4 leading-relaxed">Verifica que la latitud y longitud estén en formato decimal. Ejemplo: -9.0105, -77.6042</p>
            <button onClick={() => { setLat(""); setLon(""); setEstado("idle"); }} className="w-full py-2.5 bg-destructive text-destructive-foreground rounded-xl text-sm font-semibold">
              Corregir coordenadas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  SPRINT 8 — POLISH, DARK MODE, RECORDATORIO
// ════════════════════════════════════════════════════════════════════════════

// ── Figura 45: Home Optimizado ──────────────────────────────────────────────

export function SenderistHomeOptimizado({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-sm mx-auto">
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div><p className="text-xs text-muted-foreground">Buenos días,</p><h1 className="text-xl font-display font-bold">Elena Mamani</h1></div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <button className="w-10 h-10 bg-card rounded-full border border-border flex items-center justify-center shadow-sm"><Bell size={18} /></button>
        </div>
      </div>

      {/* Status card */}
      <div className="px-5 mb-5">
        <div className="bg-primary rounded-3xl p-6 shadow-xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Estado de Seguridad</p>
              <h2 className="text-white font-display font-bold text-xl leading-tight">Expedición Activa</h2>
              <p className="text-white/70 text-sm mt-0.5">Laguna 69 — Cordillera Blanca</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse" />
          </div>
          <div className="bg-white/15 rounded-2xl px-4 py-3 mb-4">
            <div className="flex justify-between text-sm mb-1.5"><span className="text-white/70">Tiempo restante</span><span className="text-white font-display font-bold">12h 30m</span></div>
            <div className="flex justify-between text-xs mb-2"><span className="text-white/50">Retorno estimado</span><span className="text-white/80">Hoy 17:00</span></div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: "42%" }} /></div>
          </div>
          {/* Quick actions */}
          <div className="flex gap-2">
            <button onClick={() => onNav("expedicion-activa")} className="flex-1 py-3 bg-white text-primary font-semibold rounded-xl text-sm flex items-center justify-center gap-1.5">
              <Compass size={15} /> Ver expedición
            </button>
            <button onClick={() => onNav("crear-expedicion")} className="flex-1 py-3 bg-white/20 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-1.5">
              <Plus size={15} /> Nueva
            </button>
          </div>
        </div>
      </div>

      {/* 4 summary cards */}
      <div className="px-5 mb-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Resumen</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Expediciones Registradas", valor: "14", Icon: Navigation, color: "text-primary", bg: "bg-primary/10" },
            { label: "Contactos Protegidos", valor: "2", Icon: Users, color: "text-secondary", bg: "bg-secondary/10" },
            { label: "Regresos Seguros", valor: "100%", Icon: Shield, color: "text-primary", bg: "bg-primary/10" },
            { label: "Estado del Monitoreo", valor: "Activo", Icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map(({ label, valor, Icon, color, bg }) => (
            <div key={label} className="bg-card rounded-2xl p-4 border border-border">
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-2`}><Icon size={16} className={color} /></div>
              <p className="text-lg font-display font-bold">{valor}</p>
              <p className="text-xs text-muted-foreground leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="px-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Historial Reciente</h3>
        <div className="space-y-2.5">
          {[{ nombre: "Laguna Humantay", fecha: "8 jun", km: "14.2 km" }, { nombre: "Marcahuasi", fecha: "23 may", km: "9.6 km" }].map(({ nombre, fecha, km }) => (
            <div key={nombre} className="bg-card rounded-2xl p-4 border border-border flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Mountain size={18} className="text-primary" /></div>
              <div className="flex-1"><p className="font-semibold text-sm">{nombre}</p><p className="text-xs text-muted-foreground">{fecha} · {km}</p></div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">Completado</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Figura 46: Modo Oscuro ──────────────────────────────────────────────────

export function SenderistModoOscuro({ onNav }: { onNav: (s: string) => void }) {
  // TrekSafe dark palette
  const D = {
    bg: "#0C1A10", card: "#1C2E1E", border: "#2D4530",
    primary: "#22C55E", primaryDim: "rgba(34,197,94,0.15)",
    secondary: "#0F2749", text: "#F0F5F1", muted: "#8FA891",
    navBg: "#111F14", amber: "#F59E0B",
  };

  return (
    <div className="min-h-screen max-w-sm mx-auto" style={{ backgroundColor: D.bg, color: D.text }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: D.muted }}>Buenos días,</p>
          <h1 className="text-xl font-display font-bold" style={{ color: D.text }}>Elena Mamani</h1>
        </div>
        <button style={{ backgroundColor: D.card, borderColor: D.border }} className="w-10 h-10 rounded-full border flex items-center justify-center">
          <Bell size={18} style={{ color: D.text }} />
        </button>
      </div>

      {/* Status card */}
      <div className="px-5 mb-5">
        <div style={{ backgroundColor: D.primary }} className="rounded-3xl p-6 shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-1">Estado de Seguridad</p>
              <h2 className="text-white font-display font-bold text-xl">Expedición Activa</h2>
              <p className="text-white/70 text-sm mt-0.5">Laguna 69 — Cordillera Blanca</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-200 animate-pulse" />
          </div>
          <div className="bg-white/15 rounded-2xl px-4 py-3 mb-4">
            <div className="flex justify-between text-sm mb-2"><span className="text-white/70">Tiempo restante</span><span className="text-white font-display font-bold">12h 30m</span></div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: "42%" }} /></div>
          </div>
          <button onClick={() => onNav("expedicion-activa")} className="w-full py-3.5 bg-white font-display font-semibold rounded-2xl flex items-center justify-center gap-2" style={{ color: D.primary }}>
            <ChevronRight size={18} /> Ver Expedición
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="px-5 mb-5">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: D.muted }}>Resumen</p>
        <div className="grid grid-cols-3 gap-3">
          {[{ label: "Expediciones", val: "14", Icon: Navigation }, { label: "Contactos", val: "2", Icon: Users }, { label: "Regresos Seguros", val: "100%", Icon: Shield }].map(({ label, val, Icon }) => (
            <div key={label} className="rounded-2xl p-4" style={{ backgroundColor: D.card, borderColor: D.border, border: `1px solid ${D.border}` }}>
              <Icon size={18} style={{ color: D.primary }} className="mb-2" />
              <p className="text-xl font-display font-bold" style={{ color: D.text }}>{val}</p>
              <p className="text-xs" style={{ color: D.muted }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="px-5 mb-6">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: D.muted }}>Historial Reciente</p>
        <div className="space-y-2.5">
          {[{ nombre: "Laguna Humantay", fecha: "8 jun", km: "14.2 km" }, { nombre: "Marcahuasi", fecha: "23 may", km: "9.6 km" }].map(({ nombre, fecha, km }) => (
            <div key={nombre} className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: D.card, border: `1px solid ${D.border}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: D.primaryDim }}><Mountain size={18} style={{ color: D.primary }} /></div>
              <div className="flex-1"><p className="font-semibold text-sm" style={{ color: D.text }}>{nombre}</p><p className="text-xs" style={{ color: D.muted }}>{fecha} · {km}</p></div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: D.primaryDim, color: D.primary }}>Completado</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dark bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm border-t z-40" style={{ backgroundColor: D.navBg, borderColor: D.border }}>
        <div className="flex">
          {[{ Icon: Home, label: "Inicio", active: true }, { Icon: Compass, label: "Expedición", active: false }, { Icon: User, label: "Perfil", active: false }].map(({ Icon, label, active }) => (
            <button key={label} className="flex-1 flex flex-col items-center gap-1 py-3">
              <Icon size={22} style={{ color: active ? D.primary : D.muted }} />
              <span className="text-xs font-medium" style={{ color: active ? D.primary : D.muted }}>{label}</span>
            </button>
          ))}
        </div>
      </nav>
      <div className="pb-24" />
    </div>
  );
}

// ── Figura 47: Notificación Preventiva de Retorno ───────────────────────────

export function SenderistRecordatorio({ onNav }: { onNav: (s: string) => void }) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto relative">
      {/* Background: semi-transparent expedition content */}
      <div className="absolute inset-0 opacity-30 pointer-events-none select-none">
        <div className="bg-secondary h-64 w-full" />
        <div className="p-5 space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-card h-12 rounded-2xl border border-border" />)}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/40" />

      {/* Notification card (bottom sheet) */}
      <div className="absolute bottom-20 left-0 right-0 px-4">
        <div className="bg-card rounded-3xl p-6 shadow-2xl border-t-4 border-amber-400">
          {/* Handle */}
          <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-5" />

          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Recordatorio de Retorno</span>
          </div>

          <h2 className="text-xl font-display font-bold mb-2 leading-tight">
            Faltan 30 minutos para tu retorno estimado
          </h2>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Recuerda confirmar tu regreso para evitar una alerta automática.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-5 flex items-center justify-between">
            <div><p className="text-xs text-muted-foreground">Retorno estimado</p><p className="font-display font-bold text-amber-700">Hoy a las 17:00</p></div>
            <Clock size={22} className="text-amber-500" />
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => onNav("retorno-confirmado")} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30">
              <CheckCircle size={20} /> Confirmar retorno
            </button>
            <button onClick={() => onNav("expedicion-activa")} className="w-full py-3 bg-muted text-foreground font-medium rounded-2xl text-sm flex items-center justify-center gap-2">
              <Compass size={16} /> Ver expedición
            </button>
            <button onClick={() => setDismissed(true)} className="w-full py-2 text-muted-foreground text-sm">
              Más tarde
            </button>
          </div>
        </div>
      </div>

      {/* Dismissed state */}
      {dismissed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-card rounded-3xl p-8 mx-5 text-center shadow-2xl">
            <p className="text-muted-foreground text-sm mb-3">Recordatorio descartado.</p>
            <button onClick={() => setDismissed(false)} className="text-primary font-semibold text-sm">Volver a ver</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Figura 48: Expedición Activa con Recordatorio ───────────────────────────

export function SenderistExpedicionRecordatorio({ onNav }: { onNav: (s: string) => void }) {
  const [alertaDismissed, setAlertaDismissed] = useState(false);

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto pb-36">
      {/* Warning banner (30 min remaining) */}
      {!alertaDismissed && (
        <div className="bg-amber-500 px-5 py-3 flex items-center gap-3">
          <AlertTriangle size={18} className="text-white flex-shrink-0" />
          <p className="text-white text-xs font-semibold flex-1">Faltan 30 minutos para tu retorno estimado</p>
          <button onClick={() => setAlertaDismissed(true)} className="text-white/70 hover:text-white transition-colors"><X size={16} /></button>
        </div>
      )}

      <div className="px-5 pt-4 pb-2 flex items-center gap-3">
        <button onClick={() => onNav("inicio")} className="text-muted-foreground flex-shrink-0"><ChevronLeft size={24} /></button>
        <div><p className="text-xs text-muted-foreground">Expedición Activa</p><h1 className="text-lg font-display font-bold leading-tight">{EXPEDICION.nombre}</h1></div>
      </div>

      {/* Countdown — amber tint when near expiry */}
      <div className="mx-5 mt-3 mb-5">
        <div className="bg-amber-500 rounded-3xl px-6 py-8 text-center">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3">Tiempo Restante</p>
          <div className="flex items-end justify-center gap-1 mb-4">
            <span className="font-display font-extrabold text-8xl text-white leading-none">0</span>
            <span className="font-display font-medium text-3xl text-white/50 mb-3">h</span>
            <span className="font-display font-extrabold text-8xl text-white leading-none mx-1">30</span>
            <span className="font-display font-medium text-3xl text-white/50 mb-3">m</span>
          </div>
          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden mb-2.5"><div className="h-full bg-white rounded-full" style={{ width: "94%" }} /></div>
          <div className="flex justify-between text-xs text-white/40"><span>Salida {EXPEDICION.salida}</span><span>Retorno {EXPEDICION.regresoEstimado}</span></div>
        </div>
      </div>

      {/* Expedition details */}
      <div className="mx-5 mb-4 bg-card rounded-2xl border border-border divide-y divide-border">
        {[
          { Icon: MapPin, label: "Punto de Inicio", value: EXPEDICION.puntoInicio },
          { Icon: MapPin, label: "Punto de Destino", value: EXPEDICION.puntoDestino },
          { Icon: Clock, label: "Retorno Estimado", value: "Hoy a las " + EXPEDICION.regresoEstimado },
          { Icon: Users, label: "Participantes", value: `${EXPEDICION.participantes} personas` },
          { Icon: Activity, label: "Dificultad", value: EXPEDICION.dificultad },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3">
            <Icon size={14} className="text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground w-32 flex-shrink-0">{label}</span>
            <span className="text-sm font-medium flex-1">{value}</span>
          </div>
        ))}
      </div>

      {/* Warning card — Próximo a expirar */}
      {!alertaDismissed && (
        <div className="mx-5 mb-4 bg-amber-50 border border-amber-300 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="text-sm font-bold text-amber-700">Próximo a expirar</span>
          </div>
          <p className="text-xs text-amber-700 leading-relaxed mb-4">
            Faltan 30 minutos para tu retorno estimado. Confirma tu regreso a tiempo para evitar una alerta automática.
          </p>
          <button onClick={() => setAlertaDismissed(true)} className="text-xs text-amber-600 font-semibold hover:text-amber-700">
            Entendido
          </button>
        </div>
      )}

      {/* Safety monitoring */}
      <div className="mx-5 mb-5 bg-primary/5 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2"><Shield size={15} className="text-primary" /><span className="text-sm font-bold text-primary">Monitoreo de Seguridad Activo</span></div>
        <p className="text-xs text-foreground/60 leading-relaxed">Tus contactos de emergencia serán notificados automáticamente si no confirmas tu regreso antes de la hora estimada.</p>
      </div>

      {/* Actions */}
      <div className="mx-5 space-y-3">
        <button onClick={() => onNav("retorno-confirmado")} className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all text-lg">
          <CheckCircle size={22} /> Confirmar Retorno Seguro
        </button>
        <button className="w-full py-3 bg-card border border-border text-foreground font-medium rounded-2xl flex items-center justify-center gap-2 text-sm hover:bg-muted transition-colors">
          <Users size={16} /> Ver contactos notificados
        </button>
      </div>
    </div>
  );
}
