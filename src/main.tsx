/**
 * main.tsx — Програмын эхлэх цэг (entry point).
 *
 * Хөтөч index.html-ийг ачаалсны дараа хамгийн түрүүнд энэ файл ажиллана.
 * Энэ нь React аппыг index.html доторх <div id="root"> элемент рүү "суулгаж",
 * бүх хуудсанд хэрэгтэй ерөнхий тохиргоонуудаар (provider-уудаар) ороож өгдөг.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { LocaleProvider } from './i18n/LocaleProvider';
import { ThemeProvider } from './theme/ThemeProvider';
import { installPreloadRecovery } from './utils/preloadRecovery';
import './index.css'; // Сайтын бүх загвар (Tailwind CSS ба өнгөний тохиргоо)

// Шинэ deploy-ийн дараа хуучин JS файл олдохгүй бол хуудсыг нэг удаа дахин ачаална.
installPreloadRecovery();

// index.html доторх <div id="root"> элементийг олно. Олдохгүй бол алдаа заана.
const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
  // StrictMode — хөгжүүлэлтийн үед болзошгүй алдааг илрүүлэхэд тусална (production-д нөлөөгүй).
  <StrictMode>
    {/* ThemeProvider — гэгээлэг / харанхуй горимыг бүх хуудсанд түгээнэ. */}
    <ThemeProvider>
      {/* LocaleProvider — сонгосон хэл (МН / EN) болон орчуулгын текстийг түгээнэ. */}
      <LocaleProvider>
        {/* ErrorBoundary — апп бүхэлдээ алдаа гаргавал цагаан дэлгэцийн оронд алдааны мэдэгдэл харуулна. */}
        <ErrorBoundary fullScreen>
          {/* BrowserRouter — URL хаягийг (/, /pricing, /contact…) хуудастай холбоно. */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
);
