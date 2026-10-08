import { useState } from 'react';
import type { BillingPeriod } from '../../types/content';
import { pricingPlans } from '../../data/pricing';
import { useI18n } from '../../i18n/useI18n';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import BillingToggle from './BillingToggle';
import PricingCard from './PricingCard';

interface PricingSectionProps {
  /** On the Pricing page the page header already provides the H1/intro. */
  showHeading?: boolean;
}

export default function PricingSection({ showHeading = true }: PricingSectionProps) {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');
  const { locale, t } = useI18n();

  return (
    <Section id="pricing" tone="muted" labelledBy={showHeading ? 'pricing-title' : undefined}>
      <div className="flex flex-col items-center gap-8">
        {showHeading && (
          <SectionHeading
            id="pricing-title"
            eyebrow={t.pricing.eyebrow}
            title={t.pricing.title}
            description={t.pricing.description}
            align="center"
          />
        )}
        <BillingToggle value={period} onChange={setPeriod} />
      </div>

      <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans[locale].map((plan) => (
          <li key={plan.id}>
            <PricingCard plan={plan} period={period} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-xs text-slate-500">{t.pricing.footnote}</p>
    </Section>
  );
}
