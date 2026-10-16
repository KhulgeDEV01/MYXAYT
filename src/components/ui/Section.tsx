/**
 * Section.tsx — Хуудасны нэг том хэсэг (дээд доод зай + дэвсгэр өнгө).
 *
 * Бүх хэсгүүд ижил зайтай, жигд харагдахын тулд үүнийг ашигладаг.
 * Хэрэглээ: <Section id="pricing" tone="muted" labelledBy="pricing-title">…</Section>
 */
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import Container from './Container';

/** Дэвсгэр: white — үндсэн, muted — цайвар саарал, dark — харанхуй. */
type Tone = 'white' | 'muted' | 'dark';

const tones: Record<Tone, string> = {
  white: 'bg-surface',
  muted: 'bg-slate-50 border-y border-slate-200/70',
  dark: 'bg-deep text-navy-200',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  /** Хэсгийн гарчгийн id — дэлгэц уншигч хэсгийг гарчгаар нь нэрлэнэ. */
  labelledBy?: string;
  children: ReactNode;
}

/** Дээд доод зайтай, дэвсгэр өнгөтэй хуудасны хэсэг; доторх агуулгыг Container-т байрлуулна. */
export default function Section({ id, tone = 'white', className, containerClassName, labelledBy, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative py-16 sm:py-24 lg:py-28', tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
