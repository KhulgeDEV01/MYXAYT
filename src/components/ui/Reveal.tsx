/**
 * Reveal.tsx — Гүйлгэхэд агуулга зөөлөн "гарч ирэх" анимэйшн.
 *
 * Доторх агуулга дэлгэцэнд анх харагдах үед доороос дээш гулсаж, тодорч гарна.
 * Хэрэглээ: <Reveal delay={100}>…</Reveal>  (delay — хойшлуулах хугацаа, мс)
 * Анимэйшний CSS нь index.css доторх `.reveal` / `.is-visible` класст байна.
 */
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../utils/cn';

interface RevealProps {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}

/** Дэлгэцэнд анх орж ирэхэд агуулгыг тодруулж, дээш гулсуулна. */
export default function Reveal({ as: Component = 'div', delay = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Component
      ref={ref}
      className={cn('reveal', inView && 'is-visible', className)}
      // Хойшлуулалтыг CSS хувьсагчаар дамжуулна — картуудыг дараалан гаргахад хэрэглэнэ.
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  );
}
