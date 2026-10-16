/**
 * FeatureCard.tsx — Нэг боломжийн (feature) карт: дүрс + гарчиг + тайлбар.
 *
 * `showPoints` идэвхтэй бол (/features хуудсанд) доор нь ✓ тэмдэгтэй дэлгэрэнгүй жагсаалт гарна.
 * Утсан дээр 2 баганад багтахаар жижиг, том дэлгэцэнд томорно (sm: угтвартай класууд).
 */
import { Check } from 'lucide-react';
import type { Feature } from '../../types/content';
import Card from '../ui/Card';

interface FeatureCardProps {
  feature: Feature;
  showPoints?: boolean;
}

/** Боломжийн карт. Хулгана дээр нь очиход дүрсний дэвсгэр цэнхэр болно. */
export default function FeatureCard({ feature, showPoints = false }: FeatureCardProps) {
  const Icon = feature.icon;
  return (
    <Card as="article" interactive padding="none" className="group h-full p-4 sm:p-6">
      <span className="flex size-9 items-center justify-center rounded-lg sm:size-11 bg-brand-50 text-brand-600 dark:text-brand-400 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={22} aria-hidden="true" className="size-[18px] sm:size-[22px]" />
      </span>
      <h3 className="mt-3 text-sm leading-snug font-semibold break-words hyphens-auto sm:mt-5 sm:text-lg">{feature.title}</h3>
      <p className="mt-1.5 text-[13px] leading-snug text-slate-600 sm:mt-2 sm:text-base sm:leading-relaxed">{feature.description}</p>
      {/* Дэлгэрэнгүй жагсаалт (зөвхөн /features хуудсанд). */}
      {showPoints && feature.points && (
        <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 sm:mt-5 sm:space-y-2 sm:pt-5">
          {feature.points.map((point) => (
            <li key={point} className="flex items-start gap-1.5 text-xs text-slate-600 sm:gap-2 sm:text-sm">
              <Check size={16} aria-hidden="true" className="mt-px size-3.5 shrink-0 sm:mt-0.5 sm:size-4 text-brand-600 dark:text-brand-400" />
              {/* min-w-0 — урт үг жижиг картад багтахгүй бол шинэ мөрөнд шилжих боломж олгоно. */}
              <span className="min-w-0">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
