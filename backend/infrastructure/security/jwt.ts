import jwt from 'jsonwebtoken';
import { loadEnv } from '../config/env.js';

export type JwtPayload = {
  sub: string;
  role: 'senderista' | 'rescatista';
};

export function signToken(payload: JwtPayload): string {
  const { jwtSecret, jwtExpiresIn } = loadEnv();
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  const { jwtSecret } = loadEnv();
  return jwt.verify(token, jwtSecret) as JwtPayload;
}
