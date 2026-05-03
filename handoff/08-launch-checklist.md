# 08 — Launch checklist

The brief's §10 Definition of Done, expanded into a per-page checklist with verification commands. A page is **not** shippable until every box on its column is checked.

The interim posture (file 00) means **the AÜG checks are different at v1.0 launch** vs. when the Erlaubnis lands. Two columns: "v1.0 launch" (interim, no AÜG) and "v1.0-AÜG" (after Erlaubnis), so the team knows which surfaces convert when.

## Per-page checklist

### Site-wide gates (all pages)

| Check | Verification | v1.0 | v1.0-AÜG |
|---|---|---|---|
| Lighthouse mobile Performance ≥ 90 | `npx lhci autorun --collect.url=https://www.niogod.de/<route>` | ☐ | ☐ |
| Lighthouse mobile Accessibility = 100 | same | ☐ | ☐ |
| Lighthouse mobile Best Practices = 100 | same | ☐ | ☐ |
| Lighthouse mobile SEO = 100 | same | ☐ | ☐ |
| axe-core: 0 violations | Playwright a11y suite (`tests/a11y/pages.spec.ts`) | ☐ | ☐ |
| WebPageTest from Frankfurt 4G: LCP ≤ 2.0s | `webpagetest.org` profile `Frankfurt EC2 - Cable` | ☐ | ☐ |
| WPT INP ≤ 150ms | same | ☐ | ☐ |
| WPT CLS ≤ 0.05 | same | ☐ | ☐ |
| Hreflang validates | Google Search Console > International Targeting | ☐ | ☐ |
| Structured data validates | https://search.google.com/test/rich-results | ☐ | ☐ |
| `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` present | `curl -sI https://www.niogod.de \| grep -i strict` | ☐ | ☐ |
| CSP: no `unsafe-inline` script src; default-src restricts to `'self'` | `curl -sI ... \| grep -i content-security` | ☐ | ☐ |
| `X-Content-Type-Options: nosniff` present | curl | ☐ | ☐ |
| `Referrer-Policy: strict-origin-when-cross-origin` present | curl | ☐ | ☐ |
| `Permissions-Policy` blocks geolocation, camera, microphone, interest-cohort | curl | ☐ | ☐ |
| Cookie banner: "Alle ablehnen" present and visually equivalent | manual | ☐ | ☐ |
| Withholding consent → 0 third-party requests | `tests/e2e/consent-blocks-trackers.spec.ts` (see test below) | ☐ | ☐ |
| `prefers-reduced-motion: reduce` honored everywhere | manual | ☐ | ☐ |
| Keyboard nav: every interactive element reachable, focus ring visible | `tests/e2e/keyboard-nav.spec.ts` | ☐ | ☐ |
| Color contrast ≥ 4.5:1 body, ≥ 3:1 large headings | axe-core + manual sample | ☐ | ☐ |
| Self-hosted fonts; no third-party font CDN | `curl -sI` then `grep`-for `fonts.googleapis.com` returns empty | ☐ | ☐ |
| `niogod™` glyph in page `<title>` (first character or after a domain prefix) | manual + `tests/unit/title-format.test.ts` | ☐ | ☐ |
| `niogod.de` does **not** 301 to `.com` | `curl -I https://www.niogod.de` returns 200 | ☐ | ☐ |
| `niogod.de/legal.html` returns 410 Gone | `curl -I` | ☐ | ☐ |
| German Datenschutzbeauftragter signoff on the privacy posture | written signoff, archived | ☐ | ☐ |
| German B2B procurement reviewer (CTO/VPE) plausibility check | written signoff, archived | ☐ | ☐ |

### `/` Homepage

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Hero variant matches deployment phase (`werkvertrag-interim` at v1.0; `aug` at v1.0-AÜG) | ☐ | ☐ |
| Status strip tokens reflect current `config/status.json` truthfully | ☐ | ☐ |
| Trust band: interim line **or** ≥ 4 client/certifier marks | ☐ | ☐ |
| Calculator footnote cites a public source with date | ☐ | ☐ |
| All three value props match current artifact reality (no "konform" claims unbacked) | ☐ | ☐ |
| Compliance Shield preview tiles link to actual Compliance Shield rows that exist | ☐ | ☐ |
| Dossier preview pair: hidden if 0 dossiers; shown if ≥ 2 | ☐ | ☐ |

### `/protokoll` and `/protocol`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Each stage has owner, duration, artifact-label, §-basis | ☐ | ☐ |
| Stages 3-5 cite `BGB §631` at v1.0; `§1 AÜG` at v1.0-AÜG | ☐ | ☐ |
| Triangle schematic renders with current Erlaubnis status (gap or active) | ☐ | ☐ |
| `<Service>` JSON-LD with `serviceType` set correctly per phase | ☐ | ☐ |

### `/compliance-shield`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Every artifact row has a status (`active` / `pending` / `gap`) — none unstated | ☐ | ☐ |
| Active rows link to a real downloadable PDF or live policy page | ☐ | ☐ |
| Pending rows show ETA and owner | ☐ | ☐ |
| Gap rows show roadmap statement, not silence | ☐ | ☐ |
| Auftragsverarbeiter-Liste table renders from `config/subprocessors.json` | ☐ | ☐ |
| AVV-Vorlage download serves a DSB-reviewed PDF | (typically ☐ at M3) | ☐ |
| ISO 27001 row links to certificate at v1.0-AÜG (or roadmap PDF at v1.0) | ☐ | ☐ |
| AÜG-Erlaubnis row reflects current state | ☐ | ☐ |

### `/pods`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Three role cards rendered, each with §-basis | ☐ | ☐ |
| Projektleiter §-basis: at v1.0 = "vertraglich gebunden, deutsche Verleiher-Festanstellung in Vorbereitung"; at v1.0-AÜG = "deutsches Arbeitsrecht, Festanstellung beim Verleiher" | ☐ | ☐ |
| Pod composition matrix has plausible numbers signed off by Joseph | ☐ | ☐ |

### `/preise` and `/pricing`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Three bands rendered with €/Monat ranges (no "contact us") | ☐ | ☐ |
| Each band has a footnote covering: what's included, what's excluded, USt-handling | ☐ | ☐ |
| Steuerberater has reviewed USt language | ☐ | ☐ |
| AÜG-Gebühren mentioned only at v1.0-AÜG | ☐ | ☐ |

### `/dossiers` and `/case-studies`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Index page renders empty state if 0 dossiers, or list if ≥ 1 | ☐ | ☐ |
| Each dossier has `releaseSigned: true` in frontmatter (build enforces) | ☐ | ☐ |
| Each dossier has a witnessed quote with attribution | ☐ | ☐ |
| Each dossier renders the procurement-record header table | ☐ | ☐ |

### `/insights`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| At least 3 long-form posts published | ☐ | ☐ |
| Every post that gives legal information has `legalReview.required: true` and a reviewer signoff | ☐ | ☐ |
| Every post has ≥ 1 citation in frontmatter | ☐ | ☐ |
| Hreflang pairs validated via `pairedSlug` | ☐ | ☐ |

### `/regional`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Stuttgart liaison address present (real address, not "to be determined") | ☐ | ☐ |
| Bengaluru hub address from CIN registration | ☐ | ☐ |
| `<ResidencyMap>` renders with current data flow accurately depicted | ☐ | ☐ |
| Working-hours overlap chart correct | ☐ | ☐ |

### `/ueber-uns` and `/about`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| B&W founder portrait present | ☐ | ☐ |
| Mandate paragraph current variant (interim or §8.6 verbatim) | ☐ | ☐ |
| German entity disclosure (HRB + Amtsgericht + USt-IdNr.) — at v1.0 if entity exists, otherwise as roadmap | ☐ | ☐ |
| Indian entity disclosure with CIN | ☐ | ☐ |
| `<Person>` JSON-LD for Joseph | ☐ | ☐ |

### `/karriere` and `/careers`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| At least 1 open role published | ☐ | ☐ |
| Each role has `JobPosting` JSON-LD validating at search.google.com/test/rich-results | ☐ | ☐ |
| `baseSalary` is a real range, not "competitive" | ☐ | ☐ |

### `/kontakt` and `/contact`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Six fields exactly per §7.10 | ☐ | ☐ |
| Submission goes to EU-routed handler (Resend EU or Plunk) | ☐ | ☐ |
| Cloudflare Turnstile gating spam | ☐ | ☐ |
| Microcopy "Erste Rückmeldung binnen 24 Werkstunden, inkl. juristischer Eignungsprüfung" present | ☐ | ☐ |
| Email confirmation sent to submitter (DSGVO-compliant double-opt-in not needed for B2B contact) | ☐ | ☐ |

### `/impressum` and `/imprint`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| §5 TMG complete: name, legal form, registered office, HRB + Amtsgericht, Geschäftsführer, USt-IdNr., contact, regulatory authority | ☐ | ☐ |
| AÜG-Erlaubnisbehörde named (Bundesagentur für Arbeit) — only at v1.0-AÜG | n/a | ☐ |
| EU-Streitschlichtung link present | ☐ | ☐ |
| Reviewed by German lawyer | ☐ | ☐ |

### `/datenschutz` and `/privacy`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| DSGVO Art. 13 complete | ☐ | ☐ |
| Verantwortlicher named | ☐ | ☐ |
| DSB contact present | ☐ | ☐ |
| Processing purposes per page/feature documented | ☐ | ☐ |
| Third-country (India) transfer disclosed with SCCs reference | ☐ | ☐ |
| Retention periods stated | ☐ | ☐ |
| Data-subject rights enumerated | ☐ | ☐ |
| Aufsichtsbehörde named (per Land of Sitz) | ☐ | ☐ |
| Reviewed by DSB | ☐ | ☐ |

### `/agb` and `/terms`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| Drafted by German lawyer, not template-copied | ☐ | ☐ |
| Werkvertrag clauses at v1.0; AÜG clauses added at v1.0-AÜG | ☐ | ☐ |

### `/barrierefreiheit` and `/accessibility`

| Check | v1.0 | v1.0-AÜG |
|---|---|---|
| BITV 2.0 / WCAG 2.2 AA compliance statement | ☐ | ☐ |
| Known limitations listed honestly | ☐ | ☐ |
| Feedback mechanism with response-time commitment | ☐ | ☐ |
| Schlichtungsstelle reference | ☐ | ☐ |

## The consent test in full

`tests/e2e/consent-blocks-trackers.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("withholding consent blocks all third-party trackers", async ({ page, context }) => {
  const thirdPartyHosts = [
    "facebook.com", "facebook.net", "fbcdn.net", "connect.facebook.net",
    "linkedin.com", "ads.linkedin.com", "px.ads.linkedin.com",
    "google-analytics.com", "googletagmanager.com", "doubleclick.net",
    "hotjar.com", "intercom.io", "segment.io",
  ];
  const offending: string[] = [];
  context.on("request", req => {
    const u = new URL(req.url()).hostname;
    if (thirdPartyHosts.some(h => u.endsWith(h))) offending.push(req.url());
  });

  await page.goto("https://www.niogod.de/");
  // Klaro should mount; user does not click "Akzeptieren"
  await page.waitForSelector("[data-klaro-banner]");
  // Simulate "Alle ablehnen"
  await page.click('[data-klaro="decline-all"]');
  // Browse a few pages
  for (const path of ["/protokoll", "/compliance-shield", "/pods", "/preise", "/dossiers", "/insights"]) {
    await page.goto(`https://www.niogod.de${path}`);
  }

  expect(offending, `tracker requests fired without consent: ${offending.join(", ")}`).toEqual([]);
});
```

This single test is the most important pre-launch gate. A failing test means the site cannot ship.

## Pre-launch verification ritual

Run this sequence the day of launch, before flipping DNS:

```bash
# 1. Build
pnpm install --frozen-lockfile
pnpm build

# 2. Typecheck + lint
pnpm typecheck
pnpm lint

# 3. All tests
pnpm test:unit
pnpm test:e2e
pnpm test:a11y

# 4. Lighthouse on every public page
pnpm lhci autorun

# 5. Header + DNS verification (against staging URL)
./scripts/verify-headers.sh https://staging.niogod.de
./scripts/verify-hreflang.sh https://staging.niogod.de https://staging.niogod.com

# 6. Manual: Search Console hreflang report
# 7. Manual: Rich Results test on /, /pods, /karriere
# 8. Manual: legacy /legal.html and similar return 410
```

Only when all green: cut DNS over to production.
