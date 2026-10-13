import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { footerColumns } from '../../data/navigation';
import { siteConfig } from '../../config/site';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-300" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Сайтын доод цэс
      </h2>
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Онлайн хурал, санал хураалт, санал асуулга болон оролцогчдын шууд санал бодлыг нэг дор нэгтгэсэн
              байгууллагын платформ.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail size={16} aria-hidden="true" className="text-navy-400" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} aria-hidden="true" className="text-navy-400" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="hover:text-white">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} aria-hidden="true" className="text-navy-400" />
                {siteConfig.contact.address}
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.comingSoon ? (
                        <span className="inline-flex flex-wrap items-center gap-2 text-navy-400">
                          {link.label}
                          <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-navy-300">
                            Удахгүй
                          </span>
                        </span>
                      ) : (
                        <Link to={link.to} className="transition-colors hover:text-white">
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
          <p className="text-sm text-navy-400">
            © {siteConfig.foundedYear} {siteConfig.name}. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <SocialIcons />
        </div>
      </Container>
    </footer>
  );
}
