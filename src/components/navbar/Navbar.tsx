/**
 * Navbar.tsx — Хуудасны дээд цэс (бүх хуудсанд дээр нь наалттай байна).
 *
 * Агуулга: лого, хуудсуудын холбоос (том дэлгэцэнд), горим солих товч, хэл сонгох,
 * "Нэвтрэх" / "Үнэгүй эхлэх" товчнууд, жижиг дэлгэцэнд ☰ цэсний товч.
 * Хуудсын хамгийн дээр тунгалаг, доош гүйлгэхэд цагаан (харанхуй) дэвсгэртэй болно.
 */
import { useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { mainNav } from '../../data/navigation';
import { routes } from '../../config/routes';
import { useScrolled } from '../../hooks/useScrolled';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

/** ☰ товч ба утасны цэсийг холбох id. */
const MOBILE_MENU_ID = 'mobile-navigation';

/** Сайтын дээд навигацийн цэс. */
export default function Navbar() {
  // 12px-ээс илүү доош гүйлгэсэн эсэх.
  const scrolled = useScrolled(12);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { locale, t } = useI18n();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Хуудас солигдох бүрт утасны цэсийг хаана.
  useEffect(closeMenu, [location.pathname, location.hash, closeMenu]);

  // Гүйлгэсэн эсвэл утасны цэс нээлттэй үед дэвсгэртэй (solid) болно.
  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        solid
          ? 'border-b border-slate-200/80 bg-surface/90 shadow-[0_1px_12px_rgb(16_26_53/0.04)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container>
        <nav aria-label={t.nav.mainAria} className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo />

          {/* Хуудсуудын холбоос — зөвхөн том дэлгэцэнд (lg: 1024px+) харагдана. */}
          <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {mainNav[locale].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-md px-2 py-2 text-sm font-medium whitespace-nowrap transition-colors xl:px-3',
                      isActive && !item.to.includes('#')
                        ? 'text-brand-700 dark:text-brand-300'
                        : 'text-slate-600 hover:bg-navy-50 hover:text-ink',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Баруун талын товчнууд. */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            {/* "Нэвтрэх" (зөвхөн маш том дэлгэцэнд) ба "Үнэгүй эхлэх" — утсан дээр нуугдаж, ☰ цэс дотор байрлана. */}
            <div className="hidden items-center gap-2 sm:flex">
              <div className="hidden xl:block">
                <Button to={routes.login} variant="ghost" size="sm">
                  {t.nav.login}
                </Button>
              </div>
              <Button to={routes.signup} size="sm" iconRight={ArrowRight}>
                {t.nav.startFree}
              </Button>
            </div>
            {/* ☰ / × товч — зөвхөн жижиг дэлгэцэнд. */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-ink-soft hover:bg-navy-50 lg:hidden"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </Container>

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
