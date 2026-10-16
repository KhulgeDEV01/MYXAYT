/**
 * company.ts — "Бидний тухай" болон "Оролцоо" хэсгийн текстүүд.
 *
 * Текст засах: доорх `mn:` хэсэгт монгол, `en:` хэсэгт англи хувилбарыг засна.
 * Хоёр хэлэнд ижил `id`-тай байх ёстой.
 */
import { Eye, HeartHandshake, ShieldCheck, Sparkle } from 'lucide-react';
import type { CompanyValue } from '../types/content';
import type { Localized } from '../i18n/types';

/** Байгууллагын үнэт зүйлс (Бидний тухай хуудасны 4 карт). */
export const companyValues: Localized<CompanyValue[]> = {
  mn: [
    { id: 'transparency', icon: Eye, title: 'Ил тод байдал', description: 'Шийдвэр хэрхэн, ямар үндэслэлээр гарсныг оролцогч бүр харах ёстой гэж бид үздэг.' },
    { id: 'participation', icon: HeartHandshake, title: 'Оролцоо', description: 'Хамгийн чимээгүй оролцогчийн санал ч хамгийн чанга хоолойтой адил тоологдоно.' },
    { id: 'trust', icon: ShieldCheck, title: 'Найдвартай байдал', description: 'Санал хураалтын дүн, хурлын баримт найдвартай, өөрчлөгдөхгүй байх нь бидний үндсэн зарчим.' },
    { id: 'simplicity', icon: Sparkle, title: 'Энгийн байдал', description: 'Анх удаа хуралд нэгдэж буй хүн ч зааварчилгаагүйгээр санал өгч чаддаг байх ёстой.' },
  ],
  en: [
    { id: 'transparency', icon: Eye, title: 'Transparency', description: 'We believe every participant should be able to see how a decision was made, and why.' },
    { id: 'participation', icon: HeartHandshake, title: 'Participation', description: 'The quietest participant’s vote counts just as much as the loudest voice.' },
    { id: 'trust', icon: ShieldCheck, title: 'Reliability', description: 'Voting results and meeting records must be dependable and tamper-proof. That is our core principle.' },
    { id: 'simplicity', icon: Sparkle, title: 'Simplicity', description: 'Someone joining a meeting for the first time should be able to vote without any instructions.' },
  ],
};

/** "Оролцоо" хэсэг: уламжлалт хурлын нийтлэг асуудлууд. */
export const participationProblems: Localized<string[]> = {
  mn: [
    'Зарим хүн хурал дээр огт дуугардаггүй',
    'Асуултууд хариултгүй алга болдог',
    'Гаргасан санал тэмдэглэгдэлгүй мартагддаг',
    'Шийдвэр хэрхэн гарсан нь тодорхойгүй үлддэг',
  ],
  en: [
    'Some people never speak up',
    'Questions get lost without an answer',
    'Suggestions are forgotten because nobody records them',
    'It’s unclear how decisions were reached',
  ],
};

/** "Оролцоо" хэсэг: МҮХАҮТ дээр оролцогч юу хийж чадах вэ. */
export const participationCapabilities: Localized<string[]> = {
  mn: ['Асуулт асуух', 'Санал оруулах', 'Хүсэлт гаргах', 'Санал өгөх', 'Байр сууриа илэрхийлэх', 'Шийдвэрийн явцыг хянах'],
  en: ['Ask questions', 'Submit suggestions', 'Make requests', 'Vote', 'State their position', 'Follow the decision'],
};
