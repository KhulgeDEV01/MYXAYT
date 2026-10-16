/**
 * Flags.tsx — Хэл сонгох цэсний тугнууд (SVG зураг).
 *
 * Зургийн файл татахгүй, кодоор зурдаг тул хурдан ачаалж, ямар ч хэмжээнд тод харагдана.
 */
import { useId } from 'react';
import type { Locale } from '../../i18n/types';
import { cn } from '../../utils/cn';

interface FlagProps {
  className?: string;
}

/** Монгол Улсын туг (улаан–цэнхэр–улаан, хялбаршуулсан алтан шар Соёмботой). */
export function MongoliaFlag({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 30" aria-hidden="true" className={className}>
      <rect width="20" height="30" fill="#DA2032" />
      <rect x="20" width="20" height="30" fill="#015197" />
      <rect x="40" width="20" height="30" fill="#DA2032" />
      <g fill="#FFD900">
        <path d="M10 3.2 8.6 6.6h2.8z" />
        <circle cx="10" cy="8.8" r="1.8" />
        <path d="M7.2 11.2a2.8 2 0 0 0 5.6 0 2.8 1.2 0 0 1-5.6 0z" />
        <path d="M7.6 14.2h4.8L10 16.2z" />
        <rect x="7.6" y="16.8" width="4.8" height="0.9" />
        <circle cx="10" cy="20.3" r="2.1" />
        <rect x="7.6" y="22.9" width="4.8" height="0.9" />
        <path d="M7.6 26.4h4.8L10 24.4z" />
        <rect x="5.8" y="14.2" width="1.1" height="12.2" />
        <rect x="13.1" y="14.2" width="1.1" height="12.2" />
      </g>
      <circle cx="10" cy="20.3" r="0.8" fill="#DA2032" />
    </svg>
  );
}

/** Их Британийн туг — англи хэлийг илэрхийлнэ. */
export function UkFlag({ className }: FlagProps) {
  // SVG доторх clipPath-ийн id давхцахгүйн тулд давтагдашгүй id (хуудсанд хэд хэдэн туг байж болно).
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 60 30" aria-hidden="true" className={className}>
      <clipPath id={`${id}-s`}>
        <path d="M0 0v30h60V0z" />
      </clipPath>
      <clipPath id={`${id}-t`}>
        <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
      </clipPath>
      <g clipPath={`url(#${id}-s)`}>
        <path d="M0 0v30h60V0z" fill="#012169" />
        <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0l60 30m0-30L0 30" clipPath={`url(#${id}-t)`} stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/** Хэлний кодоор (mn / en) тохирох тугийг дугуй булантай жижиг хүрээнд харуулна. */
export function LocaleFlag({ locale, className }: { locale: Locale; className?: string }) {
  const Flag = locale === 'mn' ? MongoliaFlag : UkFlag;
  return (
    <span
      className={cn(
        'inline-flex h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] shadow-[0_0_0_1px_rgb(0_0_0/0.1)]',
        className,
      )}
    >
      <Flag className="h-full w-full" />
    </span>
  );
}
