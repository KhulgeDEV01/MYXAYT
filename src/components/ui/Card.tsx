/**
 * Card.tsx — Дугуй булантай, хүрээ / сүүдэртэй карт.
 *
 * Хэрэглээ: <Card variant="muted" padding="lg" interactive>…</Card>
 * `as` — ямар HTML элемент болохыг сонгоно (article, figure, li…).
 */
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

/** Загвар: default — цагаан + сүүдэр, muted — саарал дэвсгэр, dark — харанхуй, outline — зөвхөн хүрээ. */
type CardVariant = 'default' | 'muted' | 'dark' | 'outline';

// Загвар бүрийн өнгө.
const variants: Record<CardVariant, string> = {
  default: 'bg-surface ring-1 ring-slate-200/80 shadow-soft',
  muted: 'bg-slate-50 ring-1 ring-slate-200/70',
  dark: 'bg-navy-900 ring-1 ring-white/10 text-navy-100',
  outline: 'bg-surface ring-1 ring-slate-200',
};

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: CardVariant;
  /** true бол хулгана дээр нь очиход бага зэрэг дээш өргөгдөж, сүүдэр нь томорно. */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

// Дотор зай: утсан дээр бага, том дэлгэцэнд их (sm: — 640px-ээс дээш).
const paddings = { none: '', sm: 'p-4', md: 'p-5 sm:p-6', lg: 'p-5 sm:p-8' } as const;

/** Агуулгыг хүрээлэх карт. */
export default function Card({
  as: Component = 'div',
  variant = 'default',
  interactive,
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-xl',
        variants[variant],
        paddings[padding],
        interactive &&
          'transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card motion-reduce:hover:translate-y-0',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
