import { ArrowRight } from 'lucide-react';
import { productWorkflow, workflowActorLabels } from '../../data/workflow';
import type { WorkflowActor } from '../../types/content';
import { cn } from '../../utils/cn';

const actorStyles: Record<WorkflowActor, { chip: string; dot: string }> = {
  organizer: { chip: 'bg-brand-600 text-white', dot: 'bg-brand-600' },
  participant: { chip: 'bg-white text-navy-900 ring-1 ring-slate-300', dot: 'bg-white ring-1 ring-slate-400' },
  system: { chip: 'bg-accent-300/30 text-navy-900 ring-1 ring-accent-500/30', dot: 'bg-accent-400' },
  organization: { chip: 'bg-navy-950 text-white', dot: 'bg-navy-950' },
};

/** End-to-end product workflow, colour-coded by who performs each step. */
export default function ProductFlow({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200 sm:p-8', className)}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h3 className="text-base font-semibold">Хурлын бүтэн мөчлөг</h3>
        <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Тайлбар">
          {(Object.keys(workflowActorLabels) as WorkflowActor[]).map((actor) => (
            <li key={actor} className="flex items-center gap-2 text-xs text-slate-600">
              <span aria-hidden="true" className={cn('size-2.5 rounded-sm', actorStyles[actor].dot)} />
              {workflowActorLabels[actor]}
            </li>
          ))}
        </ul>
      </div>

      <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-3">
        {productWorkflow.map((step, index) => {
          const Icon = step.icon;
          const last = index === productWorkflow.length - 1;
          return (
            <li key={step.id} className="flex items-center gap-2">
              <span
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                  actorStyles[step.actor].chip,
                )}
              >
                <Icon size={16} aria-hidden="true" className="shrink-0" />
                <span className="sr-only">{workflowActorLabels[step.actor]}: </span>
                {step.title}
              </span>
              {!last && <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-slate-400" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
