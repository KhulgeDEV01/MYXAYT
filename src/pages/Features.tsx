/**
 * Features.tsx — "Боломжууд" хуудас (/features).
 *
 * Бүтэц: гарчиг → дэлгэрэнгүй боломжууд → хурлын бүтэн мөчлөг → шууд хурлын жишээ →
 * төхөөрөмжүүд → аюулгүй байдал → уриалга.
 */
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import FeaturesSection from '../components/features/FeaturesSection';
import DeviceEcosystem from '../components/features/DeviceEcosystem';
import MeetingShowcase from '../components/meetings/MeetingShowcase';
import ProductFlow from '../components/workflow/ProductFlow';
import SecuritySection from '../components/security/SecuritySection';
import FinalCta from '../components/cta/FinalCta';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { routes } from '../config/routes';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/useI18n';

/** "Боломжууд" хуудас. */
export default function Features() {
  const { t } = useI18n();
  const p = t.pages.features;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription(siteConfig.name) });

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description(siteConfig.name)}>
        <Button to={routes.signup} iconRight={ArrowRight}>
          {p.cta}
        </Button>
      </PageHeader>

      <FeaturesSection detailed showLink={false} />

      <Section labelledBy="flow-title" className="pt-0 sm:pt-0 lg:pt-0">
        <SectionHeading id="flow-title" eyebrow={p.flowEyebrow} title={p.flowTitle} description={p.flowDescription} />
        <ProductFlow className="mt-10" />
      </Section>

      <MeetingShowcase />
      <DeviceEcosystem />
      <SecuritySection />
      <FinalCta />
    </>
  );
}
