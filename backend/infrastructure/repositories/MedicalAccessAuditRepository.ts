import { getSupabaseAdmin } from '../database/supabase.js';

export class MedicalAccessAuditRepository {
  private readonly supabase = getSupabaseAdmin();

  async logAccess(input: {
    hikerId: string;
    expeditionId?: string;
    accessorId: string;
    accessorRole: string;
    accessType: string;
  }): Promise<void> {
    const { error } = await this.supabase.from('medical_access_audit').insert({
      hiker_id: input.hikerId,
      expedition_id: input.expeditionId ?? null,
      accessor_id: input.accessorId,
      accessor_role: input.accessorRole,
      access_type: input.accessType,
    });

    if (error && error.code !== '42P01') {
      console.warn('[Audit] medical access log failed:', error.message);
    }
  }
}
