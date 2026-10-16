/**
 * contact.ts — Холбоо барих / хамтын ажиллагааны хүсэлтийг имэйлээр хүргэх үйлчилгээ.
 *
 * Манайд сервер байхгүй тул маягтын мэдээллийг имэйл рүү дамжуулдаг гадны
 * үнэгүй үйлчилгээ ашиглана. Аль нэгийг нь .env файлд тохируулна (эхнийх нь давуу):
 *   VITE_WEB3FORMS_KEY — https://web3forms.com (түлхүүр үүсгэсэн имэйл хаяг руу хүсэлт очно)
 *   VITE_FORMSPREE_ID  — https://formspree.io  (form id, жишээ нь "xayzabcd")
 * Эдгээр утгууд нь нийтэд ил байхаар зохион бүтээгдсэн тул frontend кодонд байхад аюулгүй.
 * Аль нь ч тохируулагдаагүй бол маягт нь зочны имэйл программыг бэлэн бөглөсөн
 * байдлаар нээх (mailto:) товч санал болгоно.
 */

/** Хүсэлтийн төрөл: холбоо барих, хамтын ажиллагаа, демо үзүүлэх, бусад. */
export type RequestType = 'contact' | 'partnership' | 'demo' | 'other';

/** Маягтын талбаруудын утга. */
export interface ContactRequest {
  type: RequestType;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
}

/** Илгээхэд бэлэн имэйл: гарчиг + шошготой талбарууд (UI талд аль хэдийн орчуулагдсан). */
export interface RequestEmail {
  /** Имэйлийн гарчиг (subject). */
  subject: string;
  /** "Хариу бичих" дарахад хариу очих хаяг — хүсэлт илгээгчийн имэйл. */
  replyTo: string;
  /** Илгээгчийн нэр. */
  fromName: string;
  /** [шошго, утга] хосууд, жишээ нь ['Утас', '9911…']. */
  fields: Array<[label: string, value: string]>;
}

/** Ашиглагдаж буй хүргэлтийн үйлчилгээ. */
export type DeliveryProvider = 'web3forms' | 'formspree' | 'none';

// .env файлаас түлхүүрүүдийг уншина (хоосон зайг арилгана).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim() ?? '';
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim() ?? '';

/** Аль үйлчилгээ идэвхтэй вэ: Web3Forms → Formspree → аль нь ч биш. */
export const deliveryProvider: DeliveryProvider = WEB3FORMS_KEY ? 'web3forms' : FORMSPREE_ID ? 'formspree' : 'none';

/** "Имэйл хүргэх үйлчилгээ тохируулагдаагүй" гэсэн тусгай алдаа (маягт mailto сонголт харуулна). */
export class DeliveryNotConfiguredError extends Error {
  constructor() {
    super('No email delivery service is configured');
    this.name = 'DeliveryNotConfiguredError';
  }
}

/** [шошго, утга] жагсаалтыг объект болгоно; хоосон талбаруудыг (жишээ нь утасгүй) хасна. */
function fieldsToObject(fields: RequestEmail['fields']) {
  return Object.fromEntries(fields.filter(([, value]) => value.trim() !== ''));
}

/**
 * Хүсэлтийг тохируулсан үйлчилгээгээр имэйл болгон илгээнэ.
 * Амжилтгүй бол алдаа шидэх (throw) тул дуудсан тал нь алдааны мэдэгдэл харуулна.
 */
export async function sendRequestEmail(email: RequestEmail): Promise<void> {
  let response: Response;

  if (deliveryProvider === 'web3forms') {
    // Web3Forms-ийн API руу JSON хэлбэрээр илгээнэ.
    response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: email.subject,
        from_name: email.fromName,
        replyto: email.replyTo,
        ...fieldsToObject(email.fields),
      }),
    });
  } else if (deliveryProvider === 'formspree') {
    // Formspree-ийн API руу илгээнэ (талбаруудын нэрлэлт нь арай өөр).
    response = await fetch(`https://formspree.io/f/${encodeURIComponent(FORMSPREE_ID)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: email.subject,
        _replyto: email.replyTo,
        email: email.replyTo,
        ...fieldsToObject(email.fields),
      }),
    });
  } else {
    throw new DeliveryNotConfiguredError();
  }

  // Хариуг шалгана: HTTP алдаа эсвэл үйлчилгээ "success: false" гэж хэлсэн бол алдаа.
  const result = (await response.json().catch(() => ({}))) as { success?: boolean };
  if (!response.ok || result.success === false) {
    throw new Error(`Email delivery failed (${response.status})`);
  }
}

/**
 * Нөөц арга: зочны имэйл программыг (Gmail, Outlook…) хүсэлтийн мэдээллээр
 * бэлэн бөглөсөн байдлаар нээх "mailto:" холбоос үүсгэнэ.
 * @param to Хүлээн авах имэйл хаяг (site.ts дахь contact.email)
 */
export function buildMailtoLink(to: string, email: RequestEmail): string {
  const body = email.fields
    .filter(([, value]) => value.trim() !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(body)}`;
}
