import { api } from './apiClient';

export type MedicalInfo = {
  bloodType: string;
  allergies: string;
  conditions: string;
  medications: string;
  consentSigned: boolean;
};

export type EmergencyContact = {
  id: string;
  full_name: string;
  relationship: string;
  phone: string;
  email: string;
};

export function getMedicalInfo() {
  return api.get<{ medicalInfo: MedicalInfo | null }>('/user/medical-info', true);
}

export function saveMedicalInfo(data: MedicalInfo & { consentSigned: true }) {
  return api.put<{ message: string; medicalInfo: MedicalInfo }>(
    '/user/medical-info',
    {
      bloodType: data.bloodType,
      allergies: data.allergies,
      conditions: data.conditions,
      medications: data.medications,
      consentSigned: true,
    },
    true,
  );
}

export function getContacts() {
  return api.get<{ contacts: EmergencyContact[] }>('/user/contacts', true);
}

export function createContact(data: {
  fullName: string;
  relationship: string;
  phone: string;
  email: string;
}) {
  return api.post<{ contact: EmergencyContact }>('/user/contacts', data, true);
}

export function deleteContact(contactId: string) {
  return api.delete<{ message: string }>(`/user/contacts/${contactId}`, true);
}

export type DataRevocationAction = 'delete_personal' | 'anonymize_routes';

export function revokePersonalData(action: DataRevocationAction) {
  return api.post<{
    message: string;
    action: DataRevocationAction;
    medicalDeleted?: boolean;
    contactsDeleted?: number;
    expeditionsDeleted?: number;
    expeditionsAnonymized?: number;
  }>('/user/privacy/revoke', { action, confirm: true }, true);
}
