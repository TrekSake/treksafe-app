import { api } from './apiClient';

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
