import { useState } from 'react';
import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';

const columns = [
  {
    title: 'Explore',
    links: [
      ['About Raj', '/about'],
      ['Work With Me', '/contact#contact-form'],
      ['Coaching & Mentoring', '/contact#contact-form'],
      ['Speaking & Workshops', '/workshops'],
      ['The Dojo', '/play-pics'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Writing',
    links: [
      ['Essays', '/writing'],
      ['Poems', '/writing'],
      ['Dream Notes', '/writing'],
      ['Reflections', '/writing'],
      ['Podcast', '/#podcast'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Frameworks', '/#work-with-me'],
      ['Free Resources', '/#faq'],
      ['Events', '/workshops'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/about'],
      ['Testimonials', '/testimonials'],
      ['Media & Press', '/contact'],
      ['Privacy Policy', '/privacy-policy'],
    ],
  },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajmali', Icon: FaLinkedinIn },
  { label: 'Email', href: 'mailto:hello@rajmali.com', Icon: Mail },
];

export default function Footer() {
  const [newsletterStatus, setNewsletterStatus] = useState('idle');

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    setNewsletterStatus('sending');
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')?.toString().trim();
    if (!email) {
      setNewsletterStatus('idle');
      return;
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      event.currentTarget.reset();
      setNewsletterStatus('sent');
    } catch {
      setNewsletterStatus('error');
    }
  };

  return (
    <footer className="footer-premium">
      <div className="footer-glow" />
      <div className="site-shell footer-shell">
        <div className="footer-topline">
          <p>Leadership coaching for deeper clarity and meaningful action.</p>
          <a href="mailto:hello@rajmali.com">
            hello@rajmali.com <ArrowRight size={15} />
          </a>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <span className="footer-monogram">RM</span>
              <span className="footer-name">Raj Mali</span>
            </a>
            <p className="footer-role">Coach. Facilitator. Mentor.</p>
            <p className="footer-intro">
              Helping leaders, creators and dreamers access deeper intelligence to create meaningful impact in the world.
            </p>
            <p className="footer-location">
              <MapPin size={16} />
              Pune, India. Working globally.
            </p>
            <div className="footer-socials">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-social-link"
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            {columns.map((column) => (
              <div key={column.title} className="footer-link-group">
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-newsletter">
            <h3>Stay Connected</h3>
            <p>Insights on leadership, consciousness and creating a meaningful life.</p>
            <form onSubmit={handleNewsletterSubmit}>
              <input type="email" name="email" aria-label="Email address" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe" disabled={newsletterStatus === 'sending'}>
                <ArrowRight size={18} />
              </button>
            </form>
            <span aria-live="polite">
              {newsletterStatus === 'sent'
                ? 'Thank you. You are on the list.'
                : newsletterStatus === 'error'
                  ? 'Could not subscribe. Please email hello@rajmali.com.'
                  : 'No noise. Just thoughtful notes.'}
            </span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Raj Mali. All Rights Reserved.</p>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
