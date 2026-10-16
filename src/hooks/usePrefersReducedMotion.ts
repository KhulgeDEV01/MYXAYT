/**
 * usePrefersReducedMotion.ts — Хэрэглэгч "хөдөлгөөн багасгах" тохиргоо хийсэн эсэхийг мэдэх.
 *
 * Зарим хүн (толгой эргэх, анхаарал сарних шалтгаанаар) утас / компьютертээ
 * анимэйшныг багасгах тохиргоо хийдэг. Тийм үед бид тоо өсөх, санал хөдлөх зэрэг
 * анимэйшнүүдийг унтраана. Энэ нь хүртээмжийн (accessibility) шаардлага.
 */
import { useEffect, useState } from 'react';

/** Системийн "хөдөлгөөн багасгах" тохиргоог шалгах CSS media query. */
const QUERY = '(prefers-reduced-motion: reduce)';

/** Тохиргоо идэвхтэй бол true буцаана; тохиргоо өөрчлөгдвөл автоматаар шинэчлэгдэнэ. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  // Хэрэглэгч сайт нээлттэй байхад тохиргоогоо өөрчилбөл түүнийг дагана.
  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
