import PageHeader from '../components/layout/PageHeader';
import TrustSection from '../components/trust/TrustSection';
import FinalCta from '../components/cta/FinalCta';
import Card from '../components/ui/Card';
import Reveal from '../components/ui/Reveal';
import Section from '../components/ui/Section';
import SectionHeading from '../components/ui/SectionHeading';
import { companyValues } from '../data/company';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';

const principles = [
  {
    title: 'Бид юу бүтээж байна вэ?',
    body: 'Хурал бол байгууллагын шийдвэр гардаг гол газар. Гэвч ихэнх хурал дээр цөөн хүний дуу хоолой давамгайлж, гаргасан санал, асуулт тэмдэглэгдэлгүй үлддэг. MeetSync нь хурлыг оролцогч бүрийн санал тоологддог, шийдвэр нь баримтжсан процесс болгох зорилготой.',
  },
  {
    title: 'Яагаад энэ чухал вэ?',
    body: 'Хүмүүс өөрсдийн оролцсон шийдвэрийг илүү хүлээн зөвшөөрч, хэрэгжүүлдэг. Ил тод санал хураалт, хадгалагдсан үр дүн нь байгууллага доторх итгэлцлийг бэхжүүлж, ижил асуудлыг дахин дахин хэлэлцэхээс сэргийлнэ.',
  },
  {
    title: 'Бид хэрхэн ажилладаг вэ?',
    body: 'Монгол байгууллагуудын хурлын соёл, дүрэм журам, хэрэгцээнд нийцүүлэн хөгжүүлдэг. Хэрэглэгчдийнхээ санал хүсэлтийг бүтээгдэхүүндээ тогтмол тусгадаг — яг л бидний бүтээгдэхүүн танд санал тань тоологдохыг амладаг шиг.',
  },
];

export default function About() {
  usePageMeta({
    title: 'Бидний тухай',
    description: `${siteConfig.name} — байгууллагын хурал, шийдвэр гаргалтыг илүү ил тод, оролцоотой болгох зорилготой Монгол SaaS компани.`,
  });

  return (
    <>
      <PageHeader
        eyebrow="Бидний тухай"
        title="Хурал бүрийг шийдвэр гаргах илүү сайн орчин болгоно"
        description={`${siteConfig.name} нь байгууллага, баг, хамт олны хурлыг илүү ил тод, оролцоотой, үр дүнтэй болгох зорилготой.`}
      />

      <Section labelledBy="mission-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="mission-title" eyebrow="Эрхэм зорилго" title="Хэлэгдээгүй санал үлдэхгүй байх" />
          </div>
          <div className="space-y-10 lg:col-span-8">
            {principles.map((item) => (
              <Reveal key={item.title}>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <TrustSection />

      <Section labelledBy="values-title">
        <SectionHeading id="values-title" eyebrow="Үнэт зүйлс" title="Бидний баримталдаг зарчим" align="center" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {companyValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal as="li" key={value.id} delay={index * 70}>
                <Card className="h-full">
                  <Icon size={22} aria-hidden="true" className="text-brand-600" />
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </Card>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <FinalCta title="Хамтдаа илүү сайн хурал хийцгээе." />
    </>
  );
}
