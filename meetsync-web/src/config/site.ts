/**
 * Global brand + company configuration.
 * Replace placeholder values (marked TODO) before going live.
 */
export const siteConfig = {
  name: 'MeetSync',
  // TODO: replace with the production domain
  url: 'https://meetsync.mn',
  defaultTitle: 'Онлайн хурал, санал хураалт ба санал асуулгын платформ',
  defaultDescription:
    'MeetSync — онлайн хурал, санал хураалт, санал асуулга болон оролцогчдын шууд санал бодлыг нэг дор удирдах байгууллагын платформ.',
  tagline: 'Хуралд. Хэлэлц. Санал өг. Шийдвэрлэ.',
  // TODO: replace with real contact details
  contact: {
    email: 'hello@meetsync.mn',
    salesEmail: 'sales@meetsync.mn',
    phone: '+976 7700 0000',
    address: 'Улаанбаатар хот, Сүхбаатар дүүрэг',
    hours: 'Даваа–Баасан, 09:00–18:00',
  },
  // TODO: replace with real profile URLs
  social: {
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
  foundedYear: 2026,
} as const;
