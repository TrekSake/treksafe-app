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
