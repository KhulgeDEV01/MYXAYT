/**
 * pricing.ts — Үнийн багцууд ба тэдгээрийн харьцуулалтын хүснэгт.
 *
 * Текст засах: доорх `mn:` хэсэгт монгол, `en:` хэсэгт англи хувилбарыг засна.
 * Хоёр хэлэнд ижил `id`-тай байх ёстой.
 */
import type { PlanComparisonRow, PricingPlan } from '../types/content';
import type { Localized } from '../i18n/types';
import { routes } from '../config/routes';

/** ЖИШЭЭ үнэ (төгрөг / сар). Сайтаа нийтлэхээс өмнө жинхэнэ үнээр солино. `null` = "Тохиролцоно". */
const PRICES = {
  free: { monthly: 0, yearly: 0 },
  pro: { monthly: 49000, yearly: 40800 },
  business: { monthly: 149000, yearly: 124200 },
  enterprise: { monthly: null, yearly: null },
} as const;

/** 4 үнийн багц: Free, Pro, Business, Enterprise. */
export const pricingPlans: Localized<PricingPlan[]> = {
  mn: [
    {
      id: 'free',
      name: 'Free',
      tagline: 'Жижиг баг, анхны хурлаа туршихад',
      price: PRICES.free,
      priceNote: 'Хугацаагүй үнэгүй',
      features: ['Үндсэн онлайн хурал', 'Энгийн санал асуулга', '25 хүртэл оролцогч', 'Сүүлийн 30 хоногийн түүх'],
      cta: { label: 'Үнэгүй эхлэх', to: routes.signup },
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'Тогтмол хурал хийдэг баг, хэлтэст',
      price: PRICES.pro,
      priceNote: 'нэг зохион байгуулагч / сар',
      features: ['Хязгааргүй хурал', 'Нарийвчилсан санал хураалт', 'Хурлын бүрэн түүх', 'Оролцогчдын идэвхийн шинжилгээ', '150 хүртэл оролцогч'],
      cta: { label: 'Pro-г сонгох', to: routes.signup },
    },
    {
      id: 'business',
      name: 'Business',
      tagline: 'Олон баг, хэлтэстэй байгууллагад',
      price: PRICES.business,
      priceNote: 'байгууллага / сар',
      features: ['Pro багцын бүх боломж', 'Баг, хэлтсийн удирдлага', 'Эрхийн нарийвчилсан тохиргоо', 'Тайлан, экспорт', 'Байгууллагын хяналтын самбар', '500 хүртэл оролцогч'],
      cta: { label: 'Business-ийг сонгох', to: routes.signup },
      highlighted: true,
      badge: 'Хамгийн түгээмэл',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'Томоохон байгууллага, төрийн салбарт',
      price: PRICES.enterprise,
      priceNote: 'Хэрэгцээнд тань тохируулна',
      features: ['Тусгайлсан шийдэл', 'Хариуцсан менежер, дэмжлэг', 'Аюулгүй байдлын нэмэлт тохиргоо', 'Системийн интеграц', 'Хязгааргүй оролцогч'],
      cta: { label: 'Бидэнтэй холбогдох', to: routes.contact },
    },
  ],
  en: [
    {
      id: 'free',
      name: 'Free',
      tagline: 'For small teams trying their first meeting',
      price: PRICES.free,
      priceNote: 'Free forever',
      features: ['Basic online meetings', 'Simple polls', 'Up to 25 participants', 'Last 30 days of history'],
      cta: { label: 'Start for free', to: routes.signup },
    },
    {
      id: 'pro',
      name: 'Pro',
      tagline: 'For teams and departments that meet regularly',
      price: PRICES.pro,
      priceNote: 'per organizer / month',
      features: ['Unlimited meetings', 'Advanced voting', 'Full meeting history', 'Participant engagement analytics', 'Up to 150 participants'],
      cta: { label: 'Choose Pro', to: routes.signup },
    },
    {
      id: 'business',
      name: 'Business',
      tagline: 'For organizations with many teams and departments',
      price: PRICES.business,
      priceNote: 'per organization / month',
      features: ['Everything in Pro', 'Team and department management', 'Advanced permissions', 'Reports and exports', 'Organization dashboard', 'Up to 500 participants'],
      cta: { label: 'Choose Business', to: routes.signup },
      highlighted: true,
      badge: 'Most popular',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      tagline: 'For large organizations and the public sector',
      price: PRICES.enterprise,
      priceNote: 'Tailored to your needs',
      features: ['Custom solution', 'Dedicated manager and support', 'Advanced security options', 'Custom integrations', 'Unlimited participants'],
      cta: { label: 'Contact us', to: routes.contact },
    },
  ],
};

/** Үнэ хуудасны "Багцуудыг харьцуулах" хүснэгт: true = ✓, false = —. */
export const planComparison: Localized<PlanComparisonRow[]> = {
  mn: [
    { label: 'Оролцогчийн тоо', values: { free: '25', pro: '150', business: '500', enterprise: 'Хязгааргүй' } },
    { label: 'Хурлын тоо', values: { free: 'Сард 5', pro: 'Хязгааргүй', business: 'Хязгааргүй', enterprise: 'Хязгааргүй' } },
    { label: 'Санал хураалт, санал асуулга', values: { free: true, pro: true, business: true, enterprise: true } },
    { label: 'Асуулт, санал, хүсэлт', values: { free: true, pro: true, business: true, enterprise: true } },
    { label: 'Нууц санал хураалт', values: { free: false, pro: true, business: true, enterprise: true } },
    { label: 'Ирцийн босго, батлах хувь', values: { free: false, pro: true, business: true, enterprise: true } },
    { label: 'Хурлын түүх', values: { free: '30 хоног', pro: 'Бүрэн', business: 'Бүрэн', enterprise: 'Бүрэн' } },
    { label: 'Хурлын дэлгэц (танхим)', values: { free: false, pro: true, business: true, enterprise: true } },
    { label: 'Баг, хэлтсийн удирдлага', values: { free: false, pro: false, business: true, enterprise: true } },
    { label: 'Тайлан, экспорт', values: { free: false, pro: false, business: true, enterprise: true } },
    { label: 'Үйлдлийн бүртгэл', values: { free: false, pro: false, business: true, enterprise: true } },
    { label: 'Системийн интеграц', values: { free: false, pro: false, business: false, enterprise: true } },
    { label: 'Дэмжлэг', values: { free: 'Имэйл', pro: 'Имэйл', business: 'Тэргүүн ээлжийн', enterprise: 'Хариуцсан менежер' } },
  ],
  en: [
    { label: 'Participants', values: { free: '25', pro: '150', business: '500', enterprise: 'Unlimited' } },
    { label: 'Meetings', values: { free: '5 per month', pro: 'Unlimited', business: 'Unlimited', enterprise: 'Unlimited' } },
    { label: 'Voting and polls', values: { free: true, pro: true, business: true, enterprise: true } },
    { label: 'Questions, suggestions, requests', values: { free: true, pro: true, business: true, enterprise: true } },
    { label: 'Secret ballot', values: { free: false, pro: true, business: true, enterprise: true } },
    { label: 'Quorum and approval threshold', values: { free: false, pro: true, business: true, enterprise: true } },
    { label: 'Meeting history', values: { free: '30 days', pro: 'Full', business: 'Full', enterprise: 'Full' } },
    { label: 'Room display', values: { free: false, pro: true, business: true, enterprise: true } },
    { label: 'Team and department management', values: { free: false, pro: false, business: true, enterprise: true } },
    { label: 'Reports and exports', values: { free: false, pro: false, business: true, enterprise: true } },
    { label: 'Audit log', values: { free: false, pro: false, business: true, enterprise: true } },
    { label: 'Custom integrations', values: { free: false, pro: false, business: false, enterprise: true } },
    { label: 'Support', values: { free: 'Email', pro: 'Email', business: 'Priority', enterprise: 'Dedicated manager' } },
  ],
};
