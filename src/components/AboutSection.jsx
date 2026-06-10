import { CheckCircle2, Sparkles } from 'lucide-react';
import { images } from '../data/assets';

const points = ['They need clarity.', 'They need perspective.', 'They need the courage to question old paradigms.'];

export default function AboutSection() {
  return (
    <section id="about-raj" className="wisdom-section">
      <div className="wisdom-grid">
        <div className="wisdom-copy-wrap">
          <div className="wisdom-copy">
            <p className="wisdom-kicker">A Different Kind of Wisdom</p>
            <h2>
              The World Has
              <br />
              Enough Information.
            </h2>
            <p className="wisdom-subtitle">What it needs is deeper wisdom.</p>
            <ul className="wisdom-points">
              {points.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={19} />
                  {point}
                </li>
              ))}
            </ul>
            <p className="wisdom-body">
              For over two decades, I have worked with leaders, teams and individuals helping them unlock new
              possibilities through awareness, mindset transformation and conscious leadership.
            </p>
          </div>
        </div>

        <div className="wisdom-image-wrap">
          <img src={images.workshopImage} alt="Raj leading a group coaching session" />
          <div className="wisdom-image-shade" />
          <div className="wisdom-badge">
            <Sparkles size={18} />
            Two decades of transformation work
          </div>
        </div>
      </div>
    </section>
  );
}
