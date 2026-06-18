import { z } from 'zod';

export const confirmAlertSchema = z.object({
  notes: z.string().trim().max(2000).optional(),
});

export const listExpeditionsQuerySchema = z.object({
  zone: z.string().trim().max(120).optional(),
});

export const updateRescueLogSchema = z
  .object({
    statusRescue: z.enum(['en_busqueda', 'localizados', 'cerrado']).optional(),
    notes: z.string().trim().max(2000).optional(),
  })
  .refine((data) => data.statusRescue !== undefined || data.notes !== undefined, {
    message: 'Debe indicar estado o notas',
  });

export type ConfirmAlertInput = z.infer<typeof confirmAlertSchema>;
export type ListExpeditionsQuery = z.infer<typeof listExpeditionsQuerySchema>;
export type UpdateRescueLogInput = z.infer<typeof updateRescueLogSchema>;
