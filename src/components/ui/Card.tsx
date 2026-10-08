import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type CardVariant = 'default' | 'muted' | 'dark' | 'outline';

const variants: Record<CardVariant, string> = {
  default: 'bg-white ring-1 ring-slate-200/80 shadow-soft',
  muted: 'bg-slate-50 ring-1 ring-slate-200/70',
  dark: 'bg-navy-900 ring-1 ring-white/10 text-navy-100',
  outline: 'bg-white ring-1 ring-slate-200',
};

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: CardVariant;
  /** Adds the subtle lift-on-hover interaction. */
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' } as const;

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
