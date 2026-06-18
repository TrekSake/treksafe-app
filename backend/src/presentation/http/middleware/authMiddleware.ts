import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../../../shared/errors/AppError.js';
import { verifyToken, type JwtPayload } from '../../../infrastructure/security/jwt.js';

export type AuthUser = JwtPayload & { id: string };

export type AuthenticatedRequest = Request & { user: AuthUser };

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(new AppError(401, 'Token de autenticación requerido', 'UNAUTHORIZED'));
    return;
  }

  try {
    const token = header.slice(7);
    const payload = verifyToken(token);
    (req as AuthenticatedRequest).user = { ...payload, id: payload.sub };
    next();
  } catch {
    next(new AppError(401, 'Token inválido o expirado', 'INVALID_TOKEN'));
  }
}

export function requireRole(...roles: Array<'senderista' | 'rescatista'>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;
    if (!roles.includes(user.role)) {
      next(new AppError(403, 'No tienes permiso para esta acción', 'FORBIDDEN'));
      return;
    }
    next();
  };
}
