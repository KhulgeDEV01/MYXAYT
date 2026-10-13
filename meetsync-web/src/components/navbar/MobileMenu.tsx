import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { mainNav } from '../../data/navigation';
import { routes } from '../../config/routes';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

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
      className={cn('h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white lg:hidden', open && 'animate-slide-in')}
    >
      <nav aria-label="Гар утасны цэс" className="px-4 pt-4 pb-8 sm:px-6">
        <ul className="divide-y divide-slate-100">
          {mainNav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="flex items-center justify-between py-4 text-base font-medium text-navy-950"
              >
                {item.label}
                <ChevronRight size={18} aria-hidden="true" className="text-slate-400" />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-3">
          <Button to={routes.signup} size="lg" iconRight={ArrowRight} fullWidth>
            Үнэгүй эхлэх
          </Button>
          <Button to={routes.login} variant="secondary" size="lg" fullWidth>
            Нэвтрэх
          </Button>
        </div>
      </nav>
    </div>
  );
}
