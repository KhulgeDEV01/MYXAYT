import PageHeader from '../components/layout/PageHeader';
import PricingSection from '../components/pricing/PricingSection';
import PlanComparison from '../components/pricing/PlanComparison';
import FaqSection from '../components/faq/FaqSection';
import FinalCta from '../components/cta/FinalCta';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Pricing() {
  usePageMeta({
    title: 'Үнэ — Free, Pro, Business, Enterprise багц',
    description:
      'MeetSync-ийн үнийн багцууд: үнэгүй Free багц, багуудад зориулсан Pro, байгууллагад зориулсан Business болон тусгайлсан Enterprise шийдэл.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Үнэ"
        title="Ойлгомжтой үнэ, нуугдмал төлбөргүй"
        description="Үнэгүй эхэлж, хурлынхаа давтамж, оролцогчийн тоо нэмэгдэхэд тохирох багц руу шилжээрэй."
      />
      <PricingSection showHeading={false} />
      <PlanComparison />
      <FaqSection />
      <FinalCta />
    </>
  );
}
