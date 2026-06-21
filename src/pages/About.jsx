import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  Flower2,
  Gem,
  Globe2,
  Leaf,
  Lightbulb,
  Mountain,
  PersonStanding,
  Presentation,
  Sparkles,
  Sprout,
  UsersRound,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { clientLogos } from "../data/assets.js";

const aboutImage = (fileName) =>
  new URL(`../assets/images/About/${fileName}`, import.meta.url).href;

const images = {
  hero: aboutImage("90e04fe1-0c3a-408c-b556-ae5e86828b31.webp"),
  heroMobile: aboutImage("929b36e9-9d35-4f57-a5e0-eacbea23a652.webp"),
  stage: aboutImage("chatgpt-image-jun-12-2026-01-18-43-am.webp"),
  stones: aboutImage("chatgpt-image-jun-12-2026-11-13-58-am.webp"),
  plant: aboutImage("chatgpt-image-jun-12-2026-11-14-10-am.webp"),
  books: aboutImage("chatgpt-image-jun-12-2026-11-17-12-am.webp"),
  galleryOne: aboutImage("chatgpt-image-jun-13-2026-12-38-27-am.webp"),
  galleryTwo: aboutImage("chatgpt-image-jun-13-2026-12-40-03-am.webp"),
  galleryThree: aboutImage("chatgpt-image-jun-13-2026-12-50-38-am.webp"),
};

const storyPoints = [
  {
    text: "24 years of deep inquiry into transformation, direct experience, and the art of challenging old paradigms.",
    Icon: PersonStanding,
  },
  {
    text: "Awareness is not a concept — it is a practice. And practice changes everything about how we lead and live.",
    Icon: Flower2,
  },
  {
    text: "My work integrates conscious leadership, lifestyle design, and the power of direct experience to create real breakthroughs.",
    Icon: Leaf,
  },
  {
    text: "The quality of our lives is shaped by the paradigms through which we interpret reality.",
    Icon: Eye,
  },
];

const stats = [
  ["24+", "Years of Experience", PersonStanding],
  ["India & Europe", "Work & Presence", Globe2],
  ["Leaders & Teams", "Transformed", UsersRound],
  ["Impact That Lasts", "Beyond Sessions", Gem],
];

const timeline = [
  ["2001 - 2007", "Corporate Leadership", "Learned the art of strategy, execution and leading high-performance teams.", BriefcaseBusiness],
  ["2007 - 2011", "Leadership Development", "Facilitated programs and discovered my passion for expanding awareness and conscious leadership.", UsersRound],
  ["2011 - 2016", "Executive Coaching", "Partnered with leaders to navigate change and unlock their potential.", Sparkles],
  ["2016 - 2019", "Facilitation & Speaking", "Designed and delivered transformational experiences for teams and organisations.", Presentation],
  ["2019 - Present", "Conscious Leadership", "Integrating stillness, awareness and conscious purpose to create meaningful, lasting impact.", Sprout],
];

const values = [
  ["Curiosity", "Questions create worlds.", Lightbulb],
  ["Presence", "Transformation happens now.", PersonStanding],
  ["Courage", "Growth requires discomfort.", Mountain],
  ["Playfulness", "Wisdom need not be serious.", Leaf],
];

const clientStats = [
  ["12+", "Trusted organisations"],
  ["4", "Major sectors served"],
  ["24+", "Years of leadership work"],
];

export default function About() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <section className="about-hero">
          <picture>
            <source media="(max-width: 767px)" srcSet={images.heroMobile} />
            <img decoding="async" loading="lazy" src={images.hero} alt="Raj Mali speaking on stage" />
          </picture>
          <div className="about-hero-aura" />
          <div className="about-hero-wash" />
          <div className="site-shell about-hero-shell">
            <div className="about-hero-copy">
              <p className="about-kicker">About Raj</p>
              <h1>My Journey</h1>
              <h2>From Corporate Boardrooms to Inner Landscapes</h2>
              <p>
                24 Years of Inquiry, Transformation &amp; Breakthrough Results
              </p>
              <div className="about-hero-actions">
                <a href="#about-story">
                  Explore My Work <ArrowRight size={17} />
                </a>
                <a href="/contact#contact-form">
                  Start A Conversation <ArrowRight size={17} />
                </a>
              </div>
              <div className="about-hero-meta" aria-label="Raj Mali experience highlights">
                <span>
                  <strong>24+</strong>
                  Years
                </span>
                <span>
                  <strong>500+</strong>
                  Sessions
                </span>
                <span>
                  <strong>100k+</strong>
                  Lives Touched
                </span>
              </div>
            </div>
            <a className="about-hero-scroll" href="#about-story" aria-label="Scroll to Raj Mali's story">
              <span />
            </a>
          </div>
        </section>

        <section id="about-story" className="about-story-section">
          <div className="site-shell">
            <div className="about-story-grid">
              <div className="about-story-copy">
                <p className="about-kicker">The Story</p>
                <h2>A Journey of Depth, Discovery & Impact.</h2>
                <p className="about-story-lead">
                  Over the last 24 years, I have designed and lived a unique
                  life trajectory focused on transformation and challenging old
                  paradigms of leadership and lifestyle design.
                </p>
                <div className="about-story-note">
                  <span>Awareness, Direct Experience &amp; Transformation</span>
                  <p>
                    Creating spaces where people slow down, listen deeply and
                    return to their work with renewed clarity and purpose.
                  </p>
                </div>
                <div className="about-story-points">
                  {storyPoints.map(({ text, Icon }) => (
                    <article key={text}>
                      <span>
                        <Icon aria-hidden="true" />
                      </span>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
                <div className="about-story-actions">
                  <a href="#about-clients">
                    Explore My Work <ArrowRight size={17} />
                  </a>
                  <a href="/contact#contact-form">
                    Start A Conversation <ArrowRight size={17} />
                  </a>
                </div>
              </div>
              <div className="about-story-image">
                <img decoding="async" loading="lazy" src={images.stage} alt="Raj Mali addressing an audience" />
                <div className="about-story-image-badge">
                  <strong>24+</strong>
                  <span>Years of transformational work</span>
                </div>
              </div>
            </div>

            <div className="about-stats-band">
              {stats.map(([value, label, Icon]) => (
                <article key={value}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <strong>{value}</strong>
                  <p>{label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-timeline-section">
          <div className="site-shell">
            <div className="about-section-heading">
              <p className="about-kicker">The Journey So Far</p>
              <h2>Experience shaped by rooms, reflection and real change.</h2>
            </div>
            <div className="about-timeline">
              {timeline.map(([years, title, text, Icon]) => (
                <article key={years}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <strong>{years}</strong>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-values-section">
          <div className="site-shell about-values-shell">
            <img decoding="async" loading="lazy" className="about-values-decor about-values-stones" src={images.stones} alt="Stones image" />
            <img decoding="async" loading="lazy" className="about-values-decor about-values-plant" src={images.plant} alt="Plant image" />
            <div className="about-section-heading">
              <p className="about-kicker">The Values That Guide My Work</p>
              <h2>Deep work, held with lightness.</h2>
              <p className="about-values-intro">
                A grounded blend of insight, creativity and care that shapes
                every room I enter.
              </p>
            </div>
            <div className="about-values-grid">
              {values.map(([title, text, Icon]) => (
                <article key={title}>
                  <span>
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about-clients" className="about-clients-section">
          <div className="site-shell about-clients-shell">
            <div className="about-clients-header">
              <div>
                <p className="about-kicker">Our Clients</p>
                <h2>Trusted by organisations building conscious leadership.</h2>
              </div>
              <p>
                Premium leadership and facilitation work for teams, businesses
                and institutions across sectors.
              </p>
            </div>
            <div className="about-clients-proof" aria-label="Client impact highlights">
              {clientStats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="about-logo-grid">
              {clientLogos.map((logo) => (
                <article key={logo.name}>
                  <span>
                    <img decoding="async" loading="lazy" src={logo.src} alt={logo.name} />
                  </span>
                  <p>{logo.name}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-gallery-section">
          <div className="site-shell">
            <div className="about-gallery-grid">
              <img decoding="async" loading="lazy" src={images.galleryOne} alt="Raj Mali speaking" />
              <img decoding="async" loading="lazy" src={images.galleryTwo} alt="Audience session" />
              <img decoding="async" loading="lazy" src={images.galleryThree} alt="Awareness books" />
            </div>
            <blockquote>
              "The deeper the awareness, the more conscious the choices, the
              more meaningful the impact."
            </blockquote>
          </div>
        </section>

        <section className="about-cta">
          <div className="site-shell about-cta-shell">
            <img decoding="async" loading="lazy" src={images.books} alt="Books and notes for Raj Mali leadership work" />
            <div>
              <p className="about-kicker">Ready To Begin?</p>
              <h2>Let's create meaningful change together.</h2>
              <p>
                Whether you are leading a team, an organisation or your own
                life, the journey begins with a conversation.
              </p>
              <a href="/contact#contact-form">
                Schedule A Discovery Call <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
