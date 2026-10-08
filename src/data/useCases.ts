import { BookOpenCheck, ClipboardList, FolderKanban, Gavel, Handshake, PieChart, Presentation, UsersRound } from 'lucide-react';
import type { UseCase } from '../types/content';
import type { Localized } from '../i18n/types';

export const useCases: Localized<UseCase[]> = {
  mn: [
    { id: 'management', icon: Presentation, title: 'Удирдлагын хурал', description: 'Долоо хоног, сарын удирдлагын хурлын хэлэлцэх асуудал, шийдвэрийг нэг дор.', tag: 'Удирдлага' },
    { id: 'board', icon: Gavel, title: 'ТУЗ-ийн хурал', description: 'Ирцийн босго, нууц санал хураалт, тогтоолын төсөлтэй ТУЗ-ийн хурал.', tag: 'Засаглал' },
    { id: 'staff', icon: UsersRound, title: 'Ажилтны хурал', description: 'Нийт ажилтны хурал дээр асуулт цуглуулж, удирдлага шууд хариулна.', tag: 'Хүний нөөц' },
    { id: 'shareholders', icon: PieChart, title: 'Хувьцаа эзэмшигчдийн хурал', description: 'Хувьцааны жинтэй санал хураалт, ирцийн бүртгэл, үр дүнгийн баримт.', tag: 'Засаглал' },
    { id: 'project', icon: FolderKanban, title: 'Төслийн хурал', description: 'Төслийн явц, эрсдэл, дараагийн алхмыг багаараа хурдан шийдэх.', tag: 'Баг' },
    { id: 'community', icon: Handshake, title: 'Нийгэмлэгийн хурал', description: 'Гишүүдийн ээлжит хурал, сонгууль, санал санаачилгын хэлэлцүүлэг.', tag: 'Гишүүнчлэл' },
    { id: 'education-survey', icon: BookOpenCheck, title: 'Сургалтын байгууллагын санал асуулга', description: 'Хичээл, багш, сургалтын орчны талаарх оюутан, эцэг эхийн санал асуулга.', tag: 'Боловсрол' },
    { id: 'internal-vote', icon: ClipboardList, title: 'Байгууллагын дотоод санал хураалт', description: 'Дүрэм журам, шинэ санаачилга, сонгон шалгаруулалтын дотоод санал хураалт.', tag: 'Дотоод' },
  ],
  en: [
    { id: 'management', icon: Presentation, title: 'Management meetings', description: 'Agendas and decisions from weekly and monthly leadership meetings in one place.', tag: 'Leadership' },
    { id: 'board', icon: Gavel, title: 'Board meetings', description: 'Board meetings with quorum rules, secret ballots and draft resolutions.', tag: 'Governance' },
    { id: 'staff', icon: UsersRound, title: 'All-hands meetings', description: 'Collect questions at company-wide meetings and let leadership answer them live.', tag: 'People' },
    { id: 'shareholders', icon: PieChart, title: 'Shareholder meetings', description: 'Share-weighted voting, attendance records and documented results.', tag: 'Governance' },
    { id: 'project', icon: FolderKanban, title: 'Project meetings', description: 'Agree quickly as a team on progress, risks and next steps.', tag: 'Teams' },
    { id: 'community', icon: Handshake, title: 'Community meetings', description: 'Regular member meetings, elections and discussions of new initiatives.', tag: 'Membership' },
    { id: 'education-survey', icon: BookOpenCheck, title: 'Education surveys', description: 'Student and parent surveys on courses, teachers and the learning environment.', tag: 'Education' },
    { id: 'internal-vote', icon: ClipboardList, title: 'Internal voting', description: 'Internal votes on policies, new initiatives and selection processes.', tag: 'Internal' },
  ],
};
