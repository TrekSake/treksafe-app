import { z } from 'zod';

const emailSchema = z
  .string()
  .trim()
  .min(1, 'El correo es obligatorio')
  .email('Formato de correo inválido');

const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
  .regex(/[a-z]/, 'Debe incluir al menos una minúscula')
  .regex(/[0-9]/, 'Debe incluir al menos un número');

export const registerHikerSchema = z.object({
  fullName: z.string().trim().min(3, 'Nombre completo obligatorio'),
  documentId: z
    .string()
    .trim()
    .regex(/^\d{8}$/, 'El DNI debe tener 8 dígitos'),
  email: emailSchema,
  phone: z
    .string()
    .trim()
    .min(9, 'Celular obligatorio')
    .regex(/^\+?\d{9,15}$/, 'Formato de celular inválido'),
  password: passwordSchema,
  privacyConsent: z.literal(true, {
    errorMap: () => ({
      message: 'Debe aceptar el tratamiento de datos personales (Ley N° 29733)',
    }),
  }),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export const registerRescuerSchema = z.object({
  fullName: z.string().trim().min(3, 'Nombre completo obligatorio'),
  email: emailSchema,
  password: passwordSchema,
  institution: z.enum(['AGMP', 'MINCETUR'], {
    errorMap: () => ({ message: 'Institución inválida' }),
  }),
  credentialNumber: z.string().trim().min(5, 'Número de credencial obligatorio'),
  birthDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha de nacimiento inválida (YYYY-MM-DD)'),
});

export type RegisterHikerInput = z.infer<typeof registerHikerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterRescuerInput = z.infer<typeof registerRescuerSchema>;
