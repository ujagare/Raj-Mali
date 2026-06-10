import { ArrowRight, BarChart3, PanelsTopLeft, UsersRound } from 'lucide-react';
import { images } from '../data/assets';
import { Reveal, Stagger, StaggerItem } from './ScrollAnimations';

const services = [
  {
    title: 'Leadership & Life Mastery',
    desc: 'For leaders seeking extraordinary results without sacrificing themselves.',
    img: images.notebookImage,
    icon: UsersRound,
  },
  {
    title: 'Pattern Interrupt Coaching',
    desc: 'Break unconscious limitations and create new possibilities.',
    img: images.horizonImage,
    icon: PanelsTopLeft,
  },
  {
    title: 'Leadership Labs',
    desc: 'Transform culture, communication and performance.',
    img: images.roadImage,
    icon: BarChart3,
  },
];

export default function Services() {
  return (
    <section id="work-with-me" className="services-section relative overflow-hidden bg-gradient-to-b from-pearl via-white to-pearl py-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
      <div className="site-shell">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.65fr_1fr_0.35fr] lg:items-end">
          <div>
            <Reveal as="p" className="eyebrow mb-5">Signature Work</Reveal>
            <Reveal as="h2" className="section-title" delay={0.06}>
              Precise work for meaningful transformation.
            </Reveal>
          </div>
          <Reveal as="p" className="body-copy max-w-xl lg:justify-self-center" delay={0.1}>
            Deep coaching and facilitation containers designed for leaders, teams and organisations ready to move
            from insight into embodied change.
          </Reveal>
          <Reveal as="a" href="#writing" className="nav-link inline-flex items-center gap-2 lg:justify-self-end" delay={0.14}>
            View All Writings <ArrowRight size={14} />
          </Reveal>
        </div>

        <Stagger className="grid gap-7 lg:grid-cols-[1fr_1fr_1fr_0.72fr]">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem
                as="article"
                key={service.title}
                className="service-card group relative overflow-hidden rounded-md border border-ink/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-premium"
              >
                <div className="service-image relative h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
                </div>
                <div className="service-icon absolute left-7 top-[12.5rem] z-20 grid size-16 place-items-center rounded-full border border-white/70 bg-navy text-white shadow-premium">
                  <Icon size={30} strokeWidth={1.7} />
                </div>
                <div className="service-content relative px-8 pb-8 pt-12">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-navy/25 to-transparent" />
                  <h3 className="font-serif text-3xl font-semibold leading-tight text-ink">{service.title}</h3>
                  <p className="mt-5 min-h-[72px] text-sm font-semibold leading-7 text-ink/72">{service.desc}</p>
                  <a
                    href="#cta"
                    className="mt-7 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.14em] text-navy transition group-hover:gap-4"
                  >
                    Learn More <ArrowRight size={15} />
                  </a>
                </div>
              </StaggerItem>
            );
          })}

          <StaggerItem as="aside" className="hidden rounded-md border border-ink/10 bg-navy p-8 text-white shadow-premium lg:block">
            <p className="font-serif text-7xl leading-none text-white/35">“</p>
            <p className="mt-4 font-serif text-3xl leading-9 text-white">
              Thoughts to pause with, and grow from.
            </p>
            <div className="mt-10 h-px w-16 bg-white/40" />
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
