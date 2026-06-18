import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';
import {
  getActiveExpedition,
  getExpeditions,
  postCheckIn,
  postExpedition,
} from '../controllers/expeditionController.js';

export function createExpeditionRoutes(): Router {
  const router = Router();

  router.use(authMiddleware, requireRole('senderista'));

  router.get('/active', asyncHandler(getActiveExpedition));
  router.post('/:id/check-in', asyncHandler(postCheckIn));
  router.post('/', asyncHandler(postExpedition));
  router.get('/', asyncHandler(getExpeditions));

  return router;
}
