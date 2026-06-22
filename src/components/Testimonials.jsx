import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      'More than 10 years later, I still draw on the leadership principles and approaches Raj taught me.',
    name: 'Seshadri Venkatachalapathi',
    role: 'Amdocs',
    initials: 'SV',
    tag: 'Executive Coaching',
  },
  {
    quote:
      'Raj has been a trusted leadership coach, mentor, and catalyst for transformation.',
    name: 'Santosh Naidu',
    role: 'Siemens Digital Industries Software',
    initials: 'SN',
    tag: 'Leadership Labs',
  },
  {
    quote:
      'He has delivered the most complicated tasks in a very simple yet effective manner.',
    name: 'Dr. Shambhavi Sharma',
    role: 'Marvell India Pvt Ltd',
    initials: 'SS',
    tag: 'Leadership Sessions',
  },
  {
    quote:
      'His workshops and customised Leadership Labs are creatively planned and executed.',
    name: 'Ameeta Menon',
    role: 'KPIT',
    initials: 'AM',
    tag: 'Leadership Development',
  },
  {
    quote:
      'His sessions inspire the kind of change that matters most, both personally and professionally.',
    name: 'Santosh Naidu',
    role: 'Siemens Digital Industries Software',
    initials: 'SN',
    tag: 'Transformation',
  },
];

export default function Testimonials() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-pearl py-16">
      <div className="site-shell">
        <div className="mb-9 flex flex-col items-center gap-4 text-center">
          <p className="eyebrow">Voices of Transformation</p>
          <h2 className="testimonial-heading font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            No matter what you are faced with, a breakthrough is possible.
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
