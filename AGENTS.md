<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kiki Garod Portfolio — Handoff Document

## Project Overview
Single-page portfolio for Khasi film director Kiki Garod. Features a hero canvas animation → screen reveal clip → pinned 65/35 split film showcase → video interview reveal.

## Stack
- **Next.js 16.2.6** (Turbopack, App Router)
- **Framer Motion** (useScroll, useTransform, useMotionValueEvent)
- **Tailwind CSS** (utility classes throughout)
- **TypeScript**

## Component Tree
```
layout.tsx (html/body — minimal, NO h-full or flex-col constraints)
  page.tsx
    ├── Loader (skeleton shimmer, auto-dismiss)
    ├── Header (fixed navbar, z-[100])
    ├── HeroSection (canvas 240-frame animation)
    ├── ScreenReveal (clip-path wrapper, uses own useScroll)
    │   └── FilmShowcase (pinned 65/35 scroll-through, 500vh section)
    │       ├── LAYER 1: Interview overlay (z-[1], fixed, behind film)
    │       └── LAYER 2: Sticky film wrapper (z-[2])
    │           ├── LEFT 35%: Metadata (flex-col, no bg on parent div)
    │           └── RIGHT 65%: Images (flex-col, no bg)
    └── Spacer (h-screen bg-[#070707] — gives pinned section room to unpin)
```

## Scroll Architecture

### 5 Films
| # | Film | Year | Type |
|---|------|------|------|
| 0 | Ka Daw | 2022 | Feature Film |
| 1 | Lanot | 2024 | Documentary |
| 2 | Kadaw | 2022 | Feature Film |
| 3 | 9-Lad / Khyndai Lad | 2020 | Feature Film |
| 4 | Kñi | 2026 | Feature Film |

### Section
- Height: `n × 100vh` = 500vh
- Scroll offset: `['start start', 'end end']`
- Base Y: `scrollYProgress` mapped `[0, 1]` → `['0vh', '-400vh']`

### Scroll Ranges (all values are scrollYProgress [0, 1])

| Range | Event |
|---|---|
| 0 → 0.05 | KaDaw visible, metadata steady (20vh delay) |
| **0.05 → 0.15** | **KaDaw bumps +100vh, fades [0.09, 0.15]** |
| 0.15 → 0.30 | Lanot visible, metadata steady (60vh delay) |
| **0.30 → 0.40** | **Lanot bumps +100vh, fades [0.34, 0.40]** |
| 0.40 → 0.55 | Kadaw visible, metadata steady (60vh delay) |
| **0.55 → 0.65** | **Kadaw bumps +100vh, fades [0.59, 0.65]** |
| 0.65 → 0.72 | 9-Lad visible, metadata steady (28vh delay) |
| **0.72 → 0.82** | **9-Lad bumps +100vh, fades [0.76, 0.82]. Kñi enters.** |
| 0.82 → 0.86 | Kñi visible, no animation (16vh pause) |
| **0.86 → 0.94** | **Kñi lifts -50vh (both columns). Interview snaps solid [0.86, 0.87].** |
| 0.94 → 1.0 | Interview fully visible. Section unpins at end. |

### Motion Values

| Name | Input range | Output range | Purpose |
|---|---|---|---|
| `baseY` | [0, 1] | ['0vh', '-400vh'] | Scrolls flex-col |
| `bump0` | [0, 0.05, 0.15, 1] | ['0vh', '0vh', '100vh', '100vh'] | KaDaw metadata push |
| `bump1` | [0, 0.30, 0.40, 1] | ['0vh', '0vh', '100vh', '100vh'] | Lanot metadata push |
| `bump2` | [0, 0.55, 0.65, 1] | ['0vh', '0vh', '100vh', '100vh'] | Kadaw metadata push |
| `bump3` | [0, 0.72, 0.82, 1] | ['0vh', '0vh', '100vh', '100vh'] | 9-Lad metadata push |
| `bump4` | [0, 1] | ['0vh', '0vh'] | Kñi identity (no container bump) |
| `kniLift` | [0, 0.86, 0.94, 1] | ['0vh', '0vh', '-50vh', '-50vh'] | Kñi metadata text lift |
| `imgLift4` | [0, 0.86, 0.94, 1] | ['0vh', '0vh', '-50vh', '-50vh'] | Kñi image lift |
| `interviewOpacity` | [0, 0.86, 0.87, 1] | [0, 0, 1, 1] | Interview snap reveal |
| `interviewPE` | [0, 0.86, 0.87, 1] | ['none', 'none', 'auto', 'auto'] | Interview pointer events |

### Metadata Fade (HANDOFF_RANGES)
Applied via direct DOM manipulation (`useMotionValueEvent`) on the `div ref`:

```
for each film i:
  p <= start  → opacity = 1
  p >= end    → opacity = 0
  otherwise   → opacity = 1 - (p - start) / (end - start)
```

This runs per-frame via `scrollYProgress` change events.

## Layer System (within FilmShowcase)

| Layer | z-index | Content | Position |
|---|---|---|---|
| Layer 1 | `z-[1]` | Interview overlay (bg image + dark overlay + text content) | `fixed inset-0` |
| Layer 2 | `z-[2]` | Film wrapper (65/35 split: metadata + images) | `sticky top-0 h-screen` |
| Section bg | auto | `#070707` | `relative` |

Layer 2 renders ON TOP of Layer 1. Through transparent areas in Layer 2 (gaps, faded elements), Layer 1 (interview) shows through.

## Key Implementation Details

### Metadata black background
- **Non-Kñi films** (0–3): Each 100vh container has `bg-[#070707]`. Stays opaque during handoff fades.
- **Kñi (film 4)**: The 100vh container has NO bg. Instead, the content `motion.div` (which carries `kniLift`) has `bg-[#070707]`. This bg follows the text upward during the lift. The area below the content is transparent → interview (Layer 1) shows through, matching the right side image gap.

### Right column images
- Images for films 0–3 have NO bump (identity transform) — they scroll naturally with `baseY`.
- Kñi image has `imgLift4 = -50vh` during [0.86, 0.94], matching the metadata lift. This creates a 50vh gap at the viewport bottom through which the interview is revealed.

### Important: no h-full / flex-col on layout
`<html>`, `<body>`, and `<main>` must NOT have `h-full`, `min-h-full flex flex-col`, or `flex-1`. These constrain the document to 100vh, preventing scroll-up reversal after the pinned section ends.

### Spacer
A 100vh `div` with `bg-[#070707]` after ScreenReveal in page.tsx gives the pinned section room to unpin after Kñi lifts. Without it, `['start start', 'end end']` would end at the page bottom and the section could never release.

## File Structure
```
src/
  app/
    layout.tsx     — html/body setup, no flex constraints
    page.tsx       — imports all sections, Loader, Header
    globals.css    — body font-family rule
  components/
    hero-section.tsx     — Canvas animation (untouched)
    screen-reveal.tsx    — Clip-path wrapper (untouched)
    film-showcase.tsx    — Main scroll component (184 lines)
    interview-section.tsx — Dead file (no longer imported, kept for reference)
```

## Potential Friction Points
- **Metadata fade vs. interview visibility**: Non-Kñi metadata fades (`HANDOFF_RANGES`) create transparent areas. These show Layer 1 (interview) at opacity 0 before p=0.86, so the section bg (black) shows through. If interview visibility timing ever changes, verify handoff areas don't accidentally reveal the interview.
- **HANDOFF_RANGES must stay in sync with bump keyframes**: Each fade range should be within (and slightly delayed relative to) its corresponding bump range.
- **`interviewPE` uses string motion values**: framer-motion uses the nearest keyframe for non-interpolatable strings. [0, 0.86, 0.87, 1] → ['none', 'none', 'auto', 'auto']: values before 0.86 yield 'none', after 0.87 yield 'auto'.
- **Fixed element z-index**: The interview overlay is `fixed` with `z-[1]` inside the `relative` section. fixed positioning doesn't escape the stacking context — the section must stay `relative` for z-index stacking to work.
