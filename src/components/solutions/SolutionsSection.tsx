import { solutions } from '../../data/solutions';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import { carouselItem, carouselList } from '../../utils/carousel';
import { cn } from '../../utils/cn';
import SolutionCard from './SolutionCard';

export default function SolutionsSection({ tone = 'muted' }: { tone?: 'white' | 'muted' }) {
  const { locale, t } = useI18n();

  return (
    <Section id="solutions" tone={tone} labelledBy="solutions-title">
      <SectionHeading
        id="solutions-title"
        eyebrow={t.solutions.eyebrow}
        title={t.solutions.title}
        description={t.solutions.description}
      />
      <ul className={cn(carouselList, 'mt-7 sm:mt-11 md:mt-14 md:grid-cols-2 lg:grid-cols-3')}>
        {solutions[locale].map((solution, index) => (
          <Reveal as="li" key={solution.id} delay={(index % 3) * 80} className={carouselItem}>
            <SolutionCard solution={solution} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
