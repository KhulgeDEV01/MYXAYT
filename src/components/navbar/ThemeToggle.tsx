import { Moon, Sun } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { useTheme } from '../../theme/useTheme';
import { cn } from '../../utils/cn';

/** Sun / moon button that switches between light and dark mode. */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? t.theme.toLight : t.theme.toDark}
      title={dark ? t.theme.toLight : t.theme.toDark}
      className={cn(
        'relative inline-flex size-9 items-center justify-center overflow-hidden rounded-lg bg-surface text-slate-600 ring-1 ring-slate-200 transition-colors hover:text-ink',
        className,
      )}
    >
      <Sun
        size={17}
        aria-hidden="true"
        className={cn('absolute transition-all duration-300', dark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100')}
      />
      <Moon
        size={16}
        aria-hidden="true"
        className={cn('absolute transition-all duration-300', dark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0')}
      />
    </button>
  );
}
