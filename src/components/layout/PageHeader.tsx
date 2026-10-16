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
    <header className="relative overflow-hidden border-b border-slate-200/70 bg-slate-50 pt-24 pb-12 sm:pt-40 sm:pb-20">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <Container className="relative">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-3 text-xs font-semibold sm:mb-4 tracking-[0.14em] text-brand-600 dark:text-brand-400 uppercase">{eyebrow}</p>
          <h1 className="text-[1.75rem] leading-[1.15] font-semibold text-balance sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed sm:mt-5 sm:text-lg text-pretty text-slate-600">{description}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </header>
  );
}
