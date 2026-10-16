/**
 * useCountUp.ts — Тоог 0-ээс зорилтот утга хүртэл "гүйлгэж" өсгөх анимэйшн.
 *
 * Жишээ: статистик хэсэгт "1,200+" гэсэн тоо дэлгэцэнд гарч ирэхэд 0 → 1200 болж өснө.
 * Хэрэглэгч хөтөч / утсандаа "хөдөлгөөн багасгах" тохиргоо хийсэн бол шууд эцсийн тоог харуулна.
 */
import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * @param target   Хүрэх тоо
 * @param start    true болох үед анимэйшн эхэлнэ (ихэвчлэн элемент дэлгэцэнд харагдах үед)
 * @param duration Үргэлжлэх хугацаа, миллисекундээр (анхдагч 1.4 секунд)
 * @returns Одоогийн (анимэйшны явц дахь) тоо
 */
export function useCountUp(target: number, start: boolean, duration = 1400): number {
  const reducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    // Хөдөлгөөн багасгах тохиргоотой бол анимэйшнгүйгээр шууд эцсийн утга.
    if (reducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    // Дэлгэц шинэчлэгдэх бүрт (секундэд ~60 удаа) дуудагдана.
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1); // 0 → 1 хүртэлх явц
      const eased = 1 - Math.pow(1 - progress, 3); // Эхэндээ хурдан, төгсгөлдөө удаан (ease-out)
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Компонент алга болбол анимэйшныг зогсооно.
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration, reducedMotion]);

  return value;
}
