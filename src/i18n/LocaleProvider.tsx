/**
 * LocaleProvider.tsx — Сайтын хэлийг (МН / EN) удирдах төв.
 *
 * Хэрэглэгчийн сонгосон хэлийг хадгалж, тухайн хэлний орчуулгын толь бичгийг (`t`)
 * бүх компонентод хүргэнэ. Сонголтыг хөтчийн localStorage-д хадгалдаг тул
 * дараагийн удаа сайт руу ороход сүүлд сонгосон хэл нь хэвээр байна.
 * Компонентуудаас `useI18n()` хуком ашиглан энэ мэдээллийг авна.
 */
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { dictionaries } from './dictionaries';
import type { Dictionary } from './dictionaries';
import { defaultLocale, isLocale } from './types';
import type { Locale } from './types';

/** localStorage дахь түлхүүрийн нэр. */
const STORAGE_KEY = 'locale';

/** Компонентуудад хүрэх утгууд: одоогийн хэл, хэл солих функц, орчуулгын толь `t`. */
export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Өмнө хадгалсан хэлийг уншина; байхгүй бол үндсэн хэл (mn)-ийг буцаана. */
function readStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Хувийн (private) горим эсвэл хаагдсан cookie үед хадгалах сан ажиллахгүй — үндсэн хэлээр үргэлжилнэ.
  }
  return defaultLocale;
}

/** Хэлний мэдээллийг доторх бүх компонентод түгээгч. main.tsx-д аппыг ороож байрлана. */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  // Хэл солих: шинэ хэлийг идэвхжүүлээд, дараагийн айлчлалд зориулж хадгална.
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Хадгалагдаагүй ч энэ удаагийн айлчлалд сонголт хүчинтэй хэвээр.
    }
  }, []);

  // <html lang="…"> шинжийг шинэчилнэ — дэлгэц уншигч программ, хайлтын системд хэрэгтэй.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // useMemo — хэл өөрчлөгдөөгүй бол дахин тооцоолохгүй (гүйцэтгэлийг сайжруулна).
  const value = useMemo(() => ({ locale, setLocale, t: dictionaries[locale] }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
