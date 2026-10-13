import { useState } from 'react';
import type { FormEvent } from 'react';
import { CircleCheck, CircleEllipsis, Handshake, Mail, MessageSquareText, MonitorPlay, Send } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { buildMailtoLink, deliveryProvider, sendRequestEmail } from '../../services/contact';
import type { ContactRequest, RequestEmail, RequestType } from '../../services/contact';
import { cn } from '../../utils/cn';
import Alert from '../ui/Alert';
import Button from '../ui/Button';
import Input, { Textarea } from '../ui/Input';

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'not-configured';
type Errors = Partial<Record<'fullName' | 'email' | 'organization' | 'message', string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const requestTypes: Array<{ id: RequestType; icon: LucideIcon }> = [
  { id: 'contact', icon: MessageSquareText },
  { id: 'partnership', icon: Handshake },
  { id: 'demo', icon: MonitorPlay },
  { id: 'other', icon: CircleEllipsis },
];

interface RequestFormProps {
  id?: string;
  type: RequestType;
  onTypeChange: (type: RequestType) => void;
}

/** Contact / partnership request form. Delivers by email (see services/contact.ts). */
export default function RequestForm({ id = 'request-form', type, onTypeChange }: RequestFormProps) {
  const { t } = useI18n();
  const f = t.requestForm;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState('');
  const [mailtoLink, setMailtoLink] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();

    // Honeypot: real visitors never see or fill this field.
    if (value('botcheck')) {
      setStatus('success');
      return;
    }

    const data: ContactRequest = {
      type,
      fullName: value('fullName'),
      email: value('email'),
      phone: value('phone'),
      organization: value('organization'),
      message: value('message'),
    };

    const nextErrors: Errors = {};
    if (!data.fullName) nextErrors.fullName = f.errors.fullName;
    if (!EMAIL_PATTERN.test(data.email)) nextErrors.email = f.errors.email;
    if (type === 'partnership' && !data.organization) nextErrors.organization = f.errors.organization;
    if (data.message.length < 10) nextErrors.message = f.errors.message;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const email: RequestEmail = {
      subject: f.emailSubject(f.types[type], data.fullName, data.organization),
      replyTo: data.email,
      fromName: `${siteConfig.name} — ${f.types[type]}`,
      fields: [
        [f.fields.type, f.types[type]],
        [f.fields.fullName, data.fullName],
        [f.fields.email, data.email],
        [f.fields.phone, data.phone],
        [f.fields.organization, data.organization],
        [f.fields.message, data.message],
      ],
    };
    const fallback = buildMailtoLink(siteConfig.contact.email, email);
    setMailtoLink(fallback);

    if (deliveryProvider === 'none') {
      setStatus('not-configured');
      return;
    }

    setStatus('submitting');
    try {
      await sendRequestEmail(email);
      setSentTo(data.email);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div id={id} role="status" className="flex flex-col items-center py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-success-50 text-success-600">
          <CircleCheck size={28} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">{f.successTitle}</h3>
        {sentTo && <p className="mt-2 max-w-sm text-slate-600">{f.successText(sentTo)}</p>}
        <Button variant="secondary" className="mt-8" onClick={() => setStatus('idle')}>
          {f.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form id={id} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium text-ink-soft">{f.typeLegend}</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {requestTypes.map(({ id: typeId, icon: Icon }) => {
            const selected = type === typeId;
            return (
              <label
                key={typeId}
                className={cn(
                  'flex cursor-pointer flex-col items-start gap-2 rounded-lg p-3 text-sm font-medium ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
                  selected
                    ? 'bg-brand-50 text-ink ring-2 ring-brand-500'
                    : 'bg-surface text-slate-600 ring-slate-200 hover:ring-slate-300',
                )}
              >
                <input
                  type="radio"
                  name="type"
                  value={typeId}
                  checked={selected}
                  onChange={() => onTypeChange(typeId)}
                  className="sr-only"
                />
                <Icon
                  size={18}
                  aria-hidden="true"
                  className={selected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}
                />
                {f.types[typeId]}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Input name="fullName" label={f.fields.fullName} autoComplete="name" required error={errors.fullName} />
      <Input name="email" type="email" label={f.fields.email} autoComplete="email" required error={errors.email} />
      <Input name="phone" type="tel" label={`${f.fields.phone} (${f.optional})`} autoComplete="tel" />
      <Input
        name="organization"
        label={type === 'partnership' ? f.fields.organization : `${f.fields.organization} (${f.optional})`}
        autoComplete="organization"
        required={type === 'partnership'}
        error={errors.organization}
      />
      <div className="sm:col-span-2">
        <Textarea
          name="message"
          label={f.fields.message}
          required
          error={errors.message}
          placeholder={f.messagePlaceholders[type]}
        />
      </div>

      {/* Honeypot for spam bots — hidden from people and assistive tech. */}
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      {(status === 'not-configured' || status === 'error') && (
        <div className="space-y-3 sm:col-span-2">
          <Alert tone="warning">{status === 'error' ? f.error : f.notConfigured}</Alert>
          <Button href={mailtoLink} variant="secondary" iconLeft={Mail}>
            {f.openEmail}
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          <span aria-hidden="true" className="text-danger-500">
            *
          </span>{' '}
          {f.requiredNote} {f.privacy}
        </p>
        <Button type="submit" size="lg" iconRight={Send} disabled={status === 'submitting'}>
          {status === 'submitting' ? f.submitting : f.submit}
        </Button>
      </div>
    </form>
  );
}
