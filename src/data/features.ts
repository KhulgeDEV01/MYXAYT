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
import type { Localized } from '../i18n/types';

export const coreFeatures: Localized<Feature[]> = {
  mn: [
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
  ],
  en: [
    {
      id: 'meetings',
      icon: Video,
      title: 'Online meetings',
      description: 'Team and organization members join the same meeting from anywhere and share information in one place.',
      points: ['Agenda and meeting schedule', 'Attendance tracking and verification', 'All meeting materials together'],
    },
    {
      id: 'voting',
      icon: Vote,
      title: 'Online voting',
      description: 'Vote on each question or agenda item during the meeting and watch the results in real time.',
      points: ['Open and secret ballots', 'Quorum and approval threshold settings', 'Separate votes per agenda item'],
    },
    {
      id: 'opinions',
      icon: MessageSquareText,
      title: 'Real-time feedback',
      description: 'Participants can share their opinions, positions and suggestions directly.',
      points: ['State a position with one tap', 'Option to post anonymously', 'View feedback grouped by topic'],
    },
    {
      id: 'questions',
      icon: MessagesSquare,
      title: 'Questions and requests',
      description: 'Collect questions and requests during the meeting and discuss them in order of priority.',
      points: ['Rank questions by upvotes', 'Track the status of requests', 'Mark questions as answered'],
    },
    {
      id: 'results',
      icon: ChartNoAxesColumnIncreasing,
      title: 'Live results',
      description: 'See voting results as they come in.',
      points: ['Show results on the room’s main display', 'Breakdown by percentage and count', 'Compared against attendance'],
    },
    {
      id: 'history',
      icon: History,
      title: 'Meeting history',
      description: 'Keep past meetings, votes, decisions and results together in one place.',
      points: ['Archive of decisions and results', 'Minutes and reports', 'Search and filters'],
    },
  ],
};

export const devices: Localized<Feature[]> = {
  mn: [
    { id: 'desktop', icon: Laptop, title: 'Компьютер', description: 'Зохион байгуулагч хурлаа удирдаж, санал хураалт үүсгэн, үр дүнг хянана.' },
    { id: 'mobile', icon: Smartphone, title: 'Гар утас', description: 'Оролцогч хаанаас ч нэгдэж, санал өгч, асуулт, хүсэлтээ илгээнэ.' },
    { id: 'tablet', icon: Tablet, title: 'Таблет', description: 'Танхимын хурал дээр суудал бүрт байрлуулж, саналаа шууд өгөх боломжтой.' },
    { id: 'display', icon: MonitorPlay, title: 'Хурлын дэлгэц', description: 'Хэлэлцэж буй асуудал, санал хураалтын үр дүнг танхимын том дэлгэцэнд харуулна.' },
  ],
  en: [
    { id: 'desktop', icon: Laptop, title: 'Computer', description: 'Organizers run the meeting, create votes and monitor the results.' },
    { id: 'mobile', icon: Smartphone, title: 'Phone', description: 'Participants join from anywhere, vote, and send questions and requests.' },
    { id: 'tablet', icon: Tablet, title: 'Tablet', description: 'Place one at every seat in the room so attendees can vote on the spot.' },
    { id: 'display', icon: MonitorPlay, title: 'Room display', description: 'Show the current agenda item and voting results on the room’s main screen.' },
  ],
};
