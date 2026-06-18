import { useState } from "react";
import {
  Mountain, Shield, MapPin, Clock, Users, Phone, Mail,
  CheckCircle, ChevronLeft, Navigation, Activity, Heart,
  User, AlertCircle, Radio, BarChart3, X, Plus, Edit,
} from "lucide-react";

// ── Datos mock ───────────────────────────────────────────────────────────────

const EXPEDICIONES = [
  { id: 1, senderista: "Carlos Mamani", ruta: "Laguna 69", regreso: "Hoy 16:00", estado: "activo" as const },
  { id: 2, senderista: "Ana Torres", ruta: "Nevado Huascarán", regreso: "Hoy 19:00", estado: "retrasado" as const, retraso: "2h 15m" },
  { id: 3, senderista: "Diego Quispe", ruta: "Laguna Humantay", regreso: "Hoy 15:30", estado: "alerta" as const, retraso: "4h 30m" },
  { id: 4, senderista: "Lucía Flores", ruta: "Marcahuasi", regreso: "Mañana 12:00", estado: "activo" as const },
  { id: 5, senderista: "Miguel Paredes", ruta: "Ausangate", regreso: "Hoy 18:00", estado: "activo" as const },
];

const RESCATES_ACTIVOS = [
  { id: 1, senderista: "Diego Quispe", ruta: "Laguna Humantay", brigada: "Brigada Norte — Ancash", inicio: "Hoy 23:45", estado: "En camino" },
  { id: 2, senderista: "Rosa Condori", ruta: "Nevado Ausangate", brigada: "Brigada Sur — Cusco", inicio: "Ayer 14:30", estado: "En zona" },
];

const HISTORIAL_RESCATES = [
  { senderista: "Elena Mamani", ruta: "Laguna 69", fecha: "8 jun 2026", estado: "Cerrado", tiempo: "3h 20m" },
  { senderista: "Juan Pérez", ruta: "Nevado Huascarán", fecha: "2 may 2026", estado: "Cerrado", tiempo: "5h 45m" },
  { senderista: "María Quispe", ruta: "Laguna Humantay", fecha: "14 abr 2026", estado: "Cerrado", tiempo: "2h 10m" },
  { senderista: "Luis Torres", ruta: "Marcahuasi", fecha: "1 mar 2026", estado: "Cerrado", tiempo: "4h 05m" },
];

// ── Shared UI ────────────────────────────────────────────────────────────────

function EstadoBadge({ estado, retraso }: { estado: string; retraso?: string }) {
  if (estado === "activo") return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Activo</span>;
  if (estado === "retrasado") return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Retrasado {retraso}</span>;
  return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 animate-pulse">Alerta {retraso}</span>;
}

// Bottom sheet overlay
function BottomSheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="w-full max-w-sm bg-card rounded-t-3xl px-6 pt-4 pb-10 shadow-2xl">
          <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-5" />
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-bold text-lg">{title}</h3>
            <button onClick={onClose}><X size={20} className="text-muted-foreground" /></button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

// Centered modal overlay
function ConfirmModal({ title, message, note, onCancel, onConfirm, confirmLabel = "Confirmar", confirmClass = "bg-primary text-primary-foreground" }: {
  title: string; message: string; note?: boolean;
  onCancel: () => void; onConfirm: (nota?: string) => void;
  confirmLabel?: string; confirmClass?: string;
}) {
  const [texto, setTexto] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl">
        <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{message}</p>
        {note && (
          <div className="mb-4">
            <label className="text-sm font-semibold block mb-1.5">Nota de cierre (opcional)</label>
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder="Detalle del cierre..."
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-20 placeholder:text-muted-foreground"
            />
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm hover:bg-muted transition-colors">Cancelar</button>
          <button onClick={() => onConfirm(texto)} className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${confirmClass}`}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// Success toast (overlay)
function SuccessOverlay({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-12 px-5">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3">
        <CheckCircle size={22} className="flex-shrink-0" />
        <p className="font-semibold text-sm">{message}</p>
      </div>
    </div>
  );
}

// ── Bottom Nav ───────────────────────────────────────────────────────────────

function RescatistaBottomNav({ activo, onNav }: { activo: string; onNav: (s: string) => void }) {
  const items = [
    { id: "rescatista-panel", Icon: BarChart3, label: "Panel" },
    { id: "rescatista-expediciones", Icon: Navigation, label: "Expeds." },
    { id: "rescatista-alertas", Icon: AlertCircle, label: "Alertas" },
    { id: "rescatista-rescates", Icon: Radio, label: "Rescates" },
    { id: "rescatista-perfil", Icon: User, label: "Perfil" },
  ];
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-card border-t border-border">
      <div className="flex">
        {items.map(({ id, Icon, label }) => (
          <button key={id} onClick={() => onNav(id)} className={`flex-1 flex flex-col items-center gap-1 py-2.5 transition-colors ${activo === id ? "text-primary" : "text-muted-foreground"}`}>
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function Header({ titulo, onBack }: { titulo: string; onBack?: () => void }) {
  return (
    <div className="px-5 pt-14 pb-4 flex items-center gap-3 bg-secondary">
      {onBack && <button onClick={onBack} className="text-white/70 hover:text-white flex-shrink-0"><ChevronLeft size={24} /></button>}
      <div className="flex items-center gap-2.5 flex-1">
        {!onBack && <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center flex-shrink-0"><Mountain size={14} className="text-primary-foreground" /></div>}
        <h1 className="text-white font-display font-bold text-lg leading-tight">{titulo}</h1>
      </div>
    </div>
  );
}

// ── Panel de Control ────────────────────────────────────────────────────────

function RescatistaPanel({ onNav }: { onNav: (s: string) => void }) {
  const activos = EXPEDICIONES.filter(e => e.estado === "activo").length;
  const retrasados = EXPEDICIONES.filter(e => e.estado === "retrasado").length;
  const alertas = EXPEDICIONES.filter(e => e.estado === "alerta").length;

  return (
    <div className="pb-24">
      <Header titulo="Panel de Control" />
      <div className="px-5 pt-4">
        <p className="text-xs text-muted-foreground mb-4">Monitoreo de expediciones en tiempo real</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Expediciones Activas", val: activos, color: "text-primary", bg: "bg-primary/10", Icon: Navigation },
            { label: "Expediciones Retrasadas", val: retrasados, color: "text-amber-600", bg: "bg-amber-50", Icon: Clock },
            { label: "Alertas Activas", val: alertas, color: "text-destructive", bg: "bg-red-50", Icon: AlertCircle },
            { label: "Casos Cerrados", val: 12, color: "text-secondary", bg: "bg-secondary/10", Icon: CheckCircle },
          ].map(({ label, val, color, bg, Icon }) => (
            <div key={label} className="bg-card rounded-2xl border border-border p-4">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}><Icon size={18} className={color} /></div>
              <p className={`text-3xl font-display font-bold ${color}`}>{val}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold">Alertas Recientes</h2>
            <button onClick={() => onNav("rescatista-alertas")} className="text-xs text-primary font-semibold">Ver todas</button>
          </div>
          <div className="space-y-3">
            {EXPEDICIONES.filter(e => e.estado !== "activo").map(e => (
              <div key={e.id} className={`bg-card rounded-2xl border p-4 ${e.estado === "alerta" ? "border-red-200 bg-red-50/30" : "border-amber-200 bg-amber-50/20"}`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-semibold text-sm">{e.senderista}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><MapPin size={11} /> {e.ruta}</div>
                  </div>
                  <EstadoBadge estado={e.estado} retraso={(e as { retraso?: string }).retraso} />
                </div>
                <button onClick={() => onNav("rescatista-detalle-alerta")} className={`w-full py-2 rounded-xl text-xs font-bold transition-colors ${e.estado === "alerta" ? "bg-destructive text-destructive-foreground" : "bg-amber-500 text-white"}`}>
                  Ver alerta
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold">Expediciones Activas</h2>
            <button onClick={() => onNav("rescatista-expediciones")} className="text-xs text-primary font-semibold">Ver todas</button>
          </div>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {EXPEDICIONES.filter(e => e.estado === "activo").map(e => (
              <div key={e.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"><User size={13} className="text-secondary" /></div>
                <div className="flex-1 min-w-0"><p className="font-semibold text-sm truncate">{e.senderista}</p><p className="text-xs text-muted-foreground truncate">{e.ruta} · {e.regreso}</p></div>
                <EstadoBadge estado={e.estado} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Expediciones ────────────────────────────────────────────────────────────

function RescatistaExpediciones({ onNav }: { onNav: (s: string) => void }) {
  const [filtro, setFiltro] = useState<"todas" | "activo" | "retrasado" | "alerta">("todas");
  const conteos = { todas: EXPEDICIONES.length, activo: EXPEDICIONES.filter(e => e.estado === "activo").length, retrasado: EXPEDICIONES.filter(e => e.estado === "retrasado").length, alerta: EXPEDICIONES.filter(e => e.estado === "alerta").length };
  const filtradas = filtro === "todas" ? EXPEDICIONES : EXPEDICIONES.filter(e => e.estado === filtro);
  const labels: Record<typeof filtro, string> = { todas: "Todas", activo: "Activas", retrasado: "Retrasadas", alerta: "Alertas" };

  return (
    <div className="pb-24">
      <Header titulo="Expediciones" />
      <div className="px-5 pt-4">
        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
          {(["todas", "activo", "retrasado", "alerta"] as const).map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filtro === f ? "bg-foreground text-background" : "bg-card border border-border text-muted-foreground"}`}>
              {labels[f]} <span className="opacity-60">{conteos[f]}</span>
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {filtradas.map(e => (
            <div key={e.id} className={`bg-card rounded-2xl border p-4 ${e.estado === "alerta" ? "border-red-200 bg-red-50/20" : "border-border"}`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"><User size={14} className="text-secondary" /></div>
                  <div><p className="font-semibold text-sm">{e.senderista}</p><div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><MapPin size={11} /> {e.ruta}</div></div>
                </div>
                <EstadoBadge estado={e.estado} retraso={(e as { retraso?: string }).retraso} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={11} /> Retorno: {e.regreso}</div>
                <button onClick={() => onNav("rescatista-detalle-alerta")} className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${e.estado === "alerta" ? "bg-destructive text-destructive-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
                  {e.estado === "alerta" ? "Ver alerta" : "Detalles"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Gestión de Alertas ──────────────────────────────────────────────────────

function RescatistaAlertas({ onNav }: { onNav: (s: string) => void }) {
  const alertas = EXPEDICIONES.filter(e => e.estado !== "activo");
  return (
    <div className="pb-24">
      <Header titulo="Gestión de Alertas" />
      <div className="px-5 pt-4">
        <p className="text-xs text-muted-foreground mb-4">{alertas.length} alertas requieren atención</p>
        <div className="space-y-4">
          {alertas.map(e => (
            <div key={e.id} className={`bg-card rounded-2xl border p-5 ${e.estado === "alerta" ? "border-red-200" : "border-amber-200"}`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div><p className="font-bold text-base">{e.senderista}</p><div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><MapPin size={11} /> {e.ruta}</div></div>
                <EstadoBadge estado={e.estado} retraso={(e as { retraso?: string }).retraso} />
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className={`rounded-xl p-2.5 text-center ${e.estado === "alerta" ? "bg-red-50" : "bg-amber-50"}`}>
                  <p className="text-xs text-muted-foreground">Tiempo de Retraso</p>
                  <p className={`font-display font-bold text-sm ${e.estado === "alerta" ? "text-destructive" : "text-amber-700"}`}>{(e as { retraso?: string }).retraso ?? "—"}</p>
                </div>
                <div className="bg-muted rounded-xl p-2.5 text-center">
                  <p className="text-xs text-muted-foreground">Retorno Estimado</p>
                  <p className="font-display font-bold text-sm">{e.regreso}</p>
                </div>
              </div>
              <button onClick={() => onNav("rescatista-detalle-alerta")} className={`w-full py-2.5 rounded-xl text-sm font-bold transition-colors ${e.estado === "alerta" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-amber-500 text-white hover:bg-amber-600"}`}>
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Detalle de Alerta (con modales accionables + bitácora) ──────────────────

function RescatistaAlertaDetalle({ onNav }: { onNav: (s: string) => void }) {
  type ModalType =
    | null
    | "seguimiento-confirm" | "seguimiento-ok"
    | "contactar-senderista"
    | "contactar-emergencia"
    | "contactar-bomberos"
    | "contactar-policia"
    | "cerrar-confirm" | "cerrar-ok"
    | "agregar-nota";

  const [modal, setModal] = useState<ModalType>(null);
  const [casoStatus, setCasoStatus] = useState<"activo" | "en-seguimiento" | "cerrado">("activo");
  const [bitacora, setBitacora] = useState([
    { texto: "Alerta generada automáticamente", hora: "15:30" },
    { texto: "Contactos de emergencia notificados", hora: "15:32" },
    { texto: "Rescatista asignado al caso", hora: "15:45" },
  ]);
  const [notaTexto, setNotaTexto] = useState("");

  const addBitacora = (texto: string) => setBitacora(b => [...b, { texto, hora: "Ahora" }]);
  const close = () => setModal(null);

  const confirmSeguimiento = () => {
    setCasoStatus("en-seguimiento");
    addBitacora("Caso marcado en seguimiento");
    setModal("seguimiento-ok");
  };

  const confirmCierre = (nota?: string) => {
    setCasoStatus("cerrado");
    addBitacora("Caso cerrado" + (nota ? `: ${nota}` : ""));
    setModal("cerrar-ok");
  };

  const registrarBomberos = () => {
    addBitacora("Contacto con Bomberos registrado en bitácora");
    close();
  };

  const registrarPolicia = () => {
    addBitacora("Contacto con Policía registrado en bitácora");
    close();
  };

  return (
    <>
      <div className="pb-8">
        {/* Header alerta */}
        <div className="bg-destructive px-5 pt-14 pb-6">
          <button onClick={() => onNav("rescatista-alertas")} className="flex items-center gap-1 text-red-200 text-xs font-semibold mb-3"><ChevronLeft size={16} /> Gestión de Alertas</button>
          <div className="flex items-center gap-2 mb-2"><div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" /><span className="text-red-100 text-xs font-bold uppercase tracking-widest">Alerta Crítica</span></div>
          <div className="flex items-center justify-between">
            <h1 className="text-white font-display font-bold text-2xl">Detalle de Alerta</h1>
            {casoStatus === "en-seguimiento" && <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">En seguimiento</span>}
            {casoStatus === "cerrado" && <span className="bg-green-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full">Caso cerrado</span>}
          </div>
          <p className="text-red-100/80 text-sm mt-1">Diego Quispe · Laguna Humantay</p>
        </div>

        <div className="px-5 pt-4 space-y-4">
          {/* Info senderista */}
          <section className="bg-card rounded-2xl border border-border p-4">
            <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2"><User size={15} className="text-primary" /> Información del Senderista</h3>
            <div className="space-y-2">
              {[{ label: "Nombre", valor: "Diego Quispe" }, { label: "Teléfono", valor: "+51 987 345 678" }, { label: "Correo", valor: "diego.quispe@correo.pe" }].map(({ label, valor }) => (
                <div key={label} className="flex gap-3"><span className="text-xs text-muted-foreground w-20 flex-shrink-0">{label}</span><span className="text-sm font-medium">{valor}</span></div>
              ))}
            </div>
          </section>

          {/* Info médica */}
          <section className="bg-card rounded-2xl border border-border p-4">
            <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2"><Heart size={15} className="text-red-500" /> Información Médica</h3>
            <div className="grid grid-cols-2 gap-2">
              {[{ label: "Grupo Sanguíneo", valor: "O+" }, { label: "Alergias", valor: "Ninguna" }, { label: "Condiciones médicas", valor: "Asma leve" }, { label: "Medicamentos habituales", valor: "Salbutamol" }].map(({ label, valor }) => (
                <div key={label} className="bg-muted rounded-xl p-3"><p className="text-xs text-muted-foreground mb-0.5">{label}</p><p className="text-sm font-bold">{valor}</p></div>
              ))}
            </div>
          </section>

          {/* Detalles expedición */}
          <section className="bg-card rounded-2xl border border-border p-4">
            <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2"><Navigation size={15} className="text-primary" /> Detalles de la Expedición</h3>
            <div className="space-y-2">
              {[
                { label: "Ruta", valor: "Cusco → Mollepata → Laguna Humantay" },
                { label: "Punto de Inicio", valor: "Mollepata, Cusco" },
                { label: "Punto de Destino", valor: "Laguna Humantay (4,200 m.s.n.m.)" },
                { label: "Participantes", valor: "2 personas" },
                { label: "Dificultad", valor: "Moderado" },
                { label: "Retorno Estimado", valor: "Hoy a las 15:30" },
                { label: "Tiempo de Retraso", valor: "4h 30m", danger: true },
              ].map(({ label, valor, danger }) => (
                <div key={label} className="flex gap-3"><span className="text-xs text-muted-foreground w-32 flex-shrink-0">{label}</span><span className={`text-sm font-medium ${danger ? "text-destructive font-bold" : ""}`}>{valor}</span></div>
              ))}
            </div>
          </section>

          {/* Contactos de emergencia */}
          <section className="bg-card rounded-2xl border border-border p-4">
            <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2"><Users size={15} className="text-primary" /> Contactos de Emergencia</h3>
            <div className="space-y-3">
              {[{ nombre: "Rosa Quispe", parentesco: "Madre", tel: "+51 987 111 222" }, { nombre: "Jorge Quispe", parentesco: "Hermano", tel: "+51 987 333 444" }].map(({ nombre, parentesco, tel }) => (
                <div key={nombre} className="flex items-center justify-between bg-muted/50 rounded-xl px-3 py-2.5">
                  <div><p className="font-semibold text-sm">{nombre}</p><p className="text-xs text-muted-foreground">{parentesco} · {tel}</p></div>
                  <div className="flex items-center gap-1 text-xs text-primary font-semibold"><CheckCircle size={13} /> Notificado</div>
                </div>
              ))}
            </div>
          </section>

          {/* Acciones */}
          <section className="bg-card rounded-2xl border border-border p-4 space-y-2.5">
            <h3 className="font-display font-bold text-sm mb-3">Acciones</h3>
            {casoStatus === "activo" && (
              <button onClick={() => setModal("seguimiento-confirm")} className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors">
                <Activity size={15} /> Marcar en seguimiento
              </button>
            )}
            {casoStatus === "en-seguimiento" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 font-semibold text-center">✓ Alerta marcada en seguimiento</div>
            )}
            <button onClick={() => setModal("contactar-senderista")} className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              <Phone size={15} /> Contactar senderista
            </button>
            <button onClick={() => setModal("contactar-emergencia")} className="w-full py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors">
              <Users size={15} /> Contactar contacto de emergencia
            </button>
            <button onClick={() => setModal("contactar-bomberos")} className="w-full py-3 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-orange-100 transition-colors">
              <Shield size={15} /> Contactar bomberos
            </button>
            <button onClick={() => setModal("contactar-policia")} className="w-full py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
              <Shield size={15} /> Contactar policía
            </button>
            {casoStatus !== "cerrado" && (
              <button onClick={() => setModal("cerrar-confirm")} className="w-full py-3 border border-border text-muted-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                Cerrar caso
              </button>
            )}
            {casoStatus === "cerrado" && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-sm text-primary font-semibold text-center">✓ Caso cerrado correctamente</div>
            )}
          </section>

          {/* Bitácora del caso */}
          <section className="bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm">Bitácora del Caso</h3>
              <button onClick={() => setModal("agregar-nota")} className="text-xs text-primary font-semibold flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                <Plus size={12} /> Agregar nota
              </button>
            </div>
            <div className="space-y-0">
              {bitacora.map((entry, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1" />
                    {i < bitacora.length - 1 && <div className="w-0.5 bg-border flex-1 my-1" />}
                  </div>
                  <div className={`pb-3 ${i < bitacora.length - 1 ? "" : ""}`}>
                    <p className="text-sm font-medium leading-tight">{entry.texto}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{entry.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ─── Modales / Sheets ─── */}

      {/* Marcar en seguimiento — confirmación */}
      {modal === "seguimiento-confirm" && (
        <ConfirmModal
          title="Marcar alerta en seguimiento"
          message="Esta alerta pasará al estado En seguimiento y quedará registrada en la bitácora."
          onCancel={close}
          onConfirm={confirmSeguimiento}
        />
      )}

      {/* Seguimiento — éxito */}
      {modal === "seguimiento-ok" && (
        <SuccessOverlay message="La alerta fue marcada en seguimiento." onClose={close} />
      )}

      {/* Contactar senderista */}
      {modal === "contactar-senderista" && (
        <BottomSheet title="Contactar senderista" onClose={close}>
          <div className="bg-muted/50 rounded-2xl p-4 mb-5">
            <p className="font-bold">Diego Quispe</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1"><Phone size={13} /> +51 987 345 678</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5"><Mail size={13} /> diego.quispe@correo.pe</div>
          </div>
          <div className="space-y-2">
            <button onClick={close} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center justify-center gap-2"><Phone size={15} /> Llamar</button>
            <button onClick={close} className="w-full py-3 bg-muted text-foreground rounded-xl font-medium text-sm flex items-center justify-center gap-2"><Mail size={15} /> Enviar correo</button>
            <button onClick={close} className="w-full py-2 text-muted-foreground text-sm">Cancelar</button>
          </div>
        </BottomSheet>
      )}

      {/* Contactar contacto de emergencia */}
      {modal === "contactar-emergencia" && (
        <BottomSheet title="Contactos de emergencia" onClose={close}>
          <div className="space-y-3 mb-4">
            {[{ nombre: "Rosa Quispe", parentesco: "Madre", tel: "+51 987 111 222" }, { nombre: "Jorge Quispe", parentesco: "Hermano", tel: "+51 987 333 444" }].map(c => (
              <div key={c.nombre} className="bg-muted/50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <div><p className="font-bold text-sm">{c.nombre}</p><p className="text-xs text-muted-foreground">{c.parentesco} · {c.tel}</p></div>
                  <div className="flex items-center gap-1 text-xs text-primary font-semibold"><CheckCircle size={12} /> Notificado</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button onClick={close} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1"><Phone size={12} /> Llamar</button>
                  <button onClick={close} className="flex-1 py-2 bg-muted text-foreground rounded-lg text-xs font-medium flex items-center justify-center gap-1"><Mail size={12} /> Correo</button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={close} className="w-full py-2 text-muted-foreground text-sm">Cancelar</button>
        </BottomSheet>
      )}

      {/* Contactar bomberos */}
      {modal === "contactar-bomberos" && (
        <BottomSheet title="Contactar bomberos" onClose={close}>
          <div className="bg-orange-50 rounded-2xl p-4 mb-5">
            <p className="font-bold text-sm">Cuerpo General de Bomberos</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1"><Phone size={13} /> 116 (emergencias)</div>
            <div className="flex items-center gap-2 mt-1"><span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Disponible</span></div>
          </div>
          <div className="space-y-2">
            <button onClick={close} className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"><Phone size={15} /> Llamar</button>
            <button onClick={registrarBomberos} className="w-full py-3 bg-muted text-foreground rounded-xl font-medium text-sm">Registrar contacto en bitácora</button>
            <button onClick={close} className="w-full py-2 text-muted-foreground text-sm">Cancelar</button>
          </div>
        </BottomSheet>
      )}

      {/* Contactar policía */}
      {modal === "contactar-policia" && (
        <BottomSheet title="Contactar policía" onClose={close}>
          <div className="bg-blue-50 rounded-2xl p-4 mb-5">
            <p className="font-bold text-sm">Policía Nacional del Perú</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1"><Phone size={13} /> 105 (emergencias)</div>
            <div className="flex items-center gap-2 mt-1"><span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Disponible</span></div>
          </div>
          <div className="space-y-2">
            <button onClick={close} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"><Phone size={15} /> Llamar</button>
            <button onClick={registrarPolicia} className="w-full py-3 bg-muted text-foreground rounded-xl font-medium text-sm">Registrar contacto en bitácora</button>
            <button onClick={close} className="w-full py-2 text-muted-foreground text-sm">Cancelar</button>
          </div>
        </BottomSheet>
      )}

      {/* Cerrar caso — confirmación */}
      {modal === "cerrar-confirm" && (
        <ConfirmModal
          title="Cerrar caso"
          message="Esta acción marcará la alerta como cerrada. Debe usarse solo cuando el incidente haya sido resuelto."
          note={true}
          onCancel={close}
          onConfirm={confirmCierre}
          confirmLabel="Cerrar caso"
          confirmClass="bg-destructive text-destructive-foreground"
        />
      )}

      {/* Cerrar caso — éxito */}
      {modal === "cerrar-ok" && (
        <SuccessOverlay message="El caso fue cerrado correctamente." onClose={close} />
      )}

      {/* Agregar nota a la bitácora */}
      {modal === "agregar-nota" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-black/40" onClick={close} />
          <div className="relative w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg">Agregar nota a la bitácora</h3>
              <button onClick={close}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <label className="text-sm font-semibold block mb-2">Detalle de la acción realizada</label>
            <textarea
              value={notaTexto}
              onChange={e => setNotaTexto(e.target.value)}
              placeholder="Describe la acción tomada..."
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-24 placeholder:text-muted-foreground mb-4"
            />
            <div className="flex gap-3">
              <button onClick={close} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={() => { if (notaTexto.trim()) { addBitacora(notaTexto.trim()); setNotaTexto(""); close(); } }} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors">
                Guardar nota
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Operaciones de Rescate ──────────────────────────────────────────────────

function RescatistaRescates({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="pb-24">
      <Header titulo="Operaciones de Rescate" />
      <div className="px-5 pt-4">
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[{ label: "En Curso", val: RESCATES_ACTIVOS.length, color: "text-destructive", bg: "bg-red-50" }, { label: "Esta Semana", val: 5, color: "text-amber-600", bg: "bg-amber-50" }, { label: "Mes (Completados)", val: 18, color: "text-primary", bg: "bg-primary/10" }].map(({ label, val, color, bg }) => (
            <div key={label} className={`${bg} rounded-2xl p-3 border border-border text-center`}>
              <p className={`text-3xl font-display font-bold ${color}`}>{val}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Operaciones Activas</p>
        <div className="space-y-3">
          {RESCATES_ACTIVOS.map(r => (
            <div key={r.id} className="bg-card rounded-2xl border border-red-200 p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div><p className="font-bold text-sm">{r.senderista}</p><div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><MapPin size={11} /> {r.ruta}</div></div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${r.estado === "En zona" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{r.estado}</span>
              </div>
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Radio size={11} /> {r.brigada}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock size={11} /> Inicio: {r.inicio}</div>
              </div>
              <button onClick={() => onNav("rescatista-detalle-alerta")} className="w-full py-2 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold hover:bg-secondary/90 transition-colors">Ver caso</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Perfil Rescatista (institucional read-only) ─────────────────────────────

function RescatistaPerfil({ onNav }: { onNav: (s: string) => void }) {
  const [disponible, setDisponible] = useState(true);
  const [editContacto, setEditContacto] = useState(false);

  return (
    <>
      <div className="pb-24">
        <Header titulo="Mi Perfil" />
        <div className="px-5 pt-4">
          <p className="text-xs text-muted-foreground mb-4">Perfil de rescatista</p>

          {/* Tarjeta principal */}
          <div className="bg-card rounded-2xl border border-border p-5 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0"><User size={26} className="text-secondary" /></div>
              <div>
                <h2 className="font-display font-bold text-lg">Carlos Mendoza</h2>
                <p className="text-muted-foreground text-sm">carlos.mendoza@rescate.gob.pe</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className={`w-2 h-2 rounded-full ${disponible ? "bg-primary" : "bg-muted-foreground"}`} />
                  <span className={`text-xs font-semibold ${disponible ? "text-primary" : "text-muted-foreground"}`}>{disponible ? "Disponible" : "No disponible"}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setDisponible(d => !d)} className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${disponible ? "bg-muted text-foreground hover:bg-muted/80" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              Cambiar disponibilidad
            </button>
          </div>

          {/* Información institucional (read-only) */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Información Institucional</h3>
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle size={11} /> Credencial validada</span>
            </div>
            <div className="bg-card rounded-2xl border border-border divide-y divide-border">
              {[
                { label: "Institución", valor: "Brigada de Rescate Andina" },
                { label: "Especialidad", valor: "Búsqueda y Rescate en Altura" },
                { label: "Zona de Operación", valor: "Ancash — Huaraz" },
                { label: "Credencial", valor: "CRA-2024-0312" },
              ].map(({ label, valor }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3.5">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold">{valor}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 px-1">Los datos institucionales son de solo lectura y fueron validados durante el registro.</p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[{ label: "Rescates Atendidos", val: "47", Icon: Radio, color: "text-primary" }, { label: "Alertas Gestionadas", val: "128", Icon: AlertCircle, color: "text-amber-600" }].map(({ label, val, Icon, color }) => (
              <div key={label} className="bg-card rounded-2xl border border-border p-4">
                <Icon size={18} className={`${color} mb-2`} />
                <p className={`text-3xl font-display font-bold ${color}`}>{val}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Acciones */}
          <div className="space-y-3">
            <button onClick={() => onNav("rescatista-historial")} className="w-full py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-2xl hover:bg-secondary/90 transition-colors">
              Ver historial de rescates
            </button>
            <button onClick={() => setEditContacto(true)} className="w-full py-3.5 bg-card border border-border text-foreground font-medium rounded-2xl hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2">
              <Edit size={15} /> Actualizar datos de contacto
            </button>
            <button onClick={() => onNav("login")} className="w-full py-3.5 border border-border text-muted-foreground font-medium rounded-2xl hover:bg-muted transition-colors text-sm">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Modal actualizar datos de contacto */}
      {editContacto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditContacto(false)} />
          <div className="relative w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-lg">Actualizar datos de contacto</h3>
              <button onClick={() => setEditContacto(false)}><X size={20} className="text-muted-foreground" /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Solo puedes actualizar tu teléfono y correo electrónico de contacto.</p>
            <div className="space-y-3 mb-5">
              <div><label className="text-sm font-semibold block mb-1">Teléfono</label><input defaultValue="+51 987 654 321" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
              <div><label className="text-sm font-semibold block mb-1">Correo electrónico</label><input defaultValue="carlos.mendoza@rescate.gob.pe" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditContacto(false)} className="flex-1 py-3 border border-border rounded-xl font-medium text-sm hover:bg-muted transition-colors">Cancelar</button>
              <button onClick={() => setEditContacto(false)} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm">Guardar cambios</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Historial de Rescates ───────────────────────────────────────────────────

function RescatistaHistorial({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="pb-24">
      <Header titulo="Historial de Rescates" onBack={() => onNav("rescatista-perfil")} />
      <div className="px-5 pt-4">
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[{ label: "Total de rescates", val: "47", color: "text-primary" }, { label: "Este año", val: "12", color: "text-secondary" }].map(({ label, val, color }) => (
            <div key={label} className="bg-card rounded-2xl border border-border p-4 text-center">
              <p className={`text-3xl font-display font-bold ${color}`}>{val}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Casos Atendidos</p>
        <div className="space-y-3">
          {HISTORIAL_RESCATES.map((r, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><Radio size={18} className="text-primary" /></div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{r.senderista}</p>
                <p className="text-xs text-muted-foreground">{r.ruta} · {r.fecha}</p>
                <p className="text-xs text-muted-foreground">Tiempo de atención: {r.tiempo}</p>
              </div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full flex-shrink-0">{r.estado}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Layout wrapper ──────────────────────────────────────────────────────────

export function RescatistaLayout({ screen, onNav }: { screen: string; onNav: (s: string) => void }) {
  const renderScreen = () => {
    switch (screen) {
      case "rescatista-panel":          return <RescatistaPanel onNav={onNav} />;
      case "rescatista-expediciones":   return <RescatistaExpediciones onNav={onNav} />;
      case "rescatista-alertas":        return <RescatistaAlertas onNav={onNav} />;
      case "rescatista-detalle-alerta": return <RescatistaAlertaDetalle onNav={onNav} />;
      case "rescatista-rescates":       return <RescatistaRescates onNav={onNav} />;
      case "rescatista-perfil":         return <RescatistaPerfil onNav={onNav} />;
      case "rescatista-historial":      return <RescatistaHistorial onNav={onNav} />;
      default:                          return <RescatistaPanel onNav={onNav} />;
    }
  };

  const showBottomNav = !["rescatista-detalle-alerta", "rescatista-historial"].includes(screen);

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {renderScreen()}
      {showBottomNav && <RescatistaBottomNav activo={screen} onNav={onNav} />}
    </div>
  );
}
