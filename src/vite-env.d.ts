/**
 * vite-env.d.ts — Орчны хувьсагчдын (.env файл) төрлийн тодорхойлолт.
 *
 * .env файлд бичсэн VITE_ эхлэлтэй утгуудыг кодонд `import.meta.env.VITE_...`
 * хэлбэрээр уншдаг. Энэ файл TypeScript-д тэдгээр утга ямар нэртэй, ямар
 * төрөлтэй болохыг зааж өгдөг (алдаатай бичвэл шууд анхааруулна).
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Ирээдүйн backend API-ийн үндсэн хаяг (одоогоор хоосон). */
  readonly VITE_API_BASE_URL?: string;
  /** Жинхэнэ веб аппын хаяг ("Нэвтрэх" товчлуурт ашиглагдана). */
  readonly VITE_APP_URL?: string;
  /** Web3Forms-ийн access key — хүсэлтийн маягт энэ түлхүүрийн эзэмшигчийн имэйл рүү очно. */
  readonly VITE_WEB3FORMS_KEY?: string;
  /** Formspree-ийн form id (Web3Forms-ийн оронд ашиглах өөр сонголт). */
  readonly VITE_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
