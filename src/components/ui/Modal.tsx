/**
 * Modal.tsx — Хуудасны дээр гарч ирэх цонх (dialog).
 *
 * Хүртээмжийн шаардлагуудыг хангана:
 *   • Escape товч эсвэл гадна талд дарахад хаагдана
 *   • Tab товчоор зөвхөн цонх дотор эргэлдэнэ (focus trap)
 *   • Нээлттэй үед ард талын хуудас гүйлгэгдэхгүй
 *   • Хаагдахад өмнө сонгосон элемент рүү focus буцна
 */
import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { cn } from '../../utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

/** Tab-аар сонгогдох боломжтой элементүүдийг олох CSS сонгогч. */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** Хүртээмжтэй dialog цонх. `open` true үед харагдана, `onClose` — хаах үед дуудагдах функц. */
export default function Modal({ open, onClose, title, description, children, size = 'md' }: ModalProps) {
  const { t } = useI18n();
  const titleId = useId();
  const descId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  // onClose-ийн хамгийн сүүлийн хувилбарыг ref-д хадгална — effect-ийг дахин ажиллуулахгүйгээр ашиглахын тулд.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    // Цонх нээгдэхээс өмнө сонгогдсон элементийг санана (хаагдахад буцаана).
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    // Ард талын хуудсыг гүйлгэгдэхгүй болгоно.
    document.body.style.overflow = 'hidden';

    const panel = panelRef.current;
    // Цонхны эхний товч / талбар руу focus шилжүүлнэ.
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      // Focus trap: сүүлийн элементээс Tab дарвал эхнийх рүү, эхнийхээс Shift+Tab дарвал сүүлийнх рүү.
      if (event.key !== 'Tab' || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    // Цонх хаагдахад: сонсогчийг арилгаж, гүйлгэлтийг сэргээж, focus-ийг буцаана.
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  // createPortal — цонхыг <body>-ийн шууд хүүхэд болгож бусад бүх зүйлийн дээр гаргана.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      {/* Бараан тунгалаг дэвсгэр — дээр нь дарахад хаагдана. */}
      <div aria-hidden="true" className="absolute inset-0 animate-fade-in bg-navy-950/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={cn(
          'relative w-full animate-fade-up rounded-xl bg-surface p-6 shadow-elevated sm:p-8',
          size === 'sm' ? 'max-w-md' : size === 'md' ? 'max-w-lg' : 'max-w-2xl',
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.common.close}
          className="absolute top-4 right-4 rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-ink-soft"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <h2 id={titleId} className="pr-8 text-xl font-semibold">
          {title}
        </h2>
        {description && (
          <p id={descId} className="mt-2 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        )}
        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
