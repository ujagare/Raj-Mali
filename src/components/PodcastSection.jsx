import { useState } from 'react';
import { ArrowUpRight, Headphones, Play } from 'lucide-react';
import { images } from '../data/assets';
import { ImageReveal, Reveal } from './ScrollAnimations';

const podcastUrl = 'https://youtu.be/CReMPhcNLOE?si=3d_1_1FQgvG4fDaR';
const embedUrl = 'https://www.youtube.com/embed/CReMPhcNLOE';

export default function PodcastSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="podcast" className="podcast-section">
      <div className="site-shell podcast-shell">
        <div className="podcast-copy">
          <Reveal as="p" className="podcast-kicker">
            <Headphones size={16} />
            Featured Podcast
          </Reveal>
          <Reveal as="h2" delay={0.06}>Listen to a deeper conversation with Raj Mali.</Reveal>
          <Reveal as="p" delay={0.1}>
            A thoughtful space for leadership, awareness and the inner shifts that shape meaningful work.
          </Reveal>
          <Reveal as="a" href={podcastUrl} target="_blank" rel="noreferrer" className="podcast-link" delay={0.14}>
            Watch on YouTube <ArrowUpRight size={16} />
          </Reveal>
        </div>

        <ImageReveal className="podcast-video-card" intensity={14}>
          <div className="podcast-video-frame">
            {isPlaying ? (
              <iframe
                src={`${embedUrl}?autoplay=1`}
                title="Raj Mali podcast on YouTube"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="podcast-thumbnail"
                onClick={() => setIsPlaying(true)}
                aria-label="Play Raj Mali podcast"
              >
                <img decoding="async" loading="lazy" src={images.podcastThumbnail} alt="Raj Mali podcast episode thumbnail" />
                <span className="podcast-center-play">
                  <Play size={34} className="fill-current" />
                </span>
              </button>
            )}
          </div>
        </ImageReveal>
      </div>
    </section>
  );
}
