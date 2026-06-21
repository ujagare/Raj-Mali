import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Globe2,
  Handshake,
  Mail,
  Mic2,
  Newspaper,
  Send,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FAQ from "../components/FAQ.jsx";

const contactImage = (fileName) =>
  new URL(`../assets/images/Contact/${fileName}`, import.meta.url).href;

const images = {
  hero: contactImage("ChatGPT Image Jun 11, 2026, 08_54_42 PM.png"),
  message: contactImage("ChatGPT Image Jun 11, 2026, 08_57_03 PM.png"),
};

const workWithMeOptions = [
  {
    title: "Leadership Coaching",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Corporate Programs",
    Icon: Building2,
  },
  {
    title: "Speaking Engagements",
    Icon: Mic2,
  },
  {
    title: "Partnerships",
    Icon: Handshake,
  },
  {
    title: "Media Requests",
    Icon: Newspaper,
  },
];

const contactAssurances = [
  {
    title: "Thoughtful Response",
    text: "Your message is reviewed with care before the first conversation.",
    Icon: Clock3,
  },
  {
    title: "Confidential Space",
    text: "Coaching and partnership enquiries are treated with discretion.",
    Icon: ShieldCheck,
  },
  {
    title: "Global Conversations",
    text: "Available for online and in-person work across time zones.",
    Icon: Globe2,
  },
];

export default function Contact() {
  const handleContactSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() || "Website Visitor";
    const email = formData.get("email")?.toString().trim() || "";
    const mobile = formData.get("mobile")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";
    const body = [
      `Name: ${name}`,
      email ? `Email: ${email}` : "",
      mobile ? `Mobile: ${mobile}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:hello@rajmali.com?subject=${encodeURIComponent(
      `Website enquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-pearl">
      <Navbar />
      <main>
        <section id="contact" className="contact-hero contact-hero-premium">
          <img src={images.hero} alt="" className="contact-hero-image" />
          <div className="contact-hero-shade contact-hero-shade-premium" />
          <div className="site-shell contact-hero-shell">
            <div className="contact-hero-copy contact-hero-copy-premium">
              <p className="contact-kicker">Page 10 - Contact</p>
              <h1>Every Transformation Begins With A Conversation</h1>
              <p>
                A meaningful conversation can become the first step toward
                clarity, courage, and deeply human transformation.
              </p>
              <a href="#contact-form" className="contact-hero-button">
                Work With Me <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="contact-page-body contact-page-body-premium">
          <div className="site-shell">
            <section className="contact-work-panel">
              <div className="contact-section-intro">
                <p className="contact-kicker">Work With Me</p>
                <h2>Choose the conversation you want to begin.</h2>
              </div>

              <div className="contact-work-grid">
                {workWithMeOptions.map(({ title, Icon }) => (
                  <article key={title} className="contact-work-card">
                    <span>
                      <Icon size={25} strokeWidth={1.75} />
                    </span>
                    <h3>{title}</h3>
                  </article>
                ))}
              </div>
            </section>

            <section id="contact-form" className="contact-conversation-panel">
              <div className="contact-conversation-image">
                <img src={images.message} alt="A calm conversation setting" />
                <div>
                  <Mail size={20} />
                  <span>Contact Form</span>
                </div>
              </div>

              <div className="contact-form-wrap contact-form-wrap-premium">
                <p className="contact-kicker">Contact Form</p>
                <h2>Send Your Message</h2>
                <span className="contact-heading-rule" />
                <form
                  className="contact-form contact-form-premium"
                  onSubmit={handleContactSubmit}
                >
                  <label>
                    <span>Name</span>
                    <input type="text" name="name" placeholder="Your name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label>
                    <span>Mobile Number</span>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="+91 98765 43210"
                    />
                  </label>
                  <label>
                    <span>Message</span>
                    <textarea
                      name="message"
                      placeholder="Tell me what you would like to explore."
                      rows={7}
                    />
                  </label>
                  <button type="submit">
                    Send Message <Send size={17} />
                  </button>
                </form>

                <div className="contact-form-insights">
                  {contactAssurances.map(({ title, text, Icon }) => (
                    <article key={title}>
                      <span>
                        <Icon size={20} strokeWidth={1.7} />
                      </span>
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>

        <FAQ />

        <section className="contact-page-body contact-quote-band">
          <div className="site-shell">
            <section className="contact-final-quote">
              <p className="contact-kicker">Final Quote</p>
              <blockquote>
                "Life is not a problem to be solved. It is a mystery to be
                danced with."
              </blockquote>
              <cite>- Raj Mali</cite>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
