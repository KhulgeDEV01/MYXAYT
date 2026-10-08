import { platformStats } from '../../data/stats';
import { useInView } from '../../hooks/useInView';
import { useI18n } from '../../i18n/useI18n';
import Container from '../ui/Container';
import StatCounter from './StatCounter';

export default function TrustSection() {
  const { ref, inView } = useInView<HTMLDListElement>();
  const { locale, t } = useI18n();

  return (
    <section aria-labelledby="trust-title" className="border-y border-slate-200/70 bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <h2 id="trust-title" className="text-2xl leading-snug font-semibold text-balance sm:text-[1.7rem]">
              {t.trust.title}
            </h2>
            <p className="mt-3 text-sm text-slate-500">{t.trust.description}</p>
          </div>
          <dl ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8 lg:border-l lg:border-slate-200 lg:pl-12">
            {platformStats[locale].map((stat) => (
              <StatCounter key={stat.id} stat={stat} start={inView} />
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
