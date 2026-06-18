import { loadEnv } from '../src/infrastructure/config/env.js';
import { AlertNotificationService } from '../src/application/services/AlertNotificationService.js';

const expeditionId = process.argv[2] ?? '65e80b99-f1d6-4774-9f02-364bd12a3867';

loadEnv();

new AlertNotificationService()
  .notifyEmergencyContacts(expeditionId)
  .then((r) => {
    console.log('[test-alert]', JSON.stringify(r));
  })
  .catch((err) => {
    console.error('[test-alert] error:', err);
    process.exit(1);
  });
