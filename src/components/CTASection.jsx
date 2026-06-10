import { ArrowRight, CalendarDays, CircleCheckBig } from 'lucide-react';
import { images } from '../data/assets';
import { ImageReveal, Reveal, Stagger, StaggerItem } from './ScrollAnimations';

const outcomes = ['One Conversation.', 'New Possibilities.', 'Lasting Impact.'];

export default function CTASection() {
  return (
    <section id="cta" className="cta-premium">
      <div className="cta-grid">
        <ImageReveal className="cta-image-panel" intensity={18}>
          <img src={images.beginJourneyImage} alt="Mountain path at sunrise with a beginning quote" />
          <div className="cta-image-badge">
            <CalendarDays size={18} />
            Private Discovery Session
          </div>
        </ImageReveal>

        <div className="cta-content">
          <div className="cta-copy">
            <Reveal as="p" className="cta-kicker">Begin Your Journey</Reveal>
            <Reveal as="h2" delay={0.06}>
              Whether you are leading a company, building a dream or navigating a life transition.
            </Reveal>
            <Reveal as="p" delay={0.1}>
              Meaningful change begins with a single conversation. Bring the question that will not leave you
              alone, and we will begin there.
            </Reveal>
            <Reveal as="a" href="mailto:hello@rajmali.com" className="cta-button" delay={0.14}>
              Schedule a Discovery Call <ArrowRight size={16} />
            </Reveal>
          </div>

          <div className="cta-outcomes">
            <Stagger as="ul">
              {outcomes.map((item) => (
                <StaggerItem as="li" key={item}>
                  <span>
                    <CircleCheckBig size={20} />
                  </span>
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
