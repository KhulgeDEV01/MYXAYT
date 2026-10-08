import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Item open on first render. */
  defaultOpenId?: string;
  headingLevel?: 'h3' | 'h4';
  className?: string;
}

/** WAI-ARIA accordion: buttons inside headings, aria-expanded/controls, region panels. */
export default function Accordion({ items, defaultOpenId, headingLevel: Heading = 'h3', className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);
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
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-semibold text-navy-950 transition-colors hover:text-brand-700"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-md ring-1 ring-slate-200 transition-transform duration-200',
                    open && 'rotate-45 bg-brand-50 text-brand-700 ring-brand-200',
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
            </Heading>
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
