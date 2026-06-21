import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Facilitation from './pages/Facilitation.jsx';
import Contact from './pages/Contact.jsx';
import PlayPics from './pages/PlayPics.jsx';
import Writing from './pages/Writing.jsx';
import Workshops from './pages/Workshops.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import NotFound from './pages/NotFound.jsx';
import SEO from './components/SEO.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import { handleInternalLinkClick } from './utils/navigation.js';
import { notFoundSeo, routeAliases, seoByPath } from './data/seo.js';

const routes = {
  '/': Home,
  '/about': About,
  '/testimonials': TestimonialsPage,
  '/facilitation': Facilitation,
  '/writing': Writing,
  '/workshops': Workshops,
  '/play-pics': PlayPics,
  '/contact': Contact,
  '/privacy-policy': PrivacyPolicy,
};

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
      <Page />
    </>
  );
}
