import type { FooterColumn, NavItem } from '../types/content';
import { routes } from '../config/routes';

export const mainNav: NavItem[] = [
  { label: 'Боломжууд', to: routes.features },
  { label: 'Шийдэл', to: routes.solutions },
  { label: 'Үнэ', to: routes.pricing },
  { label: 'Бидний тухай', to: routes.about },
  { label: 'Тусламж', to: routes.faq },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Бүтээгдэхүүн',
    links: [
      { label: 'Боломжууд', to: routes.features },
      { label: 'Үнэ', to: routes.pricing },
      { label: 'Шийдэл', to: routes.solutions },
      { label: 'Шинэчлэлт', to: '/changelog', comingSoon: true },
    ],
  },
  {
    title: 'Компани',
    links: [
      { label: 'Бидний тухай', to: routes.about },
      { label: 'Холбоо барих', to: routes.contact },
      { label: 'Карьер', to: '/careers', comingSoon: true },
    ],
  },
  {
    title: 'Тусламж',
    links: [
      { label: 'Тусламжийн төв', to: routes.contact },
      { label: 'FAQ', to: routes.faq },
      { label: 'Холбоо барих', to: routes.contact },
    ],
  },
  {
    title: 'Хууль эрх зүй',
    links: [
      { label: 'Нууцлалын бодлого', to: '/privacy', comingSoon: true },
      { label: 'Үйлчилгээний нөхцөл', to: '/terms', comingSoon: true },
    ],
  },
];
