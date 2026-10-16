/**
 * ThemeProvider.tsx — Гэгээлэг / харанхуй горимыг удирдах төв.
 *
 * Ажиллах зарчим:
 *  1. Хэрэглэгч горимоо өөрөө сонгосон бол түүнийг localStorage-д хадгалж, үргэлж тэрийг ашиглана.
 *  2. Сонгоогүй бол утас / компьютерийн системийн тохиргоог (харанхуй эсэх) дагана.
 *  3. Горимыг <html data-theme="dark"> шинжээр тэмдэглэдэг; index.css доторх өнгөнүүд
 *     энэ шинжээс хамаарч солигдоно.
 * Анхаар: index.html доторх жижиг скрипт нь React ачаалагдахаас өмнө ижил логикоор
 * горимыг тохируулдаг — ингэснээр хуудас нээгдэхэд цагаан "анивчилт" гарахгүй.
 */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

/** localStorage дахь түлхүүрийн нэр. */
const STORAGE_KEY = 'theme';
/** Утасны хөтчийн дээд хэсгийн (address bar) өнгө горим бүрт. */
const THEME_COLORS: Record<Theme, string> = { light: '#ffffff', dark: '#0e1528' };

/** Компонентуудад хүрэх утгууд: одоогийн горим, горим тохируулах, солих функцууд. */
export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Хэрэглэгчийн өмнө сонгосон горимыг уншина; сонгоогүй бол null. */
function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // Хадгалах сан ажиллахгүй үед системийн тохиргоог дагана.
  }
  return null;
}

/** Үйлдлийн системийн (Windows, iOS, Android…) одоогийн горим. */
function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Горимыг хуудсанд бодитоор хэрэгжүүлнэ: <html> шинж, хөтчийн өнгөний схем, address bar өнгө. */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme; // → <html data-theme="dark">
  root.style.colorScheme = theme; // Хөтчийн scrollbar, маягтын элементүүдийг ч тохируулна
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
}

/** Горимын мэдээллийг доторх бүх компонентод түгээгч. main.tsx-д аппыг ороож байрлана. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [userTheme, setUserTheme] = useState<Theme | null>(readStoredTheme); // Хэрэглэгчийн сонголт
  const [osTheme, setOsTheme] = useState<Theme>(systemTheme); // Системийн горим
  const theme = userTheme ?? osTheme; // Сонголт байвал түүнийг, үгүй бол системийнхийг

  // Системийн горим өөрчлөгдөхийг (жишээ нь орой автоматаар харанхуй болох) сонсоно.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setOsTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Горим өөрчлөгдөх бүрт хуудсанд хэрэгжүүлнэ.
  useEffect(() => applyTheme(theme), [theme]);

  // Горим сонгох: хэрэглэгчийн сонголтыг тохируулж, хадгална.
  const setTheme = useCallback((next: Theme) => {
    setUserTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Хадгалагдаагүй ч энэ удаагийн айлчлалд хүчинтэй.
    }
  }, []);

  // Гэгээлэг ↔ харанхуй хооронд солих (Navbar дахь сар/нар товч үүнийг дуудна).
  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
