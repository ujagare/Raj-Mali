import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Facilitation from './pages/Facilitation.jsx';
import Contact from './pages/Contact.jsx';
import PlayPics from './pages/PlayPics.jsx';
import Writing from './pages/Writing.jsx';
import Workshops from './pages/Workshops.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import { handleInternalLinkClick } from './utils/navigation.js';

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

  const path = currentPath.replace(/\/$/, '');
  const Page =
    path === '/about'
      ? About
      : path === '/testimonials'
        ? TestimonialsPage
        : path === '/facilitation'
          ? Facilitation
          : path === '/writing'
            ? Writing
            : path === '/workshops'
              ? Workshops
              : path === '/play-pics' || path === '/playpics' || path === '/playpic'
                ? PlayPics
                : path === '/contact'
                  ? Contact
                  : Home;

  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Page />
    </>
  );
}
