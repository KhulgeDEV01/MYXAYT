/**
 * messenger.ts — Байгууллагын Facebook хуудасны Messenger (m.me) холбоосыг гаргана.
 *
 * m.me/<хуудас> холбоос нь тухайн Facebook хуудастай мессеж бичих цонхыг шууд нээдэг
 * (утсан дээр Messenger апп, компьютер дээр messenger.com).
 *
 * Хуудсыг config/site.ts-д хоёр янзаар зааж болно (эхнийх нь давуу):
 *   1) social.messengerPage — дараах хэлбэрийн аль нь ч болно:
 *        'mukhaut'                                  (username)
 *        '61550000000001'                           (Page ID)
 *        'https://m.me/mukhaut'                     (Messenger холбоос)
 *        'https://www.facebook.com/mukhaut'         (хуудасны хаяг)
 *   2) social.facebook — хуудасны бүтэн хаяг:
 *        https://www.facebook.com/mukhaut                 → https://m.me/mukhaut
 *        https://www.facebook.com/profile.php?id=6155...  → https://m.me/6155...
 *        https://www.facebook.com/pages/Нэр/1234567890     → https://m.me/1234567890
 *
 * АНХААР: Хуудасны харагдах НЭР (жишээ нь "Ногоон талбайн гайхамшиг") ажиллахгүй —
 * m.me нь зөвхөн username (латин үсэг, тоо, цэг) эсвэл тоон Page ID-г танина.
 * Хүчингүй утга бол хөгжүүлэлтийн үед console-д анхааруулга гарч, дараагийн сонголт руу шилжинэ.
 * Аль нь ч хуудас заагаагүй бол null буцаана (чатын товч имэйлийн цонх болно).
 *
 * Гар утсан дээр (openMessengerApp) суулгасан Messenger аппыг тухайн хуудастай чатын цонхоор нээнэ.
 */
import { siteConfig } from '../config/site';

/** Facebook-ийн хуудас биш, системийн замууд — эдгээрээс хуудасны нэр гаргахгүй. */
const RESERVED_PATHS = new Set(['', 'profile.php', 'groups', 'people', 'events', 'watch', 'marketplace', 'share', 'sharer']);

/** Facebook хуудасны username (латин үсэг, тоо, цэг, зураас) эсвэл тоон Page ID мөн эсэх. */
const PAGE_PATTERN = /^[A-Za-z0-9.\-_]+$/;

/** Хаягаас username эсвэл Page ID-г гаргана (facebook.com, fb.com, m.me). Олдохгүй бол null. */
export function pageFromUrl(href: string): string | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  const parts = url.pathname
    .split('/')
    .filter(Boolean)
    .map((p) => decodeURIComponent(p));

  // m.me/<хуудас>
  if (/(^|\.)m\.me$/i.test(url.hostname)) return parts[0] ?? null;

  // Зөвхөн facebook.com, www.facebook.com, m.facebook.com, fb.com
  if (!/(^|\.)(facebook\.com|fb\.com)$/i.test(url.hostname)) return null;
  // facebook.com/profile.php?id=123 — шинэ хэлбэрийн хуудас (username-гүй)
  if (parts[0] === 'profile.php') return url.searchParams.get('id');
  // facebook.com/pages/Нэр/123 ба facebook.com/people/Нэр/123 — сүүлийн тоо нь Page ID
  if (parts[0] === 'pages' || parts[0] === 'people') return parts.find((p) => /^\d+$/.test(p)) ?? null;
  // facebook.com/<username>
  const slug = parts[0] ?? '';
  return RESERVED_PATHS.has(slug.toLowerCase()) ? null : slug;
}

/** Тохиргооны нэг утгыг (username, ID эсвэл хаяг) шалгаж, хүчинтэй хуудсыг буцаана. */
function normalizePage(value: string, field: string): string | null {
  const input = value.trim();
  if (!input) return null;
  // facebook.com/share/... — богино хуваалцах холбоос; ард нь ямар хуудас байгааг эндээс мэдэх боломжгүй.
  if (/facebook\.com\/share\//i.test(input)) {
    if (import.meta.env.DEV) {
      console.warn(
        `[messenger] site.ts → social.${field} = "${input}" нь share холбоос. ` +
          'Хөтчөөр нээгээд хаягийн мөрөнд гарах жинхэнэ хаягийг (facebook.com/... эсвэл Page ID) оруулна уу.',
      );
    }
    return null;
  }
  const page = /^https?:\/\//i.test(input) ? pageFromUrl(input) : input;
  // Хуудас заагаагүй (жишээ нь зүгээр 'https://facebook.com/') — тохируулаагүй гэсэн үг, алдаа биш.
  if (!page) return null;
  if (PAGE_PATTERN.test(page)) return page;
  if (import.meta.env.DEV) {
    console.warn(
      `[messenger] site.ts → social.${field} = "${input}" хүчингүй. ` +
        'Хуудасны харагдах нэр биш, username (жишээ нь "mukhaut") эсвэл тоон Page ID оруулна уу.',
    );
  }
  return null;
}

/** site.ts-ийн тохиргооноос байгууллагын Facebook хуудсыг (username эсвэл Page ID) гаргана. */
export function getFacebookPage(): string | null {
  return (
    normalizePage(String(siteConfig.social.messengerPage), 'messengerPage') ??
    normalizePage(String(siteConfig.social.facebook), 'facebook')
  );
}

/** Messenger чатын холбоос (m.me). Хуудас тохируулаагүй бол null. */
export function getMessengerUrl(): string | null {
  const page = getFacebookPage();
  return page ? messengerWebUrl(page) : null;
}

// ---------------------------------------------------------------------------
// Гар утас: суулгасан Messenger аппыг байгууллагын хуудастай ЧАТЫН цонхоор нээх
// ---------------------------------------------------------------------------

/** Утасны систем: android, ios, эсвэл null (компьютер). */
export type MobilePlatform = 'android' | 'ios' | null;

/**
 * Хөтчийн мэдээллээр утасны системийг тодорхойлно.
 * iPadOS 13+ нь өөрийгөө "Macintosh" гэж танилцуулдаг тул мэдрэгчтэй дэлгэцээр нь ялгана.
 */
export function detectMobilePlatform(
  userAgent: string = navigator.userAgent,
  maxTouchPoints: number = navigator.maxTouchPoints ?? 0,
): MobilePlatform {
  if (/Android/i.test(userAgent)) return 'android';
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Macintosh/i.test(userAgent) && maxTouchPoints > 1) return 'ios';
  return null;
}

/** m.me чатын хаяг — утсан дээр апп суулгаагүй үед хөтөч дээр нээгдэх нөөц хаяг. */
export function messengerWebUrl(page: string): string {
  return `https://m.me/${page}`;
}

/**
 * Компьютер дээрх чатын хаяг: facebook.com дотор хуудастай чатын цонх шууд нээгдэнэ.
 * (m.me нь компьютер дээр тусдаа нэвтрэлт шаарддаг messenger.com руу шилжүүлдэг тул үүнийг ашиглана.
 * Зочин Facebook-т нэвтрээгүй бол нэвтэрсний дараа шууд энэ чат руу буцна.)
 */
export function messengerDesktopUrl(page: string): string {
  return `https://www.facebook.com/messages/t/${page}`;
}

/**
 * Messenger аппыг тухайн хуудастай чатын цонхоор нээх холбоос.
 *   android → intent:// — m.me холбоосыг Messenger апп (com.facebook.orca)-аар нээлгэнэ;
 *             апп байхгүй бол хөтөч өөрөө browser_fallback_url (m.me) руу шилжинэ.
 *             username болон Page ID хоёуланд ажиллана.
 *   ios     → fb-messenger://user-thread/<ID> — зөвхөн тоон Page ID-д ажиллана.
 *             username бол null буцаана → энгийн m.me холбоос ашиглана (iOS өөрөө Messenger аппыг
 *             universal link-ээр нээнэ).
 */
export function messengerAppLink(page: string, platform: Exclude<MobilePlatform, null>): string | null {
  const web = messengerWebUrl(page);
  if (platform === 'android') {
    return `intent://m.me/${page}#Intent;scheme=https;package=com.facebook.orca;S.browser_fallback_url=${encodeURIComponent(web)};end`;
  }
  return /^\d+$/.test(page) ? `fb-messenger://user-thread/${page}` : null;
}

/** iOS дээр апп нээгдээгүй гэж үзэх хүртэл хүлээх хугацаа (мс). */
const IOS_FALLBACK_DELAY_MS = 1500;

/**
 * Утсан дээр Messenger аппыг хуудастай чатын цонхоор нээнэ.
 * @param appLink messengerAppLink()-ийн буцаасан холбоос
 * iOS: апп нээгдвэл хөтөч арын дэвсгэрт шилжиж (visibilitychange / pagehide) нөөц таймер цуцлагдана.
 * 1.5 секундын дотор апп нээгдээгүй бол m.me руу шилжинэ.
 */
export function openMessengerApp(appLink: string, page: string, platform: Exclude<MobilePlatform, null>): void {
  window.location.href = appLink;
  if (platform !== 'ios') return; // Android-ийн нөөц холбоосыг хөтөч өөрөө зохицуулна

  const timer = window.setTimeout(() => {
    cleanup();
    if (!document.hidden) window.location.href = messengerWebUrl(page);
  }, IOS_FALLBACK_DELAY_MS);
  const cancel = () => {
    if (document.hidden) {
      window.clearTimeout(timer);
      cleanup();
    }
  };
  const cleanup = () => {
    document.removeEventListener('visibilitychange', cancel);
    window.removeEventListener('pagehide', cancel);
  };
  document.addEventListener('visibilitychange', cancel);
  window.addEventListener('pagehide', cancel);
}
