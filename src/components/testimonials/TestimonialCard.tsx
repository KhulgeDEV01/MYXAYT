import { Quote } from 'lucide-react';
import type { Testimonial } from '../../types/content';
import Avatar from '../ui/Avatar';
import Card from '../ui/Card';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card as="figure" className="flex h-full flex-col">
      <Quote size={24} aria-hidden="true" className="size-5 sm:size-6 text-brand-200" />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft sm:mt-4 sm:text-base">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4 sm:mt-6 sm:pt-5">
        <Avatar name={testimonial.name} size="md" />
        <div>
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-sm text-slate-500">
            {testimonial.role}, {testimonial.organization}
          </p>
        </div>
      </figcaption>
    </Card>
  );
}
