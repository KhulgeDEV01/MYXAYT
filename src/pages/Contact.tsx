/**
 * Contact.tsx — "Холбоо барих" хуудас (/contact).
 *
 * Бүтэц: гарчиг → холбоо барих мэдээлэл + хүсэлтийн маягт → түгээмэл асуулт.
 * /contact?type=partnership гэх мэт хаягаар орвол маягтад тухайн төрөл сонгогдсон байна.
 */
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import ContactSection from '../components/contact/ContactSection';
import FaqSection from '../components/faq/FaqSection';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/useI18n';
import type { RequestType } from '../services/contact';

/** URL-ээр сонгож болох хүсэлтийн төрлүүд. */
const REQUEST_TYPES: RequestType[] = ['contact', 'partnership', 'demo', 'other'];

/** "Холбоо барих" хуудас. */
export default function Contact() {
  const { t } = useI18n();
  const p = t.pages.contact;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription(siteConfig.name) });

  // URL-ийн ?type= утгаас хүсэлтийн төрлийг уншина (зөвшөөрөгдсөн утга биш бол "contact").
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
