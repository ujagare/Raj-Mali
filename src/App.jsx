import Home from './pages/Home.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';

export default function App() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Home />
    </>
  );
}
