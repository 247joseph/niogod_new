# 10 — Legacy migration

The legacy niogod site lives at `/Users/josephjose/Desktop/niogod_new/*.html` plus a `de/` subfolder mirroring most pages. The rebuild runs in parallel; this document specifies what to do with each legacy file at cutover.

## Strategy

- **Tear down, don't migrate.** The legacy site's IA, copy, and asset structure don't map cleanly to the new IA in §4 of the brief. Forcing a path-by-path migration carries forward the legacy voice. Cleaner to redirect deprecated URLs to their nearest new equivalent and to 410-Gone the URLs that have no legitimate successor.
- **Audit before redirect.** Several legacy pages assert claims that the brief and file 00 of this handoff explicitly forbid (e.g., "EOR Liability Shield," "72-Hour Sprint," AÜG-conformance without backing). The audit step purges those claims from anything that remains visible — even archive URLs.
- **No `/legal.html` catch-all survives.** The new site has split Impressum / Datenschutz / AGB / Barrierefreiheit per the brief. The legacy `legal.html` returns 410 Gone with a `<Link>` header pointing to the new four pages.
- **No `/de/` subfolder survives at niogod.com.** German content lives at niogod.de canonically. The legacy `niogod.com/de/*` paths all 301 to their `niogod.de` equivalents.

## Legacy file inventory and migration map

| Legacy URL | Legacy purpose | Decision | Target |
|---|---|---|---|
| `/index.html` | Homepage | 301 → `/` | New homepage (interim variant) |
| `/about-us.html` | About | 301 → `/about` | New About page |
| `/contact.html` | Contact | 301 → `/contact` | New Contact form |
| `/protocol.html` | Old "72-Hour Sprint" protocol page | 301 → `/protocol` | New `/protocol` page (5-stage Einsatz lifecycle) |
| `/case-studies.html` | Case studies | 301 → `/case-studies` | New `/case-studies` index (likely empty at launch) |
| `/security.html` | Security page | 301 → `/compliance-shield` | New `/compliance-shield` |
| `/regional-advantage.html` | Regional positioning | 301 → `/regional` | New `/regional` |
| `/careers.html` | Careers index | 301 → `/careers` | New `/careers` |
| `/cpp-linux-dev.html` | Job listing | 410 Gone | (Old role; reissue under new MDX flow if still hiring) |
| `/legal-consultant.html` | Job listing | 410 Gone | (Same) |
| `/ml-autonomous.html` | Job listing | 410 Gone | (Same) |
| `/visual-slam.html` | Job listing | 410 Gone | (Same) |
| `/blog.html` | Blog index | 301 → `/insights` | New `/insights` index |
| `/blog-async-work.html` | Blog post | Audit → 301 to new `/insights/<slug>` if content survives audit, else 410 Gone | Probably 410 |
| `/blog-deeptech-guide.html` | Blog post | Audit | Probably 410 |
| `/blog-eor-future.html` | Blog post — likely contains "EOR Liability Shield" claim | 410 Gone (do not preserve) | n/a |
| `/blog-sap-talent-gap.html` | Blog post | Audit | Probably 410 |
| `/blog-time-to-code.html` | Blog post | Audit | Probably 410 |
| `/newsletter.html` | Newsletter signup | 410 Gone | (No newsletter in v1; revisit) |
| `/legal.html` | Catch-all legal | 410 Gone | New `/impressum`, `/datenschutz`, `/agb`, `/barrierefreiheit` |
| `/de/index.html` | German homepage on .com | 301 to `niogod.de/` | New niogod.de homepage |
| `/de/about-us.html` | German about | 301 to `niogod.de/ueber-uns` | New niogod.de/ueber-uns |
| `/de/contact.html` | German contact | 301 to `niogod.de/kontakt` | |
| `/de/protocol.html` | German protocol | 301 to `niogod.de/protokoll` | |
| `/de/case-studies.html` | German case studies | 301 to `niogod.de/dossiers` | |
| `/de/security.html` | German security | 301 to `niogod.de/compliance-shield` | |
| `/de/regional-advantage.html` | German regional | 301 to `niogod.de/regional` | |
| `/de/careers.html` | German careers | 301 to `niogod.de/karriere` | |
| `/de/blog.html` | German blog | 301 to `niogod.de/insights` | |
| `/de/blog-*.html` | German blog posts | Audit; 410 Gone unless preserved | |
| `/de/newsletter.html` | German newsletter | 410 Gone | |
| `/de/legal.html` | German catch-all legal | 410 Gone | |

## The audit step (for blog posts)

Each legacy blog post needs a manual read before the migration decision. Audit criteria — keep only if **all** of the following are true:

1. Post does not assert AÜG-conformance, EOR Liability Shield, or any compliance language unbacked by current artifacts.
2. Post is factually correct against the brief's voice and current operational reality.
3. Post is consistent with the German Anwalt's posture on legal-information disclaimers (every legal-information post needs the "ersetzt keine Rechtsberatung" footer).
4. Joseph reads the post and approves republishing under the new brand voice.

If any criterion fails: 410 Gone, no migration. Better to launch /insights with 2 strong original posts than to import 5 weak ones.

The audit is a 1-2 day Joseph + reviewer task. Do it in Sprint 4 against staging before the production cutover.

## The redirect implementation

301/410 redirects live in `next.config.mjs` — not in CDN. This keeps them version-controlled and reviewable in PR.

```js
// next.config.mjs (excerpt)
export default {
  async redirects() {
    return [
      // === Strict 301s (legacy → new IA) ===
      { source: "/index.html",            destination: "/",                 permanent: true },
      { source: "/about-us.html",         destination: "/about",            permanent: true },
      { source: "/contact.html",          destination: "/contact",          permanent: true },
      { source: "/protocol.html",         destination: "/protocol",         permanent: true },
      { source: "/case-studies.html",     destination: "/case-studies",     permanent: true },
      { source: "/security.html",         destination: "/compliance-shield",permanent: true },
      { source: "/regional-advantage.html", destination: "/regional",       permanent: true },
      { source: "/careers.html",          destination: "/careers",          permanent: true },
      { source: "/blog.html",             destination: "/insights",         permanent: true },

      // === German variants — these only fire on niogod.com host ===
      // Implemented as host-specific in middleware, see below.
    ];
  },
};
```

Domain-specific redirects (niogod.com/de/* → niogod.de/*) live in `middleware.ts`:

```ts
// middleware.ts (excerpt)
export function middleware(req: NextRequest) {
  const { hostname, pathname } = new URL(req.url);
  if (hostname === "niogod.com" && pathname.startsWith("/de/")) {
    const map: Record<string, string> = {
      "/de/index.html": "/",
      "/de/about-us.html": "/ueber-uns",
      "/de/contact.html": "/kontakt",
      "/de/protocol.html": "/protokoll",
      "/de/case-studies.html": "/dossiers",
      "/de/security.html": "/compliance-shield",
      "/de/regional-advantage.html": "/regional",
      "/de/careers.html": "/karriere",
      "/de/blog.html": "/insights",
    };
    const target = map[pathname] ?? "/";
    return NextResponse.redirect(`https://www.niogod.de${target}`, 301);
  }
  // ... rest of middleware
}
```

## 410 Gone implementation

Next.js doesn't ship a first-class 410 helper. Implementation: a catch-all route at `src/app/[locale]/410/page.tsx` rendering a sober 410 page with a `Link` header and explicit `notFound()` semantics; the `next.config.mjs` `headers()` block sets the status code via a custom server response in the layout.

For the production deploy, the simplest reliable path is to put the 410-list in **Cloudflare Workers** at the edge — these requests never reach Next.js. Pseudo:

```js
// cloudflare worker (excerpt)
const GONE_PATHS = new Set([
  "/legal.html", "/newsletter.html",
  "/blog-async-work.html", "/blog-deeptech-guide.html",
  "/blog-eor-future.html", "/blog-sap-talent-gap.html", "/blog-time-to-code.html",
  "/cpp-linux-dev.html", "/legal-consultant.html", "/ml-autonomous.html", "/visual-slam.html",
  "/de/legal.html", "/de/newsletter.html",
  // ... + de/blog-*.html
]);

export default {
  async fetch(req, env) {
    const u = new URL(req.url);
    if (GONE_PATHS.has(u.pathname)) {
      return new Response(GONE_HTML, {
        status: 410,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Link": '</impressum>; rel="successor-version"',
          "Cache-Control": "public, max-age=3600",
        },
      });
    }
    return fetch(req);
  },
};
```

`GONE_HTML` is a minimal page consistent with the design system — paper background, mono headline ("410 · Diese Seite wurde dauerhaft entfernt."), link list to the four real legal pages or the homepage as appropriate.

## SEO during cutover

- Submit the new sitemap.xml (per domain) to Search Console **before** flipping DNS, with the new domain set as a property.
- Use Search Console's **Change of Address** tool only if there's a domain swap. niogod.de and niogod.com both already exist — no Change of Address needed; just submit new sitemaps.
- Watch the **Crawl errors** report for 2-3 weeks post-launch; it'll surface any 301 chains or unhandled paths.
- Expect a 4-8 week reindexing window. Some legacy URLs will keep ranking briefly; the 301 carries link equity forward.

## Asset migration

The legacy `assets/` folder may contain images, PDFs, downloadable docs that are still referenced from inbound links (LinkedIn shares, partner sites). Strategy:

- Leave `niogod.com/assets/*` and `niogod.de/assets/*` accessible during the cutover sprint, served by Cloudflare directly from R2 (or whatever object storage holds them).
- **Audit each asset**: any PDF claiming "AÜG-konform" or "EOR Liability Shield" gets purged immediately. Joseph approves each retained PDF.
- Move retained assets to the new repo's `public/artifacts/` with consistent naming.
- After 90 days post-launch, set `niogod.com/assets/*` to 410 Gone.

## Risk during cutover

The single highest-risk surface is **anything in the legacy that asserts current AÜG-conformance**. Even 30 minutes of those claims being live on a 301 chain (because cache is still serving the legacy HTML from the previous CDN) could be cited in a complaint. Mitigation:

- **Purge legacy CDN cache aggressively** the moment DNS flips — both Cloudflare and any prior CDN.
- **Audit the legacy HTML files now** (in Sprint 0 or Sprint 1) and edit out any AÜG-conformance claim. If the legacy site stays live during the rebuild, it should already be honest about Werkvertrag-interim posture.
- Keep a one-liner statement on the legacy homepage during the build period: *"Wir überarbeiten gerade unsere Compliance-Posture. Detaillierte Roadmap auf der neuen Seite ab [Datum]."*

## Timeline

The legacy migration work is **two sprint-days max**:

- **Sprint 4, Day 1:** legacy audit (Joseph + reviewer). Purge claims from any retained content.
- **Sprint 4, Day 2:** redirect rules implemented in `next.config.mjs` + `middleware.ts` + Cloudflare Worker; tested against staging.
- **Sprint 5, Day 1:** DNS cutover; Cloudflare cache purge; live verification with `curl -IL` against every redirected path.
- **Sprint 5, Day 2:** Search Console sitemap submission; monitoring the crawl-error report.

After cutover, the legacy filesystem in `/Desktop/niogod_new/*.html` is no longer the production source. Archive it under `/Desktop/niogod_new/_legacy_archive/` or similar — keep a copy for reference, but do not edit it as if it were live.
