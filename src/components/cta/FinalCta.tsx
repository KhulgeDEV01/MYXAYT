import { ArrowRight } from 'lucide-react';
import { routes } from '../../config/routes';
import { useI18n } from '../../i18n/useI18n';
import Button from '../ui/Button';
import Container from '../ui/Container';

interface FinalCtaProps {
  title?: string;
  description?: string;
}

export default function FinalCta({ title, description }: FinalCtaProps) {
  const { t } = useI18n();

  return (
    <section aria-labelledby="cta-title" className="bg-surface py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl bg-brand-600 px-6 py-14 sm:px-12 lg:px-16 lg:py-16">
          <div aria-hidden="true" className="bg-grid-dark absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="cta-title" className="text-3xl leading-tight font-semibold text-balance text-white sm:text-4xl">
                {title ?? t.cta.title}
              </h2>
              <p className="mt-4 text-lg text-white/85">{description ?? t.cta.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
              <Button to={routes.signup} variant="inverse" size="lg" iconRight={ArrowRight}>
                {t.cta.primary}
              </Button>
              <Button to={routes.contact} variant="outline-inverse" size="lg">
                {t.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
