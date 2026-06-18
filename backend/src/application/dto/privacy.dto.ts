import { z } from 'zod';

export const dataRevocationSchema = z.object({
  action: z.enum(['delete_personal', 'anonymize_routes']),
  confirm: z.literal(true, {
    errorMap: () => ({ message: 'Debe confirmar la solicitud de revocación' }),
  }),
});

export type DataRevocationInput = z.infer<typeof dataRevocationSchema>;
