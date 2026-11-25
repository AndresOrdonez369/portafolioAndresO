---
name: Andrés Ordóñez-Bolaños — Portfolio
description: A career as a circuit board seen as a metaphysical landscape, and the same board as a flat schematic.
colors:
  night: "#0a0a1c"
  board: "#12122b"
  trace: "#2a2a63"
  phosphor: "#35f58a"
  phosphor-dim: "#1d8a52"
  gold: "#d9b45a"
  violet: "#7b5cff"
  magenta: "#ff4fa3"
  cyan: "#3fe6d6"
  blue: "#3d86ff"
  orange: "#ff6a3d"
  acid: "#f2e23a"
  silk: "#ecebff"
  mute: "#a3a5c9"
  faint: "#6d6f99"
typography:
  display:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.75rem, 1.5rem + 8.5vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(3.5rem, 2rem + 6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(4rem, 2.5rem + 5vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.85
  title:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.45rem, 1.2rem + 0.6vw, 1.85rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
  nameplate:
    fontFamily: "'Big Shoulders Display', 'Arial Narrow', sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    letterSpacing: "0.06em"
  subhead:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    letterSpacing: "-0.005em"
  role:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 1.15rem + 0.7vw, 1.8rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  control:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    letterSpacing: "0.01em"
  switch:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.02em"
  chip:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
  lead:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.6vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "'Familjen Grotesk', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  label:
    fontFamily: "'Martian Mono', ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    letterSpacing: "0.08em"
  quote:
    fontFamily: "'Bodoni Moda', Georgia, serif"
    fontSize: "clamp(1.1rem, 1rem + 0.35vw, 1.3rem)"
    fontWeight: 500
    lineHeight: 1.45
rounded:
  none: "0px"
  focus: "2px"
  pad: "50%"
spacing:
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  rail: "11rem"
  header: "4.5rem"
  cluster: "0.75rem"
  chip-gap: "0.45rem"
  grid-gap: "clamp(1rem, 2vw, 1.5rem)"
  section-sub: "3.5rem"
  chapter-top: "clamp(6rem, 14vh, 10rem)"
  panel-top: "clamp(3rem, 8vh, 5.5rem)"
components:
  button-pad:
    backgroundColor: "{colors.night}"
    textColor: "{colors.silk}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.15rem"
    height: "2.875rem"
  button-pad-hover:
    backgroundColor: "{colors.silk}"
    textColor: "{colors.night}"
  button-primary:
    backgroundColor: "{colors.phosphor}"
    textColor: "{colors.night}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.15rem"
    height: "2.875rem"
  button-primary-hover:
    backgroundColor: "{colors.silk}"
    textColor: "{colors.night}"
  switch-segment:
    backgroundColor: "{colors.night}"
    textColor: "{colors.mute}"
    typography: "{typography.switch}"
    rounded: "{rounded.none}"
    padding: "0 0.9rem"
    height: "2.875rem"
  switch-segment-active:
    backgroundColor: "{colors.phosphor}"
    textColor: "{colors.night}"
  skill-chip:
    backgroundColor: "{colors.night}"
    textColor: "{colors.silk}"
    typography: "{typography.chip}"
    rounded: "{rounded.none}"
    padding: "0.35rem 0.7rem"
  code-chip:
    textColor: "{colors.phosphor}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.45rem 0.7rem"
  project-tile:
    backgroundColor: "{colors.board}"
    textColor: "{colors.silk}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "1.1rem 1.2rem 1.2rem"
  play-pad:
    backgroundColor: "{colors.phosphor}"
    textColor: "{colors.night}"
    rounded: "{rounded.pad}"
    size: "4rem"
  schematic-block:
    backgroundColor: "{colors.board}"
    textColor: "{colors.silk}"
    rounded: "{rounded.none}"
    padding: "1.1rem 1.2rem 1.25rem"
---

# Design System: Andrés Ordóñez-Bolaños — Portfolio

## Overview

**Creative North Star: "Map and Territory"**

The site is a printed circuit board under a violet dream sky. In TERRITORY the board is a full-bleed WebGL landscape receding to a magenta horizon, lit by a low sun that throws long shadows; surreal iridescent objects (a knight, a door frame, a melted block, a lens, a copper mirror) stand on matte solder mask, and a hero chip stands on its edge with a lid that cycles through every shipped game. In MAP the same content lies flat as a schematic sheet: rectangular blocks joined by orthogonal nets on a dotted grid. Every surface belongs to one of those two readings, and the switch between them is the signature interaction.

The interface is printed on the board, not floated over it. The big legends are silkscreen: condensed, uppercase, heavy, used for the name, chapter titles, game titles, and the numbers that carry the argument. Everything a reader has to parse quickly (subheads, roles, buttons, switches, chips, captions) is a sturdy grotesk at 600. Data is set like reference designators, small but never below the legibility floor. Phosphor green is the live signal; ENIG gold appears only where something was recognized; the self-portrait spectrum is paint that marks chapters and art, never the voice of reading text. Density alternates by design: a calm stage where the camera holds on open 3D, then a dense, full-bleed panel of facts led by art.

**Key Characteristics:**
- Indigo-night solder mask with phosphor silkscreen; dark-only (`color-scheme: dark`).
- Square geometry everywhere; circles only for pads, vias, status dots, and the round phosphor play pad.
- Four typefaces with strict jobs: silkscreen display for legends and figures, a grotesk for reading and every control, a designator mono for data, a Didone italic for other voices.
- Each chapter carries one spectrum tint, exposed as `--tint`, that colors its rail dot, heading underline bar, designators, and panel edge.
- Shipped work is shown art-first in square-cornered tiles, with a typographic poster where no art exists.
- Scroll drives a signal pulse along the board traces and a camera rail between stations.
- WebGL is optional; MAP and a CSS poster carry the full content without it.

## Colors

A near-black indigo board, one green signal, one gold reward, and six paint colors held back for chapter identity and art.

### Primary
- **Phosphor Silkscreen** (phosphor): the live signal. Primary button fill, active switch segment, the round play pad on every video facade, the name in the first viewport, the lit trace in the shader, the "live" status dot and its label, focus ring, selection, caret, link hover, code chips, BOM designators, pillar bullet markers, the probe's leader and anchor. It is the only color that means "act here" or "this is live".
- **Dim Phosphor** (phosphor-dim): the console's outline only; a quieter phosphor where a full-strength border would shout. Hero and pillar chips mix phosphor at 35% into trace for the same quiet edge.

### Secondary
- **ENIG Gold** (gold): recognition only. The Recognition chapter tint and its joint rows (gold hairlines at 40% and 22%, gold year and result, a radial-gradient solder bead before each result), case-study award lists, gold pads and solder beads in 3D.

### Tertiary
The self-portrait spectrum, used as chapter tints and paint:
- **Horizon Magenta** (magenta): Simulacra (shipped games) tint, industry case-study tint, the games pillar figure, horizon glow in the sky shader, console error text.
- **Electric Blue** (blue): The Virtual (research, XR, art) tint, XR/art case-study tint, tiles without a board ref, publication out-link icons. A lifted relative (#7aa8ff) sets the research pillar figure where the base blue is too dark at display size.
- **Dream Violet** (violet): Time chapter tint and web case-study tint; experience nets in MAP. A lifted relative (#b6a4ff) sets past timeline dates. The sky's mid band and hemisphere light are violet relatives.
- **Lens Cyan** (cyan): Seeing (teaching) tint, the teaching pillar figure, teaching nets, file icons, teaching org names, the lens's emissive glass.
- **Portrait Orange** (orange): Becoming tint, education nets, the life-philosophy quotes' 25% tint mix.
- **Acid Yellow** (acid): paint only, in the 3D environment bands and melted-trace drips.

### Neutral
- **Night** (night): page ground, header and panel fields (70 to 95% via `color-mix`), tile media wells, text on phosphor fills, theme color.
- **Solder Mask** (board): project tiles, schematic blocks, portrait stage. The 3D tile is a lighter relative (#16163c) with #1d1d4a grid lines.
- **Copper Trace** (trace): every hairline: rules, tile and image frames, list dividers, switch outlines, scrollbar thumb, rail spine, dotted grids. The unlit trace color in the shader.
- **Silk** (silk): headings, titles, chips, and primary reading text.
- **Mute** (mute): secondary reading text, summaries, tile meta, captions, inactive switch labels.
- **Faint** (faint): designators, sources, footers, rail numbers, figure captions.

### Named Rules
**The Gold Is Earned Rule.** Gold marks recognition (awards, nominations, medals) and nothing else. If an element is not an honor, it is not gold.

**The One Signal Rule.** Phosphor is the only action and live-state color. A second CTA color does not exist; secondary actions are outlined pads in silk, and every play control is a phosphor pad.

**The Paint Not Voice Rule.** Spectrum colors are chapter tints and paint: rail dots, the 3.5rem heading bar, panel top edges, net lines, icons, tile hover edges, poster washes, pillar figures, small mono designators, short org labels, and the quotes' 25 to 30% tint mix. Reading text (body, leads, summaries, tile meta) is never set in a spectrum color.

**The Chapter Tint Rule.** A chapter sets exactly one `--tint`; all its chrome (rail dot, heading bar, panel edge, designators) derives from it. Content inside a chapter may borrow another chapter's tint only to point at that chapter's evidence, as the capability figures do.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow), weights 700, 800, and 900
**Body Font:** Familjen Grotesk (with system-ui), weights 400 and 600
**Label/Mono Font:** Martian Mono (with ui-monospace), weights 400 and 600
**Quote Font:** Bodoni Moda italic 500 (with Georgia)

**Character:** Condensed silkscreen capitals carry the legends and the big numbers; a warm, sturdy grotesk carries every sentence, every mid-level heading, and every control; a wide mono stamps designators and dates like a board legend; a Didone italic arrives only when someone else is speaking.

### Hierarchy
- **Display** (900, clamp(3.75rem, 1.5rem + 8.5vw, 9rem), 0.82, -0.02em): the name in the first viewport, phosphor with a soft 40px phosphor glow; second line at 0.62em in silk.
- **Headline** (900, clamp(3.5rem, 2rem + 6vw, 6rem), 0.92, uppercase): chapter titles over the stage, followed by a 3.5rem by 3px tint bar; the Mirror title. Case-study h1 runs clamp(3rem, 1.6rem + 5.5vw, 6rem) at 18ch.
- **Figure** (900, clamp(4rem, 2.5rem + 5vw, 7.5rem), 0.85): capability pillar numbers. Smaller relatives at 900: the probe total (2.6rem), case readouts (clamp(2.5rem, 1.8rem + 2vw, 3.75rem), tabular), the Mirror email (clamp(2rem, 0.8rem + 3.4vw, 4rem)).
- **Title** (800, clamp(1.45rem, 1.2rem + 0.6vw, 1.85rem), 1, 0.01em, uppercase): tile and game titles; lead tiles run clamp(2rem, 1.4rem + 1.6vw, 3rem); pillar titles clamp(1.8rem, 1.3rem + 1.5vw, 2.6rem); the probe's cycling game title 1.5rem. Recognition rows set the same voice at 700, clamp(1.5rem, 1.1rem + 1.3vw, 2.4rem); poster fallbacks at 900.
- **Nameplate** (700, 0.95 to 1.25rem, 0.04 to 0.06em, uppercase): the brand name, rail titles, the hero role line, MAP block headings and MAP game rows.
- **Subhead** (Familjen 600, 1.375rem, -0.005em): mid-level headings inside panels, 3.5rem above and 1.1rem below.
- **Role** (Familjen 600, clamp(1.35rem, 1.15rem + 0.7vw, 1.8rem), 1.15, -0.01em, sentence case): timeline roles; teaching roles at clamp(1.2rem, 1.05rem + 0.5vw, 1.5rem), 1.2.
- **Control** (Familjen 600, 0.9375rem, 0.01em, sentence case): every button. Compact MAP buttons at 0.875rem.
- **Switch** (Familjen 600, 0.875rem, 0.02em, uppercase): header segment labels (MAP/TERRITORY, EN/ES).
- **Chip** (Familjen 600, 0.875rem): hero skill chips and pillar stack chips.
- **Lead** (400, clamp(1.25rem, 1.05rem + 0.6vw, 1.6rem), 1.35): the chapter line under each heading, max 36ch. Case summaries and the bio lead are close relatives (1.45 to 1.5 line-height).
- **Body** (400, clamp(1rem, 0.95rem + 0.2vw, 1.125rem), 1.6): all reading copy, 34 to 44rem measures, `text-wrap: pretty`. Tile meta and secondary detail at 0.9375rem.
- **Caption** (400, 0.8125 to 0.875rem): quote citations, figure captions, sources, probe sub-lines, platform lists.
- **Label** (Martian Mono 400 to 600, 0.6875rem minimum, 0.08em, uppercase, tabular numerals): designators, dates, refs, metric sources, BOM refs and table headers (0.1em), island codes (600, 0.75rem, 0.14em).
- **Quote** (italic 500, clamp(1.1rem, 1rem + 0.35vw, 1.3rem), 1.45): chapter epigraphs in silk mixed with 30% of the tint; life-philosophy quotes at 1.15rem; art and study titles.

### Named Rules
**The Silkscreen Rule.** Big Shoulders Display is the printed legend, always uppercase: the name, chapter titles, game and tile titles, pillar figures and readout numerals, recognition rows, the brand, rail titles, and MAP block headings. Below that level (subheads, roles, buttons, switches, chips, captions) the voice is Familjen Grotesk 600. Condensed caps never carry a control or a mid-level heading.

**The Designator Rule.** Martian Mono is for designators, dates, and data only: refs, years, ranges, metric sources, island codes, table headers, the console. Never for sentences, headings, or labels a reader must parse as words.

**The Legibility Floor Rule.** Martian Mono never renders below 0.6875rem and always tracks at least 0.08em. If a designator does not fit at that size, it moves or wraps; it does not shrink.

**The Someone Else Speaking Rule.** Bodoni Moda italic is reserved for quotations and the titles of art works and studies (the gallery's wall-label voice). Never for UI or the owner's own copy.

## Layout

The home page is a vertical sequence of nine chapters over a fixed WebGL canvas, in this order: Boot, Capabilities, Simulacra, Recognition, Virtual, Time, Seeing, Becoming, Mirror. Boot and Mirror are full-viewport stages; every other chapter is a **stage** then a **panel**:

- **Stage:** the heading block (max 44rem, min-height min(72vh, 46rem), vertically centered; Recognition min(56vh, 34rem)) sits on a left-to-right night gradient (92% to 78% at 46%, transparent by 72%) so text never lands on busy 3D. The camera holds at the chapter's station in the open area to the right. Below 900px the gradient becomes a flat night 72% field.
- **Panel:** dense content on a full-bleed field of night at 95% (84% for the lighter Recognition panel), with a 1px top edge in the chapter tint at 35%. Content max width 78 to 84rem; narrower reading blocks at 52rem.

Boot holds the name, role, intro, a wrapping row of skill chips (0.45rem gap, max 36rem), and the action cluster; the probe readout hangs top-right. Chapter padding: clamp(6rem, 14vh, 10rem) top, left offset = gutter + rail (11rem) + 2.5rem to clear the fixed chapter rail. The rail and that offset drop below 1100px.

Work grids: the Simulacra **bento** is 6 columns (gap clamp(1rem, 2vw, 1.5rem), max 84rem) where standard tiles span 2 and lead tiles span 3; all tiles span 3 below 1100px and the full row below 640px. Virtual uses an auto-fill grid (min 17rem) where portrait tiles span two rows beside a study figure; Time's web work uses auto-fill at min 15rem. Capability **pillars** are trace-ruled rows of figure (0.8fr) and body (1.4fr), stacking at 900px. Lists are ruled tables: hairline-divided rows with fixed mono columns (4.5 to 7.5rem) and a fluid title column; Seeing and Becoming are two-column and stack at 900px. Clustered actions use a 0.75rem gap.

MAP is a 12-column schematic sheet (max 96rem) on a 24px dot grid; blocks span 3 to 7 columns, become 6 below 1100px and full width below 700px, where nets are hidden. Case pages use the same dot grid behind an 84rem column: a header, an art hero or video facades (one 16:9 at up to 60rem, or 2fr/1fr when several, vertical videos 9:16 at max 22rem), then a 20rem spec sidebar beside the body, stacking at 800px.

## Elevation & Depth

Interface depth is tonal, not lifted: translucent night fields (`color-mix` 70 to 95%) over the 3D, separated by trace hairlines. The only lift is a response to state on project tiles. The real depth lives in the WebGL world: exponential violet fog (#3a1d5e), ACES filmic tone mapping, a low warm sun (#ffc2a8) casting long soft shadows toward the viewer, and a violet hemisphere light.

### Shadow Vocabulary
- **Art drop** (`box-shadow: 0 40px 80px -40px rgb(0 0 0 / 0.9)`): under the case hero; the Becoming portrait uses `0 40px 70px -40px` at 0.95 and its inset `0 20px 40px -20px`.
- **Tile lift** (`box-shadow: 0 24px 40px -24px rgb(0 0 0 / 0.9)` with `translateY(-3px)`): project tiles on hover and focus-within only.
- **Console float** (`box-shadow: 0 24px 60px -20px rgb(0 0 0 / 0.8)`): the console dialog only.
- **Phosphor glow** (`box-shadow: 0 0 12px var(--phosphor)`): the live status dot and the probe's anchor pad; the name's `text-shadow: 0 0 40px` phosphor at 25%.
- **Pad halo** (`box-shadow: 0 0 0 4px` tint at 20%): the active chapter-rail dot. The play pad carries the same ring in phosphor at 25% (8px on tiles, 10px on case pages), widening to 12px at 30% on hover.

### 3D Material Language
- **Matte board:** solder mask tile with grid and vias (roughness 0.82, metalness 0.15); component bodies and monoliths are matte indigo (roughness 0.5 to 0.8).
- **Iridescent dream objects:** physical material with metalness 0.92, roughness 0.05 to 0.28, full iridescence (IOR 1.7, thickness 180 to 980nm) and clearcoat, tinted near-white or with paint. The environment map is the sky plus seven spectrum paint bands, so reflections carry the portrait spectrum.
- **Gold and copper:** gold pads and joints are full-metal (roughness 0.28 to 0.32); the mirror is polished copper (roughness 0.035) holding a live Reflector plane tinted #d9a585 that renders only near the final station.
- **Signal traces:** a custom shader mixes trace to phosphor; the main signal lights everything behind its head and burns at the head; side traces carry small travelling pulses; the pointer adds a phosphor pool of light.
- **Hero lid:** the standing hero chip's lid is a screen of game key art, cover-fitted to the lid's aspect. Every 4.5s it switches over 0.9s with a banded signal glitch: 22 horizontal bands wipe with staggered random delays, a per-band horizontal shear up to 0.06 that peaks mid-transition, a small red-channel offset, and sparse phosphor scanline flashes.

### Named Rules
**The Matte Versus Dream Rule.** The board and its components are matte; only surreal objects shine. Never make the board glossy or a dream object matte.

## Shapes

Rectangles with square corners (0px) for every container, tile, button, chip, image frame, video frame, switch, and block. Borders are 1px hairlines; accent edges are 2 to 3px solid bars (schematic block top in its net color, heading underline). Circles appear only as board features: rail dots, status dots, solder beads, the probe anchor, pads, vias, and the round phosphor play pad. Code chips use a dashed phosphor outline that turns solid once copied; the probe uses a dashed phosphor leader and a dashed rule. Icons are an authored set on a 24px grid, 1.5 stroke, square caps and miter joins, drawn like traces. MAP nets are orthogonal (horizontal and vertical segments only) with 3.5px pad circles at each end.

## Components

### Buttons
Silkscreen pads: square, outlined, legible.
- **Shape:** square (0px), min-height 2.875rem, padding 0.7rem 1.15rem, 0.6rem icon gap, 1rem icons.
- **Pad (default):** Familjen 600 0.9375rem in silk, 1px border of the text color at 45%, night at 70% fill. Hover floods with the text color and flips text to night.
- **Primary:** phosphor fill, night text; hover flips to silk fill. One primary per cluster (See work in Boot, Contact in the header, Email me in Mirror).
- **Active:** 1px down-press (`translateY(1px)`). Transitions 0.25s on the system ease.
- **Compact (MAP):** min-height 2.5rem, padding 0.5rem 0.8rem, 0.875rem.

### Play Pad
The round phosphor pad that marks a video facade, centered on the media: 4rem on tiles, 4.5rem on case pages, night play glyph (1.5 to 1.6rem, nudged right), phosphor halo ring at 25%; hover scales 1.08 and widens the ring. Clicking replaces the facade with a privacy-mode YouTube player in place; nothing from YouTube loads before that.

### Chips
- **Skill chip:** Familjen 600 0.875rem in silk on night at 75%, 1px border of phosphor at 35% mixed into trace, padding 0.35rem 0.7rem, square, wrapping with a 0.45rem gap. Used for hero skills and each pillar's stack. Static, not interactive.
- **Island code chip:** Martian Mono 600, 0.75rem, 0.14em tracking, phosphor text, 1px dashed phosphor border at 55%; hover adds a 12% phosphor wash; copied state turns the border solid. Inline 0.9rem copy icon.

### Cards / Containers
- **Project tile (signature):** art-led. Board fill, 1px trace frame, media well on night at 16:9 (portrait variant 9:14, spanning two grid rows) with the cover cropped to fill; body padding 1.1rem 1.2rem 1.2rem with a 0.45rem stack. Title in silkscreen 800 (lead size larger, and lead tiles add the summary in mute), meta line of role and year in mute 0.9375rem with a phosphor live dot and label when the game is live, a foot with the minutes-played figure (display 800 1.35rem in silk over a mute label) and the island code chip or a faint platform line. The whole tile is one link via a stretched title anchor; the play pad and code chip sit above it. Hover and focus-within: frame takes the tint at 70%, tile lifts 3px with the tile-lift shadow, art scales 1.04 and saturates 1.12 over 0.8s.
- **Poster fallback:** a tile without art is set as a silkscreen poster, never left blank: a tint dot grid (18px, 35%) over a 150° wash from tint at 22% into night, with the title in display 900 uppercase silk, bottom-left.
- **Capability pillar:** a ruled row with a big figure in the tint of the chapter that holds its evidence (phosphor for leadership, magenta for games, cyan for teaching, a lifted blue for research) above a mute unit line; then a silkscreen 800 title, mute points with phosphor markers (max 42rem), and the stack as skill chips.
- **Schematic block (MAP):** board at 92%, 1px trace border, 2px top edge in its net color, padding 1.1rem 1.2rem 1.25rem; heading in display 700 with a mono designator in the net color. Enters with a 14px rise, staggered by 0.06s.
- **Video facade (case pages):** the YouTube poster frame in a 1px trace frame on night, 16:9 or 9:16, with the 4.5rem play pad.
- **Study figure:** night canvas in a trace frame (4:3, or 3:4 tall), a mono Reset pad bottom-right, caption with a Bodoni italic title.

### Inputs / Fields
- **Console:** a fixed dialog bottom-right; night at 94%, 1px dim-phosphor border, phosphor mono log; prompt label in mute mono; borderless transparent input in silk.

### Navigation
- **Header:** fixed, 4.5rem; transparent gradient at rest, solid night 94% with a trace bottom rule once scrolled past 40px. Brand is a phosphor-outlined square designator pad "J1" plus the name in nameplate 700 1.25rem.
- **Switches:** segmented groups (MAP/TERRITORY, EN/ES) with a trace outline on night at 80%; segments in Familjen 600 0.875rem uppercase mute, active segment filled phosphor with night text (`aria-pressed` / `aria-current`). Labels shorten below 640px; CONTACT collapses to its mail icon.
- **Chapter rail:** fixed left, vertically centered, 11rem; 1px trace spine; each item is a tint-outlined dot, mono number, and nameplate title that reveals on hover, focus, or current. Current dot fills with tint plus a 4px halo; past dots fill without halo. A Familjen 0.75rem faint hint sits below. Hidden below 1100px and in MAP.

### Ruled Lists (signature)
BOM table, recognition joints, timeline, teaching, publications, education, awards, files: hairline-ruled rows, a fixed mono designator column, a title column, mute grotesk detail. Recognition rows use gold hairlines, a gold mono year, a silkscreen 700 title, and a Familjen 600 gold result led by a gold solder bead. The BOM table collapses to a two-column grid below 900px. Long lists (talks, courses) fold into a ruled `details` with the count in mono.

### Probe Readout (signature)
A scope readout hung off the hero chip in the first viewport by a dashed phosphor leader line that tracks the chip's projected position: a phosphor anchor pad with glow, the total minutes played as a 2.6rem display 900 figure over a mute caption and source line, then a dashed phosphor rule and a channel label in phosphor 0.75rem above the game currently on the lid (display 800 1.5rem) and its role and metric in mute. The readout follows the lid: at 45% of each glitch transition the title and meta fade out over 0.35s, swap, and return. On phones the leader is dropped and the readout gets its own night 88% field.

### MAP ⇄ TERRITORY (signature interaction)
To MAP the camera rises to look straight down (0.9s, power2.in), the canvas fades out (0.6s) and the schematic sheet appears with blocks rising and nets drawing themselves (1.4s stroke-dash, staggered 0.12s). Back to TERRITORY the camera descends over 1.6s on expo-out. The view persists in sessionStorage and the URL, and is restored before paint.

### Motion Grammar
- **System ease:** `cubic-bezier(0.16, 1, 0.3, 1)` (exponential ease-out) on every UI transition; 0.2 to 0.4s for state, 0.7 to 1.2s for reveals.
- **Silkscreen wipe:** chapter headings print left to right via `clip-path` over 1.1s when 12% into view.
- **Scroll rail:** the camera holds on a station for the first half of each chapter and travels on the way out (smoothstep), damped at 3.2/s; the trace signal head advances in step.
- **Signal glitch:** the hero lid holds 4.5s and switches in 0.9s; the only fast motion in the world, and it is confined to a screen.
- **Slow surreal objects:** idle camera drift at 0.12 to 0.17 rad/s, knight sway 0.08 rad at 0.15 rad/s, melting and lens updates on long periods. Nothing in the world moves fast.

### Accessibility and Reduced Motion
- Skip link (phosphor fill) to main content; 2px phosphor focus ring offset 3px; touch targets 2.75 to 2.875rem; play pads carry a labelled "Play video: title".
- Reduced motion: MAP is the default view, smooth scroll is off, the heading wipe is removed, the 3D clock and camera damping freeze (camera snaps to stations, no drift or sway), the hero lid stops cycling, and studies render without animation loops.
- The canvas and poster are `aria-hidden`; MAP holds the full content as real text. Without WebGL a CSS poster (violet and magenta radial sky over a dotted board) stands in.

## Do's and Don'ts

### Do:
- **Do** structure each home chapter as stage then panel: heading over open 3D on a left night gradient, then a full-bleed night 95% panel with a 1px tint edge at 35%.
- **Do** give every chapter exactly one spectrum `--tint` and derive its rail dot, heading bar, designators, and panel edge from it.
- **Do** keep phosphor as the only action and live color, with one phosphor-filled primary per cluster and a phosphor play pad on every video.
- **Do** reserve gold for recognition: awards, nominations, medals, and gold joints in 3D.
- **Do** set the name, chapter titles, game titles, figures, and recognition rows in uppercase Big Shoulders Display; subheads, roles, buttons, switches, chips, and captions in Familjen Grotesk 600; reading text in Familjen Grotesk 400; designators and dates in Martian Mono at 0.6875rem or larger with 0.08em tracking; quotations and art titles in Bodoni Moda italic.
- **Do** lead shipped work with its art in a square tile, and set a typographic poster when there is none.
- **Do** load video as a facade and fetch the player only on click.
- **Do** use square corners and 1px trace hairlines; circles only for pads, vias, status dots, and play pads.
- **Do** keep 3D materials split: matte board and components, iridescent clearcoated dream objects, full-metal gold and copper.
- **Do** ship a MAP equivalent for every TERRITORY addition, and freeze world motion under reduced motion.

### Don't:
- **Don't** set reading text (body, leads, summaries, tile meta) in a spectrum color; spectrum is paint, tints, figures, and small designators.
- **Don't** use gold for anything that is not an honor.
- **Don't** add a second accent for actions, or a filled button in any color other than phosphor.
- **Don't** round container, tile, button, chip, or image corners.
- **Don't** set controls or mid-level headings in condensed Big Shoulders caps.
- **Don't** set Martian Mono below 0.6875rem, or use it for sentences, headings, or labels read as words; don't set UI in Bodoni Moda.
- **Don't** put text directly on busy 3D without the night reading gradient or a night field behind it.
- **Don't** move surreal objects quickly; world motion stays slow and damped, and glitch stays on the lid.
- **Don't** make the board glossy or iridescent; only dream objects shine.
