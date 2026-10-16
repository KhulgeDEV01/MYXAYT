/**
 * ContactSection.tsx — "Бидэнтэй холбогдох, хамтран ажиллах" хэсэг.
 *
 * Гурван хэсгээс бүрдэнэ:
 *   1. Холбоо барих мэдээлэл (имэйл, утас, хаяг, ажлын цаг)
 *   2. Хамтын ажиллагааны чиглэлүүд (харанхуй карт) + "Хамтын ажиллагааны хүсэлт" товч
 *   3. Хүсэлт илгээх маягт (RequestForm.tsx)
 * Нүүр хуудас ба /contact хуудсанд ашиглагдана.
 */
import { useEffect, useState } from 'react';
import { ArrowRight, Check, Clock, Handshake, Headset, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import type { RequestType } from '../../services/contact';
import Card from '../ui/Card';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import RequestForm from './RequestForm';

interface ContactSectionProps {
  /** /contact хуудас өөрийн гарчигтай тул энэ хэсгийн гарчгийг нуух боломжтой. */
  showHeading?: boolean;
  /** Анх сонгогдсон байх хүсэлтийн төрөл. */
  initialType?: RequestType;
  tone?: 'white' | 'muted';
}

/** Маягтын id — "Хамтын ажиллагааны хүсэлт" товч энэ рүү гүйлгэнэ. */
const FORM_ID = 'request-form';

/** Холбоо барих мэдээлэл, хамтын ажиллагааны чиглэл, хүсэлтийн маягттай хэсэг. */
export default function ContactSection({ showHeading = true, initialType = 'contact', tone = 'muted' }: ContactSectionProps) {
  const { t } = useI18n();
  const c = t.contactSection;
  // Маягтад сонгогдсон хүсэлтийн төрөл (энэ хэсэг ба маягт хуваалцана).
  const [type, setType] = useState<RequestType>(initialType);

  // URL-аас ирэх өөрчлөлтийг дагана (жишээ нь /contact?type=partnership → "Хамтын ажиллагаа" сонгогдоно).
  useEffect(() => setType(initialType), [initialType]);

  // Харуулах мэдээллүүд; `href`-тэй нь дарахад имэйл / залгах программ нээгдэнэ.
  const contactItems = [
    { icon: Mail, label: c.labels.email, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Phone, label: c.labels.phone, value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: c.labels.address, value: t.contactInfo.address },
    { icon: Clock, label: c.labels.hours, value: t.contactInfo.hours },
  ];

  /** "Хамтын ажиллагааны хүсэлт" товч: төрлийг сонгож, маягт руу гүйлгээд, нэрийн талбарт focus өгнө. */
  const startPartnership = () => {
    setType('partnership');
    const form = document.getElementById(FORM_ID);
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    form?.querySelector<HTMLInputElement>('input[name="fullName"]')?.focus({ preventScroll: true });
  };

  return (
    <Section id="contact" tone={tone} labelledBy={showHeading ? 'contact-title' : undefined}>
      {showHeading && (
        <SectionHeading id="contact-title" eyebrow={c.eyebrow} title={c.title} description={c.description} />
      )}

      <div className={showHeading ? 'mt-14 grid gap-6 lg:grid-cols-12' : 'grid gap-6 lg:grid-cols-12'}>
        <div className="space-y-6 lg:col-span-5">
          {/* 1. Холбоо барих мэдээлэл */}
          <Card as="section" aria-label={c.infoAria}>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:text-brand-400">
                <Headset size={20} aria-hidden="true" className="size-[18px] sm:size-5" />
              </span>
              <h3 className="text-base font-semibold sm:text-lg">{c.contactTitle}</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">{c.contactText}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-slate-400" />
                  <div className="min-w-0">
                    <dt className="text-xs text-slate-500">{label}</dt>
                    <dd className="text-sm font-semibold break-words text-ink">
                      {href ? (
                        <a href={href} className="inline-block py-1.5 hover:text-brand-700 sm:py-0 dark:hover:text-brand-300">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Card>

          {/* 2. Хамтран ажиллах */}
          <Card as="section" variant="dark" aria-labelledby="partner-title">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-accent-300">
                <Handshake size={20} aria-hidden="true" className="size-[18px] sm:size-5" />
              </span>
              <h3 id="partner-title" className="text-base font-semibold text-white sm:text-lg">
                {c.partnerTitle}
              </h3>
            </div>
            <p className="mt-3 text-sm text-navy-300">{c.partnerText}</p>
            <ul className="mt-5 space-y-2.5">
              {c.partnerAreas.map((area) => (
                <li key={area} className="flex items-start gap-2.5 text-sm text-navy-100">
                  <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-300" />
                  {area}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={startPartnership}
              aria-controls={FORM_ID}
              className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-300 hover:text-white sm:mt-6 sm:min-h-0"
            >
              {c.partnerCta}
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </Card>
        </div>

        {/* 3. Хүсэлтийн маягт */}
        <Card padding="lg" className="lg:col-span-7">
          <h3 className="text-lg font-semibold sm:text-xl">{t.requestForm.title}</h3>
          <p className="mt-1 mb-6 text-sm text-slate-500">{t.requestForm.subtitle}</p>
          <RequestForm id={FORM_ID} type={type} onTypeChange={setType} />
        </Card>
      </div>
    </Section>
  );
}
