# Andrés Ordóñez-Bolaños — Portfolio

**Signal Path — Map and Territory.** A career shown as a circuit board: a flat schematic (Map) and a metaphysical 3D landscape you walk with the scroll (Territory).

Astro 7 · Three.js · GSAP · bilingual (EN at `/`, ES at `/es/`).

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview
```

## Add or edit content

Everything visible comes from `src/data/`. No component needs to change.

| What | File |
|---|---|
| A game or project | `src/data/projects/*.ts` — add an object to an array, or a new file exporting `Project[]`. A case page `/work/<slug>/` is generated automatically in both languages. |
| Experience, teaching, publications, awards, talks, courses, skills (BOM), ventures | `src/data/career.ts` |
| Name, intro, contact links, chapter titles and quotes, interface labels | `src/data/site.ts` |
| Lecture PDFs | put the file in `public/teaching/` and add it to `resources` in `career.ts` |

Every text field is `{ en, es }`. Metrics carry `source` and `asOf`: update them together.

New industry projects need a `ref` (`U8`, …) only if they should also appear as a chip on the 3D board; chip positions live in `src/scripts/board/scene.ts` (`chipDefs`).

## Images

Raw images live in `assets-src/raw/`. `npm run assets` crops and optimizes them into `public/img/` (`scripts/prepare-assets.mjs`). Re-running it rewrites the files, so re-embed their origin afterwards:

```bash
.claude/skills/impeccable/scripts/impeccable embed-prompt --scan public/img
```

## Where things are

- `src/components/Home.astro` — the seven chapters
- `src/components/MapView.astro` — the one-sheet schematic (also the print and no-WebGL view)
- `src/components/Case.astro` — case study template
- `src/scripts/board/` — the Three.js scene (`scene.ts` camera rail and stations, `objects.ts` surreal objects, `traces.ts` PCB traces and signal shader)
- `src/scripts/studies/` — creative-coding studies (Soft Time, Perceptron, Hall of Mirrors, Swarm)
- `src/scripts/console.ts` — the `/` console

## Keyboard

`/` console · hold `X` x-ray · `Esc` closes the console.

## Still to confirm before publishing

See `PLAN.md` §10 and §12: Havoc Hotel 3 nomination source, Top 3 Fortnite source, permission for third-party key art, deploy target. The CV PDF in `public/` still contains the phone number and the "Rockstar Games" line.
