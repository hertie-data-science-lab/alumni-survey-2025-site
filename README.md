# Hertie School Alumni Survey 2025 — Interactive Summary

An interactive, public-facing summary of the **Hertie School Alumni Survey 2025**,
built to journalistic-newsroom standards (think Pew Research Center) with a full
methodology section at the end.

It distils the survey's findings into five themes — who responded, their
**connection** to the School, their **education**, their **careers**, and how they
stay **connected** as a community — using branded, accessible charts.

🔗 **Live site:** https://hertie-data-science-lab.github.io/alumni-survey-2025-site/

- **Framework:** [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5) + static prerendering
- **Charts:** [SveltePlot](https://svelteplot.dev) (a Svelte-native grammar of graphics)
- **Type:** Corbel where installed (Hertie's brand font), with a self-hosted
  [Hanken Grotesk](https://hankgrotesk.com/) fallback (SIL OFL) — no third-party
  font calls, for GDPR friendliness
- **Colours:** mirror the printed report

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static build into ./build
npm run preview    # preview the production build
```

## Deployment

This repo **auto-deploys to GitHub Pages** on every push to `main`, via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow builds
with `BASE_PATH` set to the repository name so assets resolve under the Pages
sub-path. The site is fully static, so the `build/` output can equally be dropped on
any other static host (Netlify, Cloudflare Pages, an institutional web server, …).

## Where the data comes from

This repository contains **only the website and aggregate, shareable figures** — no
individual-level survey data. The chart data in `src/lib/data/*.json` is generated
**directly from the cleaned survey responses** in the private analysis repository
(`hertie-data-science-lab/hertie-alumni-survey-2025`) by an R script that reproduces
the report's methodology: whole-number percentages, PhD graduates excluded from the
thematic breakdowns, and the same programme/cohort groupings. To refresh the figures,
regenerate the JSON there and copy it into `src/lib/data/`.

## Project structure

```
src/
├── app.css                  # design tokens, fonts, typography
├── lib/
│   ├── colors.js            # brand + chart palettes
│   ├── data/*.json          # aggregate survey figures (meta, connection, education, career, engagement)
│   ├── components/          # Hero, Section, Figure, KeyFigure, nav, footer…
│   │   └── charts/          # DivergingBars, RankedBars, StackedShareBars, Dumbbell, LineTrend
│   └── sections/            # Overview, Connection, Education, Careers, Community, Methods
└── routes/+page.svelte      # assembles the single long-form page
static/fonts/                # self-hosted Hanken Grotesk (woff2)
```

## A note on the figures

This is a curated summary, not the full report. Percentages are whole numbers and
computed among those who answered each question. The survey is **not a census** and
respondents were not a random sample, so figures are directional; small subgroups
(MDS, PhD) should be read with caution. See the **Methodology** section at the foot of
the page for the complete picture.

Source: **Hertie School Alumni Survey 2025** · Alumni Affairs with the Data Science Lab.
