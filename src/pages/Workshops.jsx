import {
  ArrowRight,
  BadgeCheck,
  CircleDot,
  Crown,
  Flower2,
  Handshake,
  Layers3,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const workshopImage = (fileName) =>
  new URL(`../assets/images/Facilitator/${fileName}`, import.meta.url).href;

const heroImage = workshopImage("2.png");

const workshops = [
  {
    title: "Leadership Labs",
    text:
      "A highly interactive and experiential learning based workshop for both seasoned and new leaders designed with the intention of enhancing team management, feedback skills and team rituals for high performing teams.",
    Icon: Crown,
    points: ["Team Management", "Feedback Skills", "Team Rituals", "High Performing Teams"],
    linkText: "Explore Workshop",
  },
  {
    title: "Co-Lab 2.0",
    text:
      "A customised workshop for leadership teams focused on building real collaboration that lasts beyond the workshop.",
    Icon: UsersRound,
    points: ["Real Collaboration", "Team Alignment", "Communication", "Trust That Lasts"],
    linkText: "Explore Workshop",
  },
  {
    title: "RED M Coaching Advantage",
    badge: "Flagship Program",
    text:
      "A flagship program designed for seasoned leaders for enhancing their coaching skills. This workshop draws on 20 years of direct coaching experience across people domains.",
    Icon: Handshake,
    points: ["Coaching Mindset", "Powerful Conversations", "Leadership Impact", "Behavioural Change"],
    linkText: "Explore Program",
  },
  {
    title: "Shakti - Fostering Feminine Leadership",
    text:
      "A unique offering focused on themes of women empowerment and fostering a culture of feminine leadership principles for senior women leaders.",
    Icon: Flower2,
    points: ["Women Empowerment", "Feminine Leadership Principles", "Confidence & Presence", "Purpose & Impact"],
    linkText: "Explore Workshop",
  },
];

const approach = [
  {
    number: "01",
    title: "Reflection",
    text: "Pause. Observe. Create space.",
    Icon: CircleDot,
  },
  {
    number: "02",
    title: "Awareness",
    text: "Gain clarity and new perspectives.",
    Icon: BadgeCheck,
  },
  {
    number: "03",
    title: "Direct Experience",
    text: "Engage. Practice. Go deeper.",
    Icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Conscious Action",
    text: "Apply. Integrate. Create impact.",
    Icon: Layers3,
  },
];

export default function Workshops() {
  return (
    <div className="workshops-page min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <section className="workshops-hero site-shell">
          <div className="workshops-hero-copy">
            <p>Workshops</p>
            <h1>Experiential Workshops for Conscious Leaders</h1>
            <span>
              Immersive learning journeys designed to expand awareness,
              strengthen leadership capability and create meaningful
              transformation - for individuals, teams and organisations.
            </span>
          </div>
          <div className="workshops-hero-media">
            <img src={heroImage} alt="A premium leadership workshop setting" />
          </div>
        </section>

        <section className="site-shell workshops-card-section">
          <div className="workshops-card-grid">
            {workshops.map(({ title, badge, text, Icon, points, linkText }) => (
              <article key={title} className="workshop-card">
                <div className="workshop-card-icon">
                  <Icon size={30} strokeWidth={1.45} />
                </div>
                <div className="workshop-card-title-row">
                  <h2>{title}</h2>
                  {badge && <strong>{badge}</strong>}
                </div>
                <p>{text}</p>
                <ul>
                  {points.map((point) => (
                    <li key={point}>
                      <BadgeCheck size={16} strokeWidth={1.65} />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="/contact#contact-form">
                  {linkText} <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="site-shell workshops-approach-section">
          <div className="workshops-approach-heading">
            <h2>Our Approach: Experience. Reflect. Transform.</h2>
          </div>
          <div className="workshops-approach-row">
            {approach.map(({ number, title, text, Icon }, index) => (
              <div className="workshops-approach-item-wrap" key={title}>
                <article className="workshops-approach-item">
                  <span>
                    <Icon size={28} strokeWidth={1.45} />
                  </span>
                  <div>
                    <strong>{number}</strong>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
                {index < approach.length - 1 && (
                  <ArrowRight className="workshops-approach-arrow" size={18} />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="site-shell workshops-cta-wrap">
          <div className="workshops-cta">
            <div>
              <Sparkles size={21} />
              <p>
                Ready to create meaningful transformation in your team or
                organisation?
              </p>
            </div>
            <a href="/contact#contact-form" className="primary-button">
              Let's Start A Conversation
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
