# MeetSync — marketing website

Public website for **MeetSync**, an online meeting, voting and decision-making platform for organizations.
Visible content is in Mongolian; the codebase is in English.

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
├── data/          ALL marketing content (features, pricing, faq, testimonials, demo mock data…)
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
