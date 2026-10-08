import PageHeader from '../components/layout/PageHeader';
import TrustSection from '../components/trust/TrustSection';
import FinalCta from '../components/cta/FinalCta';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { companyValues } from '../data/company';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/useI18n';

export default function About() {
  const { locale, t } = useI18n();
  const p = t.pages.about;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription(siteConfig.name) });

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description(siteConfig.name)} />

      <Section labelledBy="mission-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="mission-title" eyebrow={p.missionEyebrow} title={p.missionTitle} />
          </div>
          <div className="space-y-10 lg:col-span-8">
            {p.principles(siteConfig.name).map((item) => (
              <Reveal key={item.title}>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <TrustSection />

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow={p.valuesEyebrow} title={p.valuesTitle} align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues[locale].map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal as="li" key={value.id} delay={index * 70}>
                <Card className="h-full">
                  <Icon size={22} aria-hidden="true" className="text-brand-600" />
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <FinalCta title={p.ctaTitle} />
    </>
  );
}
