import type { Request, Response } from 'express';
import { checkInSchema } from '../../../application/dto/expedition.dto.js';
import { createExpeditionSchema } from '../../../application/dto/user.dto.js';
import { ExpeditionService } from '../../../application/services/ExpeditionService.js';
import type { AuthenticatedRequest } from '../middleware/authMiddleware.js';

const expeditionService = new ExpeditionService();

function authReq(req: Request): AuthenticatedRequest {
  return req as AuthenticatedRequest;
}

export async function postExpedition(req: Request, res: Response): Promise<void> {
  const input = createExpeditionSchema.parse(req.body);
  const expedition = await expeditionService.createExpedition(authReq(req).user.id, input);
  res.status(201).json({ message: 'Expedición registrada', expedition });
}

export async function getExpeditions(req: Request, res: Response): Promise<void> {
  const expeditions = await expeditionService.listExpeditions(authReq(req).user.id);
  res.status(200).json({ expeditions });
}

export async function getActiveExpedition(req: Request, res: Response): Promise<void> {
  const expedition = await expeditionService.getActiveExpedition(authReq(req).user.id);
  res.status(200).json({ expedition });
}

export async function postCheckIn(req: Request, res: Response): Promise<void> {
  const expeditionId = String(req.params.id);
  const input = checkInSchema.parse(req.body);
  const result = await expeditionService.checkIn(authReq(req).user.id, expeditionId, input);
  res.status(200).json({
    message: 'Retorno seguro registrado',
    expedition: result.expedition,
    checkedInAt: result.checkedInAt,
  });
}
