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
  /** The Contact page has its own page header, so it hides this heading. */
  showHeading?: boolean;
  initialType?: RequestType;
  tone?: 'white' | 'muted';
}

const FORM_ID = 'request-form';

/** "Contact us / Work with us" block with contact details, partnership areas and the request form. */
export default function ContactSection({ showHeading = true, initialType = 'contact', tone = 'muted' }: ContactSectionProps) {
  const { t } = useI18n();
  const c = t.contactSection;
  const [type, setType] = useState<RequestType>(initialType);

  // Follow changes coming from the URL (e.g. /contact?type=partnership).
  useEffect(() => setType(initialType), [initialType]);

  const contactItems = [
    { icon: Mail, label: c.labels.email, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Phone, label: c.labels.phone, value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: c.labels.address, value: t.contactInfo.address },
    { icon: Clock, label: c.labels.hours, value: t.contactInfo.hours },
  ];

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
          {/* Contact us */}
          <Card as="section" aria-label={c.infoAria}>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:text-brand-400">
                <Headset size={20} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold">{c.contactTitle}</h3>
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
                        <a href={href} className="hover:text-brand-700 dark:hover:text-brand-300">
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

          {/* Work with us */}
          <Card as="section" variant="dark" aria-labelledby="partner-title">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-white/10 text-accent-300">
                <Handshake size={20} aria-hidden="true" />
              </span>
              <h3 id="partner-title" className="text-lg font-semibold text-white">
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
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-300 hover:text-white"
            >
              {c.partnerCta}
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </Card>
        </div>

        {/* Request form */}
        <Card padding="lg" className="lg:col-span-7">
          <h3 className="text-xl font-semibold">{t.requestForm.title}</h3>
          <p className="mt-1 mb-6 text-sm text-slate-500">{t.requestForm.subtitle}</p>
          <RequestForm id={FORM_ID} type={type} onTypeChange={setType} />
        </Card>
      </div>
    </Section>
  );
}
