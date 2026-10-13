import { Check, Minus } from 'lucide-react';
import { planComparison, pricingPlans } from '../../data/pricing';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export default function PlanComparison() {
  const { locale, t } = useI18n();
  const plans = pricingPlans[locale];

  return (
    <Section labelledBy="compare-title">
      <SectionHeading id="compare-title" title={t.pricing.compareTitle} description={t.pricing.compareDescription} />

      {/* Horizontal scroll is contained inside this wrapper on small screens. */}
      <div className="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-label={t.pricing.compareRegion}>
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">{t.pricing.compareCaption(siteConfig.name)}</caption>
          <thead>
            <tr className="border-b border-slate-200">
              <th scope="col" className="w-1/3 py-4 pr-4 font-medium text-slate-500">
                {t.pricing.compareFeature}
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn('px-3 py-4 text-center font-semibold text-ink', plan.highlighted && 'bg-brand-50/60')}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planComparison[locale].map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <th scope="row" className="py-3.5 pr-4 font-normal text-slate-700">
                  {row.label}
                </th>
                {plans.map((plan) => {
                  const value = row.values[plan.id];
                  return (
                    <td key={plan.id} className={cn('px-3 py-3.5 text-center', plan.highlighted && 'bg-brand-50/60')}>
                      {value === true ? (
                        <>
                          <Check size={18} aria-hidden="true" className="mx-auto text-brand-600 dark:text-brand-400" />
                          <span className="sr-only">{t.pricing.included}</span>
                        </>
                      ) : value === false ? (
                        <>
                          <Minus size={18} aria-hidden="true" className="mx-auto text-slate-300" />
                          <span className="sr-only">{t.pricing.notIncluded}</span>
                        </>
                      ) : (
                        <span className="text-ink-soft">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
