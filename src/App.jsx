import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Facilitation from './pages/Facilitation.jsx';
import Contact from './pages/Contact.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '');
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
