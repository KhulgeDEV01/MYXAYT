/**
 * usePageMeta.ts — Хуудас бүрийн гарчиг ба SEO мэдээллийг тохируулах хуком.
 *
 * Хөтчийн tab дээрх гарчиг, Google хайлтад харагдах тайлбар, Facebook зэрэгт
 * холбоос хуваалцахад гарах мэдээлэл (Open Graph)-ийг хуудас, хэл бүрээр шинэчилнэ.
 *
 * Хэрэглээ (хуудасны компонент дотор):
 *   usePageMeta({ title: 'Үнэ', description: '…' });
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { useI18n } from '../i18n/useI18n';

interface PageMeta {
  /** Хуудасны гарчиг. Ард нь брэндийн нэр автоматаар нэмэгдэнэ: "Үнэ | МҮХАҮТ". */
  title?: string;
  /** Хайлтын системд харагдах товч тайлбар. */
  description?: string;
  /** true бол Google зэрэг хайлтын системд энэ хуудсыг бүү оруул гэж заана (жишээ нь 404). */
  noIndex?: boolean;
}

/** <head> доторх <meta> шошгыг олж (байхгүй бол үүсгэж) утгыг нь солино. */
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Хуудасны "албан ёсны" хаягийг (canonical) тохируулна — давхардсан хуудсыг хайлтад нэг гэж ойлгуулна. */
function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Гарчиг, тайлбар, canonical URL, Open Graph шошгуудыг хуудас ба хэл солигдох бүрт шинэчилнэ. */
export function usePageMeta({ title, description, noIndex }: PageMeta) {
  const { pathname } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const fullTitle = `${title ?? t.meta.defaultTitle} | ${siteConfig.name}`;
    const desc = description ?? t.meta.defaultDescription;
    const url = `${siteConfig.url}${pathname === '/' ? '/' : pathname}`;

    document.title = fullTitle; // Хөтчийн tab дээрх гарчиг
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    // Open Graph — Facebook, Messenger, LinkedIn-д холбоос хуваалцахад харагдах мэдээлэл
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', t.meta.ogLocale);
    setCanonical(url);
  }, [title, description, noIndex, pathname, t]);
}
