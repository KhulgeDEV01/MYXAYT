import { DatabaseBackup, EyeOff, FileClock, KeyRound, LockKeyhole, ShieldCheck, UserCog } from 'lucide-react';
import type { SecurityItem } from '../types/content';
import type { Localized } from '../i18n/types';

/**
 * security.ts — "Аюулгүй байдал" хэсгийн баталгаанууд.
 *
 * АНХААР: Жинхэнэ авсан гэрчилгээ (ISO г.м.) биш бол энд бүү нэмээрэй. Мөн
 * сайтаа нийтлэхээс өмнө бичсэн зүйл бүр жинхэнэ системд үнэн эсэхийг шалгана уу.
 * Текст засах: `mn:` хэсэгт монгол, `en:` хэсэгт англи хувилбарыг засна.
 */
export const securityItems: Localized<SecurityItem[]> = {
  mn: [
    { id: 'auth', icon: KeyRound, title: 'Аюулгүй нэвтрэлт', description: 'Хэрэглэгч бүр баталгаажсан бүртгэлээр нэвтэрч, хурлын холбоос зөвхөн уригдсан хүмүүст нээгдэнэ.' },
    { id: 'roles', icon: UserCog, title: 'Эрхэд суурилсан хандалт', description: 'Зохион байгуулагч, оролцогч, ажиглагч гэх мэт үүрэг бүрт тохирсон эрх олгоно.' },
    { id: 'privacy', icon: EyeOff, title: 'Хурлын нууцлал', description: 'Хаалттай хурал, нууц санал хураалтын горимоор хэн юу харахыг та өөрөө тогтооно.' },
    { id: 'data', icon: DatabaseBackup, title: 'Өгөгдлийн хамгаалалт', description: 'Өгөгдөл шифрлэгдсэн холболтоор дамжиж, тогтмол нөөцлөгдөнө.' },
    { id: 'audit', icon: FileClock, title: 'Үйлдлийн бүртгэл', description: 'Хурал, санал хураалттай холбоотой чухал үйлдэл бүр цаг хугацаатайгаа бүртгэгдэнэ.' },
    { id: 'voting', icon: ShieldCheck, title: 'Найдвартай санал хураалт', description: 'Нэг оролцогч — нэг санал. Давхар санал өгөх, санал өөрчлөх оролдлогыг систем хязгаарлана.' },
    { id: 'access', icon: LockKeyhole, title: 'Хандалтын удирдлага', description: 'Байгууллагын админ хэрэглэгч, баг, хурал тус бүрийн хандалтыг нэг дороос удирдана.' },
  ],
  en: [
    { id: 'auth', icon: KeyRound, title: 'Secure sign-in', description: 'Every user signs in with a verified account, and meeting links open only for invited people.' },
    { id: 'roles', icon: UserCog, title: 'Role-based access', description: 'Grant permissions that fit each role — organizer, participant, observer and more.' },
    { id: 'privacy', icon: EyeOff, title: 'Meeting privacy', description: 'With closed meetings and secret ballots, you decide who sees what.' },
    { id: 'data', icon: DatabaseBackup, title: 'Data protection', description: 'Data travels over encrypted connections and is backed up regularly.' },
    { id: 'audit', icon: FileClock, title: 'Audit log', description: 'Every important action related to meetings and votes is logged with a timestamp.' },
    { id: 'voting', icon: ShieldCheck, title: 'Reliable voting', description: 'One participant, one vote. The system prevents duplicate votes and tampering attempts.' },
    { id: 'access', icon: LockKeyhole, title: 'Access control', description: 'Organization admins manage access for every user, team and meeting from one place.' },
  ],
};
