import { loadEnv } from '../src/infrastructure/config/env.js';
import { RescueAlertService } from '../src/application/services/RescueAlertService.js';

const expeditionId = process.argv[2] ?? '65e80b99-f1d6-4774-9f02-364bd12a3867';

loadEnv();

new RescueAlertService()
  .notifyRescueTeams(expeditionId)
  .then((r) => {
    console.log('[test-rescue-alert]', JSON.stringify(r));
  })
  .catch((err) => {
    console.error('[test-rescue-alert] error:', err);
    process.exit(1);
  });
