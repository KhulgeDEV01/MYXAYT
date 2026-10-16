/**
 * workflow.ts — Хурлын явцын алхмууд.
 *
 * Текст засах: доорх `mn:` хэсэгт монгол, `en:` хэсэгт англи хувилбарыг засна.
 * Хоёр хэлэнд ижил `id`-тай байх ёстой.
 */
import {
  Archive,
  CalendarPlus,
  ChartNoAxesColumnIncreasing,
  CircleCheckBig,
  LogIn,
  MessageCircleQuestion,
  MessagesSquare,
  Send,
  SquareCheckBig,
  UserPlus,
  Vote,
} from 'lucide-react';
import type { ProcessStep, WorkflowActor, WorkflowStep } from '../types/content';
import type { Localized } from '../i18n/types';

/** "Хэрхэн ажилладаг вэ" хэсгийн хялбарчилсан 4 алхам. */
export const processSteps: Localized<ProcessStep[]> = {
  mn: [
    { id: 'create', icon: CalendarPlus, title: 'Хурлаа үүсгэ', description: 'Хурлын нэр, огноо, хэлэлцэх асуудал, материалаа оруулаад хэдхэн минутад бэлэн болгоно.' },
    { id: 'invite', icon: UserPlus, title: 'Оролцогчдоо урь', description: 'Имэйл эсвэл холбоосоор урилга илгээж, хэн оролцох, хэн санал өгөх эрхтэйг тохируулна.' },
    { id: 'collect', icon: MessagesSquare, title: 'Санал бодол, санал хураалтаа аваарай', description: 'Хэлэлцүүлгийн явцад асуулт, санал, хүсэлт цуглуулж, асуудал бүрээр санал хураана.' },
    { id: 'decide', icon: CircleCheckBig, title: 'Үр дүнд үндэслэн шийдвэр гарга', description: 'Бодит цагийн үр дүнд тулгуурлан шийдвэрээ баталж, хурлын тэмдэглэлд автоматаар хадгална.' },
  ],
  en: [
    { id: 'create', icon: CalendarPlus, title: 'Create your meeting', description: 'Add the title, date, agenda and materials — ready in a few minutes.' },
    { id: 'invite', icon: UserPlus, title: 'Invite participants', description: 'Send invitations by email or link and set who can attend and who can vote.' },
    { id: 'collect', icon: MessagesSquare, title: 'Collect feedback and votes', description: 'Gather questions, suggestions and requests during discussion, and vote on each agenda item.' },
    { id: 'decide', icon: CircleCheckBig, title: 'Decide based on the results', description: 'Approve decisions using live results; they are saved to the meeting minutes automatically.' },
  ],
};

/** "Хурлын бүтэн мөчлөг": хурал үүсгэхээс архивлах хүртэл хэн юу хийх вэ. `actor` нь өнгийг тодорхойлно. */
export const productWorkflow: Localized<WorkflowStep[]> = {
  mn: [
    { id: 'create', actor: 'organizer', title: 'Хурал үүсгэнэ', icon: CalendarPlus },
    { id: 'invite', actor: 'organizer', title: 'Оролцогчдыг урина', icon: UserPlus },
    { id: 'join', actor: 'participant', title: 'Хуралд нэгдэнэ', icon: LogIn },
    { id: 'discuss', actor: 'organizer', title: 'Хэлэлцүүлэг эхлүүлнэ', icon: MessagesSquare },
    { id: 'submit', actor: 'participant', title: 'Асуулт, санал, хүсэлт илгээнэ', icon: MessageCircleQuestion },
    { id: 'poll', actor: 'organizer', title: 'Санал хураалт үүсгэнэ', icon: Send },
    { id: 'vote', actor: 'participant', title: 'Санал өгнө', icon: Vote },
    { id: 'results', actor: 'system', title: 'Үр дүн бодит цагт шинэчлэгдэнэ', icon: ChartNoAxesColumnIncreasing },
    { id: 'decide', actor: 'organization', title: 'Шийдвэр гаргана', icon: SquareCheckBig },
    { id: 'archive', actor: 'system', title: 'Хурлын үр дүн хадгалагдана', icon: Archive },
  ],
  en: [
    { id: 'create', actor: 'organizer', title: 'Creates the meeting', icon: CalendarPlus },
    { id: 'invite', actor: 'organizer', title: 'Invites participants', icon: UserPlus },
    { id: 'join', actor: 'participant', title: 'Join the meeting', icon: LogIn },
    { id: 'discuss', actor: 'organizer', title: 'Opens the discussion', icon: MessagesSquare },
    { id: 'submit', actor: 'participant', title: 'Send questions, suggestions, requests', icon: MessageCircleQuestion },
    { id: 'poll', actor: 'organizer', title: 'Starts a vote', icon: Send },
    { id: 'vote', actor: 'participant', title: 'Cast votes', icon: Vote },
    { id: 'results', actor: 'system', title: 'Results update in real time', icon: ChartNoAxesColumnIncreasing },
    { id: 'decide', actor: 'organization', title: 'Makes the decision', icon: SquareCheckBig },
    { id: 'archive', actor: 'system', title: 'Meeting outcome is saved', icon: Archive },
  ],
};

/** Мөчлөгийн өнгөний тайлбарын нэрс (Зохион байгуулагч, Оролцогч…). */
export const workflowActorLabels: Localized<Record<WorkflowActor, string>> = {
  mn: { organizer: 'Зохион байгуулагч', participant: 'Оролцогч', system: 'Систем', organization: 'Байгууллага' },
  en: { organizer: 'Organizer', participant: 'Participants', system: 'System', organization: 'Organization' },
};
