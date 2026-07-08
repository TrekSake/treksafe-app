import { api } from './clienteApi';

export type NivelRiesgoRescate = 'verde' | 'amarillo' | 'rojo';

export type ExpedicionRescate = {
  expedicionId: string;
  estado: 'en_progreso' | 'alerta';
  nivelRiesgo: NivelRiesgoRescate;
  nombreCompletoSenderista: string;
  telefonoSenderista: string;
  lugarInicio: string;
  lugarFin: string;
  coordenadasInicio: string | null;
  coordenadasFin: string | null;
  horaInicio: string;
  horaRetornoEstimada: string;
  fechaLimite: string;
  minutosRestantes: number | null;
  minutosExcedidos: number | null;
  enAlertaDesde: string | null;
  confirmadoPorMi: boolean;
  confirmadoEn: string | null;
  estadoRescate: string | null;
};

export type AlertaRescate = {
  expedicionId: string;
  nombreCompletoSenderista: string;
  telefonoSenderista: string;
  lugarInicio: string;
  lugarFin: string;
  horaInicio: string;
  horaRetornoEstimada: string;
  fechaLimite: string;
  enAlertaDesde: string;
  confirmadoPorMi: boolean;
  confirmadoEn: string | null;
  estadoRescate: string | null;
};

export function obtenerExpedicionesRescate(zona?: string) {
  const params = zona?.trim() ? `?zona=${encodeURIComponent(zona.trim())}` : '';
  return api.get<{ expediciones: ExpedicionRescate[] }>(`/rescate/expediciones${params}`, true);
}

export function obtenerAlertasRescate() {
  return api.get<{ alertas: AlertaRescate[] }>('/rescate/alertas', true);
}

export function confirmarAlertaRescate(expedicionId: string, notas?: string) {
  return api.post<{
    mensaje: string;
    confirmacion: {
      id: string;
      expedicionId: string;
      estadoRescate: string;
      confirmadoEn: string;
      notas: string | null;
    };
  }>(`/rescate/alertas/${expedicionId}/confirmar`, notas ? { notas } : {}, true);
}

export type DetalleAlertaRescate = {
  expedicionId: string;
  nombreCompletoSenderista: string;
  telefonoSenderista: string;
  lugarInicio: string;
  lugarFin: string;
  coordenadasInicio: string | null;
  coordenadasFin: string | null;
  horaInicio: string;
  horaRetornoEstimada: string;
  minutosTolerancia: number;
  fechaLimite: string;
  enAlertaDesde: string;
  acompanantes: string[];
  contactosEmergencia: {
    nombreCompleto: string;
    telefono: string;
    parentesco: string;
    correoElectronico: string;
  }[];
  fichaMedica: {
    tipoSangre: string;
    alergias: string;
    condiciones: string;
    medicamentos: string;
  } | null;
  bitacora: {
    id: string;
    estadoRescate: string;
    notas: string | null;
    actualizadoEn: string;
  } | null;
};

export type EstadoRescate = 'en_busqueda' | 'localizados' | 'cerrado';

export function obtenerDetalleAlertaRescate(expedicionId: string) {
  return api.get<{ alerta: DetalleAlertaRescate }>(`/rescate/alertas/${expedicionId}`, true);
}

export function actualizarBitacoraRescate(
  expedicionId: string,
  datos: { estadoRescate?: EstadoRescate; notas?: string },
) {
  return api.patch<{
    mensaje: string;
    bitacora: {
      id: string;
      expedicionId: string;
      estadoRescate: string;
      notas: string | null;
      actualizadoEn: string;
    };
  }>(`/rescate/alertas/${expedicionId}/bitacora`, datos, true);
}
