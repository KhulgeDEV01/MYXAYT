import { devices } from '../../data/features';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

/** Shows how the product works across the devices used in a meeting. */
export default function DeviceEcosystem() {
  return (
    <Section id="devices" tone="muted" labelledBy="devices-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading
            id="devices-title"
            eyebrow="Төхөөрөмж"
            title="Таны ажилладаг төхөөрөмж бүртэй хамт"
            description="Танхимд ч, алсаас ч. Зохион байгуулагч компьютерээсээ хурлаа удирдаж, оролцогчид утас, таблетаасаа санал өгч, үр дүн танхимын том дэлгэцэнд шууд гарна. Бүгд нэг бүртгэлээр синк хийгдэнэ."
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {devices.map((device, index) => {
            const Icon = device.icon;
            return (
              <Reveal as="li" key={device.id} delay={index * 70} className="rounded-xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
                <Icon size={24} aria-hidden="true" className="text-brand-600" />
                <h3 className="mt-4 font-semibold">{device.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{device.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
