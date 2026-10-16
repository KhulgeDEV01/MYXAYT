/**
 * emailTemplate.ts — Багийн имэйлд очих хүсэлтийн "загвар".
 *
 * Зочин сайтыг англиар үзсэн ч имэйл нь манай багт зориулагдсан тул үргэлж
 * МОНГОЛ хэлээр, нэг ижил бүтэцтэй очно. Web3Forms-ийн үнэгүй багц имэйлийг
 * "шошго: утга" хүснэгтээр харуулдаг тул энд:
 *   • гарчгийг (subject) төрлийн дүрстэй, нэр + байгууллагатай болгоно
 *   • талбар бүрийн шошгыг дүрстэй болгож, утгагүй талбарыг хасна
 *   • илгээсэн цаг (Улаанбаатарын цагаар), сайтын хэл, хуудасны хаягийг нэмнэ
 * Шошго, дүрс, дарааллыг өөрчлөх бол зөвхөн энэ файлыг засна.
 */
import { siteConfig } from '../config/site';
import type { Locale } from '../i18n/types';
import type { ContactRequest, RequestEmail, RequestType } from './contact';

/** Хүсэлтийн төрөл бүрийн нэр ба дүрс (имэйлийн гарчиг, эхний мөрөнд). */
const typeLabels: Record<RequestType, { icon: string; label: string }> = {
  contact: { icon: '💬', label: 'Холбогдох' },
  partnership: { icon: '🤝', label: 'Хамтран ажиллах' },
  demo: { icon: '🖥️', label: 'Демо үзэх' },
  other: { icon: '📝', label: 'Бусад' },
};

/** Имэйл дэх талбаруудын шошго (энэ дарааллаар харагдана). */
const labels = {
  type: '📌 Хүсэлтийн төрөл',
  fullName: '👤 Овог нэр',
  phone: '📞 Утас',
  organization: '🏢 Байгууллага',
  message: '💬 Зурвас',
  sentAt: '🕒 Илгээсэн цаг',
  language: '🌐 Сайтын хэл',
  page: '🔗 Илгээсэн хуудас',
} as const;

/** Зочны үзэж байсан хэлний нэр. */
const languageNames: Record<Locale, string> = { mn: 'Монгол', en: 'English' };

/** Одоогийн цагийг Улаанбаатарын цагаар "2026-10-16 15:42" хэлбэрээр. */
function ulaanbaatarTime(date = new Date()): string {
  // sv-SE хэлний формат нь ОООО-СС-ӨӨ ЦЦ:ММ хэлбэртэй тул ашигласан.
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Ulaanbaatar',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

/**
 * Маягтын өгөгдлөөс багт илгээх имэйлийг бүрдүүлнэ.
 * @param data   Зочны бөглөсөн талбарууд
 * @param locale Зочны үзэж байсан сайтын хэл (имэйлд мэдээлэл болгон нэмнэ)
 */
export function buildRequestEmail(data: ContactRequest, locale: Locale): RequestEmail {
  const type = typeLabels[data.type];
  const who = data.organization ? `${data.fullName} (${data.organization})` : data.fullName;

  return {
    // Жишээ: "🤝 Хамтран ажиллах — Б.Бат (Демо ХХК)"
    subject: `${type.icon} ${type.label} — ${who}`,
    // Имэйл хаягийг тусдаа мөрөөр бичихгүй — "Reply" дарахад хариу шууд энэ хаяг руу очно.
    replyTo: data.email,
    fromName: `${siteConfig.name} вебсайт`,
    fields: [
      [labels.type, `${type.icon} ${type.label}`],
      [labels.fullName, data.fullName],
      [labels.phone, data.phone],
      [labels.organization, data.organization],
      [labels.message, data.message],
      [labels.sentAt, `${ulaanbaatarTime()} (Улаанбаатар)`],
      [labels.language, languageNames[locale]],
      [labels.page, window.location.href],
    ],
  };
}
