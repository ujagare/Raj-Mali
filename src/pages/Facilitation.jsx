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
  hero: facilitatorImage("2.png"),
  meeting: facilitatorImage("1.png"),
  growth: facilitatorImage("ChatGPT Image Jun 11, 2026, 06_37_10 PM.png"),
  dialogue: facilitatorImage("ChatGPT Image Jun 11, 2026, 06_38_32 PM.png"),
  compass: facilitatorImage("ChatGPT Image Jun 11, 2026, 06_41_08 PM.png"),
};

const icons = [
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_05_03 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_07_37 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_09_50 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_13_06 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_14_07 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_15_14 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_16_35 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_17_26 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_18_11 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_19_34 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_20_26 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_27_37 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_27_49 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_30_30 PM.png"),
];

const processIcons = [
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 08_11_33 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 08_16_14 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_43_19 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_27_37 PM.png"),
  facilitatorIcon("ChatGPT Image Jun 11, 2026, 07_30_30 PM.png"),
];

const actionGallery = [
  "ChatGPT Image Jun 11, 2026, 08_21_32 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_22_08 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_23_19 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_23_57 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_24_25 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_25_00 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_25_38 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_26_22 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_29_00 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_29_43 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_30_21 PM.png",
  "ChatGPT Image Jun 11, 2026, 08_31_17 PM.png",
].map((fileName) => facilitatorGalleryImage(fileName));

const outcomes = ["Leadership", "Strategy", "Alignment", "Growth"];

const programs = [
  "Leadership Development Labs",
  "New Leader Induction Programs",
  "Live Conflict Management",
  "Red Wisdom Synch Model of Leading and working with teams",
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
          <img src={images.hero} alt="" className="facilitation-hero-image" />
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
                <a href="#contact" className="secondary-button">
                  Book a Discovery Call
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="facilitation-intro site-shell">
          <div className="facilitation-video-card">
            <img
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
                    <img src={icons[index]} alt="" />
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
              <h2>Programs Designed &amp; Delivered by Red Wisdom</h2>
              <p>
                Curated interventions for leadership teams that need sharper
                thinking, stronger alignment and meaningful movement.
              </p>
            </div>
            <div className="facilitation-program-grid">
              {programs.map((program, index) => (
                <article key={program} className="facilitation-program-card">
                  <span>
                    <img src={icons[index + 4]} alt="" />
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
                    <img src={processIcons[index]} alt="" />
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
                  <img
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
              <img src={card.image} alt="" />
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
