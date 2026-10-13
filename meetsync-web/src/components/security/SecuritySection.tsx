import { ShieldCheck } from 'lucide-react';
import { securityItems } from '../../data/security';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export default function SecuritySection() {
  return (
    <Section id="security" tone="dark" labelledBy="security-title" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div className="relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-white/5 text-accent-300 ring-1 ring-white/10">
            <ShieldCheck size={24} aria-hidden="true" />
          </span>
          <SectionHeading
            id="security-title"
            tone="dark"
            eyebrow="Аюулгүй байдал"
            title="Таны мэдээлэл бидний хувьд чухал."
            description="Санал хураалтын дүн, хурлын материал байгууллагын хамгийн эмзэг мэдээлэл байдаг. Тиймээс аюулгүй байдлыг бүтээгдэхүүний суурь болгон хөгжүүлдэг."
            className="mt-6"
          />
        </div>
        <ul className="grid gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-2 lg:col-span-8">
          {securityItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={(index % 2) * 80}
                className={index === securityItems.length - 1 ? 'bg-navy-950 p-6 sm:col-span-2' : 'bg-navy-950 p-6'}
              >
                <Icon size={20} aria-hidden="true" className="text-accent-300" />
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-300">{item.description}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
