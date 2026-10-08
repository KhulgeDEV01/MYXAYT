import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PollOption } from '../types/domain';
import { toPercent } from '../utils/format';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseLiveVotesOptions {
  /** Total number of people allowed to vote. Simulation stops here. */
  eligible: number;
  /** Only simulate while the widget is on screen. */
  active: boolean;
  intervalMs?: number;
  /** Relative chance that a simulated vote goes to each option (same order as options). */
  weights?: number[];
}

export interface LiveOption extends PollOption {
  percent: number;
}

/**
 * DEMO ONLY — simulates incoming votes for marketing mockups.
 * When the real backend exists, replace this with a subscription
 * (e.g. WebSocket) that returns the same `{ options, total }` shape.
 */
export function useLiveVotes(
  initial: PollOption[],
  { eligible, active, intervalMs = 1800, weights }: UseLiveVotesOptions,
) {
  const reducedMotion = usePrefersReducedMotion();
  const [counts, setCounts] = useState(() => initial.map((o) => o.votes));
  const [myVote, setMyVote] = useState<string | null>(null);

  const total = counts.reduce((sum, n) => sum + n, 0);

  useEffect(() => {
    if (!active || reducedMotion || total >= eligible) return;

    const timer = window.setInterval(() => {
      setCounts((prev) => {
        if (prev.reduce((s, n) => s + n, 0) >= eligible) return prev;
        const w = weights ?? initial.map((o) => o.votes || 1);
        const sum = w.reduce((s, n) => s + n, 0);
        let pick = Math.random() * sum;
        const index = w.findIndex((weight) => (pick -= weight) <= 0);
        return prev.map((n, i) => (i === (index < 0 ? 0 : index) ? n + 1 : n));
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [active, reducedMotion, total, eligible, intervalMs, weights, initial]);

  const castVote = useCallback(
    (optionId: string) => {
      if (myVote) return;
      setMyVote(optionId);
      setCounts((prev) => prev.map((n, i) => (initial[i]?.id === optionId ? n + 1 : n)));
    },
    [myVote, initial],
  );

  const options: LiveOption[] = useMemo(
    () => initial.map((o, i) => ({ ...o, votes: counts[i], percent: toPercent(counts[i], total) })),
    [initial, counts, total],
  );

  return { options, total, eligible, myVote, castVote };
}
