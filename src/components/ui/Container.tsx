import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps {
  as?: ElementType;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
  children: ReactNode;
}

const sizes = { md: 'max-w-4xl', lg: 'max-w-6xl', xl: 'max-w-7xl' } as const;

export default function Container({ as: Component = 'div', size = 'xl', className, children }: ContainerProps) {
  return <Component className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}>{children}</Component>;
}
