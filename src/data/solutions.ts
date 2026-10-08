import { Building2, Briefcase, GraduationCap, HandHeart, Landmark, UsersRound } from 'lucide-react';
import type { Solution } from '../types/content';
import type { Localized } from '../i18n/types';

export const solutions: Localized<Solution[]> = {
  mn: [
    {
      id: 'organization',
      icon: Landmark,
      title: 'Байгууллага',
      description: 'Төрийн болон хувийн байгууллагын удирдлагын хурал, зөвлөлийн хурлыг ил тод, баримтжуулсан хэлбэрээр зохион байгуулна.',
      benefits: ['Ирц, санал хураалтын баримт', 'Хэлтэс, нэгжээр эрх тохируулах', 'Шийдвэрийн архив'],
    },
    {
      id: 'company',
      icon: Building2,
      title: 'Компани',
      description: 'ТУЗ, хувьцаа эзэмшигчид, удирдлагын багийн хурлыг цаг хэмнэлттэй явуулж, шийдвэрээ хурдан батална.',
      benefits: ['Хувьцаа эзэмшигчдийн санал хураалт', 'Нууц санал хураалтын горим', 'Хурлын тайлан'],
    },
    {
      id: 'ngo',
      icon: HandHeart,
      title: 'ТББ',
      description: 'Гишүүд, сайн дурынхан, хамтрагчдынхаа санал бодлыг тогтмол сонсож, шийдвэрээ хамтдаа гаргана.',
      benefits: ['Гишүүдийн санал асуулга', 'Алсаас оролцох боломж', 'Үр дүнг гишүүдтэй хуваалцах'],
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Сургууль, их сургууль',
      description: 'Багшийн зөвлөл, эрдмийн зөвлөл, оюутны холбооны хурал болон сургалтын чанарын санал асуулгад.',
      benefits: ['Эрдмийн зөвлөлийн санал хураалт', 'Оюутны санал асуулга', 'Олон оролцогчтой арга хэмжээ'],
    },
    {
      id: 'association',
      icon: UsersRound,
      title: 'Холбоо, нийгэмлэг',
      description: 'Гишүүдийн их хурал, ээлжит хурал, сонгуулийг олон зуун оролцогчтой ч эмх цэгцтэй явуулна.',
      benefits: ['Гишүүнчлэлээр санал өгөх эрх', 'Ирцийн босго хяналт', 'Хурлын дэлгэц'],
    },
    {
      id: 'team',
      icon: Briefcase,
      title: 'Баг, төсөл',
      description: 'Төслийн хурал, ретро, төлөвлөлтийн уулзалт дээр багийн гишүүн бүрийн санааг алдалгүй цуглуулна.',
      benefits: ['Хурдан санал асуулга', 'Санааг дэмжлэгээр эрэмбэлэх', 'Даалгавар, шийдвэрийн тэмдэглэл'],
    },
  ],
  en: [
    {
      id: 'organization',
      icon: Landmark,
      title: 'Institutions',
      description: 'Run management and council meetings at public and private institutions in a transparent, documented way.',
      benefits: ['Records of attendance and votes', 'Permissions by department or unit', 'Decision archive'],
    },
    {
      id: 'company',
      icon: Building2,
      title: 'Companies',
      description: 'Hold board, shareholder and leadership meetings efficiently and approve decisions faster.',
      benefits: ['Shareholder voting', 'Secret ballot mode', 'Meeting reports'],
    },
    {
      id: 'ngo',
      icon: HandHeart,
      title: 'NGOs',
      description: 'Regularly hear from members, volunteers and partners, and make decisions together.',
      benefits: ['Member surveys', 'Remote participation', 'Share results with members'],
    },
    {
      id: 'education',
      icon: GraduationCap,
      title: 'Schools and universities',
      description: 'For faculty and academic council meetings, student union meetings and teaching-quality surveys.',
      benefits: ['Academic council voting', 'Student surveys', 'Large-audience events'],
    },
    {
      id: 'association',
      icon: UsersRound,
      title: 'Associations and communities',
      description: 'Run general assemblies, regular meetings and elections in good order, even with hundreds of participants.',
      benefits: ['Voting rights based on membership', 'Quorum monitoring', 'Room display'],
    },
    {
      id: 'team',
      icon: Briefcase,
      title: 'Teams and projects',
      description: 'Capture every team member’s ideas in project meetings, retrospectives and planning sessions.',
      benefits: ['Quick polls', 'Rank ideas by upvotes', 'Notes on tasks and decisions'],
    },
  ],
};
