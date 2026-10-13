import { useEffect, useState } from 'react';
import { CircleHelp, Hand, Lightbulb, LogIn, Vote } from 'lucide-react';
import type { ActivityEvent, ActivityType } from '../../types/domain';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { cn } from '../../utils/cn';

const typeStyles: Record<ActivityType, { icon: typeof Vote; className: string }> = {
  vote: { icon: Vote, className: 'bg-success-50 text-success-600' },
  question: { icon: CircleHelp, className: 'bg-brand-50 text-brand-600' },
  suggestion: { icon: Lightbulb, className: 'bg-warning-50 text-warning-700' },
  request: { icon: Hand, className: 'bg-navy-50 text-navy-700' },
  join: { icon: LogIn, className: 'bg-slate-100 text-slate-600' },
};

interface ActivityFeedProps {
  events: ActivityEvent[];
  visible?: number;
  active?: boolean;
  intervalMs?: number;
}

/** DEMO: rotates through sample events to suggest a live activity stream. */
export default function ActivityFeed({ events, visible = 4, active = true, intervalMs = 3200 }: ActivityFeedProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!active || reducedMotion) return;
    const timer = window.setInterval(() => setOffset((o) => (o + 1) % events.length), intervalMs);
    return () => window.clearInterval(timer);
  }, [active, reducedMotion, events.length, intervalMs]);

  const items = Array.from({ length: visible }, (_, i) => {
    const event = events[(events.length - offset + i) % events.length];
    return { event, key: `${event.id}-${offset - i}` };
  });

  return (
    <ul className="space-y-2.5">
      {items.map(({ event, key }, index) => {
        const { icon: Icon, className } = typeStyles[event.type];
        return (
          <li key={key} className={cn('flex gap-2.5', index === 0 && 'animate-slide-in')}>
            <span className={cn('flex size-6 shrink-0 items-center justify-center rounded-md', className)}>
              <Icon size={13} aria-hidden="true" />
            </span>
            <p className="min-w-0 text-[11px] leading-snug text-slate-600">
              <span className="font-semibold text-navy-900">{event.actorName}</span> {event.message}
              <span className="mt-0.5 block text-[10px] text-slate-400">{index === 0 ? 'дөнгөж сая' : event.timeLabel}</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
