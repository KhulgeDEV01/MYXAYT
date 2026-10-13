import type { PlanComparisonRow, PricingPlan } from '../types/content';
import { routes } from '../config/routes';

/** DEMO prices (MNT / month). Replace with real pricing before launch. */
export const YEARLY_DISCOUNT_LABEL = '2 сар үнэгүй';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Жижиг баг, анхны хурлаа туршихад',
    price: { monthly: 0, yearly: 0 },
    priceNote: 'Хугацаагүй үнэгүй',
    features: ['Үндсэн онлайн хурал', 'Энгийн санал асуулга', '25 хүртэл оролцогч', 'Сүүлийн 30 хоногийн түүх'],
    cta: { label: 'Үнэгүй эхлэх', to: routes.signup },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Тогтмол хурал хийдэг баг, хэлтэст',
    price: { monthly: 49000, yearly: 40800 },
    priceNote: 'нэг зохион байгуулагч / сар',
    features: [
      'Хязгааргүй хурал',
      'Нарийвчилсан санал хураалт',
      'Хурлын бүрэн түүх',
      'Оролцогчдын идэвхийн шинжилгээ',
      '150 хүртэл оролцогч',
    ],
    cta: { label: 'Pro-г сонгох', to: routes.signup },
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Олон баг, хэлтэстэй байгууллагад',
    price: { monthly: 149000, yearly: 124200 },
    priceNote: 'байгууллага / сар',
    features: [
      'Pro багцын бүх боломж',
      'Баг, хэлтсийн удирдлага',
      'Эрхийн нарийвчилсан тохиргоо',
      'Тайлан, экспорт',
      'Байгууллагын хяналтын самбар',
      '500 хүртэл оролцогч',
    ],
    cta: { label: 'Business-ийг сонгох', to: routes.signup },
    highlighted: true,
    badge: 'Хамгийн түгээмэл',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Томоохон байгууллага, төрийн салбарт',
    price: { monthly: null, yearly: null },
    priceNote: 'Хэрэгцээнд тань тохируулна',
    features: [
      'Тусгайлсан шийдэл',
      'Хариуцсан менежер, дэмжлэг',
      'Аюулгүй байдлын нэмэлт тохиргоо',
      'Системийн интеграц',
      'Хязгааргүй оролцогч',
    ],
    cta: { label: 'Бидэнтэй холбогдох', to: routes.contact },
  },
];

export const planComparison: PlanComparisonRow[] = [
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
];
