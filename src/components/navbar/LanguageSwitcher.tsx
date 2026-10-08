import { Globe } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { locales } from '../../i18n/types';
import type { Locale } from '../../i18n/types';
import { cn } from '../../utils/cn';

const shortLabels: Record<Locale, string> = { mn: 'МН', en: 'EN' };

/** Segmented МН / EN toggle. Each button is announced by its language's own name. */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.language.label}
      className={cn('inline-flex items-center rounded-lg bg-white p-0.5 ring-1 ring-slate-200', className)}
    >
      <Globe size={14} aria-hidden="true" className="mx-1.5 text-slate-400" />
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            aria-label={t.language.names[code]}
            onClick={() => setLocale(code)}
            className={cn(
              'rounded-md px-2 py-1 text-xs font-semibold transition-colors',
              active ? 'bg-navy-950 text-white' : 'text-slate-600 hover:text-navy-950',
            )}
          >
            {shortLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
