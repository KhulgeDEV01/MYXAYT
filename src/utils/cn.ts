/**
 * cn.ts — CSS class нэрсийг нэгтгэх туслах функц.
 *
 * Нөхцөлөөс хамаарч class нэмэхэд хэрэглэнэ:
 *   cn('rounded-lg p-4', isActive && 'bg-blue-600', className)
 *   → isActive үнэн бол 'rounded-lg p-4 bg-blue-600 …', худал бол 'rounded-lg p-4 …'
 * false / null / undefined утгуудыг автоматаар алгасна.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
