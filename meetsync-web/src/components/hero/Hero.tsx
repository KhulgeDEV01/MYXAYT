import { ArrowRight, CirclePlay, LockKeyhole, MonitorSmartphone, UsersRound } from 'lucide-react';
import { routes } from '../../config/routes';
import Button from '../ui/Button';
import Container from '../ui/Container';
import DashboardMockup from './DashboardMockup';

const highlights = [
  { icon: LockKeyhole, label: 'Хандалтын удирдлага, нууцлал' },
  { icon: MonitorSmartphone, label: 'Компьютер, утас, таблетаас' },
  { icon: UsersRound, label: 'Бүх төрлийн байгууллагад' },
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,black,transparent)]"
      />
      <div aria-hidden="true" className="absolute top-0 right-0 h-[560px] w-[60%] bg-brand-50/70 [clip-path:polygon(18%_0,100%_0,100%_100%,0_78%)]" />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="animate-fade-up lg:col-span-6 xl:col-span-5">
            <p className="inline-flex items-center gap-2 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-navy-800 shadow-soft ring-1 ring-slate-200">
              <span className="size-1.5 rounded-full bg-accent-500" aria-hidden="true" />
              Хурал · Хэлэлцүүлэг · Санал хураалт · Шийдвэр
            </p>
            <h1
              id="hero-title"
              className="mt-6 text-[2.1rem] leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-[2.6rem] xl:text-[2.9rem]"
            >
              <span className="block">Хурлаа илүү ухаалаг.</span>
              <span className="block">Санал бодлоо илүү шууд.</span>
              <span className="block text-brand-600">Шийдвэрээ илүү хамтдаа.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-slate-600">
              Онлайн хурал, санал асуулга, санал хураалт болон оролцогчдын шууд санал бодлыг нэг платформд. Хурал
              бүрийн шийдвэр хэрхэн гарсныг хүн бүр харна.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to={routes.signup} size="lg" iconRight={ArrowRight}>
                Үнэгүй эхлэх
              </Button>
              <Button to={routes.howItWorks} size="lg" variant="secondary" iconLeft={CirclePlay}>
                Хэрхэн ажилладаг вэ?
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">Карт шаардлагагүй · 25 хүртэл оролцогчтой хурлыг үнэгүй</p>

            <ul className="mt-10 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-600" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:150ms] lg:col-span-6 xl:col-span-7">
            <DashboardMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
