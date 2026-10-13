import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import PageLoader from './components/layout/PageLoader';
import ScrollManager from './components/layout/ScrollManager';
import Home from './pages/Home';
import { routes } from './config/routes';

// Home is eager for the fastest first paint; everything else is code-split.
const Features = lazy(() => import('./pages/Features'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.features} element={<Features />} />
            <Route path={routes.solutions} element={<Solutions />} />
            <Route path={routes.pricing} element={<Pricing />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.contact} element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Auth screens use their own focused layout without the marketing chrome */}
          <Route path={routes.login} element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}
