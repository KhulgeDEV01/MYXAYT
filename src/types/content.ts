import type { LucideIcon } from 'lucide-react';

/** Types for marketing content. Shaped so the data can later come from a CMS/API. */

export interface NavItem {
  label: string;
  to: string;
}

export interface FooterLink extends NavItem {
  /** Page not published yet — rendered as plain text with a "Удахгүй" label. */
  comingSoon?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description?: string;
}

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points?: string[];
}

export interface ProcessStep {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export type WorkflowActor = 'organizer' | 'participant' | 'system' | 'organization';

export interface WorkflowStep {
  id: string;
  actor: WorkflowActor;
  title: string;
  icon: LucideIcon;
}

export interface Solution {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
}

export interface UseCase {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
}

export interface SecurityItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export type BillingPeriod = 'monthly' | 'yearly';

export interface PricingPlan {
  id: 'free' | 'pro' | 'business' | 'enterprise';
  name: string;
  tagline: string;
  /** Price in MNT per month. `null` = custom quote. */
  price: Record<BillingPeriod, number | null>;
  priceNote: string;
  features: string[];
  cta: { label: string; to: string };
  highlighted?: boolean;
  badge?: string;
}

export interface PlanComparisonRow {
  label: string;
  values: Record<PricingPlan['id'], string | boolean>;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CompanyValue {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
