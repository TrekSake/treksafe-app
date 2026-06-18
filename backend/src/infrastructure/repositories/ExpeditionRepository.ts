import { AppError } from '../../shared/errors/AppError.js';
import { getSupabaseAdmin } from '../database/supabase.js';

export type ExpeditionRow = {
  id: string;
  start_location: string;
  end_location: string;
  start_time: string;
  estimated_return_time: string;
  tolerance_minutes: number;
  status: string;
  created_at?: string;
  updated_at?: string;
};

type ActiveExpeditionRow = ExpeditionRow & {
  expedition_companions: { companion_name: string }[];
  expedition_emergency_contacts: {
    emergency_contacts: { full_name: string; email: string } | null;
  }[];
};

export function computeDeadlineAt(estimatedReturnTime: string, toleranceMinutes: number): string {
  return new Date(
    new Date(estimatedReturnTime).getTime() + toleranceMinutes * 60_000,
  ).toISOString();
}

export class ExpeditionRepository {
  private readonly supabase = getSupabaseAdmin();

  async hasActiveInProgress(hikerId: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select('id')
      .eq('hiker_id', hikerId)
      .eq('status', 'in_progress')
      .limit(1);

    if (error) throw new AppError(500, error.message);
    return (data?.length ?? 0) > 0;
  }

  async validateContactOwnership(hikerId: string, contactIds: string[]): Promise<void> {
    if (contactIds.length === 0) return;

    const { data, error } = await this.supabase
      .from('emergency_contacts')
      .select('id')
      .eq('hiker_id', hikerId)
      .in('id', contactIds);

    if (error) throw new AppError(500, error.message);
    if ((data?.length ?? 0) !== contactIds.length) {
      throw new AppError(400, 'Uno o más contactos no pertenecen al senderista', 'INVALID_CONTACTS');
    }
  }

  async createExpedition(
    hikerId: string,
    input: {
      startLocation: string;
      endLocation: string;
      startTime: string;
      estimatedReturnTime: string;
      toleranceMinutes: number;
      status: 'programmed' | 'in_progress';
      contactIds: string[];
      companionNames: string[];
    },
  ): Promise<ExpeditionRow> {
    const { data: expedition, error } = await this.supabase
      .from('expeditions')
      .insert({
        hiker_id: hikerId,
        start_location: input.startLocation,
        end_location: input.endLocation,
        start_time: input.startTime,
        estimated_return_time: input.estimatedReturnTime,
        tolerance_minutes: input.toleranceMinutes,
        status: input.status,
      })
      .select(
        'id, start_location, end_location, start_time, estimated_return_time, tolerance_minutes, status, created_at',
      )
      .single();

    if (error || !expedition) throw new AppError(500, error?.message ?? 'Error al crear expedición');

    const contactLinks = input.contactIds.map((contactId) => ({
      expedition_id: expedition.id,
      contact_id: contactId,
    }));

    const { error: linkError } = await this.supabase
      .from('expedition_emergency_contacts')
      .insert(contactLinks);

    if (linkError) {
      await this.supabase.from('expeditions').delete().eq('id', expedition.id);
      throw new AppError(500, linkError.message);
    }

    const companions = input.companionNames.map((name) => ({
      expedition_id: expedition.id,
      companion_name: name,
    }));

    const { error: companionError } = await this.supabase
      .from('expedition_companions')
      .insert(companions);

    if (companionError) {
      await this.supabase.from('expeditions').delete().eq('id', expedition.id);
      throw new AppError(500, companionError.message);
    }

    return expedition;
  }

  async listExpeditions(hikerId: string): Promise<ExpeditionRow[]> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select(
        'id, start_location, end_location, start_time, estimated_return_time, tolerance_minutes, status, created_at',
      )
      .eq('hiker_id', hikerId)
      .order('created_at', { ascending: false });

    if (error) throw new AppError(500, error.message);
    return data ?? [];
  }

  async findActiveByHiker(hikerId: string): Promise<ActiveExpeditionRow | null> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select(
        `
        id, start_location, end_location, start_time, estimated_return_time,
        tolerance_minutes, status, created_at, updated_at,
        expedition_companions ( companion_name ),
        expedition_emergency_contacts (
          emergency_contacts ( full_name, email )
        )
      `,
      )
      .eq('hiker_id', hikerId)
      .eq('status', 'in_progress')
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    return data as ActiveExpeditionRow | null;
  }

  async findByIdForHiker(expeditionId: string, hikerId: string): Promise<ExpeditionRow | null> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select(
        'id, start_location, end_location, start_time, estimated_return_time, tolerance_minutes, status, updated_at',
      )
      .eq('id', expeditionId)
      .eq('hiker_id', hikerId)
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    return data;
  }

  async promoteReadyProgrammed(): Promise<number> {
    const now = new Date().toISOString();

    const { data, error } = await this.supabase
      .from('expeditions')
      .select('id, hiker_id')
      .eq('status', 'programmed')
      .lte('start_time', now)
      .order('start_time', { ascending: true });

    if (error) throw new AppError(500, error.message);
    if (!data?.length) return 0;

    const promotedHikers = new Set<string>();
    let promoted = 0;

    for (const row of data) {
      if (promotedHikers.has(row.hiker_id)) continue;
      if (await this.hasActiveInProgress(row.hiker_id)) continue;

      const { data: updated, error: updateError } = await this.supabase
        .from('expeditions')
        .update({ status: 'in_progress', updated_at: now })
        .eq('id', row.id)
        .eq('status', 'programmed')
        .select('id')
        .maybeSingle();

      if (updateError) throw new AppError(500, updateError.message);
      if (updated) {
        promotedHikers.add(row.hiker_id);
        promoted++;
      }
    }

    return promoted;
  }

  async markExpiredInProgressAsAlert(): Promise<string[]> {
    const nowMs = Date.now();
    const nowIso = new Date().toISOString();

    const { data, error } = await this.supabase
      .from('expeditions')
      .select('id, estimated_return_time, tolerance_minutes')
      .eq('status', 'in_progress');

    if (error) throw new AppError(500, error.message);

    const expiredIds = (data ?? [])
      .filter(
        (row) =>
          new Date(computeDeadlineAt(row.estimated_return_time, row.tolerance_minutes)).getTime() <
          nowMs,
      )
      .map((row) => row.id);

    if (expiredIds.length === 0) return [];

    const { data: updated, error: updateError } = await this.supabase
      .from('expeditions')
      .update({ status: 'alert', updated_at: nowIso })
      .in('id', expiredIds)
      .eq('status', 'in_progress')
      .select('id');

    if (updateError) throw new AppError(500, updateError.message);
    return (updated ?? []).map((row) => row.id);
  }

  async completeCheckIn(expeditionId: string, hikerId: string): Promise<ExpeditionRow> {
    const checkedInAt = new Date().toISOString();

    const { data, error } = await this.supabase
      .from('expeditions')
      .update({ status: 'completed', updated_at: checkedInAt })
      .eq('id', expeditionId)
      .eq('hiker_id', hikerId)
      .eq('status', 'in_progress')
      .select(
        'id, start_location, end_location, start_time, estimated_return_time, tolerance_minutes, status, updated_at',
      )
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    if (!data) {
      throw new AppError(
        409,
        'La expedición no está en curso o ya fue finalizada',
        'EXPEDITION_NOT_ACTIVE',
      );
    }

    return data;
  }
}
