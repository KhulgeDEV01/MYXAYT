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
      <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-slate-200 ring-1 ring-slate-200 sm:mt-14 lg:grid-cols-4">
        {useCases[locale].map((useCase, index) => {
          const Icon = useCase.icon;
          return (
            <Reveal as="li" key={useCase.id} delay={(index % 4) * 60} className="group bg-surface p-4 transition-colors hover:bg-slate-50 sm:p-6">
              <div className="flex flex-col-reverse items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
                <Icon size={22} aria-hidden="true" className="size-5 sm:size-[22px] shrink-0 text-brand-600 dark:text-brand-400" />
                <span className="text-[10px] font-medium tracking-wide text-slate-500 uppercase sm:text-right sm:text-[11px]">{useCase.tag}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold sm:text-base sm:mt-6">{useCase.title}</h3>
              <p className="mt-1.5 text-[13px] leading-snug sm:text-sm sm:leading-relaxed text-slate-600 sm:mt-2">{useCase.description}</p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
