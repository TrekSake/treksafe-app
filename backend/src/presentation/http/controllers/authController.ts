import type { Request, Response } from 'express';
import {
  loginSchema,
  registerHikerSchema,
  registerRescuerSchema,
} from '../../../application/dto/auth.dto.js';
import { AuthService } from '../../../application/services/AuthService.js';

const authService = new AuthService();

export async function registerHiker(req: Request, res: Response): Promise<void> {
  const input = registerHikerSchema.parse(req.body);
  const result = await authService.registerHiker(input);
  res.status(201).json({
    message: 'Cuenta de senderista creada correctamente',
    ...result,
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const input = loginSchema.parse(req.body);
  const result = await authService.login(input);
  res.status(200).json({
    message: 'Inicio de sesión exitoso',
    ...result,
  });
}

export async function registerRescuer(req: Request, res: Response): Promise<void> {
  const input = registerRescuerSchema.parse(req.body);
  const result = await authService.registerRescuer(input);
  res.status(201).json({
    message: 'Credenciales validadas. Cuenta de rescatista creada correctamente',
    ...result,
  });
}
