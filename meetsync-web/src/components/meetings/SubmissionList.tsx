import { ChevronUp } from 'lucide-react';
import type { Submission, SubmissionStatus } from '../../types/domain';
import Badge from '../ui/Badge';

const statusLabels: Record<SubmissionStatus, { label: string; tone: 'neutral' | 'brand' | 'success' | 'warning' }> = {
  pending: { label: 'Хүлээгдэж буй', tone: 'neutral' },
  discussing: { label: 'Хэлэлцэж байна', tone: 'brand' },
  answered: { label: 'Хариулсан', tone: 'success' },
  resolved: { label: 'Шийдвэрлэсэн', tone: 'success' },
};

interface SubmissionListProps {
  items: Submission[];
  showVotes?: boolean;
}

export default function SubmissionList({ items, showVotes = true }: SubmissionListProps) {
  const sorted = [...items].sort((a, b) => b.upvotes - a.upvotes);
  return (
    <ul className="space-y-2.5 pt-4">
      {sorted.map((item) => {
        const status = statusLabels[item.status];
        return (
          <li key={item.id} className="flex gap-3 rounded-lg p-3 ring-1 ring-slate-200">
            {showVotes && (
              <span className="flex w-10 shrink-0 flex-col items-center justify-center rounded-md bg-slate-50 py-1 text-navy-900 ring-1 ring-slate-200">
                <ChevronUp size={14} aria-hidden="true" />
                <span className="text-xs font-semibold tabular-nums">{item.upvotes}</span>
                <span className="sr-only">дэмжлэг</span>
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug text-navy-950">{item.body}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span>{item.authorName}</span>
                <span aria-hidden="true">·</span>
                <span>{item.createdAt}</span>
                <Badge tone={status.tone} size="sm" className="ml-auto">
                  {status.label}
                </Badge>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
