export const locales = ['mn', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'mn';

/** A value that exists once per supported language (the shape a CMS would return). */
export type Localized<T> = Record<Locale, T>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
