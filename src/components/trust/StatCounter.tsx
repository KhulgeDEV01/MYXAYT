/**
 * StatCounter.tsx — Статистикийн нэг тоо (0-ээс өсөж гарч ирнэ).
 *
 * Анимэйшн явагдаж байх үеийн тоог дэлгэц уншигчаас нууж, оронд нь эцсийн
 * тоог (жишээ нь "20,000+") шууд уншуулна.
 */
import type { Stat } from '../../types/content';
import { useCountUp } from '../../hooks/useCountUp';
import { formatNumber } from '../../utils/format';

/** stat — харуулах тоо ба шошго, start — true болоход тоолж эхэлнэ. */
export default function StatCounter({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.value, start);
  // Эцсийн текст (дэлгэц уншигчид).
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
