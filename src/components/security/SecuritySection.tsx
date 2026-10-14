import { ShieldCheck } from 'lucide-react';
import { securityItems } from '../../data/security';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export default function SecuritySection() {
  const { locale, t } = useI18n();
  const items = securityItems[locale];

  return (
    <Section id="security" tone="dark" labelledBy="security-title" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div className="relative grid gap-10 sm:gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="flex size-10 items-center justify-center rounded-xl bg-white/5 sm:size-12 text-accent-300 ring-1 ring-white/10">
            <ShieldCheck size={24} aria-hidden="true" className="size-5 sm:size-6" />
          </span>
          <SectionHeading
            id="security-title"
            tone="dark"
            eyebrow={t.security.eyebrow}
            title={t.security.title}
            description={t.security.description}
            className="mt-6"
          />
        </div>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 lg:col-span-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={(index % 2) * 80}
                className={index === items.length - 1 ? 'col-span-2 bg-navy-950 p-4 sm:p-6' : 'bg-navy-950 p-4 sm:p-6'}
              >
                <Icon size={20} aria-hidden="true" className="size-[18px] text-accent-300 sm:size-5" />
                <h3 className="mt-3 text-sm font-semibold sm:text-base text-white sm:mt-4">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-snug sm:text-sm sm:leading-relaxed text-navy-300 sm:mt-2">{item.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
