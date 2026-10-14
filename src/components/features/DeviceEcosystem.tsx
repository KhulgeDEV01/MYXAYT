import { devices } from '../../data/features';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

/** Shows how the product works across the devices used in a meeting. */
export default function DeviceEcosystem() {
  const { locale, t } = useI18n();

  return (
    <Section id="devices" tone="muted" labelledBy="devices-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading id="devices-title" eyebrow={t.devices.eyebrow} title={t.devices.title} description={t.devices.description} />
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          {devices[locale].map((device, index) => {
            const Icon = device.icon;
            return (
              <Reveal as="li" key={device.id} delay={index * 70} className="rounded-xl bg-surface p-4 shadow-soft ring-1 ring-slate-200 sm:p-6">
                <Icon size={24} aria-hidden="true" className="size-5 sm:size-6 text-brand-600 dark:text-brand-400" />
                <h3 className="mt-3 text-sm font-semibold sm:mt-4 sm:text-base">{device.title}</h3>
                <p className="mt-1.5 text-[13px] leading-snug text-slate-600 sm:mt-2 sm:text-sm sm:leading-relaxed">{device.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
