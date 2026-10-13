import { cn } from '../../utils/cn';
import type { VoteTone } from '../../types/domain';

type Tone = VoteTone | 'brand' | 'accent';

const fills: Record<Tone, string> = {
  positive: 'bg-success-500',
  negative: 'bg-danger-500',
  neutral: 'bg-slate-400',
  brand: 'bg-brand-600',
  accent: 'bg-accent-400',
};

interface ProgressBarProps {
  value: number;
  tone?: Tone;
  label: string;
  size?: 'xs' | 'sm' | 'md';
  /** Optional vertical marker, e.g. the pass threshold. */
  marker?: number;
  trackClassName?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  tone = 'brand',
  label,
  size = 'sm',
  marker,
  trackClassName,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(
        'relative w-full overflow-hidden rounded-full',
        size === 'xs' ? 'h-1' : size === 'sm' ? 'h-2' : 'h-2.5',
        trackClassName ?? 'bg-slate-100',
        className,
      )}
    >
      <div
        className={cn('h-full rounded-full transition-[width] duration-700 ease-out', fills[tone])}
        style={{ width: `${clamped}%` }}
      />
      {marker !== undefined && (
        <span aria-hidden="true" className="absolute inset-y-0 w-px bg-navy-900/50" style={{ left: `${marker}%` }} />
      )}
    </div>
  );
}
