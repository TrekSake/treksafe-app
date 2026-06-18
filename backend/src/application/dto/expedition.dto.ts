import { z } from 'zod';

export const checkInSchema = z.object({
  password: z.string().min(1, 'Contraseña requerida'),
});

export type CheckInInput = z.infer<typeof checkInSchema>;
