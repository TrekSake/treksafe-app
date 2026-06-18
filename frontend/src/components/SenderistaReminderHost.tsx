import { useEffect, useState } from 'react';
import { useCountdown } from '@/hooks/useCountdown';
import { dismissReminder, isReminderDismissed } from '@/lib/returnReminder';
import { getActiveExpedition, type ActiveExpedition } from '@/services/expedition';
import { ReturnReminderSheet } from './ReturnReminderSheet';

export function SenderistaReminderHost() {
  const [expedition, setExpedition] = useState<ActiveExpedition | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const countdown = useCountdown(expedition?.deadlineAt, expedition?.startTime);

  useEffect(() => {
    const load = () => {
      getActiveExpedition()
        .then((r) => {
          setExpedition(r.expedition);
          if (r.expedition) {
            setDismissed(isReminderDismissed(r.expedition.id));
          }
        })
        .catch(() => setExpedition(null));
    };
    load();
    const poll = setInterval(load, 30_000);
    return () => clearInterval(poll);
  }, []);

  const shouldShow =
    expedition &&
    countdown.isUrgent &&
    !countdown.expired &&
    !dismissed;

  const minutesRemaining = countdown.hours * 60 + countdown.minutes;

  if (!shouldShow || !expedition) return null;

  return (
    <ReturnReminderSheet
      expedition={expedition}
      minutesRemaining={minutesRemaining}
      checkInHref="/senderista/expedicion/activa?checkIn=1"
      onDismiss={() => {
        dismissReminder(expedition.id);
        setDismissed(true);
      }}
    />
  );
}
