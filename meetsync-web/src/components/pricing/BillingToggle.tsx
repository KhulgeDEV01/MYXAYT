import type { BillingPeriod } from '../../types/content';
import { YEARLY_DISCOUNT_LABEL } from '../../data/pricing';
import { cn } from '../../utils/cn';

interface BillingToggleProps {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}

const options: Array<{ value: BillingPeriod; label: string }> = [
  { value: 'monthly', label: 'Сараар' },
  { value: 'yearly', label: 'Жилээр' },
];

export default function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <fieldset className="inline-flex items-center gap-1 rounded-lg bg-white p-1 shadow-soft ring-1 ring-slate-200">
      <legend className="sr-only">Төлбөрийн давтамж</legend>
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'relative flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500',
            value === option.value ? 'bg-navy-950 text-white' : 'text-slate-600 hover:text-navy-950',
          )}
        >
          <input
            type="radio"
            name="billing-period"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          {option.label}
          {option.value === 'yearly' && (
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-[10px] font-semibold',
                value === 'yearly' ? 'bg-accent-400 text-navy-950' : 'bg-success-50 text-success-700',
              )}
            >
              {YEARLY_DISCOUNT_LABEL}
            </span>
          )}
        </label>
      ))}
    </fieldset>
  );
}
