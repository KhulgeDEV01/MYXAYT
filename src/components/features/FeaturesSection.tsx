/**
 * FeaturesSection.tsx — "Боломжууд" хэсэг: 6 үндсэн боломжийн картууд.
 *
 * Нүүр хуудсанд товч хувилбараар + "Бүх боломжийг харах" товчтой, /features хуудсанд
 * дэлгэрэнгүй (`detailed`) хувилбараар харагдана. Картуудын текст: data/features.ts.
 */
import { ArrowRight } from 'lucide-react';
import { coreFeatures } from '../../data/features';
import { routes } from '../../config/routes';
import { useI18n } from '../../i18n/useI18n';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import FeatureCard from './FeatureCard';

interface FeaturesSectionProps {
  /** Карт бүрийн доор дэлгэрэнгүй жагсаалт харуулах эсэх (/features хуудсанд). */
  detailed?: boolean;
  /** "Бүх боломжийг харах" товчийг харуулах эсэх. */
  showLink?: boolean;
}

export default function FeaturesSection({ detailed = false, showLink = true }: FeaturesSectionProps) {
  const { locale, t } = useI18n();

  return (
    <Section id="features" labelledBy="features-title">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          id="features-title"
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          description={t.features.description}
        />
        {showLink && (
          <Button to={routes.features} variant="secondary" iconRight={ArrowRight} className="self-start lg:self-auto">
            {t.features.viewAll}
          </Button>
        )}
      </div>
      {/* Картууд: утсан дээр 2, том дэлгэцэнд 3 багана; дараалан гарч ирнэ. */}
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-3">
        {coreFeatures[locale].map((feature, index) => (
          <Reveal as="li" key={feature.id} delay={(index % 3) * 80}>
            <FeatureCard feature={feature} showPoints={detailed} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
