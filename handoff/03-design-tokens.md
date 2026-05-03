# 03 — Design tokens (rationale)

The token JSON is the contract. This file explains the contract.

## How tokens flow into Tailwind 4

Tailwind 4 reads CSS variables natively. The pipeline:

1. `design/tokens.json` is the source of truth.
2. A small build script (`scripts/build-tokens.mjs`, ~40 LOC) reads tokens.json and emits `src/styles/tokens.css` as `:root { --niogod-ink: #0A0A0A; ... }`.
3. `src/styles/globals.css` imports `tokens.css` and exposes Tailwind utilities via `@theme inline { ... }` referencing the CSS variables.
4. Components reference Tailwind classes (`text-ink`, `bg-paper`, `font-display`, `text-3xl`, `tracking-tight`) — never hex codes.

**Never** hard-code colors or sizes in components. If a value is missing from the token file, the right move is to add it to `tokens.json` and rebuild — not to inline a hex.

## Color rationale

**Why `#F5F4EE` (paper-warm) and not `#FFFFFF`.** Pure white reads "tech SaaS" — bright, clinical, screen-native. The cream-shifted off-white reads "document" — paper, dossier, certificate. The brand is selling **procurement-grade artifacts**; the surface they're printed on should signal that. The shift is small (4-5% warmth) so contrast against `#0A0A0A` ink remains far above WCAG AA.

**Why `#0A0A0A` and not `#000`.** Pure black on warm paper produces a higher-contrast edge that the eye reads as harsh. `#0A0A0A` is what high-end print typography uses for body — it sits one notch back from the page surface and looks calmer at 17–18px body sizes.

**Why a single accent (`#B30E1A` sovereign red).** The brief allows one accent. Red carries authority in a German legal context — it's the color of the **Bundesadler** stamp on Erlaubnis documents and the **§** symbol convention in legal typesetting. Blue would signal "tech," teal would signal "SaaS," neither is right. Use red **only** on:

- The active live-status dot in the §5.6 status strip
- The primary CTA button border + text on hover/focus (CTA fill stays ink)
- The `§` mark in legal citations (optional, sparing)

It is **never** used on body text, headings, links inside prose, or decorative elements.

**Why amber + evergreen for status.** §5.6 mandates honest status disclosure. The token strip needs three states: active (green), in-process (amber), known-gap (red). All three colors have low saturation versions (`#C68A1E`, `#2E6B3F`, `#B30E1A`) that read as institutional rather than playful. Saturated browser-default green (`#22c55e`) and amber (`#f59e0b`) would look like a SaaS dashboard.

**No blue, no purple, no teal, no gradient.** Enforced by token absence. If a future contributor wants a blue link, they have to add a token and justify it in PR review.

## Typography rationale

**Display: condensed sans, all-caps, tight tracking.** The brand category — "Institutionalized Remote Engineering" — has display-typography precedents in Palantir, Anduril, Celonis, and German legal/government typesetting. All use condensed grotesks set tightly. A serif display would push the brand toward "law firm" or "consulting," neither of which is the position. A wide grotesk would push toward "tech startup."

**Söhne Breit** is the strongest match. Klim Type Foundry's catalog is closest to the institutional reference set. **GT America Condensed** is the next-best alternative; **Aktiv Grotesk Cd** the safest fallback. Avoid display fonts with quirky terminals (e.g., Druk, which looks editorial-fashion, or PP Right Grotesk, which looks startup-cool).

**Body: Inter Tight.** Inter Tight is Inter at 90% width — slightly more compressed than Inter without becoming display-condensed. Reads efficient and contemporary. Free under OFL, which removes a budget item. Pair with Söhne Breit so the contrast is "compressed display + compressed body" — visually unified.

**Mono: Berkeley Mono.** Berkeley Mono is the most institutional monospace shipping in 2026 — clean, slightly wide, very legible at 13px. The brand's identity *is* the mono — every Erlaubnis number, HRB, USt-IdNr., CIN, timestamp, and status string is in mono. The font has to work hard. JetBrains Mono is the free fallback and is acceptable; it reads slightly more "developer" than "institutional" but the difference is marginal at the sizes used.

**Body sizes: 17px mobile / 18px desktop.** The brief mandates these. They're at the upper end of what's typical for marketing sites and exactly right for procurement readers (CTOs, VPEs reading on a 27" monitor over coffee).

**Line height 1.55 body, 1.7 long-form.** 1.55 is generous for marketing copy; 1.7 reads as document-like for /insights. Both above the typical 1.4–1.5 to push the brand away from "dense SaaS landing page."

## Spacing rationale

**Section vertical rhythm: 96px mobile / 160px desktop.** The brief specifies 1.6×–2.0× a typical SaaS site (§6.5). Most SaaS sites use 64–96px desktop section padding. We use 160px. This is the single biggest visual lever — institutional sites breathe; cluttered sites pitch.

**12-column grid, 1280px max.** Standard. The 1280px cap is non-negotiable; wider hurts readability of the prose-heavy pages.

**Prose max 680px.** /insights and /dossiers cap text columns at 680px regardless of viewport. Long lines kill comprehension.

## Border + radius rationale

**Hairline 1px rules.** Used liberally — between sections, on table dividers, around the AÜG triangle schematic, on status-token edges. The institutional grammar is "ruled paper, not card stack."

**Maximum radius 2px.** Status tokens get a 2px radius (just enough to not look like a CSS bug). Everything else is square-cornered. Buttons, inputs, image containers, dossier headers — all square. Rounded corners signal "consumer app." The brand does not.

## Shadow + elevation rationale

**No shadows. Anywhere.** Drop shadows are the visual grammar of stacked cards, modals, hover-elevation — none of which the brand uses. If a section needs separation, use a hairline rule. If a component needs to feel distinct, change its background to `paper-shade-1`. Never a shadow.

## Motion rationale

**No motion on first paint. No scroll-jacking. No parallax. No section reveals.** The brief is explicit (§6.6) and the rationale is identity: institutional sites do not perform. Motion communicates "look at me." The brand communicates "read me."

The single allowed motion is a 120ms opacity fade on status tokens transitioning between states (e.g., when the AÜG token flips from amber `im Verfahren` to evergreen `aktiv`). That moment deserves the smallest possible visual acknowledgment because it's a real institutional event.

## What designers / engineers should do *next*

1. Open `tokens.json` and pick a real font procurement decision. Söhne Breit + Berkeley Mono is the recommendation; Inter Tight + JetBrains Mono is the free fallback. Whichever you pick, lock it in `tokens.json` and update `package.json` + `public/fonts/` accordingly.
2. Build the Figma library directly from the token file. Figma supports CSS variable tokens via the Tokens Studio plugin — paste `tokens.json` and the styles import.
3. Build the first component (`<MonoIdentifier />` from file 04) in code first, not in Figma. The mono identifier is the smallest surface that exercises every token category — color, type, spacing, border. If it looks right in code, the tokens are right.
