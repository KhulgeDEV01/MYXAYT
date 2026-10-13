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
import { usePageMeta } from '../hooks/usePageMeta';

export default function Features() {
  usePageMeta({
    title: 'Боломжууд — онлайн хурал, санал хураалт, асуулт, хүсэлт',
    description:
      'Онлайн хурал, ил ба нууц санал хураалт, шууд санал бодол, асуулт, хүсэлт, бодит цагийн үр дүн, хурлын түүх — MeetSync платформын бүх боломж.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Боломжууд"
        title="Хурлын өмнө, үеэр, дараа — бүх шатанд"
        description="MeetSync нь хурал зохион байгуулах, хэлэлцэх, санал хураах, шийдвэрээ баримтжуулах ажлыг нэг урсгалд нэгтгэнэ."
      >
        <Button to={routes.signup} iconRight={ArrowRight}>
          Үнэгүй туршиж үзэх
        </Button>
      </PageHeader>

      <FeaturesSection detailed showLink={false} />

      <Section labelledBy="flow-title" className="pt-0 sm:pt-0 lg:pt-0">
        <SectionHeading
          id="flow-title"
          eyebrow="Ажлын урсгал"
          title="Зохион байгуулагчаас шийдвэр хүртэл"
          description="Хэн, хэзээ, юу хийхийг платформ тодорхой болгодог. Алхам бүр бүртгэгдэж, хурлын түүхэнд хадгалагдана."
        />
        <ProductFlow className="mt-10" />
      </Section>

      <MeetingShowcase />
      <DeviceEcosystem />
      <SecuritySection />
      <FinalCta />
    </>
  );
}
