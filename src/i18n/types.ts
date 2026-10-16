/**
 * types.ts — Сайтын дэмждэг хэлнүүд ба хэлтэй холбоотой төрлүүд.
 *
 * Шинэ хэл нэмэх бол: `locales` жагсаалтад кодыг нь нэмж (жишээ нь 'ru'),
 * dictionaries/ хавтсанд тухайн хэлний орчуулгын файлыг үүсгэнэ.
 */

/** Дэмжигдсэн хэлнүүдийн код: mn — Монгол, en — Англи. */
export const locales = ['mn', 'en'] as const;

/** Хэлний код ('mn' эсвэл 'en'). */
export type Locale = (typeof locales)[number];

/** Хэрэглэгч хэл сонгоогүй үед ашиглах үндсэн хэл. */
export const defaultLocale: Locale = 'mn';

/**
 * Хэл бүрээр нэг утгатай өгөгдөл. Жишээ: `{ mn: 'Үнэ', en: 'Pricing' }`.
 * Ирээдүйд CMS / backend-ээс ирэх өгөгдөл ч энэ хэлбэртэй байна.
 */
export type Localized<T> = Record<Locale, T>;

/** Өгөгдсөн утга нь дэмжигдсэн хэлний код мөн эсэхийг шалгана (localStorage-аас уншихад). */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}
