# SEO Audit Report - Raj Mali Website

Date: 2026-06-21

## Summary

Website Vite/React single-page app hai. Build successful hai, images mostly WebP me optimized hain, aur pages ke headings/content present hain. Lekin SEO ke liye sabse badi problems metadata, sitemap/robots, structured data, route handling, aur important image alt text me hain.

## Critical Issues

### 1. Per-page meta title aur description missing

Current HTML me sirf ek generic title hai:

- `index.html`: `Raj Mali | Executive Coaching`

Missing:

- Meta description
- Canonical URL
- Open Graph tags
- Twitter card tags
- Per-page titles for `/about`, `/facilitation`, `/writing`, `/workshops`, `/play-pics`, `/testimonials`, `/contact`

Impact:

- Google search result me same/generic title aa sakta hai.
- Click-through rate kam ho sakta hai.
- Pages ka topic clearly identify nahi hota.

Recommended fix:

- React SEO component add karein jo route ke hisab se `document.title`, meta description, canonical, OG, Twitter tags update kare.

Priority: High

### 2. `robots.txt` aur `sitemap.xml` missing

Project me `robots.txt` aur `sitemap.xml` files nahi mili.

Impact:

- Google ko important pages discover karne me problem ho sakti hai.
- Sitemap submit karna possible nahi hoga jab tak file create na ho.

Recommended fix:

- `public/robots.txt` create karein.
- `public/sitemap.xml` create karein with all public URLs.

Priority: High

### 3. SPA routing unknown URLs ko Home dikha sakta hai

`vercel.json` me sab routes `/index.html` par rewrite ho rahe hain.

`src/App.jsx` me unknown path fallback Home page hai.

Impact:

- Galat URLs bhi valid page jaisa behave kar sakte hain.
- Search Console me soft 404 issue aa sakta hai.
- Duplicate/low-quality indexed URLs ka risk hai.

Recommended fix:

- Valid route list define karein.
- Unknown route ke liye real 404 page show karein.
- 404 metadata bhi add karein.

Priority: High

### 4. Structured data/schema missing

JSON-LD structured data nahi mila.

Recommended schema:

- `Person` for Raj Mali
- `Organization` or `ProfessionalService`
- `WebSite`
- `BreadcrumbList`
- `FAQPage` for FAQ section
- `Book` or `CreativeWork` for writing/book page

Impact:

- Google ko entity understanding kam milti hai.
- Rich result opportunities miss hoti hain.

Priority: Medium-High

## On-Page SEO Issues

### 5. Homepage H1 keyword weak hai

Current H1:

`Wake Up. Dream it. Play.`

Impact:

- Branding strong hai, lekin SEO intent weak hai.
- "Executive coach", "leadership coach", "facilitator", "Pune", "India" jaise keywords H1 me naturally nahi hain.

Recommended H1 example:

`Executive Coach and Leadership Facilitator for Conscious Leaders`

Ya:

`Raj Mali - Executive Coach, Leadership Facilitator and Mentor`

Priority: Medium-High

### 6. Page-specific keyword targeting missing/weak

Pages ke topics clear hain, lekin SEO targeting aur meta intent missing hai.

Suggested target keywords:

- Home: executive coach India, leadership coach Pune, conscious leadership coach
- About: Raj Mali coach, Raj Mali facilitator, leadership mentor India
- Facilitation: leadership facilitation, leadership development workshops, team facilitation India
- Workshops: experiential leadership workshops, conscious leadership workshops
- Writing: The Tao of Leadership, leadership reflections, Raj Mali writing
- Play Pics: organic play leadership, leadership through play
- Contact: contact Raj Mali, leadership coach consultation

Priority: Medium

### 7. Image alt text incomplete

Multiple important images have empty `alt=""`.

Examples:

- `src/pages/Facilitation.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Writing.jsx`
- `src/pages/PlayPics.jsx`
- `src/components/BlogSection.jsx`
- `src/components/PodcastSection.jsx`

Note:

- Decorative images can keep empty alt.
- Hero, service, writing, workshop, podcast, and gallery images should have descriptive alt text.

Priority: Medium

## Technical SEO Issues

### 8. Build is working, but JS bundle is large

Production build result:

- Main JS: about 469 KB
- CSS: about 148 KB
- Largest image: about 418 KB

Impact:

- Slower loading can affect Core Web Vitals.
- SEO indirectly affected through performance and user experience.

Recommended fix:

- Route-level lazy loading with `React.lazy`.
- Lazy-load below-the-fold images.
- Preload only the main hero image.
- Review unused CSS and animation payload.

Priority: Medium

### 9. No favicon/manifest detected

No favicon, manifest, or apple touch icon found.

Impact:

- Brand trust and browser/search presentation weaker.

Recommended fix:

- Add favicon.
- Add `site.webmanifest`.
- Add apple touch icon.

Priority: Low-Medium

### 10. Privacy Policy link is not real

Footer has Privacy Policy links pointing to `/` or `/contact`.

Impact:

- Trust signal weak.
- Business/personal brand site ke liye incomplete legal/trust page.

Recommended fix:

- Create `/privacy-policy` page.
- Update footer links.

Priority: Medium

### 11. Social links may be placeholders

Footer social links:

- `https://Facebook.com/rajmali-facebook`
- `https://Twitter.com/rajmali`
- `https://www.linkedin.com/in/rajmali`

Impact:

- Broken or placeholder social links trust ko hurt kar sakte hain.

Recommended fix:

- Verify actual profile URLs.
- Remove links that are not active.

Priority: Medium

## Positive Findings

- Production build is successful.
- Images are mostly converted to WebP.
- Website has multiple useful content pages.
- H1 exists on major route pages.
- Internal navigation is present.
- Client logos and testimonials create trust signals.

## Recommended Implementation Order

1. Add SEO metadata component and page-specific metadata.
2. Add `robots.txt` and `sitemap.xml`.
3. Add 404 page handling.
4. Add JSON-LD schema.
5. Improve homepage H1 and page copy keywords.
6. Fix important image alt text.
7. Add privacy policy page and fix footer links.
8. Improve performance with lazy loading and route splitting.

## Suggested Sitemap URLs

Replace domain with final live domain:

- `/`
- `/about`
- `/facilitation`
- `/writing`
- `/workshops`
- `/play-pics`
- `/testimonials`
- `/contact`

## Overall SEO Health

Estimated current technical SEO score: 55/100

Reason:

- Content and structure are present.
- Images optimized.
- But metadata, sitemap, robots, schema, canonical, and 404 handling are missing.

After recommended fixes, expected score: 80-90/100

