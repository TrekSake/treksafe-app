import { AppError } from '../../shared/errors/AppError.js';
import { computeDeadlineAt } from './ExpeditionRepository.js';
import { getSupabaseAdmin } from '../database/supabase.js';

export type ExpeditionAlertContext = {
  expeditionId: string;
  hikerFullName: string;
  startLocation: string;
  endLocation: string;
  estimatedReturnTime: string;
  toleranceMinutes: number;
  deadlineAt: string;
  contacts: { fullName: string; email: string; relationship: string }[];
};

export type RescueAlertContext = ExpeditionAlertContext & {
  hikerId: string;
  hikerPhone: string;
  startTime: string;
  companions: string[];
  emergencyContacts: { fullName: string; phone: string; relationship: string }[];
};

type HikerProfile = { user_id?: string; full_name: string; phone: string };
type EmergencyContactRaw = {
  full_name: string;
  email: string;
  phone: string;
  relationship: string;
};

type AlertContextRow = {
  id: string;
  hiker_id: string;
  start_location: string;
  end_location: string;
  start_time: string;
  estimated_return_time: string;
  tolerance_minutes: number;
  status: string;
  hikers_profile: HikerProfile | HikerProfile[] | null;
  expedition_companions: { companion_name: string }[];
  expedition_emergency_contacts: {
    emergency_contacts: EmergencyContactRaw | EmergencyContactRaw[] | null;
  }[];
};

function resolveOne<T>(raw: T | T[] | null | undefined): T | null {
  if (!raw) return null;
  if (Array.isArray(raw)) return raw[0] ?? null;
  return raw;
}

export class AlertRepository {
  private readonly supabase = getSupabaseAdmin();

  async findAlertContext(expeditionId: string): Promise<ExpeditionAlertContext | null> {
    const full = await this.findRescueAlertContext(expeditionId);
    if (!full) return null;

    return {
      expeditionId: full.expeditionId,
      hikerFullName: full.hikerFullName,
      startLocation: full.startLocation,
      endLocation: full.endLocation,
      estimatedReturnTime: full.estimatedReturnTime,
      toleranceMinutes: full.toleranceMinutes,
      deadlineAt: full.deadlineAt,
      contacts: full.contacts,
    };
  }

  async findRescueAlertContext(expeditionId: string): Promise<RescueAlertContext | null> {
    const { data, error } = await this.supabase
      .from('expeditions')
      .select(
        `
        id, hiker_id, start_location, end_location, start_time,
        estimated_return_time, tolerance_minutes, status,
        hikers_profile ( user_id, full_name, phone ),
        expedition_companions ( companion_name ),
        expedition_emergency_contacts (
          emergency_contacts ( full_name, email, phone, relationship )
        )
      `,
      )
      .eq('id', expeditionId)
      .eq('status', 'alert')
      .maybeSingle();

    if (error) throw new AppError(500, error.message);
    if (!data) return null;

    const row = data as unknown as AlertContextRow;
    const hiker = resolveOne(row.hikers_profile);
    if (!hiker?.full_name) return null;

    const contacts = row.expedition_emergency_contacts
      .map((link) => resolveOne(link.emergency_contacts))
      .filter((c): c is EmergencyContactRaw => c !== null);

    return {
      expeditionId: row.id,
      hikerId: row.hiker_id,
      hikerFullName: hiker.full_name,
      hikerPhone: hiker.phone,
      startLocation: row.start_location,
      endLocation: row.end_location,
      startTime: row.start_time,
      estimatedReturnTime: row.estimated_return_time,
      toleranceMinutes: row.tolerance_minutes,
      deadlineAt: computeDeadlineAt(row.estimated_return_time, row.tolerance_minutes),
      companions: row.expedition_companions.map((c) => c.companion_name),
      contacts: contacts.map((c) => ({
        fullName: c.full_name,
        email: c.email.toLowerCase(),
        relationship: c.relationship,
      })),
      emergencyContacts: contacts.map((c) => ({
        fullName: c.full_name,
        phone: c.phone,
        relationship: c.relationship,
      })),
    };
  }
}
