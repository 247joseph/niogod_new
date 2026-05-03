# 07 — Trust artifact procurement

This is the critical-path document. The website's commercial argument lives or dies on these artifacts. Every other file in the handoff plan is downstream of this one.

The brief lists ~25 artifacts in §5. None currently exist (per the user confirmation). This document sequences them — what to procure first, who owns each, what it costs, how long it takes, what blocks what.

All cost ranges are 2026 estimates for a small German service company; assume +20% for negotiation buffer.

## Critical path overview

```
T+0 ── German entity founded (UG zuerst, später GmbH-Umwandlung)
   │
   ├─→ T+30d ── HRB number, USt-IdNr., Geschäftsführer registered
   │     │
   │     ├─→ T+45d ── Bank account (Kontist or Penta), Steuerberater retained
   │     │
   │     ├─→ T+60d ── Berufshaftpflichtversicherung in force
   │     │
   │     ├─→ T+90d ── DSB on retainer, AVV reviewed, SCCs+TIA drafted
   │     │
   │     ├─→ T+120d ── AÜG-Erlaubnis-Antrag eingereicht (after first DSGVO posture review)
   │     │     │
   │     │     └─→ T+330d ── AÜG-Erlaubnis erteilt (typical 6-9 months from filing)
   │     │
   │     └─→ T+180d ── ISO 27001 audit kicked off
   │            │
   │            └─→ T+365d ── ISO 27001 certificate issued
   │
   └─→ Independent: anonymized client logos + dossier releases (rolling)
```

The single longest pole is **AÜG-Erlaubnis** (6-9 months from filing, and you cannot file until the German entity exists and a Datenschutz baseline is in place). This is why the brief's §10 includes the honest fallback to Werkvertrag — there is no faster path.

## Artifact register

### Tier 1 — Foundation (must exist before any AÜG claim)

#### 1. German legal entity (UG → GmbH)

| Field | Value |
|---|---|
| Owner | Joseph + Notar + Steuerberater |
| Cost | €300–700 (UG founding) + €1,500–3,000 Steuerberater Erstberatung; later €25k Stammkapital + ~€1,000 to convert UG → GmbH |
| Timeline | 2-4 weeks from notary appointment to HRB |
| Blocks | Almost everything below |
| Verifiable surface | Impressum + footer `<MonoIdentifier variant="hrb">` |
| Status at launch | ⛔ |

**Recommendation:** start with **Unternehmergesellschaft (UG haftungsbeschränkt)** — €1 minimum capital, identical operational character to GmbH for client purposes. Convert to GmbH at €25k retained earnings. Many institutional procurement teams accept "UG haftungsbeschränkt" without comment; some larger Mittelstand prefer GmbH. Have a roadmap statement ready.

**Domicile recommendation:** Stuttgart. Aligns with the §3.6 "Stuttgart DACH Liaison" claim. Notary cost identical to other cities.

#### 2. Bank account + Steuerberater

| Field | Value |
|---|---|
| Owner | Joseph |
| Cost | Bank: ~€20/month (Kontist or Penta). Steuerberater: ~€300–600/month for ongoing bookkeeping + Lohnabrechnung. |
| Timeline | 1-2 weeks after HRB |
| Blocks | Issuing real invoices, employee salaries |
| Status at launch | ⛔ |

#### 3. Datenschutzbeauftragter (external)

| Field | Value |
|---|---|
| Owner | Joseph signs retainer with a German DSB partnership |
| Cost | ~€200–500/month retainer (external DSB for a sub-30-employee company) |
| Timeline | 1 week to retain |
| Blocks | AVV review, Datenschutz page authoring, AÜG-Erlaubnis Antrag (DSGVO compliance is checked) |
| Verifiable surface | Datenschutz page contact block |
| Status at launch | ⛔ |

**Recommendation:** **Datenschutzexperte.de**, **intersoft consulting**, or a regional Stuttgart firm. Avoid US-headquartered DSB providers.

#### 4. Berufshaftpflichtversicherung

| Field | Value |
|---|---|
| Owner | Joseph + insurance broker |
| Cost | €1,500–4,500/year for €1–3M coverage limit (IT-Dienstleister Berufshaftpflicht) |
| Timeline | 2-4 weeks underwriting |
| Blocks | First client contract (most German Einkauf demands proof of cover) |
| Verifiable surface | Compliance Shield row + footer |
| Status at launch | ⛔ |

**Insurers to approach:** Hiscox, HDI, Allianz, Markel. Hiscox typically fastest for tech service companies.

### Tier 2 — DSGVO posture (prerequisite for client kickoffs)

#### 5. AVV / DPA template (DE + EN)

| Field | Value |
|---|---|
| Owner | DSB drafts, Joseph reviews |
| Cost | Included in DSB retainer if scoped; or one-off €800–1,500 for a competent template |
| Timeline | 2-4 weeks from DSB engagement |
| Blocks | First signed client contract |
| Verifiable surface | Compliance Shield download |
| Status at launch | ⛔ |

**Don't:** copy-paste a generic AVV from the web. The DSB's value here is signing off that the AVV reflects niogod's actual processing operations (which include Indian sub-processing — non-trivial).

#### 6. Standard Contractual Clauses + Transfer Impact Assessment (India)

| Field | Value |
|---|---|
| Owner | DSB + Joseph |
| Cost | €1,500–3,500 one-off (TIA is the substantive deliverable; SCCs are EU-Commission text plus party data) |
| Timeline | 4-6 weeks |
| Blocks | Any honest claim of "DSGVO + Drittland geregelt" on the homepage |
| Verifiable surface | Compliance Shield download (PDF) + one-page schematic |
| Status at launch | ⛔ |

**The TIA is the long-pole.** It documents: data categories transferred, recipient country (India) legal regime, encryption-in-transit + at-rest specifics, supplementary measures, ongoing monitoring. Schrems II requires this; EDPB Recommendations 01/2020 is the template.

#### 7. Auftragsverarbeiter-Liste

| Field | Value |
|---|---|
| Owner | Joseph (operational; DSB reviews) |
| Cost | 0 (config file in repo) |
| Timeline | 1 day to populate |
| Blocks | Nothing — but a missing list is a Datenschutz page red flag |
| Verifiable surface | Live HTML table on Compliance Shield, generated from `config/subprocessors.json` |
| Status at launch | ✅ can ship from day one if Joseph populates the YAML/JSON file |

This is the **easiest** big-name artifact to ship. Populate it with: Hetzner (hosting), Cloudflare (CDN/WAF), Resend or Plunk (email), Plausible (analytics), Borcom Dynamics Pvt Ltd (operational delivery), and any others as added.

#### 8. Pseudonymisierungs-Protokoll, Encryption-Posture, Incident-Response-SLA, Access-Control-Policy

| Field | Value |
|---|---|
| Owner | Joseph + DSB review |
| Cost | 0 if drafted internally + ~€300–600 DSB review |
| Timeline | 1 week to draft, 1 week to review |
| Status at launch | ✏️ (drafts), ⛔ (reviewed versions) |

These are written policies, not certifications. They can be drafted as one-page documents, reviewed by the DSB, published as PDFs in `public/artifacts/policies/`. Doing this in the first month is high-leverage trust signal.

### Tier 3 — AÜG (the big one)

#### 9. AÜG-Erlaubnis (Bundesagentur für Arbeit)

| Field | Value |
|---|---|
| Owner | Joseph + Anwalt für Arbeitsrecht |
| Cost | Antragsgebühr **~€1,000** (initial, 1-year limited Erlaubnis). After 3 years of clean operation, unbefristete Erlaubnis is grantable. Plus ~€2,000–4,000 lawyer fees for the Antrag preparation. |
| Timeline | **6–9 months** from filing to grant for first-time applicants. The clock does not start until application is complete. |
| Prerequisites | German entity active for ≥ 6 months (in practice; not strictly required by law but Bundesagentur looks at operational track record), Geschäftsführer Zuverlässigkeit (clean Gewerbezentralregister, no insolvencies), proof of fiscal capacity (Stammkapital + bank statements), DSGVO-compliant operations |
| Blocks | The *entire* AÜG marketing claim. Until granted, every AÜG token on the site stays amber `im Verfahren` or red `gap`. Operating as Verleiher without Erlaubnis is a §16 AÜG offense (fines, retroactive Festanstellung, criminal liability for repeat offenders). |
| Verifiable surface | Footer `<MonoIdentifier variant="aug-erlaubnis">`, Compliance Shield artifact row |
| Status at launch | ⛔ — Antrag not yet filed |

**Critical guidance:** until granted, the website **must not** say "AÜG-konform," "Erlaubnis vorhanden," or any wording a procurement reviewer or Behörde could read as a misrepresentation. The Werkvertrag interim posture (file 00) is the only safe path.

**Anwalt recommendation:** retain an **Anwalt für Arbeitsrecht with AÜG-Erlaubnis-Antrag-Erfahrung** specifically. Generalists frequently miss the §3 AÜG fiscal-capacity nuances and the operational evidence the Bundesagentur asks for. Stuttgart firms with this specialty include FPS, Menold Bezler.

#### 10. Equal-Pay-Mechanik, Höchstüberlassungsdauer-Tracking, Scheinselbständigkeits-Schutz, Werkvertrag-Abgrenzung policies

| Field | Value |
|---|---|
| Owner | Joseph + Anwalt für Arbeitsrecht |
| Cost | ~€1,500–3,000 lawyer fees for the four policies as a package |
| Timeline | 4-6 weeks |
| Status at launch | ⛔ — but can be drafted in parallel with Erlaubnis-Antrag preparation |

These policies *can* live on the Compliance Shield page before the Erlaubnis is granted, as institutional commitments. Frame them as "the operational discipline we apply, regardless of contractual basis." This is honest and useful.

### Tier 4 — Information security

#### 11. ISO 27001 certificate

| Field | Value |
|---|---|
| Owner | Joseph + ISO consultancy + certifying body |
| Cost | **€8,000–18,000** for a sub-30-employee shop, including consultancy + audit. Surveillance audits ~€3,000–5,000/year. |
| Timeline | **9–14 months** from kickoff to certificate. Stage 1 audit at ~6 months, Stage 2 at ~12 months. |
| Prerequisites | German entity, documented ISMS, asset register, risk treatment plan, ~12 months of evidence (audit log, training records, incident records) |
| Blocks | The §5.4 footer ISO logo. Every ISO mention on the Compliance Shield. |
| Verifiable surface | Compliance Shield download (PDF cert), footer trust band |
| Status at launch | ⛔ |

**Certifying body recommendation:** **DEKRA** or **DQS**. Both are German, both are widely recognized in Mittelstand procurement. TÜV is also acceptable. Avoid offshore certifying bodies — German procurement frequently questions them.

**Consultancy recommendation:** smaller German ISMS consultancies (e.g., **ISiCO**, **2B Advice**) ship faster than the big four for under-30 headcount.

**Interim posture:** publish a one-page **"ISO 27001 Roadmap"** PDF on the Compliance Shield page. State explicitly the audit kick-off date, Stage 1 target, Stage 2 target, certificate ETA. Procurement teams respect a credible roadmap; they react badly to silence.

#### 12. SOC 2 Type II

The brief lists this as gated. Recommendation: **do not pursue at launch**. SOC 2 is US-market signal. ISO 27001 is the European institutional equivalent and what your DACH buyer asks for. SOC 2 is a useful add when the first US-Mutter client demands it, but in 2026 it's the wrong first dollar.

#### 13. Penetration test cadence

| Field | Value |
|---|---|
| Owner | Joseph + pen-test vendor |
| Cost | €4,000–8,000 per test, annual cadence is the floor for ISO 27001 |
| Timeline | First test ~3 weeks; ongoing annual |
| Status at launch | ⛔ |

**Vendor recommendation:** German firms (**SySS GmbH**, **Cure53**, **HiSolutions**) — both for jurisdictional alignment and because their reports cite German legal/regulatory frameworks the procurement reviewer recognizes.

#### 14. AWS Frankfurt architecture diagram

| Field | Value |
|---|---|
| Owner | Joseph (or whoever sets up the data plane) |
| Cost | 0 (drawing) |
| Timeline | 1 day |
| Status at launch | ✅ can ship as soon as the actual AWS Frankfurt setup exists |

**Critical:** the brief's Compliance Shield (§7.2) lists "AWS Frankfurt processing" as the data residency claim. This implies AWS Frankfurt is actually in use. If the operational stack today is Hetzner only (per file 02), the diagram should show **Hetzner Falkenstein** as primary processing and AWS Frankfurt only for any specific service (e.g., Bedrock for AI features) that requires it. **Do not draw the diagram with services not in use** — that's the kind of misrepresentation that breaks trust on a single procurement call.

### Tier 5 — Social proof

#### 15. Anonymized client logos with industry/ARR/headcount tags

| Field | Value |
|---|---|
| Owner | Joseph |
| Cost | 0 |
| Timeline | Rolling — collect as engagements close |
| Status at launch | ⛔ — need 4-6 to populate the trust band |

The legacy site likely has some claims. Audit the legacy site (`/Desktop/niogod_new/index.html`, `case-studies.html`) and harvest anything genuine. For each: confirm with the client that anonymized industry tag + ARR band is publishable. Email is sufficient release for anonymized logos.

#### 16. Named client logos

| Field | Value |
|---|---|
| Owner | Joseph |
| Cost | 0 |
| Timeline | Rolling, slow |
| Status at launch | ⛔ |

Written permission required (email is fine). Many DACH B2B clients refuse named-logo use even when happy with the work — institutional reflex. Don't push.

#### 17. Einsatz-Dossiers (case studies)

| Field | Value |
|---|---|
| Owner | Joseph + content writer |
| Cost | ~€600–1,200 per dossier (writer fee + Joseph time) |
| Timeline | 2 weeks per dossier from client release |
| Status at launch | ⛔ — need ≥ 2 to populate /dossiers index |

The frontmatter schema (file 06) requires `releaseSigned: literal(true)` — this is enforced at build. Get the release email, save it as `legalReleaseRef`, then write.

### Tier 6 — Founder credibility

#### 18. B&W formal portrait of Joseph

| Field | Value |
|---|---|
| Owner | Joseph + photographer |
| Cost | €400–800 in Stuttgart |
| Timeline | 1 day |
| Status at launch | ⛔ |

**Recommendation:** a portrait studio that does **Bewerbungsfoto / Vorstandsfoto** quality, not a creative editorial shooter. The output should look like a Vorstandsbild from an annual report, not a tech-startup founder shot.

#### 19. LinkedIn DACH content trail

Already exists; the brief calls for a named link to it from /about. Action: confirm the LinkedIn URL is the right target and the content there is consistent with the website voice.

## Procurement sequencing — the realistic 12 months

| Month | Artifact ships | Cumulative on-site state |
|---|---|---|
| **M0 (now)** | Auftragsverarbeiter-Liste (config), Encryption posture (policy), Indian CIN (already exists) | Site launches with ~3 active tokens, ~6 amber pending, ~5 red gaps. Honest. |
| **M1** | UG founded → HRB, USt-IdNr. | Footer `<MonoIdentifier hrb=…>` activates; Impressum gets real values |
| **M1** | DSB retainer signed | Datenschutz page gets a real DSB contact; AVV review begins |
| **M2** | Bank account, Steuerberater, first invoices | (No site change; operational) |
| **M2** | Berufshaftpflicht in force | Compliance Shield artifact row activates |
| **M3** | AVV template DSB-reviewed and published | Compliance Shield download active |
| **M3-4** | SCCs + TIA published | DSGVO + Drittland token flips green; value prop #2 swaps to brief §8.2 verbatim |
| **M3-4** | First B&W portrait | /about page gets the founder image |
| **M4** | Pen-test #1 complete; ISO 27001 audit kicked off | Compliance Shield rows activate |
| **M4-5** | First 1-2 anonymized dossiers with client release | /dossiers index populates |
| **M4-5** | AÜG-Erlaubnis-Antrag filed | Status strip token: AÜG `Antrag eingereicht · 2026-09-15` |
| **M9-12** | AÜG-Erlaubnis erteilt | **Hero swaps to brief §8.1 verbatim**. Footer Erlaubnis-Nr. activates. The site finally matches the brief's intended voice in full. |
| **M12-14** | ISO 27001 Stage 2 passes, certificate issued | Footer trust band gets ISO mark; Compliance Shield row links to the cert PDF |

**Total artifact spend over 12 months: ~€25,000–55,000**, dominated by ISO 27001 and the Anwalt costs. Most of it is unavoidable for the brand position the brief stakes out.

## What this means strategically

The brief is a **24-month product**, not a 1-month build. The website rebuild and the trust artifact procurement are two halves of the same project, sequenced together. A team that ships the polished site without the artifact procurement plan will be walking back claims by month 3. A team that ships the honest interim site and procures relentlessly will, by month 12, look more institutional than any DACH competitor.

This is the moat. File 09 (sprint plan) sequences the engineering work to interlock with this artifact plan.
