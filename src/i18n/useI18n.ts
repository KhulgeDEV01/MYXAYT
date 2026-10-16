/**
 * useI18n.ts — Орчуулга ашиглах хуком.
 *
 * Хэрэглээ:  const { t, locale, setLocale } = useI18n();
 *   t.nav.login   → одоогийн хэл дээрх "Нэвтрэх" / "Log in" текст
 *   locale        → 'mn' эсвэл 'en'
 *   setLocale('en') → хэлийг англи болгоно
 */
import { useContext } from 'react';
import { LocaleContext } from './LocaleProvider';
import type { LocaleContextValue } from './LocaleProvider';

/** Одоогийн хэл, түүний орчуулгын толь `t`, хэл солих функцийг буцаана. */
export function useI18n(): LocaleContextValue {
  const context = useContext(LocaleContext);
  // LocaleProvider-ийн гадна ашиглавал утга байхгүй тул ойлгомжтой алдаа заана.
  if (!context) throw new Error('useI18n must be used inside <LocaleProvider>');
  return context;
}
