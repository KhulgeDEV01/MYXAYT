import type { FooterColumn, NavItem } from '../types/content';
import type { Localized } from '../i18n/types';
import { routes } from '../config/routes';

export const mainNav: Localized<NavItem[]> = {
  mn: [
    { label: 'Боломжууд', to: routes.features },
    { label: 'Шийдэл', to: routes.solutions },
    { label: 'Үнэ', to: routes.pricing },
    { label: 'Бидний тухай', to: routes.about },
    { label: 'Тусламж', to: routes.faq },
    { label: 'Холбоо барих', to: routes.contact },
  ],
  en: [
    { label: 'Features', to: routes.features },
    { label: 'Solutions', to: routes.solutions },
    { label: 'Pricing', to: routes.pricing },
    { label: 'About', to: routes.about },
    { label: 'Help', to: routes.faq },
    { label: 'Contact', to: routes.contact },
  ],
};

export const footerColumns: Localized<FooterColumn[]> = {
  mn: [
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
        { label: 'Хамтран ажиллах', to: routes.partnership },
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
  ],
  en: [
    {
      title: 'Product',
      links: [
        { label: 'Features', to: routes.features },
        { label: 'Pricing', to: routes.pricing },
        { label: 'Solutions', to: routes.solutions },
        { label: 'Changelog', to: '/changelog', comingSoon: true },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', to: routes.about },
        { label: 'Contact', to: routes.contact },
        { label: 'Partner with us', to: routes.partnership },
        { label: 'Careers', to: '/careers', comingSoon: true },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help center', to: routes.contact },
        { label: 'FAQ', to: routes.faq },
        { label: 'Contact', to: routes.contact },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy policy', to: '/privacy', comingSoon: true },
        { label: 'Terms of service', to: '/terms', comingSoon: true },
      ],
    },
  ],
};
