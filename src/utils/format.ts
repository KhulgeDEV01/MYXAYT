const numberFormatter = new Intl.NumberFormat('en-US');

/** 20000 → "20,000" (the grouping style used across Mongolian business documents). */
export function formatNumber(value: number, decimals = 0): string {
  if (decimals > 0) return value.toFixed(decimals);
  return numberFormatter.format(Math.round(value));
}

/** 49000 → "49,000₮" */
export function formatPrice(value: number): string {
  return `${numberFormatter.format(value)}₮`;
}

/** Converts raw vote counts to whole percentages. */
export function toPercent(part: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

/** "Батболд Ганзориг" → "БГ" */
export function getInitials(name: string): string {
  return name
    .replace(/\./g, ' ')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
