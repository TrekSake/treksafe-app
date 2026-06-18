import { api } from './apiClient';

export type RescueExpeditionRiskLevel = 'green' | 'yellow' | 'red';

export type RescueExpedition = {
  expeditionId: string;
  status: 'in_progress' | 'alert';
  riskLevel: RescueExpeditionRiskLevel;
  hikerFullName: string;
  hikerPhone: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  estimatedReturnTime: string;
  deadlineAt: string;
  minutesRemaining: number | null;
  minutesOverdue: number | null;
  alertSince: string | null;
  confirmedByMe: boolean;
  confirmedAt: string | null;
  rescueStatus: string | null;
};

export type RescueAlert = {
  expeditionId: string;
  hikerFullName: string;
  hikerPhone: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  estimatedReturnTime: string;
  deadlineAt: string;
  alertSince: string;
  confirmedByMe: boolean;
  confirmedAt: string | null;
  rescueStatus: string | null;
};

export function getRescueExpeditions(zone?: string) {
  const params = zone?.trim() ? `?zone=${encodeURIComponent(zone.trim())}` : '';
  return api.get<{ expeditions: RescueExpedition[] }>(`/rescue/expeditions${params}`, true);
}

export function getRescueAlerts() {
  return api.get<{ alerts: RescueAlert[] }>('/rescue/alerts', true);
}

export function confirmRescueAlert(expeditionId: string, notes?: string) {
  return api.post<{
    message: string;
    confirmation: {
      id: string;
      expeditionId: string;
      statusRescue: string;
      confirmedAt: string;
      notes: string | null;
    };
  }>(`/rescue/alerts/${expeditionId}/confirm`, notes ? { notes } : {}, true);
}

export type RescueAlertDetail = {
  expeditionId: string;
  hikerFullName: string;
  hikerPhone: string;
  startLocation: string;
  endLocation: string;
  startCoordinates: string | null;
  endCoordinates: string | null;
  startTime: string;
  estimatedReturnTime: string;
  toleranceMinutes: number;
  deadlineAt: string;
  alertSince: string;
  companions: string[];
  emergencyContacts: {
    fullName: string;
    phone: string;
    relationship: string;
    email: string;
  }[];
  medical: {
    bloodType: string;
    allergies: string;
    conditions: string;
    medications: string;
  } | null;
  rescueLog: {
    id: string;
    statusRescue: string;
    notes: string | null;
    updatedAt: string;
  } | null;
};

export type RescueStatus = 'en_busqueda' | 'localizados' | 'cerrado';

export function getRescueAlertDetail(expeditionId: string) {
  return api.get<{ alert: RescueAlertDetail }>(`/rescue/alerts/${expeditionId}`, true);
}

export function updateRescueLog(
  expeditionId: string,
  data: { statusRescue?: RescueStatus; notes?: string },
) {
  return api.patch<{
    message: string;
    rescueLog: {
      id: string;
      expeditionId: string;
      statusRescue: string;
      notes: string | null;
      updatedAt: string;
    };
  }>(`/rescue/alerts/${expeditionId}/log`, data, true);
}
