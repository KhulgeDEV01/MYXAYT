import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Fades + slides content up the first time it scrolls into view. */
export default function Reveal({ as: Component = 'div', delay = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Component
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
