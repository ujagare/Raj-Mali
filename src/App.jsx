import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Facilitation from './pages/Facilitation.jsx';
import Contact from './pages/Contact.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname);

    window.addEventListener('popstate', updatePath);
    window.addEventListener('raj:navigate', updatePath);

    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('raj:navigate', updatePath);
    };
  }, []);

  const path = currentPath.replace(/\/$/, '');
  const Page =
    path === '/about'
      ? About
      : path === '/facilitation'
        ? Facilitation
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
