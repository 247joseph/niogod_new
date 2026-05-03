# 05 — Content plan

Page-by-page status: what copy exists, what's missing, what's blocked on which artifact. The brief's §8 copy bank is the starting point, but several strings need rewriting against the reality check (file 00).

Legend: ✅ ready · ✏️ author needed · ⛔ blocked on artifact · ⚖️ legal review needed · 🔁 swap-back when artifact lands

## Site-wide

### Status strip (§5.6)

The single most-edited surface on the site. Driven by `config/status.json`. **Initial state at launch:**

```json
{
  "tokens": [
    { "label": "AÜG-Erlaubnis",  "state": "gap",     "value": "im Aufbau" },
    { "label": "Lieferung",       "state": "active",  "value": "Werkvertrag · §631 BGB" },
    { "label": "DSGVO",           "state": "pending", "value": "AVV in Erstellung" },
    { "label": "ISO 27001",       "state": "gap",     "value": "geplant Q4 2026" },
    { "label": "Letzte Prüfung",  "state": "active",  "value": "—" }
  ]
}
```

The team edits this file as artifacts ship. No code change. 🔁 every token swaps state when its artifact ships.

### Footer Impressum-summary block

Renders five `<MonoIdentifier>` stacked vertically. Reads from `config/status.json`. Same status states as above.

### Trust band

Empty at launch. ⛔ Blocked on:
- Anonymized client logos with industry/ARR/headcount tags ✏️ (need 4–6)
- Named client logos ⛔ (need written permission)
- Certifier marks ⛔ (Bundesagentur für Arbeit, ISO 27001 body, insurer)

**Interim fallback:** instead of a half-empty trust band, show a single-line monospaced statement on a hairline-ruled strip:

> `Operated under German law · Made in Stuttgart · Delivered from Bengaluru · Trust artifacts published as procured`

This is institutionally stronger than three faded placeholder logos.

### Cookie banner (§8.5)

✅ Copy ready in DE + EN. ⚖️ Final wording reviewed by DSB before launch. Klaro config in `src/lib/consent/klaro.config.ts`.

## `/` Homepage

| Section | Status | Notes |
|---|---|---|
| Status strip | ✅ | Driven by config |
| `<NavBar>` | ✅ | Per §7.1 |
| `<HeroPanel variant="werkvertrag-interim">` | ✅ | Copy from file 00 of this handoff |
| 🔁 `<HeroPanel variant="aug">` | ⛔ | Activates when AÜG-Erlaubnis granted; copy verbatim from §8.1 |
| `<TrustBand>` (interim line) | ✅ | Per fallback above |
| `<ValuePropTriad>` | ✏️ | See rewrite below |
| `<PodCompositionStrip>` | ✅ | Role definitions §8.3 |
| `<CalculatorTCO>` | ⛔ | Blocked on a defensible source for the input number. See note below. |
| `<ComplianceShieldPreview>` | ✅ | Tiles link to /compliance-shield with current artifact statuses |
| `<DossierPreviewPair>` | ⛔ | Hidden until ≥ 2 dossiers published |
| `<Footer>` | ✅ | Reads from config |

**Value prop triad rewrite (interim):**

```
DE:
1. Werkvertrag nach §631 BGB. Klare Abnahme, klare Haftung,
   keine Scheinselbständigkeit. AÜG-konforme Pod-Struktur in Vorbereitung.

2. DSGVO-Posture, dokumentiert. Verarbeitung in AWS Frankfurt geplant,
   Standardvertragsklauseln für indische Unterauftragsverarbeitung in
   Erstellung, Transfer Impact Assessment im Aufbau. AVV-Vorlage zur
   DSB-Prüfung.

3. Ein Projektleiter, eine Haftungskette. Ihr VPE briefed einen
   namentlich benannten Projektleiter. Der Pod liefert. Wir tragen
   die Werkvertrags-Haftung; die deutsche Verleiher-Struktur folgt.
```

🔁 Swap to §8.2 verbatim when AÜG-Erlaubnis is granted and AVV/SCCs/TIA are in place.

**Calculator note.** The TCO calculator needs a defensible input — typically "fully-loaded cost of a senior engineer in Germany including employer contributions, benefits, equipment, training, recruitment amortization." Sources to cite:

- Stepstone Gehaltsreport 2025 / 2026 (publicly available)
- Statistisches Bundesamt — Arbeitskosten (Code 62411)
- A specific pinned year (e.g., "Stand: 2026-Q1") and a one-line footnote with the source URL

Without a citation the calculator becomes "fake precision," which the brief explicitly forbids. ⛔ pending sourcing decision.

## `/protokoll` (DE) and `/protocol` (EN)

| Section | Status | Notes |
|---|---|---|
| Page intro paragraph | ✏️ | Need 60-80 word intro framing the 5-stage Einsatz lifecycle |
| `<EinsatzTimeline>` panels | ✅ | Stage names ready; per-stage owner/duration/artifact-label needs filling |
| §-citations on each stage | ✏️ | Specific §-references per stage need sign-off |
| `<TriangleSchematic>` | ✅ | Same SVG as homepage |
| Closing CTA | ✅ | Re-uses primary `<Button>` to /contact |

**Critical:** the timeline currently says "AÜG"-basis on every stage. Until Erlaubnis ships, the timeline must be authored with `BGB §631` basis on stages 3–5 (Allocation/Einsatz/Übergabe). 🔁

## `/compliance-shield`

The most-edited page over the next 6 months. Treat it as a **public artifact procurement roadmap** at launch.

| Column | Items | Status |
|---|---|---|
| Rechtssicherheit | AÜG-Erlaubnis, Berufshaftpflicht, Equal-Pay-Mechanik, Höchstüberlassungsdauer-Tracking, Scheinselbständigkeit-Schutz, Werkvertrag-Abgrenzung | All ⛔ amber `im Verfahren` or `in Erstellung` at launch. Copy explaining each policy is ✏️. |
| Datenschutz | AWS Frankfurt architecture, AVV-Vorlage, SCCs+TIA, Auftragsverarbeiter-Liste, Pseudonymisierungs-Protokoll, DSB contact | All ⛔. The Auftragsverarbeiter-Liste can be a populated `config/subprocessors.json` from day one — that's the easiest one to ship. |
| Informationssicherheit | ISO 27001, Pen-Test cadence, Incident-Response-SLA, Encryption posture, Access-control policy | All ⛔ except Encryption posture (✏️ — describable from current AWS/Hetzner choice without a certificate). |

Each `<ArtifactRow>` has three states:

- `active` — links to a downloadable artifact
- `pending` — shows ETA + owner ("AVV-Vorlage · Q3 2026 · DSB Müller PartG mbB")
- `gap` — shows the institutional commitment ("ISO 27001 · Audit geplant Q4 2026")

## `/pods`

| Section | Status | Notes |
|---|---|---|
| Page intro paragraph | ✏️ | 60-80 words framing the three-role pod structure |
| Three `<RoleCard>` | ✅ | Copy from §8.3. Projektleiter §-basis line: ✏️ "unter deutschem Arbeitsrecht (Festanstellung)" — but until the German entity exists, the Projektleiter is a contractor or employed elsewhere. ⛔ for full §-grade copy. |
| Pod composition matrix | ✏️ | Need to fill: typical Pilot Pod = 1+1+1, Squad = 1+1+3, Programm = 1+2+5 (or whatever the operational model is — needs Joseph's sign-off on the actual ratios) |
| Selection criteria 5-bullet | ✏️ | Need 5 institutional criteria per role |
| Default Einsatz scope per role | ✏️ | One paragraph per role |

## `/preise` (DE) and `/pricing` (EN)

| Section | Status | Notes |
|---|---|---|
| Three pricing bands | ⛔ | Joseph must sign off on the € ranges and what's included. The brief mandates indicative ranges visible (no "contact us"). |
| Per-band footnote | ✏️ | Format: "Inklusive: Projektleiter-Overhead, AVV-Geltungsbereich, deutsche USt-Behandlung. Exklusive: Reisekosten." |
| Pricing methodology link | ⛔ | Optional: a separate `/preise/methodik` page explaining how rates are constructed. Defer to v1.1. |

⚖️ Pricing strings reviewed by Steuerberater for USt language correctness.

## `/dossiers` (DE) and `/case-studies` (EN)

| Section | Status | Notes |
|---|---|---|
| Index page | ✅ structure | Empty state at launch ("Erste Dossiers in Vorbereitung — Q3 2026") |
| Detail pages | ⛔ | Need: 2× anonymized Einsatz with witnessed quote, written client release, header table data |

The dossier template is fixed (§5.3). The constraint is **getting written client release** for even anonymized form. Ask any current/former client; if no one consents, defer dossiers to whenever the first 2 do.

## `/insights`

| Topic cluster | Status | Author note |
|---|---|---|
| AÜG vs. Werkvertrag — Entscheidungsbaum | ✏️ | Authorable from public BAG Rechtsprechung + AÜG text. ~2,500 words. |
| Scheinselbständigkeit — fünf häufige Fehler | ✏️ | Authorable from §7 SGB IV + DRV criteria. ~2,000 words. |
| DSGVO + Indien — SCCs und TIA | ✏️ | Authorable from EDPB guidelines + Schrems II. ~3,000 words. **Important:** until SCCs are signed and TIA is documented, this article frames as "general guidance" not "what we do." |
| niogod vs. Hays / Senacor / Adesso | ✏️ | Comparison page. Tone: sober, factual, no shade. |
| niogod vs. Deel / Remote / Oyster | ✏️ | Same. |
| TCO model — In-house vs. Pod | ⛔ | Same blocker as the homepage calculator. |

⚖️ All insights involving legal advice need a footnote: "Dieser Beitrag dient der Information und ersetzt keine Rechtsberatung." Reviewed by IT-Anwalt before publication.

## `/regional`

| Section | Status | Notes |
|---|---|---|
| Stuttgart DACH Liaison | ⛔ | Need: actual office address (or co-working address with mail-receiving capacity), liaison person name + title |
| Bengaluru operational hub | ✅ | Borcom Dynamics Pvt Ltd address from existing CIN registration |
| `<ResidencyMap>` | ✅ | Static SVG; two pins, SCCs flow line |
| Working-hours overlap | ✅ | Static table: CET 09:00–18:00 vs. IST 12:30–21:30 = 5.5h overlap window |
| Data residency disclosure | ⛔ | Tied to AWS Frankfurt setup actually being operational |

## `/ueber-uns` (DE) and `/about` (EN)

| Section | Status | Notes |
|---|---|---|
| Founder portrait | ⛔ | Need: B&W formal portrait of Joseph Jose, single shot. ~€500 for a competent Stuttgart photographer. |
| Mandate paragraph | ✅ interim | §8.6 copy works as-is, with the AÜG sentence rewritten ("...AÜG-konforme Pods" → "...Engineering-Pods unter deutschem Werkvertragsrecht; AÜG-Verleiher-Struktur in Vorbereitung") 🔁 |
| German entity disclosure | ⛔ | Blocks on GmbH/UG founding |
| Indian entity disclosure | ✅ | CIN known, role disclosure ("operative Lieferung") ready |
| LinkedIn link | ✅ | Joseph's profile |
| Investor logos | ⛔ | If/when raised |

## `/karriere` (DE) and `/careers` (EN)

| Section | Status | Notes |
|---|---|---|
| Open roles list | ✏️ | Author 3–5 roles. Each role: a real `JobPosting` MDX file with frontmatter for schema.org markup. |
| Hiring philosophy paragraph | ✏️ | 100 words, sober |
| Application instructions | ✅ | Email-only at launch ("Bewerbung an karriere@niogod.de"). No third-party ATS. |

## `/kontakt` (DE) and `/contact` (EN)

| Section | Status | Notes |
|---|---|---|
| Six-field form | ✅ | Per §7.10 |
| Microcopy | ✅ | Per §8.4 |
| Form handler API route | ✅ | EU-routed Resend or Plunk |
| Spam protection | ✅ | Cloudflare Turnstile (EU plan) |
| Direct contact strip | ⛔ | Stuttgart liaison address + telephone — blocks on Stuttgart office |

## `/impressum`, `/datenschutz`, `/agb`, `/barrierefreiheit`

⚖️ ⛔ All four ENTIRELY pending German lawyer / DSB drafting. The handoff plan provides MDX files with placeholder structure; **content must come from a German Anwalt für IT-Recht** for Impressum + AGB and a German DSB for Datenschutz. BITV 2.0 Erklärung zur Barrierefreiheit needs an accessibility audit first; can be authored from the audit output.

**No `/legal.html` catch-all anywhere.** The legacy file gets 410-Gone'd at launch (file 10).

## Copy state summary

| State | Count |
|---|---|
| ✅ Ready to ship | ~12 surfaces |
| ✏️ Author needed (work for niogod team) | ~25 surfaces |
| ⛔ Artifact-blocked | ~18 surfaces |
| ⚖️ Legal review required | ~7 surfaces |
| 🔁 Swap-back when artifact lands | ~9 surfaces |

The single biggest writing job is the Compliance Shield page — the page that has the most surfaces is also the one most blocked on artifacts. The path: ship the page with `pending`/`gap` states for everything, then convert tokens as procurement closes. File 07 sequences the procurement.
