import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'light',
  as: Heading = 'h2',
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs font-semibold tracking-[0.14em] uppercase',
            dark ? 'text-accent-300' : 'text-brand-600 dark:text-brand-400',
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          'text-3xl leading-tight font-semibold text-balance sm:text-4xl',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed text-pretty sm:text-lg', dark ? 'text-navy-200' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </div>
  );
}
