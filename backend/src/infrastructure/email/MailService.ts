import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { loadEnv } from '../config/env.js';
import { sendViaBrevoApi } from './BrevoApiMailer.js';
import {
  brevoIpAuthHint,
  fetchOutboundIp,
  MailSendError,
  parseSenderAddress,
  type SendMailInput,
} from './mailUtils.js';

export type MailTransportMode = 'brevo-api' | 'smtp' | 'dev-log';

export class MailService {
  private transporter: Transporter | null = null;

  isConfigured(): boolean {
    const { brevoApiKey, smtpHost, smtpUser, smtpPass } = loadEnv();
    return Boolean(brevoApiKey || (smtpHost && smtpUser && smtpPass));
  }

  getTransportMode(): MailTransportMode {
    const { brevoApiKey, smtpHost, smtpUser, smtpPass } = loadEnv();
    if (brevoApiKey) return 'brevo-api';
    if (smtpHost && smtpUser && smtpPass) return 'smtp';
    return 'dev-log';
  }

  private shouldDevFallback(): boolean {
    const { nodeEnv, mailDevFallback } = loadEnv();
    return mailDevFallback || nodeEnv === 'development';
  }

  private getSmtpTransporter(): Transporter {
    if (!this.transporter) {
      const { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPass } = loadEnv();
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        requireTLS: !smtpSecure && smtpPort === 587,
        auth: { user: smtpUser, pass: smtpPass },
        tls: { minVersion: 'TLSv1.2' },
      });
    }
    return this.transporter;
  }

  private devLog(input: SendMailInput): void {
    console.log(
      `[Mail:dev] To: ${input.to} | Subject: ${input.subject}\n${input.text ?? '(HTML body)'}`,
    );
  }

  private async sendSmtp(input: SendMailInput): Promise<void> {
    const { smtpFrom } = loadEnv();
    const sender = parseSenderAddress(smtpFrom);

    await this.getSmtpTransporter().sendMail({
      from: { name: sender.name, address: sender.email },
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    });
  }

  async verifyConnection(): Promise<void> {
    const mode = this.getTransportMode();
    if (mode === 'dev-log') {
      console.log('[Mail] modo dev-log (sin credenciales SMTP/API)');
      return;
    }

    if (mode === 'brevo-api') {
      console.log('[Mail] transporte Brevo API configurado');
      return;
    }

    try {
      await this.getSmtpTransporter().verify();
      console.log('[Mail] conexión SMTP verificada');
    } catch (err) {
      const outboundIp = await fetchOutboundIp();
      const hint = brevoIpAuthHint(outboundIp);
      console.warn(`[Mail] verificación SMTP falló: ${formatMailError(err)}`);
      console.warn(`[Mail] ${hint}`);
      if (this.shouldDevFallback()) {
        console.warn('[Mail] desarrollo: se usará dev-log si el envío SMTP falla');
        return;
      }
      throw new MailSendError(formatMailError(err), 'SMTP_VERIFY_FAILED', hint);
    }
  }

  async send(input: SendMailInput): Promise<'sent' | 'logged'> {
    const mode = this.getTransportMode();

    if (mode === 'dev-log') {
      this.devLog(input);
      return 'logged';
    }

    try {
      if (mode === 'brevo-api') {
        await sendViaBrevoApi(input);
      } else {
        await this.sendSmtp(input);
      }
      return 'sent';
    } catch (err) {
      if (!this.shouldDevFallback()) {
        throw err;
      }

      const outboundIp = await fetchOutboundIp();
      console.warn(`[Mail] envío falló (${formatMailError(err)}). Fallback dev-log.`);
      console.warn(`[Mail] ${brevoIpAuthHint(outboundIp)}`);
      this.devLog(input);
      return 'logged';
    }
  }
}

function formatMailError(err: unknown): string {
  if (err instanceof MailSendError) return err.message;
  if (err && typeof err === 'object') {
    const e = err as { message?: string; response?: string; code?: string };
    return [e.message, e.response, e.code].filter(Boolean).join(' — ');
  }
  return String(err);
}
