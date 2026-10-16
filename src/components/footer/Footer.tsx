import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { footerColumns } from '../../data/navigation';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import SocialIcons from './SocialIcons';

export default function Footer() {
  const { locale, t } = useI18n();

  return (
    <footer className="bg-deep text-navy-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t.footer.heading}
      </h2>
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{t.footer.about}</p>
            <ul className="mt-6 space-y-1 text-sm sm:space-y-2.5">
              <li className="flex items-center gap-2.5">
                <Mail size={16} aria-hidden="true" className="text-navy-400" />
                <a href={`mailto:${siteConfig.contact.email}`} className="py-1.5 hover:text-white sm:py-0">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} aria-hidden="true" className="text-navy-400" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="py-1.5 hover:text-white sm:py-0">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} aria-hidden="true" className="text-navy-400" />
                {t.contactInfo.address}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns[locale].map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-3 space-y-1 text-sm sm:mt-4 sm:space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.comingSoon ? (
                        <span className="inline-flex flex-wrap items-center gap-2 py-1.5 text-navy-300 sm:py-0">
                          {link.label}
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-navy-300">
                            {t.common.comingSoon}
                          </span>
                        </span>
                      ) : (
                        <Link to={link.to} className="inline-block py-1.5 transition-colors hover:text-white sm:py-0">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-navy-300">
            © {siteConfig.foundedYear} {siteConfig.name}. {t.footer.rights}
          </p>
          <SocialIcons />
        </div>
      </Container>
    </footer>
  );
}
