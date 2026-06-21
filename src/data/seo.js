const envSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');
const runtimeSiteUrl =
  typeof window === 'undefined' ? 'https://www.rajmali.com' : window.location.origin;
const SITE_URL = envSiteUrl || runtimeSiteUrl;
const SITE_NAME = 'Raj Mali';
const DEFAULT_IMAGE = '/og-image.svg';

export const siteConfig = {
  name: SITE_NAME,
  url: SITE_URL,
  defaultImage: `${SITE_URL}${DEFAULT_IMAGE}`,
  email: 'hello@rajmali.com',
  location: 'Pune, India',
};

const faqItems = [
  {
    question: 'Who do you work with?',
    answer:
      'Raj Mali works with founders, senior leaders, creators and teams who want sharper clarity, calmer decision-making and more conscious impact.',
  },
  {
    question: 'What is leadership coaching?',
    answer:
      'Leadership coaching is a focused reflective partnership that helps leaders see patterns, shift assumptions and act from a more grounded place.',
  },
  {
    question: 'How do workshops work?',
    answer:
      'Workshops are designed around team context, combining facilitation, reflection, dialogue and practical experiments that continue after the room.',
  },
  {
    question: 'Can sessions be conducted remotely?',
    answer:
      'Yes. Coaching and advisory sessions can be conducted remotely with presence, structure and confidentiality.',
  },
  {
    question: 'How can I book a discovery call?',
    answer:
      'Use the contact form to share context and request a short discovery conversation to explore fit.',
  },
];

const personSchema = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Raj Mali',
  url: SITE_URL,
  email: siteConfig.email,
  jobTitle: 'Executive Coach, Leadership Facilitator and Mentor',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Executive coaching',
    'Leadership facilitation',
    'Conscious leadership',
    'Leadership workshops',
    'Mentoring',
  ],
};

const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Raj Mali',
  url: SITE_URL,
  email: siteConfig.email,
  founder: {
    '@id': `${SITE_URL}/#person`,
  },
  areaServed: ['India', 'Global'],
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
};

const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqItems.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const bookSchema = {
  '@type': 'Book',
  name: 'The Tao of Leadership',
  author: {
    '@id': `${SITE_URL}/#person`,
  },
  description:
    'A book by Raj Mali exploring leadership through the wisdom of Tao and its relevance to contemporary leadership.',
  url: `${SITE_URL}/writing`,
};

const articleSchema = {
  '@type': 'ItemList',
  name: 'Writings and reflections by Raj Mali',
  itemListElement: [
    'Why Play?',
    "That's Interesting!",
    'Rebuilding The World',
    'Therapeutic Coaching: A Required Paradigm Shift',
    'Leadership & Dialogue',
  ].map((name, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Article',
      headline: name,
      author: {
        '@id': `${SITE_URL}/#person`,
      },
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
  })),
};

const baseGraph = [personSchema, organizationSchema, websiteSchema];

const page = ({ path, title, description, keywords, schemas = [], noindex = false }) => ({
  path,
  title,
  description,
  canonical: `${SITE_URL}${path}`,
  image: siteConfig.defaultImage,
  keywords,
  noindex,
  schema: {
    '@context': 'https://schema.org',
    '@graph': [...baseGraph, breadcrumbSchema([{ name: 'Home', path: '/' }, ...(path === '/' ? [] : [{ name: title.split('|')[0].trim(), path }])]), ...schemas],
  },
});

export const seoByPath = {
  '/': page({
    path: '/',
    title: 'Raj Mali | Executive Coach, Leadership Facilitator & Mentor in India',
    description:
      'Raj Mali is an executive coach, leadership facilitator and mentor based in Pune, India, helping leaders and teams create clarity, awareness and meaningful action.',
    keywords:
      'Raj Mali, executive coach India, leadership coach Pune, leadership facilitator, conscious leadership, executive mentoring',
    schemas: [faqSchema],
  }),
  '/about': page({
    path: '/about',
    title: 'About Raj Mali | Executive Coach & Leadership Facilitator',
    description:
      'Learn about Raj Mali, his 24 years of leadership, coaching, facilitation and conscious transformation work with leaders and teams.',
    keywords: 'about Raj Mali, executive coach, leadership facilitator India, conscious leadership',
  }),
  '/facilitation': page({
    path: '/facilitation',
    title: 'Leadership Team Facilitation | Raj Mali',
    description:
      'Facilitation for senior leadership teams that creates clarity, alignment, better conversations and practical action.',
    keywords: 'leadership facilitation, team facilitation India, senior leadership teams, strategy facilitation',
  }),
  '/writing': page({
    path: '/writing',
    title: 'Writing & The Tao of Leadership | Raj Mali',
    description:
      'Explore Raj Mali writings, reflections and The Tao of Leadership, with insights on leadership, awareness, play and transformation.',
    keywords: 'Raj Mali writing, The Tao of Leadership, leadership articles, conscious leadership essays',
    schemas: [bookSchema, articleSchema],
  }),
  '/workshops': page({
    path: '/workshops',
    title: 'Leadership Workshops & Corporate Programs | Raj Mali',
    description:
      'Experiential leadership workshops and corporate programs for conscious leaders, teams and organisations.',
    keywords: 'leadership workshops India, corporate leadership programs, coaching workshops, Raj Mali workshops',
  }),
  '/play-pics': page({
    path: '/play-pics',
    title: 'Play Pics & The Dojo | Raj Mali',
    description:
      'A visual glimpse into Raj Mali experiential play, awareness and leadership learning spaces.',
    keywords: 'play pics, experiential learning, leadership dojo, Raj Mali play',
  }),
  '/testimonials': page({
    path: '/testimonials',
    title: 'Testimonials | Raj Mali Coaching & Facilitation',
    description:
      'Read testimonials from leaders and organisations shaped by Raj Mali coaching, facilitation and leadership programs.',
    keywords: 'Raj Mali testimonials, executive coaching testimonials, leadership facilitation testimonials',
  }),
  '/contact': page({
    path: '/contact',
    title: 'Contact Raj Mali | Book a Discovery Call',
    description:
      'Contact Raj Mali for executive coaching, leadership facilitation, corporate programs, speaking engagements and media enquiries.',
    keywords: 'contact Raj Mali, book executive coaching call, leadership coach Pune contact',
    schemas: [faqSchema],
  }),
  '/privacy-policy': page({
    path: '/privacy-policy',
    title: 'Privacy Policy | Raj Mali',
    description:
      'Privacy policy for rajmali.com, including how contact form and email enquiry information is handled.',
    keywords: 'Raj Mali privacy policy',
  }),
};

export const routeAliases = {
  '/playpics': '/play-pics',
  '/playpic': '/play-pics',
};

export const notFoundSeo = page({
  path: '/404',
  title: 'Page Not Found | Raj Mali',
  description: 'The page you are looking for could not be found.',
  keywords: 'page not found',
  noindex: true,
});
