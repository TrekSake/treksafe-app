import { useEffect, useState } from 'react';

export type CountdownState = {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  progressPct: number;
  isUrgent: boolean;
};

function clampPct(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export function useCountdown(
  deadlineAt: string | null | undefined,
  startTime?: string | null,
): CountdownState {
  const [state, setState] = useState<CountdownState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
    progressPct: 0,
    isUrgent: false,
  });

  useEffect(() => {
    if (!deadlineAt) return;

    const deadlineMs = new Date(deadlineAt).getTime();
    const startMs = startTime ? new Date(startTime).getTime() : deadlineMs - 3_600_000;
    const totalMs = Math.max(deadlineMs - startMs, 1);

    const tick = () => {
      const remainingMs = deadlineMs - Date.now();
      const expired = remainingMs <= 0;
      const absMs = Math.max(remainingMs, 0);

      const hours = Math.floor(absMs / 3_600_000);
      const minutes = Math.floor((absMs % 3_600_000) / 60_000);
      const seconds = Math.floor((absMs % 60_000) / 1000);
      const elapsedMs = Date.now() - startMs;
      const progressPct = clampPct((elapsedMs / totalMs) * 100);

      setState({
        hours,
        minutes,
        seconds,
        expired,
        progressPct,
        isUrgent: !expired && remainingMs <= 30 * 60_000,
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadlineAt, startTime]);

  return state;
}
