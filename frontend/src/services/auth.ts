export type AuthResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    role: 'senderista' | 'rescatista';
  };
};

export type ApiErrorBody = {
  error?: string;
  message?: string;
  code?: string;
  details?: Record<string, string[]>;
};

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

async function parseError(res: Response): Promise<ApiErrorBody> {
  try {
    return (await res.json()) as ApiErrorBody;
  } catch {
    return { message: res.statusText };
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Verifica que el backend esté corriendo (npm run dev --prefix backend).',
    );
  }

  if (!res.ok) {
    const err = await parseError(res);
    const error = new Error(err.message ?? 'Error en la solicitud');
    (error as Error & { status: number; code?: string; details?: ApiErrorBody['details'] }).status =
      res.status;
    (error as Error & { code?: string }).code = err.code;
    (error as Error & { details?: ApiErrorBody['details'] }).details = err.details;
    throw error;
  }

  return res.json() as Promise<T>;
}

export type RegisterHikerPayload = {
  fullName: string;
  documentId: string;
  email: string;
  phone: string;
  password: string;
  privacyConsent: true;
};

export type RegisterRescuerPayload = {
  fullName: string;
  email: string;
  password: string;
  institution: 'AGMP' | 'MINCETUR';
  credentialNumber: string;
  birthDate: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export function registerHiker(data: RegisterHikerPayload) {
  return apiPost<AuthResponse>('/auth/register-hiker', data);
}

export function login(data: LoginPayload) {
  return apiPost<AuthResponse>('/auth/login', data);
}

export function registerRescuer(data: RegisterRescuerPayload) {
  return apiPost<AuthResponse>('/auth/register-rescuer', data);
}
