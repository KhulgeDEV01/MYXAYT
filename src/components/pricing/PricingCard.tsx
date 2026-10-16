/**
 * PricingCard.tsx — Нэг үнийн багцын карт.
 *
 * Нэр, товч тайлбар, үнэ (сараар / жилээр), товч, багтсан зүйлсийн жагсаалт.
 * Онцолсон багц (`highlighted`) харанхуй өнгөтэй, дээр нь шошготой.
 */
import { ArrowRight, Check } from 'lucide-react';
import type { BillingPeriod, PricingPlan } from '../../types/content';
import { useI18n } from '../../i18n/useI18n';
import { formatPrice } from '../../utils/format';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

interface PricingCardProps {
  plan: PricingPlan;
  period: BillingPeriod;
}

/** plan — багцын өгөгдөл, period — сонгосон төлбөрийн давтамж. */
export default function PricingCard({ plan, period }: PricingCardProps) {
  const { t } = useI18n();
  // Сонгосон давтамжийн үнэ (null бол "Тохиролцоно").
  const price = plan.price[period];
  const featured = plan.highlighted;

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        'relative flex h-full flex-col rounded-xl p-5 sm:p-6 lg:p-7',
        featured ? 'bg-navy-950 text-navy-200 shadow-elevated ring-1 ring-navy-950 dark:ring-brand-500/50' : 'bg-surface shadow-soft ring-1 ring-slate-200',
      )}
    >
      {/* Картын дээд ирмэг дээрх шошго. */}
      {plan.badge && (
        <p className="absolute -top-3 left-6 rounded-md bg-accent-400 px-2.5 py-1 text-xs font-semibold text-navy-950">{plan.badge}</p>
      )}
      <h3 id={`plan-${plan.id}`} className={cn('text-base font-semibold sm:text-lg', featured ? 'text-white' : 'text-ink')}>
        {plan.name}
      </h3>
      <p className={cn('mt-1 min-h-10 text-sm', featured ? 'text-navy-300' : 'text-slate-500')}>{plan.tagline}</p>

      <div className="mt-6 flex min-h-16 flex-col justify-end">
        {/* Үнэ: тусгай үнэ эсвэл дүн + "/сар". */}
        {price === null ? (
          <p className={cn('text-2xl font-semibold tracking-tight sm:text-3xl', featured ? 'text-white' : 'text-ink')}>{t.pricing.custom}</p>
        ) : (
          <p className="flex items-baseline gap-1">
            <span className={cn('text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl', featured ? 'text-white' : 'text-ink')}>
              {price === 0 ? '0₮' : formatPrice(price)}
            </span>
            {price > 0 && <span className="text-sm">{t.pricing.perMonth}</span>}
          </p>
        )}
        <p className={cn('mt-1 text-xs', featured ? 'text-navy-300' : 'text-slate-500')}>
          {plan.priceNote}
          {price !== null && price > 0 && period === 'yearly' && t.pricing.yearlyNote}
        </p>
      </div>

      <Button
        to={plan.cta.to}
        variant={featured ? 'inverse' : plan.id === 'enterprise' ? 'secondary' : 'primary'}
        iconRight={ArrowRight}
        fullWidth
        className="mt-6"
        aria-label={t.pricing.planCtaAria(plan.name, plan.cta.label)}
      >
        {plan.cta.label}
      </Button>

      <ul className={cn('mt-7 space-y-3 border-t pt-6 text-sm', featured ? 'border-white/10' : 'border-slate-100')}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Check size={16} aria-hidden="true" className={cn('mt-0.5 shrink-0', featured ? 'text-accent-300' : 'text-brand-600 dark:text-brand-400')} />
            <span className={featured ? 'text-navy-100' : 'text-slate-700'}>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
