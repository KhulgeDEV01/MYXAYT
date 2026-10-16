/**
 * HowItWorks.tsx — "Хэрхэн ажилладаг вэ" хэсэг.
 *
 * Дээд хэсэгт 4 алхам (дугаартай), доор нь "Хурлын бүтэн мөчлөг" (ProductFlow).
 * Алхмуудын текст: data/workflow.ts → processSteps.
 */
import { processSteps } from '../../data/workflow';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import ProductFlow from './ProductFlow';

/** 4 алхам + хурлын бүтэн мөчлөг. */
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

      <div className="relative mt-10 sm:mt-16">
        {/* Алхмуудыг холбосон хэвтээ шугам (зөвхөн том дэлгэцэнд) */}
        <span aria-hidden="true" className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-slate-300 lg:block" />
        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-8 md:gap-10 lg:grid-cols-4 lg:gap-6">
          {processSteps[locale].map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal
                as="li"
                key={step.id}
                delay={index * 100}
                className="relative flex flex-col gap-3 md:flex-row md:gap-5 lg:flex-col lg:items-center lg:text-center"
              >
                <div className="relative z-10 flex size-10 shrink-0 sm:size-12 items-center justify-center rounded-xl bg-surface text-brand-600 dark:text-brand-400 shadow-soft ring-1 ring-slate-200">
                  <Icon size={22} aria-hidden="true" className="size-5 sm:size-[22px]" />
                  {/* Алхмын дугаар (1, 2, 3, 4) — дүрсний баруун дээд буланд. */}
                  <span className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-surface">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold sm:text-lg lg:mt-5">
                    <span className="sr-only">{t.howItWorks.step(index + 1)}</span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-snug sm:text-sm sm:leading-relaxed text-slate-600 sm:mt-2">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>

      <Reveal className="mt-12 sm:mt-20">
        <ProductFlow />
      </Reveal>
    </Section>
  );
}
