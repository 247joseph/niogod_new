# 04 — Component inventory

Every React component the v1 site needs, grouped by layer, in build order. Each entry: name, location, props summary, dependencies, brief notes. Build top-down (primitives → patterns → page-sections → pages).

The inventory is intentionally small. Institutional sites do not have 80 components.

## Layer 1 — Primitives (`src/components/primitives/`)

Token-mapped atoms. No business logic. ~10 components.

| Component | Props (essentials) | Notes |
|---|---|---|
| `<Text>` | `as`, `size`, `tone`, `family` | Polymorphic body text. Defaults to `<p>` body, `Inter Tight`, ink. |
| `<Heading>` | `level (1–4)`, `tone`, `caps?` | All H1/H2 are `caps` by default; H3/H4 are sentence-case. Wraps `<Text>`. |
| `<Mono>` | `tone`, `weight (regular|medium)` | The institutional signal. Wraps `<span>` with `font-mono` + `tracking-wide`. Used hundreds of times. |
| `<Rule>` | `direction (horizontal|vertical)`, `weight (hairline|rule)` | Hairline `<hr>` or vertical bar. Replaces all visual separators. |
| `<Stack>` | `gap (token)`, `direction`, `align` | Vertical / horizontal flex stack with token-based gap. |
| `<Grid>` | `columns`, `gap`, `align` | 12-col grid wrapper, locked to layout tokens. |
| `<Section>` | `tone (paper|paper-shade|ink)`, `bleed?` | Top-level page section. Applies vertical rhythm (`section-mobile` / `section-desktop` token). |
| `<Container>` | `width (content|prose)` | Max-width wrapper. `content` = 1280px, `prose` = 680px. |
| `<Button>` | `variant (primary|secondary)`, `as ('button'|'a')`, `href?` | Square corners. Two variants only. Primary = ink fill, paper text, sovereign-red border on focus. Secondary = paper fill, ink border. Never animates. |
| `<Link>` | `href`, `external?`, `tone (default|muted)` | Underlined on hover/focus, no decoration at rest. External links get a tiny mono `↗` after the label. |
| `<Status>` | `state (active|pending|gap)`, `label` | The amber/evergreen/red token. Square 2px radius, mono label, dot indicator left. The single component that uses motion (120ms fade on state change). |
| `<Form.Field>`, `<Form.Input>`, `<Form.Textarea>`, `<Form.Radio>`, `<Form.Label>`, `<Form.Help>`, `<Form.Error>` | Standard form atoms, fully accessible | Hand-rolled, not Radix. Visible focus ring (2px solid ink, 2px offset). Labels always above inputs. |

**Build order:** `<Text>` → `<Heading>` → `<Mono>` → `<Rule>` → `<Stack>`/`<Grid>`/`<Section>`/`<Container>` → `<Status>` → `<Button>` → `<Link>` → form atoms.

## Layer 2 — Patterns (`src/components/patterns/`)

Composed components. Reusable across pages. ~12 components.

| Component | Used on | Notes |
|---|---|---|
| `<MonoIdentifier>` | Footer, Impressum, hero, about page | Renders an institutional identifier as `LABEL · VALUE` in mono with hairline rule under. Variants: `aug-erlaubnis`, `hrb`, `ust-id`, `cin`, `iso27001`. Reads from `config/status.json`. |
| `<StatusToken>` | Status strip, Compliance Shield columns | Wraps `<Status>` + `<Mono>` label. Reads state from `config/status.json`. |
| `<KeyValueTable>` | Dossier headers, Pricing footnotes, Impressum | Hairline-ruled key-value table. Mono right column. |
| `<RoleCard>` | `/pods` page, homepage pod strip | Three-card pattern for Projektleiter / Senior Consultant / Pilot Engineer. Includes §-basis line in mono. |
| `<DossierHeader>` | Dossier index cards, dossier detail pages | The one-page procurement-record header table per §5.3. |
| `<TrustBand>` | Homepage, footer | Single horizontal row of monochrome client + certifier marks. No carousel. Reads from `config/certifiers.json`. |
| `<NavTabs>` | Compliance Shield, Insights index | Three-column tab/anchor pattern (Rechtssicherheit / Datenschutz / Informationssicherheit). |
| `<ArtifactRow>` | Compliance Shield page | Row of: artifact name, status (`<Status>`), action (Download / View / "geplant Q3 2026"). |
| `<CalculatorTCO>` | Homepage | Indicative TCO calculator. Single number output with mono footnote citing source. Inputs: engineer count, role mix. **No fake precision** — output rounded to nearest €5k/year. |
| `<TriangleSchematic>` | Homepage hero, /protokoll | The AÜG triangle (§6.4 imagery format 1). SVG, three vertices labeled, edges carry §-references. Static, not interactive. |
| `<EinsatzTimeline>` | /protokoll page | The 5-stage timeline (§6.4 imagery format 2). Five horizontal panels with stage number, owner, duration, artifact label. |
| `<ResidencyMap>` | /regional, Compliance Shield | Flat outline of Europe + India with two pins (§6.4 imagery format 3). SVG, no interactivity. |
| `<DossierTemplate>` | /dossiers/[slug] | The one-page procurement record format (§6.4 imagery format 4). Composes `<DossierHeader>` + content blocks. |
| `<CookieBanner>` | App layout (Klaro-driven) | The §8.5 banner. Three buttons of equal visual weight. "Alle ablehnen" first. |

**Build order:** `<MonoIdentifier>` and `<StatusToken>` first — they exercise every primitive. Then `<RoleCard>` and `<TrustBand>` (homepage critical path). Then schematics (`<TriangleSchematic>`, `<EinsatzTimeline>`, `<ResidencyMap>`) as SVG one-shots. Calculator and `<DossierTemplate>` last because they have content dependencies.

## Layer 3 — Page sections (`src/components/page-sections/`)

Top-level sections of specific pages. Each section is a pure RSC component reading from `config/` or MDX. ~14 components.

| Component | Page | Notes |
|---|---|---|
| `<HeroPanel>` | / | Two-column hero. `variant: 'aug' \| 'werkvertrag-interim'` switches the copy per file 00 of this handoff. Right column renders `<TriangleSchematic>` with `<MonoIdentifier variant="aug-erlaubnis" />` underneath. |
| `<ValuePropTriad>` | / | Three sober cards: AÜG-konform · DSGVO + Drittland · Ein Projektleiter, eine Haftungskette. Uses interim variants when artifacts pending. |
| `<PodCompositionStrip>` | /, /pods | Three `<RoleCard>` in a row. |
| `<ComplianceShieldPreview>` | / | Three column tiles linking to /compliance-shield, each surfacing one artifact via `<ArtifactRow>`. |
| `<DossierPreviewPair>` | / | Two `<DossierHeader>` cards linked to /dossiers detail. Hidden until ≥ 2 dossiers ready. |
| `<ComplianceShieldColumns>` | /compliance-shield | The three-column page body. Each column a list of `<ArtifactRow>`. |
| `<ProtokollTimeline>` | /protokoll | Wraps `<EinsatzTimeline>` with intro paragraph and §-citation footer. |
| `<PodsRoster>` | /pods | Three `<RoleCard>` + pod composition matrix table. |
| `<PricingBands>` | /preise | Three pricing band cards (`Pilot Pod` / `Squad` / `Programm`) with €/Monat ranges and footnote. Range numbers come from `config/pricing.json`. |
| `<DossierIndex>` | /dossiers | List of `<DossierHeader>` cards, links to detail. Empty state at launch ("Erste Dossiers in Vorbereitung"). |
| `<InsightsIndex>` | /insights | List of MDX posts grouped by topic cluster, hairline-ruled. |
| `<RegionalSplit>` | /regional | Two-column layout: Stuttgart left, Bengaluru right. `<ResidencyMap>` below. Working-hours overlap chart sober (8-block table, not visualized as bars). |
| `<FounderPanel>` | /about | B&W portrait left, mandate paragraph + entity disclosures right. |
| `<ContactForm>` | /contact | The §7.10 form. RHF + Zod. Submits to `/api/contact`. Below form: §-grade microcopy from §8.4. |

## Layer 4 — System (`src/components/system/`)

Sitewide chrome. ~5 components.

| Component | Notes |
|---|---|
| `<StatusStrip>` | The §5.6 sitewide status strip. Renders 3–5 `<StatusToken>` from `config/status.json`. Mobile: collapses to a single tap target showing the most-restrictive status. Position: sticky top, 32px height. z-index `status-strip` (40). |
| `<NavBar>` | Primary nav per §7.1. DE/EN toggle on the right. Below `<StatusStrip>`. |
| `<Footer>` | Impressum-summary block + certifier band + legal link list. Reads from `config/nav.json` + `config/certifiers.json`. |
| `<RootLayout>` | Locale-aware, mounts `<StatusStrip>` + `<NavBar>` + main + `<Footer>` + `<CookieBanner>`. |
| `<Skip>` | Skip-to-content link for keyboard users. Required by WCAG 2.2 AA + BITV 2.0. |

## Layer 5 — Utilities (`src/components/util/`)

Non-visual helpers.

| Component | Notes |
|---|---|
| `<JsonLd>` | Renders typed JSON-LD into `<head>` via `next/script` with `type="application/ld+json"`. Type-safe builders in `src/lib/schema/`. |
| `<Hreflang>` | Emits the hreflang `<link>` tags per `route-map.ts`. Validated by `tests/e2e/hreflang.spec.ts`. |
| `<Meta>` | Per-page title + description + OG. Wraps Next.js `metadata` API but adds the title-case + trademark glyph rule (`niogod™ — …`). |

## Build order across layers

This is the order the team should build, regardless of which page they're starting:

1. **Tokens build script** — produces `tokens.css` from `tokens.json`. ~30 min.
2. **Primitives** (~10 components, ~6 hours).
3. **`<MonoIdentifier>` + `<StatusToken>`** patterns. ~2 hours.
4. **System chrome** (`<StatusStrip>`, `<NavBar>`, `<Footer>`, `<RootLayout>`). ~6 hours.
5. **`<HeroPanel>`** with both variants. ~3 hours.
6. **Schematic SVGs** (`<TriangleSchematic>`, `<EinsatzTimeline>`, `<ResidencyMap>`). ~6 hours each, ~18 total.
7. **Remaining patterns** + **page sections** (~25 hours).
8. **Pages** wire-up (~12 hours).
9. **Forms + API route** (~6 hours).
10. **Klaro consent + tracker block test** (~4 hours, including the test).
11. **MDX pipeline + content authoring** (variable; first 2 dossiers and 6 insights = ~30 hours of writing).
12. **Tests** (Lighthouse budget, axe, hreflang, consent, keyboard nav) (~8 hours).
13. **Legal page wire-up** (gated on lawyer/DSB delivery; ~4 hours of plugging in).
14. **Pre-launch verification** against §10 checklist (~6 hours).

Realistic total: **140–180 hours of build**, plus content writing, plus DSB legal review cycles. This is one engineer 4–6 weeks if there's no waiting on legal — and the legal part is what stretches it (see file 09).

## Components explicitly *not* in this inventory

- Tabs, accordions, modals, popovers, tooltips, carousels — none used. If a section feels like it needs an accordion, the answer is to put the content on a sub-page or in MDX.
- Image carousels — forbidden by §5.3.
- Video player — no videos on the site.
- Search — not in v1. Search comes when /insights crosses 20 posts.
- Newsletter signup — out for v1. Reactivate when there's a defensible content cadence.
- Live chat / Intercom — never. Forbidden by the brand voice (institutional ≠ chatty).
