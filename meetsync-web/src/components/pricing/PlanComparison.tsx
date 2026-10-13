import { Check, Minus } from 'lucide-react';
import { planComparison, pricingPlans } from '../../data/pricing';
import { cn } from '../../utils/cn';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export default function PlanComparison() {
  return (
    <Section labelledBy="compare-title">
      <SectionHeading id="compare-title" title="Багцуудыг харьцуулах" description="Багц бүрт багтах боломжуудын дэлгэрэнгүй." />

      {/* Horizontal scroll is contained inside this wrapper on small screens. */}
      <div className="mt-10 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-label="Багцын харьцуулалтын хүснэгт">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="sr-only">MeetSync багцуудын боломжийн харьцуулалт</caption>
          <thead>
            <tr className="border-b border-slate-200">
              <th scope="col" className="w-1/3 py-4 pr-4 font-medium text-slate-500">
                Боломж
              </th>
              {pricingPlans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={cn('px-3 py-4 text-center font-semibold text-navy-950', plan.highlighted && 'bg-brand-50/60')}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {planComparison.map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <th scope="row" className="py-3.5 pr-4 font-normal text-slate-700">
                  {row.label}
                </th>
                {pricingPlans.map((plan) => {
                  const value = row.values[plan.id];
                  return (
                    <td key={plan.id} className={cn('px-3 py-3.5 text-center', plan.highlighted && 'bg-brand-50/60')}>
                      {value === true ? (
                        <>
                          <Check size={18} aria-hidden="true" className="mx-auto text-brand-600" />
                          <span className="sr-only">Багтсан</span>
                        </>
                      ) : value === false ? (
                        <>
                          <Minus size={18} aria-hidden="true" className="mx-auto text-slate-300" />
                          <span className="sr-only">Багтаагүй</span>
                        </>
                      ) : (
                        <span className="text-navy-900">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
