import { AppError } from '../../shared/errors/AppError.js';
import { getSupabaseAdmin } from '../database/supabase.js';
import {
  decryptMedicalPayload,
  encryptMedicalPayload,
  type MedicalPayload,
} from '../security/encryption.js';

export class UserRepository {
  private readonly supabase = getSupabaseAdmin();

  async assertHiker(userId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('hikers_profile')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    if (!data) throw new AppError(403, 'Perfil de senderista requerido', 'NOT_HIKER');
  }

  async upsertMedicalInfo(
    hikerId: string,
    bloodType: string,
    encryptedConditions: string,
  ): Promise<void> {
    const { data: existing } = await this.supabase
      .from('medical_info')
      .select('id')
      .eq('hiker_id', hikerId)
      .maybeSingle();

    if (existing) {
      const { error } = await this.supabase
        .from('medical_info')
        .update({
          blood_type: bloodType,
          encrypted_conditions: encryptedConditions,
          consent_signed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('hiker_id', hikerId);
      if (error) throw new AppError(500, error.message);
      return;
    }

    const { error } = await this.supabase.from('medical_info').insert({
      hiker_id: hikerId,
      blood_type: bloodType,
      encrypted_conditions: encryptedConditions,
      consent_signed: true,
    });
    if (error) throw new AppError(500, error.message);
  }

  async getMedicalInfo(hikerId: string): Promise<{
    bloodType: string;
    payload: MedicalPayload;
    consentSigned: boolean;
  } | null> {
    const { data, error } = await this.supabase
      .from('medical_info')
      .select('blood_type, encrypted_conditions, consent_signed')
      .eq('hiker_id', hikerId)
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    if (!data) return null;

    return {
      bloodType: data.blood_type,
      payload: decryptMedicalPayload(data.encrypted_conditions),
      consentSigned: data.consent_signed,
    };
  }

  encryptPayload(payload: MedicalPayload): string {
    return encryptMedicalPayload(payload);
  }

  async listContacts(hikerId: string) {
    const { data, error } = await this.supabase
      .from('emergency_contacts')
      .select('id, full_name, relationship, phone, email')
      .eq('hiker_id', hikerId)
      .order('full_name');

    if (error) throw new AppError(500, error.message);
    return data ?? [];
  }

  async createContact(
    hikerId: string,
    contact: { fullName: string; relationship: string; phone: string; email: string },
  ) {
    const { data, error } = await this.supabase
      .from('emergency_contacts')
      .insert({
        hiker_id: hikerId,
        full_name: contact.fullName,
        relationship: contact.relationship,
        phone: contact.phone,
        email: contact.email.toLowerCase(),
      })
      .select('id, full_name, relationship, phone, email')
      .single();

    if (error) throw new AppError(500, error.message);
    return data;
  }

  async deleteContact(hikerId: string, contactId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('emergency_contacts')
      .delete()
      .eq('id', contactId)
      .eq('hiker_id', hikerId)
      .select('id');

    if (error) throw new AppError(500, error.message);
    if (!data?.length) throw new AppError(404, 'Contacto no encontrado', 'NOT_FOUND');
  }

}
