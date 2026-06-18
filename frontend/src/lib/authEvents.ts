import { clearSession } from '@/lib/session';

type UnauthorizedHandler = () => void;

let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  onUnauthorized = handler;
}

export function handleUnauthorized() {
  clearSession();
  onUnauthorized?.();
}
