/**
 * Home.tsx — Нүүр хуудас (/).
 *
 * Хэсгүүдийн дарааллыг энд өөрчилнө: мөрийг дээш доош зөөх, эсвэл устгах.
 * Хэсэг бүрийн агуулга components/ хавтсанд, текст нь i18n/dictionaries дотор байна.
 */
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
import ContactSection from '../components/contact/ContactSection';
import { usePageMeta } from '../hooks/usePageMeta';

/** Нүүр хуудас. */
export default function Home() {
  // Гарчиг, тайлбарыг өгөөгүй тул i18n толины үндсэн (meta) утгыг ашиглана.
  usePageMeta({});

  return (
    <>
      {/* Энэ юу вэ? */}
      <Hero />
      <TrustSection />
      <FeaturesSection />
      {/* Хэрхэн ажилладаг вэ? */}
      <HowItWorks />
      <MeetingShowcase />
      {/* Ямар асуудлыг шийддэг вэ? */}
      <ParticipationSection />
      {/* Хэнд зориулсан бэ? */}
      <SolutionsSection />
      <UseCasesSection />
      {/* Яагаад сонгох вэ? */}
      <SecuritySection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      {/* Холбогдох / хамтран ажиллах */}
      <ContactSection tone="white" />
      <FinalCta />
    </>
  );
}
