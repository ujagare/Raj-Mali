import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main className="site-shell grid min-h-[62vh] place-items-center py-24 text-center">
        <section className="max-w-xl">
          <p className="eyebrow mb-5">404</p>
          <h1 className="font-serif text-5xl font-semibold text-ink">Page not found</h1>
          <p className="mx-auto mt-5 max-w-md text-sm font-medium leading-7 text-ink/70">
            The page you are looking for may have moved, or the address may be incorrect.
          </p>
          <a href="/" className="primary-button mt-8">
            Return Home
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
