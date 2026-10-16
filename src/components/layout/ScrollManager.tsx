import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollManager.tsx — Хуудас солигдоход гүйлгэлтийг удирдана.
 *
 * • Шинэ хуудас руу ороход дэлгэцийг хамгийн дээр нь аваачна.
 * • Хаяг #-тэй бол (жишээ нь "/#faq") тухайн хэсэг рүү зөөлөн гүйлгэнэ.
 * Lazy хуудас хараахан зурагдаагүй байж болох тул хэсгийг 50мс тутам
 * 20 хүртэл удаа дахин хайна. Дэлгэцэнд юу ч зурдаггүй (null буцаана).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // # байхгүй бол: шууд хамгийн дээр нь.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

    // "#faq" → "faq" (кирилл үсэгтэй байж болох тул decode хийнэ).
    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let timer = 0;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts++ < 20) timer = window.setTimeout(tryScroll, 50);
    };
    tryScroll();
    // Хуудас дахин солигдвол хүлээгдэж буй оролдлогыг цуцална.
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
