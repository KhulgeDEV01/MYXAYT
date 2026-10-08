import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import Container from './Container';

type Tone = 'white' | 'muted' | 'dark';

const tones: Record<Tone, string> = {
  white: 'bg-white',
  muted: 'bg-slate-50 border-y border-slate-200/70',
  dark: 'bg-navy-950 text-navy-200',
};

interface SectionProps {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
}

/** Standard vertical rhythm + background tone for page sections. */
export default function Section({ id, tone = 'white', className, containerClassName, labelledBy, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative py-20 sm:py-24 lg:py-28', tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
