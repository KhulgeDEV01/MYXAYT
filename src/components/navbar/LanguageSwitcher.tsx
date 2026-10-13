import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { locales } from '../../i18n/types';
import type { Locale } from '../../i18n/types';
import { cn } from '../../utils/cn';
import { LocaleFlag } from './Flags';

const shortLabels: Record<Locale, string> = { mn: 'МН', en: 'EN' };

/** Flag dropdown for choosing the site language (WAI-ARIA menu with radio items). */
export default function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const menuId = useId();

  // Close on outside click; focus the current language when opening.
  useEffect(() => {
    if (!open) return;
    itemRefs.current[locales.indexOf(locale)]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open, locale]);

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (code: Locale) => {
    setLocale(code);
    close();
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = itemRefs.current.findIndex((el) => el === document.activeElement);
    const move = (index: number) => itemRefs.current[(index + locales.length) % locales.length]?.focus();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        move(current + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        move(current - 1);
        break;
      case 'Home':
        event.preventDefault();
        move(0);
        break;
      case 'End':
        event.preventDefault();
        move(locales.length - 1);
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        close(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`${t.language.label}: ${t.language.names[locale]}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          'inline-flex h-9 items-center gap-2 rounded-lg bg-surface pr-2 pl-2.5 text-xs font-semibold text-ink ring-1 ring-slate-200 transition-colors hover:ring-slate-300',
          open && 'ring-brand-500',
        )}
      >
        <LocaleFlag locale={locale} />
        <span className="hidden sm:inline">{shortLabels[locale]}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={cn('text-slate-400 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={t.language.label}
          onKeyDown={onMenuKeyDown}
          className="absolute right-0 z-50 mt-2 w-44 animate-slide-in rounded-xl bg-surface p-1.5 shadow-elevated ring-1 ring-slate-200"
        >
          {locales.map((code, index) => {
            const selected = code === locale;
            return (
              <button
                key={code}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                lang={code}
                tabIndex={-1}
                onClick={() => choose(code)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors focus:outline-none focus-visible:bg-slate-100 hover:bg-slate-100',
                  selected ? 'font-semibold text-ink' : 'text-slate-600',
                )}
              >
                <LocaleFlag locale={code} className="h-4 w-6" />
                <span className="flex-1">{t.language.names[code]}</span>
                {selected && <Check size={16} aria-hidden="true" className="text-brand-600 dark:text-brand-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
