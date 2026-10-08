# МҮХАҮТ — marketing website

Public website for **МҮХАҮТ**, an online meeting, voting and decision-making platform for organizations.
The site is bilingual (Mongolian default, English via the МН / EN switch); the codebase is in English.

## Languages (i18n)

- `src/i18n/dictionaries/mn.ts` — UI strings. Its shape is the `Dictionary` type, so `en.ts` fails to compile if a key is missing.
- `src/data/*` — content exported as `Localized<T>` (`{ mn, en }`); components pick `data[locale]`.
- `useI18n()` returns `{ locale, setLocale, t }`. The choice is remembered in `localStorage` and sets `<html lang>` and `og:locale`.
- To add a language: add its code to `locales` in `src/i18n/types.ts`, then add a dictionary and a `data` entry for it (TypeScript lists every place).
- The language is not in the URL yet, so search engines index Mongolian only. For English SEO, move to `/en/...` routes later.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · lucide-react. No other runtime dependencies.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build
npm run preview
```

## Structure

```
src/
├── config/        site.ts (brand, contact, URLs — edit placeholders here), routes.ts
├── i18n/          LocaleProvider, useI18n, dictionaries (mn, en)
├── data/          ALL marketing content per language (features, pricing, faq, testimonials, demo mock data…)
├── types/         content.ts (marketing types), domain.ts (future SaaS entities: Meeting, Poll, Vote…)
├── services/      apiClient / auth / contact — typed stubs for the future backend
├── hooks/         usePageMeta (SEO), useInView, useCountUp, useLiveVotes (demo), …
├── components/
│   ├── ui/        design system: Button, Badge, Card, Container, Section, SectionHeading, Modal,
│   │              Accordion, Tabs, ProgressBar, Avatar, Input/Textarea, Select, Alert, Reveal, Logo
│   ├── layout/    Layout, PageHeader, ScrollManager, PageLoader
│   ├── navbar/ footer/ hero/ trust/ features/ workflow/ meetings/ participation/
│   └── solutions/ security/ pricing/ testimonials/ faq/ cta/
└── pages/         Home, Features, Solutions, Pricing, About, Contact, Login, NotFound (lazy-loaded except Home)
```

Design tokens (navy / brand / accent colours, shadows, animations) live in `@theme` in `src/index.css`.

## Placeholders to replace before launch

| What | Where |
| --- | --- |
| Domain, contact details, social links | `src/config/site.ts`, `index.html`, `public/robots.txt` |
| Platform statistics (demo numbers) | `src/data/stats.ts` |
| Prices (demo, MNT) | `src/data/pricing.ts` |
| Testimonials (fictional) | `src/data/testimonials.ts` |
| Open Graph image | add `public/og-image.png` (1200×630) |
| Footer pages marked "Удахгүй" | `src/data/navigation.ts` (`comingSoon`) |

## Backend integration

Nothing here talks to a server yet, and nothing pretends to:

- `services/auth.ts` defines the `AuthService` contract (sign in/up, Google, password reset). Every method rejects
  with `BackendNotConnectedError`, and the login page shows an honest "not available yet" message.
- `services/contact.ts` does the same for the contact form, which points visitors to the email address.
- `services/apiClient.ts` reads `VITE_API_BASE_URL` (see `.env.example`) and exposes `request()` for real calls.
- `types/domain.ts` mirrors the future entities, so the product mockups and the real app can share types.
- `hooks/useLiveVotes.ts` is a demo simulation. Replace it with a WebSocket subscription that returns the same shape.
