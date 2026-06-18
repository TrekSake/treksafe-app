import { Router } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import {
  login,
  registerHiker,
  registerRescuer,
} from '../controllers/authController.js';

export function createAuthRoutes(): Router {
  const router = Router();

  router.post('/register-hiker', asyncHandler(registerHiker));
  router.post('/login', asyncHandler(login));
  router.post('/register-rescuer', asyncHandler(registerRescuer));

  return router;
}
