import type { BillingPeriod } from '../../types/content';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';

interface BillingToggleProps {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}

const periods: BillingPeriod[] = ['monthly', 'yearly'];

export default function BillingToggle({ value, onChange }: BillingToggleProps) {
  const { t } = useI18n();

  return (
    <fieldset className="inline-flex items-center gap-1 rounded-lg bg-surface p-1 shadow-soft ring-1 ring-slate-200">
      <legend className="sr-only">{t.pricing.billingLegend}</legend>
      {periods.map((period) => (
        <label
          key={period}
          className={cn(
            'relative flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-500',
            value === period ? 'bg-ink text-surface' : 'text-slate-600 hover:text-ink',
          )}
        >
          <input
            type="radio"
            name="billing-period"
            value={period}
            checked={value === period}
            onChange={() => onChange(period)}
            className="sr-only"
          />
          {t.pricing[period]}
          {period === 'yearly' && (
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-[10px] font-semibold',
                value === 'yearly' ? 'bg-accent-400 text-navy-950' : 'bg-success-50 text-success-700',
              )}
            >
              {t.pricing.yearlyDiscount}
            </span>
          )}
        </label>
      ))}
    </fieldset>
  );
}
