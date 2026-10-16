/**
 * Accordion.tsx — Дарахад нээгдэж / хаагддаг жагсаалт (FAQ хэсэгт ашиглагддаг).
 *
 * Гарчиг дээр дарахад доорх хариулт нь гулсаж нээгдэнэ, дахин дарахад хаагдана.
 * Нэг удаад зөвхөн нэг зүйл нээлттэй байна. Дэлгэц уншигч программд зориулсан
 * ARIA шинжүүдтэй (aria-expanded, aria-controls) — хүртээмжийн стандартыг хангана.
 */
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Жагсаалтын нэг зүйл: давтагдашгүй id, гарчиг, нээгдэх агуулга. */
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Анх ачаалахад нээлттэй байх зүйлийн id. */
  defaultOpenId?: string;
  /** Гарчгийн түвшин (h3 эсвэл h4) — хуудасны гарчгийн бүтцэд тааруулна. */
  headingLevel?: 'h3' | 'h4';
  className?: string;
}

/** Accordion компонент: гарчиг доторх товч + түүнд холбогдсон нээгдэх хэсэг (WAI-ARIA загвар). */
export default function Accordion({ items, defaultOpenId, headingLevel: Heading = 'h3', className }: AccordionProps) {
  // Одоо нээлттэй байгаа зүйлийн id (null = бүгд хаалттай).
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
  // Давтагдашгүй id үүсгэнэ — товч ба хэсгийг aria-аар холбоход хэрэгтэй.
  const baseId = useId();

  return (
    <div className={cn('divide-y divide-slate-200 border-y border-slate-200', className)}>
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id}>
            <Heading className="text-base">
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                // Нээлттэй бол хаана, хаалттай бол нээнэ.
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-semibold text-ink transition-colors hover:text-brand-700 dark:hover:text-brand-300"
              >
                <span>{item.title}</span>
                {/* "+" дүрс — нээгдэхэд 45° эргэж "×" болно. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-md ring-1 ring-slate-200 transition-transform duration-200',
                    open && 'rotate-45 bg-brand-50 text-brand-700 dark:text-brand-300 ring-brand-200',
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
            </Heading>
            {/* Нээгдэх хэсэг: grid-rows 0fr → 1fr шилжилтээр зөөлөн нээгдэнэ. inert — хаалттай үед доторх холбоос руу Tab-аар орохгүй. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                'grid transition-[grid-template-rows] duration-300 ease-out',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="pr-12 pb-5 leading-relaxed text-slate-600">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
