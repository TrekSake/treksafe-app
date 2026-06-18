import type { Request, Response } from 'express';
import { confirmAlertSchema, listExpeditionsQuerySchema } from '../../../application/dto/rescue.dto.js';
import { RescueService } from '../../../application/services/RescueService.js';
import type { AuthenticatedRequest } from '../middleware/authMiddleware.js';

const rescueService = new RescueService();

function authReq(req: Request): AuthenticatedRequest {
  return req as AuthenticatedRequest;
}

export async function getExpeditions(req: Request, res: Response): Promise<void> {
  const query = listExpeditionsQuerySchema.parse(req.query);
  const expeditions = await rescueService.listExpeditions(authReq(req).user.id, query);
  res.status(200).json({ expeditions });
}

export async function getAlerts(req: Request, res: Response): Promise<void> {
  const alerts = await rescueService.listAlerts(authReq(req).user.id);
  res.status(200).json({ alerts });
}

export async function postConfirmAlert(req: Request, res: Response): Promise<void> {
  const expeditionId = String(req.params.expeditionId);
  const input = confirmAlertSchema.parse(req.body ?? {});
  const result = await rescueService.confirmAlert(authReq(req).user.id, expeditionId, input);
  res.status(201).json(result);
}
