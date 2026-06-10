import { images } from '../data/assets';
import { ImageReveal, Reveal } from './ScrollAnimations';

export default function QuoteSection() {
  return (
    <section className="quote-section">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="site-shell quote-grid">
        <div className="quote-copy">
          <Reveal className="quote-mark">&ldquo;</Reveal>
          <Reveal as="p" className="quote-kicker" delay={0.06}>A Playful Note On Presence</Reveal>
          <Reveal as="blockquote" className="quote-text" delay={0.1}>
            &ldquo;The Tao that doesn&apos;t giggle is not the Giggling Tao.&rdquo;
            <cite className="quote-author">Raj Mali</cite>
          </Reveal>
        </div>

        <ImageReveal className="quote-art" intensity={18}>
          <img
            src={images.bookStackImage}
            alt="Books and a plant"
            className="quote-image"
          />
        </ImageReveal>
      </div>
    </section>
  );
}
