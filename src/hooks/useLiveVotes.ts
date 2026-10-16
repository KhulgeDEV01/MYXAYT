/**
 * useLiveVotes.ts — Санал хураалтыг "шууд" явагдаж байгаа мэт загварчлах хуком.
 *
 * ЗӨВХӨН ҮЗҮҮЛЭНД (DEMO): Нүүр хуудасны жишээ самбарт санал тоо аяндаа өсөж
 * харагдахын тулд хэдэн секунд тутамд санамсаргүй нэг санал нэмнэ.
 * Жинхэнэ backend бий болоход үүнийг серверээс (жишээ нь WebSocket-оор) ирэх
 * өгөгдлөөр солино — буцаах хэлбэр (`options`, `total`) нь ижил хэвээр байна.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PollOption } from '../types/domain';
import { toPercent } from '../utils/format';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseLiveVotesOptions {
  /** Санал өгөх эрхтэй нийт хүний тоо. Энэ тоонд хүрмэгц загварчлал зогсоно. */
  eligible: number;
  /** Зөвхөн самбар дэлгэцэнд харагдаж байх үед санал нэмнэ. */
  active: boolean;
  /** Шинэ санал нэмэх давтамж (миллисекунд). */
  intervalMs?: number;
  /** Санамсаргүй санал аль сонголт руу орох магадлалын харьцаа (сонголтын дарааллаар). */
  weights?: number[];
}

/** Сонголт + түүний эзлэх хувь. */
export interface LiveOption extends PollOption {
  percent: number;
}

/**
 * @param initial Эхний сонголтууд ба тэдгээрийн санал тоо
 * @returns options — хувьтай сонголтууд, total — нийт санал, myVote — зочны өгсөн санал,
 *          castVote — зочин өөрөө санал өгөх функц
 */
export function useLiveVotes(
  initial: PollOption[],
  { eligible, active, intervalMs = 1800, weights }: UseLiveVotesOptions,
) {
  const reducedMotion = usePrefersReducedMotion();
  const [counts, setCounts] = useState(() => initial.map((o) => o.votes)); // Сонголт бүрийн санал тоо
  const [myVote, setMyVote] = useState<string | null>(null); // Зочин аль сонголтыг дарсан

  const total = counts.reduce((sum, n) => sum + n, 0);

  // Тодорхой хугацаа тутам нэг санал нэмэх таймер.
  useEffect(() => {
    if (!active || reducedMotion || total >= eligible) return;

    const timer = window.setInterval(() => {
      setCounts((prev) => {
        if (prev.reduce((s, n) => s + n, 0) >= eligible) return prev;
        // Жингээр (weights) санамсаргүй сонголт сонгоно: жин их байх тусам сонгогдох магадлал өндөр.
        const w = weights ?? initial.map((o) => o.votes || 1);
        const sum = w.reduce((s, n) => s + n, 0);
        let pick = Math.random() * sum;
        const index = w.findIndex((weight) => (pick -= weight) <= 0);
        return prev.map((n, i) => (i === (index < 0 ? 0 : index) ? n + 1 : n));
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [active, reducedMotion, total, eligible, intervalMs, weights, initial]);

  // Зочин санал өгөх: зөвхөн нэг удаа өгөх боломжтой.
  const castVote = useCallback(
    (optionId: string) => {
      if (myVote) return;
      setMyVote(optionId);
      setCounts((prev) => prev.map((n, i) => (initial[i]?.id === optionId ? n + 1 : n)));
    },
    [myVote, initial],
  );

  // Сонголт бүрт шинэчлэгдсэн санал тоо ба хувийг тооцоолно.
  const options: LiveOption[] = useMemo(
    () => initial.map((o, i) => ({ ...o, votes: counts[i], percent: toPercent(counts[i], total) })),
    [initial, counts, total],
  );

  return { options, total, eligible, myVote, castVote };
}
