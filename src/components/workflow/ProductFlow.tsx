import { ArrowRight } from 'lucide-react';
import { productWorkflow, workflowActorLabels } from '../../data/workflow';
import type { WorkflowActor } from '../../types/content';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';

const actorStyles: Record<WorkflowActor, { chip: string; dot: string }> = {
  organizer: { chip: 'bg-brand-600 text-white', dot: 'bg-brand-600' },
  participant: { chip: 'bg-surface text-ink-soft ring-1 ring-slate-300', dot: 'bg-surface ring-1 ring-slate-400' },
  system: { chip: 'bg-accent-300/30 text-ink-soft ring-1 ring-accent-500/30', dot: 'bg-accent-400' },
  organization: { chip: 'bg-ink text-surface', dot: 'bg-ink' },
};

/** End-to-end product workflow, colour-coded by who performs each step. */
export default function ProductFlow({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const labels = workflowActorLabels[locale];
  const steps = productWorkflow[locale];

  return (
    <div className={cn('rounded-xl bg-surface p-5 shadow-soft ring-1 ring-slate-200 sm:p-8', className)}>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-4 md:items-center">
        <h3 className="text-base font-semibold">{t.workflow.title}</h3>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 sm:gap-x-5 sm:gap-y-2" aria-label={t.workflow.legend}>
          {(Object.keys(labels) as WorkflowActor[]).map((actor) => (
            <li key={actor} className="flex items-center gap-2 text-xs text-slate-600">
              <span aria-hidden="true" className={cn('size-2.5 rounded-sm', actorStyles[actor].dot)} />
              {labels[actor]}
            </li>
          ))}
        </ul>
      </div>

      {/* Phones: one swipeable row (right edge fades to hint at more). md+: wrapped flow. */}
      <ol
        tabIndex={0}
        aria-label={t.workflow.title}
        className="-mx-5 mt-5 flex snap-x snap-mandatory scroll-px-5 items-center gap-2 overflow-x-auto px-5 pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-6 md:flex-wrap md:gap-y-3 md:overflow-visible md:px-0 md:pb-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={step.id} className="flex shrink-0 snap-start items-center gap-2">
              <span className={cn('inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium whitespace-nowrap sm:text-sm', actorStyles[step.actor].chip)}>
                <Icon size={16} aria-hidden="true" className="shrink-0" />
                <span className="sr-only">{labels[step.actor]}: </span>
                {step.title}
              </span>
              {index < steps.length - 1 && <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-slate-400" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
