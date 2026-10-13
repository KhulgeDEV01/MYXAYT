import { Check } from 'lucide-react';
import type { Solution } from '../../types/content';
import Card from '../ui/Card';

export default function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon;
  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-lg bg-navy-950 text-white dark:bg-brand-600">
          <Icon size={20} aria-hidden="true" />
        </span>
        <h3 className="text-lg font-semibold">{solution.title}</h3>
      </div>
      <p className="mt-4 flex-1 leading-relaxed text-slate-600">{solution.description}</p>
      <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
        {solution.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-ink-soft">
            <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
            {benefit}
          </li>
        ))}
      </ul>
    </Card>
  );
}
