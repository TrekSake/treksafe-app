import { createApp } from './presentation/http/app.js';
import { loadEnv } from './infrastructure/config/env.js';
import { verifyDatabaseConnection } from './infrastructure/database/supabase.js';
import { MailService } from './infrastructure/email/MailService.js';
import { startExpeditionDeadlineCron } from './infrastructure/jobs/expeditionDeadlineCron.js';

async function bootstrap() {
  loadEnv();
  const { port } = loadEnv();

  try {
    await verifyDatabaseConnection();
    console.log('[TrekSafe API] Supabase database connection OK');
  } catch (err) {
    console.error('[TrekSafe API] Database connection failed:', err);
    process.exit(1);
  }

  try {
    await new MailService().verifyConnection();
  } catch (err) {
    console.error('[TrekSafe API] Mail configuration failed:', err);
    process.exit(1);
  }

  startExpeditionDeadlineCron();

  const app = createApp();
  app.listen(port, () => {
    console.log(`[TrekSafe API] listening on http://localhost:${port}`);
  });
}

bootstrap();
