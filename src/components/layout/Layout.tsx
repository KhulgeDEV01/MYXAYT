/**
 * Layout.tsx — Хуудсуудын нийтлэг хүрээ: дээд цэс (Navbar) + агуулга + доод хэсэг (Footer).
 *
 * App.tsx-д энэ Layout дотор байрласан бүх хуудас ижил цэс, footer-тэй харагдана.
 * <Outlet /> — тухайн URL-д харгалзах хуудас энд орж ирнэ.
 */
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import ErrorBoundary from './ErrorBoundary';
import PageLoader from './PageLoader';
import { useI18n } from '../../i18n/useI18n';

/** Бүх маркетингийн хуудасны үндсэн бүтэц. */
export default function Layout() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  return (
    // overflow-x-clip — ямар нэг элемент дэлгэцээс халисан ч хуудас хажуу тийш гүйлгэгдэхгүй.
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      {/* "Үндсэн агуулга руу шилжих" холбоос — нүдээр харагдахгүй, Tab дарахад л гарч ирнэ. Гараар удирддаг хэрэглэгч цэсийг алгасахад тусална. */}
      <a
        href="#main"
        className="sr-only z-[200] rounded-md bg-brand-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.common.skipToContent}
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        {/* Хуудасны агуулгад алдаа гарвал зөвхөн энэ хэсэг алдааны дэлгэц болно — цэс, footer ажилласаар.
            key={pathname} — өөр хуудас руу шилжихэд алдааны төлөв цэвэрлэгдэнэ. */}
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
