/**
 * Container.tsx — Агуулгыг хуудасны голд, тогтсон дээд өргөнтэйгөөр байрлуулна.
 *
 * Хоёр талдаа зайтай (утсан дээр 16px, том дэлгэцэнд 32px) тул текст дэлгэцийн
 * ирмэгт наалдахгүй. Бүх хэсгүүдийн агуулга энэ дотор байрладаг.
 */
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps {
  as?: ElementType;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
  children: ReactNode;
}

// Дээд өргөн: md ≈ 896px, lg ≈ 1152px, xl ≈ 1280px.
const sizes = { md: 'max-w-4xl', lg: 'max-w-6xl', xl: 'max-w-7xl' } as const;

/** Голлуулсан, хязгаарлагдмал өргөнтэй блок. */
export default function Container({ as: Component = 'div', size = 'xl', className, children }: ContainerProps) {
  return <Component className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>{children}</Component>;
}
