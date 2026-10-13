import { Check } from 'lucide-react';
import type { Feature } from '../../types/content';
import Card from '../ui/Card';

interface FeatureCardProps {
  feature: Feature;
  showPoints?: boolean;
}

export default function FeatureCard({ feature, showPoints = false }: FeatureCardProps) {
  const Icon = feature.icon;
  return (
    <Card as="article" interactive className="group h-full">
      <span className="flex size-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:text-brand-400 ring-1 ring-brand-100 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
      <p className="mt-2 leading-relaxed text-slate-600">{feature.description}</p>
      {showPoints && feature.points && (
        <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
          {feature.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-slate-600">
              <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
              {point}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
