import { ArrowRight, CalendarDays, CircleCheckBig } from 'lucide-react';
import { images } from '../data/assets';

const outcomes = ['One Conversation.', 'New Possibilities.', 'Lasting Impact.'];

export default function CTASection() {
  return (
    <section id="cta" className="cta-premium">
      <div className="cta-grid">
        <div className="cta-image-panel">
          <img src={images.beginJourneyImage} alt="Mountain path at sunrise with a beginning quote" />
          <div className="cta-image-badge">
            <CalendarDays size={18} />
            Private Discovery Session
          </div>
        </div>

        <div className="cta-content">
          <div className="cta-copy">
            <p className="cta-kicker">Begin Your Journey</p>
            <h2>Whether you are leading a company, building a dream or navigating a life transition.</h2>
            <p>
              Meaningful change begins with a single conversation. Bring the question that will not leave you
              alone, and we will begin there.
            </p>
            <a href="mailto:hello@rajmali.com" className="cta-button">
              Schedule a Discovery Call <ArrowRight size={16} />
            </a>
          </div>

          <div className="cta-outcomes">
            <ul>
              {outcomes.map((item) => (
                <li key={item}>
                  <span>
                    <CircleCheckBig size={20} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
