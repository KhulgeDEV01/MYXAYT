/**
 * Solutions.tsx — "Шийдэл" хуудас (/solutions).
 *
 * Бүтэц: гарчиг → 3 дүр (зохион байгуулагч, оролцогч, ажиглагч) → байгууллагын
 * төрлөөрх шийдлүүд → хэрэглээний жишээ → сэтгэгдэл → уриалга.
 */
import { Eye, Megaphone, UserCog } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import SolutionsSection from '../components/solutions/SolutionsSection';
import UseCasesSection from '../components/solutions/UseCasesSection';
import TestimonialsSection from '../components/testimonials/TestimonialsSection';
import FinalCta from '../components/cta/FinalCta';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/useI18n';

/** 3 дүрийн дүрсүүд (дарааллаар). */
const roleIcons = [UserCog, Megaphone, Eye];

/** "Шийдэл" хуудас. */
export default function Solutions() {
  const { t } = useI18n();
  const p = t.pages.solutions;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription });

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />

      <Section labelledBy="roles-title">
        <SectionHeading id="roles-title" title={p.rolesTitle} align="center" />
        <ul className="mt-8 grid gap-3 sm:mt-12 sm:gap-5 md:grid-cols-3">
          {p.roles.map(({ title, description }, i) => {
            const Icon = roleIcons[i];
            return (
              <li key={title}>
                <Card variant="muted" padding="none" className="h-full p-4 sm:p-6">
                  <Icon size={22} aria-hidden="true" className="size-5 sm:size-[22px] text-brand-600 dark:text-brand-400" />
                  <h3 className="mt-3 text-base font-semibold sm:mt-4 sm:text-lg">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:mt-2 sm:text-base">{description}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      <SolutionsSection />
      <UseCasesSection />
      <TestimonialsSection />
      <FinalCta title={p.ctaTitle} />
    </>
  );
}
