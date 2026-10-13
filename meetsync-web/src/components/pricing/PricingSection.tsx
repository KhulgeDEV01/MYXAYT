import { useState } from 'react';
import type { BillingPeriod } from '../../types/content';
import { pricingPlans } from '../../data/pricing';
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

  return (
    <Section id="pricing" tone="muted" labelledBy={showHeading ? 'pricing-title' : undefined}>
      <div className="flex flex-col items-center gap-8">
        {showHeading && (
          <SectionHeading
            id="pricing-title"
            eyebrow="Үнэ"
            title="Байгууллагынхаа хэмжээнд тохирох багц"
            description="Үнэгүй эхлээд, хэрэгцээ нэмэгдэхэд багцаа өргөтгөөрэй. Бүх багцад санал хураалт, асуулт, хүсэлтийн үндсэн боломжууд багтана."
            align="center"
          />
        )}
        <BillingToggle value={period} onChange={setPeriod} />
      </div>

      <ul className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map((plan) => (
          <li key={plan.id}>
            <PricingCard plan={plan} period={period} />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-xs text-slate-500">
        Үнэ НӨАТ-гүй, төгрөгөөр. Байгууллагын хэмжээ, хэрэгцээнээс хамааран Enterprise нөхцөлийг тусад нь тохиролцоно.
      </p>
    </Section>
  );
}
