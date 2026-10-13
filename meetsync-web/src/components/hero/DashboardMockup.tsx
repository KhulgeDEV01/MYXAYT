import { useEffect, useState } from 'react';
import {
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  CircleHelp,
  Clock,
  FileText,
  Hand,
  History,
  LayoutDashboard,
  Lightbulb,
  Users,
  Vote,
} from 'lucide-react';
import { heroActivity, heroMeeting, heroPollOptions } from '../../data/demo';
import { useInView } from '../../hooks/useInView';
import { toPercent } from '../../utils/format';
import { cn } from '../../utils/cn';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import ActivityFeed from './ActivityFeed';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Хяналт', active: true },
  { icon: Users, label: 'Оролцогчид' },
  { icon: FileText, label: 'Материал' },
  { icon: Vote, label: 'Санал хураалт' },
  { icon: History, label: 'Түүх' },
];

const avatarNames = ['Бат Ганзориг', 'Оюун Дорж', 'Сараа Бат', 'Тэмүүжин Энх'];

/**
 * Product dashboard mockup built with real components (no screenshots),
 * so it stays crisp, responsive and easy to update. Purely decorative —
 * hidden from assistive tech; the figcaption describes it instead.
 */
export default function DashboardMockup() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setAnimate(true), 250);
    return () => window.clearTimeout(t);
  }, [inView]);

  const totalVotes = heroPollOptions.reduce((sum, o) => sum + o.votes, 0);
  const support = toPercent(heroPollOptions[0].votes, totalVotes);

  return (
    <figure ref={ref} className="relative">
      <figcaption className="sr-only">
        MeetSync хяналтын самбарын жишээ: “{heroMeeting.title}” хуралд {heroMeeting.participants} оролцогч нэгдэж, “
        {heroMeeting.question}” асуултаар санал хураалт явагдаж байна. {support}% нь дэмжсэн.
      </figcaption>

      <div aria-hidden="true" className="relative">
        {/* App window */}
        <div className="overflow-hidden rounded-xl bg-white shadow-elevated ring-1 ring-navy-900/10">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-slate-300" />
            </div>
            <div className="mx-auto hidden max-w-xs flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-[11px] text-slate-500 ring-1 ring-slate-200 sm:block">
              app.meetsync.mn/meetings/strategy-2026-10
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <aside className="hidden w-40 shrink-0 bg-navy-950 p-3 md:block">
              <p className="px-2 pt-1 pb-3 text-[10px] font-semibold tracking-wider text-navy-400 uppercase">Хурал</p>
              <ul className="space-y-0.5">
                {sidebarItems.map(({ icon: Icon, label, active }) => (
                  <li
                    key={label}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]',
                      active ? 'bg-brand-600 font-medium text-white' : 'text-navy-300',
                    )}
                  >
                    <Icon size={13} />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg bg-white/5 p-2.5 ring-1 ring-white/10">
                <p className="text-[10px] text-navy-300">Ирц</p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  46 / {heroMeeting.participants}
                </p>
                <ProgressBar value={96} tone="accent" size="xs" label="Ирц" trackClassName="mt-2 bg-white/10" />
              </div>
            </aside>

            {/* Main */}
            <div className="min-w-0 flex-1 p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-wider text-brand-600">{heroMeeting.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-navy-950 sm:text-base">{heroMeeting.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock size={11} /> {heroMeeting.type} · {heroMeeting.time}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {avatarNames.map((name) => (
                      <Avatar key={name} name={name} size="xs" className="ring-2 ring-white" />
                    ))}
                    <span className="flex size-6 items-center justify-center rounded-full bg-slate-100 text-[9px] font-semibold text-slate-600 ring-2 ring-white">
                      +{heroMeeting.participants - avatarNames.length}
                    </span>
                  </div>
                  <Badge tone="live" dot size="sm">
                    Шууд · {heroMeeting.elapsed}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-5">
                {/* Live vote */}
                <div className="rounded-lg p-3.5 ring-1 ring-slate-200 lg:col-span-3">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold text-navy-900">
                      <Vote size={13} className="text-brand-600" /> Санал хураалт #{heroMeeting.pollNumber}
                    </p>
                    <Badge tone="success" size="sm">
                      Нээлттэй
                    </Badge>
                  </div>
                  <p className="mt-2.5 text-[13px] font-semibold text-navy-950">{heroMeeting.question}</p>
                  <div className="mt-3 space-y-2.5">
                    {heroPollOptions.map((option) => {
                      const pct = toPercent(option.votes, totalVotes);
                      return (
                        <div key={option.id}>
                          <div className="mb-1 flex justify-between text-[11px]">
                            <span className="text-slate-700">{option.label}</span>
                            <span className="font-semibold text-navy-950 tabular-nums">
                              {pct}% <span className="font-normal text-slate-400">· {option.votes}</span>
                            </span>
                          </div>
                          <ProgressBar value={animate ? pct : 0} tone={option.tone} label={option.label} />
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[10px] text-slate-500">
                    {totalVotes} / {heroMeeting.participants} оролцогч санал өгсөн
                  </p>
                </div>

                {/* Activity */}
                <div className="rounded-lg p-3.5 ring-1 ring-slate-200 lg:col-span-2">
                  <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold text-navy-900">
                    <span className="size-1.5 animate-live-dot rounded-full bg-success-500" />
                    Бодит цагийн идэвх
                  </p>
                  <ActivityFeed events={heroActivity} visible={4} active={inView} />
                </div>
              </div>

              {/* Counters */}
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { icon: CircleHelp, label: 'Асуулт', value: heroMeeting.counters.questions },
                  { icon: Lightbulb, label: 'Санал', value: heroMeeting.counters.suggestions },
                  { icon: Hand, label: 'Хүсэлт', value: heroMeeting.counters.requests },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 ring-1 ring-slate-200/70">
                    <Icon size={14} className="shrink-0 text-brand-600" />
                    <span className="truncate text-[11px] text-slate-600">{label}</span>
                    <span className="ml-auto text-sm font-semibold text-navy-950 tabular-nums">{value}</span>
                  </div>
                ))}
              </div>

              {/* Decision status */}
              <div className="mt-3 flex flex-col gap-3 rounded-lg bg-navy-950 p-3.5 text-white sm:flex-row sm:items-center">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-success-500/15 text-success-500">
                  <CircleCheck size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold">Шийдвэрийн төлөв: батлах босгыг давсан</p>
                  <p className="text-[10px] text-navy-300">
                    Дэмжсэн {support}% · Батлах босго {heroMeeting.passThreshold}% · Ирц хүрэлцээтэй
                  </p>
                </div>
                <div className="w-full sm:w-32">
                  <ProgressBar
                    value={animate ? support : 0}
                    tone="positive"
                    size="xs"
                    marker={heroMeeting.passThreshold}
                    label="Батлах босготой харьцуулсан дэмжлэг"
                    trackClassName="bg-white/15"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating participant phone */}
        <div className="absolute -bottom-10 -left-8 hidden w-44 animate-float rounded-[1.4rem] bg-navy-950 p-1.5 shadow-elevated xl:block">
          <div className="rounded-[1.1rem] bg-white p-3">
            <div className="mx-auto mb-2.5 h-1 w-10 rounded-full bg-slate-200" />
            <p className="text-[9px] font-semibold tracking-wider text-brand-600 uppercase">Таны санал</p>
            <p className="mt-1 text-[11px] leading-snug font-semibold text-navy-950">{heroMeeting.question}</p>
            <div className="mt-2.5 space-y-1.5">
              <div className="flex items-center justify-between rounded-md bg-success-500 px-2 py-1.5 text-[10px] font-semibold text-white">
                Дэмжиж байна <CircleCheck size={12} />
              </div>
              <div className="rounded-md px-2 py-1.5 text-[10px] text-slate-600 ring-1 ring-slate-200">Татгалзаж байна</div>
              <div className="rounded-md px-2 py-1.5 text-[10px] text-slate-600 ring-1 ring-slate-200">Түдгэлзсэн</div>
            </div>
            <p className="mt-2 text-center text-[9px] text-success-600">Саналаа илгээлээ</p>
          </div>
        </div>

        {/* Floating result chip */}
        <div className="absolute -top-5 -right-4 hidden items-center gap-2.5 rounded-lg bg-white px-3 py-2 shadow-card ring-1 ring-slate-200 lg:flex">
          <span className="flex size-7 items-center justify-center rounded-md bg-brand-50 text-brand-600">
            <ChartNoAxesColumnIncreasing size={15} />
          </span>
          <div>
            <p className="text-[10px] text-slate-500">Үр дүн шинэчлэгдлээ</p>
            <p className="text-xs font-semibold text-navy-950">Дэмжсэн {support}%</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
