/**
 * Select.tsx — Сонголтын жагсаалттай талбар (dropdown).
 *
 * Хэрэглээ: <Select label="Төрөл" options={[{ value: "a", label: "А" }]} />
 * Шошго, алдааны текстийг Input.tsx доторх FieldWrapper-ээр харуулна.
 */
import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { FieldWrapper, fieldClasses } from './Input';

/** Нэг сонголт: value — кодын утга, label — харагдах текст. */
export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
}

/** Хөтчийн стандарт <select> дээр сайтын загварыг өгсөн талбар. */
export default function Select({
  label,
  options,
  placeholder,
  hint,
  error,
  id: idProp,
  className,
  required,
  ...rest
}: SelectProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          className={cn(fieldClasses, 'h-11 appearance-none pr-10 pl-3.5', className)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Баруун талын сум дүрс (хөтчийн өөрийн сумыг appearance-none-оор нуусан). */}
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-slate-400"
        />
      </div>
    </FieldWrapper>
  );
}
