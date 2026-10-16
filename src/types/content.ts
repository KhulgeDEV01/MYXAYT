/**
 * content.ts — Маркетингийн контентын өгөгдлийн төрлүүд (TypeScript type).
 *
 * src/data/ доторх өгөгдөл (боломжууд, үнэ, FAQ…) ямар талбартай байхыг энд тодорхойлно.
 * Ирээдүйд энэ өгөгдлийг CMS / API-аас татахад ч яг энэ хэлбэрээр ирүүлбэл
 * компонентуудыг өөрчлөх шаардлагагүй.
 */
import type { LucideIcon } from 'lucide-react';

/** Цэсний нэг холбоос: харагдах нэр + хаяг. */
export interface NavItem {
  label: string;
  to: string;
}

/** Footer-ийн холбоос. */
export interface FooterLink extends NavItem {
  /** Хуудас хараахан нийтлэгдээгүй — холбоосгүй текст + "Удахгүй" шошготой харагдана. */
  comingSoon?: boolean;
}

/** Footer-ийн нэг багана (гарчиг + холбоосууд). */
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/** Статистикийн нэг тоо (жишээ нь "1,200+ хурал"). */
export interface Stat {
  id: string;
  value: number;
  /** Тооны ард залгах тэмдэгт, жишээ нь "+" эсвэл "%". */
  suffix?: string;
  /** Бутархайн оронгийн тоо (4.8 гэх мэт). */
  decimals?: number;
  label: string;
  description?: string;
}

/** Бүтээгдэхүүний нэг боломж (feature) карт. */
export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Дэлгэрэнгүй жагсаалт (/features хуудсанд ✓ тэмдэгтэй харагдана). */
  points?: string[];
}

/** "Хэрхэн ажилладаг вэ" хэсгийн нэг алхам. */
export interface ProcessStep {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Хурлын мөчлөгийн алхмыг хэн гүйцэтгэх: зохион байгуулагч, оролцогч, систем, байгууллага. */
export type WorkflowActor = 'organizer' | 'participant' | 'system' | 'organization';

/** "Хурлын бүтэн мөчлөг" доторх нэг алхам. */
export interface WorkflowStep {
  id: string;
  actor: WorkflowActor;
  title: string;
  icon: LucideIcon;
}

/** Байгууллагын төрөлд зориулсан шийдэл (Шийдэл хуудас). */
export interface Solution {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
}

/** Хэрэглээний жишээ. */
export interface UseCase {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Жижиг ангиллын шошго (жишээ нь "ЗАСАГЛАЛ"). */
  tag: string;
}

/** Аюулгүй байдлын нэг баталгаа. */
export interface SecurityItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Төлбөрийн давтамж: сар бүр эсвэл жилээр. */
export type BillingPeriod = 'monthly' | 'yearly';

/** Үнийн нэг багц (Free, Pro, Business, Enterprise). */
export interface PricingPlan {
  id: 'free' | 'pro' | 'business' | 'enterprise';
  name: string;
  tagline: string;
  /** Сарын үнэ төгрөгөөр. `null` бол "Тохиролцоно" (тусгай үнэ). */
  price: Record<BillingPeriod, number | null>;
  priceNote: string;
  features: string[];
  cta: { label: string; to: string };
  /** true бол онцолсон (харанхуй өнгөтэй) карт. */
  highlighted?: boolean;
  /** Картын дээд талын шошго, жишээ нь "Хамгийн их сонгогддог". */
  badge?: string;
}

/** Багцуудын харьцуулалтын хүснэгтийн нэг мөр. */
export interface PlanComparisonRow {
  label: string;
  /** Багц бүрийн утга: текст эсвэл ✓ / — (true / false). */
  values: Record<PricingPlan['id'], string | boolean>;
}

/** Хэрэглэгчийн сэтгэгдэл. */
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
}

/** Түгээмэл асуулт ба хариулт. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Байгууллагын үнэт зүйл (Бидний тухай хуудас). */
export interface CompanyValue {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
