import { AppError } from '../../shared/errors/AppError.js';
import type { ConfirmAlertInput, ListExpeditionsQuery } from '../dto/rescue.dto.js';
import { computeDeadlineAt } from '../../infrastructure/repositories/ExpeditionRepository.js';
import { RescueRepository } from '../../infrastructure/repositories/RescueRepository.js';

const URGENCY_THRESHOLD_MS = 30 * 60_000;

export type RescueAlertItem = {
  expeditionId: string;
  hikerFullName: string;
  hikerPhone: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  estimatedReturnTime: string;
  deadlineAt: string;
  alertSince: string;
  confirmedByMe: boolean;
  confirmedAt: string | null;
  rescueStatus: string | null;
};

export type RescueExpeditionRiskLevel = 'green' | 'yellow' | 'red';

export type RescueExpeditionItem = {
  expeditionId: string;
  status: 'in_progress' | 'alert';
  riskLevel: RescueExpeditionRiskLevel;
  hikerFullName: string;
  hikerPhone: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  estimatedReturnTime: string;
  deadlineAt: string;
  minutesRemaining: number | null;
  minutesOverdue: number | null;
  alertSince: string | null;
  confirmedByMe: boolean;
  confirmedAt: string | null;
  rescueStatus: string | null;
};

const RISK_ORDER: Record<RescueExpeditionRiskLevel, number> = {
  red: 0,
  yellow: 1,
  green: 2,
};

export function computeExpeditionRiskLevel(
  status: 'in_progress' | 'alert',
  deadlineAt: string,
  now = Date.now(),
): { riskLevel: RescueExpeditionRiskLevel; minutesRemaining: number | null; minutesOverdue: number | null } {
  const deadlineMs = new Date(deadlineAt).getTime();
  const remainingMs = deadlineMs - now;

  if (status === 'alert' || remainingMs <= 0) {
    const overdueMs = Math.max(now - deadlineMs, 0);
    return {
      riskLevel: 'red',
      minutesRemaining: null,
      minutesOverdue: Math.ceil(overdueMs / 60_000),
    };
  }

  if (remainingMs <= URGENCY_THRESHOLD_MS) {
    return {
      riskLevel: 'yellow',
      minutesRemaining: Math.ceil(remainingMs / 60_000),
      minutesOverdue: null,
    };
  }

  return {
    riskLevel: 'green',
    minutesRemaining: Math.ceil(remainingMs / 60_000),
    minutesOverdue: null,
  };
}

export class RescueService {
  constructor(private readonly repo = new RescueRepository()) {}

  async listExpeditions(
    rescuerId: string,
    query: ListExpeditionsQuery = {},
  ): Promise<RescueExpeditionItem[]> {
    await this.repo.assertRescuer(rescuerId);

    const expeditions = await this.repo.listMonitorExpeditions(query.zone);
    const confirmations = await this.repo.findConfirmationsForExpeditions(
      expeditions.map((row) => row.id),
      rescuerId,
    );

    const items: RescueExpeditionItem[] = [];

    for (const row of expeditions) {
      const hiker = Array.isArray(row.hikers_profile)
        ? row.hikers_profile[0]
        : row.hikers_profile;
      if (!hiker) continue;

      const deadlineAt = computeDeadlineAt(row.estimated_return_time, row.tolerance_minutes);
      const { riskLevel, minutesRemaining, minutesOverdue } = computeExpeditionRiskLevel(
        row.status,
        deadlineAt,
      );
      const confirmation = confirmations.get(row.id) ?? null;

      items.push({
        expeditionId: row.id,
        status: row.status,
        riskLevel,
        hikerFullName: hiker.full_name,
        hikerPhone: hiker.phone,
        startLocation: row.start_location,
        endLocation: row.end_location,
        startTime: row.start_time,
        estimatedReturnTime: row.estimated_return_time,
        deadlineAt,
        minutesRemaining,
        minutesOverdue,
        alertSince: row.status === 'alert' ? row.updated_at : null,
        confirmedByMe: confirmation !== null,
        confirmedAt: confirmation?.updated_at ?? null,
        rescueStatus: confirmation?.status_rescue ?? null,
      });
    }

    return items.sort((a, b) => {
      const riskDiff = RISK_ORDER[a.riskLevel] - RISK_ORDER[b.riskLevel];
      if (riskDiff !== 0) return riskDiff;
      return new Date(a.deadlineAt).getTime() - new Date(b.deadlineAt).getTime();
    });
  }

  async listAlerts(rescuerId: string): Promise<RescueAlertItem[]> {
    await this.repo.assertRescuer(rescuerId);

    const expeditions = await this.repo.listAlertExpeditions();
    const items: RescueAlertItem[] = [];

    for (const row of expeditions) {
      const hiker = Array.isArray(row.hikers_profile)
        ? row.hikers_profile[0]
        : row.hikers_profile;
      if (!hiker) continue;

      const confirmation = await this.repo.findConfirmation(row.id, rescuerId);

      items.push({
        expeditionId: row.id,
        hikerFullName: hiker.full_name,
        hikerPhone: hiker.phone,
        startLocation: row.start_location,
        endLocation: row.end_location,
        startTime: row.start_time,
        estimatedReturnTime: row.estimated_return_time,
        deadlineAt: computeDeadlineAt(row.estimated_return_time, row.tolerance_minutes),
        alertSince: row.updated_at,
        confirmedByMe: confirmation !== null,
        confirmedAt: confirmation?.updated_at ?? null,
        rescueStatus: confirmation?.status_rescue ?? null,
      });
    }

    return items;
  }

  async confirmAlert(
    rescuerId: string,
    expeditionId: string,
    input: ConfirmAlertInput,
  ) {
    await this.repo.assertRescuer(rescuerId);

    const expedition = await this.repo.findAlertExpedition(expeditionId);
    if (!expedition) {
      throw new AppError(404, 'Alerta no encontrada o expedición ya no está en alerta', 'NOT_FOUND');
    }

    const existing = await this.repo.findConfirmation(expeditionId, rescuerId);
    if (existing) {
      throw new AppError(409, 'Ya confirmaste la recepción de esta alerta', 'ALREADY_CONFIRMED');
    }

    const log = await this.repo.createConfirmation(expeditionId, rescuerId, input.notes);

    return {
      message: 'Recepción de alerta confirmada',
      confirmation: {
        id: log.id,
        expeditionId: log.expedition_id,
        statusRescue: log.status_rescue,
        confirmedAt: log.updated_at,
        notes: log.notes,
      },
    };
  }
}
