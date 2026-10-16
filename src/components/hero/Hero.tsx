/**
 * Hero.tsx — Нүүр хуудасны хамгийн дээд, анхны харагдах хэсэг.
 *
 * Зүүн талд: шошго, том гарчиг, тайлбар, "Үнэгүй эхлэх" / "Хэрхэн ажилладаг вэ?" товч,
 * 3 давуу тал. Баруун талд (утсан дээр доор): бүтээгдэхүүний самбарын жишээ.
 * Бүх текст i18n толины `hero` хэсгээс ирнэ.
 */
import { ArrowRight, CirclePlay, LockKeyhole, MonitorSmartphone, UsersRound } from 'lucide-react';
import { routes } from '../../config/routes';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import Container from '../ui/Container';
import DashboardMockup from './DashboardMockup';

/** Доод 3 давуу талын дүрсүүд (дарааллаар). */
const highlightIcons = [LockKeyhole, MonitorSmartphone, UsersRound];

/** Нүүр хуудасны эхний хэсэг. */
export default function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-surface pt-24 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-28">
      {/* Ар талын чимэглэл: тор хээ ба баруун дээд талын цайвар налуу дүрс. */}
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_60%_30%,black,transparent)]"
      />
      <div aria-hidden="true" className="absolute top-0 right-0 h-[560px] w-[60%] bg-brand-50/70 [clip-path:polygon(18%_0,100%_0,100%_100%,0_78%)]" />

      <Container className="relative">
        <div className="grid items-center gap-12 sm:gap-16 xl:grid-cols-12 xl:gap-10">
          <div className="max-w-2xl animate-fade-up xl:col-span-5 xl:max-w-none">
            <p className="inline-flex items-center gap-2 rounded-md bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted shadow-soft ring-1 ring-slate-200">
              <span className="size-1.5 rounded-full bg-accent-500" aria-hidden="true" />
              {h.badge}
            </p>
            {/* Гарчгийн мөр бүр шинэ мөрөнд; сүүлийн мөр нь цэнхэр өнгөтэй. */}
            <h1
              id="hero-title"
              className="mt-5 text-[1.75rem] leading-[1.15] sm:mt-6 font-semibold tracking-tight sm:text-5xl xl:text-[2.9rem]"
            >
              {h.titleLines.map((line, i) => (
                <span key={line} className={cn('block', i === h.titleLines.length - 1 && 'text-brand-600 dark:text-brand-400')}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed sm:mt-6 sm:text-lg text-pretty text-slate-600">{h.description}</p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Button to={routes.signup} size="lg" iconRight={ArrowRight}>
                {h.primaryCta}
              </Button>
              <Button to={routes.howItWorks} size="lg" variant="secondary" iconLeft={CirclePlay}>
                {h.secondaryCta}
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">{h.note}</p>

            {/* 3 давуу тал (нууцлал, төхөөрөмж, байгууллага). */}
            <ul className="mt-8 grid gap-3 border-t sm:mt-10 sm:gap-4 border-slate-200 pt-6 sm:grid-cols-3">
              {h.highlights.map((label, i) => {
                const Icon = highlightIcons[i];
                return (
                  <li key={label} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Самбарын жишээ — бичвэрээс бага зэрэг хойно гарч ирнэ. */}
          <div className="animate-fade-up [animation-delay:150ms] xl:col-span-7">
            <DashboardMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
