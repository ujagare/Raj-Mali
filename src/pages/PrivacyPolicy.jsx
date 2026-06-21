import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main className="site-shell py-24">
        <section className="mx-auto max-w-3xl">
          <p className="eyebrow mb-5">Privacy Policy</p>
          <h1 className="font-serif text-5xl font-semibold leading-tight text-ink">
            Privacy Policy
          </h1>
          <div className="mt-8 space-y-6 text-sm font-medium leading-7 text-ink/72">
            <p>
              This website collects only the information you choose to share through enquiry forms,
              email links or direct communication.
            </p>
            <p>
              Contact details and messages are used to respond to enquiries about coaching,
              facilitation, workshops, speaking, media or related work. They are not sold or shared
              for third-party marketing.
            </p>
            <p>
              Basic analytics or hosting logs may be used to understand site performance, security
              and reliability. These records are handled with reasonable care.
            </p>
            <p>
              To request correction or deletion of information you have shared, email
              {' '}
              <a className="font-bold text-navy" href="mailto:hello@rajmali.com">
                hello@rajmali.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
