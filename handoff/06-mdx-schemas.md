# 06 — MDX schemas

Two content types live in MDX: `/dossiers` (case studies) and `/insights` (long-form). Frontmatter is validated at build with Zod. If a frontmatter field is missing or malformed, the build fails. No "trust me" content makes it to production.

A third type, `/jobs` (JobPosting), uses the same MDX pipeline with a different schema.

## Frontmatter validation

`src/lib/mdx/schemas.ts`:

```ts
import { z } from "zod";

export const dossierFrontmatterSchema = z.object({
  // Identification
  title:        z.string().min(8).max(120),
  slug:         z.string().regex(/^[a-z0-9-]+$/),
  locale:       z.enum(["de", "en"]),

  // Procurement record header (renders into <DossierHeader>)
  industry:     z.string(),                    // "B2B SaaS", "Industrial IoT", "FinTech"
  arrBand:      z.enum(["<5M", "5-15M", "15-50M", "50M+"]),
  engineerCount: z.number().int().min(1),
  podComposition: z.object({
    projektleiter:   z.number().int().min(1).max(2),
    seniorConsultant: z.number().int().min(0),
    pilotEngineer:    z.number().int().min(0),
  }),
  einsatzDuration: z.string(),                 // e.g. "9 Monate, laufend" / "9 months, ongoing"
  dachRegion:      z.enum(["DE-Süd","DE-West","DE-Nord","DE-Ost","AT","CH"]),
  contractualBasis: z.enum(["§1 AÜG", "§631 BGB", "Mischform"]),

  // Outcome
  outcomeMetrics: z.array(z.object({
    label: z.string(),
    value: z.string(),                         // mono-rendered, never a percentage adjective
    note:  z.string().optional(),
  })).min(2).max(5),

  // Witnessed quote — required, not optional
  witnessedQuote: z.object({
    text:    z.string().min(40).max(400),
    attribution: z.object({
      role:    z.string(),                     // "CTO", "VPE", "Head of Engineering"
      company: z.string().or(z.literal("anonymisiert")),
      date:    z.string().regex(/^\d{4}-\d{2}$/), // YYYY-MM
    }),
    releaseSigned: z.literal(true),            // hard-required boolean — the dossier does not render without a signed release
  }),

  // Publication metadata
  publishedAt:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  reviewedBy:   z.string(),                    // initials of reviewer (e.g. "JJ")
  legalReleaseRef: z.string(),                 // internal ref to the signed release doc
});

export const insightFrontmatterSchema = z.object({
  title:        z.string().min(8).max(140),
  slug:         z.string().regex(/^[a-z0-9-]+$/),
  locale:       z.enum(["de", "en"]),

  cluster:      z.enum([
    "aug-werkvertrag",
    "scheinselbstaendigkeit",
    "dsgvo-drittland",
    "vergleich-wettbewerb",
    "tco-modelle",
  ]),

  intent:       z.enum(["primer", "decision-tree", "comparison", "case-pattern"]),

  estimatedReadingMinutes: z.number().int().min(2).max(40),

  // Authorship
  author:       z.string(),                    // single human, attributed
  reviewedBy:   z.array(z.string()).min(1),    // reviewers' initials
  legalReview:  z.object({
    required: z.boolean(),
    by:       z.string().optional(),           // name of Anwalt / DSB if required
    date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }),

  publishedAt:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

  // Citations — at least one external source for any factual claim
  citations:    z.array(z.object({
    label: z.string(),
    url:   z.string().url(),
    accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  })).min(1),

  // SEO
  description:  z.string().min(50).max(160),
  ogImage:      z.string().optional(),         // path under /public/og/

  // Pairing with the other locale (for hreflang)
  pairedSlug:   z.string().regex(/^[a-z0-9-]+$/), // slug in the other locale
});

export const jobFrontmatterSchema = z.object({
  title:        z.string(),
  slug:         z.string().regex(/^[a-z0-9-]+$/),
  locale:       z.enum(["de", "en"]),

  // schema.org/JobPosting required fields
  datePosted:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  validThrough: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACTOR"]),
  hiringOrganization: z.literal("niogod"),

  // Location
  jobLocationType: z.enum(["TELECOMMUTE", "ON_SITE", "HYBRID"]),
  applicantLocationRequirements: z.array(z.enum(["DE","AT","CH","IN","EU"])).min(1),

  // Compensation — show real ranges, no "competitive"
  baseSalary: z.object({
    currency: z.enum(["EUR","INR"]),
    minValue: z.number(),
    maxValue: z.number(),
    unitText: z.enum(["YEAR","MONTH"]),
  }),

  // Role data
  description:  z.string(),
  responsibilities: z.array(z.string()).min(3),
  qualifications:   z.array(z.string()).min(3),

  // Application
  applicationEmail: z.string().email(),
});
```

## Worked example — Dossier (DE)

`content/dossiers/de/2026-Q1-fintech-stuttgart.mdx`:

```mdx
---
title: "B2B FinTech, Stuttgart — Migration einer Kernbanken-Schnittstelle"
slug: "2026-q1-fintech-stuttgart"
locale: "de"

industry: "B2B FinTech"
arrBand: "5-15M"
engineerCount: 28
podComposition:
  projektleiter: 1
  seniorConsultant: 1
  pilotEngineer: 3
einsatzDuration: "9 Monate, laufend"
dachRegion: "DE-Süd"
contractualBasis: "§631 BGB"

outcomeMetrics:
  - label: "Zeit bis Pod-Einsatz"
    value: "T+72h"
    note: "ab gegengezeichnetem Briefing"
  - label: "Mean Time to First Production Commit"
    value: "T+9 Tage"
  - label: "Bestandscode-Coverage Steigerung"
    value: "62% → 81%"
  - label: "Defect-Escape-Rate (Q1 vs. Q4 vor Einsatz)"
    value: "−47%"

witnessedQuote:
  text: "Wir haben drei Anbieter geprüft. niogod war der einzige,
    der die Frage zu Scheinselbständigkeit ohne Marketing-Vokabular
    beantworten konnte."
  attribution:
    role: "VPE"
    company: "anonymisiert"
    date: "2026-04"
  releaseSigned: true

publishedAt: "2026-05-15"
reviewedBy: "JJ"
legalReleaseRef: "REL-2026-Q1-001"
---

## Briefing

[Body content here, in MDX. Renders inside <DossierTemplate>.]

## Vetting

...

## Allocation

...

## Einsatz

...

## Übergabe

...
```

## Worked example — Insight (DE)

`content/insights/de/aug-vs-werkvertrag-entscheidungsbaum.mdx`:

```mdx
---
title: "AÜG vs. Werkvertrag — ein Entscheidungsbaum für CTOs"
slug: "aug-vs-werkvertrag-entscheidungsbaum"
locale: "de"

cluster: "aug-werkvertrag"
intent: "decision-tree"
estimatedReadingMinutes: 12

author: "Joseph Jose"
reviewedBy: ["MM"]
legalReview:
  required: true
  by: "Müller PartG mbB, Stuttgart"
  date: "2026-05-20"

publishedAt: "2026-05-22"

citations:
  - label: "Arbeitnehmerüberlassungsgesetz (AÜG)"
    url: "https://www.gesetze-im-internet.de/a_g/"
    accessed: "2026-05-15"
  - label: "BAG Urteil 9 AZR 51/17"
    url: "https://www.bundesarbeitsgericht.de/..."
    accessed: "2026-05-15"

description: "Wann führt eine Werkvertrags-Konstruktion in die Arbeitnehmerüberlassung? Vier Kriterien, ein Entscheidungsbaum, fünf Fallstricke."

pairedSlug: "aug-vs-werkvertrag-decision-tree"
---

> Dieser Beitrag dient der Information und ersetzt keine Rechtsberatung.

## Die Ausgangslage

[Body here.]
```

## Worked example — Job

`content/jobs/de/projektleiter-stuttgart.mdx`:

```mdx
---
title: "Projektleiter Engineering — DACH Liaison, Stuttgart"
slug: "projektleiter-stuttgart"
locale: "de"

datePosted: "2026-05-03"
validThrough: "2026-08-03"
employmentType: "FULL_TIME"
hiringOrganization: "niogod"

jobLocationType: "HYBRID"
applicantLocationRequirements: ["DE"]

baseSalary:
  currency: "EUR"
  minValue: 95000
  maxValue: 135000
  unitText: "YEAR"

description: "Projektleiter unter deutschem Arbeitsrecht. Single point of accountability gegenüber dem Entleiher-VPE."
responsibilities:
  - "Eigentümer der Einsatz-Scope-Dokumentation"
  - "Equal-Pay-Compliance je Einsatz"
  - "Höchstüberlassungsdauer-Tracking gemäß §1 Abs. 1b AÜG"
qualifications:
  - "Mindestens 8 Jahre Engineering-Leitungserfahrung"
  - "Direkte Erfahrung mit Werkvertrag- oder AÜG-Konstellationen"
  - "Verhandlungssicheres Deutsch und Englisch"

applicationEmail: "karriere@niogod.de"
```

## Build-time enforcement

The MDX loader (`src/lib/mdx/load.ts`) calls the appropriate schema parser. If validation fails, it throws — and the Next.js build aborts. CI catches this on every PR. Result: malformed content cannot ship.

The `releaseSigned: literal(true)` on dossier frontmatter is the key one — a dossier without a checked-off legal release literally cannot be published. This is the institutional discipline the brief asks for at §5.3, encoded into the build.
