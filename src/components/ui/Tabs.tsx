import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  label: string;
  defaultValue?: string;
  className?: string;
  listClassName?: string;
  children: (activeId: string) => ReactNode;
}

/** Accessible tabs with arrow / Home / End keyboard navigation (automatic activation). */
export default function Tabs({ items, label, defaultValue, className, listClassName, children }: TabsProps) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.id);
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    setActive(items[next].id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyMap: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in keyMap) {
      event.preventDefault();
      focusTab(keyMap[event.key]);
    }
  };

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className={cn('flex gap-1 rounded-lg bg-slate-100 p-1', listClassName)}>
        {items.map((item, index) => {
          const selected = item.id === active;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
              className={cn(
                'flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-semibold transition-colors sm:text-sm',
                selected ? 'bg-white text-navy-950 shadow-soft' : 'text-slate-600 hover:text-navy-900',
              )}
            >
              {Icon && <Icon size={15} aria-hidden="true" className="hidden shrink-0 sm:block" />}
              <span className="truncate">{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={cn(
                    'rounded px-1 text-[10px] tabular-nums',
                    selected ? 'bg-brand-50 text-brand-700' : 'bg-slate-200 text-slate-600',
                  )}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          tabIndex={0}
          className="focus-visible:outline-offset-4"
        >
          {item.id === active && children(item.id)}
        </div>
      ))}
    </div>
  );
}
