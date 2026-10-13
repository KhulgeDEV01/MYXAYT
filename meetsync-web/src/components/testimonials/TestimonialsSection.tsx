import { testimonials } from '../../data/testimonials';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from './TestimonialCard';

export default function TestimonialsSection() {
  return (
    <Section id="testimonials" labelledBy="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        eyebrow="Хэрэглэгчдийн сэтгэгдэл"
        title="Хурлаа өөрчилсөн байгууллагууд"
        description="Оролцоо нэмэгдэж, шийдвэр гаргах хугацаа богиноссон тухай хэрэглэгчдийн туршлага."
        align="center"
      />
      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal as="li" key={testimonial.id} delay={index * 80}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-center text-xs text-slate-400">* Жишээ сэтгэгдэл. Бодит хэрэглэгчийн сэтгэгдлээр солигдоно.</p>
    </Section>
  );
}
