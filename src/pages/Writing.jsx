import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const writingImage = (fileName) =>
  new URL(`../assets/images/Writing/${fileName}`, import.meta.url).href;

const images = {
  hero: writingImage("Raj Mali.png"),
  heroMobile: writingImage("mobile.png"),
  featuredBook: writingImage("raj2.png"),
  play: writingImage("chatgpt-image-jun-21-2026-02-44-49-pm.webp"),
  awareness: writingImage("chatgpt-image-jun-21-2026-02-45-02-pm.webp"),
  mountain: writingImage("chatgpt-image-jun-21-2026-02-46-26-pm.webp"),
  sessions: writingImage("chatgpt-image-jun-21-2026-02-45-50-pm.webp"),
  coaching: writingImage("chatgpt-image-jun-21-2026-02-49-47-pm.webp"),
  dialogue: writingImage("chatgpt-image-jun-21-2026-02-46-39-pm.webp"),
};

const categories = ["All", "Leadership", "Awareness", "Transformation", "Coaching", "Life"];

const thingsDescription =
  "Things is a collection of questions, reflections, and life observations that invite readers to pause and rediscover the beauty hidden in their own life. Through humor, vulnerability, and insight, the book explores what it means to live fully, love deeply, and stay curious about life.";

const writings = [
  {
    category: "Leadership",
    title: "Why Play?",
    text: "Play is not a break from serious work. It is the source of it.",
    time: "5 Min Read",
    image: images.play,
    slug: "why-play",
    body:
      "Play is often mistaken for something light, optional, or separate from meaningful work. In truth, play opens the mind, invites experimentation, and helps people meet complexity with more imagination. It creates the conditions for trust, learning, and honest discovery.",
  },
  {
    category: "Awareness",
    title: "That's Interesting!",
    text: "On curiosity, noticing and the art of staying awake to life.",
    time: "4 Min Read",
    image: images.awareness,
    slug: "thats-interesting",
    body:
      "Curiosity changes the quality of attention. When we pause long enough to say, that's interesting, we step out of reaction and into inquiry. This simple shift helps us notice patterns, assumptions, and possibilities that are easy to miss in the speed of everyday life.",
  },
  {
    category: "Transformation",
    title: "Rebuilding The World",
    text: "Small shifts in consciousness create large shifts in culture.",
    time: "6 Min Read",
    image: images.mountain,
    slug: "rebuilding-the-world",
    body:
      "The world is rebuilt through the way we relate, decide, listen, and act. Transformation begins in small inner movements that eventually shape teams, families, communities, and institutions. Culture changes when enough people practice a different quality of presence.",
  },
  {
    category: "Coaching",
    title: "New Sessions - SMCP + Play + Long Term Coaching & Mentoring",
    text: "A new blend for deeper transformation and lasting impact.",
    time: "6 Min Read",
    image: images.sessions,
    slug: "new-sessions-smcp-play-long-term-coaching",
    body:
      "This new blend brings together structured coaching, play, and long-term mentoring to support deeper personal and professional growth. The focus is not only on insight, but on integration: helping people live what they learn with steadiness and clarity.",
  },
  {
    category: "Reflection",
    title: "Therapeutic Coaching: A Required Paradigm Shift",
    text: "Moving beyond techniques to transformation.",
    time: "7 Min Read",
    image: images.coaching,
    slug: "therapeutic-coaching-required-paradigm-shift",
    body:
      "Coaching becomes more powerful when it moves beyond techniques and enters the territory of human wholeness. A therapeutic orientation brings attention to safety, embodiment, emotions, and the deeper stories that shape behavior and possibility.",
  },
  {
    category: "Leadership",
    title: "Leadership & Dialogue",
    text: "Conversations that create clarity, alignment and action.",
    time: "5 Min Read",
    image: images.dialogue,
    slug: "leadership-and-dialogue",
    body:
      "Leadership is practiced in conversation. Dialogue helps people slow down, make meaning together, and act from shared understanding. When leaders create spaces where truth can be spoken with care, clarity and alignment become much easier to sustain.",
  },
];

export default function Writing() {
  const activeSlug = window.location.pathname.replace(/^\/writing\/?/, "").replace(/\/$/, "");
  const activeArticle = writings.find((item) => item.slug === activeSlug);

  return (
    <div className="writing-page min-h-screen overflow-x-hidden bg-[#f8f7f4]">
      <Navbar />
      <main>
        {activeArticle ? (
          <article className="site-shell writing-article-detail">
            <a href="/writing#writing-list" className="writing-text-link">
              <ArrowLeft size={15} strokeWidth={2.4} />
              Back To Writings
            </a>
            <div className="writing-article-hero">
              <img decoding="async" fetchPriority="high" loading="eager" src={activeArticle.image} alt={`${activeArticle.title} writing by Raj Mali`} />
              <div>
                <p>{activeArticle.category}</p>
                <h1>{activeArticle.title}</h1>
                <strong>{activeArticle.time}</strong>
              </div>
            </div>
            <div className="writing-article-body">
              <p>{activeArticle.text}</p>
              <p>{activeArticle.body}</p>
            </div>
          </article>
        ) : (
          <>
        <section className="writing-hero">
          <picture>
            <source media="(max-width: 767px)" srcSet={images.heroMobile} />
            <img decoding="async" fetchPriority="high" loading="eager" src={images.hero} alt="Writing and reflections by Raj Mali" />
          </picture>
          <div className="writing-hero-copy">
            <p>Writing</p>
            <h1>Things by Raj Mali</h1>
            <span>{thingsDescription}</span>
            <a href="#writing-list" className="primary-button">
              Explore Writings
            </a>
          </div>
        </section>

        <section className="site-shell writing-feature-wrap">
          <article className="writing-feature-card">
            <div className="writing-feature-image">
              <img decoding="async" loading="lazy" src={images.featuredBook} alt="Raj Mali book displayed with a ceramic vase" />
            </div>
            <div className="writing-feature-copy">
              <p>Featured Book</p>
              <h2>Things by Raj Mali</h2>
              <span>{thingsDescription}</span>
              <div>
                <a href="#writing-list" className="primary-button">
                  Buy The Book
                </a>
                <a href="#writing-list" className="writing-text-link">
                  Read Excerpts
                  <ArrowRight size={15} strokeWidth={2.4} />
                </a>
              </div>
            </div>
          </article>
        </section>

        <section id="writing-list" className="site-shell writing-list-section">
          <div className="writing-list-heading">
            <h2>Writings & Reflections</h2>
            <div className="writing-tabs" aria-label="Writing categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === "All" ? "is-active" : ""}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="writing-card-grid">
            {writings.map((item) => (
              <a key={item.title} href={`/writing/${item.slug}`} className="writing-card">
                <img decoding="async" loading="lazy" src={item.image} alt={`${item.title} writing by Raj Mali`} />
                <div>
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                  <span>{item.text}</span>
                  <footer>
                    <strong>{item.time}</strong>
                  </footer>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="site-shell writing-quote-wrap">
          <blockquote className="writing-quote">
            <p>
              Information informs. Experience transforms.
              <br />
              <span>Transformation happens through Direct Experience.</span>
            </p>
          </blockquote>
        </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
