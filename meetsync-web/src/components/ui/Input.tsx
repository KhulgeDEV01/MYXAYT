import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export const fieldClasses =
  'block w-full rounded-lg bg-white text-sm text-navy-950 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-500 aria-[invalid=true]:ring-danger-500 disabled:bg-slate-50';

interface FieldWrapperProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  labelAction?: ReactNode;
  children: ReactNode;
  required?: boolean;
}

export function FieldWrapper({ id, label, hint, error, labelAction, required, children }: FieldWrapperProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-navy-900">
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-danger-500">
              *
            </span>
          )}
        </label>
        {labelAction}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
  labelAction?: ReactNode;
  trailing?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, icon: Icon, labelAction, trailing, id: idProp, className, required, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} labelAction={labelAction} required={required}>
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />
        )}
        <input
          ref={ref}
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(fieldClasses, 'h-11 px-3.5', Icon && 'pl-10', trailing && 'pr-11', className)}
          {...rest}
        />
        {trailing && <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div>}
      </div>
    </FieldWrapper>
  );
});

export default Input;

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id: idProp, className, required, ...rest }: TextareaProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldWrapper id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(fieldClasses, 'min-h-32 px-3.5 py-3', className)}
        {...rest}
      />
    </FieldWrapper>
  );
}
