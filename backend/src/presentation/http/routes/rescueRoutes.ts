import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';
import { getAlerts, getExpeditions, postConfirmAlert } from '../controllers/rescueController.js';

export function createRescueRoutes(): Router {
  const router = Router();

  router.use(authMiddleware, requireRole('rescatista'));

  router.get('/expeditions', asyncHandler(getExpeditions));
  router.get('/alerts', asyncHandler(getAlerts));
  router.post('/alerts/:expeditionId/confirm', asyncHandler(postConfirmAlert));

  return router;
}
