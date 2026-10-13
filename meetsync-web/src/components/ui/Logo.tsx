import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { cn } from '../../utils/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-8', className)}>
      <rect width="32" height="32" rx="7" className="fill-brand-600" />
      <rect x="8" y="17" width="4" height="7" rx="1" fill="#fff" />
      <rect x="14" y="12" width="4" height="12" rx="1" fill="#fff" />
      <rect x="20" y="8" width="4" height="16" rx="1" className="fill-accent-300" />
    </svg>
  );
}

export default function Logo({ tone = 'dark', className }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label={`${siteConfig.name} — нүүр хуудас`}
      className={cn('inline-flex items-center gap-2.5 rounded-md', className)}
    >
      <LogoMark />
      <span className={cn('text-lg font-bold tracking-tight', tone === 'dark' ? 'text-navy-950' : 'text-white')}>
        {siteConfig.name}
      </span>
    </Link>
  );
}
