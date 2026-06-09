
# why.hypermaps.org — horizontal story deck

A single-page TanStack Start app: 9 full-viewport panels laid out left-to-right, advanced one at a time by wheel / drag / swipe / keyboard. The centerpiece is an interactive "Value Loop" diagram on Panel 2. Built in the Hypermaps light brand system.

## Scope

- One route: `/` (replace current placeholder `src/routes/index.tsx`).
- No backend, no auth, no forms — purely visual/interactive.
- Honors `prefers-reduced-motion` with a calm static fallback.
- Mobile + desktop responsive.

## Tech approach

- **Deck shell** (`src/components/deck/HorizontalDeck.tsx`): a fixed full-viewport container holding a flex row of 9 panels translated via `transform: translate3d(-index * 100vw, 0, 0)` with a calm cubic ease.
  - Input → "go to panel N":
    - Wheel: accumulate vertical+horizontal delta, debounce, snap.
    - Drag (pointer events): track pointer, follow finger, snap on release based on velocity + distance.
    - Touch swipe: same pointer handler covers it.
    - Keyboard: ←/→, PageUp/PageDown, Space/Shift+Space.
    - Edge click zones (left/right thirds, low z-index, only when hovering empty areas).
  - "Lock" API: panels can call `deck.lock()` / `deck.unlock()` so interaction inside the Value Loop doesn't flip panels; an explicit "next →" chip becomes visible when locked.
  - Affordances: thin top progress bar + bottom dot row (clickable), animated "next →" cue in the corner.
- **Continuous graph background** (`src/components/deck/GraphCanvas.tsx`): a single SVG sized to `9 * 100vw` living *behind* all panels (also translated with the deck) — fine teal points + thin lines that visibly cross panel boundaries and extend past edges. Gentle ambient drift via `requestAnimationFrame`; static when reduced-motion.
- **Panels** (`src/components/panels/Panel{1..9}.tsx`): each full-viewport, white, generous whitespace, small uppercase mono section tag (e.g. `THE VALUE LOOP`), big Space Grotesk headline, calm Inter body.
- **Value Loop anchor** (`src/components/value-loop/ValueLoop.tsx`):
  - SVG scene with Place Nodes (point + fanned translucent layers), partner-feed icons, oracle-agent glyphs, Reliability Rings with mono scores.
  - 3 question chips, flagship: *"Find all active construction sites on Earth."*
  - On click, runs a 4-stage animation (Framer Motion timelines):
    1. Indigo query mark travels from AI agent → Place Nodes + sources.
    2. Sources light up; agreement raises confidence; one new high-trust source adds unique value.
    3. Constellation of construction-site Place Nodes resolves.
    4. Amber reward marks flow *back* along lines; line weight + reward size scale with reliability score; mono per-source counters tally (`+42 ⬡`) and a total (`184 ⬡ distributed`).
  - Captions appear in sync with each stage.
  - While interacting, the deck is locked; an explicit "next →" advances.

## Design tokens

Replace `src/styles.css` palette with the Hypermaps light tokens. Add:

```
--paper-0 #FFFFFF, --paper-50 #F7F9FB, --paper-100 #EEF2F6, --line-200 #DCE3EC
--ink-900 #0C1322, --ink-600 #45506A, --ink-400 #7A879C
--place-teal #0EA5A0, --query-indigo #5B5BF0, --reward-amber #E8930C
--trust-high #0B8F8A, --trust-low #C4CDD9
```

Map to shadcn semantic tokens (background = paper-0, foreground = ink-900, primary = place-teal, etc.) so existing components still render correctly. Load Space Grotesk, Inter, IBM Plex Mono via Google Fonts `<link>` in `__root.tsx` head.

## Panel order (content lifted from the brief)

1. **Hook** — single teal point → constellation. Headline: *"Geospatial awareness for AGI."* Sub: *"Organizing the hidden layers of physical places for AI-ready use."*
2. **The Value Loop** (interactive anchor).
3. **One place, infinite depth** — single Place Node exploded to show layered data dimensions.
4. **Why it has to be open** — siloed-data framing.
5. **What Hypermaps is** — definition + two principles.
6. **Reliability is the currency of truth** — multiple sources answering, scores + agreement.
7. **The next wave it unlocks** — bright gallery of use cases.
8. **A rising tide** — contributor value, no fundraising language.
9. **Endgame & close** — densely connected planet, *"An open geospatial layer for humanity."*, links to github.com/hypermaps and hypermaps.org.

## Dependencies

- Add `framer-motion` for panel transitions, Value Loop staging, and reduced-motion handling.
- No other new dependencies; SVG hand-authored, no charting lib.

## SEO

- `head()` in `src/routes/index.tsx`: title `Why Hypermaps — An open geospatial layer for humanity`, meta description, OG/Twitter tags. Single H1 on Panel 1.

## Out of scope

- Real map tiles, real datasets, analytics, backend persistence, i18n.
- A second route — this is one URL.

## Open question

The brief is fully specified; I'll build the 9 panels and the interactive Value Loop in one pass. If you'd rather I ship Panels 1–2 first (hook + interactive anchor) and iterate on 3–9 after you've seen the feel, say so before I start — otherwise I'll do the whole deck.
