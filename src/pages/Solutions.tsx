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

const roleIcons = [UserCog, Megaphone, Eye];

export default function Solutions() {
  const { t } = useI18n();
  const p = t.pages.solutions;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription });

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />

      <Section labelledBy="roles-title">
        <SectionHeading id="roles-title" title={p.rolesTitle} align="center" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {p.roles.map(({ title, description }, i) => {
            const Icon = roleIcons[i];
            return (
              <li key={title}>
                <Card variant="muted" className="h-full">
                  <Icon size={22} aria-hidden="true" className="text-brand-600 dark:text-brand-400" />
                  <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
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
