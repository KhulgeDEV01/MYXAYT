import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Building2, Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react';
import Alert from '../components/ui/Alert';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Logo from '../components/ui/Logo';
import Modal from '../components/ui/Modal';
import ProgressBar from '../components/ui/ProgressBar';
import { routes } from '../config/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { authService } from '../services/auth';

type Mode = 'signin' | 'signup';
type Errors = Partial<Record<'fullName' | 'organization' | 'email' | 'password', string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.55 10.55 0 0 0 12 1 11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

const NOT_CONNECTED_MESSAGE =
  'Нэвтрэх систем одоогоор хөгжүүлэлтийн шатанд байгаа тул бүртгэл, нэвтрэлт ажиллахгүй байна. Удахгүй нээгдэнэ.';

export default function Login() {
  const [params, setParams] = useSearchParams();
  const mode: Mode = params.get('mode') === 'signup' ? 'signup' : 'signin';
  const isSignup = mode === 'signup';

  usePageMeta({
    title: isSignup ? 'Бүртгэл үүсгэх' : 'Нэвтрэх',
    description: 'MeetSync платформд нэвтэрч хурал, санал хураалтаа удирдаарай.',
    noIndex: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  const switchMode = (next: Mode) => {
    setErrors({});
    setNotice(null);
    setParams(next === 'signup' ? { mode: 'signup' } : {}, { replace: true });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const fullName = String(form.get('fullName') ?? '');
    const organization = String(form.get('organization') ?? '');

    const nextErrors: Errors = {};
    if (isSignup && !fullName.trim()) nextErrors.fullName = 'Нэрээ оруулна уу.';
    if (isSignup && !organization.trim()) nextErrors.organization = 'Байгууллагын нэрээ оруулна уу.';
    if (!EMAIL_PATTERN.test(email)) nextErrors.email = 'Зөв имэйл хаяг оруулна уу.';
    if (password.length < (isSignup ? 8 : 1)) {
      nextErrors.password = isSignup ? 'Нууц үг хамгийн багадаа 8 тэмдэгт байна.' : 'Нууц үгээ оруулна уу.';
    }
    setErrors(nextErrors);
    setNotice(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      // Real implementation will redirect into the app on success.
      if (isSignup) await authService.signUp({ email, password, fullName, organization });
      else await authService.signIn({ email, password });
    } catch {
      setNotice(NOT_CONNECTED_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  };

  const onGoogle = async () => {
    try {
      await authService.signInWithGoogle();
    } catch {
      setNotice(NOT_CONNECTED_MESSAGE);
    }
  };

  const onReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('resetEmail') ?? '');
    if (!EMAIL_PATTERN.test(email)) {
      setResetNotice('Зөв имэйл хаяг оруулна уу.');
      return;
    }
    try {
      await authService.requestPasswordReset(email);
    } catch {
      setResetNotice('Нууц үг сэргээх үйлчилгээ одоогоор холбогдоогүй байна. Нэвтрэх систем нээгдсэний дараа ашиглах боломжтой.');
    }
  };

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <main id="main" className="flex flex-col px-4 py-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to={routes.home} className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-600 hover:text-navy-950">
            <ArrowLeft size={16} aria-hidden="true" /> Нүүр хуудас
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <h1 className="text-3xl font-semibold">{isSignup ? 'Бүртгэл үүсгэх' : 'Тавтай морил'}</h1>
          <p className="mt-2 text-slate-600">
            {isSignup ? 'Үнэгүй багцаар эхэлж, анхны хурлаа хэдхэн минутад үүсгээрэй.' : 'Хурал, санал хураалтаа удирдахын тулд нэвтэрнэ үү.'}
          </p>

          <Button variant="secondary" size="lg" fullWidth className="mt-8 gap-3" onClick={onGoogle}>
            <GoogleIcon />
            Google-р {isSignup ? 'бүртгүүлэх' : 'нэвтрэх'}
          </Button>

          <div className="my-6 flex items-center gap-4 text-xs text-slate-400" role="separator">
            <span className="h-px flex-1 bg-slate-200" />
            эсвэл имэйлээр
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form noValidate onSubmit={onSubmit} className="space-y-5">
            {isSignup && (
              <>
                <Input name="fullName" label="Овог нэр" icon={User} autoComplete="name" error={errors.fullName} />
                <Input name="organization" label="Байгууллага" icon={Building2} autoComplete="organization" error={errors.organization} />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="Имэйл"
              icon={Mail}
              autoComplete="email"
              placeholder="name@company.mn"
              error={errors.email}
            />
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Нууц үг"
              icon={LockKeyhole}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              error={errors.password}
              hint={isSignup ? 'Хамгийн багадаа 8 тэмдэгт' : undefined}
              labelAction={
                !isSignup && (
                  <button
                    type="button"
                    onClick={() => {
                      setResetNotice(null);
                      setResetOpen(true);
                    }}
                    className="rounded text-sm font-medium text-brand-700 hover:underline"
                  >
                    Нууц үг мартсан?
                  </button>
                )
              }
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Нууц үгийг нуух' : 'Нууц үгийг харуулах'}
                  aria-pressed={showPassword}
                  className="flex size-9 items-center justify-center rounded-md text-slate-500 hover:text-navy-900"
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              }
            />

            {notice && <Alert tone="info">{notice}</Alert>}

            <Button type="submit" size="lg" fullWidth disabled={submitting}>
              {submitting ? 'Түр хүлээнэ үү…' : isSignup ? 'Бүртгэл үүсгэх' : 'Нэвтрэх'}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            {isSignup ? 'Бүртгэлтэй юу? ' : 'Бүртгэлгүй юу? '}
            <button
              type="button"
              onClick={() => switchMode(isSignup ? 'signin' : 'signup')}
              className="rounded font-semibold text-brand-700 hover:underline"
            >
              {isSignup ? 'Нэвтрэх' : 'Бүртгэл үүсгэх'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400">
          Үргэлжлүүлснээр та үйлчилгээний нөхцөл болон нууцлалын бодлогыг зөвшөөрч байна.
        </p>
      </main>

      {/* Brand panel */}
      <aside aria-hidden="true" className="relative hidden overflow-hidden bg-navy-950 lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative mx-auto w-full max-w-md">
          <p className="text-2xl leading-snug font-semibold text-white">
            “Хурал дээр хэлэгдээгүй санал шийдвэрийн чанарт нөлөөлдөг.”
          </p>
          <p className="mt-4 text-navy-300">Хүн бүрийн санал бодлыг нэг дор цуглуулж, шийдвэрээ хамтдаа гарга.</p>

          <div className="mt-10 rounded-xl bg-white p-5 shadow-elevated">
            <p className="text-[11px] font-semibold tracking-wider text-brand-600 uppercase">Санал хураалт · Шууд</p>
            <p className="mt-2 font-semibold text-navy-950">2027 оны төсвийн төслийг батлах уу?</p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Дэмжиж байна', value: 74, tone: 'positive' as const },
                { label: 'Татгалзаж байна', value: 18, tone: 'negative' as const },
                { label: 'Түдгэлзсэн', value: 8, tone: 'neutral' as const },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-600">{row.label}</span>
                    <span className="font-semibold text-navy-950">{row.value}%</span>
                  </div>
                  <ProgressBar value={row.value} tone={row.tone} label={row.label} />
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">38 / 40 гишүүн санал өгсөн</p>
          </div>
        </div>
      </aside>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Нууц үг сэргээх"
        description="Бүртгэлтэй имэйл хаягаа оруулбал нууц үг сэргээх холбоос илгээнэ."
        size="sm"
      >
        <form noValidate onSubmit={onReset} className="space-y-4">
          <Input name="resetEmail" type="email" label="Имэйл" icon={Mail} autoComplete="email" />
          {resetNotice && <Alert tone="info">{resetNotice}</Alert>}
          <Button type="submit" fullWidth>
            Холбоос илгээх
          </Button>
        </form>
      </Modal>
    </div>
  );
}
