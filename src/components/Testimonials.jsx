import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'The sessions helped me lead with more calm, sharper decisions, and a much clearer sense of direction.',
    name: 'Aarav Mehta',
    role: 'Founder, SaaS Company',
    initials: 'AM',
    tag: 'Founder Coaching',
  },
  {
    quote:
      'Our leadership team started communicating with less noise, more courage, and far greater trust.',
    name: 'Vikram Shah',
    role: 'Managing Director',
    initials: 'VS',
    tag: 'Team Transformation',
  },
  {
    quote:
      'Raj created a reflective space where the real issue became visible within the first conversation.',
    name: 'Neha Patel',
    role: 'Executive Leader',
    initials: 'NP',
    tag: 'Clarity Work',
  },
  {
    quote:
      'I moved from constant urgency to grounded action, and my work started feeling meaningful again.',
    name: 'Rohan Kapoor',
    role: 'Creative Entrepreneur',
    initials: 'RK',
    tag: 'Conscious Action',
  },
  {
    quote:
      'The workshop gave our senior team a shared language for awareness, ownership, and aligned execution.',
    name: 'Isha Rao',
    role: 'People Strategy Lead',
    initials: 'IR',
    tag: 'Workshop',
  },
];

export default function Testimonials() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-pearl py-16">
      <div className="site-shell">
        <div className="mb-9 flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">Voices of Transformation</p>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            A single line of leadership shifts.
          </h2>
        </div>
      </div>

      <div className="testimonial-line-mask">
        <div className="testimonial-line-track">
          {marqueeItems.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="testimonial-line-card"
              aria-hidden={index >= testimonials.length}
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-full border border-navy/15 bg-navy text-white shadow-soft">
                <Quote size={22} className="fill-white/20" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="rounded-full border border-navy/10 bg-pearl px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-navy/70">
                    {item.tag}
                  </span>
                  <span className="hidden items-center gap-1 text-navy/55 sm:flex">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={12} className="fill-current" strokeWidth={1.5} />
                    ))}
                  </span>
                </div>
                <p className="truncate text-sm font-semibold leading-6 text-ink/80 sm:text-base">
                  {item.quote}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 border-l border-ink/10 pl-6">
                <span className="grid size-12 place-items-center rounded-full border border-navy/20 bg-white font-serif text-base font-semibold text-navy shadow-soft">
                  {item.initials}
                </span>
                <span>
                  <span className="block whitespace-nowrap text-sm font-extrabold text-ink">{item.name}</span>
                  <span className="block whitespace-nowrap text-xs font-semibold text-steel">{item.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
