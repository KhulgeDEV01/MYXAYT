import { CircleCheck, Lock } from 'lucide-react';
import type { LiveOption } from '../../hooks/useLiveVotes';
import type { VoteTone } from '../../types/domain';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';
import ProgressBar from '../ui/ProgressBar';

interface VotePanelProps {
  question: string;
  options: LiveOption[];
  total: number;
  eligible: number;
  myVote: string | null;
  onVote: (optionId: string) => void;
}

const selectedStyles: Record<VoteTone, string> = {
  positive: 'bg-success-500 text-white ring-success-500',
  negative: 'bg-danger-500 text-white ring-danger-500',
  neutral: 'bg-slate-500 text-white ring-slate-500',
};

export default function VotePanel({ question, options, total, eligible, myVote, onVote }: VotePanelProps) {
  const { t } = useI18n();
  const v = t.vote;

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <Lock size={12} aria-hidden="true" /> {v.secret}
        </span>
        <span className="text-[11px] text-slate-500">{v.threshold}</span>
      </div>
      <p id="showcase-question" className="mt-2 font-semibold text-ink">
        {question}
      </p>

      <div role="group" aria-labelledby="showcase-question" className="mt-4 grid gap-2">
        {options.map((option) => {
          const selected = myVote === option.id;
          return (
            <button
              key={option.id}
              type="button"
              disabled={myVote !== null}
              aria-pressed={selected}
              onClick={() => onVote(option.id)}
              className={cn(
                'flex h-11 items-center justify-between rounded-lg px-4 text-sm font-semibold ring-1 transition-colors disabled:cursor-default',
                selected
                  ? selectedStyles[option.tone]
                  : 'bg-surface text-ink-soft ring-slate-300 enabled:hover:bg-slate-50 enabled:hover:ring-brand-500',
                myVote && !selected && 'opacity-60',
              )}
            >
              {option.label}
              {selected && <CircleCheck size={18} aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-3">
        {options.map((option) => (
          <div key={option.id}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-slate-600">{option.label}</span>
              <span className="font-semibold text-ink tabular-nums">
                {option.percent}% <span className="font-normal text-slate-500">({option.votes})</span>
              </span>
            </div>
            <ProgressBar
              value={option.percent}
              tone={option.tone}
              marker={option.tone === 'positive' ? 50 : undefined}
              label={`${option.label}: ${option.percent}%`}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
        <span className="font-semibold text-ink">
          <span className="tabular-nums">{total}</span> {v.votedCount}
        </span>
        <span className="text-xs text-slate-500 tabular-nums">
          {eligible - total > 0 ? v.waiting(eligible - total) : v.allVoted}
        </span>
      </div>
      {myVote && (
        <p role="status" className="mt-3 rounded-md bg-success-50 px-3 py-2 text-xs text-success-700">
          {v.recorded}
        </p>
      )}
    </div>
  );
}
