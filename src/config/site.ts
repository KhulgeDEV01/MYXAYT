/**
 * Global brand + company configuration (language-independent).
 * Localized texts (titles, address, hours…) live in src/i18n/dictionaries.
 * Replace placeholder values (marked TODO) before going live.
 */
export const siteConfig = {
  name: 'МҮХАҮТ',
  // TODO: replace with the production domain
  url: 'https://meetsync.mn',
  // TODO: replace with real contact details
  contact: {
    email: 'hello@meetsync.mn',
    salesEmail: 'sales@meetsync.mn',
    phone: '+976 7700 0000',
  },
  // TODO: replace with real profile URLs
  social: {
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
  foundedYear: 2026,
} as const;
