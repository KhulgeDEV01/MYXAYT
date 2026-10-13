import { Check, ChevronUp, CircleHelp, Hand, Lightbulb, Minus, Vote } from 'lucide-react';
import { participationCapabilities, participationProblems } from '../../data/company';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

/** Decorative stream of participant interactions. */
function InteractionStream() {
  return (
    <div aria-hidden="true" className="relative mx-auto max-w-md space-y-3 lg:max-w-none">
      <div className="rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-200">
        <div className="flex items-center gap-2.5">
          <Avatar name="Солонго Д" size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-navy-950">Солонго Д</p>
            <p className="text-[11px] text-slate-500">Асуулт · 10:24</p>
          </div>
          <Badge tone="brand" size="sm">
            <CircleHelp size={11} /> Асуулт
          </Badge>
        </div>
        <p className="mt-3 text-sm text-navy-900">Шинэ журмыг хэзээнээс мөрдөж эхлэх вэ? Ажилтнуудад сургалт хийх үү?</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 font-semibold text-brand-700">
            <ChevronUp size={13} /> 18
          </span>
          хүн энэ асуултыг дэмжсэн
        </div>
      </div>

      <div className="ml-6 rounded-xl bg-white p-4 shadow-card ring-1 ring-slate-200 sm:ml-10">
        <div className="flex items-center gap-2.5">
          <Avatar name="Нэрээ нууцалсан" size="sm" />
          <p className="flex-1 text-xs font-semibold text-navy-950">Нэрээ нууцалсан оролцогч</p>
          <Badge tone="warning" size="sm">
            <Lightbulb size={11} /> Санал
          </Badge>
        </div>
        <p className="mt-3 text-sm text-navy-900">Журмын төслийг хурлаас 3 хоногийн өмнө тараадаг болвол хэлэлцүүлэг илүү үр дүнтэй болно.</p>
      </div>

      <div className="rounded-xl bg-navy-950 p-4 text-white shadow-card">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-xs font-semibold">
            <Vote size={14} className="text-accent-300" /> Санал хураалт хаагдлаа
          </p>
          <span className="text-[11px] text-navy-300">42 / 44 санал</span>
        </div>
        <p className="mt-2 text-sm font-medium">Шинэ дотоод журмыг батлах уу?</p>
        <div className="mt-3 flex items-center gap-3">
          <ProgressBar value={83} tone="positive" label="Дэмжсэн" trackClassName="bg-white/15" />
          <span className="text-sm font-semibold tabular-nums">83%</span>
        </div>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-success-500/15 px-2 py-1 text-[11px] font-medium text-success-500">
          <Check size={12} /> Шийдвэр батлагдаж, хурлын тэмдэглэлд хадгалагдлаа
        </p>
      </div>

      <div className="ml-6 flex items-center gap-3 rounded-xl bg-white p-3 shadow-card ring-1 ring-slate-200 sm:ml-10">
        <span className="flex size-8 items-center justify-center rounded-md bg-navy-50 text-navy-700">
          <Hand size={16} />
        </span>
        <p className="flex-1 text-xs text-navy-900">
          <span className="font-semibold">Ганбат Э</span> үг хэлэх хүсэлт гаргалаа
        </p>
        <Badge tone="success" size="sm">
          Зөвшөөрсөн
        </Badge>
      </div>
    </div>
  );
}

export default function ParticipationSection() {
  return (
    <Section id="participation" labelledBy="participation-title">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading
            id="participation-title"
            eyebrow="Оролцоо"
            title="Хуралд хүн бүрийн дуу хоолой хүрнэ."
            description="Уламжлалт хурал дээр цөөн хүн ярьж, олонх нь чимээгүй суудаг. Үр дүнд нь шийдвэр хэдхэн хүний байр сууринаас гардаг."
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-500">Ихэнх хуралд тулгардаг асуудал</h3>
              <ul className="mt-4 space-y-3">
                {participationProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <Minus size={12} aria-hidden="true" />
                    </span>
                    {problem}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-brand-700">MeetSync дээр оролцогч бүр</h3>
              <ul className="mt-4 space-y-3">
                {participationCapabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-2.5 text-sm font-medium text-navy-900">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check size={12} aria-hidden="true" />
                    </span>
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <blockquote className="mt-10 border-l-2 border-brand-600 pl-5 text-lg font-medium text-navy-950">
            Хүн бүрийн санал бодлыг нэг дор цуглуул. Шийдвэр гаргалтыг илүү ил тод болго.
          </blockquote>
        </div>

        <Reveal>
          <InteractionStream />
        </Reveal>
      </div>
    </Section>
  );
}
