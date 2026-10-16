/**
 * SocialIcons.tsx — Facebook, LinkedIn, YouTube холбоосын дүрсүүд (Footer дотор).
 *
 * Хаягуудыг config/site.ts → social хэсгээс засна. Шинэ сүлжээ нэмэх бол доорх
 * `icons` ба `labels`-д нэмж, site.ts-д хаягийг нь оруулна.
 */
import { siteConfig } from '../../config/site';

// Брэндийн дүрсүүдийн SVG зам (lucide сан брэнд дүрс агуулдаггүй тул энд шууд бичсэн).
const icons = {
  facebook:
    'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z',
  linkedin:
    'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z',
  youtube:
    'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z',
} as const;

/** Дэлгэц уншигчид зориулсан нэрс. */
const labels: Record<keyof typeof icons, string> = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};

/** Сошиал сүлжээний холбоосууд — шинэ цонхонд нээгдэнэ. */
export default function SocialIcons() {
  return (
    <ul className="flex gap-2">
      {(Object.keys(icons) as Array<keyof typeof icons>).map((key) => (
        <li key={key}>
          <a
            href={siteConfig.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} — ${labels[key]}`}
            className="flex size-11 items-center justify-center rounded-md text-navy-300 sm:size-9 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
              <path d={icons[key]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
