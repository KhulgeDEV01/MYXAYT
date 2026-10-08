import { cn } from '../../utils/cn';
import { getInitials } from '../../utils/format';

const palette = [
  'bg-brand-100 text-brand-800',
  'bg-accent-300/40 text-navy-900',
  'bg-navy-100 text-navy-800',
  'bg-success-50 text-success-700',
  'bg-warning-50 text-warning-700',
  'bg-slate-200 text-slate-700',
];

function colorFor(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return palette[hash % palette.length];
}

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  /** Hide from assistive tech when the name is already shown next to it. */
  decorative?: boolean;
}

const sizes = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-base',
} as const;

export default function Avatar({ name, size = 'sm', className, decorative = true }: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold select-none',
        sizes[size],
        colorFor(name),
        className,
      )}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
    >
      {getInitials(name)}
    </span>
  );
}
