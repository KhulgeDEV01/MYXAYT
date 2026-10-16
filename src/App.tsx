/**
 * App.tsx — Сайтын хуудаснуудын жагсаалт (routing).
 *
 * Аль URL хаяг дээр аль хуудас харагдахыг энд тодорхойлно.
 * Жишээ нь: "/pricing" → Pricing хуудас, "/contact" → Contact хуудас.
 * Шинэ хуудас нэмэх бол: pages/ хавтсанд файл үүсгээд, config/routes.ts-д
 * хаягийг нь нэмж, доорх <Routes> дотор <Route> мөр нэмнэ.
 */
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PageLoader from './components/layout/PageLoader';
import ScrollManager from './components/layout/ScrollManager';
import Home from './pages/Home';
import { routes } from './config/routes';

// Нүүр хуудсыг шууд ачаална (хамгийн түрүүнд харагдах тул хурдан байх ёстой).
// Бусад хуудсыг "lazy" буюу тухайн хуудас руу орох үед л татаж ачаална —
// ингэснээр сайт анх нээгдэхэд илүү хурдан болно.
const Features = lazy(() => import('./pages/Features'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Аппын үндсэн компонент: хуудас хоорондын шилжилтийг удирдана. */
export default function App() {
  return (
    <>
      {/* Хуудас солигдоход дэлгэцийг дээш нь (эсвэл #хэсэг рүү) гүйлгэнэ. */}
      <ScrollManager />
      {/* Lazy хуудас ачаалагдаж байх хооронд эргэлддэг дүрс (PageLoader) харуулна. */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Layout — эдгээр хуудас бүгд дээд цэс (Navbar) ба доод хэсэг (Footer)-тэй. */}
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.features} element={<Features />} />
            <Route path={routes.solutions} element={<Solutions />} />
            <Route path={routes.pricing} element={<Pricing />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.contact} element={<Contact />} />
            {/* "*" — бусад ямар ч олдохгүй хаяг дээр 404 хуудас харуулна. */}
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Нэвтрэх / бүртгүүлэх хуудас нь Navbar, Footer-гүй тусдаа загвартай. */}
          <Route path={routes.login} element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}
