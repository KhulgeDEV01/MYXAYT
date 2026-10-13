import { useCases } from '../../data/useCases';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export default function UseCasesSection({ tone = 'white' }: { tone?: 'white' | 'muted' }) {
  const { locale, t } = useI18n();

  return (
    <Section id="use-cases" tone={tone} labelledBy="usecases-title">
      <SectionHeading
        id="usecases-title"
        eyebrow={t.useCases.eyebrow}
        title={t.useCases.title}
        description={t.useCases.description}
      />
      <ul className="mt-14 grid gap-px overflow-hidden rounded-xl bg-slate-200 ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {useCases[locale].map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <Reveal as="li" key={useCase.id} delay={(index % 4) * 60} className="group bg-surface p-6 transition-colors hover:bg-slate-50">
              <div className="flex items-start justify-between gap-3">
                <Icon size={22} aria-hidden="true" className="shrink-0 text-brand-600 dark:text-brand-400" />
                <span className="text-right text-[11px] font-medium tracking-wide text-slate-500 uppercase">{useCase.tag}</span>
              </div>
              <h3 className="mt-6 font-semibold">{useCase.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{useCase.description}</p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
