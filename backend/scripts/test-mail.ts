import { loadEnv } from '../src/infrastructure/config/env.js';
import { MailService } from '../src/infrastructure/email/MailService.js';
import { brevoIpAuthHint, fetchOutboundIp } from '../src/infrastructure/email/mailUtils.js';

async function main() {
  loadEnv();
  const to = process.argv[2] ?? 'anatestcontact@gmail.com';
  const mail = new MailService();
  const outboundIp = await fetchOutboundIp();

  console.log(`[test-mail] mode=${mail.getTransportMode()}`);
  if (outboundIp) console.log(`[test-mail] outbound IP=${outboundIp}`);
  console.log(`[test-mail] ${brevoIpAuthHint(outboundIp)}`);

  await mail.verifyConnection();

  const outcome = await mail.send({
    to,
    subject: '[TrekSafe] Prueba de alerta SMTP',
    html: '<p>Correo de prueba TrekSafe — HU-12</p>',
    text: 'Correo de prueba TrekSafe — HU-12',
  });

  console.log(`[test-mail] resultado=${outcome}`);
}

main().catch((err) => {
  console.error('[test-mail] error:', err);
  process.exit(1);
});
