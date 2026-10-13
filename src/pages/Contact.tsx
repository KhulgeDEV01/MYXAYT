import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import ContactSection from '../components/contact/ContactSection';
import FaqSection from '../components/faq/FaqSection';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/useI18n';
import type { RequestType } from '../services/contact';

const REQUEST_TYPES: RequestType[] = ['contact', 'partnership', 'demo', 'other'];

export default function Contact() {
  const { t } = useI18n();
  const p = t.pages.contact;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription(siteConfig.name) });

  // /contact?type=partnership preselects the request type.
  const [params] = useSearchParams();
  const requested = params.get('type');
  const initialType = REQUEST_TYPES.find((type) => type === requested) ?? 'contact';

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />
      <ContactSection showHeading={false} initialType={initialType} tone="white" />
      <FaqSection />
    </>
  );
}
