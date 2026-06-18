import { AppError } from '../../shared/errors/AppError.js';
import type { CheckInInput } from '../dto/expedition.dto.js';
import type { CreateExpeditionInput } from '../dto/user.dto.js';
import {
  computeDeadlineAt,
  ExpeditionRepository,
} from '../../infrastructure/repositories/ExpeditionRepository.js';
import { PostgresAuthRepository } from '../../infrastructure/repositories/PostgresAuthRepository.js';
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';
import { verifyPassword } from '../../infrastructure/security/password.js';

export type ActiveExpeditionSummary = {
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

export class ExpeditionService {
  constructor(
    private readonly expeditionRepo = new ExpeditionRepository(),
    private readonly userRepo = new UserRepository(),
    private readonly authRepo = new PostgresAuthRepository(),
  ) {}

  async createExpedition(hikerId: string, input: CreateExpeditionInput) {
    await this.userRepo.assertHiker(hikerId);

    if (await this.expeditionRepo.hasActiveInProgress(hikerId)) {
      throw new AppError(
        409,
        'Ya tienes una expedición en curso. Confirma tu retorno antes de crear otra.',
        'ACTIVE_EXPEDITION_EXISTS',
      );
    }

    const now = Date.now();
    const startMs = new Date(input.startTime).getTime();
    const returnMs = new Date(input.estimatedReturnTime).getTime();

    if (startMs <= now) {
      throw new AppError(400, 'La hora de salida debe ser posterior al momento actual', 'INVALID_START_TIME');
    }
    if (returnMs <= now) {
      throw new AppError(
        400,
        'La hora de retorno estimada debe ser posterior al momento actual',
        'INVALID_RETURN_TIME',
      );
    }

    await this.expeditionRepo.validateContactOwnership(hikerId, input.contactIds);

    const status = startMs <= now + 60_000 ? 'in_progress' : 'programmed';

    return this.expeditionRepo.createExpedition(hikerId, {
      startLocation: input.startLocation,
      endLocation: input.endLocation,
      startTime: input.startTime,
      estimatedReturnTime: input.estimatedReturnTime,
      toleranceMinutes: input.toleranceMinutes,
      status,
      contactIds: input.contactIds,
      companionNames: input.companionNames,
    });
  }

  async listExpeditions(hikerId: string) {
    await this.userRepo.assertHiker(hikerId);
    return this.expeditionRepo.listExpeditions(hikerId);
  }

  async getActiveExpedition(hikerId: string): Promise<ActiveExpeditionSummary | null> {
    await this.userRepo.assertHiker(hikerId);

    const row = await this.expeditionRepo.findActiveByHiker(hikerId);
    if (!row) return null;

    const companions = row.expedition_companions.map((c) => c.companion_name);
    const contacts = row.expedition_emergency_contacts
      .map((link) => link.emergency_contacts)
      .filter((c): c is { full_name: string; email: string } => c !== null)
      .map((c) => ({ fullName: c.full_name, email: c.email }));

    return {
      id: row.id,
      startLocation: row.start_location,
      endLocation: row.end_location,
      startTime: row.start_time,
      estimatedReturnTime: row.estimated_return_time,
      toleranceMinutes: row.tolerance_minutes,
      deadlineAt: computeDeadlineAt(row.estimated_return_time, row.tolerance_minutes),
      status: row.status,
      companionCount: companions.length,
      contactCount: contacts.length,
      companions,
      contacts,
    };
  }

  async checkIn(hikerId: string, expeditionId: string, input: CheckInInput) {
    await this.userRepo.assertHiker(hikerId);

    const expedition = await this.expeditionRepo.findByIdForHiker(expeditionId, hikerId);
    if (!expedition) {
      throw new AppError(404, 'Expedición no encontrada', 'NOT_FOUND');
    }
    if (expedition.status !== 'in_progress') {
      throw new AppError(
        409,
        'Solo puedes confirmar retorno en expediciones en curso',
        'EXPEDITION_NOT_ACTIVE',
      );
    }

    const user = await this.authRepo.findUserById(hikerId);
    if (!user) {
      throw new AppError(401, 'Usuario no encontrado', 'UNAUTHORIZED');
    }

    const valid = await verifyPassword(input.password, user.password_hash);
    if (!valid) {
      throw new AppError(401, 'Contraseña incorrecta', 'INVALID_PASSWORD');
    }

    const completed = await this.expeditionRepo.completeCheckIn(expeditionId, hikerId);

    return {
      expedition: completed,
      checkedInAt: completed.updated_at ?? new Date().toISOString(),
    };
  }

  async getExpeditionHistory(hikerId: string) {
    await this.userRepo.assertHiker(hikerId);

    const expeditions = await this.expeditionRepo.listCompletedExpeditions(hikerId);
    const destinations = new Set(expeditions.map((e) => e.end_location));

    let totalDurationHours = 0;
    for (const exp of expeditions) {
      const ms =
        new Date(exp.estimated_return_time).getTime() - new Date(exp.start_time).getTime();
      totalDurationHours += ms / 3_600_000;
    }

    return {
      expeditions,
      stats: {
        totalCompleted: expeditions.length,
        uniqueDestinations: destinations.size,
        averageDurationHours:
          expeditions.length > 0
            ? Math.round((totalDurationHours / expeditions.length) * 10) / 10
            : 0,
        lastCompletedAt: expeditions[0]?.updated_at ?? null,
      },
    };
  }
}
