import { api } from './apiClient';

export type AuthResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: 'senderista' | 'rescatista';
  };
};

export type RegisterHikerPayload = {
  fullName: string;
  documentId: string;
  email: string;
  phone: string;
  password: string;
  privacyConsent: true;
};

export type RegisterRescuerPayload = {
  fullName: string;
  email: string;
  password: string;
  institution: 'AGMP' | 'MINCETUR';
  credentialNumber: string;
  birthDate: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export function registerHiker(data: RegisterHikerPayload) {
  return api.post<AuthResponse>('/auth/register-hiker', data);
}

export function login(data: LoginPayload) {
  return api.post<AuthResponse>('/auth/login', data);
}

export function registerRescuer(data: RegisterRescuerPayload) {
  return api.post<AuthResponse>('/auth/register-rescuer', data);
}
