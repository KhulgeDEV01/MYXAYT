import Hero from '../components/hero/Hero';
import TrustSection from '../components/trust/TrustSection';
import FeaturesSection from '../components/features/FeaturesSection';
import HowItWorks from '../components/workflow/HowItWorks';
import MeetingShowcase from '../components/meetings/MeetingShowcase';
import ParticipationSection from '../components/participation/ParticipationSection';
import SolutionsSection from '../components/solutions/SolutionsSection';
import UseCasesSection from '../components/solutions/UseCasesSection';
import SecuritySection from '../components/security/SecuritySection';
import PricingSection from '../components/pricing/PricingSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';
import FaqSection from '../components/faq/FaqSection';
import FinalCta from '../components/cta/FinalCta';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta({});

  return (
    <>
      {/* What is it? */}
      <Hero />
      <TrustSection />
      <FeaturesSection />
      {/* How does it work? */}
      <HowItWorks />
      <MeetingShowcase />
      {/* What problem does it solve? */}
      <ParticipationSection />
      {/* Who is it for? */}
      <SolutionsSection />
      <UseCasesSection />
      {/* Why choose it? */}
      <SecuritySection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
