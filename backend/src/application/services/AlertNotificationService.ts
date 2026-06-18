import { buildContactAlertEmail } from '../../infrastructure/email/templates/contactAlertEmail.js';
import { MailService } from '../../infrastructure/email/MailService.js';
import { AlertRepository } from '../../infrastructure/repositories/AlertRepository.js';
import { EmailDispatchRepository } from '../../infrastructure/repositories/EmailDispatchRepository.js';

export type ContactAlertResult = {
  expeditionId: string;
  sent: number;
  logged: number;
  failed: number;
  skipped: number;
};

export class AlertNotificationService {
  constructor(
    private readonly alertRepo = new AlertRepository(),
    private readonly mail = new MailService(),
    private readonly dispatchRepo = new EmailDispatchRepository(),
  ) {}

  async notifyEmergencyContacts(expeditionId: string): Promise<ContactAlertResult> {
    const context = await this.alertRepo.findAlertContext(expeditionId);
    if (!context) {
      return { expeditionId, sent: 0, logged: 0, failed: 0, skipped: 0 };
    }

    if (context.contacts.length === 0) {
      console.warn(`[Alert] expedition ${expeditionId}: sin contactos vinculados`);
      return { expeditionId, sent: 0, logged: 0, failed: 0, skipped: 0 };
    }

    const seenEmails = new Set<string>();
    let sent = 0;
    let logged = 0;
    let failed = 0;
    let skipped = 0;

    for (const contact of context.contacts) {
      if (seenEmails.has(contact.email)) continue;
      seenEmails.add(contact.email);

      if (await this.dispatchRepo.wasAlreadySent(expeditionId, 'contact_alert', contact.email)) {
        skipped++;
        continue;
      }

      const { subject, html, text } = buildContactAlertEmail({
        contactName: contact.fullName,
        hikerFullName: context.hikerFullName,
        endLocation: context.endLocation,
        startLocation: context.startLocation,
        estimatedReturnTime: context.estimatedReturnTime,
        deadlineAt: context.deadlineAt,
      });

      try {
        const outcome = await this.mail.send({ to: contact.email, subject, html, text });
        if (outcome === 'sent') {
          sent++;
          await this.dispatchRepo.recordSent(expeditionId, 'contact_alert', contact.email);
        } else {
          logged++;
        }
      } catch (err) {
        failed++;
        console.error(`[Alert] fallo envío a ${contact.email}:`, err);
      }
    }

    const mode = this.mail.getTransportMode();
    console.log(
      `[Alert] expedition ${expeditionId}: contactos sent=${sent} logged=${logged} failed=${failed} skipped=${skipped} mode=${mode}`,
    );

    return { expeditionId, sent, logged, failed, skipped };
  }
}
