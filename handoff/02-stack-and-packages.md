# 02 — Stack and packages

Every dependency, why it's here, and what it costs. Sorted by criticality.

## Hosting decision: Vercel Frankfurt vs. Hetzner Falkenstein + Cloudflare

The brief permits either (§9.1). Recommendation: **Hetzner (Falkenstein, DE) + Cloudflare**.

**Why not Vercel.** Vercel's control plane is US-based (Vercel Inc., 340 S Lemon Ave, Walnut, CA). Even with Frankfurt edge regions, the operational metadata of the deployment — build logs, deployment metadata, account data, billing — flows through US infrastructure and is subject to US legal process (FISA §702, CLOUD Act). For a site whose entire commercial argument is "deutsche Haftung, deutsche Rechtssicherheit", running on Vercel is a marketing contradiction a competent procurement lead at a German Mittelstand client will spot during the security questionnaire.

**Why Hetzner.** German company (Hetzner Online GmbH, Gunzenhausen), GDPR-native, ISO 27001 certified, Falkenstein and Nuremberg datacenters, BSI-grundschutz aligned. Cheaper per-CPU than Vercel by ~5×. Trade-off: no edge functions, no automatic preview deploys — both are solved by adding **Cloudflare** in front (EU plan, EU data residency commitment in the contract).

**The setup.**

| Layer | Service | Region | Role |
|---|---|---|---|
| DNS + WAF + CDN | Cloudflare (EU plan) | EU | TLS termination, DDoS, edge cache |
| Compute | Hetzner Cloud CX22 ×2 | Falkenstein, DE | Next.js node runtime behind nginx |
| Object storage | Hetzner Object Storage | Falkenstein, DE | PDFs in `public/artifacts/` |
| Email + form delivery | Plunk (self-hosted on Hetzner) **or** Resend (EU plan) | EU | Contact form, alerts |
| Logs + metrics | Grafana Cloud (EU) **or** self-hosted Loki/Prometheus | EU | Build + runtime observability |
| Analytics | Plausible (EU-hosted, plausible.io EU plan) | DE | Aggregate, no consent required |

**Decision log.** Document this in the repo (`docs/adr/0001-hosting.md`) so a future engineer can read the reasoning, not relitigate the question.

If the team strongly prefers Vercel for DX, the fallback is **Vercel + Frankfurt region pinning + a Vercel DPA in place** — this is acceptable but weaker, and the marketing contradiction stands.

## Runtime stack

| Package | Version pin | Why |
|---|---|---|
| `next` | `15.2.x` | App Router, RSC, partial prerendering for the homepage hero |
| `react`, `react-dom` | `19.x` | Stable as of Q1 2026, RSC-native |
| `typescript` | `5.6.x` | `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` |
| `tailwindcss` | `4.x` | Native CSS variables, no PostCSS gymnastics, smaller runtime |
| `@tailwindcss/typography` | latest | Only for `.prose` on `/insights` and `/dossiers` MDX |

## Content / MDX

| Package | Version pin | Why |
|---|---|---|
| `@next/mdx` | matched to next | First-party MDX pipeline |
| `next-mdx-remote-client` | `2.x` | Async-component-friendly MDX rendering inside RSC |
| `gray-matter` | latest | Frontmatter parser for dossiers + insights |
| `rehype-slug`, `rehype-autolink-headings` | latest | Anchored headings for long-form content |
| `remark-gfm` | latest | Tables, footnotes, GFM features needed for AÜG/§-citations |
| `shiki` | latest | Code highlighting (any technical posts on /insights) |
| `zod` | `3.x` | Runtime validation of frontmatter against schema (file 06) |

## i18n

No `next-intl` or `react-i18next`. Reasons:

- The site has two locales, ~20 routes, and no plurals or dates that need ICU. The framework is overkill.
- Custom `route-map.ts` (file 01) + `messages/{de,en}.ts` is ~150 LOC total.
- Avoids the runtime cost of an i18n library on every RSC render.

If the content team grows beyond two locales, swap to `next-intl`. Document the seam.

## Forms + email

| Package | Version pin | Why |
|---|---|---|
| `react-hook-form` | `7.x` | Single-form-at-a-time site, RHF is overkill but cheap; alternative is plain controlled inputs |
| `zod` | `3.x` | Form schema (already pinned for MDX) |
| `resend` (Node SDK) | latest | Transactional email; EU data plane configured in dashboard |

The contact form's API route lives at `src/app/api/contact/route.ts`. It validates with Zod, rate-limits via Cloudflare Turnstile (EU plan), then delivers via Resend. **Never** send the form payload to a US-routed serverless function or to a US-based form service (Formspree, Basin, Netlify Forms — all out).

## Consent + analytics

| Package | Version pin | Why |
|---|---|---|
| `klaro` | `0.7.x` | Open-source, self-hostable, DSGVO-mature, German-default UI strings, supports the §8.5 button order |
| `plausible-tracker` | latest | EU-hosted, no consent required for aggregate, ~1KB |

**Klaro config** lives at `src/lib/consent/klaro.config.ts`. The config defines services in three groups:

1. **Strictly necessary** — Cloudflare Turnstile, session id. No opt-in needed.
2. **Statistics** — Plausible (off by default, opt-in toggle).
3. **Marketing** — Meta Pixel, LinkedIn Insight Tag (off by default, opt-in toggle, **never injected before consent**).

The `<head>` does not include any third-party `<script>` tag. Klaro injects only after `accept` for the relevant group. Verified in `tests/e2e/consent-blocks-trackers.spec.ts`.

## Schema.org / structured data

No third-party library. Generate JSON-LD from typed builders in `src/lib/schema/`. Types: `Organization`, `Service` (with `serviceType: "Arbeitnehmerüberlassung"`), `BreadcrumbList`, `FAQPage`, `JobPosting`, `Person` (founder). Validated against schema.org definitions via Zod.

## Sitemaps + robots

| Package | Version pin | Why |
|---|---|---|
| `next-sitemap` | latest | Generates per-domain sitemaps with locale awareness |

Per-domain robots.txt and sitemap.xml are emitted at build. The `niogod.de/sitemap.xml` references DE URLs only; `niogod.com/sitemap.xml` references EN URLs only. Hreflang lives in `<head>`, not in sitemaps (sitemap-level hreflang is supported but redundant when `<head>` carries it).

## Testing

| Package | Version pin | Why |
|---|---|---|
| `vitest` | latest | Unit; faster than Jest, ESM-native |
| `@playwright/test` | latest | E2E + Lighthouse + a11y; the consent blocking test (§10.5) and Lighthouse budget enforcement live here |
| `@axe-core/playwright` | latest | Wired into Playwright a11y suite |
| `lighthouse-ci` (`@lhci/cli`) | latest | Budget enforcement on PR preview |

## Tooling

| Package | Version pin | Why |
|---|---|---|
| `@biomejs/biome` | `1.9.x` | Lint + format, single binary |
| `husky` + `lint-staged` | latest | Pre-commit hook: lint, type-check, test affected |
| `commitlint` | latest | Conventional commits; required for the `legal/` prefix gate |

## Fonts

Fonts are not npm packages — they are licensed and self-hosted under `public/fonts/`. Three families:

| Family | Use | License |
|---|---|---|
| **Söhne Breit** (Klim Type) | Display, H1/H2, all-caps | Commercial, ~€600 web license. Alternative: **GT America Condensed** (~€800), **Aktiv Grotesk Cd** (~€500). All commercial. |
| **Inter Tight** (Rasmus Andersson) | Body, UI | OFL, free |
| **Berkeley Mono** (Berkeley Graphics) | Mono — every identifier, status string | Commercial, ~$75 personal / $400 commercial web. Alternative: **JetBrains Mono** (OFL, free) — slightly less institutional but acceptable. |

Subset to Latin Extended at build via `glyphhanger` (one-time CLI) and emit `woff2` only. `@font-face` declarations in `src/styles/fonts.css`. `font-display: swap`. Preload only Söhne Breit (display) and Inter Tight regular — mono is not on the critical render path.

If budget is tight at launch, ship **Inter Tight (free) + Inter Tight as display weight + JetBrains Mono (free)**. Visually thinner than Söhne Breit but defensible. Upgrade to Söhne Breit in Sprint 2 once the brand is funded — the swap is one CSS variable change.

## What is *not* in the dependency list

- **No** `shadcn/ui` — explicitly forbidden by §9.1 ("no off-the-shelf UI kit").
- **No** Headless UI, Radix UI primitives, Reach UI. The site has ~10 interactive primitives total; hand-roll them with proper ARIA. The brand's institutional voice is not served by visible Radix-shaped buttons.
- **No** Framer Motion, GSAP, Lottie. §6.6 forbids motion.
- **No** Sanity, Contentful, Strapi, Hygraph. MDX in-repo is the CMS; review happens via PR. If the content team needs a GUI later, evaluate **Outstatic** or **Keystatic** (both EU-friendly, MDX-on-disk).
- **No** HubSpot, Marketo, Pardot, Segment. Forbidden by §9.1 on the .de site.
- **No** Sentry US plan — if error tracking is needed, use **Sentry EU** (Frankfurt) or self-host **GlitchTip** on Hetzner.

## Approximate annual run-rate

| Line item | EUR/year |
|---|---|
| Hetzner Cloud (2× CX22 + load balancer + storage) | ~360 |
| Cloudflare EU plan | ~240 |
| Resend EU (or Plunk self-hosted on Hetzner: 0) | ~240 |
| Plausible EU (10k plan) | ~110 |
| Söhne Breit web license (one-time, amortized) | ~150 |
| Berkeley Mono commercial web (one-time, amortized) | ~80 |
| Cloudflare Turnstile | 0 |
| **Subtotal — infra + tooling** | **~1,180** |
| ISO 27001 audit (annual, see file 07) | 8,000–18,000 |
| Berufshaftpflichtversicherung (see file 07) | 1,500–4,500 |
| DSB external retainer (see file 07) | 2,400–6,000 |
| German entity (Steuerberater + Anwalt overhead) | 4,000–8,000 |

Infra is cheap. Trust artifacts dominate. File 07 sequences them.
