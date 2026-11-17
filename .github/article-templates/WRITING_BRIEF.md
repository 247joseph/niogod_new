# niogod Insights: writing brief

Audience: CTOs, VPs Engineering, founders and Mittelstand IT leads in Germany, Austria, Switzerland (Series A/B deep tech scaleups with 20 to 100 engineers, plus Mittelstand industrial and SAP shops).

## What niogod is (state only this, never invent more)
- niogod&trade; (always lowercase, with &trade; on first mention) is the brand of Borcom Dynamics Private Limited, India, with a DACH liaison in Stuttgart.
- Offering: managed remote engineering pods for DACH. A three-person pod: Projektleiter (C1 German, client-facing), Senior Consultant (architecture, quality), Pilot Engineer (delivery). Delivery from India (Bangalore).
- Contract structure: Werkvertrag (BGB §631) or Dienstvertrag (BGB §611) led delivery, built to stay outside Arbeitnehmerüberlassung (AÜG) and avoid Scheinselbständigkeit. Sprint-based Leistungsbeschreibung with acceptance criteria and Abnahme (BGB §640). Fixed monthly fee, priced around the cost of one German engineering hire.
- Verticals: AI/ML, robotics and autonomous systems, industrial software, medtech, defense/dual-use, SAP/enterprise.
- Existing site pages you may link to (relative from an article page): ../regional-advantage.html (the pod), ../security.html (compliance), ../protocol.html (72-hour deployment protocol), ../contact.html.

## Hard rules
1. Original writing only. You may look at competitor blogs (Indian offshore/dedicated-team vendors selling to Germany) for topic ideas, but never copy, paraphrase closely, or mirror their structure. Never name competitors.
2. No fabricated facts. No invented statistics, surveys, clients, case studies, testimonials, quotes, or "we helped company X". niogod has no public client references: do not imply any. If you use a number (salary ranges, statutes, dates, market data), verify it with WebSearch first or state it as an illustrative example clearly labelled ("illustrative calculation", "Beispielrechnung").
3. Legal accuracy. Cite statutes precisely (AÜG §1, §1 Abs. 1 Satz 2 AÜG on Eingliederung and Weisungsrecht, §9/§10 AÜG consequences, BGB §611/§611a/§631/§640, SGB IV §7 and §7a Statusfeststellungsverfahren, §266a StGB, DSGVO Art. 28 and Art. 44 ff. with Standardvertragsklauseln, §13b UStG reverse charge, MDR / IEC 62304 for medtech, EU dual-use regulation 2021/821). Use hedged, general language and on every legal/tax topic add one sentence noting it is general information, not legal or tax advice, placed just before the closing niogod paragraph (rule 10).
4. No em dashes and no en dashes anywhere (not "—", not "&mdash;", not "–", not "&ndash;"). Use periods, commas, colons or parentheses. Ranges: "3 bis 5" / "3 to 5".
5. European number format in German (1.200 EUR, 3,5 Stunden). In English use EUR and normal English digits.
6. Tone: institutional, clinical, precise, confident. Think Palantir/Celonis briefing, not a marketing blog. No emoji, no hype words ("revolutionary", "game-changer"), no exclamation marks.
7. German version: written natively in German (not a literal translation), formal Sie-form, correct German legal terms.
8. Each article must give the reader something concrete: a checklist, a decision framework, a comparison table, a calculation method, a clause pattern, or a step sequence.
9. Data-rich, like a quality business news portal. Every article must anchor its argument in current, verified data relevant to the topic, with at least 4 concrete figures, each verified via WebSearch in this run and attributed in prose to its source and year (for example "Bitkom counted 109.000 unfilled IT positions in 2025"). Draw on the macro picture where it fits: the DACH skilled-labour shortage (Bitkom, IW Köln, Bundesagentur für Arbeit, KfW), demographics and retirements, AI adoption and the EU AI Act, Industrie 4.0 / the fourth industrial revolution, DACH deep tech funding, wage and cost trends, India's engineering talent base (NASSCOM). Prefer the most recent figures available; never invent or round up a figure you could not verify.
10. End every article with a subtle niogod closing paragraph (2 to 3 sentences, inside body_html, as the final p). It must flow from the article's argument, describe the relevant niogod approach in one concrete sentence (for example the German-speaking Projektleiter, Werkvertrag structure with Abnahme, or pod model), and invite rather than sell (for example "This is the model niogod&trade; was built around." or "If this sits on your roadmap for next year, it is a conversation worth having early."). Never imply existing clients or track record. No hype, no discounts, no "contact us now". Do not mention niogod elsewhere more than once. The page adds its own consultation box below.

## Format
One JSON file per article, UTF-8, at the path you were given, named `<slug>.json`:

```
{
  "slug": "english-kebab-case-unique-descriptive",
  "kind_en": "Briefing | Field Note | Guide | Analysis",
  "kind_de": "Briefing | Field Note | Leitfaden | Analyse",
  "category_en": "short category, e.g. Compliance",
  "category_de": "kurze Kategorie, z. B. Compliance",
  "en": {"title": "...", "description": "meta description, 140 to 160 chars", "teaser": "1 sentence for cards", "body_html": "..."},
  "de": {"title": "...", "description": "...", "teaser": "...", "body_html": "..."}
}
```

- body_html: 900 to 1.300 words per language. Allowed tags only: p, h2, h3, ul, ol, li, strong, em, table, thead, tbody, tr, th, td, blockquote, a (internal links from the list above only). No h1, no inline styles, no scripts, no images.
- Open with a strong first paragraph that states the problem and the answer. Use h2 sections.
- Titles: specific and searchable (what a DACH CTO would type into Google), no clickbait, under 80 characters.

## After writing
Validate every file: `python3 -c "import json,sys; [json.load(open(f)) for f in sys.argv[1:]]" <files>` and `grep -lE "—|–|&mdash;|&ndash;" <files>` must print nothing. Fix and re-check until clean.
