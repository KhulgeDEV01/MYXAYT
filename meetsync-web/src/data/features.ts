import {
  ChartNoAxesColumnIncreasing,
  History,
  Laptop,
  MessageSquareText,
  MessagesSquare,
  MonitorPlay,
  Smartphone,
  Tablet,
  Video,
  Vote,
} from 'lucide-react';
import type { Feature } from '../types/content';

export const coreFeatures: Feature[] = [
  {
    id: 'meetings',
    icon: Video,
    title: 'Онлайн хурал',
    description: 'Баг, байгууллагын гишүүд хаанаас ч нэг хуралд нэгдэж, мэдээллээ нэг дор хуваалцана.',
    points: ['Хэлэлцэх асуудал, хурлын хуваарь', 'Ирц бүртгэл ба баталгаажуулалт', 'Хурлын материал нэг дор'],
  },
  {
    id: 'voting',
    icon: Vote,
    title: 'Онлайн санал хураалт',
    description: 'Хурал дундуур асуулт, асуудал бүрээр шууд санал хурааж, үр дүнг бодит цагт хараарай.',
    points: ['Ил болон нууц санал хураалт', 'Ирцийн босго, батлах хувийн тохиргоо', 'Асуудал бүрээр тусдаа санал'],
  },
  {
    id: 'opinions',
    icon: MessageSquareText,
    title: 'Шууд санал бодол',
    description: 'Оролцогчид өөрийн санал бодол, байр суурь, санал хүсэлтээ шууд илэрхийлэх боломжтой.',
    points: ['Байр сууриа нэг товшилтоор илэрхийлэх', 'Нэрээ нууцлах сонголт', 'Сэдвээр нь ангилж харах'],
  },
  {
    id: 'questions',
    icon: MessagesSquare,
    title: 'Асуулт ба хүсэлт',
    description: 'Хурлын үеэр асуулт болон хүсэлтийг цуглуулж, эрэмбэлэн хэлэлцүүлээрэй.',
    points: ['Дэмжлэгээр нь асуултыг эрэмбэлэх', 'Хүсэлтийн явцыг хянах', 'Хариулсан асуултыг тэмдэглэх'],
  },
  {
    id: 'results',
    icon: ChartNoAxesColumnIncreasing,
    title: 'Бодит цагийн үр дүн',
    description: 'Санал хураалтын үр дүнг бодит цагт харах боломжтой.',
    points: ['Хурлын том дэлгэц дээр шууд харуулах', 'Хувь болон тоогоор задаргаа', 'Ирцтэй харьцуулсан үзүүлэлт'],
  },
  {
    id: 'history',
    icon: History,
    title: 'Хурлын түүх',
    description: 'Өмнөх хурлууд, санал хураалт, шийдвэрүүд болон үр дүнг нэг дор хадгална.',
    points: ['Шийдвэр, үр дүнгийн архив', 'Хурлын тэмдэглэл, тайлан', 'Хайлт ба шүүлтүүр'],
  },
];

export const devices: Feature[] = [
  {
    id: 'desktop',
    icon: Laptop,
    title: 'Компьютер',
    description: 'Зохион байгуулагч хурлаа удирдаж, санал хураалт үүсгэн, үр дүнг хянана.',
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Гар утас',
    description: 'Оролцогч хаанаас ч нэгдэж, санал өгч, асуулт, хүсэлтээ илгээнэ.',
  },
  {
    id: 'tablet',
    icon: Tablet,
    title: 'Таблет',
    description: 'Танхимын хурал дээр суудал бүрт байрлуулж, саналаа шууд өгөх боломжтой.',
  },
  {
    id: 'display',
    icon: MonitorPlay,
    title: 'Хурлын дэлгэц',
    description: 'Хэлэлцэж буй асуудал, санал хураалтын үр дүнг танхимын том дэлгэцэнд харуулна.',
  },
];
