# 01 — Repo layout

Single Next.js 15 App Router repo, two domains served from one deployment, locale-prefixed routing with hreflang per §9.2.

## Top-level tree

```
niogod-web/
├── README.md
├── LICENSE                          # proprietary, all rights reserved
├── .gitignore
├── .editorconfig
├── .env.example                     # documented env vars only; no secrets
├── .nvmrc                           # node 20 LTS
├── package.json
├── pnpm-lock.yaml                   # pnpm, not npm or yarn
├── tsconfig.json                    # strict: true, noUncheckedIndexedAccess: true
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── biome.json                       # lint+format (not ESLint+Prettier)
├── playwright.config.ts             # E2E + a11y tests
├── vitest.config.ts                 # unit tests
│
├── public/
│   ├── fonts/                       # self-hosted woff2, subset Latin Extended
│   │   ├── soehne-breit/            # display
│   │   ├── inter-tight/             # body
│   │   └── berkeley-mono/           # mono — license required, see file 02
│   ├── icons/                       # custom SVG icon set (or empty per §6.3)
│   ├── artifacts/                   # PDFs: AVV, AÜG-Erlaubnis scan, ISO 27001 cert
│   │   └── README.md                # what goes here, naming convention
│   ├── og/                          # Open Graph images (per page, generated)
│   ├── robots.txt
│   └── sitemap.xml                  # generated at build via next-sitemap
│
├── content/
│   ├── insights/
│   │   ├── de/
│   │   │   ├── aug-vs-werkvertrag-entscheidungsbaum.mdx
│   │   │   ├── scheinselbstaendigkeit-fuenf-fehler.mdx
│   │   │   ├── dsgvo-indien-sccs-tia.mdx
│   │   │   ├── vergleich-hays-senacor-adesso.mdx
│   │   │   ├── vergleich-deel-remote-oyster.mdx
│   │   │   └── tco-modell-inhouse-vs-pod.mdx
│   │   └── en/
│   │       └── (parallel files)
│   ├── dossiers/
│   │   ├── de/
│   │   │   ├── 2026-Q1-fintech-stuttgart.mdx
│   │   │   └── 2026-Q1-saas-muenchen.mdx
│   │   └── en/
│   ├── jobs/                        # JobPosting schema source
│   │   └── (one file per role)
│   └── legal/
│       ├── de/
│       │   ├── impressum.mdx
│       │   ├── datenschutz.mdx
│       │   ├── agb.mdx
│       │   └── barrierefreiheit.mdx
│       └── en/
│
├── config/
│   ├── status.json                  # the §5.6 live status strip
│   ├── certifiers.json              # footer trust band (logos + text)
│   ├── subprocessors.json           # Auftragsverarbeiter-Liste, rendered live
│   ├── pricing.json                 # the three bands
│   ├── pods.json                    # role definitions, composition matrix
│   └── nav.json                     # primary nav, both locales
│
├── design/
│   ├── tokens.json                  # the file from 03 of the handoff
│   ├── README.md                    # how Tailwind reads tokens
│   └── figma-export/                # Sprint 1 deliverable
│
├── src/
│   ├── app/
│   │   ├── [locale]/                # 'de' | 'en'
│   │   │   ├── layout.tsx           # locale-aware root, hreflang
│   │   │   ├── page.tsx             # homepage
│   │   │   ├── protokoll/page.tsx   # de
│   │   │   ├── protocol/page.tsx    # en (same component, locale-routed)
│   │   │   ├── compliance-shield/page.tsx
│   │   │   ├── pods/page.tsx
│   │   │   ├── preise/page.tsx      # de
│   │   │   ├── pricing/page.tsx     # en
│   │   │   ├── dossiers/page.tsx
│   │   │   ├── dossiers/[slug]/page.tsx
│   │   │   ├── case-studies/page.tsx
│   │   │   ├── case-studies/[slug]/page.tsx
│   │   │   ├── insights/page.tsx
│   │   │   ├── insights/[slug]/page.tsx
│   │   │   ├── regional/page.tsx
│   │   │   ├── ueber-uns/page.tsx   # de
│   │   │   ├── about/page.tsx       # en
│   │   │   ├── karriere/page.tsx    # de
│   │   │   ├── careers/page.tsx     # en
│   │   │   ├── kontakt/page.tsx     # de
│   │   │   ├── contact/page.tsx     # en
│   │   │   ├── impressum/page.tsx
│   │   │   ├── imprint/page.tsx
│   │   │   ├── datenschutz/page.tsx
│   │   │   ├── privacy/page.tsx
│   │   │   ├── agb/page.tsx
│   │   │   ├── terms/page.tsx
│   │   │   ├── barrierefreiheit/page.tsx
│   │   │   └── accessibility/page.tsx
│   │   ├── api/
│   │   │   ├── contact/route.ts     # form handler → EU email service
│   │   │   └── consent/route.ts     # Klaro consent log (1st party)
│   │   ├── robots.ts                # generates robots.txt
│   │   ├── sitemap.ts               # generates sitemap.xml per domain
│   │   ├── manifest.ts              # PWA-style web manifest
│   │   └── icon.tsx                 # favicon (SVG, niogod wordmark)
│   │
│   ├── components/
│   │   ├── primitives/              # Token-mapped atoms — see file 04
│   │   ├── patterns/                # Composed patterns — see file 04
│   │   ├── page-sections/           # Top-level sections per page
│   │   └── system/                  # Layout, Nav, Footer, StatusStrip
│   │
│   ├── lib/
│   │   ├── i18n/                    # locale negotiation, hreflang map
│   │   │   ├── locales.ts
│   │   │   ├── messages/
│   │   │   │   ├── de.ts
│   │   │   │   └── en.ts
│   │   │   └── route-map.ts         # 'protokoll' ↔ 'protocol'
│   │   ├── mdx/                     # MDX compile, frontmatter parsing
│   │   ├── schema/                  # JSON-LD generators per type
│   │   ├── consent/                 # Klaro adapter
│   │   └── analytics/               # Plausible wrapper
│   │
│   ├── styles/
│   │   ├── globals.css              # Tailwind base + token CSS variables
│   │   └── fonts.css                # @font-face declarations
│   │
│   └── types/
│       └── content.ts               # TypeScript types for MDX frontmatter
│
├── tests/
│   ├── e2e/                         # Playwright
│   │   ├── consent-blocks-trackers.spec.ts   # critical, see §10.5
│   │   ├── hreflang.spec.ts
│   │   ├── keyboard-nav.spec.ts
│   │   └── lighthouse-budgets.spec.ts
│   ├── a11y/                        # axe-core
│   │   └── pages.spec.ts
│   └── unit/                        # vitest
│       └── lib/
│
└── .github/
    └── workflows/
        ├── ci.yml                   # type-check, lint, test, build
        ├── lighthouse.yml           # Lighthouse CI on PR preview
        └── deploy.yml               # branch → preview, main → production
```

## DE/EN routing convention

Two patterns were considered:

**A. Pure locale prefix** — `/de/protokoll`, `/en/protocol`. Single domain.
**B. Locale + per-locale slug** — `niogod.de/protokoll`, `niogod.com/protocol`. Two domains.

The brief mandates **B** (§3.6, §9.2). Implementation:

- One Next.js deployment, two `Domain` configurations on the host (Vercel domains or Hetzner reverse-proxy SNI).
- A middleware (`middleware.ts`) inspects `request.headers.get('host')` and rewrites to `/de/...` or `/en/...` internally. The user-visible URL stays `niogod.de/protokoll` — never exposes the locale prefix.
- `route-map.ts` is the single source of truth for slug pairs:
  ```ts
  export const routeMap = {
    de: { protokoll: 'protokoll', preise: 'preise', /* ... */ },
    en: { protokoll: 'protocol',  preise: 'pricing',  /* ... */ },
  } as const;
  ```
- Hreflang `<link>` tags in the locale layout reference the *paired* slug per the map. Validated in `tests/e2e/hreflang.spec.ts`.

## Why pnpm

Lockfile determinism, smaller node_modules via content-addressable store, faster CI cold builds. Lock to a single package manager via `packageManager` field in `package.json` and `engines.pnpm`.

## Why Biome over ESLint + Prettier

One binary, one config, faster, fewer plugin compatibility headaches in 2026. The brief's tech spec is opinionated about EU hosting and EU data plane but agnostic about lint tooling — choose the tool that ships fastest. Optional swap-out documented for the team that prefers ESLint.

## Naming

- Files: `kebab-case.tsx` for routes and components; `kebab-case.ts` for utilities.
- React components: `PascalCase` named exports; default exports only on route files.
- CSS variables: `--niogod-` prefix (e.g., `--niogod-paper`, `--niogod-ink`, `--niogod-sovereign-red`) to avoid collision with reset libraries.
- Test files: `*.spec.ts` for E2E + a11y, `*.test.ts` for unit.
- MDX slugs: lowercase, hyphenated, German for DE files, English for EN files. Slug pair tracked in `route-map.ts`.
- Branches: `feat/`, `fix/`, `chore/`, `legal/` prefixes. `legal/` PRs require DSB sign-off label before merge.
