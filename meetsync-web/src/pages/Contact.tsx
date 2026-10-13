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
import { submitContactRequest } from '../services/contact';
import type { ContactRequest } from '../services/contact';
import { BackendNotConnectedError } from '../services/apiClient';

const sizeOptions = [
  { value: '1-25', label: '1–25 хүн' },
  { value: '26-150', label: '26–150 хүн' },
  { value: '151-500', label: '151–500 хүн' },
  { value: '500+', label: '500-аас дээш' },
];

const topicOptions = [
  { value: 'demo', label: 'Демо үзүүлэх хүсэлт' },
  { value: 'pricing', label: 'Үнэ, багцын талаар' },
  { value: 'enterprise', label: 'Enterprise шийдэл' },
  { value: 'support', label: 'Техникийн тусламж' },
  { value: 'other', label: 'Бусад' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'not-connected' | 'error';
type Errors = Partial<Record<keyof ContactRequest, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactRequest): Errors {
  const errors: Errors = {};
  if (!data.fullName.trim()) errors.fullName = 'Нэрээ оруулна уу.';
  if (!EMAIL_PATTERN.test(data.email)) errors.email = 'Зөв имэйл хаяг оруулна уу.';
  if (!data.topic) errors.topic = 'Сэдвээ сонгоно уу.';
  if (data.message.trim().length < 10) errors.message = 'Зурвасаа арай дэлгэрэнгүй бичнэ үү.';
  return errors;
}

const contactItems = [
  { icon: Mail, label: 'Имэйл', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  { icon: Phone, label: 'Утас', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: 'Хаяг', value: siteConfig.contact.address },
  { icon: Clock, label: 'Ажлын цаг', value: siteConfig.contact.hours },
];

export default function Contact() {
  usePageMeta({
    title: 'Холбоо барих',
    description: 'MeetSync-тэй холбогдож демо захиалах, үнэ болон Enterprise шийдлийн талаар мэдээлэл аваарай.',
  });

  const [status, setStatus] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Errors>({});

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

    const nextErrors = validate(data);
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
      <PageHeader
        eyebrow="Холбоо барих"
        title="Бидэнтэй холбогдоорой"
        description="Демо үзэх, байгууллагадаа тохирох багц сонгох эсвэл асуулт байвал бидэнд бичээрэй. Ажлын 1 өдөрт багтаан хариу өгнө."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4" aria-label="Холбоо барих мэдээлэл">
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
            <h2 className="text-xl font-semibold">Хүсэлт илгээх</h2>
            <p className="mt-1 text-sm text-slate-500">
              <span aria-hidden="true" className="text-danger-500">*</span> тэмдэгтэй талбарыг заавал бөглөнө.
            </p>

            <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <Input name="fullName" label="Овог нэр" autoComplete="name" required error={errors.fullName} />
              <Input name="email" type="email" label="Имэйл" autoComplete="email" required error={errors.email} />
              <Input name="organization" label="Байгууллага" autoComplete="organization" />
              <Select name="organizationSize" label="Байгууллагын хэмжээ" options={sizeOptions} placeholder="Сонгох" defaultValue="" />
              <div className="sm:col-span-2">
                <Select name="topic" label="Сэдэв" options={topicOptions} placeholder="Сонгох" defaultValue="" required error={errors.topic} />
              </div>
              <div className="sm:col-span-2">
                <Textarea name="message" label="Зурвас" required error={errors.message} placeholder="Хурлын төрөл, оролцогчийн тоо, хэрэгцээнийхээ талаар товч бичээрэй." />
              </div>

              {status === 'not-connected' && (
                <Alert tone="warning" className="sm:col-span-2">
                  Онлайн маягт одоогоор сервертэй холбогдоогүй тул таны хүсэлт илгээгдсэнгүй. Түр хугацаанд{' '}
                  <a href={`mailto:${siteConfig.contact.email}`} className="font-semibold underline">
                    {siteConfig.contact.email}
                  </a>{' '}
                  хаягаар бидэнд шууд бичнэ үү.
                </Alert>
              )}
              {status === 'success' && (
                <Alert tone="success" className="sm:col-span-2">
                  Таны хүсэлтийг хүлээн авлаа. Бид удахгүй холбогдоно.
                </Alert>
              )}
              {status === 'error' && (
                <Alert tone="warning" className="sm:col-span-2">
                  Алдаа гарлаа. Дахин оролдоно уу.
                </Alert>
              )}

              <div className="sm:col-span-2">
                <Button type="submit" size="lg" iconRight={Send} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Илгээж байна…' : 'Илгээх'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
