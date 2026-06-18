import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { loadEnv } from '../../infrastructure/config/env.js';
import { cronHealth } from '../../infrastructure/jobs/cronState.js';
import { MailService } from '../../infrastructure/email/MailService.js';
import { errorHandler, notFoundHandler } from '../../shared/errors/errorHandler.js';
import { createRateLimiter } from './middleware/rateLimitMiddleware.js';
import { createAuthRoutes } from './routes/authRoutes.js';
import { createExpeditionRoutes } from './routes/expeditionRoutes.js';
import { createRescueRoutes } from './routes/rescueRoutes.js';
import { createUserRoutes } from './routes/userRoutes.js';

export function createApp() {
  const env = loadEnv();

  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json({ limit: '100kb' }));

  app.get(`${env.apiPrefix}/health`, (_req, res) => {
    const mail = new MailService();
    res.json({
      status: 'ok',
      service: 'treksafe-api',
      mail: {
        configured: mail.isConfigured(),
        mode: mail.getTransportMode(),
      },
      cron: cronHealth,
    });
  });

  const authRateLimit = createRateLimiter(20, 15 * 60_000);

  app.use(`${env.apiPrefix}/auth`, authRateLimit, createAuthRoutes());
  app.use(`${env.apiPrefix}/user`, createUserRoutes());
  app.use(`${env.apiPrefix}/expeditions`, createExpeditionRoutes());
  app.use(`${env.apiPrefix}/rescue`, createRescueRoutes());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
