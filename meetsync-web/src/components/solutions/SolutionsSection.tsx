import { solutions } from '../../data/solutions';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import SolutionCard from './SolutionCard';

export default function SolutionsSection({ tone = 'muted' }: { tone?: 'white' | 'muted' }) {
  return (
    <Section id="solutions" tone={tone} labelledBy="solutions-title">
      <SectionHeading
        id="solutions-title"
        eyebrow="Хэнд зориулсан бэ?"
        title="Танд тохирох шийдэл"
        description="Хурлаар шийдвэр гаргадаг аливаа байгууллага, баг, хамт олонд. Хэрэгцээндээ тохируулан эрх, горимоо тохируулаарай."
      />
      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution, index) => (
          <Reveal as="li" key={solution.id} delay={(index % 3) * 80}>
            <SolutionCard solution={solution} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
