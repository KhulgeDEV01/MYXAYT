/**
 * ThemeToggle.tsx — Гэгээлэг / харанхуй горим солих товч (нар / сар дүрс).
 *
 * Дарахад горим солигдож, сонголт хадгалагдана (theme/ThemeProvider.tsx).
 * Нар ба сар дүрс хоёулаа байрлаж, нэг нь эргэж далдлагдан нөгөө нь гарч ирнэ.
 */
import { Moon, Sun } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { useTheme } from '../../theme/useTheme';
import { cn } from '../../utils/cn';

/** Нар / сар товч: гэгээлэг ↔ харанхуй горим солино. */
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
        'relative inline-flex size-10 items-center sm:size-9 justify-center overflow-hidden rounded-lg bg-surface text-slate-600 ring-1 ring-slate-200 transition-colors hover:text-ink',
        className,
      )}
    >
      {/* Гэгээлэг горимд харагдах нар. */}
      <Sun
        size={17}
        aria-hidden="true"
        className={cn('absolute transition-all duration-300', dark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100')}
      />
      {/* Харанхуй горимд харагдах сар. */}
      <Moon
        size={16}
        aria-hidden="true"
        className={cn('absolute transition-all duration-300', dark ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0')}
      />
    </button>
  );
}
