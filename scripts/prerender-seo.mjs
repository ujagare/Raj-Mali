import { createServer } from 'node:http';
import { mkdir, writeFile } from 'node:fs/promises';
import { createReadStream, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const siteUrl = 'https://www.rajmali.com';
const routes = [
  '/',
  '/about',
  '/facilitation',
  '/writing',
  '/workshops',
  '/play-pics',
  '/testimonials',
  '/contact',
  '/privacy-policy',
  '/playpics',
  '/playpic',
];

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
  ['.json', 'application/json; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, 'http://127.0.0.1');
  const decodedPath = decodeURIComponent(url.pathname);
  const cleanPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const filePath = path.normalize(path.join(distDir, cleanPath));

  if (!filePath.startsWith(distDir)) {
    return path.join(distDir, 'index.html');
  }

  if (existsSync(filePath)) {
    return filePath;
  }

  return path.join(distDir, 'index.html');
}

function createStaticServer() {
  const server = createServer((req, res) => {
    const filePath = resolveRequestPath(req.url || '/');
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', contentTypes.get(ext) || 'application/octet-stream');
    createReadStream(filePath)
      .on('error', () => {
        res.statusCode = 404;
        res.end('Not found');
      })
      .pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

async function writeRouteHtml(route, html) {
  const routePath = route === '/' ? 'index.html' : path.join(route.slice(1), 'index.html');
  const outputPath = path.join(distDir, routePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, 'utf8');
}

async function prerender() {
  if (!existsSync(path.join(distDir, 'index.html'))) {
    throw new Error('dist/index.html was not found. Run vite build before prerendering.');
  }

  const { server, port } = await createStaticServer();
  const browser = await chromium.launch({ headless: true });

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.addInitScript(() => {
        window.__RAJ_SEO_PRERENDER__ = true;
      });
      await page.goto(`http://127.0.0.1:${port}${route}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });
      await page.waitForSelector('main', { timeout: 10000 });
      await page.evaluate((canonicalOrigin) => {
        document
          .querySelectorAll('meta[name="robots"]')
          .forEach((node) => node.setAttribute('content', 'index, follow'));

        document.querySelectorAll('link[rel="canonical"]').forEach((node) => {
          const url = new URL(node.getAttribute('href') || '/', canonicalOrigin);
          node.setAttribute('href', `${canonicalOrigin}${url.pathname}`);
        });

        document.querySelectorAll('meta[property="og:url"]').forEach((node) => {
          const url = new URL(node.getAttribute('content') || '/', canonicalOrigin);
          node.setAttribute('content', `${canonicalOrigin}${url.pathname}`);
        });

        document
          .querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]')
          .forEach((node) => {
            const url = new URL(node.getAttribute('content') || '/og-image.png', canonicalOrigin);
            node.setAttribute('content', `${canonicalOrigin}${url.pathname}`);
          });

        const localOrigin = window.location.origin;
        const normalizeLocalAssetUrl = (value) => {
          if (!value) {
            return value;
          }

          const url = new URL(value, localOrigin);
          if (url.origin === localOrigin && url.pathname.startsWith('/assets/')) {
            return `${url.pathname}${url.search}${url.hash}`;
          }

          return value;
        };

        document.querySelectorAll('[src]').forEach((node) => {
          node.setAttribute('src', normalizeLocalAssetUrl(node.getAttribute('src')));
        });

        document.querySelectorAll('[srcset]').forEach((node) => {
          const srcset = node
            .getAttribute('srcset')
            .split(',')
            .map((candidate) => {
              const parts = candidate.trim().split(/\s+/);
              parts[0] = normalizeLocalAssetUrl(parts[0]);
              return parts.join(' ');
            })
            .join(', ');
          node.setAttribute('srcset', srcset);
        });
      }, siteUrl);

      const html = await page.content();
      await writeRouteHtml(route, html);
      await page.close();
      console.log(`Prerendered ${route}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

await prerender();
