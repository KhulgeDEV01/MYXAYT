import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on page change, or to `#hash` targets (e.g. "/#faq").
 * Retries briefly because lazily loaded pages may not have rendered yet.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }

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
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
