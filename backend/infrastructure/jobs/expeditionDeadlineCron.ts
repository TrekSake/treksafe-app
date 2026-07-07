import { AlertNotificationService } from '../../application/services/AlertNotificationService.js';
import { RescueAlertService } from '../../application/services/RescueAlertService.js';
import { MailService } from '../email/MailService.js';
import { loadEnv } from '../config/env.js';
import { ExpeditionRepository } from '../repositories/ExpeditionRepository.js';
import { cronHealth } from './cronState.js';

export type DeadlineCronTickResult = {
  promoted: number;
  alerted: number;
  contactEmails: number;
  rescueEmails: number;
};

export async function runExpeditionDeadlineTick(
  repo = new ExpeditionRepository(),
  contactAlerts = new AlertNotificationService(),
  rescueAlerts = new RescueAlertService(),
): Promise<DeadlineCronTickResult> {
  const promoted = await repo.promoteReadyProgrammed();
  const alertedIds = await repo.markExpiredInProgressAsAlert();

  let contactEmails = 0;
  let rescueEmails = 0;

  for (const expeditionId of alertedIds) {
    const contacts = await contactAlerts.notifyEmergencyContacts(expeditionId);
    contactEmails += contacts.sent + contacts.logged;

    const rescue = await rescueAlerts.notifyRescueTeams(expeditionId);
    rescueEmails += rescue.sent + rescue.logged;
  }

  return { promoted, alerted: alertedIds.length, contactEmails, rescueEmails };
}

export function startExpeditionDeadlineCron(): () => void {
  const { cronIntervalMs } = loadEnv();
  const repo = new ExpeditionRepository();
  const contactAlerts = new AlertNotificationService();
  const rescueAlerts = new RescueAlertService();
  const mailMode = new MailService().getTransportMode();

  const tick = async () => {
    try {
      const { promoted, alerted, contactEmails, rescueEmails } =
        await runExpeditionDeadlineTick(repo, contactAlerts, rescueAlerts);

      cronHealth.lastTickAt = new Date().toISOString();
      cronHealth.lastError = null;
      cronHealth.lastPromoted = promoted;
      cronHealth.lastAlerted = alerted;

      if (promoted > 0 || alerted > 0) {
        console.log(
          `[Cron] expedition deadlines: promoted=${promoted} alerted=${alerted} contactEmails=${contactEmails} rescueEmails=${rescueEmails}`,
        );
      }
    } catch (err) {
      cronHealth.lastError = err instanceof Error ? err.message : String(err);
      console.error('[Cron] expedition deadline tick failed:', err);
    }
  };

  void tick();

  const timer = setInterval(() => {
    void tick();
  }, cronIntervalMs);

  console.log(
    `[Cron] expedition deadline job started (interval=${cronIntervalMs}ms, mail=${mailMode})`,
  );

  return () => clearInterval(timer);
}
