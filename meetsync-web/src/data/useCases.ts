import {
  BookOpenCheck,
  ClipboardList,
  FolderKanban,
  Gavel,
  Handshake,
  PieChart,
  Presentation,
  UsersRound,
} from 'lucide-react';
import type { UseCase } from '../types/content';

export const useCases: UseCase[] = [
  {
    id: 'management',
    icon: Presentation,
    title: 'Удирдлагын хурал',
    description: 'Долоо хоног, сарын удирдлагын хурлын хэлэлцэх асуудал, шийдвэрийг нэг дор.',
    tag: 'Удирдлага',
  },
  {
    id: 'board',
    icon: Gavel,
    title: 'ТУЗ-ийн хурал',
    description: 'Ирцийн босго, нууц санал хураалт, тогтоолын төсөлтэй ТУЗ-ийн хурал.',
    tag: 'Засаглал',
  },
  {
    id: 'staff',
    icon: UsersRound,
    title: 'Ажилтны хурал',
    description: 'Нийт ажилтны хурал дээр асуулт цуглуулж, удирдлага шууд хариулна.',
    tag: 'Хүний нөөц',
  },
  {
    id: 'shareholders',
    icon: PieChart,
    title: 'Хувьцаа эзэмшигчдийн хурал',
    description: 'Хувьцааны жинтэй санал хураалт, ирцийн бүртгэл, үр дүнгийн баримт.',
    tag: 'Засаглал',
  },
  {
    id: 'project',
    icon: FolderKanban,
    title: 'Төслийн хурал',
    description: 'Төслийн явц, эрсдэл, дараагийн алхмыг багаараа хурдан шийдэх.',
    tag: 'Баг',
  },
  {
    id: 'community',
    icon: Handshake,
    title: 'Нийгэмлэгийн хурал',
    description: 'Гишүүдийн ээлжит хурал, сонгууль, санал санаачилгын хэлэлцүүлэг.',
    tag: 'Гишүүнчлэл',
  },
  {
    id: 'education-survey',
    icon: BookOpenCheck,
    title: 'Сургалтын байгууллагын санал асуулга',
    description: 'Хичээл, багш, сургалтын орчны талаарх оюутан, эцэг эхийн санал асуулга.',
    tag: 'Боловсрол',
  },
  {
    id: 'internal-vote',
    icon: ClipboardList,
    title: 'Байгууллагын дотоод санал хураалт',
    description: 'Дүрэм журам, шинэ санаачилга, сонгон шалгаруулалтын дотоод санал хураалт.',
    tag: 'Дотоод',
  },
];
