import { buildRescueAlertEmail } from '../../infrastructure/email/templates/rescueAlertEmail.js';
import { MailService } from '../../infrastructure/email/MailService.js';
import { AlertRepository } from '../../infrastructure/repositories/AlertRepository.js';
import { EmailDispatchRepository } from '../../infrastructure/repositories/EmailDispatchRepository.js';
import { RescueRepository } from '../../infrastructure/repositories/RescueRepository.js';
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';

export type RescueAlertResult = {
  expeditionId: string;
  sent: number;
  logged: number;
  failed: number;
  skipped: number;
};

export class RescueAlertService {
  constructor(
    private readonly alertRepo = new AlertRepository(),
    private readonly rescueRepo = new RescueRepository(),
    private readonly userRepo = new UserRepository(),
    private readonly mail = new MailService(),
    private readonly dispatchRepo = new EmailDispatchRepository(),
  ) {}

  async notifyRescueTeams(expeditionId: string): Promise<RescueAlertResult> {
    const context = await this.alertRepo.findRescueAlertContext(expeditionId);
    if (!context) {
      return { expeditionId, sent: 0, logged: 0, failed: 0, skipped: 0 };
    }

    const rescuers = await this.rescueRepo.listValidatedRescuerEmails();
    if (rescuers.length === 0) {
      console.warn(`[Rescue] expedition ${expeditionId}: sin rescatistas registrados`);
      return { expeditionId, sent: 0, logged: 0, failed: 0, skipped: 0 };
    }

    const medicalRecord = await this.userRepo.getMedicalInfo(context.hikerId);
    const medical =
      medicalRecord?.consentSigned
        ? {
            bloodType: medicalRecord.bloodType,
            allergies: medicalRecord.payload.allergies,
            conditions: medicalRecord.payload.conditions,
            medications: medicalRecord.payload.medications,
          }
        : null;

    let sent = 0;
    let logged = 0;
    let failed = 0;
    let skipped = 0;

    for (const rescuer of rescuers) {
      if (await this.dispatchRepo.wasAlreadySent(expeditionId, 'rescue_alert', rescuer.email)) {
        skipped++;
        continue;
      }

      const { subject, html, text } = buildRescueAlertEmail({
        rescuerName: rescuer.fullName,
        hikerFullName: context.hikerFullName,
        hikerPhone: context.hikerPhone,
        startLocation: context.startLocation,
        endLocation: context.endLocation,
        startTime: context.startTime,
        estimatedReturnTime: context.estimatedReturnTime,
        deadlineAt: context.deadlineAt,
        companions: context.companions,
        emergencyContacts: context.emergencyContacts,
        medical,
      });

      try {
        const outcome = await this.mail.send({ to: rescuer.email, subject, html, text });
        if (outcome === 'sent') {
          sent++;
          await this.dispatchRepo.recordSent(expeditionId, 'rescue_alert', rescuer.email);
        } else {
          logged++;
        }
      } catch (err) {
        failed++;
        console.error(`[Rescue] fallo envío a ${rescuer.email}:`, err);
      }
    }

    const mode = this.mail.getTransportMode();
    console.log(
      `[Rescue] expedition ${expeditionId}: rescatistas sent=${sent} logged=${logged} failed=${failed} skipped=${skipped} mode=${mode}`,
    );

    return { expeditionId, sent, logged, failed, skipped };
  }
}
