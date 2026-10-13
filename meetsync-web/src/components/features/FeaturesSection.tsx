import { ArrowRight } from 'lucide-react';
import { coreFeatures } from '../../data/features';
import { routes } from '../../config/routes';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import FeatureCard from './FeatureCard';

interface FeaturesSectionProps {
  /** Show bullet points under each feature (used on the Features page). */
  detailed?: boolean;
  showLink?: boolean;
}

export default function FeaturesSection({ detailed = false, showLink = true }: FeaturesSectionProps) {
  return (
    <Section id="features" labelledBy="features-title">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          id="features-title"
          eyebrow="Боломжууд"
          title="Хурал болон шийдвэр гаргалтыг нэг дор"
          description="Хурал зохион байгуулахаас эхлээд шийдвэрээ архивлах хүртэлх бүх алхам нэг платформд. Олон хэрэгсэл хооронд шилжих шаардлагагүй."
        />
        {showLink && (
          <Button to={routes.features} variant="secondary" iconRight={ArrowRight} className="self-start lg:self-auto">
            Бүх боломжийг үзэх
          </Button>
        )}
      </div>
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coreFeatures.map((feature, index) => (
          <Reveal as="li" key={feature.id} delay={(index % 3) * 80}>
            <FeatureCard feature={feature} showPoints={detailed} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
