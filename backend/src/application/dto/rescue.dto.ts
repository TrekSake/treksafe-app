import { z } from 'zod';

export const confirmAlertSchema = z.object({
  notes: z.string().trim().max(2000).optional(),
});

export type ConfirmAlertInput = z.infer<typeof confirmAlertSchema>;
