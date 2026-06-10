import { clientLogos } from '../data/assets';

export default function TrustedBy() {
  const marqueeItems = [...clientLogos, ...clientLogos];

  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/25 to-transparent" />
      <div className="absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white to-transparent sm:w-44" />
      <div className="absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white to-transparent sm:w-44" />

      <div className="py-9">
        <div className="mx-auto mb-8 max-w-3xl px-5 text-center">
          <p className="eyebrow mb-4">Trusted Across Industries</p>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            Leaders and organisations shaped through deeper clarity.
          </h2>
        </div>

        <div className="mb-7 flex items-center justify-center gap-5 px-5">
          <span className="h-px w-14 bg-navy/25" />
          <p className="text-center text-[0.68rem] font-extrabold uppercase tracking-luxury text-navy/75">
            Organisations Raj has worked with
          </p>
          <span className="h-px w-14 bg-navy/25" />
        </div>

        <div className="marquee-mask">
          <div className="marquee-track">
            {marqueeItems.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="marquee-item group"
                aria-hidden={index >= clientLogos.length}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-16 max-w-[190px] object-contain opacity-100 transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
