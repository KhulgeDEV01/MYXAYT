import type { Stat } from '../../types/content';
import { useCountUp } from '../../hooks/useCountUp';
import { formatNumber } from '../../utils/format';

export default function StatCounter({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.value, start);
  const finalText = `${formatNumber(stat.value, stat.decimals)}${stat.suffix ?? ''}`;

  return (
    <div>
      <dt className="sr-only">{stat.label}</dt>
      <dd>
        <span className="block text-3xl font-semibold tracking-tight text-ink tabular-nums sm:text-4xl" aria-hidden="true">
          {formatNumber(value, stat.decimals)}
          {stat.suffix}
        </span>
        <span className="sr-only">{finalText}</span>
        <span className="mt-2 block text-sm font-medium text-ink-muted">{stat.label}</span>
        {stat.description && <span className="block text-sm text-slate-500">{stat.description}</span>}
      </dd>
    </div>
  );
}
