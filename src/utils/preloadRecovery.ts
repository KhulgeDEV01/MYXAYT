/**
 * preloadRecovery.ts — Шинэ хувилбар гарсны дараа "хуудас ачаалагдахгүй" болох асуудлаас сэргийлнэ.
 *
 * Яагаад хэрэгтэй вэ: Хуудас бүр тусдаа JS файл (chunk) болж, нэр нь агуулгаасаа
 * хамаарсан hash-тай байдаг (жишээ нь Pricing-DxdXPVE3.js). Сайтыг дахин deploy хийхэд
 * хуучин файлууд устдаг. Хэрэв зочин сайтыг хуучин хувилбараар нь нээлттэй байлгаад
 * өөр хуудас руу шилжвэл байхгүй болсон хуучин файлыг татах гэж оролдоод алдаа гарна.
 *
 * Шийдэл: Vite ийм үед `vite:preloadError` үйл явдал үүсгэдэг. Бид хуудсыг НЭГ УДАА
 * дахин ачаалж шинэ хувилбарыг татуулна. Дахин ачаалсны дараа ч алдаа гарвал (жишээ нь
 * интернэт тасарсан) дахин дахин ачаалах гогцоонд орохгүйн тулд ErrorBoundary-ийн
 * алдааны дэлгэцийг харуулна.
 */

/** sessionStorage дахь түлхүүр — сүүлд автоматаар дахин ачаалсан цаг. */
const STORAGE_KEY = 'preload-reload-at';
/** Энэ хугацаанд (мс) дахин ачаалсан бол дахиж ачаалахгүй — гогцооноос сэргийлнэ. */
const RETRY_WINDOW_MS = 10_000;

/**
 * Хуудсыг дахин ачаална — гэхдээ сүүлийн 10 секундэд аль хэдийн ачаалсан бол үгүй.
 * @returns true бол дахин ачаалж эхэлсэн, false бол саяхан ачаалсан тул алгассан.
 */
export function reloadOnce(): boolean {
  try {
    const last = Number(window.sessionStorage.getItem(STORAGE_KEY) ?? 0);
    if (Date.now() - last < RETRY_WINDOW_MS) return false;
    window.sessionStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // sessionStorage ажиллахгүй бол (private горим г.м.) гогцооны хамгаалалтгүй тул дахин ачаалахгүй.
    return false;
  }
  window.location.reload();
  return true;
}

/** Алдаа нь "JS файл (chunk) татаж чадсангүй" төрлийнх эсэх (хөтөч бүр өөр мессеж өгдөг). */
export function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS/i.test(
    message,
  );
}

/** `vite:preloadError` сонсогчийг суулгана. main.tsx-д апп эхлэхэд нэг удаа дуудна. */
export function installPreloadRecovery(): void {
  window.addEventListener('vite:preloadError', (event) => {
    // preventDefault — Vite алдааг цааш шидэхгүй; бид өөрсдөө дахин ачаална.
    // Саяхан ачаалсан бол preventDefault хийхгүй → алдаа ErrorBoundary-д хүрч, алдааны дэлгэц гарна.
    if (reloadOnce()) event.preventDefault();
  });
}
