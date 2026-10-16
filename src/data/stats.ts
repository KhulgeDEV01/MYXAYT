/**
 * stats.ts — Статистикийн тоонууд (нүүр хуудасны итгэлцлийн хэсэг).
 *
 * Текст засах: доорх `mn:` хэсэгт монгол, `en:` хэсэгт англи хувилбарыг засна.
 * Хоёр хэлэнд ижил `id`-тай байх ёстой.
 */
import type { Stat } from '../types/content';
import type { Localized } from '../i18n/types';

/** ЖИШЭЭ тоонууд — жинхэнэ үзүүлэлтээр солих (эсвэл ирээдүйд API-аас татах). */
export const platformStats: Localized<Stat[]> = {
  mn: [
    { id: 'meetings', value: 500, suffix: '+', label: 'Хурал', description: 'зохион байгуулагдсан' },
    { id: 'participants', value: 20000, suffix: '+', label: 'Оролцогч', description: 'хуралд нэгдсэн' },
    { id: 'votes', value: 10000, suffix: '+', label: 'Санал', description: 'бүртгэгдсэн' },
    { id: 'uptime', value: 99.9, suffix: '%', decimals: 1, label: 'Найдвартай ажиллагаа', description: 'системийн тасралтгүй байдал' },
  ],
  en: [
    { id: 'meetings', value: 500, suffix: '+', label: 'Meetings', description: 'held on the platform' },
    { id: 'participants', value: 20000, suffix: '+', label: 'Participants', description: 'joined meetings' },
    { id: 'votes', value: 10000, suffix: '+', label: 'Votes', description: 'recorded' },
    { id: 'uptime', value: 99.9, suffix: '%', decimals: 1, label: 'Reliability', description: 'system uptime' },
  ],
};
