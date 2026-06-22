import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const facilitatorImage = (fileName) =>
  new URL(`../assets/images/Facilitator/${fileName}`, import.meta.url).href;

const facilitatorIcon = (fileName) =>
  new URL(`../assets/images/Facilitator/icons/${fileName}`, import.meta.url)
    .href;

const facilitatorGalleryImage = (fileName) =>
  new URL(`../assets/images/Facilitator/gallary/${fileName}`, import.meta.url)
    .href;

const images = {
  hero: facilitatorImage("2.webp"),
  meeting: facilitatorImage("1.webp"),
  growth: facilitatorImage("chatgpt-image-jun-11-2026-06-37-10-pm.webp"),
  dialogue: facilitatorImage("chatgpt-image-jun-11-2026-06-38-32-pm.webp"),
  compass: facilitatorImage("chatgpt-image-jun-11-2026-06-41-08-pm.webp"),
};

const icons = [
  facilitatorIcon("chatgpt-image-jun-11-2026-07-05-03-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-07-37-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-09-50-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-13-06-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-14-07-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-15-14-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-16-35-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-17-26-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-18-11-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-19-34-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-20-26-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-27-37-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-27-49-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-30-30-pm.webp"),
];

const processIcons = [
  facilitatorIcon("chatgpt-image-jun-11-2026-08-11-33-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-08-16-14-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-43-19-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-27-37-pm.webp"),
  facilitatorIcon("chatgpt-image-jun-11-2026-07-30-30-pm.webp"),
];

const actionGallery = [
  "chatgpt-image-jun-11-2026-08-21-32-pm.webp",
  "chatgpt-image-jun-11-2026-08-22-08-pm.webp",
  "chatgpt-image-jun-11-2026-08-23-19-pm.webp",
  "chatgpt-image-jun-11-2026-08-23-57-pm.webp",
  "chatgpt-image-jun-11-2026-08-24-25-pm.webp",
  "chatgpt-image-jun-11-2026-08-25-00-pm.webp",
  "chatgpt-image-jun-11-2026-08-25-38-pm.webp",
  "chatgpt-image-jun-11-2026-08-26-22-pm.webp",
  "chatgpt-image-jun-11-2026-08-29-00-pm.webp",
  "chatgpt-image-jun-11-2026-08-29-43-pm.webp",
  "chatgpt-image-jun-11-2026-08-30-21-pm.webp",
  "chatgpt-image-jun-11-2026-08-31-17-pm.webp",
].map((fileName) => facilitatorGalleryImage(fileName));

const outcomes = ["Leadership", "Strategy", "Alignment", "Growth"];

const programs = [
  "Leadership Development Labs",
  "New Leader Induction Programs",
  "Live Conflict Management",
  "Red M Consulting Synch Model of Leading and working with teams",
  "Strategy Meets",
  "Teaming Labs",
  "Deep Dialogue Forum Retreats",
  "Leading in Turbulent Times",
];

const processSteps = [
  {
    title: "Listen",
    text: "Understand the context and key challenges",
  },
  {
    title: "Explore",
    text: "Uncover diverse perspectives and insights",
  },
  {
    title: "Facilitate",
    text: "Guide conversations with neutrality and depth",
  },
  {
    title: "Align",
    text: "Build clarity, consensus and commitment",
  },
  {
    title: "Transform",
    text: "Drive action and sustainable results",
  },
];

const insightCards = [
  {
    image: images.growth,
    title: "A Highly Leveraged Leadership Skill",
    text: "Facilitation is at the heart of Raj's coaching and training for senior executives.",
  },
  {
    image: images.dialogue,
    title: "Better Conversations, Better Decisions",
    text: "Well-facilitated conversations lead to stronger alignment, smarter decisions and durable outcomes.",
  },
  {
    image: images.compass,
    title: "From Insight to Impact",
    text: "Raj helps leaders move from conversation to commitment and commitment to impact.",
  },
];

function AccentLabel({ children }) {
  return (
    <p className="facilitation-kicker">
      {children}
      <span />
    </p>
  );
}

export default function Facilitation() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <section id="facilitation" className="facilitation-hero">
          <img decoding="async" fetchPriority="high" loading="eager"
            src={images.hero}
            alt="Leadership team facilitation room prepared for a Raj Mali workshop"
            className="facilitation-hero-image"
          />
          <div className="facilitation-hero-wash" />
          <div className="site-shell facilitation-hero-shell">
            <div className="facilitation-hero-copy">
              <AccentLabel>Facilitation For Leadership Teams</AccentLabel>
              <h1>
                Facilitation That Creates Clarity, Alignment &amp; Action.
              </h1>
              <p>
                Raj designs and facilitates high-impact conversations for senior
                leadership teams to navigate complexity, resolve challenges and
                achieve collective outcomes.
              </p>
              <div className="facilitation-actions">
                <a href="#programs" className="primary-button">
                  Explore Programs <ArrowRight size={15} />
                </a>
                <a href="/contact#contact-form" className="secondary-button">
                  Book a Discovery Call
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="facilitation-intro site-shell">
          <div className="facilitation-video-card">
            <img decoding="async" loading="lazy"
              src={images.meeting}
              alt="A prepared leadership facilitation room"
            />
            <div className="facilitation-video-overlay">
              Great conversations create great results.
            </div>
          </div>

          <div className="facilitation-intro-copy">
            <AccentLabel>Focused Facilitation Interventions</AccentLabel>
            <h2>
              Helping Leadership Teams Think Deeply. Decide Wisely. Act
              Together.
            </h2>
            <p>
              Raj has worked with a large number of clients in designing and
              delivering focused facilitation interventions for senior
              leadership teams.
            </p>
            <p>
              His approach balances both business and human perspectives,
              creating the right conditions for leaders to think deeply,
              challenge honestly and decide wisely.
            </p>
            <div className="facilitation-outcomes">
              {outcomes.map((outcome, index) => (
                <div key={outcome}>
                  <span>
                    <img decoding="async" loading="lazy" src={icons[index]} alt={`${outcome} facilitation outcome icon`} />
                  </span>
                  <strong>{outcome}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="programs" className="facilitation-programs">
          <div className="site-shell">
            <div className="facilitation-section-heading">
              <AccentLabel>Facilitation Programs</AccentLabel>
              <h2>Programs Designed &amp; Delivered by Red M Consulting</h2>
              <p>
                Curated interventions for leadership teams that need sharper
                thinking, stronger alignment and meaningful movement.
              </p>
            </div>
            <div className="facilitation-program-grid">
              {programs.map((program, index) => (
                <article key={program} className="facilitation-program-card">
                  <span>
                    <img decoding="async" loading="lazy" src={icons[index + 4]} alt={`${program} leadership program icon`} />
                  </span>
                  <h3>{program}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="facilitation-process">
          <div className="site-shell facilitation-process-shell">
            <div className="facilitation-process-copy">
              <AccentLabel>Our Facilitation Approach</AccentLabel>
              <h2>Creating the space for Insight &amp; Action</h2>
              <p>
                Every leadership team is unique. Raj's role is to create a
                neutral, open and structured space where leaders can explore
                perspectives, surface real issues and co-create practical
                solutions.
              </p>
            </div>
            <div className="facilitation-process-steps">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className={step.title === "Facilitate" ? "is-compact-icon" : ""}
                >
                  <span>
                    <img decoding="async" loading="lazy" src={processIcons[index]} alt={`${step.title} facilitation process icon`} />
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="facilitation-action-gallery">
          <div className="site-shell">
            <div className="facilitation-section-heading">
              <AccentLabel>Facilitation In Action</AccentLabel>
              <h2>Facilitation In Action</h2>
            </div>
            <div className="facilitation-gallery-grid">
              {actionGallery.map((image, index) => (
                <article key={image} className="facilitation-gallery-card">
                  <img decoding="async" loading="lazy"
                    src={image}
                    alt={`Facilitation in action ${index + 1}`}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="facilitation-insights site-shell">
          {insightCards.map((card) => (
            <article key={card.title} className="facilitation-insight-card">
              <img decoding="async" loading="lazy" src={card.image} alt={`${card.title} facilitation insight`} />
              <div>
                <h3>{card.title}</h3>
                <span />
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
