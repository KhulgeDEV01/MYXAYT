/**
 * format.ts — Тоо, үнэ, хувь, нэрийн эхний үсгийг форматлах туслах функцууд.
 */

/** Мянгатыг таслалаар тусгаарлах форматлагч (20000 → "20,000"). */
const numberFormatter = new Intl.NumberFormat('en-US');

/**
 * Тоог уншихад хялбар болгоно: 20000 → "20,000".
 * `decimals` өгвөл бутархай хэлбэрээр: formatNumber(4.85, 1) → "4.8".
 */
export function formatNumber(value: number, decimals = 0): string {
  if (decimals > 0) return value.toFixed(decimals);
  return numberFormatter.format(Math.round(value));
}

/** Үнийг төгрөгийн тэмдэгтэй болгоно: 49000 → "49,000₮". */
export function formatPrice(value: number): string {
  return `${numberFormatter.format(value)}₮`;
}

/** Санал тоог бүхэл хувь болгоно: toPercent(23, 34) → 68. Нийт 0 бол 0 буцаана. */
export function toPercent(part: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

/** Нэрээс эхний 2 үсгийг авна (аватарт): "Батболд Ганзориг" → "БГ". */
export function getInitials(name: string): string {
  return name
    .replace(/\./g, ' ') // "Б.Ганзориг" гэх мэт цэгтэй нэрийг ч зөв задлахын тулд
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
