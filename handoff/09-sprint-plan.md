# 09 — Sprint plan

The website rebuild and the artifact procurement (file 07) interlock. This file sequences both as one timeline. Dates assume kickoff Monday 2026-05-04.

Fortnightly sprints, two-track structure: **Engineering track** (one Next.js engineer + part-time designer) and **Procurement track** (Joseph + retained advisors).

## Sprint 0 — Setup (now → 2026-05-17)

**Goal:** repo lives, hosting decided, advisors retained.

### Engineering track
- [ ] Repo initialized at `niogod-web/` (file 01 layout)
- [ ] pnpm + Next.js 15 + TypeScript strict scaffolded
- [ ] Tailwind 4 + token build script (`design/tokens.json` → `src/styles/tokens.css`)
- [ ] Hetzner + Cloudflare account provisioned; staging subdomain `staging.niogod.de` resolving
- [ ] CI scaffold (typecheck, lint, build) on GitHub Actions
- [ ] First three primitives shipped: `<Text>`, `<Heading>`, `<Mono>`

### Procurement track
- [ ] Anwalt für Arbeitsrecht (AÜG-spec) retained — first call on UG founding + AÜG-Antrag prep
- [ ] DSB (external) retained on monthly retainer
- [ ] Notar appointment booked for UG founding
- [ ] Steuerberater retained
- [ ] Hetzner + Cloudflare DPAs signed and filed in `legal/dpas/`
- [ ] Decide font procurement (Söhne Breit + Berkeley Mono, or Inter Tight + JetBrains Mono interim)

**Sprint 0 demo:** repo cloned, `pnpm dev` runs, three primitives visible at `localhost:3000/_dev`. Two retainers signed.

## Sprint 1 — Foundation (2026-05-18 → 2026-05-31)

**Goal:** the §12 first-week-deliverable order, expanded into a sprint.

### Engineering
- [ ] Remaining primitives + system chrome (`<StatusStrip>`, `<NavBar>`, `<Footer>`, `<RootLayout>`)
- [ ] DE/EN routing via locale-prefix middleware + `route-map.ts`
- [ ] `<MonoIdentifier>`, `<StatusToken>`, `<Status>` patterns
- [ ] Klaro consent integration; the `tests/e2e/consent-blocks-trackers.spec.ts` test must pass
- [ ] Security headers configured at Cloudflare + verified
- [ ] Hreflang `<Hreflang>` utility + `tests/e2e/hreflang.spec.ts`
- [ ] Self-hosted fonts pipeline (subset, woff2, preload critical)
- [ ] `/impressum`, `/datenschutz`, `/agb`, `/barrierefreiheit` route shells (waiting on legal text)

### Content
- [ ] Joseph populates `config/status.json` with current honest status
- [ ] Joseph populates `config/subprocessors.json` (Auftragsverarbeiter-Liste — easy artifact win)
- [ ] Three Encryption / Incident-Response / Access-Control policies drafted as one-pagers

### Procurement
- [ ] UG founding submitted to Notar; HRB filing in flight
- [ ] DSB begins AVV review (template arrives ~Sprint 3)
- [ ] Insurance broker engaged for Berufshaftpflicht quotes
- [ ] First Anwalt session: AÜG-Erlaubnis-Antrag prerequisites checklist drawn up

**Sprint 1 demo:** staging.niogod.de homepage renders with interim hero variant, status strip live, footer Impressum-summary stub. Klaro test passes.

## Sprint 2 — Pages and patterns (2026-06-01 → 2026-06-14)

### Engineering
- [ ] `<HeroPanel>` both variants
- [ ] `<TriangleSchematic>` SVG
- [ ] `<EinsatzTimeline>` SVG
- [ ] `<ResidencyMap>` SVG
- [ ] `<RoleCard>`, `<TrustBand>`, `<KeyValueTable>`, `<ArtifactRow>`, `<DossierHeader>` patterns
- [ ] `/protokoll`, `/pods`, `/regional` page sections wired
- [ ] `<CalculatorTCO>` with placeholder source citation
- [ ] `<ContactForm>` + EU API route + Resend EU integration

### Content
- [ ] `/protokoll` page intro paragraph
- [ ] `/pods` role copy + composition matrix Joseph signoff
- [ ] `/regional` Stuttgart liaison address (real, even if temporary co-working)
- [ ] First two `/insights` MDX drafts: "AÜG vs. Werkvertrag" and "Scheinselbständigkeit fünf Fehler"

### Procurement
- [ ] HRB ideally lands; UG live
- [ ] Bank account opening
- [ ] Berufshaftpflicht quotes received, choose insurer
- [ ] DSB drafts AVV template

**Sprint 2 demo:** all v1 pages exist (most as content-light shells), homepage + /protokoll + /pods are real, the legal pages are still waiting on counsel.

## Sprint 3 — Compliance Shield + content (2026-06-15 → 2026-06-28)

### Engineering
- [ ] `/compliance-shield` page with three columns × ~6 `<ArtifactRow>` each
- [ ] `<NavTabs>` for the three columns
- [ ] MDX pipeline + Zod schemas wired up
- [ ] `<DossierIndex>`, `<DossierTemplate>` for `/dossiers`
- [ ] `<InsightsIndex>` and individual insight rendering with prose typography
- [ ] JSON-LD generators for Organization, Service, BreadcrumbList, FAQPage, Person
- [ ] `<JobPosting>` schema + JobPosting MDX flow

### Content
- [ ] `/about` page with mandate + interim entity disclosures
- [ ] B&W founder portrait shoot booked + delivered
- [ ] First `/insights` post legal-reviewed and published
- [ ] Two more `/insights` drafts: "DSGVO + Indien", "TCO model"
- [ ] Lawyer drafts initial Impressum + AGB
- [ ] DSB drafts initial Datenschutzerklärung

### Procurement
- [ ] AVV template DSB-reviewed and published
- [ ] Berufshaftpflicht in force; Compliance Shield row activates
- [ ] Pen-test vendor selected; first test scheduled
- [ ] First Erlaubnis-Antrag prerequisites being assembled (financial capacity proof, CV of Geschäftsführer, etc.)

**Sprint 3 demo:** `/compliance-shield` is the real thing — every artifact row honest, several already linkable. The site starts to feel institutional.

## Sprint 4 — Pricing, dossiers, polish (2026-06-29 → 2026-07-12)

### Engineering
- [ ] `/preise` with three pricing bands
- [ ] `/dossiers` with empty state OR first dossier if available
- [ ] `/karriere` with first 1-2 JobPosting MDX
- [ ] Lighthouse + axe + WPT cleanup until budgets pass
- [ ] OG image generation (one per page)
- [ ] sitemap.xml + robots.txt finalized per domain
- [ ] Manual a11y review — keyboard, screen reader on /protokoll and /compliance-shield
- [ ] Pre-launch verification ritual (file 08) trial run on staging

### Content
- [ ] Pricing band ranges signed off by Joseph + Steuerberater USt-language review
- [ ] First `/dossier` if any client release came in
- [ ] BITV 2.0 accessibility statement drafted
- [ ] All legal pages (Impressum, Datenschutz, AGB, Barrierefreiheit) DSB- and Anwalt-reviewed and published

### Procurement
- [ ] AÜG-Erlaubnis-Antrag filed (target: end of Sprint 4)
- [ ] First pen-test executed; report received
- [ ] ISMS scoping for ISO 27001 begins
- [ ] First two anonymized client releases pursued

**Sprint 4 demo:** v1.0 launch-ready content review.

## Sprint 5 — Launch (2026-07-13 → 2026-07-26)

### Engineering
- [ ] Full §10 Definition of Done verification (file 08)
- [ ] German B2B procurement reviewer plausibility check (paid CTO consult, 2-3 hours)
- [ ] Production cutover: DNS, SSL, monitoring, alerting
- [ ] Search Console properties claimed (DE + EN), sitemaps submitted
- [ ] Bing Webmaster equivalent
- [ ] Plausible production tracking confirmed

### Procurement
- [ ] Roadmap statement on Compliance Shield reflects what's pending and ETAs

**Launch:** week of 2026-07-21.

This puts the **honest interim site** live ~12 weeks from kickoff, which is right for the workload and the procurement pace. Earlier launches mean either skipping the legal review (illegal under DSGVO + TMG) or shipping weaker content.

## Sprint 6 onward — Iteration to v1.0-AÜG

After launch the site enters a "rolling artifact integration" phase. Sprints become 2-week cadences focused on content + artifact swap-ins:

| Sprint | Approx. dates | Focus |
|---|---|---|
| Sprint 6-7 | 2026-08 → 2026-09 | First 2 dossiers ship, three more insight posts, ISO 27001 audit Stage 1 |
| Sprint 8-9 | 2026-10 → 2026-11 | Compliance Shield gets ISO roadmap PDF, pen-test cadence statement, second dossier batch |
| Sprint 10-11 | 2026-12 → 2027-01 | Engineering: search on /insights, RSS feed; Content: TCO comparison page |
| Sprint 12+ | 2027-02 onward | AÜG-Erlaubnis expected to land — **the v1.0-AÜG cutover sprint**: hero variant flips, value props swap to §8.2 verbatim, footer Erlaubnis-Nr. activates, /pricing AÜG-band footnote updates, Compliance Shield AÜG row goes evergreen, status strip token flips green, social media announcement. |

## v1.0-AÜG cutover ritual

Treat the Erlaubnis grant as a **release event**, not just a config edit. The day the Erlaubnis lands:

1. **Verify the document.** Erlaubnis-Nr., issuing date, validity period, Geschäftsführer named, scope of permitted activity. File the original in `legal/aug/`.
2. **Update `config/status.json`** — flip the AÜG token from amber `Antrag eingereicht` to evergreen `aktiv` with the Erlaubnis-Nr. as `value`.
3. **Update `config/featureFlags.json`** — set `homepage.heroVariant` from `werkvertrag-interim` to `aug`.
4. **Push the AVV-Vorlage update** if it changes (most do, to reference the Erlaubnis-Nr.).
5. **Update `/protokoll`** stage 3-5 §-citations from BGB §631 → §1 AÜG.
6. **Update `/about`** mandate paragraph from interim → §8.6 verbatim.
7. **Update `/preise`** footnotes to reflect AÜG-Gebühren in the cost composition.
8. **Push to staging, run the full §10 DoD ritual.** Specifically: every "v1.0-AÜG" column in file 08 gets verified before the deploy.
9. **Deploy to production.**
10. **Press release / LinkedIn announcement** with Erlaubnis-Nr. cited. The brand can finally make the §8.1 hero claim with backing.

This sequence is run once. The brief's voice — "Institutionalisierte Remote-Entwicklung. Nach deutschem Recht." — is finally true.

## Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| AÜG-Erlaubnis denied or delayed beyond 12 months | Medium | Stay in Werkvertrag posture indefinitely; the site still works. Revisit positioning if denial reasoning indicates niogod cannot meet §3 AÜG fiscal requirements. |
| ISO 27001 audit takes longer than 14 months | Medium | Compliance Shield ISO row stays as "audit in progress" with Stage 1/2 dates. No site claim depends on certificate beyond the footer logo. |
| Client release for first dossier never materializes | High | Dossiers index can stay empty for v1.0. The Compliance Shield page carries more institutional weight than a thin dossiers section. |
| Lawyer/DSB churn during the project | Low | Retain via firm, not individual. Document everything in the repo's `legal/` folder so a successor advisor can pick up. |
| Content track falls behind engineering | High | Engineering shouldn't outrun content. Pad sprint 3-4 if needed. A finished site with empty `/insights` is worse than a delayed launch. |
| Launching before Datenschutz is DSB-signed | Medium | Hard gate. The pre-launch ritual blocks. No exceptions. |
| Bundesagentur für Arbeit asks for additional documentation mid-Antrag | High | Build in a 4-week buffer in the M9-12 window. Common occurrence. |

## What slips first if pressed

If pressure forces a cut between launching faster vs. launching well, cut **content scope**, not **infrastructure scope**. Specifically:

- **Cuttable:** /insights (launch with 2 instead of 6), /dossiers (launch empty), /careers (launch with 1 role), pricing band footnotes (terser).
- **Not cuttable:** legal pages, security headers, consent blocking, hreflang, status strip honesty, accessibility, performance budgets.

A site with thin content but solid foundations will look institutional. A site with rich content but failing accessibility or DSGVO will draw a complaint.
