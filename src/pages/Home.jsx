import { motion } from 'framer-motion';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import TrustedBy from '../components/TrustedBy.jsx';
import AboutSection from '../components/AboutSection.jsx';
import Pillars from '../components/Pillars.jsx';
import Services from '../components/Services.jsx';
import BlogSection from '../components/BlogSection.jsx';
import PodcastSection from '../components/PodcastSection.jsx';
import Testimonials from '../components/Testimonials.jsx';
import QuoteSection from '../components/QuoteSection.jsx';
import FAQ from '../components/FAQ.jsx';
import CTASection from '../components/CTASection.jsx';
import Footer from '../components/Footer.jsx';

const sectionReveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function RevealSection({ children }) {
  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <Hero />
        <RevealSection>
          <TrustedBy />
        </RevealSection>
        <RevealSection>
          <AboutSection />
        </RevealSection>
        <RevealSection>
          <Pillars />
        </RevealSection>
        <RevealSection>
          <Services />
        </RevealSection>
        <RevealSection>
          <BlogSection />
        </RevealSection>
        <RevealSection>
          <PodcastSection />
        </RevealSection>
        <RevealSection>
          <Testimonials />
        </RevealSection>
        <RevealSection>
          <QuoteSection />
        </RevealSection>
        <RevealSection>
          <FAQ />
        </RevealSection>
        <RevealSection>
          <CTASection />
        </RevealSection>
      </main>
      <Footer />
    </div>
  );
}
