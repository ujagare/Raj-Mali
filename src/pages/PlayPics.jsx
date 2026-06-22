import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Footer from "../components/Footer.jsx";

const playImage = (fileName) =>
  new URL(`../assets/images/playpics/${fileName}`, import.meta.url).href;

const playIcon = (fileName) =>
  new URL(`../assets/images/playpics/Icons/${fileName}`, import.meta.url).href;

const images = {
  hero: playImage("image2.webp"),
  galleryOne: playImage("photo12.webp"),
  galleryTwo: playImage("image1-1.webp"),
  galleryThree: playImage("image0.webp"),
  galleryFour: playImage("photo8.webp"),
  galleryFive: playImage("image0-1.webp"),
  gallerySix: playImage("photo14.webp"),
  toolMovement: playImage("image2.webp"),
  toolDialogue: playImage("photo11.webp"),
  toolLearning: playImage("image2-1.webp"),
  toolRhythm: playImage("photo12.webp"),
  cta: playImage("image3.webp"),
};

const icons = {
  connection: playIcon("chatgpt-image-jun-11-2026-07-16-35-pm.webp"),
  dialogue: playIcon("chatgpt-image-jun-13-2026-03-24-58-pm.webp"),
  awareness: playIcon("chatgpt-image-jun-13-2026-03-27-08-pm.webp"),
  movement: playIcon("chatgpt-image-jun-13-2026-03-28-17-pm.webp"),
  rhythm: playIcon("chatgpt-image-jun-13-2026-03-28-37-pm.webp"),
  creativity: playIcon("chatgpt-image-jun-13-2026-03-29-36-pm.webp"),
  reflection: playIcon("chatgpt-image-jun-13-2026-03-30-19-pm.webp"),
  arrival: playIcon("chatgpt-image-jun-13-2026-03-31-40-pm.webp"),
};

const principles = [
  ["Movement", "Embodied practices that unlock energy and presence.", icons.movement],
  ["Music & Rhythm", "Rhythm and sound that sync minds and open hearts.", icons.rhythm],
  ["Dialogue", "Guided group dialogue that builds trust and clarity.", icons.dialogue],
  ["Awareness", "Mindful awareness to observe, reflect and choose.", icons.awareness],
  ["Creativity", "Creative expressions that spark new perspectives.", icons.creativity],
  ["Connection", "Deep human connection that drives collective growth.", icons.connection],
];

const journey = [
  ["Arrival", "Welcoming participants into a safe and open space.", icons.arrival],
  ["Movement", "Engaging the body to release and awaken.", icons.movement],
  ["Dialogue", "Sharing and listening in small groups.", icons.dialogue],
  ["Reflection", "Pausing to connect the dots within.", icons.reflection],
  ["Integration", "Turning learning into action and commitments.", icons.awareness],
];

const tools = [
  ["Dance & Movement", "Movement practices to release stress, build presence and unlock creative energy.", images.toolMovement],
  ["Music & Rhythm", "Live sound journeys that elevate emotion, connection and shared attention.", images.toolRhythm],
  ["Group Dialogue", "Structured circles that encourage openness, empathy and honest conversation.", images.toolDialogue],
  ["Embodied Learning", "Experiential exercises that help leaders embody new mindsets and behaviors.", images.toolLearning],
];

const galleryImages = [
  images.galleryOne,
  images.galleryTwo,
  images.galleryThree,
  images.galleryFour,
  images.galleryFive,
  images.gallerySix,
];

export default function PlayPics() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const showPreviousImage = () => {
    setActiveImageIndex((index) =>
      index === null ? null : (index - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((index) =>
      index === null ? null : (index + 1) % galleryImages.length,
    );
  };

  useEffect(() => {
    if (activeImageIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveImageIndex(null);
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <section className="playpics-hero">
          <img decoding="async" fetchPriority="high" loading="eager" src={images.hero} alt="Leaders participating in organic play" />
          <div className="playpics-hero-wash" />
          <div className="site-shell playpics-hero-shell">
            <div className="playpics-hero-copy">
              <p className="playpics-kicker">Leadership Labs - Organic Play</p>
              <h1>
                Play. Move.
                <br />
                Connect.
                <br />
                Transform.
              </h1>
              <p>
                Experiential learning through movement, music, dialogue and
                embodied leadership practices.
              </p>
              <div className="playpics-actions">
                <a href="#organic-play" className="primary-button">
                  Explore Sessions <ArrowRight size={15} />
                </a>
                <a href="#play-gallery" className="secondary-button">
                  View Gallery
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="organic-play" className="playpics-principles">
          <div className="site-shell">
            <div className="playpics-section-heading">
              <p className="playpics-kicker">What Is Organic Play?</p>
              <h2>
                In our Leadership Labs and coaching sessions, Organic Play turns
                insight into embodied transformation.
              </h2>
            </div>
            <div className="playpics-principle-grid">
              {principles.map(([title, text, icon]) => (
                <article key={title}>
                  <span>
                    <img decoding="async" loading="lazy" src={icon} alt={`${title} organic play practice icon`} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="play-gallery" className="playpics-gallery-section">
          <div className="site-shell">
            <div className="playpics-section-heading">
              <p className="playpics-kicker">Moments Of Organic Play</p>
            </div>
            <div className="playpics-gallery-grid">
              {galleryImages.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={`playpics-gallery-card card-${index + 1}`}
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Open organic play image ${index + 1}`}
                >
                  <img decoding="async" loading="lazy" src={image} alt={`Organic play session moment ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="playpics-journey">
          <div className="site-shell">
            <div className="playpics-section-heading">
              <p className="playpics-kicker">Our Organic Play Journey</p>
              <h2>A gentle sequence that moves people from arrival to integration.</h2>
            </div>
            <div className="playpics-journey-line">
              {journey.map(([title, text, icon]) => (
                <article key={title}>
                  <span>
                    <img decoding="async" loading="lazy" src={icon} alt={`${title} organic play journey icon`} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="playpics-quote">
          <div className="site-shell playpics-quote-shell">
            <blockquote>
              Transformation rarely happens through information alone.
              <br />
              It happens through <span className="highlight-experience">Direct Experience</span>.
            </blockquote>
            <p>
              <strong>Raj Mali</strong>
              Mindset Coach & Facilitator
            </p>
          </div>
        </section>

        <section className="playpics-tools">
          <div className="site-shell">
            <div className="playpics-section-heading">
              <p className="playpics-kicker">Our Experiential Tools</p>
            </div>
            <div className="playpics-tools-grid">
              {tools.map(([title, text, image]) => (
                <article key={title}>
                  <img decoding="async" loading="lazy" src={image} alt={`${title} experiential leadership activity`} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="playpics-cta">
          <img decoding="async" loading="lazy" src={images.cta} alt="Organic play leadership session" />
          <div className="playpics-cta-wash" />
          <div className="site-shell playpics-cta-shell">
            <div>
              <h2>Experience leadership beyond conversation.</h2>
              <p>
                Step into a space where play becomes the pathway to profound
                transformation.
              </p>
            </div>
            <div className="playpics-actions">
              <a href="/contact#contact-form" className="primary-button">
                Book Discovery Call <ArrowRight size={15} />
              </a>
              <a href="/facilitation" className="secondary-button">
                Explore Facilitation
              </a>
            </div>
          </div>
        </section>
      </main>
      {activeImageIndex !== null && (
        <div className="playpics-lightbox" role="dialog" aria-modal="true" aria-label="Organic play gallery image">
          <button
            type="button"
            className="playpics-lightbox-close"
            onClick={() => setActiveImageIndex(null)}
            aria-label="Close gallery image"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            className="playpics-lightbox-nav playpics-lightbox-prev"
            onClick={showPreviousImage}
            aria-label="Previous gallery image"
          >
            <ChevronLeft size={30} />
          </button>
          <img decoding="async" loading="lazy"
            src={galleryImages[activeImageIndex]}
            alt={`Organic play session moment ${activeImageIndex + 1}`}
          />
          <button
            type="button"
            className="playpics-lightbox-nav playpics-lightbox-next"
            onClick={showNextImage}
            aria-label="Next gallery image"
          >
            <ChevronRight size={30} />
          </button>
          <p>
            {String(activeImageIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
}
