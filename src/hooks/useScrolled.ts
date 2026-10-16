/**
 * useScrolled.ts — Хуудсыг доош гүйлгэсэн эсэхийг мэдэх хуком.
 *
 * Дээд цэс (Navbar) хуудсын хамгийн дээд хэсэгт тунгалаг, доош гүйлгэмэгц
 * өнгөтэй дэвсгэр + сүүдэртэй болдог — үүнийг энэ хуком удирдана.
 */
import { useEffect, useState } from 'react';

/** Хуудас `threshold` пикселээс илүү доош гүйлгэгдсэн бол true буцаана. */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll(); // Хуудас дундаас нээгдсэн байж болох тул эхлээд нэг шалгана
    // passive: true — гүйлгэлтийг удаашруулахгүй гэж хөтөчид мэдэгдэнэ
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
