/**
 * Avatar.tsx — Хүний нэрийн эхний үсгүүдтэй дугуй зураг (жишээ нь "БГ").
 *
 * Нэр бүрт тогтмол нэг өнгө оноогддог (нэр ижил бол өнгө нь үргэлж ижил).
 */
import { cn } from '../../utils/cn';
import { getInitials } from '../../utils/format';

// Аватарт ашиглах өнгөнүүдийн багц.
const palette = [
  'bg-brand-100 text-brand-800',
  'bg-accent-300/40 text-navy-900',
  'bg-navy-100 text-navy-800',
  'bg-success-50 text-success-700',
  'bg-warning-50 text-warning-700',
  'bg-slate-200 text-slate-700',
];

/** Нэрээс тоон "хэш" бодож, түүгээр өнгө сонгоно — ингэснээр нэг хүн үргэлж ижил өнгөтэй. */
function colorFor(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return palette[hash % palette.length];
}

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  /** true бол дэлгэц уншигчаас нууна (хажууд нь нэр аль хэдийн бичигдсэн үед давхар уншуулахгүй). */
  decorative?: boolean;
}

// Хэмжээний сонголтууд: xs (24px) → lg (56px).
const sizes = {
  xs: 'size-6 text-[10px]',
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-14 text-base',
} as const;

/** Нэрийн эхний үсэгтэй өнгөт дугуй. */
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
