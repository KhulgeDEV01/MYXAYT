/**
 * useInView.ts — Элемент дэлгэцэнд харагдаж байгаа эсэхийг мэдэх хуком.
 *
 * Хэрэглэгч хуудсыг доош гүйлгээд тухайн хэсэгт хүрэхэд `inView` нь true болно.
 * Үүнийг анимэйшн эхлүүлэх (тоо өсгөх, санал хураалт хөдөлгөх г.м.)-д ашигладаг.
 *
 * Хэрэглээ:
 *   const { ref, inView } = useInView();
 *   <div ref={ref}>{inView && '…'}</div>
 */
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** true бол нэг удаа харагдсаны дараа үргэлж true хэвээр үлдэнэ (анимэйшн дахин эхлэхгүй). */
  once?: boolean;
  /** Харагдах хязгаарыг тохируулах (анхдагч: доод ирмэгээс 10% дээш орсон үед). */
  rootMargin?: string;
  /** Элементийн хэдэн хувь нь харагдахад "харагдсан" гэж тооцох (0.15 = 15%). */
  threshold?: number;
}

export function useInView<T extends Element = HTMLDivElement>({
  once = true,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.15,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Маш хуучин хөтөч IntersectionObserver-гүй бол шууд харагдсан гэж үзнэ.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    // IntersectionObserver — хөтөч өөрөө элемент дэлгэцэнд орж/гарахыг мэдэгддэг.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect(); // Нэг удаа хангалттай бол ажиглалтыг зогсооно
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
