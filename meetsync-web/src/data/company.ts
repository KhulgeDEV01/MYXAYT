import { Eye, HeartHandshake, ShieldCheck, Sparkle } from 'lucide-react';
import type { CompanyValue } from '../types/content';

export const companyValues: CompanyValue[] = [
  {
    id: 'transparency',
    icon: Eye,
    title: 'Ил тод байдал',
    description: 'Шийдвэр хэрхэн, ямар үндэслэлээр гарсныг оролцогч бүр харах ёстой гэж бид үздэг.',
  },
  {
    id: 'participation',
    icon: HeartHandshake,
    title: 'Оролцоо',
    description: 'Хамгийн чимээгүй оролцогчийн санал ч хамгийн чанга хоолойтой адил тоологдоно.',
  },
  {
    id: 'trust',
    icon: ShieldCheck,
    title: 'Найдвартай байдал',
    description: 'Санал хураалтын дүн, хурлын баримт найдвартай, өөрчлөгдөхгүй байх нь бидний үндсэн зарчим.',
  },
  {
    id: 'simplicity',
    icon: Sparkle,
    title: 'Энгийн байдал',
    description: 'Анх удаа хуралд нэгдэж буй хүн ч зааварчилгаагүйгээр санал өгч чаддаг байх ёстой.',
  },
];

export const participationProblems = [
  'Зарим хүн хурал дээр огт дуугардаггүй',
  'Асуултууд хариултгүй алга болдог',
  'Гаргасан санал тэмдэглэгдэлгүй мартагддаг',
  'Шийдвэр хэрхэн гарсан нь тодорхойгүй үлддэг',
];

export const participationCapabilities = [
  'Асуулт асуух',
  'Санал оруулах',
  'Хүсэлт гаргах',
  'Санал өгөх',
  'Байр сууриа илэрхийлэх',
  'Шийдвэрийн явцыг хянах',
];
