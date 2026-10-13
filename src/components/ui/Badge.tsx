import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Tone = 'brand' | 'neutral' | 'success' | 'danger' | 'warning' | 'live' | 'dark';

const tones: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-700 dark:text-brand-300 ring-brand-200/70',
  neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-success-50 text-success-700 ring-success-500/20',
  danger: 'bg-danger-50 text-danger-600 ring-danger-500/20',
  warning: 'bg-warning-50 text-warning-700 ring-warning-500/25',
  live: 'bg-danger-50 text-danger-600 ring-danger-500/20',
  dark: 'bg-white/10 text-white ring-white/15',
};

const dotTones: Record<Tone, string> = {
  brand: 'bg-brand-500',
  neutral: 'bg-slate-400',
  success: 'bg-success-500',
  danger: 'bg-danger-500',
  warning: 'bg-warning-500',
  live: 'bg-danger-500 animate-live-dot',
  dark: 'bg-accent-400',
};

interface BadgeProps {
  tone?: Tone;
  dot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  children: ReactNode;
}

export default function Badge({ tone = 'brand', dot, size = 'md', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md font-medium ring-1 ring-inset',
        size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        tones[tone],
        className,
      )}
    >
      {dot && <span aria-hidden="true" className={cn('size-1.5 rounded-full', dotTones[tone])} />}
      {children}
    </span>
  );
}
