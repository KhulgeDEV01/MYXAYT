/**
 * useTheme.ts — Гэгээлэг / харанхуй горим ашиглах хуком.
 *
 * Хэрэглээ:  const { theme, toggleTheme } = useTheme();
 *   theme         → 'light' эсвэл 'dark'
 *   toggleTheme() → горимыг эсрэгээр нь солино
 */
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue } from './ThemeProvider';

/** Одоогийн горим болон түүнийг өөрчлөх функцуудыг буцаана. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  // ThemeProvider-ийн гадна ашиглавал ойлгомжтой алдаа заана.
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}
