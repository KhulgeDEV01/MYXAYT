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

const roles = [
  {
    icon: UserCog,
    title: 'Зохион байгуулагчид',
    description: 'Хурлын бэлтгэл, ирц, санал хураалт, тэмдэглэлийг нэг дороос удирдаж, цаг хэмнэнэ.',
  },
  {
    icon: Megaphone,
    title: 'Оролцогчдод',
    description: 'Үг хэлэх ээлж хүлээлгүйгээр асуулт, санал, байр сууриа шууд илэрхийлнэ.',
  },
  {
    icon: Eye,
    title: 'Удирдлагад',
    description: 'Шийдвэр бүрийн цаадах санал хураалтын дүн, оролцоог тодорхой харж, тайлагнана.',
  },
];

export default function Solutions() {
  usePageMeta({
    title: 'Шийдэл — компани, байгууллага, ТББ, сургууль, холбоонд',
    description:
      'Компани, төрийн байгууллага, ТББ, их сургууль, холбоо, нийгэмлэг болон төслийн багуудад зориулсан онлайн хурал, санал хураалтын шийдэл.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Шийдэл"
        title="Хурлаар шийдвэр гаргадаг хамт олон бүрт"
        description="ТУЗ-ийн хурлаас эхлээд оюутны санал асуулга хүртэл. Байгууллагынхаа бүтэц, дүрэм журамд нийцүүлэн тохируулаарай."
      />

      <Section labelledBy="roles-title">
        <SectionHeading id="roles-title" title="Хурлын оролцогч бүрт өөр үнэ цэнэ" align="center" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {roles.map(({ icon: Icon, title, description }) => (
            <li key={title}>
              <Card variant="muted" className="h-full">
                <Icon size={22} aria-hidden="true" className="text-brand-600" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <SolutionsSection />
      <UseCasesSection />
      <TestimonialsSection />
      <FinalCta title="Байгууллагадаа тохирох шийдлийг хамтдаа тодорхойлъё." />
    </>
  );
}
