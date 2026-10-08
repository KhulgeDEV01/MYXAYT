import { processSteps } from '../../data/workflow';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import ProductFlow from './ProductFlow';

export default function HowItWorks() {
  const { locale, t } = useI18n();

  return (
    <Section id="how-it-works" tone="muted" labelledBy="how-title">
      <SectionHeading
        id="how-title"
        eyebrow={t.howItWorks.eyebrow}
        title={t.howItWorks.title}
        description={t.howItWorks.description}
        align="center"
      />

      <div className="relative mt-16">
        {/* Connecting timeline line (desktop) */}
        <span aria-hidden="true" className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-slate-300 lg:block" />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps[locale].map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal
                as="li"
                key={step.id}
                delay={index * 100}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
              >
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft ring-1 ring-slate-200">
                  <Icon size={22} aria-hidden="true" />
                  <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-navy-950 text-[10px] font-semibold text-white">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold lg:mt-5">
                    <span className="sr-only">{t.howItWorks.step(index + 1)}</span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>

      <Reveal className="mt-20">
        <ProductFlow />
      </Reveal>
    </Section>
  );
}
