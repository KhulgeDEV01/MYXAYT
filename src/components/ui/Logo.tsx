/**
 * Logo.tsx — МҮХАҮТ-ийн лого (дүрс + нэр).
 *
 * Дарахад нүүр хуудас руу буцна. Лого солих бол доорх LogoMark доторх SVG-г
 * өөрийн лого файлаар (жишээ нь <img src="/logo.svg" />) сольж болно.
 */
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';

/** tone: dark — гэгээлэг дэвсгэр дээр, light — харанхуй дэвсгэр (Footer) дээр. */
interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

/** Зөвхөн дүрс хэсэг: цэнхэр дөрвөлжин дотор өсөх 3 багана (санал хураалтын график). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8', className)}>
      <rect width="32" height="32" rx="7" className="fill-brand-600" />
      <rect x="8" y="17" width="4" height="7" rx="1" fill="#fff" />
      <rect x="14" y="12" width="4" height="12" rx="1" fill="#fff" />
      <rect x="20" y="8" width="4" height="16" rx="1" className="fill-accent-300" />
    </svg>
  );
}

/** Дүрс + брэндийн нэр, нүүр хуудас руу холбоостой. */
export default function Logo({ tone = 'dark', className }: LogoProps) {
  const { t } = useI18n();
  return (
    <Link
      to="/"
      aria-label={t.common.homeAria(siteConfig.name)}
      className={cn('inline-flex shrink-0 items-center gap-2.5 rounded-md', className)}
    >
      <LogoMark />
      <span className={cn('text-lg font-bold tracking-tight', tone === 'dark' ? 'text-ink' : 'text-white')}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
