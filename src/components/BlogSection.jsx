import { Clock } from 'lucide-react';
import { images } from '../data/assets';
import { Reveal, Stagger, StaggerItem } from './ScrollAnimations';

const articles = [
  {
    category: 'Essay',
    title: 'The Courage to Question Old Paradigms',
    time: '5 min read',
    img: images.notebookImage,
  },
  {
    category: 'Poem',
    title: 'Dream Notes: On the Edge of Becoming',
    time: '3 min read',
    img: images.horizonImage,
  },
  {
    category: 'Reflection',
    title: 'Leadership is an Inside-Out Journey',
    time: '4 min read',
    img: images.roadImage,
  },
];

export default function BlogSection() {
  return (
    <section id="writing" className="bg-pearl pb-16">
      <div className="site-shell">
        <Reveal as="p" className="eyebrow mb-7">Writing & Reflections</Reveal>
        <Stagger className="grid gap-7 md:grid-cols-3">
          {articles.map((article) => (
            <StaggerItem
              as="article"
              key={article.title}
              className="premium-card overflow-hidden"
            >
              <div className="h-32 overflow-hidden">
                <img src={article.img} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-navy/75">{article.category}</p>
                <h3 className="mt-2 min-h-[48px] text-base font-extrabold leading-6 text-ink">{article.title}</h3>
                <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-steel">
                  <Clock size={14} /> {article.time}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
