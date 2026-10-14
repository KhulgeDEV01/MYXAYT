import { testimonials } from '../../data/testimonials';
import { useI18n } from '../../i18n/useI18n';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from './TestimonialCard';

export default function TestimonialsSection() {
  const { locale, t } = useI18n();

  return (
    <Section id="testimonials" labelledBy="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        eyebrow={t.testimonials.eyebrow}
        title={t.testimonials.title}
        description={t.testimonials.description}
        align="center"
      />
      <ul className="mt-8 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-3">
        {testimonials[locale].map((testimonial, index) => (
          <Reveal as="li" key={testimonial.id} delay={index * 80}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-slate-500">{t.testimonials.disclaimer}</p>
    </Section>
  );
}
