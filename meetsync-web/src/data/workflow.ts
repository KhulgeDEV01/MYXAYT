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

/** The simplified 4-step story used in "Хэрхэн ажилладаг вэ?". */
export const processSteps: ProcessStep[] = [
  {
    id: 'create',
    icon: CalendarPlus,
    title: 'Хурлаа үүсгэ',
    description: 'Хурлын нэр, огноо, хэлэлцэх асуудал, материалаа оруулаад хэдхэн минутад бэлэн болгоно.',
  },
  {
    id: 'invite',
    icon: UserPlus,
    title: 'Оролцогчдоо урь',
    description: 'Имэйл эсвэл холбоосоор урилга илгээж, хэн оролцох, хэн санал өгөх эрхтэйг тохируулна.',
  },
  {
    id: 'collect',
    icon: MessagesSquare,
    title: 'Санал бодол, санал хураалтаа аваарай',
    description: 'Хэлэлцүүлгийн явцад асуулт, санал, хүсэлт цуглуулж, асуудал бүрээр санал хураана.',
  },
  {
    id: 'decide',
    icon: CircleCheckBig,
    title: 'Үр дүнд үндэслэн шийдвэр гарга',
    description: 'Бодит цагийн үр дүнд тулгуурлан шийдвэрээ баталж, хурлын тэмдэглэлд автоматаар хадгална.',
  },
];

/** Full product workflow: who does what, from meeting creation to archive. */
export const productWorkflow: WorkflowStep[] = [
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
];

export const workflowActorLabels: Record<WorkflowActor, string> = {
  organizer: 'Зохион байгуулагч',
  participant: 'Оролцогч',
  system: 'Систем',
  organization: 'Байгууллага',
};
