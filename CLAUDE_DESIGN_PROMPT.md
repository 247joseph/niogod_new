# Claude Design Prompt — niogod™ Website Rebuild

Paste this entire brief into Claude (or any design/code-gen agent). It captures the positioning, IA, voice, visual system, page-by-page content, and technical constraints from the two strategy documents and the existing repository.

---

## 0. Role & Output

You are a senior product designer + front-end engineer working as a single agent. Build a complete, production-ready, bilingual (DE-primary / EN-parallel) marketing website for **niogod™**, a Managed Engineering Pod service for DACH Deep Tech.

Deliverables, in this order:

1. A design system document (tokens, type, components, motion).
2. A Figma-equivalent layout description for every page in the sitemap (desktop + mobile).
3. Production code in **Next.js 15 (App Router) + TypeScript + Tailwind**, content driven by **MDX content collections** (or Sanity if collaborative editing is needed), deployed to **Vercel Frankfurt edge**.
4. EN copy for every page + DE translation (Sie-form, formal). Legal terms (AÜG, Werkvertrag, Scheinselbständigkeit, Projektleiter, Statusfeststellungsverfahren, Auftragsverarbeitungsvertrag) stay untranslated and are set in mono.
5. Lighthouse 95+, LCP ≤1.8s, CLS ≤0.05, INP ≤150ms, total homepage weight ≤350KB.

Do not ship until every page passes the constraints in §10.

---

## 0.5 Existing Brand Assets to Carry Forward (audit of niogod.com)

The current site has a usable foundation. Mine these forward verbatim — do not re-invent.

**Wordmark conventions.**
- Always `niogod™` — lowercase, with the trademark glyph, weight 800, `letter-spacing: -1px`. Gradient text-fill on light surfaces, solid `--text-inverse` on dark.
- Site rationale to preserve in About copy: *"We style our name in lowercase because in this partnership, you are the hero, not us. We are the infrastructure that powers your growth."* — soften the "you are the hero" framing into institutional voice but keep the lowercase rule.
- The acronym belongs on About: **n.i.o.g.o.d.** = *"New Integrated Operations. Global On-demand Delivery."* (DE: *Neue Integrierte Prozesse, Globale Bereitstellung auf Abruf*).

**Headline phrases already in market — keep these as load-bearing terms.**
- *Institutionalized Remote Engineering for the DACH Market.* (existing H1, retained)
- *Institutional Rigor. Rapid Execution.*
- *The Compliance Shield* (the spine concept; carry the name, expand the substance)
- *Managed Engineering Squads (MES)* — current term. **Migrate to "Managed Engineering Pods"** per the rebrand strategy, but keep MES as an `aka` redirect in copy and SEO meta for one quarter.
- *72-Hour Deployment Protocol* (visual motif: monospace `0H — 72H`, `[ Initialize Protocol ]`, `00:00 / 24:00 / 48:00 / 72:00`). Keep this exactly.
- *GDPR is our Default Setting* · *You Own Every Line of Code* · *NDA Enforceable in DE* · *EOR Liability Shield* · *Standard Contractual Clauses* · *AWS Frankfurt (EU-Central-1)* — keep as trust-stamp row.
- *14-Day Zero-Risk Trial* — useful as the secondary commitment on the Pod page.
- Cookie banner currently says "Compliance Check" — replace with neutral institutional copy.

**Assets already in `/assets/` to surface across the new site.**
- `assets/Compliance Whitepaper 2025.pdf` → primary lead magnet on `/compliance-shield`.
- `assets/Sample Service Agreement.pdf` → gated download on `/the-pod`, replaces the planned Sample SOW.
- `assets/DATA PROCESSING AGREEMENT.pdf` → AVV download on `/compliance-shield/ip-gdpr`.
- `assets/Sample Intelligence Report.pdf` → primary lead magnet on `/intelligence` and `/kontakt` confirmation.
- `assets/andrew-wilson.mp4` — **drop the autoplay widget**. If retained at all, gate behind a play button on a single case-study page.
- `assets/hero-man.{png,webp}`, `assets/hero-image.{png,webp}` — **retire**. Replace with the three-glyph pod schematic per §5.5.
- `assets/blog-bg-*.png` — keep as MDX cover images for migrated posts; redraw any that read as stock.
- `assets/team-*.{jpg,png}` — keep, but **fix the filename swap**: `team-joel.png` is currently used for Advaid and `team-adwaid.jpg` for Joel. Rename and re-shoot in a single monochrome session per §5.6.

**Named people and entities — use these exact strings.**
- Founder & CEO: **Joseph Jose** (Germany / India anchor).
- Vetting Mentor, India Hub: **Advaid Gireesan**.
- Head of Operations, Europe / India: **Joel Josy**.
- Indian operating entity: **Borcom Dynamics Private Limited**, CIN **U82990KL2023PTC084978** (registered Kerala).
- DACH Liaison address currently published: **Pfaffenwaldring 50, 70569 Stuttgart, Deutschland**. ⚠ This is the University of Stuttgart campus address — verify legitimacy before re-publishing. If it is not a leased presence, replace with a real serviced-office address (Regus Stuttgart, Mindspace, etc.) before launch and update the Impressum accordingly.
- Contact: `hello@niogod.com`.
- Operating mention also seen: *Biometric Cyberpark center* (Kochi). Verify and either name properly or remove.

**Existing IA to migrate (current top nav).**
`Home · Protocol · Hub: India · Success Stories · About Us · Careers · Let's Talk` (+ footer: Security, Blog, Impressum, Privacy Policy, Terms & Conditions). Map to the new sitemap in §3:
- *Protocol* → `/protocol` (keep verbatim).
- *Hub: India* → fold into `/about` (DACH Liaison + India Hub) and `/careers`.
- *Success Stories* → `/case-studies`.
- *About Us* → `/about`.
- *Let's Talk* → `/kontakt`. Rename CTA to `Konsultation vereinbaren` / `Book Consultation`.
- *Security* → fold into `/compliance-shield/ip-gdpr`.
- *Blog* → `/intelligence` (rename, do not migrate as "Blog").

**Existing keep / cut list.**

*Keep (institutional spine):* lowercase `niogod™` wordmark, n.i.o.g.o.d. etymology, "Compliance Shield" name, the `0H → 72H` monospace timeline, Inter + JetBrains Mono pairing, slate-blue `#4F5D75 → #7E6E9C` brand gradient (push darker for hero), bento grid layout, ROI / EOR Savings Calculator (rebuild as the Pod-vs-Hire calculator on `/resources`), three trust PDFs, EN/DE parity at `/de/`, team-page structure, anonymized case-study format.

*Cut or rework before launch:*
- Emoji icons on `security.html` (🛡 🖥 🔒 👔 👨‍💻) — replace with single-weight line-SVG iconography.
- Color blasts on the security firewall diagram (`#0d6efd`, `#2f9e44`, `#e7f5ff`) — collapse to monochrome with a single `--accent` highlight.
- The hero photograph of a man (`hero-man.*`) — replace with the pod schematic.
- "*you are the hero, not us*" line — soften to institutional third person.
- Overuse of *"Quantify Your Institutional Rigor"* — use the phrase once, on `/the-pod`, not as a section header pattern.
- ISO 27001 inconsistency: home claims **"Certified"**, security page says **"Aligned"**. Resolve to one truthful claim site-wide; if not yet certified, the only acceptable copy is *"ISO 27001 — Implementierung in Vorbereitung, Zertifizierung Q[X] 202[X]"*.
- Anonymized case headers like *"The SAP Integration Sprint"*, *"Fintech Security Scale-Up"* read thin — either secure permission to name clients or convert to *capability briefs* with sector + stage + pod composition + outcome numbers.
- *"Top 1% / 5M+ developers / 50,000+ profiles"* — substantiate or soften to *"Tier-1 institutional alumni networks across India"*.
- Pill buttons (50px radius) — switch to 6–8px radius to match the institutional / Helsing register.
- Cookie banner "Compliance Check" — replace with a Usercentrics or Cookiebot CMP per §8.
- Auto-play `andrew-wilson.mp4` — drop or gate behind a play button.
- Footer disclosure currently leads with *Borcom Dynamics Private Limited* — restructure footer to lead with the Stuttgart anchor, with the Indian operating entity disclosed cleanly below.

**Compliance language already in use (carry forward, then deepen).**
Already present: *GDPR Data Sovereignty · GDPR is our Default Setting · EU-approved SCCs · EU data processing addendums · AWS Frankfurt · EOR Liability Shield · co-employment risk = zero · B2B Service Agreement · IP contractually assigned to your GmbH/UG immediately upon creation.*
Add per the rebrand strategy: **AÜG · Werkvertrag · Dienstvertrag · Scheinselbständigkeit · §266a StGB · §1 AÜG · BGB §631 · Auftragsverarbeitungsvertrag (AVV) · Statusfeststellungsverfahren · Hauptzollamt · Fachliche Weisungen der Bundesagentur für Arbeit (15. Oktober 2024 / 1. Oktober 2025)** — set in JetBrains Mono inline.

---

## 1. The Repositioning (read this twice before designing)

niogod is **not** a staffing platform, **not** an EOR, **not** an offshore body shop, **not** a freelance marketplace, and **not** an Indian outsourcer.

It is a **Managed Engineering Pod for DACH Deep Tech** — a sealed, three-person unit (Projektleiter · Senior Consultant · Pilot Engineer) deployed under a **Werkvertrag-led, AÜG-konform** legal architecture, priced at the fully-loaded cost of one German mid-senior engineer (~€8–12K/month), live in 72 hours.

The website must read like a **defense-industrial supplier** (Helsing / Anduril / Palantir / Quantum Systems register), not a startup landing page. If a Helsing engineer landed on this site, they should mistake niogod for a German company.

The single sentence the homepage must close in <15 seconds:

> *"For the fully-loaded cost of one German engineering hire, niogod deploys a three-person, AÜG-konform engineering pod — Projektleiter, Senior Consultant, Pilot Engineer — under a Werkvertrag, in 72 hours."*

The single sharpest tagline:

> **EN:** "One paycheck. A whole pod."
> **DE:** "Ein Gehalt. Ein ganzes Pod."

Supporting H2 (SEO-loaded): *"Engineering pods for European deep tech. Embedded in CET. Compliant in Germany. Delivered in code."*

---

## 2. ICP & Buyer Psychology — design every page for this person

**Primary persona.** CTO / Head of Engineering / technical co-founder of a Series A–C deep-tech startup in Munich, Berlin, Stuttgart, Zurich, Vienna, Aachen, Erlangen, Ulm, Karlsruhe, Dresden, or Graz. 8–80 engineers. TUM / RWTH / ETH / KIT / TU Berlin alumni. Funded by HV, Earlybird, Project A, UVC, La Famiglia, Speedinvest, Cherry, HTGF, General Catalyst Munich, EQT.

**Secondary persona.** COO / CFO / Head of Operations who controls the engineering budget and reads the Compliance Shield page with their Steuerberater.

**What earns trust, ranked.**

1. Named legal anchor in Germany (Stuttgart address, Gerichtsstand Deutschland, Impressum per §5 TMG).
2. Specific German legal language used correctly (AÜG, BGB §631, §266a StGB, AVV, Hauptzollamt, Fachliche Weisungen of the BA October 2024 / October 2025).
3. ISO 27001, GDPR/DSGVO, optional BSI C5 / TISAX. State only what is held; never imply.
4. EU-resident data infrastructure (AWS Frankfurt / Hetzner / OVHcloud / IONOS).
5. Density and structure — German B2B reads whitepapers; treat Compliance pages as literal whitepapers, not blog posts.
6. Verbindlichkeit in language — "within 72 hours" beats "fast"; "BGB §631" beats "we follow German law".
7. Visible accountability — founder photo + bio, named Projektleiter or named placeholder, Geschäftsführer in Impressum.
8. Restraint — no "10x productivity", no "AI-supercharged engineers", no "world-class" superlatives.
9. Form, not personality — Sie, formal third person, named institutions.

**The four contrasts every page must reinforce.**

- **Pod, not person.** Three layers, never one avatar.
- **Werkvertrag, not Dienstvertrag.** Outcome owed, not effort owed.
- **Projektleiter, not "account manager".** C1 German, embedded with Geschäftsführung.
- **Institutional, not platform.** No marketplace, no profile-shopping, no hourly toggles.

---

## 3. Sitemap — build all of these

```
/                              Home
/the-pod                       Anatomy of the 3-person pod + tiers
/verticals                     Index
  /verticals/ai-ml
  /verticals/robotics-autonomous
  /verticals/industrial-software
  /verticals/medtech
  /verticals/defense-dual-use
  /verticals/sap-enterprise
/compliance-shield             Spine page — read by client counsel
  /compliance-shield/aug       AÜG-Inlandsbezug & BA-Weisungen 2024/2025
  /compliance-shield/werkvertrag
  /compliance-shield/ip-gdpr
/protocol                      The 72-hour deployment
/case-studies
  /case-studies/[slug]
/about                         Doctrine + founder + DACH liaison
/intelligence                  Reports, Whitepapers, Briefings, Field Notes
  /intelligence/[slug]
/resources                     Pod-vs-Hire calculator, Compliance Pack, Hiring Benchmark
  /resources/pod-vs-hire-calculator
  /resources/dach-deep-tech-hiring-benchmark
/careers                       Recruiting page for Indian engineers
/kontakt                       Calendly + qualifying form
/legal/impressum               §5 TMG (mandatory)
/legal/datenschutz             DSGVO
/legal/agb                     AGB
/legal/cookies                 Cookie policy
/de/...                        German mirror of every page
```

Top nav (6 items, sticky, ultra-thin, JetBrains Mono):
`The Pod · Verticals · Compliance Shield · Protocol · Intelligence · Kontakt` + `[DE | EN]` toggle + primary CTA `Konsultation vereinbaren` / `Book Consultation`.

Footer: 4-column. Pods · Verticals · Resources · Legal. Plus Stuttgart address (Pfaffenwaldring 50, 70569 Stuttgart), Indian operating entity disclosure (Borcom Dynamics Pvt Ltd, U82990KL2023PTC084978), VAT ID, GST ID, Impressum/Datenschutz/AGB/Cookies links, DE/EN toggle.

---

## 4. Voice & Tone (enforce per word)

- **Register:** vossianisch-formal, dense, declarative, technical. Frankfurter Allgemeine corporate insert, not Berlin SaaS.
- **Person:** institutional third person. No "we", no "our", no "you'll love…". Use *Sie* in DE.
- **Sentence shape:** short. Long thinking. Numbers, tables, code blocks.
- **Specificity:** `€8,400/month`, `1.7 FTE`, `42 hours of overlap`, `BGB §631`, `Fachliche Weisungen 1.10.2025`.

**Use:** pod, pilot engineer, pod lead / Projektleiter, embedded, ship, AVV / DPA / Impressum, CET overlap, spinout.
**Avoid:** resource, FTE, headcount, offshore developer, account manager, augmented, deliver, GDPR-compliant (just show the docs), time-zone overlap, client/customer, "world-class", "best-in-class", "transformative", "next-gen", "passionate", "synergies", "leverage", "ecosystem", em dashes, exclamation marks, emoji, the words *outsourcing / offshore / BPO / manpower / resources*.

**CTA discipline.** Exactly two CTAs per page: a primary `Konsultation vereinbaren` / `Book Consultation` (warm) and a secondary one tuned to the page's stage (`Compliance Shield ansehen`, `AÜG-Whitepaper herunterladen`, `Sample SOW herunterladen`, `Pod-vs-Hire-Rechner öffnen`). Never "Get started" or "Sign up".

---

## 5. Visual System

### 5.1 Aesthetic register

Dark, near-monochrome hero sections with subtle gradients and **blueprint-style schematic line art** — no stock photos of people, no diverse-team imagery, no high-fives, no laptop-on-cafe-table, no abstract gradient blobs. Treat the pod the way Anduril treats hardware: as a sublime artifact.

Reference what to copy:

| Site | Borrow |
|---|---|
| helsing.ai | Premium European defence aesthetic, restraint, dark palette |
| linear.app | Density, monospace data rendering, dark-mode mastery |
| vercel.com | Type system, code-in-hero pattern |
| stripe.com | Diagrammatic explainers, structured nav |
| quantum-systems.com | Hardware-product polish in dark/light |
| palantir.com | "Forward-deployed engineering" register, HUD documentation feel |
| anthropic.com | Editorial typography, restrained color |
| celonis.com | German B2B SaaS done bilingually well |
| personio.com | DACH B2B nav, German legal pages |

### 5.2 Color tokens (Helsing-adjacent, recommended)

Anchor on the existing repo palette but extend it for dark dominance.

```css
--ink-900:        #0B0D0F;  /* primary dark background */
--ink-700:        #1A1D21;  /* surface / card on dark */
--ink-300:        #7A8089;  /* body text on dark */
--paper:          #F4F2EE;  /* off-white light bg, never pure white */
--bg-paper:       #FFFFFF;  /* card surface in light mode */
--text-dark:      #1E1B29;  /* near-black body on light */
--text-inverse:   #F3F4F6;  /* on dark surfaces */
--rule:           #262A30;  /* 1px borders on dark */
--border-subtle:  #E2E4EA;  /* dividers in light */

/* Brand anchors carried over from existing system */
--primary-color:  #4F5D75;  /* slate-blue, the institutional anchor */
--primary-deep:   #2C3340;  /* dark-hero variant */
--primary-accent: #7E6E9C;  /* gradient terminus, used sparingly */
--primary-gradient: linear-gradient(135deg, #4F5D75 0%, #7E6E9C 100%);

/* Signal — used ONLY for compliance/risk/status */
--accent:         #E64E20;  /* single CTA accent (Helsing red-adjacent) */
--signal-success: #5E8A6F;  /* "AÜG-konform" badge */
--signal-amber:   #D4A04A;  /* compliance/risk indicators */
```

The primary gradient is reserved for hero backgrounds, the primary CTA, and section dividers. Never on cards, icons, or body text.

### 5.3 Typography

- **Display & body:** Inter (300/400/500/600/700). Body 400, sub-heads 600, hero 700.
- **Mono / data:** JetBrains Mono 400/500. Use for: legal references (`§1 AÜG`, `BGB §631`), role tags (`// Projektleiter — DACH Liaison`), data labels, footnotes, the entire sticky top nav, all pricing tables, the protocol timeline markers, code blocks.
- **Optional editorial accent:** PP Editorial New italic, pull-quotes only, never headlines.
- **Forbidden:** Roboto, Open Sans, Lato, Montserrat — these are tells of generic agency work.

### 5.4 Layout & motion

- 12-col grid, max content 1280px, 96px outer gutter desktop.
- Section rhythm: 160px vertical padding between major sections, never less than 96px.
- Components: 1px `--rule` borders, 12px radius, no shadows in dark mode, soft shadows in light.
- Motion: 200ms ease-out, scroll-triggered fade + 8px translate. No parallax. No autoplay video on hero.
- Iconography: Lucide React or Phosphor at thin / 1.5px stroke, single weight, recolored to `--primary-color` only. Never mix icon sets.

### 5.5 The pod, visualized — single most important design decision

- **Identity mode** (homepage hero, About): the pod is one **sealed shield-like outline** containing three layered glyphs — a hexagon-with-square (Projektleiter), a layered-stack (Senior Consultant), a single-node (Pilot Engineer). One Werkvertragsobjekt, not three contractors.
- **Anatomy mode** (The Pod page): vertical stack of three concentric / layered shapes labeled in JetBrains Mono — `// Projektleiter — interface layer`, `// Senior Consultant — architecture layer`, `// Pilot Engineer — execution layer`.
- **Schematic mode** (Protocol page): three-node graph with directional arrows — `Mandant → Projektleiter ↔ Senior Consultant ↔ Pilot Engineer`.

Never render the pod as three smiling stock-photo faces. Never label them "Anil, Markus, and Priya". The pod is institutional.

### 5.6 Imagery library (approved-only)

1. Technical schematics / blueprints — mono-line, 1.5px stroke, drawn in `--text-inverse` on dark and `--text-dark` on light (Anduril/Palantir HUD/NASA technical-drawing register).
2. Topology diagrams per vertical — simplified ROS node graph for Robotics, MLOps DAG for AI/ML, S/4HANA module map for SAP.
3. Data visualizations — built in HTML/SVG (Recharts/Tremor), never as static images. Use `--accent` only.
4. Document mock-ups — whitepapers shown as document covers with the niogod wordmark, not generic PDF icons.
5. Founder portraits — Joseph + Sidharth + Chanthu shot in one session against a paper-white seamless, charcoal/grey/black wardrobe, high-contrast b&w. Used only on About and the founder note.
6. Hardware/lab licensed photography (robotics arms, fusion chambers, drone PCBs) for vertical pages, sparingly.

---

## 6. Page-by-page Specification

For each page below: hero copy (DE + EN), section blocks in order, primary + secondary CTA, SEO title/meta, schema. Voice = institutional third person.

### 6.1 Home (/)

Goal: convert a cold DACH technical buyer in <60 seconds. Establish (a) institutional category, (b) the math, (c) the compliance posture, (d) one reason to act.

**Section order:**

1. **Sticky thin top nav** (HUD-style, JetBrains Mono links).
2. **Hero (full viewport, dark, gradient).**
   - H1 (DE): *Institutionalisiertes Remote Engineering für den DACH-Markt.*
   - H1 (EN): *Institutionalized Remote Engineering for the DACH Market.*
   - Sub (DE): *Für die Vollkosten einer einzelnen deutschen Ingenieursstelle erhält Ihr Deep-Tech-Startup eine dreiköpfige, AÜG-konforme Engineering-Einheit: Projektleiter, Senior Consultant und Pilot Engineer — eingesetzt unter Werkvertrag, in 72 Stunden.*
   - Sub (EN): *For the fully-loaded cost of one German engineering hire, your deep-tech startup receives a three-person, AÜG-compliant engineering unit: a Projektleiter, a Senior Consultant, and a Pilot Engineer — deployed under Werkvertrag, in 72 hours.*
   - Primary CTA: `Konsultation vereinbaren` / `Book Consultation`
   - Secondary CTA: `Compliance Shield ansehen` / `View Compliance Shield`
   - Visual: dark gradient + stylized three-node pod schematic in JetBrains Mono labels with thin strokes.
3. **The Math** (single screen, two stacked datasheet cards in Bento).
   - Title: *Für den Preis einer Stelle. / For the price of one hire.*
   - Left card (muted): *Eine senior deutsche Ingenieursstelle (Senior Backend, Munich)* — €95k base + €40k Lohnnebenkosten + €15k Recruiting + €10k Equipment/Office = **€160k Vollkosten**. *Capacity: 1 person, 1 role.*
   - Right card (gradient-accented): *niogod™ Engineering-Pod* — same €150–160k spend → **3 Rollen, 1 Werkvertrag, 72-Stunden-Deployment**.
   - Footnote (mono): *Vergleichswerte basieren auf Stepstone, levels.fyi und Freelancer-Kompass 2025; tatsächliche Werte variieren nach Region und Spezialisierung.*
4. **The Pod** (4-card Bento). Projektleiter · Senior Consultant · Pilot Engineer · DACH Liaison. Each card = 1-line role definition + 3-bullet capability list + thin schematic icon.
5. **Compliance Shield teaser.** Dark band, five trust-stamps in mono: `AÜG-konform · Werkvertrag-Architektur · GDPR · ISO 27001 · AWS Frankfurt`. CTA: `Compliance Shield im Detail ansehen`.
6. **Verticals** (6-tile Bento, control-panel feel). One mono-line icon, title, one-sentence positioning per tile.
7. **Protocol teaser** (4-step horizontal timeline: T+0h · T+24h · T+48h · T+72h). CTA: `Protokoll ansehen`.
8. **Selected Engagements** (3 anonymized case-study cards, e.g. *Series B Robotics, Munich · 14-engineer pod · 8 months*). Honest absence is more institutional than fabricated logos.
9. **Intelligence** (latest 3 articles, Bento).
10. **Final CTA block** (full-width dark band): *Optimieren Sie Ihre F&E-Aufwendungen unter institutioneller Rigorosität.* + `Konsultation vereinbaren`.
11. **Footer.**

SEO Title: `niogod™ | Managed Engineering Pods für DACH Deep Tech`
Meta: `Zum Vollkostenpreis einer einzigen deutschen Ingenieursstelle stellt niogod™ in 72 Stunden einen AÜG-konformen Engineering-Pod bereit — Projektleiter, Senior Consultant, Pilot Engineer, unter Werkvertrag.`
Schema: `Organization`, `Service`, `FAQPage`.

### 6.2 The Pod (/the-pod)

Hero (DE): *Eine Einheit. Drei Rollen. Ein Werkvertrag.*
Sub: *Der niogod™-Pod ist keine Personalauswahl, sondern eine versiegelte Lieferarchitektur.*

Sections:

1. **Anatomy of the Pod.** Three full-width horizontal stripes, one per role. Each stripe: role name (Inter 700), mono job title (`// Projektleiter — DACH Liaison`), 4-line role brief, required qualifications, operational mandate. Use the suggested copy from §6.1 of the strategy doc verbatim.
2. **Why three, not one.** Three paragraphs handling the implicit objection "why not one really good freelancer?" — cognitive load distribution, compliance posture (Werkvertrag requires identifiable result-owing structure), continuity (single freelancer = single point of failure).
3. **What the pod is not** — negative-space Bento: `// Not a freelancer marketplace`, `// Not an EOR`, `// Not a body shop`, `// Not a captive GCC`, `// Not a project agency`. One-line clarification each.
4. **Engagement model.** Three cards: `Pod (Standard)`, `Pod + Architect-on-Demand`, `Multi-Pod Programme (Series B+)`. Monthly investment range, pod composition, minimum term, exit clause.

Pricing (this is the single most consequential change — design the page around shared leadership, dedicated builders):

| Tier | Public price | Composition | Best for |
|---|---|---|---|
| Pilot | €6,900/mo | 0.3 FTE PM + 0.3 FTE Senior Consultant + 1.0 FTE Pilot | Pre-seed/seed |
| Standard | €9,900/mo | 0.4 PM + 0.4 SC + 2.0 Pilots | Series A scaling |
| Senior | €12,800/mo | 0.5 PM + 0.5 SC + 2.5 Pilots | Series A/B regulated/HW |
| Specialist | €14,000+ | Domain consultant replaces SC | Robotics, biotech, ISO 26262 |

Each tier card is a mono-typography "datasheet" with composition, monthly price (EUR + small INR transparency), included/not included, "Pod composition logic" expandable explaining shared vs dedicated FTE.

CTA: `Konsultation vereinbaren` + `Sample SOW herunterladen`.

### 6.3 Verticals (/verticals + 6 sub-pages)

Index: 6 tiles, one per vertical, with vertical name, market shorthand, 3 representative client archetypes, link.

Per-vertical template (apply identically to all six):

1. Hero: sector + one-line institutional positioning. *(Robotics example: "Engineering pods for autonomous-systems startups operating between TRL 6 and series production.")*
2. Why this sector needs niogod (3 sector-specific bullets — for Robotics: ROS2 talent scarcity in DACH, perception↔control integration complexity, cost of full-stack robotics engineers in Munich).
3. Senior Consultant profile for this sector — what 10+ years looks like (technologies, frameworks, certifications, prior employer archetypes).
4. Sample engagements — 3–4 anonymized case summaries.
5. Sector-specific compliance notes (medtech: IEC 62304 / FDA 21 CFR Part 11; defense: ITAR/dual-use export; SAP: SAP Partner-Edge alignment).
6. CTA: `Konsultation für [Sector] anfragen`.

The six verticals + Senior Consultant archetype + sample stack:

| Vertical | URL | Senior Consultant archetype | Sample stack |
|---|---|---|---|
| AI / ML — Applied & Enterprise | `/verticals/ai-ml` | 10+ yrs production ML, MLOps, LLM, vector DBs | PyTorch, JAX, Ray, vLLM, Weaviate, NVIDIA stack |
| Robotics & Autonomous Systems | `/verticals/robotics-autonomous` | 10+ yrs ROS/ROS2, perception, SLAM, control | C++, ROS2, Isaac, Gazebo, OpenCV, embedded Linux |
| Industrial Software / Industry 4.0 | `/verticals/industrial-software` | 10+ yrs OPC-UA, MES, SCADA, edge | Siemens TIA, OPC-UA, MQTT, K8s, time-series DBs |
| Medtech & Biotech Instrumentation | `/verticals/medtech` | 10+ yrs IEC 62304, ISO 13485 | Qt, embedded C++, regulated DevOps, MDR |
| Defense & Dual-Use | `/verticals/defense-dual-use` | 10+ yrs mission-critical, secure-by-design | Rust, Ada, sensor fusion, edge AI, secure comms |
| SAP & Enterprise Platforms | `/verticals/sap-enterprise` | 10+ yrs S/4HANA, BTP, ABAP, Fiori | S/4HANA, BTP, CAP, RAP, Fiori, ABAP, integration suite |

### 6.4 Compliance Shield (/compliance-shield) — the spine

This is the page the Steuerberater and in-house counsel will read. Tone is most legalistic on the site, with citations to actual German statutes. This page **must be reviewed by a licensed German Fachanwalt für Arbeitsrecht (with AÜG specialization) before publication.**

Hero (DE): *Compliance Shield. Die rechtsarchitektonische Basis jedes niogod™-Einsatzes.*
Sub: *Drei vertraglich verankerte Schutzschichten: AÜG-Geltungsbereich, Werkvertragsstruktur und IP/GDPR-Souveränität.*

Sections:

1. **Why DACH compliance is not optional.** Two-column. Left = three-bullet primer on liabilities (Scheinselbständigkeit ~€97k retroactive social-security per affected freelancer over 2 years, §266a StGB up to 5 years criminal liability; verdeckte AÜG fines €30k–€500k, Gewerbezentralregister-Eintrag, fictional employment relationship; Hauptzollamt audits). Right = single bold statement: *"niogod™ Mandanten haben keine direkte vertragliche Beziehung zu den ausführenden Engineers. Punkt."*
2. **The three layers** (three full-width sections):
   - **Layer 1 — Werkvertrag-Architektur (BGB §631 ff.).** niogod delivers a defined Werk with Abnahme-criteria, not Dienste — this places engagement on §631, not §611, and not §1 AÜG. Senior Consultant + Pilot Engineer take direction *exclusively* from the Projektleiter; Mandant cannot issue task-level Weisungen.
   - **Layer 2 — AÜG-Geltungsbereich.** Per Fachliche Weisungen der Bundesagentur für Arbeit (15. Oktober 2024, revised 1. Oktober 2025), engineers who remain physically outside Germany and operate online for an Entleiher in Germany do *not* trigger the Erlaubnisvorbehalt under §1 AÜG, conditional on no onsite Einsatz. Any required onsite presence is executed by the Stuttgart-based Projektleiter only.
   - **Layer 3 — IP-Souveränität & GDPR.** Work-for-hire assigned to Mandant's GmbH/UG/AG immediately upon creation; AVV under Art. 28 DSGVO; AWS Frankfurt default; ISO 27001 commitment; signed NDA enforceable in DE jurisdiction; optional BSI C5 / TISAX for medtech and defense.
3. **Comparison table** ("What every model exposes you to"):

| Risk | Direct freelancer DE | DE Personaldienstleister | EOR (Deel/Remote) | niogod Werkvertrag-Pod |
|---|---|---|---|---|
| Scheinselbständigkeit liability on client | High | Medium | Medium-High | Eliminated |
| AÜG / verdeckte AÜ | Possible | Likely (without ANÜ-Erlaubnis) | Disputed (BA 2024/2025) | Outside §1 AÜG scope |
| §266a StGB exposure to Geschäftsführer | Yes | Yes | Yes | No |
| 4-year retroactive SV-Beiträge | Yes | Yes | Yes | No |
| Onsite Einsatz permitted? | Yes | Yes (with Erlaubnis) | Risky | Only via Projektleiter |

4. **Documentation library** (gated by email):
   - Mustervertrag (Werkvertrag-Template, redacted)
   - AÜG-Geltungsbereich Whitepaper (8 pages)
   - AVV-Template gemäß Art. 28 DSGVO
   - ISO 27001 statement of applicability summary
5. CTA: `Sprechen Sie mit unserem DACH Liaison` + `AÜG-Whitepaper herunterladen`.

### 6.5 Protocol (/protocol) — the 72-hour deployment

Hero: *Das niogod™ Einsatz-Protokoll. Von Konsultation zu Repository-Zugriff in 72 Stunden.*

1. **The four phases** — vertical timeline schematic in technical-blueprint style with hour markers in JetBrains Mono:
   - `T+0h` Konsultation & Scoping — 30-min call, signed NDA, structured Einsatzbriefing.
   - `T+12h` Pod-Konfiguration — Senior Consultant matched, Projektleiter assigned, Pilot Engineer selected.
   - `T+24h` Vertragswerk — Werkvertrag, AVV, NDA, IP-Assignment, eIDAS Qualified Electronic Signature.
   - `T+48h` Onboarding — Repository access, ticketing integration, security review, Kick-off mit Geschäftsführung.
   - `T+72h` Operativer Einsatz — first sprint commits, weekly Statusbericht cadence locked.
2. **Five-stage vetting algorithm** (funnel diagram for Pilot Engineer): sourcing pool → algorithmic pre-filter → technical assessment → Senior Consultant domain-fit → Projektleiter culture-fit. End ratio: <1%.
3. **Governance cadence:** daily async / weekly steering / monthly Statusbericht / quarterly architecture review.

CTA: `Einsatz initiieren` + `Protokoll-Dokument herunterladen`.

### 6.6 Case Studies (/case-studies)

Index: filterable by vertical and stage, 6–9 cards. Each card: vertical tag, engagement length, pod composition, headline outcome (e.g. *12-month engagement · 2 pods · €1.4M opex saved · TRL 6→7*).

Per-case template:

1. Hero — sector tag, anonymized client archetype, engagement window, pod size.
2. Context (200 words) — engineering challenge.
3. Architecture of the engagement — roles, cadence, stack, Senior Consultant profile.
4. Compliance posture — Werkvertrag clauses, AÜG-Inlandsbezug status.
5. Outcome — quantified deliverables, time-to-milestone, cost vs local-hire baseline.
6. Quote (only if real). Never fabricate.

Launch with **3 deeply-detailed cases**, not 9 thin ones. German B2B prefers one substantial whitepaper to a wall of logos.

### 6.7 About (/about)

Hero (DE): *Eine Doktrin, kein Marktplatz.*

1. **Doctrine** — 200-word manifesto. Three principles: *Institutionelle Rigorosität · Vertragliche Klarheit · Engineering-Exzellenz*. Each principle a separate paragraph, Inter, large.
2. **Founder profile** — Joseph Jose, photo (single, professional, near-monochrome), bio in third person, focused on operational depth, the Stuttgart anchor, and the prior background that justifies the model.
3. **The DACH Liaison** — Stuttgart-anchored physical presence (Pfaffenwaldring 50, 70569 Stuttgart). State explicitly: *contracts with German Mandanten are executed unter deutschem Recht, Gerichtsstand Stuttgart.*
4. **The operating entity** — Borcom Dynamics Private Limited, U82990KL2023PTC084978. Stated transparently — transparency about the offshore structure is itself a trust signal.
5. **Advisory / Counsel** — *Beratung durch deutsche Fachanwaltskanzlei für Arbeits- und IT-Recht.*

CTA: `Kontakt aufnehmen`.

### 6.8 Intelligence (/intelligence) — Blog, named "Intelligence"

Subtitle: *Reports, Whitepapers and Briefings on Compliant Remote Engineering for the DACH Market.*

Index = Bento with three content tiers:

1. **Reports & Whitepapers** (gated PDFs) — AÜG-Whitepaper, Werkvertrag vs. Dienstvertrag primer, Scheinselbständigkeit-Risikoanalyse, Indian Engineering Talent Map.
2. **Briefings** (1,500–2,500-word ungated articles, SEO-targeted on §9 keywords).
3. **Field Notes** (400–800-word commentary on regulatory updates, court rulings, BA-Weisungen revisions, deep-tech funding shifts).

Six launch articles to seed:

1. *We built the math: 1 Berlin engineer vs. 1 niogod pod, with real numbers.*
2. *AÜG nach den BA-Weisungen 2024/2025.*
3. *Werkvertrag vs. Dienstvertrag bei IT-Dienstleistungen.*
4. *Scheinselbständigkeit für Deep-Tech-Founders erklärt.*
5. *EOR und das Inlandsbezug-Problem.*
6. *Why Forward Deployed Engineers won 2025 — and what it means for European deep tech.*

Editorial cadence: 1 Briefing/week + 1 Whitepaper/quarter. Briefings 70% German / 30% English. Whitepapers bilingual. Field Notes language-of-source.

### 6.9 Resources (/resources)

- **Pod-vs-Hire Calculator** (interactive React; user inputs role + city + seniority → side-by-side vs niogod tier; PDF version email-gated).
- **DACH Deep Tech Engineering Hiring Benchmark 2026** (annual original-research PDF, ungated cover + email-gated dataset).
- **The German Compliance Pack** (AVV / MSA / IP assignment templates + AÜG one-pager, heavily gated).
- **Pod Composition Worksheet** (Notion + PDF, emailed post-discovery call).

### 6.10 Careers (/careers)

Audience = Indian engineers; design language identical, German clients also read this to gauge engineer caliber.

Hero (EN): *Engineer for the world's most demanding deep-tech buyers.*
Sub: *niogod™ deploys senior Indian engineering talent into DACH deep-tech mandates under institutional Werkvertrag protocols. We do not place freelancers. We engineer pods.*

Sections: Who we hire (IIT/BITS/IIIT/NIT/ISI/IISc, 3–15 yrs, English C1+, German A2+ a plus) · How we work (long-term Werkvertrag assignments, integrated cadence with Projektleiter, no client-direct freelance, no time-tracking, outcome-based) · Open mandates (live list tagged by vertical) · Compensation philosophy (upper-decile Indian market) · Process (mirror of the five-stage vetting). CTA: `Apply` / `Zur Bewerbung`.

### 6.11 Kontakt (/kontakt)

Two columns.

- **Left:** *Buchen Sie ein 30-minütiges Strategiegespräch mit unserem DACH Liaison. Ergebnis: ein auf Ihren Tech-Stack zugeschnittener R&D-Intelligence-Bericht binnen 5 Werktagen.* + Cal.com / Calendly embed (DSGVO/TTDSG consent-gated).
- **Right:** qualifying form (Name, Firma, Rolle, Vertikale, kurze Beschreibung) → HubSpot. Below: Stuttgart address, Indian operating-entity ID, `hello@niogod.com`, Impressum link.

Confirmation page post-submit: single screen confirming booking, restating Compliance Shield, offering AÜG-Whitepaper as thank-you download.

### 6.12 Legal (mandatory for DACH)

- `/legal/impressum` per §5 TMG. Failure exposes business to Abmahnung (€500–€5,000/case). Must include: legal name + form, registered office (physical address, no PO box), authorized representative(s), email + phone (phone required), commercial register number (Indian CIN until German HRB available), VAT ID (USt-IdNr or Indian GSTIN), regulatory authority statement. Linked from every page footer.
- `/legal/datenschutz` — full DSGVO Art. 13/14 disclosure listing every cookie, processor, data flow including Vercel, Sanity, HubSpot, Cal.com, Plausible. EN + DE; DE legally binding.
- `/legal/agb` — standard B2B terms; Gerichtsstand Stuttgart.
- `/legal/cookies` — companion to the consent management platform.

---

## 7. UI Patterns (use exactly these, nothing else)

| Pattern | Use it for | Avoid it for |
|---|---|---|
| Dark hero + light text + thin schematic | Homepage, all vertical pages, Compliance Shield, Protocol | Forms, content pages |
| Bento grid (4 / 6 / 9-tile variants) | Pod composition, Verticals index, Protocol phases, Intelligence index | Long-form content, case-study narratives |
| Datasheet card (white card, mono headers, JetBrains Mono labels, hard borders) | Cost calculator, role specs, comparison tables | Hero sections |
| Vertical timeline schematic | Protocol page, case-study deployment narratives | Marketing flow |
| Comparison table | Compliance Shield, "What we are not" | Anywhere claiming subjective superiority |
| Pull quote in JetBrains Mono with `//` prefix | Doctrine statements, role mandates, principles | Customer quotes (use Inter italic) |
| Sticky thin top nav with HUD-style hover | Site-wide | — |
| Two-column long-form | Compliance Shield deep pages, About | Index pages |

---

## 8. Tech & Compliance Hygiene of the Site Itself

The site that sells Compliance Shield must itself be the cleanest DSGVO/TTDSG implementation in the category.

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 App Router (TypeScript) | Astro acceptable for pure marketing if no app surfaces planned |
| Hosting / CDN | Vercel Pro, region `fra1` (Frankfurt) | Or Cloudflare Pages EU-locked |
| CMS | MDX content collections in-repo (promote to Sanity EU dataset when editorial team grows) | Avoid WordPress, Webflow, Wix, Squarespace |
| i18n | `next-intl` with `/de/` (canonical) + `/` for EN, hreflang declared on every page | Sie-form everywhere, never du |
| Forms / CRM | HubSpot EU data center (or Pipedrive) | Document Art. 49 DSGVO basis carefully |
| Booking | Cal.com (self-hostable, EU) preferred over Calendly | DSGVO/TTDSG consent-gated iframe |
| Analytics | Plausible (EU) or Matomo — never GA4 | Cookieless, no banner needed for these |
| Consent management | Usercentrics or Cookiebot (German-anchored) | Required for any US-hosted tool |
| Spam protection | Cloudflare Turnstile | Avoid reCAPTCHA's DSGVO baggage |
| Email | Resend or Postmark with EU regions | Pair with React Email |
| File storage | Cloudflare R2 or Hetzner Storage Box | EU-resident, for whitepapers |
| Error monitoring | Sentry EU region | — |

Required hygiene: cookie banner before any third-party script (HubSpot, Calendly), Impressum linked from every page footer, Datenschutzerklärung covering every processor, AVV downloadable for prospects, server-side form processing (no client-side data leakage), `/.well-known/security.txt` per RFC 9116.

---

## 9. SEO & Content

### Keyword clusters and pillar mapping

| Cluster | Pillar | Initial 6 Briefings |
|---|---|---|
| Compliance & legal architecture (highest conversion) | `/compliance-shield` | "AÜG nach den BA-Weisungen 2024/2025", "Werkvertrag vs. Dienstvertrag bei IT-Dienstleistungen", "Scheinselbständigkeit für Deep-Tech-Founders erklärt", "EOR und das Inlandsbezug-Problem", "Was der Hauptzoll bei IT-Projekten prüft", "§266a StGB für Geschäftsführer von Tech-Startups" |
| Deep tech engineering capacity (mid-funnel) | `/the-pod` + `/verticals` | "Why a 3-person pod outperforms a single senior hire", "DACH deep-tech talent gap 2026", "Indian Tier-1 engineering, mapped", "Time-zone overlap for DACH-India delivery", "How to read a Werkvertrag for engineering deliverables", "When to choose a pod vs. a freelancer vs. an EOR" |
| Cost / decision (high conversion) | `/the-pod` (cost calculator) | "Total cost of ownership: senior engineer Munich vs. niogod pod", "What you actually pay a German freelancer (€140/hr decoded)", "30-day exit vs. 3-month Kündigungsfrist", "F&E Aufwand für Series A/B Deep Tech", "Equity dilution vs. service spend", "When to start a captive vs. when to take a pod" |
| Vertical-specific (lower volume, very high intent) | `/verticals/*` | one Briefing per vertical |

Top keywords to seed metadata: *managed engineering pod germany / deutschland · AÜG-konform Software Engineering · Werkvertrag Softwareentwicklung Indien · Scheinselbständigkeit vermeiden IT · virtueller Inlandsbezug AÜG · §1 AÜG Remote Mitarbeiter Ausland · DSGVO konforme offshore entwicklung · AVV vertrag offshore · embedded engineering team DACH · dediziertes entwicklungsteam deutschland · engineering as a service deep tech · deutschsprachige entwickler indien · forward deployed engineer · eor vs managed services germany · robotics software development germany · ai ml engineering services dach · biotech softwareentwicklung deutschland · sap s/4hana berater remote.*

DE = canonical (`/de/...`), EN at root with `hreflang` correctly declared.

---

## 10. Hard constraints — do not ship until all are true

- [ ] Every page exists in DE and EN with `hreflang`. DE is canonical and legally binding for legal pages.
- [ ] No stock photos of people. Only schematic line art, founder portraits, or licensed lab/hardware shots.
- [ ] No emoji anywhere in copy or UI.
- [ ] No exclamation marks.
- [ ] No "we / our / you'll love" startup voice. Third-person institutional throughout.
- [ ] All German legal terms (AÜG, Werkvertrag, Scheinselbständigkeit, Projektleiter, Statusfeststellungsverfahren, Auftragsverarbeitungsvertrag, Hauptzollamt, Fachliche Weisungen, BGB §631, §266a StGB) set in JetBrains Mono inside running text.
- [ ] Exactly two CTAs per page (primary + page-stage-tuned secondary).
- [ ] Sticky thin top nav, JetBrains Mono links, HUD-style hover.
- [ ] Pod is never rendered as three faces. Use the three-glyph schematic shield (Identity), the layered stack (Anatomy), or the three-node graph (Schematic).
- [ ] Cookie consent gates HubSpot, Calendly, and any other third-party script.
- [ ] Impressum linked from every page footer. Includes Stuttgart address and Indian operating-entity disclosure (Borcom Dynamics Pvt Ltd, U82990KL2023PTC084978).
- [ ] Lighthouse: Performance ≥95, Accessibility 100, SEO ≥95.
- [ ] Core Web Vitals at Frankfurt edge, mobile, simulated Fast 3G: LCP ≤1.8s, INP ≤150ms, CLS ≤0.05, TTFB ≤200ms.
- [ ] Total homepage weight ≤350KB including images.
- [ ] No render-blocking third-party scripts above the fold.
- [ ] `Organization`, `Service`, `FAQPage` schema on Home; appropriate schema on each vertical and case study.
- [ ] `/.well-known/security.txt` per RFC 9116.
- [ ] All compliance-page legal claims marked for review by a licensed German *Fachanwalt für Arbeitsrecht* with AÜG specialization before publication. The "AÜG-konform" claim is the most legally sensitive line on the site — treat it as a regulated claim, not a marketing claim.

---

## 11. Caveats to surface, not hide

- The "AÜG-konform" claim is a regulated claim. Do not publish until counsel signs the Mustervertrag.
- Cost benchmarks (€95k base, €150k fully loaded, €110–140/hr freelance) are 2024–2025 directional figures from Stepstone, levels.fyi, freelancermap Freelancer-Kompass 2025, NextLevelJobs.eu, Tribe DACH. Use ranges + footnotes on the calculator.
- Case-study claims must be verifiable. If only 1–2 real engagements exist at launch, lead with those. Do not fabricate anonymized cases.
- Reference set (Palantir, Anduril) has political baggage. Borrow *register* (institutional, technical, restrained), never *imagery* (no weapons, no surveillance motifs). Helsing and Quantum Systems are safer European references.
- Soften any "5M+ developer pool" / "top 1%" superlatives to "Tier-1 institutional alumni networks across India" until substantiated.

---

## 12. Now build it

Start by outputting the design system (tokens, type, components, motion). Then the homepage layout in code. Then page-by-page in the order listed in §3. After each page, run the §10 checklist and report green/red per item.
