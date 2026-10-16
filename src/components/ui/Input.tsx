/**
 * Input.tsx — Маягтын талбарууд: нэг мөрт талбар (Input) ба олон мөрт талбар (Textarea).
 *
 * Талбар бүр шошго (label), тусламжийн текст (hint), алдааны мэдэгдэл (error)-тэй.
 * Алдаа гарвал талбарын хүрээ улаан болж, доор нь алдааны текст харагдана.
 * Хэрэглээ: <Input label="Имэйл" type="email" error={errors.email} required />
 */
import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Бүх талбарт нийтлэг загвар. Утсан дээр 16px үсэг — iPhone талбар дээр дарахад хуудсыг томруулахгүй. */
export const fieldClasses =
  'block w-full rounded-lg bg-surface text-base text-ink ring-1 ring-inset ring-slate-300 sm:text-sm placeholder:text-slate-400 transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-500 aria-[invalid=true]:ring-danger-500 disabled:bg-slate-50';

/** Шошго + талбар + тусламж / алдааны текстийг багцлах бүрхүүлийн шинжүүд. */
interface FieldWrapperProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  labelAction?: ReactNode;
  children: ReactNode;
  required?: boolean;
}

/** Талбарын дээд шошго (заавал бол улаан *) ба доод тусламж / алдааны текст. */
export function FieldWrapper({ id, label, hint, error, labelAction, required, children }: FieldWrapperProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-sm font-medium text-ink-soft">
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

/** Дэлгэц уншигч талбарыг уншихдаа алдаа эсвэл тусламжийн текстийг хамт уншихын тулд холбоно. */
function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/** Нэг мөрт талбарын шинжүүд: icon — зүүн талын дүрс, trailing — баруун талын нэмэлт (жишээ нь нууц үг харуулах товч). */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
  labelAction?: ReactNode;
  trailing?: ReactNode;
}

/** Нэг мөрт оруулах талбар. forwardRef — эцэг компонент талбарт шууд хандах (focus хийх) боломжтой. */
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, icon: Icon, labelAction, trailing, id: idProp, className, required, ...rest },
  ref,
) {
  const autoId = useId();
  // id өгөөгүй бол автоматаар үүсгэнэ (шошго ба талбарыг холбоход хэрэгтэй).
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
          className={cn(fieldClasses, 'h-11 px-3.5', Icon && 'pl-10', Boolean(trailing) && 'pr-11', className)}
          {...rest}
        />
        {trailing && <div className="absolute inset-y-0 right-1 flex items-center">{trailing}</div>}
      </div>
    </FieldWrapper>
  );
});

export default Input;

/** Олон мөрт талбарын шинжүүд. */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
  error?: string;
}

/** Олон мөрт текст оруулах талбар (жишээ нь "Мессеж"). */
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
