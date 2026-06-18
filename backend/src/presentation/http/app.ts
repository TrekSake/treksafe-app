import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { loadEnv } from '../../infrastructure/config/env.js';
import { errorHandler, notFoundHandler } from '../../shared/errors/errorHandler.js';
import { createAuthRoutes } from './routes/authRoutes.js';
import { createExpeditionRoutes } from './routes/expeditionRoutes.js';
import { createRescueRoutes } from './routes/rescueRoutes.js';
import { createUserRoutes } from './routes/userRoutes.js';

export function createApp() {
  const env = loadEnv();

  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json());

  app.get(`${env.apiPrefix}/health`, (_req, res) => {
    res.json({ status: 'ok', service: 'treksafe-api' });
  });

  app.use(`${env.apiPrefix}/auth`, createAuthRoutes());
  app.use(`${env.apiPrefix}/user`, createUserRoutes());
  app.use(`${env.apiPrefix}/expeditions`, createExpeditionRoutes());
  app.use(`${env.apiPrefix}/rescue`, createRescueRoutes());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
