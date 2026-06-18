import { CheckCircle2, Sparkles } from 'lucide-react';
import { images } from '../data/assets';
import { ImageReveal, Reveal, Stagger, StaggerItem } from './ScrollAnimations';

const points = ['They need clarity.', 'They need perspective.', 'They need the courage to question old paradigms.'];

export default function AboutSection() {
  return (
    <section id="about-raj" className="wisdom-section">
      <div className="wisdom-grid">
        <div className="wisdom-copy-wrap">
          <div className="wisdom-copy">
            <Reveal as="p" className="wisdom-kicker">A Different Kind of Wisdom</Reveal>
            <Reveal as="h2" delay={0.06}>
              The World Has
              <br />
              Enough Information.
            </Reveal>
            <Reveal as="p" className="wisdom-subtitle" delay={0.1}>What it needs is deeper wisdom.</Reveal>
            <Stagger as="ul" className="wisdom-points">
              {points.map((point) => (
                <StaggerItem as="li" key={point}>
                  <CheckCircle2 size={19} />
                  {point}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal as="p" className="wisdom-body" delay={0.14}>
              For over two decades, I have worked with leaders, teams and individuals helping them unlock new
              possibilities through awareness, mindset transformation and conscious leadership.
            </Reveal>
          </div>
        </div>

        <ImageReveal className="wisdom-image-wrap">
          <img className="wisdom-portrait-image" src={images.heroPortrait} alt="Raj Mali smiling in a light blazer" />
          <div className="wisdom-image-shade" />
          <div className="wisdom-badge">
            <Sparkles size={18} />
            Two decades of transformation work
          </div>
        </ImageReveal>
      </div>
    </section>
  );
}
