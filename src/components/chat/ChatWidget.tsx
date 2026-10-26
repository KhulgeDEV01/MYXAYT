/**
 * ChatWidget.tsx — Баруун доод буланд байрлах мессенжер хэлбэрийн чат цонх.
 *
 * Зочин дугуй товч дээр дарахад цонх нээгдэж, "Асуулт" эсвэл "Санал хүсэлт"
 * сонгоод зурвасаа бичнэ. Зурвас нь багийн имэйл рүү очно (services/contact.ts —
 * Web3Forms / Formspree, загвар нь services/emailTemplate.ts → buildChatEmail).
 * Баг имэйл дээр Reply дарж хариулахад хариу зочны имэйл рүү очно.
 *
 * Хоёр горимтой:
 *   1) Messenger горим — config/site.ts-д Facebook хуудас заасан бол (social.facebook эсвэл
 *      social.messengerPage, utils/messenger.ts) дугуй товч дарахад зочин байгууллагын
 *      хуудастай Messenger-ээр чатлана (мессеж хуудасны Inbox-д ирнэ):
 *        гар утас → суулгасан Messenger апп хуудастай чатын цонхоор нээгдэнэ;
 *        компьютер → facebook.com дотор хуудастай чатын цонх нээгдэнэ.
 *      (Meta сайт дотор суулгадаг Chat Plugin-оо 2024 онд зогсоосон тул m.me нь албан ёсны арга.)
 *   2) Имэйл горим (нөөц) — хуудас тохируулаагүй бол товч дарахад доорх цонх нээгдэж,
 *      зурвас нь багийн имэйл рүү очно. Энэ нь шууд чат биш — хариу зочны имэйл рүү ирнэ.
 *
 * Хүртээмж: Escape дарахад хаагдана, нээгдэхэд зурвасын талбарт focus шилжиж,
 * хаагдахад focus чатын товч руу буцна. Цонх нь хуудсыг хаадаггүй (non-modal).
 */
import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, MouseEvent, ReactNode } from 'react';
import { Mail, MessageCircle, Send, X } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { useI18n } from '../../i18n/useI18n';
import { buildMailtoLink, deliveryProvider, sendRequestEmail } from '../../services/contact';
import { buildChatEmail } from '../../services/emailTemplate';
import type { ChatTopic } from '../../services/emailTemplate';
import { cn } from '../../utils/cn';
import { detectMobilePlatform, getFacebookPage, messengerAppLink, messengerDesktopUrl, messengerWebUrl, openMessengerApp } from '../../utils/messenger';
import Alert from '../ui/Alert';
import Button from '../ui/Button';
import Input, { Textarea } from '../ui/Input';
import { LogoMark } from '../ui/Logo';

/** Цонхны төлөв: бичиж байна, илгээж байна, илгээгдсэн, алдаа, имэйл үйлчилгээ тохируулаагүй. */
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'not-configured';

/** Сэдвүүдийн дараалал. */
const TOPICS: ChatTopic[] = ['question', 'feedback'];
/** Имэйл хаяг зөв хэлбэртэй эсэхийг шалгах энгийн загвар. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Байгууллагын Facebook хуудас (username / Page ID). Тохируулаагүй бол null — имэйлийн цонх ашиглана. */
const FACEBOOK_PAGE = getFacebookPage();

/** Messenger-ийн лого: цагаан ярианы бөмбөлөг дотор цэнхэр аянга. */
function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#fff"
        d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .53-.04c.91.25 1.87.38 2.91.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Z"
      />
      <path
        fill="#0866FF"
        d="m6 14.54 2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63l-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63Z"
      />
    </svg>
  );
}

/** Мессенжер маягийн "бөмбөлөг" — `from="team"` зүүн талд саарал, `from="you"` баруун талд цэнхэр. */
function Bubble({ from, children }: { from: 'team' | 'you'; children: ReactNode }) {
  return (
    <p
      className={cn(
        'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line',
        from === 'team' ? 'self-start rounded-bl-md bg-slate-100 text-ink-soft' : 'self-end rounded-br-md bg-brand-600 text-white',
      )}
    >
      {children}
    </p>
  );
}

/** Имэйл горим: чат товч + зурвас бичих цонх (Messenger тохируулаагүй үед). */
function EmailChat() {
  const { locale, t } = useI18n();
  const c = t.chat;
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<ChatTopic>('question');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<{ message?: string; email?: string }>({});
  // Илгээсэн зурвас (амжилттай бол бөмбөлөг болон харагдана).
  const [sent, setSent] = useState<{ message: string; email: string } | null>(null);
  // Имэйл үйлчилгээ ажиллахгүй үед ашиглах нөөц mailto холбоос.
  const [mailtoLink, setMailtoLink] = useState('');

  const panelId = useId();
  const titleId = useId();
  const messageId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  /** Цонхыг хааж, focus-ийг чатын товч руу буцаана. */
  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Нээгдэхэд зурвасын талбарт focus өгнө; Escape дарахад хаана.
  useEffect(() => {
    if (!open) return;
    document.getElementById(messageId)?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, messageId]);

  /** "Илгээх" дарахад: шалгах → имэйл бэлтгэх → илгээх. */
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? '').trim();

    // Спам хамгаалалт: жинхэнэ хүн энэ нууц талбарыг хардаггүй.
    if (value('botcheck')) return;

    const data = { topic, name: value('name'), email: value('email'), message: value('message') };
    const nextErrors: typeof errors = {};
    if (data.message.length < 2) nextErrors.message = c.errors.message;
    if (!EMAIL_PATTERN.test(data.email)) nextErrors.email = c.errors.email;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const email = buildChatEmail(data, locale);
    setMailtoLink(buildMailtoLink(siteConfig.contact.email, email));

    if (deliveryProvider === 'none') {
      setStatus('not-configured');
      return;
    }

    setStatus('sending');
    try {
      await sendRequestEmail(email);
      setSent({ message: data.message, email: data.email });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  /** Шинэ зурвас бичих — маягтыг хоосон байдалд буцаана. */
  const reset = () => {
    setSent(null);
    setErrors({});
    setStatus('idle');
    // Маягт дахин зурагдсаны дараа focus өгнө.
    window.setTimeout(() => document.getElementById(messageId)?.focus(), 0);
  };

  return (
    <>
      {/* Чатын цонх */}
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-labelledby={titleId}
          className="fixed inset-x-3 bottom-24 z-40 flex max-h-[calc(100dvh-11rem)] animate-fade-up flex-col overflow-hidden rounded-2xl bg-surface shadow-elevated ring-1 ring-slate-200 sm:inset-x-auto sm:right-6 sm:w-[380px]"
        >
          {/* Толгой хэсэг: лого, нэр, хариулах хугацаа, хаах товч */}
          <div className="flex items-center gap-3 bg-navy-950 px-4 py-3.5 text-white">
            <LogoMark className="size-9" />
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="text-sm font-semibold text-white">
                {c.title}
              </h2>
              <p className="flex items-center gap-1.5 text-xs text-navy-300">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-success-500" />
                {c.status}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={c.close}
              className="flex size-9 items-center justify-center rounded-md text-navy-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Яриа + маягт (урт бол дотроо гүйлгэгдэнэ) */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            <Bubble from="team">{c.greeting}</Bubble>

            {status === 'sent' && sent ? (
              // Илгээгдсэн: зочны зурвас + баярлалаа гэсэн хариу
              <div role="status" className="flex flex-col gap-3">
                <span className="sr-only">{c.you}:</span>
                <Bubble from="you">{sent.message}</Bubble>
                <Bubble from="team">{c.sent(sent.email)}</Bubble>
                <Button variant="secondary" size="sm" className="mt-1 self-center" onClick={reset}>
                  {c.newMessage}
                </Button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="mt-1 space-y-3.5">
                {/* Сэдэв сонгох (радио товчнууд, chip хэлбэртэй) */}
                <fieldset>
                  <legend className="sr-only">{c.topicLegend}</legend>
                  <div className="flex gap-2">
                    {TOPICS.map((id) => (
                      <label
                        key={id}
                        className={cn(
                          'cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
                          topic === id
                            ? 'bg-brand-50 text-brand-700 ring-brand-500 dark:text-brand-300'
                            : 'text-slate-600 ring-slate-200 hover:ring-slate-300',
                        )}
                      >
                        <input
                          type="radio"
                          name="topic"
                          value={id}
                          checked={topic === id}
                          onChange={() => setTopic(id)}
                          className="sr-only"
                        />
                        {c.topics[id]}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <Textarea
                  id={messageId}
                  name="message"
                  label={c.message}
                  placeholder={c.messagePlaceholder}
                  required
                  rows={3}
                  error={errors.message}
                  className="min-h-24"
                />
                <Input name="name" label={c.name} autoComplete="name" />
                <Input
                  name="email"
                  type="email"
                  label={c.email}
                  autoComplete="email"
                  required
                  hint={c.emailHint}
                  error={errors.email}
                />

                {/* Спам роботод зориулсан нууц талбар */}
                <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {/* Алдаа эсвэл тохируулаагүй үед: анхааруулга + имэйл программаар илгээх */}
                {(status === 'error' || status === 'not-configured') && (
                  <div className="space-y-2">
                    <Alert tone="warning">{status === 'error' ? c.error : c.notConfigured}</Alert>
                    <Button href={mailtoLink} variant="secondary" size="sm" iconLeft={Mail} fullWidth>
                      {c.openEmail}
                    </Button>
                  </div>
                )}

                <Button type="submit" iconRight={Send} fullWidth disabled={status === 'sending'}>
                  {status === 'sending' ? c.sending : c.send}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Баруун доод буланд байрлах дугуй чат товч */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? c.close : c.open}
        title={open ? undefined : c.open}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-elevated transition-transform hover:scale-105 hover:bg-brand-700 active:scale-95 motion-reduce:hover:scale-100 sm:right-6 sm:bottom-6"
      >
        {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={26} aria-hidden="true" />}
      </button>
    </>
  );
}

/**
 * Messenger горим — дугуй товч:
 *   гар утас (Android / iOS) → суулгасан Messenger апп байгууллагын хуудастай ЧАТЫН цонхоор нээгдэнэ
 *                              (апп байхгүй бол хөтөч дээр m.me);
 *   компьютер               → facebook.com дотор хуудастай чатын цонх шинэ tab-д нээгдэнэ.
 * Аль ч төхөөрөмж дээр зочин шууд хуудастай чатлах цонхонд орно.
 */
function MessengerLauncher({ page }: { page: string }) {
  const { t } = useI18n();
  const c = t.chat;
  // Утсан дээр m.me (апп нээгдэхгүй үеийн нөөц), компьютер дээр facebook.com/messages.
  const href = detectMobilePlatform() ? messengerWebUrl(page) : messengerDesktopUrl(page);

  /** Утсан дээр Messenger аппыг хуудастай чатын цонхоор нээнэ. */
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const platform = detectMobilePlatform();
    if (!platform) return; // компьютер — href (facebook.com/messages) шинэ tab-д нээгдэнэ
    const appLink = messengerAppLink(page, platform);
    if (!appLink) return; // iOS + username — m.me холбоосыг iOS өөрөө Messenger аппаар нээнэ
    event.preventDefault();
    openMessengerApp(appLink, page, platform);
  };

  return (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${c.messenger} ${c.newTab}`}
      title={`${c.messenger} — ${c.messengerHint}`}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-[#0866FF] shadow-elevated transition-transform hover:scale-105 hover:bg-[#0657D6] active:scale-95 motion-reduce:hover:scale-100 sm:right-6 sm:bottom-6"
    >
      <MessengerIcon className="size-8" />
    </a>
  );
}

/** Чатын товч. Layout.tsx-д нэг удаа байрлана (Нэвтрэх хуудсанд харагдахгүй). */
export default function ChatWidget() {
  return FACEBOOK_PAGE ? <MessengerLauncher page={FACEBOOK_PAGE} /> : <EmailChat />;
}
