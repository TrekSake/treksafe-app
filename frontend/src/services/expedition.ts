import { api } from './apiClient';

export type Expedition = {
  id: string;
  start_location: string;
  end_location: string;
  start_time: string;
  estimated_return_time: string;
  tolerance_minutes: number;
  status: string;
  created_at: string;
};

export type ActiveExpedition = {
  id: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  estimatedReturnTime: string;
  toleranceMinutes: number;
  deadlineAt: string;
  status: string;
  companionCount: number;
  contactCount: number;
  companions: string[];
  contacts: { fullName: string; email: string }[];
};

export function getExpeditions() {
  return api.get<{ expeditions: Expedition[] }>('/expeditions', true);
}

export function getActiveExpedition() {
  return api.get<{ expedition: ActiveExpedition | null }>('/expeditions/active', true);
}

export function createExpedition(data: {
  startLocation: string;
  endLocation: string;
  startTime: string;
  estimatedReturnTime: string;
  toleranceMinutes: number;
  contactIds: string[];
  companionNames: string[];
}) {
  return api.post<{ expedition: Expedition }>('/expeditions', data, true);
}

export function checkInExpedition(expeditionId: string, password: string) {
  return api.post<{
    message: string;
    expedition: Expedition;
    checkedInAt: string;
  }>(`/expeditions/${expeditionId}/check-in`, { password }, true);
}
