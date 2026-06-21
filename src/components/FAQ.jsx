import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

const faqs = [
  {
    question: 'Who do you work with?',
    answer:
      'I work with founders, senior leaders, creators and teams who want sharper clarity, calmer decision-making and more conscious impact.',
  },
  {
    question: 'What is leadership coaching?',
    answer:
      'Leadership coaching is a focused reflective partnership that helps you see patterns, shift assumptions and act from a more grounded place.',
  },
  {
    question: 'How do workshops work?',
    answer:
      'Workshops are designed around your team context, combining facilitation, reflection, dialogue and practical experiments that continue after the room.',
  },
  {
    question: 'Can sessions be conducted remotely?',
    answer:
      'Yes. Coaching and advisory sessions can be conducted remotely with the same level of presence, structure and confidentiality.',
  },
  {
    question: 'How can I book a discovery call?',
    answer:
      'Use the discovery call button and share a little context. You will receive next steps for a short conversation to explore fit.',
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);
  const discoveryHref = window.location.pathname === '/contact' ? '#contact-form' : '/contact#contact-form';

  return (
    <section id="faq" className="relative overflow-hidden bg-gradient-to-b from-white via-pearl to-white py-24">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-navy/25 to-transparent" />
      <div className="site-shell grid items-start gap-12 lg:grid-cols-[0.76fr_1fr]">
        <div className="lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-md border border-white/70 bg-navy p-9 text-white shadow-premium">
            <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/3 translate-x-1/3 rounded-full border border-white/10" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-white/35 to-transparent" />
            <span className="mb-8 grid size-14 place-items-center rounded-full border border-white/20 bg-white/10 text-white">
              <Sparkles size={23} strokeWidth={1.5} />
            </span>
            <p className="text-[0.68rem] font-extrabold uppercase tracking-luxury text-white/70">
              Questions Before We Begin
            </p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              Quiet clarity before the first conversation.
            </h2>
            <p className="mt-6 text-sm font-medium leading-7 text-white/72">
              A few practical answers for leaders, teams and organisations considering deeper work.
            </p>
            <a
              href={discoveryHref}
              className="mt-9 inline-flex items-center gap-3 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white"
            >
              Book a discovery call <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <div className="rounded-md border border-ink/10 bg-white/75 p-3 shadow-premium backdrop-blur">
          {faqs.map((faq, index) => {
            const isOpen = active === index;
            return (
              <article
                key={faq.question}
                className={`group rounded-md border transition duration-300 ${
                  isOpen
                    ? 'border-navy/20 bg-white shadow-soft'
                    : 'border-transparent bg-transparent hover:border-ink/10 hover:bg-white/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-7"
                >
                  <span className="flex min-w-0 items-center gap-5">
                    <span className="text-base font-extrabold text-ink sm:text-lg">{faq.question}</span>
                  </span>
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full border transition duration-300 ${
                      isOpen ? 'border-navy bg-navy text-white' : 'border-ink/10 text-navy'
                    }`}
                  >
                    <ChevronDown size={18} className={`transition duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="mx-5 border-t border-ink/10 px-0 py-6 text-sm font-medium leading-7 text-ink/72 sm:mx-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
