import { AppError } from '../../shared/errors/AppError.js';
import { getSupabaseAdmin } from '../database/supabase.js';

export type EmailDispatchType = 'contact_alert' | 'rescue_alert';

export class EmailDispatchRepository {
  private readonly supabase = getSupabaseAdmin();

  async wasAlreadySent(
    expeditionId: string,
    dispatchType: EmailDispatchType,
    recipientKey: string,
  ): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('email_dispatches')
      .select('id')
      .eq('expedition_id', expeditionId)
      .eq('dispatch_type', dispatchType)
      .eq('recipient_key', recipientKey.toLowerCase())
      .maybeSingle();

    if (error) {
      if (error.code === '42P01') return false;
      throw new AppError(500, error.message);
    }
    return data !== null;
  }

  async recordSent(
    expeditionId: string,
    dispatchType: EmailDispatchType,
    recipientKey: string,
  ): Promise<void> {
    const { error } = await this.supabase.from('email_dispatches').insert({
      expedition_id: expeditionId,
      dispatch_type: dispatchType,
      recipient_key: recipientKey.toLowerCase(),
    });

    if (error && error.code !== '23505') {
      if (error.code === '42P01') return;
      throw new AppError(500, error.message);
    }
  }
}
