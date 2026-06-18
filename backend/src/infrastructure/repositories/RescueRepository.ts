import { AppError } from '../../shared/errors/AppError.js';
import { getSupabaseAdmin } from '../database/supabase.js';

export type RescuerRecipient = {
  email: string;
  fullName: string;
};

export type AlertExpeditionRow = {
  id: string;
  start_location: string;
  end_location: string;
  start_time: string;
  estimated_return_time: string;
  tolerance_minutes: number;
  updated_at: string;
  hikers_profile: { full_name: string; phone: string } | { full_name: string; phone: string }[] | null;
};

export type RescueLogRow = {
  id: string;
  expedition_id: string;
  status_rescue: string;
  updated_at: string;
  notes: string | null;
};

export class RescueRepository {
  private readonly supabase = getSupabaseAdmin();

  async assertRescuer(rescuerId: string): Promise<void> {
    const { data, error } = await this.supabase
      .from('rescuers_profile')
      .select('user_id')
      .eq('user_id', rescuerId)
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    if (!data) throw new AppError(403, 'Perfil de rescatista requerido', 'NOT_RESCUER');
  }

  async listValidatedRescuerEmails(): Promise<RescuerRecipient[]> {
    const { data, error } = await this.supabase
      .from('users')
      .select('email, rescuers_profile ( full_name )')
      .eq('role', 'rescatista');

    if (error) throw new AppError(500, error.message);

    const seen = new Set<string>();
    const recipients: RescuerRecipient[] = [];

    for (const row of data ?? []) {
      const email = row.email?.toLowerCase();
      if (!email || seen.has(email)) continue;

      const profile = row.rescuers_profile;
      const fullName = Array.isArray(profile)
        ? profile[0]?.full_name
        : (profile as { full_name: string } | null)?.full_name;

      seen.add(email);
      recipients.push({
        email,
        fullName: fullName ?? 'Equipo de rescate',
      });
    }

    return recipients;
  }

  async listAlertExpeditions(): Promise<AlertExpeditionRow[]> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select(
        `
        id, start_location, end_location, start_time, estimated_return_time,
        tolerance_minutes, updated_at,
        hikers_profile ( full_name, phone )
      `,
      )
      .eq('status', 'alert')
      .order('updated_at', { ascending: false });

    if (error) throw new AppError(500, error.message);
    return (data ?? []) as unknown as AlertExpeditionRow[];
  }

  async findConfirmation(
    expeditionId: string,
    rescuerId: string,
  ): Promise<RescueLogRow | null> {
    const { data, error } = await this.supabase
      .from('rescue_logs')
      .select('id, expedition_id, status_rescue, updated_at, notes')
      .eq('expedition_id', expeditionId)
      .eq('rescuer_id', rescuerId)
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    return data;
  }

  async findAlertExpedition(expeditionId: string): Promise<AlertExpeditionRow | null> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select(
        `
        id, start_location, end_location, start_time, estimated_return_time,
        tolerance_minutes, updated_at,
        hikers_profile ( full_name, phone )
      `,
      )
      .eq('id', expeditionId)
      .eq('status', 'alert')
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    return data as unknown as AlertExpeditionRow | null;
  }

  async createConfirmation(
    expeditionId: string,
    rescuerId: string,
    notes?: string,
  ): Promise<RescueLogRow> {
    const { data, error } = await this.supabase
      .from('rescue_logs')
      .insert({
        expedition_id: expeditionId,
        rescuer_id: rescuerId,
        status_rescue: 'en_busqueda',
        notes: notes ?? null,
      })
      .select('id, expedition_id, status_rescue, updated_at, notes')
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new AppError(409, 'Ya confirmaste esta alerta', 'ALREADY_CONFIRMED');
      }
      throw new AppError(500, error.message);
    }

    return data;
  }
}
