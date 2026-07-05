import { getToken, clearSession } from '@/lib/session';
import { handleUnauthorized } from '@/lib/authEvents';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export type ApiErrorBody = {
  error?: string;
  message?: string;
  code?: string;
  details?: Record<string, string[]>;
};

async function parseError(res: Response): Promise<ApiErrorBody> {
  try {
    return (await res.json()) as ApiErrorBody;
  } catch {
    return { message: res.statusText };
  }
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: ApiErrorBody['details'],
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (auth) {
    const token = getToken();
    if (!token) throw new ApiClientError('Sesión expirada', 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiClientError(
      'No se pudo conectar con el servidor. Verifica que el backend esté corriendo.',
      0,
    );
  }

  if (res.status === 401 && auth) {
    handleUnauthorized();
    throw new ApiClientError('Sesión expirada. Inicia sesión nuevamente.', 401, 'UNAUTHORIZED');
  }

  if (!res.ok) {
    const err = await parseError(res);
    throw new ApiClientError(err.message ?? 'Error en la solicitud', res.status, err.code, err.details);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string, auth = false) => apiRequest<T>(path, { method: 'GET' }, auth),
  post: <T>(path: string, body: unknown, auth = false) =>
    apiRequest<T>(path, { method: 'POST', body: JSON.stringify(body) }, auth),
  put: <T>(path: string, body: unknown, auth = false) =>
    apiRequest<T>(path, { method: 'PUT', body: JSON.stringify(body) }, auth),
  patch: <T>(path: string, body: unknown, auth = false) =>
    apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body) }, auth),
  delete: <T>(path: string, auth = false) => apiRequest<T>(path, { method: 'DELETE' }, auth),
};

export { clearSession };
