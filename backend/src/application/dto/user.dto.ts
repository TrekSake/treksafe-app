import { z } from 'zod';
import { parseDecimalCoordinates, isValidPeruCoordinates } from '../../shared/utils/coordinates.js';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

function optionalCoordinatesField(field: string) {
  return z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const parsed = parseDecimalCoordinates(value);
        return parsed !== null && isValidPeruCoordinates(parsed.lat, parsed.lon);
      },
      {
        message: `Coordenadas de ${field} inválidas. Formato: -9.0105, -77.6042`,
      },
    );
}

export const upsertMedicalInfoSchema = z.object({
  bloodType: z.enum(bloodTypes),
  allergies: z.string().trim().max(1000).default(''),
  conditions: z.string().trim().max(2000).default(''),
  medications: z.string().trim().max(1000).default(''),
  consentSigned: z.literal(true, {
    errorMap: () => ({
      message: 'Debe autorizar la revelación de datos únicamente en alerta activa',
    }),
  }),
});

export const createContactSchema = z.object({
  fullName: z.string().trim().min(2, 'Nombre obligatorio'),
  relationship: z.string().trim().min(2, 'Parentesco obligatorio'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?\d{9,15}$/, 'Teléfono inválido'),
  email: z.string().trim().email('Correo inválido'),
});

export const createExpeditionSchema = z
  .object({
    startLocation: z.string().trim().min(3, 'Ubicación inicial obligatoria'),
    endLocation: z.string().trim().min(3, 'Destino obligatorio'),
    startCoordinates: optionalCoordinatesField('salida'),
    endCoordinates: optionalCoordinatesField('destino'),
    startTime: z.string().min(1, 'Hora de salida obligatoria'),
    estimatedReturnTime: z.string().min(1, 'Hora de retorno obligatoria'),
    toleranceMinutes: z.coerce.number().int().min(1).max(480).default(30),
    contactIds: z.array(z.string().uuid()).min(1, 'Selecciona al menos un contacto'),
    companionNames: z
      .array(z.string().trim().min(2))
      .min(1, 'Agrega al menos un acompañante'),
  })
  .refine((d) => new Date(d.estimatedReturnTime) > new Date(d.startTime), {
    message: 'La hora de retorno debe ser posterior a la hora de salida',
    path: ['estimatedReturnTime'],
  });

export type UpsertMedicalInfoInput = z.infer<typeof upsertMedicalInfoSchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type CreateExpeditionInput = z.infer<typeof createExpeditionSchema>;
