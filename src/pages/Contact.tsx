import { useState } from 'react';
import type { FormEvent } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input, { Textarea } from '../components/ui/Input';
import Select from '../components/ui/Select';
import Section from '../components/ui/Section';
import { siteConfig } from '../config/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/useI18n';
import type { Dictionary } from '../i18n/dictionaries';
import { submitContactRequest } from '../services/contact';
import type { ContactRequest } from '../services/contact';
import { BackendNotConnectedError } from '../services/apiClient';

type FormState = 'idle' | 'submitting' | 'success' | 'not-connected' | 'error';
type Errors = Partial<Record<keyof ContactRequest, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactRequest, messages: Dictionary['pages']['contact']['errors']): Errors {
  const errors: Errors = {};
  if (!data.fullName.trim()) errors.fullName = messages.fullName;
  if (!EMAIL_PATTERN.test(data.email)) errors.email = messages.email;
  if (!data.topic) errors.topic = messages.topic;
  if (data.message.trim().length < 10) errors.message = messages.message;
  return errors;
}

export default function Contact() {
  const { t } = useI18n();
  const p = t.pages.contact;
  usePageMeta({ title: p.metaTitle, description: p.metaDescription(siteConfig.name) });

  const [status, setStatus] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const contactItems = [
    { icon: Mail, label: p.labels.email, value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Phone, label: p.labels.phone, value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: p.labels.address, value: t.contactInfo.address },
    { icon: Clock, label: p.labels.hours, value: t.contactInfo.hours },
  ];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const data: ContactRequest = {
      fullName: String(form.get('fullName') ?? ''),
      email: String(form.get('email') ?? ''),
      organization: String(form.get('organization') ?? ''),
      organizationSize: String(form.get('organizationSize') ?? ''),
      topic: String(form.get('topic') ?? ''),
      message: String(form.get('message') ?? ''),
    };

    const nextErrors = validate(data, p.errors);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      await submitContactRequest(data);
      setStatus('success');
      formElement.reset();
    } catch (error) {
      setStatus(error instanceof BackendNotConnectedError ? 'not-connected' : 'error');
    }
  };

  return (
    <>
      <PageHeader eyebrow={p.eyebrow} title={p.title} description={p.description} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4" aria-label={p.infoAria}>
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <Card key={label} variant="muted" padding="sm" className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 ring-1 ring-slate-200">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-navy-950 hover:text-brand-700">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-navy-950">{value}</p>
                  )}
                </div>
              </Card>
            ))}
          </aside>

          <Card className="lg:col-span-8" padding="lg">
            <h2 className="text-xl font-semibold">{p.formTitle}</h2>
            <p className="mt-1 text-sm text-slate-500">
              <span aria-hidden="true" className="text-danger-500">
                *
              </span>{' '}
              {p.requiredNote}
            </p>

            <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <Input name="fullName" label={p.fields.fullName} autoComplete="name" required error={errors.fullName} />
              <Input name="email" type="email" label={p.fields.email} autoComplete="email" required error={errors.email} />
              <Input name="organization" label={p.fields.organization} autoComplete="organization" />
              <Select
                name="organizationSize"
                label={p.fields.organizationSize}
                options={p.sizeOptions}
                placeholder={p.fields.select}
                defaultValue=""
              />
              <div className="sm:col-span-2">
                <Select
                  name="topic"
                  label={p.fields.topic}
                  options={p.topicOptions}
                  placeholder={p.fields.select}
                  defaultValue=""
                  required
                  error={errors.topic}
                />
              </div>
              <div className="sm:col-span-2">
                <Textarea name="message" label={p.fields.message} required error={errors.message} placeholder={p.fields.messagePlaceholder} />
              </div>

              {status === 'not-connected' && (
                <Alert tone="warning" className="sm:col-span-2">
                  {p.notConnectedBefore}{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold underline">
                    {siteConfig.contact.email}
                  </a>{' '}
                  {p.notConnectedAfter}
                </Alert>
              )}
              {status === 'success' && (
                <Alert tone="success" className="sm:col-span-2">
                  {p.success}
                </Alert>
              )}
              {status === 'error' && (
                <Alert tone="warning" className="sm:col-span-2">
                  {p.error}
                </Alert>
              )}

              <div className="sm:col-span-2">
                <Button type="submit" size="lg" iconRight={Send} disabled={status === 'submitting'}>
                  {status === 'submitting' ? p.submitting : p.submit}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
