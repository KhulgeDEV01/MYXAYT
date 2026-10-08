import { Link } from 'react-router-dom';
import { faqItems } from '../../data/faq';
import { routes } from '../../config/routes';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import Accordion from '../ui/Accordion';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export default function FaqSection({ tone = 'muted' }: { tone?: 'white' | 'muted' }) {
  const { locale, t } = useI18n();
  const items = faqItems[locale];

  return (
    <Section id="faq" tone={tone} labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} description={t.faq.description} />
          <p className="mt-6 text-sm text-slate-600">
            <Link to={routes.contact} className="font-semibold text-brand-700 underline-offset-4 hover:underline">
              {t.faq.contactLink}
            </Link>{' '}
            {t.faq.or}{' '}
            <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold text-brand-700 underline-offset-4 hover:underline">
              {siteConfig.contact.email}
            </a>
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion
            defaultOpenId={items[0]?.id}
            items={items.map((item) => ({ id: item.id, title: item.question, content: item.answer }))}
          />
        </div>
      </div>
    </Section>
  );
}
