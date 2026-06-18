import { z } from 'zod';

export const confirmAlertSchema = z.object({
  notes: z.string().trim().max(2000).optional(),
});

export const listExpeditionsQuerySchema = z.object({
  zone: z.string().trim().max(120).optional(),
});

export type ConfirmAlertInput = z.infer<typeof confirmAlertSchema>;
export type ListExpeditionsQuery = z.infer<typeof listExpeditionsQuerySchema>;
