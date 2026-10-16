/**
 * SectionHeading.tsx — Хэсгийн гарчгийн блок: жижиг дээд шошго + том гарчиг + тайлбар.
 *
 * Хэрэглээ: <SectionHeading eyebrow="ҮНЭ" title="…" description="…" align="center" />
 */
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  id?: string;
  /** Гарчгийн дээрх жижиг том үсэгтэй шошго (жишээ нь "БОЛОМЖУУД"). */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** dark — харанхуй дэвсгэр дээр цагаан текстээр. */
  tone?: 'light' | 'dark';
  /** Гарчгийн HTML түвшин (анхдагч h2). Хуудасны үндсэн гарчиг бол 'h1'. */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

/** Хэсгийн гарчиг, тайлбар. */
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
          'text-2xl leading-tight font-semibold text-balance sm:text-4xl',
          dark ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className={cn('mt-3 text-[15px] leading-relaxed text-pretty sm:mt-4 sm:text-lg', dark ? 'text-navy-200' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </div>
  );
}
