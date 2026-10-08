import { solutions } from '../../data/solutions';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
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
      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {solutions[locale].map((solution, index) => (
          <Reveal as="li" key={solution.id} delay={(index % 3) * 80}>
            <SolutionCard solution={solution} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
