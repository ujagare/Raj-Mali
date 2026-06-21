import { ArrowRight, Quote } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const writingImage = (fileName) =>
  new URL(`../assets/images/Writing/${fileName}`, import.meta.url).href;

const images = {
  hero: writingImage("ChatGPT Image Jun 21, 2026, 02_07_11 PM.png"),
  book: writingImage("ChatGPT Image Jun 21, 2026, 02_41_11 PM.png"),
  play: writingImage("ChatGPT Image Jun 21, 2026, 02_44_49 PM.png"),
  awareness: writingImage("ChatGPT Image Jun 21, 2026, 02_45_02 PM.png"),
  mountain: writingImage("ChatGPT Image Jun 21, 2026, 02_46_26 PM.png"),
  sessions: writingImage("ChatGPT Image Jun 21, 2026, 02_45_50 PM.png"),
  coaching: writingImage("ChatGPT Image Jun 21, 2026, 02_49_47 PM.png"),
  dialogue: writingImage("ChatGPT Image Jun 21, 2026, 02_46_39 PM.png"),
};

const categories = ["All", "Leadership", "Awareness", "Transformation", "Coaching", "Life"];

const writings = [
  {
    category: "Leadership",
    title: "Why Play?",
    text: "Play is not a break from serious work. It is the source of it.",
    time: "5 Min Read",
    image: images.play,
  },
  {
    category: "Awareness",
    title: "That's Interesting!",
    text: "On curiosity, noticing and the art of staying awake to life.",
    time: "4 Min Read",
    image: images.awareness,
  },
  {
    category: "Transformation",
    title: "Rebuilding The World",
    text: "Small shifts in consciousness create large shifts in culture.",
    time: "6 Min Read",
    image: images.mountain,
  },
  {
    category: "Coaching",
    title: "New Sessions - SMCP + Play + Long Term Coaching & Mentoring",
    text: "A new blend for deeper transformation and lasting impact.",
    time: "6 Min Read",
    image: images.sessions,
  },
  {
    category: "Reflection",
    title: "Therapeutic Coaching: A Required Paradigm Shift",
    text: "Moving beyond techniques to transformation.",
    time: "7 Min Read",
    image: images.coaching,
  },
  {
    category: "Leadership",
    title: "Leadership & Dialogue",
    text: "Conversations that create clarity, alignment and action.",
    time: "5 Min Read",
    image: images.dialogue,
  },
];

export default function Writing() {
  return (
    <div className="writing-page min-h-screen overflow-x-hidden bg-[#f8f7f4]">
      <Navbar />
      <main>
        <section className="writing-hero">
          <img src={images.hero} alt="The Tao of Leadership book by Raj Mali" />
          <div className="writing-hero-copy">
            <p>Writing</p>
            <h1>
              Ideas. Insights.
              <br />
              Lived Experiences.
            </h1>
            <span>
              Reflections on leadership, transformation and conscious living
              drawn from over two decades of inquiry, experience and deep human
              connection.
            </span>
            <a href="#writing-list" className="primary-button">
              Explore Writings
            </a>
          </div>
        </section>

        <section className="site-shell writing-feature-wrap">
          <article className="writing-feature-card">
            <div className="writing-feature-image">
              <img src={images.book} alt="The Tao of Leadership featured book" />
            </div>
            <div className="writing-feature-copy">
              <p>Featured Book</p>
              <h2>The Tao of Leadership</h2>
              <h3>An Ancient Path to Effective Leadership</h3>
              <span>
                A timeless exploration of leadership through the wisdom of Tao -
                simple, profound and deeply relevant to today's world.
              </span>
              <div>
                <a href="/contact#contact-form" className="primary-button">
                  Buy The Book
                </a>
                <a href="#writing-list" className="writing-text-link">
                  Read Excerpts <ArrowRight size={15} />
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
              <article key={item.title} className="writing-card">
                <img src={item.image} alt="" />
                <div>
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                  <span>{item.text}</span>
                  <footer>
                    <strong>{item.time}</strong>
                    <a href="/contact#contact-form" aria-label={`Enquire about ${item.title}`}>
                      <ArrowRight size={15} />
                    </a>
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="site-shell writing-quote-wrap">
          <blockquote className="writing-quote">
            <Quote size={34} />
            <p>
              Information informs. Experience transforms.
              <br />
              <span>Transformation happens through Direct Experience.</span>
            </p>
          </blockquote>
        </section>
      </main>
      <Footer />
    </div>
  );
}
