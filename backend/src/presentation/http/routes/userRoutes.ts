import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { authMiddleware, requireRole } from '../middleware/authMiddleware.js';
import {
  deleteContact,
  getContacts,
  getMedicalInfo,
  postContact,
  postDataRevocation,
  putMedicalInfo,
} from '../controllers/userController.js';

export function createUserRoutes(): Router {
  const router = Router();

  router.use(authMiddleware, requireRole('senderista'));

  router.put('/medical-info', asyncHandler(putMedicalInfo));
  router.get('/medical-info', asyncHandler(getMedicalInfo));
  router.post('/privacy/revoke', asyncHandler(postDataRevocation));

  router.get('/contacts', asyncHandler(getContacts));
  router.post('/contacts', asyncHandler(postContact));
  router.delete('/contacts/:contactId', asyncHandler(deleteContact));

  return router;
}
