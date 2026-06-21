import { Suspense, lazy, useEffect, useState } from 'react';
import SEO from './components/SEO.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import { handleInternalLinkClick } from './utils/navigation.js';
import { notFoundSeo, routeAliases, seoByPath } from './data/seo.js';

const routes = {
  '/': lazy(() => import('./pages/Home.jsx')),
  '/about': lazy(() => import('./pages/About.jsx')),
  '/testimonials': lazy(() => import('./pages/TestimonialsPage.jsx')),
  '/facilitation': lazy(() => import('./pages/Facilitation.jsx')),
  '/writing': lazy(() => import('./pages/Writing.jsx')),
  '/workshops': lazy(() => import('./pages/Workshops.jsx')),
  '/play-pics': lazy(() => import('./pages/PlayPics.jsx')),
  '/contact': lazy(() => import('./pages/Contact.jsx')),
  '/privacy-policy': lazy(() => import('./pages/PrivacyPolicy.jsx')),
};

const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading page">
      <div className="page-loader-orbit" aria-hidden="true">
        <div className="page-loader-ring" />
        <div className="page-loader-mark">RM</div>
      </div>
      <p className="page-loader-kicker" aria-hidden="true">Preparing the space</p>
      <span className="sr-only">Loading page</span>
    </div>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname);

    window.addEventListener('popstate', updatePath);
    window.addEventListener('raj:navigate', updatePath);
    document.addEventListener('click', handleInternalLinkClick);

    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('raj:navigate', updatePath);
      document.removeEventListener('click', handleInternalLinkClick);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const targetHash = window.location.hash;

      if (targetHash) {
        document
          .querySelector(targetHash)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      window.scrollTo({ top: 0, behavior: 'auto' });
      window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 160);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [currentPath]);

  const normalizedPath = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
  const canonicalPath = routeAliases[normalizedPath] || normalizedPath;
  const Page = routes[canonicalPath] || NotFound;
  const seoConfig = seoByPath[canonicalPath] || notFoundSeo;

  return (
    <>
      <SEO config={seoConfig} />
      <SmoothScroll />
      <ScrollProgress />
      <Suspense fallback={<PageLoader />}>
        <Page />
      </Suspense>
    </>
  );
}
