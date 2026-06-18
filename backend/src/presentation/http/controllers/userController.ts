import type { Request, Response } from 'express';
import { dataRevocationSchema } from '../../../application/dto/privacy.dto.js';
import { createContactSchema, upsertMedicalInfoSchema } from '../../../application/dto/user.dto.js';
import { UserService } from '../../../application/services/UserService.js';
import type { AuthenticatedRequest } from '../middleware/authMiddleware.js';

const userService = new UserService();

function authReq(req: Request): AuthenticatedRequest {
  return req as AuthenticatedRequest;
}

export async function putMedicalInfo(req: Request, res: Response): Promise<void> {
  const input = upsertMedicalInfoSchema.parse(req.body);
  const data = await userService.upsertMedicalInfo(authReq(req).user.id, input);
  res.status(200).json({ message: 'Ficha médica guardada', medicalInfo: data });
}

export async function getMedicalInfo(req: Request, res: Response): Promise<void> {
  const data = await userService.getMedicalInfo(authReq(req).user.id);
  res.status(200).json({ medicalInfo: data });
}

export async function getContacts(req: Request, res: Response): Promise<void> {
  const contacts = await userService.listContacts(authReq(req).user.id);
  res.status(200).json({ contacts });
}

export async function postContact(req: Request, res: Response): Promise<void> {
  const input = createContactSchema.parse(req.body);
  const contact = await userService.createContact(authReq(req).user.id, input);
  res.status(201).json({ message: 'Contacto creado', contact });
}

export async function deleteContact(req: Request, res: Response): Promise<void> {
  const contactId = String(req.params.contactId);
  await userService.deleteContact(authReq(req).user.id, contactId);
  res.status(200).json({ message: 'Contacto eliminado' });
}

export async function postDataRevocation(req: Request, res: Response): Promise<void> {
  const input = dataRevocationSchema.parse(req.body);
  const result = await userService.revokePersonalData(authReq(req).user.id, input);
  res.status(200).json(result);
}
