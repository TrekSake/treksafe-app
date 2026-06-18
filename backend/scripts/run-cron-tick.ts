import { loadEnv } from '../src/infrastructure/config/env.js';
import { runExpeditionDeadlineTick } from '../src/infrastructure/jobs/expeditionDeadlineCron.js';

loadEnv();

runExpeditionDeadlineTick()
  .then((r) => {
    console.log('[cron-tick]', JSON.stringify(r));
  })
  .catch((err) => {
    console.error('[cron-tick] error:', err);
    process.exit(1);
  });
