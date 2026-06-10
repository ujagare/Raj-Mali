import { ArrowRight, Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const columns = [
  { title: 'Explore', links: ['About Raj', 'Work With Me', 'Coaching & Mentoring', 'Speaking & Workshops', 'The Dojo', 'Contact'] },
  { title: 'Writing', links: ['Essays', 'Poems', 'Dream Notes', 'Reflections', 'Podcast'] },
  { title: 'Resources', links: ['Frameworks', 'Free Resources', 'Events'] },
  { title: 'Company', links: ['About', 'Testimonials', 'Media & Press', 'Terms of Service'] },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://Facebook.com/rajmali-facebook', Icon: FaFacebookF },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rajmali', Icon: FaLinkedinIn },
  { label: 'Twitter', href: 'https://Twitter.com/rajmali', Icon: FaTwitter },
  { label: 'Email', href: 'mailto:hello@rajmali.com', Icon: Mail },
];

export default function Footer() {
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
            <a href="#home" className="footer-logo">
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
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#home">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="footer-newsletter">
            <h3>Stay Connected</h3>
            <p>Insights on leadership, consciousness and creating a meaningful life.</p>
            <form>
              <input type="email" aria-label="Email address" placeholder="Your email address" />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} />
              </button>
            </form>
            <span>No noise. Just thoughtful notes.</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Raj Mali. All Rights Reserved.</p>
          <a href="#home">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
