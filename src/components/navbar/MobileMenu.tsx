import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { mainNav } from '../../data/navigation';
import { routes } from '../../config/routes';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { locale, t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open, onClose]);

  return (
    <div
      id={id}
      ref={panelRef}
      hidden={!open}
      className={cn('h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-surface lg:hidden', open && 'animate-slide-in')}
    >
      <nav aria-label={t.nav.mobileAria} className="px-4 pt-4 pb-8 sm:px-6">
        <ul className="divide-y divide-slate-100">
          {mainNav[locale].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between py-4 text-base font-medium',
                    isActive && !item.to.includes('#') ? 'text-brand-700 dark:text-brand-300' : 'text-ink',
                  )
                }
              >
                {item.label}
                <ChevronRight size={18} aria-hidden="true" className="text-slate-400" />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3">
          <Button to={routes.signup} size="lg" iconRight={ArrowRight} fullWidth>
            {t.nav.startFree}
          </Button>
          <Button to={routes.login} variant="secondary" size="lg" fullWidth>
            {t.nav.login}
          </Button>
        </div>
      </nav>
    </div>
  );
}
