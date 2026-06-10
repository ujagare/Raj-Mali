import { images } from '../data/assets';

export default function QuoteSection() {
  return (
    <section className="quote-section">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="site-shell quote-grid">
        <div className="quote-copy">
          <div className="quote-mark">&ldquo;</div>
          <p className="quote-kicker">A Playful Note On Presence</p>
          <blockquote className="quote-text">
            &ldquo;The Tao that doesn&apos;t giggle is not the Giggling Tao.&rdquo;
            <cite className="quote-author">Raj Mali</cite>
          </blockquote>
        </div>

        <div className="quote-art">
          <img
            src={images.bookStackImage}
            alt="Books and a plant"
            className="quote-image"
          />
        </div>
      </div>
    </section>
  );
}
