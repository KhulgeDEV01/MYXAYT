/**
 * routes.ts — Сайтын бүх хуудасны URL хаягууд нэг дор.
 *
 * Холбоос (link) бичихдээ '/pricing' гэж шууд бичихийн оронд `routes.pricing`
 * гэж ашигладаг. Ингэснээр хаяг өөрчлөгдвөл зөвхөн энд нэг газар засахад хангалттай.
 */
export const routes = {
  home: '/', // Нүүр хуудас
  features: '/features', // Боломжууд
  solutions: '/solutions', // Шийдэл
  pricing: '/pricing', // Үнэ
  about: '/about', // Бидний тухай
  contact: '/contact', // Холбоо барих
  partnership: '/contact?type=partnership', // Холбоо барих хуудас, "Хамтын ажиллагаа" сонголт идэвхтэй
  login: '/login', // Нэвтрэх
  signup: '/login?mode=signup', // Бүртгүүлэх (нэвтрэх хуудасны бүртгэлийн горим)
  faq: '/#faq', // Нүүр хуудасны "Түгээмэл асуулт" хэсэг
  howItWorks: '/#how-it-works', // Нүүр хуудасны "Хэрхэн ажилладаг вэ" хэсэг
} as const;
