import type { ReactNode } from 'react';
import Container from '../ui/Container';

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}

/** Intro band used at the top of inner pages. */
export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-slate-200/70 bg-slate-50 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className="relative">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">{eyebrow}</p>
          <h1 className="text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-slate-600">{description}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
