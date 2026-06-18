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

  async hasBlockingExpedition(hikerId: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select('id')
      .eq('hiker_id', hikerId)
      .in('status', ['in_progress', 'alert'])
      .limit(1);

    if (error) throw new AppError(500, error.message);
    return (data?.length ?? 0) > 0;
  }

  async deletePersonalData(hikerId: string): Promise<{
    medicalDeleted: boolean;
    contactsDeleted: number;
    expeditionsDeleted: number;
    accountDeleted: boolean;
  }> {
    if (await this.hasBlockingExpedition(hikerId)) {
      throw new AppError(
        409,
        'No puedes revocar datos mientras tengas una expedición en curso o en alerta',
        'ACTIVE_EXPEDITION_BLOCKS_REVOKE',
      );
    }

    const { error: medicalError } = await this.supabase
      .from('medical_info')
      .delete()
      .eq('hiker_id', hikerId);
    if (medicalError) throw new AppError(500, medicalError.message);

    const { data: contacts, error: contactsSelectError } = await this.supabase
      .from('emergency_contacts')
      .select('id')
      .eq('hiker_id', hikerId);
    if (contactsSelectError) throw new AppError(500, contactsSelectError.message);

    const { error: contactsError } = await this.supabase
      .from('emergency_contacts')
      .delete()
      .eq('hiker_id', hikerId);
    if (contactsError) throw new AppError(500, contactsError.message);

    const { data: expeditions, error: expSelectError } = await this.supabase
      .from('expeditions')
      .select('id')
      .eq('hiker_id', hikerId)
      .in('status', ['completed', 'programmed']);
    if (expSelectError) throw new AppError(500, expSelectError.message);

    const expeditionIds = (expeditions ?? []).map((e) => e.id);
    if (expeditionIds.length > 0) {
      const { error: expDeleteError } = await this.supabase
        .from('expeditions')
        .delete()
        .in('id', expeditionIds);
      if (expDeleteError) throw new AppError(500, expDeleteError.message);
    }

    const { error: userDeleteError } = await this.supabase
      .from('users')
      .delete()
      .eq('id', hikerId);
    if (userDeleteError) throw new AppError(500, userDeleteError.message);

    return {
      medicalDeleted: true,
      contactsDeleted: contacts?.length ?? 0,
      expeditionsDeleted: expeditionIds.length,
      accountDeleted: true,
    };
  }

  async anonymizeRouteHistory(hikerId: string): Promise<{ expeditionsAnonymized: number }> {
    if (await this.hasBlockingExpedition(hikerId)) {
      throw new AppError(
        409,
        'No puedes anonimizar rutas mientras tengas una expedición en curso o en alerta',
        'ACTIVE_EXPEDITION_BLOCKS_REVOKE',
      );
    }

    const { data: expeditions, error: selectError } = await this.supabase
      .from('expeditions')
      .select('id')
      .eq('hiker_id', hikerId)
      .eq('status', 'completed');
    if (selectError) throw new AppError(500, selectError.message);

    const ids = (expeditions ?? []).map((e) => e.id);
    if (ids.length === 0) return { expeditionsAnonymized: 0 };

    const now = new Date().toISOString();
    const { error: updateError } = await this.supabase
      .from('expeditions')
      .update({
        start_location: '[Anonimizado]',
        end_location: '[Anonimizado]',
        start_coordinates: null,
        end_coordinates: null,
        updated_at: now,
      })
      .in('id', ids);
    if (updateError) throw new AppError(500, updateError.message);

    const { error: companionsError } = await this.supabase
      .from('expedition_companions')
      .delete()
      .in('expedition_id', ids);
    if (companionsError) throw new AppError(500, companionsError.message);

    return { expeditionsAnonymized: ids.length };
  }
}
