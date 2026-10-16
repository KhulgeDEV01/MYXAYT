/**
 * Alert.tsx — Мэдэгдлийн хайрцаг (мэдээлэл / амжилт / анхааруулга).
 *
 * Хэрэглээ: <Alert tone="success">Амжилттай илгээгдлээ</Alert>
 * role="status" — дэлгэц уншигч программ гарч ирсэн мэдэгдлийг автоматаар уншина.
 */
import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Мэдэгдлийн төрөл: info — цэнхэр, success — ногоон, warning — улбар шар. */
type Tone = 'info' | 'success' | 'warning';

// Төрөл бүрийн өнгө.
const styles: Record<Tone, string> = {
  info: 'bg-brand-50 text-ink-soft ring-brand-200',
  success: 'bg-success-50 text-success-700 ring-success-500/25',
  warning: 'bg-warning-50 text-warning-700 ring-warning-500/30',
};
// Төрөл бүрийн дүрс.
const icons = { info: Info, success: CircleCheck, warning: CircleAlert };

/** Дүрс + текст бүхий өнгөт мэдэгдэл. */
export default function Alert({ tone = 'info', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  const Icon = icons[tone];
  return (
    <div role="status" className={cn('flex gap-3 rounded-lg p-4 text-sm leading-relaxed ring-1 ring-inset', styles[tone], className)}>
      <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
