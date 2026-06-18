import { useState } from "react";
import {
  Mountain, Shield, Users, User, Settings, Bell, ChevronRight,
  AlertCircle, Check, X, Edit, Trash2, Eye, Lock,
  Navigation, Activity, BarChart3, CheckCircle,
} from "lucide-react";

const USUARIOS = [
  { id: 1, nombre: "Elena Marchetti", correo: "elena@trekkr.io", rol: "Senderista", estado: "activo" },
  { id: 2, nombre: "Carlos Mendoza", correo: "carlos@rescate.gob.pe", rol: "Rescatista", estado: "activo" },
  { id: 3, nombre: "Priya Nair", correo: "priya@ejemplo.pe", rol: "Senderista", estado: "activo" },
  { id: 4, nombre: "Tom Svensson", correo: "tom@ejemplo.pe", rol: "Senderista", estado: "inactivo" },
  { id: 5, nombre: "Aiko Tanaka", correo: "aiko@ejemplo.pe", rol: "Senderista", estado: "activo" },
];

const RESCATISTAS = [
  { id: 1, nombre: "Carlos Mendoza", institucion: "Cuerpo de Rescate Andino", estado: "activo", credencial: "CRA-2024-0312" },
  { id: 2, nombre: "Sofía Torres", institucion: "Cruz Roja Peruana", estado: "pendiente", credencial: "CRP-2024-0089" },
  { id: 3, nombre: "Miguel Quispe", institucion: "Bomberos Voluntarios", estado: "activo", credencial: "BV-2023-0455" },
  { id: 4, nombre: "Laura Vásquez", institucion: "INDECI Lima", estado: "pendiente", credencial: "IND-2024-0201" },
];

// ── Sidebar ──────────────────────────────────────────────────────────────────

function AdminSidebar({ activo, onNav }: { activo: string; onNav: (s: string) => void }) {
  const items = [
    { id: "admin-dashboard", Icon: BarChart3, label: "Dashboard" },
    { id: "admin-usuarios", Icon: Users, label: "Usuarios" },
    { id: "admin-rescatistas", Icon: Shield, label: "Rescatistas" },
    { id: "admin-alertas", Icon: AlertCircle, label: "Alertas" },
    { id: "admin-config", Icon: Settings, label: "Configuración" },
  ];

  return (
    <aside className="w-60 bg-secondary flex flex-col min-h-screen flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Mountain size={16} className="text-primary-foreground" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-base leading-tight">TrekSafe</p>
            <p className="text-white/40 text-xs">Administrador</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ id, Icon, label }) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activo === id
                ? "bg-white/15 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div className="overflow-hidden">
            <p className="text-white text-xs font-semibold truncate">Admin TrekSafe</p>
            <p className="text-white/40 text-xs truncate">admin@treksafe.pe</p>
          </div>
        </div>
        <button
          onClick={() => onNav("acceso-demo")}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors text-xs"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

// Mobile top bar for admin (small screens)
function AdminMobileHeader({ activo, onNav }: { activo: string; onNav: (s: string) => void }) {
  const items = [
    { id: "admin-dashboard", label: "Panel" },
    { id: "admin-usuarios", label: "Usuarios" },
    { id: "admin-rescatistas", label: "Rescatistas" },
    { id: "admin-alertas", label: "Alertas" },
    { id: "admin-config", label: "Config." },
  ];

  return (
    <div className="md:hidden">
      <header className="bg-secondary px-4 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Mountain size={16} className="text-primary-foreground" />
        </div>
        <p className="font-display font-bold text-white">TrekSafe Admin</p>
      </header>
      <div className="bg-secondary/90 flex overflow-x-auto border-b border-white/10 px-4 gap-1 pb-1">
        {items.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onNav(id)}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              activo === id ? "bg-white/15 text-white" : "text-white/50 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function AdminDashboard({ onNav }: { onNav: (s: string) => void }) {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Resumen general del sistema TrekSafe</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Usuarios Registrados", val: "1,284", Icon: Users, color: "text-secondary", bg: "bg-secondary/10", onClick: () => onNav("admin-usuarios") },
          { label: "Rescatistas Activos", val: "47", Icon: Shield, color: "text-primary", bg: "bg-primary/10", onClick: () => onNav("admin-rescatistas") },
          { label: "Expediciones Registradas", val: "3,912", Icon: Navigation, color: "text-secondary", bg: "bg-secondary/10", onClick: undefined },
          { label: "Alertas Generadas", val: "218", Icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50", onClick: () => onNav("admin-alertas") },
          { label: "Casos Cerrados", val: "206", Icon: CheckCircle, color: "text-primary", bg: "bg-primary/10", onClick: undefined },
        ].map(({ label, val, Icon, color, bg, onClick }) => (
          <button key={label} onClick={onClick ?? undefined} className="bg-card rounded-2xl border border-border p-5 text-left hover:shadow-md transition-shadow col-span-1">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className={`text-3xl font-display font-bold ${color}`}>{val}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-tight">{label}</p>
          </button>
        ))}
      </div>

      {/* Usuarios recientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Últimos Usuarios</h2>
            <button onClick={() => onNav("admin-usuarios")} className="text-sm text-primary font-semibold hover:underline">Ver todos</button>
          </div>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {USUARIOS.slice(0, 4).map(u => (
              <div key={u.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={13} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{u.nombre}</p>
                  <p className="text-xs text-muted-foreground truncate">{u.correo}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${u.estado === "activo" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {u.estado === "activo" ? "Activo" : "Inactivo"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">Rescatistas Pendientes</h2>
            <button onClick={() => onNav("admin-rescatistas")} className="text-sm text-primary font-semibold hover:underline">Gestionar</button>
          </div>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border">
            {RESCATISTAS.filter(r => r.estado === "pendiente").map(r => (
              <div key={r.id} className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield size={13} className="text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{r.nombre}</p>
                  <p className="text-xs text-muted-foreground truncate">{r.institucion}</p>
                </div>
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full flex-shrink-0">Pendiente</span>
              </div>
            ))}
            {RESCATISTAS.filter(r => r.estado === "pendiente").length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">Sin solicitudes pendientes</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Usuarios ─────────────────────────────────────────────────────────────────

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(USUARIOS);
  const bloquear = (id: number) =>
    setUsuarios(u => u.map(x => x.id === id ? { ...x, estado: x.estado === "activo" ? "inactivo" : "activo" } : x));
  const eliminar = (id: number) => setUsuarios(u => u.filter(x => x.id !== id));

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Gestión de Usuarios</h1>
          <p className="text-muted-foreground text-sm mt-1">{usuarios.length} usuarios registrados en el sistema</p>
        </div>
        <button className="px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl text-sm flex items-center gap-2 shadow-sm shadow-primary/25 hover:bg-primary/90 transition-colors">
          + Agregar Usuario
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o correo..."
          className="w-full md:w-80 px-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Nombre", "Correo", "Rol", "Estado", "Acciones"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={13} className="text-secondary" />
                    </div>
                    <span className="font-semibold text-sm">{u.nombre}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{u.correo}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.rol === "Rescatista" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"}`}>
                    {u.rol}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.estado === "activo" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
                    {u.estado === "activo" ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors" title="Editar">
                      <Edit size={14} className="text-muted-foreground" />
                    </button>
                    <button onClick={() => bloquear(u.id)} className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center hover:bg-amber-100 transition-colors" title={u.estado === "activo" ? "Bloquear" : "Activar"}>
                      <Lock size={14} className="text-amber-600" />
                    </button>
                    <button onClick={() => eliminar(u.id)} className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors" title="Eliminar">
                      <Trash2 size={14} className="text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Rescatistas ──────────────────────────────────────────────────────────────

function AdminRescatistas() {
  const [rescatistas, setRescatistas] = useState(RESCATISTAS);

  const cambiarEstado = (id: number, nuevoEstado: string) =>
    setRescatistas(r => r.map(x => x.id === id ? { ...x, estado: nuevoEstado } : x));

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Gestión de Rescatistas</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {rescatistas.filter(r => r.estado === "pendiente").length} solicitudes pendientes de aprobación
        </p>
      </div>

      {/* Pendientes destacados */}
      {rescatistas.some(r => r.estado === "pendiente") && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={16} className="text-amber-600" />
            <p className="text-sm font-bold text-amber-700">Solicitudes pendientes de revisión</p>
          </div>
          <div className="space-y-2">
            {rescatistas.filter(r => r.estado === "pendiente").map(r => (
              <div key={r.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-amber-200">
                <div>
                  <p className="font-semibold text-sm">{r.nombre}</p>
                  <p className="text-xs text-muted-foreground">{r.institucion} · {r.credencial}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => cambiarEstado(r.id, "activo")} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors">
                    <Check size={12} /> Aprobar
                  </button>
                  <button onClick={() => cambiarEstado(r.id, "rechazado")} className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors">
                    <X size={12} /> Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Nombre", "Institución", "Credencial", "Estado", "Acciones"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rescatistas.map(r => (
              <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield size={13} className="text-primary" />
                    </div>
                    <span className="font-semibold text-sm">{r.nombre}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{r.institucion}</td>
                <td className="px-5 py-4 text-sm font-mono text-muted-foreground">{r.credencial}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    r.estado === "activo" ? "bg-emerald-100 text-emerald-700" :
                    r.estado === "pendiente" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {r.estado === "activo" ? "Activo" : r.estado === "pendiente" ? "Pendiente" : "Rechazado"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {r.estado === "pendiente" && (
                      <>
                        <button onClick={() => cambiarEstado(r.id, "activo")} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors">
                          <Check size={12} /> Aprobar
                        </button>
                        <button onClick={() => cambiarEstado(r.id, "rechazado")} className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors">
                          <X size={12} /> Rechazar
                        </button>
                      </>
                    )}
                    <button className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors" title="Ver credenciales">
                      <Eye size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Alertas Admin ────────────────────────────────────────────────────────────

function AdminAlertas() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Gestión de Alertas</h1>
        <p className="text-muted-foreground text-sm mt-1">Supervisión de alertas generadas en el sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Alertas Este Mes", val: "18", color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Resueltas", val: "15", color: "text-primary", bg: "bg-primary/10" },
          { label: "Tiempo Promedio Resolución", val: "2h 14m", color: "text-secondary", bg: "bg-secondary/10" },
        ].map(({ label, val, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-5 border border-border`}>
            <p className={`text-4xl font-display font-bold ${color}`}>{val}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {["Senderista", "Ruta", "Retraso", "Estado", "Fecha"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { senderista: "Priya Nair", ruta: "Cañón Azul", retraso: "4h 30m", estado: "Activa", fecha: "Hoy 15:30" },
              { senderista: "Lucas Ferreira", ruta: "Cerro Pelado", retraso: "1h 45m", estado: "Resuelta", fecha: "Ayer 14:15" },
              { senderista: "Maria Dos Santos", ruta: "Pico Norte", retraso: "3h 00m", estado: "Resuelta", fecha: "Hace 3 días" },
            ].map((a, i) => (
              <tr key={i} className="hover:bg-muted/20 transition-colors">
                <td className="px-5 py-4 font-semibold text-sm">{a.senderista}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{a.ruta}</td>
                <td className="px-5 py-4 text-sm font-bold text-destructive">{a.retraso}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${a.estado === "Activa" ? "bg-red-100 text-red-700 animate-pulse" : "bg-emerald-100 text-emerald-700"}`}>
                    {a.estado}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{a.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Configuración ────────────────────────────────────────────────────────────

function AdminConfiguracion() {
  const [config, setConfig] = useState({
    registroAbierto: true,
    aprobacionManual: true,
    notifCorreo: true,
    notifSMS: false,
    toleranciaMinutos: "30",
    contactosMinimos: "1",
  });

  const toggle = (key: keyof typeof config) =>
    setConfig(c => ({ ...c, [key]: !c[key] }));

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Configuración del Sistema</h1>
        <p className="text-muted-foreground text-sm mt-1">Parámetros globales de la plataforma TrekSafe</p>
      </div>

      {/* Registro y acceso */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-5">
        <h3 className="font-display font-bold mb-4">Registro y Acceso</h3>
        <div className="space-y-4">
          {[
            { key: "registroAbierto" as const, label: "Registro Abierto al Público", sub: "Los nuevos usuarios pueden registrarse sin invitación" },
            { key: "aprobacionManual" as const, label: "Aprobación Manual de Rescatistas", sub: "Los rescatistas deben ser aprobados por un administrador" },
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
              <button
                onClick={() => toggle(key)}
                className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 flex-shrink-0 ${config[key] ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${config[key] ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-5">
        <h3 className="font-display font-bold mb-4">Canales de Notificación</h3>
        <div className="space-y-4">
          {[
            { key: "notifCorreo" as const, label: "Notificaciones por Correo", sub: "Enviar alertas automáticas por correo electrónico" },
            { key: "notifSMS" as const, label: "Notificaciones por SMS", sub: "Enviar alertas automáticas por mensaje de texto" },
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
              <button
                onClick={() => toggle(key)}
                className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 flex-shrink-0 ${config[key] ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${config[key] ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Parámetros */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-6">
        <h3 className="font-display font-bold mb-4">Parámetros de Seguridad</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold block mb-1.5">Tolerancia de retraso antes de alerta (minutos)</label>
            <input
              type="number"
              value={config.toleranciaMinutos}
              onChange={e => setConfig(c => ({ ...c, toleranciaMinutos: e.target.value }))}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <p className="text-xs text-muted-foreground mt-1">Tiempo de espera después del regreso estimado antes de activar la alerta</p>
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1.5">Mínimo de contactos de emergencia requeridos</label>
            <input
              type="number"
              value={config.contactosMinimos}
              onChange={e => setConfig(c => ({ ...c, contactosMinimos: e.target.value }))}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-primary text-primary-foreground font-display font-semibold rounded-2xl shadow-md shadow-primary/25 hover:bg-primary/90 transition-all">
        Guardar Configuración
      </button>
    </div>
  );
}

// ── Layout wrapper ──────────────────────────────────────────────────────────

export function AdminLayout({
  screen,
  onNav,
}: {
  screen: string;
  onNav: (s: string) => void;
}) {
  const renderScreen = () => {
    switch (screen) {
      case "admin-dashboard": return <AdminDashboard onNav={onNav} />;
      case "admin-usuarios": return <AdminUsuarios />;
      case "admin-rescatistas": return <AdminRescatistas />;
      case "admin-alertas": return <AdminAlertas />;
      case "admin-config": return <AdminConfiguracion />;
      default: return <AdminDashboard onNav={onNav} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar — desktop only */}
      <div className="hidden md:flex">
        <AdminSidebar activo={screen} onNav={onNav} />
      </div>

      {/* Mobile header */}
      <AdminMobileHeader activo={screen} onNav={onNav} />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {renderScreen()}
      </main>
    </div>
  );
}
