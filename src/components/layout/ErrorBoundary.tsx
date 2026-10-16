/**
 * ErrorBoundary.tsx — Алдааны хамгаалалт.
 *
 * Аль нэг компонент ажиллах явцдаа алдаа гаргавал React ердийн үед БҮХ хуудсыг
 * цагаан дэлгэц болгодог. ErrorBoundary доторх хэсэгт алдаа гарахад оронд нь
 * "Уучлаарай, алдаа гарлаа" гэсэн дэлгэц + "Дахин ачаалах" товч харуулна.
 *
 * Хоёр түвшинд ашиглагдана:
 *   • main.tsx — бүх аппыг хамгаална (хамгийн сүүлийн хамгаалалт)
 *   • Layout.tsx — зөвхөн хуудасны агуулгыг; цэс, footer ажиллаж байх тул зочин өөр хуудас руу шилжиж болно
 *
 * Хэрэв алдаа нь шинэ deploy-ийн дараах "JS файл олдсонгүй" төрлийнх бол хуудсыг
 * нэг удаа автоматаар дахин ачаална (utils/preloadRecovery.ts).
 * Анхаар: React-д алдааны хамгаалалтыг зөвхөн class компонентоор хийдэг.
 */
import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { RotateCw } from 'lucide-react';
import { useI18n } from '../../i18n/useI18n';
import { isChunkLoadError, reloadOnce } from '../../utils/preloadRecovery';
import Button from '../ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** true бол бүтэн дэлгэцийн өндөртэй (апп бүхэлдээ унасан үед). */
  fullScreen?: boolean;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** Доторх компонентуудын алдааг барьж, алдааны дэлгэц харуулна. */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  /** Алдаа гарахад React үүнийг дуудна — төлөвт алдааг хадгалснаар алдааны дэлгэц рүү шилжинэ. */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  /** Алдааны дэлгэрэнгүйг console-д бичнэ (ирээдүйд Sentry зэрэг хяналтын үйлчилгээ рүү илгээж болно). */
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
    // Шинэ deploy-ийн дараах chunk алдаа бол нэг удаа дахин ачаалж шинэ хувилбарыг татна.
    if (isChunkLoadError(error)) reloadOnce();
  }

  render() {
    if (this.state.error) return <ErrorFallback fullScreen={this.props.fullScreen} />;
    return this.props.children;
  }
}

/** Алдааны дэлгэц. Тусдаа функц компонент — орчуулгын хуком (useI18n) ашиглахын тулд. */
function ErrorFallback({ fullScreen }: { fullScreen?: boolean }) {
  const { t } = useI18n();
  const e = t.errorBoundary;

  return (
    <div
      role="alert"
      className={
        fullScreen
          ? 'flex min-h-dvh flex-col items-center justify-center bg-surface px-4 text-center'
          : 'flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center'
      }
    >
      <p className="text-sm font-semibold text-danger-600">Error</p>
      <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{e.title}</h1>
      <p className="mt-4 max-w-md text-slate-600">{e.description}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button iconLeft={RotateCw} onClick={() => window.location.reload()}>
          {e.reload}
        </Button>
        {/* Энгийн <a> — ErrorBoundary нь Router-ийн гадна байж болох тул Link биш. */}
        <Button href="/" variant="secondary">
          {e.home}
        </Button>
      </div>
    </div>
  );
}
