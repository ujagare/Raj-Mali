import { useEffect } from 'react';

const managedSelector = 'link[data-seo="true"], script[data-seo="true"]';

function upsertMeta(attribute, key, content) {
  if (!content) {
    return;
  }

  const meta =
    Array.from(document.head.querySelectorAll('meta')).find(
      (node) => node.getAttribute(attribute) === key,
    ) || document.createElement('meta');

  meta.setAttribute(attribute, key);
  meta.setAttribute('content', content);
  meta.setAttribute('data-seo', 'true');

  if (!meta.parentNode) {
    document.head.appendChild(meta);
  }
}

export default function SEO({ config }) {
  useEffect(() => {
    const stagingHost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.vercel.app');
    const isSeoPrerender = window.__RAJ_SEO_PRERENDER__ === true;
    const shouldNoindex =
      config.noindex ||
      (!isSeoPrerender && stagingHost && import.meta.env.VITE_INDEX_STAGING !== 'true');

    document.querySelectorAll(managedSelector).forEach((node) => node.remove());
    document.title = config.title;

    upsertMeta('name', 'description', config.description);
    upsertMeta('name', 'keywords', config.keywords);
    upsertMeta('name', 'robots', shouldNoindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('name', 'geo.region', 'IN-MH');
    upsertMeta('name', 'geo.placename', 'Pune, Maharashtra, India');
    upsertMeta('name', 'geo.position', '18.5204;73.8567');
    upsertMeta('name', 'ICBM', '18.5204, 73.8567');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', config.title);
    upsertMeta('property', 'og:description', config.description);
    upsertMeta('property', 'og:url', config.canonical);
    upsertMeta('property', 'og:image', config.image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', config.title);
    upsertMeta('name', 'twitter:description', config.description);
    upsertMeta('name', 'twitter:image', config.image);

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', config.canonical);
    canonical.setAttribute('data-seo', 'true');
    document.head.appendChild(canonical);

    if (config.schema) {
      const schema = document.createElement('script');
      schema.setAttribute('type', 'application/ld+json');
      schema.setAttribute('data-seo', 'true');
      schema.textContent = JSON.stringify(config.schema);
      document.head.appendChild(schema);
    }
  }, [config]);

  return null;
}
