import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline-inverse';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { to?: never; href?: never };
type AsRouterLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'> & { to: string; href?: never };
type AsAnchor = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string; to?: never };

export type ButtonProps = AsButton | AsRouterLink | AsAnchor;

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[0_1px_2px_rgb(16_26_53/0.15),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-brand-700 active:bg-brand-800',
  secondary: 'bg-surface text-ink-soft ring-1 ring-inset ring-slate-300 hover:bg-slate-50 hover:ring-slate-400',
  ghost: 'text-ink-muted hover:bg-navy-50',
  inverse: 'bg-white text-navy-950 hover:bg-white/90',
  'outline-inverse': 'text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 hover:ring-white/50',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: Pick<BaseProps, 'variant' | 'size' | 'fullWidth' | 'className'>) {
  return cn(
    'group inline-flex shrink-0 items-center justify-center rounded-lg font-semibold whitespace-nowrap transition-colors duration-150',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
    'disabled:pointer-events-none disabled:opacity-60',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );
}

export default function Button(props: ButtonProps) {
  const { variant, size, iconLeft: IconLeft, iconRight: IconRight, fullWidth, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, fullWidth, className });
  const iconSize = size === 'sm' ? 16 : 18;

  const content = (
    <>
      {IconLeft && <IconLeft size={iconSize} aria-hidden="true" />}
      {children}
      {IconRight && (
        <IconRight
          size={iconSize}
          aria-hidden="true"
          className="transition-transform duration-150 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    const { to, ...anchorProps } = rest as AsRouterLink;
    return (
      <Link to={to} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AsAnchor)}>
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as AsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
