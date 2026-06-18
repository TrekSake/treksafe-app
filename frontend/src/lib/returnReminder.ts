const PREFIX = 'treksafe-reminder-dismissed-';

export function isReminderDismissed(expeditionId: string): boolean {
  try {
    return sessionStorage.getItem(`${PREFIX}${expeditionId}`) === '1';
  } catch {
    return false;
  }
}

export function dismissReminder(expeditionId: string): void {
  try {
    sessionStorage.setItem(`${PREFIX}${expeditionId}`, '1');
  } catch {
    /* ignore */
  }
}

export function clearReminderDismissal(expeditionId: string): void {
  try {
    sessionStorage.removeItem(`${PREFIX}${expeditionId}`);
  } catch {
    /* ignore */
  }
}
