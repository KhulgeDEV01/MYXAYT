import type { Stat } from '../types/content';
import type { Localized } from '../i18n/types';

/** DEMO numbers — replace with real platform metrics (or fetch from the API). */
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
