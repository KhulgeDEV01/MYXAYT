import { useContext } from 'react';
import { LocaleContext } from './LocaleProvider';
import type { LocaleContextValue } from './LocaleProvider';

/** Current locale, its UI dictionary `t`, and a setter. */
export function useI18n(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useI18n must be used inside <LocaleProvider>');
  return context;
}
