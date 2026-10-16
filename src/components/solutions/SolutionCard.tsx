/**
 * SolutionCard.tsx — Нэг шийдлийн карт: дүрс, гарчиг, тайлбар, ✓ давуу талууд.
 *
 * Өгөгдөл: data/solutions.ts.
 */
import { Check } from 'lucide-react';
import type { Solution } from '../../types/content';
import Card from '../ui/Card';

/** Байгууллагын нэг төрөлд зориулсан шийдлийн карт. */
export default function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon;
  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-navy-950 sm:size-10 text-white dark:bg-brand-600">
          <Icon size={20} aria-hidden="true" className="size-[18px] sm:size-5" />
        </span>
        <h3 className="text-base font-semibold sm:text-lg">{solution.title}</h3>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed sm:mt-4 text-slate-600 sm:text-base">{solution.description}</p>
      <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 sm:mt-5 sm:pt-5">
        {solution.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-ink-soft">
            <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
            <span className="min-w-0">{benefit}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
