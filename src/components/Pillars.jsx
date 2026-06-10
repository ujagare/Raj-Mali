import { icons } from '../data/assets';

const pillars = [
  {
    title: 'Stillness',
    text: 'The birthplace of insight. When the mind becomes quiet, clarity emerges.',
    icon: icons.stillnessIcon,
  },
  {
    title: 'Paradigm Shifts',
    text: 'New results begin with new ways of seeing. Transformation happens when perception changes.',
    icon: icons.ideaIcon,
  },
  {
    title: 'Conscious Action',
    text: 'Wisdom without action remains potential. Create meaningful impact through aligned action.',
    icon: icons.actionIcon,
  },
];

export default function Pillars() {
  return (
    <section className="pillars-section relative overflow-hidden border-y border-ink/10 bg-gradient-to-b from-white via-pearl to-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/20 to-transparent" />
      <div className="absolute -left-24 top-16 size-64 rounded-full border border-navy/5" />
      <div className="absolute -right-24 bottom-10 size-72 rounded-full border border-navy/5" />

      <div className="site-shell relative py-20">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="eyebrow mb-5">Three Pillars of Transformation</p>
          <h2 className="section-title">The inner architecture of conscious leadership.</h2>
          <p className="body-copy mx-auto mt-5 max-w-2xl">
            A simple, rigorous pathway for leaders who want clarity, perspective and meaningful action.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="pillar-card group relative overflow-hidden rounded-md border border-ink/10 bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-navy/25 hover:shadow-premium"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-navy/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative">
                <div className="pillar-icon mb-8 grid size-28 place-items-center rounded-full border border-navy/10 bg-gradient-to-br from-white to-mist/80 shadow-soft">
                  <img src={pillar.icon} alt="" className="size-24 rounded-full object-cover opacity-90 grayscale" />
                </div>
                <h3 className="font-serif text-3xl font-semibold leading-tight text-ink">{pillar.title}</h3>
                <p className="mt-5 text-sm font-semibold leading-7 text-ink/72">{pillar.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
