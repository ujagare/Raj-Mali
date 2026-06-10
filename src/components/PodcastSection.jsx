import { useState } from 'react';
import { ArrowUpRight, Headphones, Play } from 'lucide-react';
import { images } from '../data/assets';

const podcastUrl = 'https://youtu.be/CReMPhcNLOE?si=3d_1_1FQgvG4fDaR';
const embedUrl = 'https://www.youtube.com/embed/CReMPhcNLOE';

export default function PodcastSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="podcast" className="podcast-section">
      <div className="site-shell podcast-shell">
        <div className="podcast-copy">
          <p className="podcast-kicker">
            <Headphones size={16} />
            Featured Podcast
          </p>
          <h2>Listen to a deeper conversation with Raj Mali.</h2>
          <p>
            A thoughtful space for leadership, awareness and the inner shifts that shape meaningful work.
          </p>
          <a href={podcastUrl} target="_blank" rel="noreferrer" className="podcast-link">
            Watch on YouTube <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="podcast-video-card">
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
                <img src={images.podcastThumbnail} alt="" />
                <span className="podcast-center-play">
                  <Play size={34} className="fill-current" />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
