import { DatabaseBackup, EyeOff, FileClock, KeyRound, LockKeyhole, ShieldCheck, UserCog } from 'lucide-react';
import type { SecurityItem } from '../types/content';

/**
 * Describes security principles of the product.
 * Do NOT add third-party certifications here unless they are actually obtained.
 */
export const securityItems: SecurityItem[] = [
  {
    id: 'auth',
    icon: KeyRound,
    title: 'Аюулгүй нэвтрэлт',
    description: 'Хэрэглэгч бүр баталгаажсан бүртгэлээр нэвтэрч, хурлын холбоос зөвхөн уригдсан хүмүүст нээгдэнэ.',
  },
  {
    id: 'roles',
    icon: UserCog,
    title: 'Эрхэд суурилсан хандалт',
    description: 'Зохион байгуулагч, оролцогч, ажиглагч гэх мэт үүрэг бүрт тохирсон эрх олгоно.',
  },
  {
    id: 'privacy',
    icon: EyeOff,
    title: 'Хурлын нууцлал',
    description: 'Хаалттай хурал, нууц санал хураалтын горимоор хэн юу харахыг та өөрөө тогтооно.',
  },
  {
    id: 'data',
    icon: DatabaseBackup,
    title: 'Өгөгдлийн хамгаалалт',
    description: 'Өгөгдөл шифрлэгдсэн холболтоор дамжиж, тогтмол нөөцлөгдөнө.',
  },
  {
    id: 'audit',
    icon: FileClock,
    title: 'Үйлдлийн бүртгэл',
    description: 'Хурал, санал хураалттай холбоотой чухал үйлдэл бүр цаг хугацаатайгаа бүртгэгдэнэ.',
  },
  {
    id: 'voting',
    icon: ShieldCheck,
    title: 'Найдвартай санал хураалт',
    description: 'Нэг оролцогч — нэг санал. Давхар санал өгөх, санал өөрчлөх оролдлогыг систем хязгаарлана.',
  },
  {
    id: 'access',
    icon: LockKeyhole,
    title: 'Хандалтын удирдлага',
    description: 'Байгууллагын админ хэрэглэгч, баг, хурал тус бүрийн хандалтыг нэг дороос удирдана.',
  },
];
