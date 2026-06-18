import { buildRescueAlertEmail } from '../../infrastructure/email/templates/rescueAlertEmail.js';
import { MailService } from '../../infrastructure/email/MailService.js';
import { AlertRepository } from '../../infrastructure/repositories/AlertRepository.js';
import { RescueRepository } from '../../infrastructure/repositories/RescueRepository.js';
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';

export type RescueAlertResult = {
  expeditionId: string;
  sent: number;
  logged: number;
  failed: number;
  skipped: boolean;
};

export class RescueAlertService {
  constructor(
    private readonly alertRepo = new AlertRepository(),
    private readonly rescueRepo = new RescueRepository(),
    private readonly userRepo = new UserRepository(),
    private readonly mail = new MailService(),
  ) {}

  async notifyRescueTeams(expeditionId: string): Promise<RescueAlertResult> {
    const context = await this.alertRepo.findRescueAlertContext(expeditionId);
    if (!context) {
      return { expeditionId, sent: 0, logged: 0, failed: 0, skipped: true };
    }

    const rescuers = await this.rescueRepo.listValidatedRescuerEmails();
    if (rescuers.length === 0) {
      console.warn(`[Rescue] expedition ${expeditionId}: sin rescatistas registrados`);
      return { expeditionId, sent: 0, logged: 0, failed: 0, skipped: true };
    }

    const medicalRecord = await this.userRepo.getMedicalInfo(context.hikerId);
    const medical = medicalRecord
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

    for (const rescuer of rescuers) {
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
        if (outcome === 'sent') sent++;
        else logged++;
      } catch (err) {
        failed++;
        console.error(`[Rescue] fallo envío a ${rescuer.email}:`, err);
      }
    }

    const mode = this.mail.getTransportMode();
    console.log(
      `[Rescue] expedition ${expeditionId}: rescatistas notified sent=${sent} logged=${logged} failed=${failed} mode=${mode}`,
    );

    return { expeditionId, sent, logged, failed, skipped: false };
  }
}
