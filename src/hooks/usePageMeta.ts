import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { useI18n } from '../i18n/useI18n';

interface PageMeta {
  /** Page-specific title. The brand name is appended automatically. */
  title?: string;
  description?: string;
  noIndex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Updates document title, description, canonical URL and Open Graph tags per route and language. */
export function usePageMeta({ title, description, noIndex }: PageMeta) {
  const { pathname } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const fullTitle = `${title ?? t.meta.defaultTitle} | ${siteConfig.name}`;
    const desc = description ?? t.meta.defaultDescription;
    const url = `${siteConfig.url}${pathname === '/' ? '/' : pathname}`;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', t.meta.ogLocale);
    setCanonical(url);
  }, [title, description, noIndex, pathname, t]);
}
