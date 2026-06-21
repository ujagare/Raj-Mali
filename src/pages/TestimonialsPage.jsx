import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Quote,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const testimonials = [
  {
    name: "Seshadri Venkatachalapathi",
    role: "Learning, Talent & Performance Leader",
    company: "Amdocs",
    initials: "SV",
    highlight: "Leadership principles that stayed useful for more than 10 years.",
    quote:
      "Raj was my first executive coach when I stepped into a People manager role at Amdocs. More than 10 years later, I still find myself drawing on the leadership principles and approaches he taught me when navigating challenging situations.\n\nWhat I valued most about Raj's coaching was that it was anchored in a strong philosophy rather than a collection of techniques or frameworks. His coaching helped me not only become a better leader, but also embark on a deeper journey of self-awareness.",
  },
  {
    name: "Santosh Naidu",
    role: "Director & Site Lead",
    company: "Siemens Digital Industries Software, Pune",
    initials: "SN",
    highlight: "A trusted leadership coach, mentor and catalyst for transformation.",
    quote:
      "I have had the privilege of knowing and working with Raj Mali for over a decade, and I can confidently say that he is one of the finest leadership coaches I have encountered.\n\nI personally benefited from participating in Raj's leadership labs early in my management journey. What sets him apart is his unique facilitation style. Unlike traditional leadership programs built around slide decks and presentations, Raj creates highly engaging and thought-provoking experiences that challenge participants to reflect deeply on themselves. His sessions inspire the kind of change that matters most - both personally and professionally.\n\nOver the years, Raj has partnered with us to design and facilitate development programs for both current and aspiring leaders. These programs have been instrumental in helping us cultivate a culture rooted in trust, collaboration, and shared accountability. The impact has been so significant that we continue to run these programs year after year.\n\nOne program that stands out is the Potential Leaders Program. It has proven to be an invaluable platform for identifying individuals with the aspiration and readiness to lead. Raj brings remarkable authenticity to the experience - there is no sugarcoating, no grand promises, and no leadership cliches. Instead, participants gain a realistic understanding of what leadership truly demands, the responsibilities it carries, and the personal growth it requires.\n\nI can confidently attribute a significant part of our organizational success at Siemens to the leadership capability we have built through these initiatives. Raj has been much more than a facilitator; he has been a trusted leadership coach, mentor, and catalyst for transformation, helping individuals and organizations unlock their true leadership potential.",
  },
  {
    name: "Dr. Shambhavi Sharma",
    role: "Country Head - HR",
    company: "Marvell India Pvt Ltd",
    initials: "SS",
    highlight: "Approachable, sincere and effective with complex leadership work.",
    quote:
      "Raj and Team Red M,\n\nIt has been over 5 years that I have been consulted by Raj. The best part of this liaison is that Raj is very approachable, down to earth and sincere with his attempt. He has delivered the most complicated tasks in a very simple yet effective manner. He keeps the doors open for all the participants and managers in their learning and development journey.\n\nNot only does he deliver great leadership sessions but also mentors people really well.\n\nOverall it is a pleasure to have known and worked with Raj.\n\nWith best wishes.",
  },
  {
    name: "Ameeta Menon",
    role: "Sr. Manager, Learning Organization",
    company: "KPIT",
    initials: "AM",
    highlight: "Creatively planned leadership labs with profound learning experiences.",
    quote:
      "It has been personally an honour and a privilege to be associated with Raj Mali & Red M over the years.\n\nHe has been instrumental in helping us at KPIT to develop and strengthen our leadership development initiatives. Especially the programs he facilitates for us for the same.\n\nHis workshops and customised Leadership labs are creatively planned and executed. All the competencies of the participants are effectively addressed through role plays as well as some unique Red M - Wax On Wax Off activities. And most participants often share those to be one of the most profound learning experiences in their lives.\n\nHis understanding of the human psyche and his passion to help others understand themselves better is very much part of his workshops.\n\nHe is effortless with his knowledge and has reached many through his personal testimony to success in his field.",
  },
];

const stats = [
  ["10+", "Years of trusted client partnerships"],
  ["4", "Organisations represented here"],
  ["5+", "Years of continued leadership consulting"],
];

export default function TestimonialsPage() {
  const featured = testimonials[1];
  const remainingTestimonials = testimonials.filter((item) => item.name !== featured.name);

  return (
    <div className="testimonials-page min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <section className="testimonials-hero">
          <div className="site-shell testimonials-hero-shell">
            <div className="testimonials-hero-copy">
              <p className="eyebrow">Testimonials</p>
              <h1>Leaders and organisations shaped through deeper clarity.</h1>
              <p>
                Real words from clients who have experienced Raj's coaching,
                facilitation and leadership development work over years of
                partnership.
              </p>
              <div className="testimonials-hero-actions">
                <a href="#testimonial-stories" className="primary-button">
                  Read Stories <ArrowRight size={17} />
                </a>
                <a href="/contact#contact-form" className="secondary-button">
                  Work With Raj <ArrowRight size={17} />
                </a>
              </div>
            </div>

            <div className="testimonials-hero-card">
              <Quote size={38} strokeWidth={1.35} />
              <p>{featured.highlight}</p>
              <div>
                <span>{featured.initials}</span>
                <div>
                  <strong>{featured.name}</strong>
                  <small>{featured.company}</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials-proof">
          <div className="site-shell testimonials-proof-grid">
            {stats.map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <p>{label}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonial-stories" className="testimonials-feature-section">
          <div className="site-shell">
            <article className="testimonials-feature-card">
              <div className="testimonials-feature-aside">
                <span>{featured.initials}</span>
                <div className="testimonials-stars" aria-label="Five star testimonial">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} className="fill-current" />
                  ))}
                </div>
                <h2>{featured.name}</h2>
                <p>{featured.role}</p>
                <strong>{featured.company}</strong>
              </div>
              <div className="testimonials-feature-copy">
                <p className="eyebrow">Featured Client Voice</p>
                <h3>{featured.highlight}</h3>
                {featured.quote.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="testimonials-grid-section">
          <div className="site-shell">
            <div className="testimonials-section-heading">
              <p className="eyebrow">Client Reflections</p>
              <h2>Words from people and teams who have worked with Raj.</h2>
            </div>
            <div className="testimonials-story-grid">
              {remainingTestimonials.map((item) => (
                <article key={item.name} className="testimonial-story-card">
                  <div className="testimonial-story-top">
                    <span>{item.initials}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.role}</small>
                      <small>{item.company}</small>
                    </div>
                  </div>
                  <div className="testimonial-story-highlight">
                    <Sparkles size={18} />
                    <p>{item.highlight}</p>
                  </div>
                  <div className="testimonial-story-quote">
                    {item.quote.split("\n\n").map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-impact-section">
          <div className="site-shell testimonials-impact-shell">
            <div>
              <p className="eyebrow">What Clients Consistently Notice</p>
              <h2>A grounded style that creates real leadership movement.</h2>
            </div>
            <div className="testimonials-impact-grid">
              {[
                ["Philosophy over techniques", BadgeCheck],
                ["Deep self-awareness", UsersRound],
                ["Trust and collaboration", Building2],
              ].map(([text, Icon]) => (
                <article key={text}>
                  <Icon size={24} strokeWidth={1.55} />
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-cta">
          <div className="site-shell testimonials-cta-shell">
            <p>Ready to build leadership capability that lasts beyond the room?</p>
            <a href="/contact#contact-form" className="primary-button">
              Start A Conversation <ArrowRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
