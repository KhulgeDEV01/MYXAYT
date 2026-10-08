import PageHeader from '../components/layout/PageHeader';
import PricingSection from '../components/pricing/PricingSection';
import PlanComparison from '../components/pricing/PlanComparison';
import FaqSection from '../components/faq/FaqSection';
import FinalCta from '../components/cta/FinalCta';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/useI18n';

export default function Pricing() {
  const { t } = useI18n();
  const p = t.pages.pricing;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription(siteConfig.name) });

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <PricingSection showHeading={false} />
      <PlanComparison />
      <FaqSection />
      <FinalCta />
    </>
  );
}
