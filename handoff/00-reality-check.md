# 00 — Reality check

**Read this before any other file.** It changes the homepage copy in §8 of the brief.

## The current state

You confirmed that **none of the trust artifacts in §5 of the brief currently exist**. That includes:

- No AÜG-Erlaubnis (issued or in process) from the Bundesagentur für Arbeit
- No German legal entity (no GmbH or UG, no HRB number, no USt-IdNr.)
- No AVV / DPA template signed off by a Datenschutzbeauftragter
- No Standard Contractual Clauses + Transfer Impact Assessment for India sub-processing
- No ISO 27001 certificate (and no audit underway)
- No Berufshaftpflichtversicherung
- No DSB on retainer
- No anonymized Einsatz-Dossiers ready to publish
- No named-client logos with permission

The Indian operating entity (Borcom Dynamics Pvt Ltd) does exist with a CIN. That is the only verifiable corporate fact today.

## What this means for the homepage

The brief's homepage hero (§8.1) reads:

> Institutionalisierte Remote-Entwicklung. Nach deutschem Recht.
> AÜG-konforme Pods … Erlaubnis Nr. ▢▢▢▢▢▢ …

**You cannot ship this string today.** Asserting AÜG-conformance without a granted Erlaubnis is, at best, misleading; at worst, it is a violation of §1 AÜG itself (operating Arbeitnehmerüberlassung without an Erlaubnis is a fineable offense and exposes both Verleiher and Entleiher to retroactive Festanstellung claims). The brief acknowledges this at §10 and §12: the honest fallback is **Werkvertrag nach §631 BGB**.

## The interim launch posture

The site that ships at T+0 must:

1. **Not claim AÜG-conformance anywhere on visible surfaces.** Remove the Erlaubnis-Nr. token from the hero. Replace with a Werkvertrag-basis statement.
2. **Disclose the operational geography honestly.** The visible footer says: *"Lieferung erfolgt durch Borcom Dynamics Pvt Ltd, Bengaluru. Vertragspartner ist [Werkvertragsnehmer]; deutsche Verleiher-Struktur in Vorbereitung."*
3. **Show the artifact stack as a roadmap, not as a delivered shield.** The Compliance Shield page (§7.2) becomes a **public roadmap** at launch: each artifact listed with its current status (`im Verfahren` / `in Erstellung` / `geplant Q3 2026`) and the verification document it will eventually link to.
4. **Not collect EU personal data through a US-routed form handler.** This is the cheapest mistake to make and the one most likely to draw a DSGVO complaint. The contact form must route through an EU data plane from day one (Formspark EU, Plunk, or self-hosted via Resend with EU-only routing).
5. **Not run any tracker before consent.** The Klaro banner with "Alle ablehnen" as the first button is the minimum. No Meta Pixel, LinkedIn Insight, Google Tag Manager, or Hotjar before opt-in. Verified by network-tab evidence per §10.5.

## The revised hero (interim, in DE)

```
Institutionalisierte Remote-Entwicklung. Werkvertrag nach §631 BGB.
Engineering-Pods — Projektleiter, Senior Consultant, Pilot Engineer —
einsatzbereit binnen 72 Stunden. Operative Lieferung in Bengaluru.
Deutsche Verleiher-Struktur (AÜG nach §1) im Aufbau — Status öffentlich
auf der Compliance-Shield-Seite.

[Erstgespräch buchen]   [Compliance-Roadmap einsehen]
```

Three changes from the brief's §8.1 hero:

- "AÜG-konform" → "Werkvertrag nach §631 BGB" in the H1.
- "Erlaubnis Nr. ▢▢▢▢▢▢" → "AÜG nach §1 im Aufbau".
- Secondary CTA shifts from "AÜG-Leitfaden herunterladen" (presumes you have authority on AÜG) to "Compliance-Roadmap einsehen" (presents the artifact stack as the institutional commitment).

When the Erlaubnis is granted, the hero swaps back to §8.1 verbatim. Same CMS field, same component, copy variant toggled by a feature flag. File 04 (component inventory) names this `<HeroPanel variant="aug" | "werkvertrag-interim" />`.

## What can launch now without risk

- The **shape** of the site — IA, navigation, footer structure, design system, page templates.
- The **Protocol** page (§7.3) — the 5-stage Einsatz lifecycle is true regardless of legal basis.
- The **Pods** page (§7.4) — role definitions and pod composition matrix are operational facts.
- The **About** page (§7.9) — founder portrait, mandate paragraph (with the AÜG sentence removed), Indian entity CIN disclosure.
- A **Compliance-Roadmap** version of the Compliance Shield page (§7.2) — every artifact listed with status, owner, ETA. This is institutionally stronger than concealing the gap.
- **Insights** (§7.7) — long-form on AÜG vs. Werkvertrag, Scheinselbständigkeit, DSGVO + India is content you can author from public sources without claiming credentials you don't have.
- **Impressum / Datenschutz / AGB / Barrierefreiheit** — these are legally required, must exist on day one, must be drafted by a German lawyer / DSB.

## What cannot launch until the artifact ships

| Page section | Blocked on |
|---|---|
| Hero with Erlaubnis-Nr. | AÜG-Erlaubnis granted by Bundesagentur für Arbeit |
| §8.2 value prop #1 ("AÜG-konform ab Tag 1") | Same |
| §8.2 value prop #2 ("AVV signed before kickoff") | AVV template DSB-reviewed |
| §8.2 value prop #3 ("we carry the Verleiher liability") | German GmbH founded + AÜG-Erlaubnis |
| Pricing page §7.5 with AÜG-fee apportionment | German entity + AÜG-Erlaubnis |
| Compliance Shield as a *shield* (vs. as a roadmap) | All artifacts in §5.1–5.4 |
| Dossiers index | At least 2 client-anonymization releases |
| Trust band with named client logos | Written permission from clients |

File 07 (`07-trust-artifact-procurement.md`) sequences the procurement of every artifact with realistic ETAs.

## Anti-pattern flags

The previous site appears to assert "EOR liability shield," "AÜG-compliant," and similar without the underlying credentials. The rebuild **must** strip every such claim from the legacy tree before relaunch. File 10 (`10-legacy-migration.md`) inventories the legacy strings to remove and the URLs to 410-Gone or 301.

A site that ships honest pending status on day one and converts each token to a real artifact link as procurement closes will, by month 6, look more institutional than a site that ships polished claims and walks them back when a client asks for the certificate. Honesty is the moat here. The brief gets this exactly right at §5.6 — this file just makes the consequence explicit given the current artifact state.
