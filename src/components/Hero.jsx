import { motion } from "framer-motion";
import { images } from "../data/assets";

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-pearl">
      <motion.picture
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="absolute inset-0 -z-20 h-full w-full"
      >
        <img
          src={images.workshopImage}
          alt="Raj Mali leading a group coaching session"
          className="hero-portrait hero-portrait-group h-full w-full object-cover"
        />
      </motion.picture>
      <div className="hero-wash absolute inset-0 -z-10" />
      <div className="site-shell grid min-h-[720px] items-center gap-10 py-14 lg:grid-cols-[0.72fr_1fr] lg:py-0 2xl:grid-cols-[0.72fr_1fr_0.34fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-copy z-10 max-w-xl pt-8 lg:pt-0"
        >
          <div className="hero-headline">
            <p className="eyebrow mb-7">Coach. Facilitator. Mentor.</p>
            <h1 className="editorial-title">
              <span className="hero-title-line">Wake Up.</span>{" "}
              <br className="hero-break-desktop" />
              <span className="hero-title-line">Dream it.</span>{" "}
              <br className="hero-break-mobile" />
              <span className="hero-title-line"></span>{" "}
              <br className="hero-break-desktop" />
              <span className="hero-title-line">Play.</span>
            </h1>
            <div className="my-8 h-px w-16 bg-navy" />
          </div>
          <div className="hero-actions">
            <p className="body-copy max-w-[29rem]">
              In a world obsessed with doing more, I help leaders, creators and
              dreamers access the deeper intelligence that emerges through
              stillness, awareness and conscious action.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="/contact#contact-form" className="primary-button">
                Work With Me
              </a>
              <a href="/writing" className="secondary-button">
                Explore My Writing
              </a>
            </div>
          </div>
        </motion.div>

        <div className="hidden 2xl:block" />
      </div>
    </section>
  );
}
