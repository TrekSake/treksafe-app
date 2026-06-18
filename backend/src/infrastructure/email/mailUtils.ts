export type SendMailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

export type ParsedSender = {
  name: string;
  email: string;
};

export function parseSenderAddress(from: string): ParsedSender {
  const trimmed = from.trim();
  const bracketMatch = trimmed.match(/^(.+?)\s*<([^>]+)>$/);
  if (bracketMatch) {
    return { name: bracketMatch[1].trim(), email: bracketMatch[2].trim() };
  }
  if (trimmed.includes('@')) {
    return { name: 'TrekSafe Alertas', email: trimmed };
  }
  return { name: trimmed, email: trimmed };
}

export class MailSendError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly hint?: string,
  ) {
    super(message);
    this.name = 'MailSendError';
  }
}

export function isSmtpAuthOrIpError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as { code?: string; responseCode?: number; response?: string };
  return (
    e.code === 'EAUTH' ||
    e.responseCode === 525 ||
    (typeof e.response === 'string' &&
      (e.response.includes('Unauthorized IP') || e.response.includes('not verified')))
  );
}

export async function fetchOutboundIp(): Promise<string | null> {
  try {
    const res = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { ip?: string };
    return data.ip ?? null;
  } catch {
    return null;
  }
}

export function brevoIpAuthHint(outboundIp: string | null): string {
  const ipLine = outboundIp
    ? `Tu IP saliente actual: ${outboundIp}. Autorízala en Brevo → Settings → Security → Authorized IPs.`
    : 'Autoriza la IP saliente de tu servidor en Brevo → Settings → Security → Authorized IPs.';
  return `${ipLine} Verifica también que SMTP_FROM use un remitente verificado en Brevo.`;
}
