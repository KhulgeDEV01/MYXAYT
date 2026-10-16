/**
 * SubmissionList.tsx — Оролцогчдын илгээсэн асуулт / санал / хүсэлтийн жагсаалт.
 *
 * Хамгийн олон дэмжлэг авсан нь дээрээ эрэмбэлэгдэнэ. Мөр бүрт зохиогч, цаг,
 * төлөв (хүлээгдэж буй / хэлэлцэж буй / хариулсан) харагдана.
 */
import { ChevronUp } from 'lucide-react';
import type { Submission, SubmissionStatus } from '../../types/domain';
import { useI18n } from '../../i18n/useI18n';
import Badge from '../ui/Badge';

/** Төлөв бүрийн шошгоны өнгө. */
const statusTones: Record<SubmissionStatus, 'neutral' | 'brand' | 'success'> = {
  pending: 'neutral',
  discussing: 'brand',
  answered: 'success',
  resolved: 'success',
};

interface SubmissionListProps {
  items: Submission[];
  /** Дэмжлэгийн тоог (▲ 18) харуулах эсэх — хүсэлтэд харуулахгүй. */
  showVotes?: boolean;
}

/** Дэмжлэгээр эрэмбэлсэн илгээлтүүдийн жагсаалт. */
export default function SubmissionList({ items, showVotes = true }: SubmissionListProps) {
  const { t } = useI18n();
  // Анхны массивыг өөрчлөхгүйн тулд хуулбар үүсгээд эрэмбэлнэ.
  const sorted = [...items].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <ul className="space-y-2.5 pt-4">
      {sorted.map((item) => (
        <li key={item.id} className="flex gap-3 rounded-lg p-3 ring-1 ring-slate-200">
          {showVotes && (
            <span className="flex w-10 shrink-0 flex-col items-center justify-center rounded-md bg-slate-50 py-1 text-ink-soft ring-1 ring-slate-200">
              <ChevronUp size={14} aria-hidden="true" />
              <span className="text-xs font-semibold tabular-nums">{item.upvotes}</span>
              <span className="sr-only">{t.submissions.upvotes}</span>
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-snug text-ink">{item.body}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span>{item.authorName}</span>
              <span aria-hidden="true">·</span>
              <span>{item.createdAt}</span>
              <Badge tone={statusTones[item.status]} size="sm" className="ml-auto">
                {t.submissions.status[item.status]}
              </Badge>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
