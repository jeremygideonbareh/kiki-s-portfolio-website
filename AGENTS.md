<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Kiki Garod Portfolio — Handoff Document

## Project Overview
Single-page cinematic portfolio for Khasi film director Kiki Garod from Meghalaya, India.
Features: hero canvas animation → About Me section → screen reveal clip → pinned 65/35 split film showcase → video interview reveal → closing shutter → 3D circular film gallery → team showcase → music video showcase → contact page.
All sections have scroll-triggered slide-in animations.

## Stack
- **Next.js 16.2.6** (Turbopack, App Router)
- **Framer Motion 12** (useScroll, useTransform, useMotionValueEvent, whileInView)
- **Tailwind CSS v4** + shadcn/ui
- **lucide-react** — icons
- **TypeScript**

## Component Tree
```
layout.tsx (html/body — minimal, NO h-full or flex-col constraints)
  page.tsx
    ├── Loader (skeleton shimmer, auto-dismiss, 600ms)
    ├── Header (fixed navbar at z-[100]: About | Works | Casting)
    ├── HeroSection (canvas 240-frame animation)
    ├── <SectionReveal> (slide-in wrapper)
    │   └── AboutSection (id="about", grid overlay, skills + portrait)
    ├── ScreenReveal (clip-path wrapper, uses own useScroll)
    │   └── FilmShowcase (pinned 65/35 scroll-through, 500vh section)
    │       ├── LAYER 1: Interview overlay (z-[1], fixed, behind film)
    │       └── LAYER 2: Sticky film wrapper (z-[2])
    │           ├── LEFT 35%: Metadata (flex-col)
    │           └── RIGHT 65%: Images (flex-col)
    ├── Spacer (h-screen bg-[#070707] — unpin room)
    ├── ClosingShutter (200vh black shutter rising from bottom)
    ├── FilmGallery → CircularGallery (3D rotating, z-[60], 500vh scroll)
    ├── <SectionReveal delay={0}>
    │   └── TeamSection → TeamShowcase (z-[70], 6-member photo grid)
    ├── <SectionReveal delay={0.15}>
    │   └── HotelShowcase (z-[80], 6-card music video grid)
    └── <SectionReveal delay={0.3}>
        └── ContactPage (z-[90], email/phone/office + social links)
```

## Section Flow (page.tsx order)
| # | Section | Component | Animation |
|---|---------|-----------|-----------|
| ST0 | Loading | Loader | Skeleton shimmer, auto-dismiss at 600ms + 800ms fade |
| ST1 | Hero | HeroSection | Canvas 240-frame animation |
| ST2 | About | AboutSection | Slide-in via SectionReveal |
| ST3 | Portfolio | ScreenReveal → FilmShowcase | Clip-path + 500vh pinned scroll |
| ST4 | Spacer | div h-screen | — |
| ST5 | Shutter | ClosingShutter | 200vh rise from bottom |
| ST6 | Gallery | FilmGallery | 3D circular scroll rotation |
| ST7 | Team | TeamSection | Slide-in |
| ST8 | Music Vids | HotelShowcase | Slide-in (0.15s delay) |
| ST9 | Contact | ContactPage | Slide-in (0.3s delay) |

## Data Structures

### filmProjects (defined in page.tsx)
```ts
const filmProjects = [
  { id: 'ka-daw', title: 'Ka Daw', year: '2022', type: 'Feature Film',
    description: 'A gripping Khasi thriller...',
    image: 'https://images.unsplash.com/...' },
  { id: 'lanot', title: 'Lanot', year: '2024', type: 'Documentary',
    description: 'A cinematic cry from the coal dust...',
    image: 'https://images.unsplash.com/...' },
  { id: 'kadaw', title: 'Kadaw', year: '2022', type: 'Feature Film',
    description: 'A Khasi feature film weaving cultural authenticity...',
    image: 'https://images.unsplash.com/...' },
  { id: '9-lad', title: '9-Lad / Khyndai Lad', year: '2020', type: 'Feature Film',
    description: 'A Khasi feature film blending local narratives...',
    image: 'https://images.unsplash.com/...' },
  { id: 'kni', title: 'Kñi', year: '2026', type: 'Feature Film',
    description: 'A Khasi feature highlighting the role of the maternal uncle...',
    image: 'https://images.unsplash.com/...' },
];
```

### interview object (passed to FilmShowcase)
```ts
interview={{
  label: 'In Conversation',
  name: 'with Kiki Garod',
  duration: '06:13',
  image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=675&fit=crop&auto=format',
}}
```

## Loader
- Renders for 600ms, then triggers `onDone` callback after 800ms fade
- 3×2 grid of skeleton-shimmer placeholders + text shimmer lines
- `z-[9999]` to cover everything during load
- Uses CSS `@keyframes shimmer` animation with `linear-gradient` sweep

## Header details
- Fixed position at `top-0`, `z-[100]`
- `background: rgba(7,7,7,0.72)` with `backdrop-filter: blur(14px)`
- Logo: "KIKI GAROD" in serif font
- Nav: About (`#about`), Works (`#`), Casting (`#`)
- Right links: YT (`https://www.youtube.com/channel/UCffneAgo2PbKkfivkvlMBWA`), IG (`https://www.instagram.com/kiki_garod_studio/`)

## useScroll Configuration

### FilmShowcase
```ts
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ['start start', 'end end']
});
```
- `sectionRef` is attached to the outer `<section>` element
- Height is `n * 100vh` (500vh)

### ClosingShutter
```ts
const { scrollYProgress } = useScroll({
  target: shutterRef,
  offset: ['start end', 'end end']
});
```

### FilmGallery (CircularGallery)
- Uses its own `useScroll` internally with ~500vh scroll container

### ScreenReveal
- Clip-path animation wrapper
- Uses its own `useScroll` independent of FilmShowcase
- Reveals FilmShowcase content with a clipping animation

## HANDOFF_RANGES (metadata fade values)
Defined in film-showcase.tsx as a constant array:
```ts
const HANDOFF_RANGES = [
  { start: 0.09, end: 0.15 },  // KaDaw
  { start: 0.34, end: 0.40 },  // Lanot
  { start: 0.59, end: 0.65 },  // Kadaw
  { start: 0.76, end: 0.82 },  // 9-Lad
  { start: 0.90, end: 0.96 },  // Kñi
];
```
Applied per-frame via `useMotionValueEvent(scrollYProgress, 'change', callback)`.

## Button component variants
Located at `src/components/ui/button.tsx`:
- Uses `@base-ui/react/button` (NOT `@radix-ui/react-slot`)
- Variants: default, outline, secondary, ghost, destructive, link
- Sizes: default, xs, sm, lg, icon, icon-xs, icon-sm, icon-lg
- Import: `import { Button, type buttonVariants } from '@/components/ui/button'`

## Site-wide CSS
- `globals.css` imports: `@import "tailwindcss"`, `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"`
- Body font: `'Inter', sans-serif` (applied via `@layer base`)
- `overflow-x: hidden` on `<html>`

## Images Used (Unsplash URLs for placeholders)
- Film posters: Various Unsplash images (see filmProjects data)
- Interview: `photo-1492691527719-9d1e07e534b4` (person on phone)
- Team members: Generic Unsplash portraits
- Music videos: Various Unsplash cinematic/creative images
- About portrait: `photo-1492691527719-9d1e07e534b4` (same as interview)
- Portfolio stack: `photo-1489599849927-2ee91cede3ba`, `photo-1506905925346-21bda4d32df4`, `photo-1618005182384-a83a8bd57fbe`

## Hero Canvas Animation
- 240 frames in `public/scrollinganimation/ezgif-frame-{001..240}.jpg`
- Canvas draws frames sequentially with frame counting
- Uses `process.env.NEXT_PUBLIC_BASE_PATH` for GH Pages asset path prefix

## Nav Links
- **About** → `#about` (scrolls to AboutSection)
- **Works** → `#` (placeholder)
- **Casting** → `#` (placeholder)

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

### Scroll Ranges (scrollYProgress [0, 1])

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
| 0.82 → 0.90 | Kñi visible, no animation (40vh pause — extended from 16vh) |
| **0.90 → 0.96** | **Kñi lifts –50vh (both columns). Interview snaps solid [0.90, 0.91]. Text staggers in.** |
| 0.96 → 1.0 | Interview fully visible. Section unpins at end. |

### Motion Values (current state)

| Name | Input range | Output range | Purpose |
|---|---|---|---|
| `baseY` | [0, 1] | ['0vh', '-400vh'] | Scrolls flex-col |
| `bump0` | [0, 0.05, 0.15, 1] | ['0vh', '0vh', '100vh', '100vh'] | KaDaw metadata push |
| `bump1` | [0, 0.30, 0.40, 1] | ['0vh', '0vh', '100vh', '100vh'] | Lanot metadata push |
| `bump2` | [0, 0.55, 0.65, 1] | ['0vh', '0vh', '100vh', '100vh'] | Kadaw metadata push |
| `bump3` | [0, 0.72, 0.82, 1] | ['0vh', '0vh', '100vh', '100vh'] | 9-Lad metadata push |
| `bump4` | [0, 1] | ['0vh', '0vh'] | Kñi identity (no container bump) |
| `kniLift` | [0, 0.90, 0.96, 1] | ['0vh', '0vh', '-50vh', '-50vh'] | Kñi metadata text lift |
| `imgLift4` | [0, 0.90, 0.96, 1] | ['0vh', '0vh', '-50vh', '-50vh'] | Kñi image lift |
| `interviewOpacity` | [0, 0.90, 0.91, 1] | [0, 0, 1, 1] | Interview snap reveal |
| `interviewPE` | [0, 0.90, 0.91, 1] | ['none', 'none', 'auto', 'auto'] | Interview pointer events |
| `labelO` | [0, 0.90, 0.92, 1] | [0, 0, 1, 1] | "In Conversation" fade in |
| `labelY` | [0, 0.90, 0.92, 1] | ['1.5rem', '1.5rem', '0rem', '0rem'] | Label slide up |
| `nameO` | [0, 0.91, 0.93, 1] | [0, 0, 1, 1] | "with Kiki Garod" fade in |
| `nameY` | [0, 0.91, 0.93, 1] | ['2rem', '2rem', '0rem', '0rem'] | Name slide up |
| `durationO` | [0, 0.92, 0.935, 1] | [0, 0, 1, 1] | Duration fade in |
| `durationY` | [0, 0.92, 0.935, 1] | ['1.5rem', '1.5rem', '0rem', '0rem'] | Duration slide up |
| `descO` | [0, 0.925, 0.945, 1] | [0, 0, 1, 1] | Description fade in |
| `descY` | [0, 0.925, 0.945, 1] | ['1.5rem', '1.5rem', '0rem', '0rem'] | Description slide up |
| `btnO` | [0, 0.94, 0.96, 1] | [0, 0, 1, 1] | Button fade in |
| `btnY` | [0, 0.94, 0.96, 1] | ['1.5rem', '1.5rem', '0rem', '0rem'] | Button slide up |

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
| Layer 1 | `z-[1]` | Interview overlay (bg image + black/60 overlay + text content) | `fixed inset-0` |
| Layer 2 | `z-[2]` | Film wrapper (65/35 split: metadata + images) | `sticky top-0 h-screen` |
| Section bg | auto | `#070707` | `relative` |

Layer 2 renders ON TOP of Layer 1. Through transparent areas in Layer 2 (the 50vh gap created by Kni lift), Layer 1 (interview) shows through.

## Key Implementation Details

### Unified shutter (Kni lift)
- Both columns are wrapped in a single `motion.div` with `bg-[#070707]` and `y: kniLift`
- Creates a single black shutter rather than split left/right
- Kni lift range: [0.90, 0.96] → ['0vh', '-50vh']
- This is slower and more deliberate than the original [0.86, 0.94] timing

### Metadata black background
- **Non-Kñi films** (0–3): Each 100vh container has `bg-[#070707]`. Stays opaque during handoff fades.
- **Kñi (film 4)**: The 100vh container has NO bg. Instead, the content `motion.div` (which carries `kniLift`) has `bg-[#070707]`. This bg follows the text upward during the lift. The area below the content is transparent → interview (Layer 1) shows through, matching the right side image gap.

### Right column images
- Images for films 0–3 have NO bump (identity transform) — they scroll naturally with `baseY`.
- Kñi image has `imgLift4 = -50vh` during [0.90, 0.96], matching the metadata lift.

### Imports
- Both FilmShowcase columns use the same `n` (number of films) from a `getProjects()` call
- Interview section derives `interview` from the last film's metadata

### Closing shutter
- 200vh black panel at `z-[10]`
- `useTransform(scrollYProgress, [0, 0.5, 1], ['100%', '100%', '0%'])`
- Uses its own `useScroll({ target })` with `offset: ['start end', 'end end']`
- Translates `y` from `100%` (hidden below viewport) to `0%` (fully raised)

### Circular gallery
- `CircularGallery` at `components/ui/circular-gallery.tsx`
- 3D rotating ring using `transform-style: preserve-3d` + `perspective(800px)`
- `FilmGallery` wrapper passes `filmProjects` data and creates 500vh scroll space
- Scroll-driven rotation + auto-rotation when not scrolling

### Team showcase
- `TeamShowcase` at `components/ui/team-showcase.tsx`
- 6-member grid (Kiki Garod, Pynshai, Elaine, Star, Banlam, Banshai)
- Hover highlight effect with social links
- Uses Unsplash placeholder images

### Hotel showcase (music videos)
- `HotelShowcase` at `components/ui/hotel-showcase.tsx`
- 6-card responsive grid (sm:2-col, gap-8)
- Hover effects: card lift (-4px), image scale (1.05), play button pulse (1.1)
- Duration badge overlay on thumbnails
- All images are Unsplash placeholders

### Contact page
- `ContactPage` at `components/ui/contact-page.tsx`
- 3-column grid: Email (with copy button), Office (location), Phone (2 numbers with copy)
- Social links section with custom SVG icons (YouTube, Instagram, GitHub)
- Dot-grid background pattern with radial gradient mask
- Subtle glow gradients in the background

### About section
- `AboutSection` at `components/ui/about-section.tsx`
- Adapted from hero-04.tsx template
- "ABOUT ME" large heading with "KIKI GAROD" accent text
- Skills list: FILM DIRECTION, CINEMATOGRAPHY, SCREENWRITING, PRODUCTION
- Portrait image with grayscale filter + "BASED IN MEGHALAYA, INDIA" label
- Description about Khasi filmmaking
- "View Works" button linking to `#works`
- Recent Work section with stacked portfolio images
- Grid overlay background pattern

### Section slide-in animations
- `SectionReveal` at `components/section-reveal.tsx`
- Wraps sections with `motion.div`, `whileInView` triggers slide-in
- Configurable: delay, direction (up/left/right), easing
- Applied to: AboutSection (0s), TeamSection (0s), HotelShowcase (0.15s), ContactPage (0.3s)
- Easing: `[0.25, 0.46, 0.45, 0.94]` (cubic-bezier)

### About section text stagger
- Heading: 0s delay
- Skills + portrait: 0.15s delay
- Description: 0.3s delay
- "View Works" button: 0.45s delay
- Recent Work section: 0.5s delay
- All use `viewport: { once: true }`

### Important: no h-full / flex-col on layout
`<html>`, `<body>`, and `<main>` must NOT have `h-full`, `min-h-full flex flex-col`, or `flex-1`. These constrain the document to 100vh, preventing scroll-up reversal after the pinned section ends.

### Spacer
A 100vh `div` with `bg-[#070707]` after ScreenReveal in page.tsx gives the pinned section room to unpin after Kñi lifts. Without it, `['start start', 'end end']` would end at the page bottom and the section could never release.

## CSS Custom Properties (globals.css)

```css
:root {
  --color-neutral-900: #0a0a0a;
  --color-light: #efeeec;
  --size-font: 1rem;
  --container-padding: 2rem;
  --gap: 2rem;
  --cubic-default: cubic-bezier(0.625, 0.05, 0, 1);
}
```

## GitHub Pages Deployment

### Workflow (`.github/workflows/deploy.yml`)
- Trigger: push to `main` or manual dispatch
- Builds with `NEXT_PUBLIC_BASE_PATH=/kiki-s-portfolio-website`
- Produces static export to `./out`
- Uploads + deploys via `actions/deploy-pages`

### next.config.ts
- `output: 'export'`, `basePath`, `assetPrefix` only active when `GITHUB_ACTIONS=true`
- `images.unoptimized: true` (required for static export)
- Local dev runs without any of these settings

### Required env vars for CI
- `GITHUB_ACTIONS=true` (set automatically by GitHub)
- `NEXT_PUBLIC_BASE_PATH=/kiki-s-portfolio-website` (set in workflow)

### Asset path handling
- `hero-section.tsx` uses `process.env.NEXT_PUBLIC_BASE_PATH` prefix for frame image paths:
  ```ts
  const bp = process.env.NEXT_PUBLIC_BASE_PATH || '';
  img.src = bp + '/scrollinganimation/ezgif-frame-' + pad(i) + '.jpg';
  ```

## File Structure
```
├── .github/workflows/deploy.yml     — GH Pages deploy workflow
├── AGENTS.md                        — This handoff document + Next.js rules
├── README.md                        — Project documentation
├── components.json                  — shadcn config
├── next.config.ts                   — Next.js config (static export on CI)
├── images/
│   └── kiki.heic                    — Kiki's portrait photo
├── public/
│   └── scrollinganimation/          — 240 hero canvas frames
└── src/
    ├── app/
    │   ├── layout.tsx               — html/body setup, no flex constraints
    │   ├── page.tsx                 — All sections assembled in order
    │   └── globals.css              — Tailwind base, custom vars, shimmer
    ├── components/
    │   ├── hero-section.tsx         — Canvas 240-frame animation
    │   ├── screen-reveal.tsx        — Clip-path wrapper
    │   ├── film-showcase.tsx        — Main 500vh pinned scroll section
    │   ├── closing-shutter.tsx      — 200vh black shutter from bottom
    │   ├── film-gallery.tsx         — Wrapper for CircularGallery
    │   ├── section-reveal.tsx       — Reusable scroll-triggered slide-in
    │   ├── team-section.tsx         — Wrapper with heading for TeamShowcase
    │   ├── demo.tsx                 — HotelShowcase demo
    │   ├── demo-about.tsx           — AboutSection demo
    │   ├── demo-contact.tsx         — ContactPage demo
    │   ├── contact-section.tsx      — Legacy (not imported)
    │   ├── interview-section.tsx    — Dead file (kept for reference)
    │   ├── music-video-section.tsx  — Legacy (replaced by HotelShowcase)
    │   └── ui/
    │       ├── about-section.tsx    — About Me with animations
    │       ├── button.tsx           — shadcn button (base-ui)
    │       ├── circular-gallery.tsx — 3D rotating film gallery
    │       ├── contact-page.tsx     — Contact info + social links
    │       ├── full-screen-scroll-fx.tsx — Full-screen parallax
    │       ├── hotel-showcase.tsx   — Music video grid showcase
    │       ├── team-showcase.tsx    — Team photo grid
    │       └── zoom-parallax.tsx    — Zoom parallax effect
    └── lib/
        └── utils.ts                 — cn() helper
```

## Dependencies
- `next`, `react`, `react-dom` — core
- `framer-motion` — animations
- `lucide-react` — icons
- `class-variance-authority` — button variants
- `@radix-ui/react-slot` — button composition
- `@base-ui/react` — button primitive
- `clsx`, `tailwind-merge` — cn() utility
- `@tailwindcss/postcss`, `tailwindcss` — CSS framework

## Potential Friction Points
- **Metadata fade vs. interview visibility**: Non-Kñi metadata fades (`HANDOFF_RANGES`) create transparent areas. These show Layer 1 (interview) at opacity 0 before p=0.86, so the section bg (black) shows through. If interview visibility timing ever changes, verify handoff areas don't accidentally reveal the interview.
- **HANDOFF_RANGES must stay in sync with bump keyframes**: Each fade range should be within (and slightly delayed relative to) its corresponding bump range.
- **`interviewPE` uses string motion values**: framer-motion uses the nearest keyframe for non-interpolatable strings.
- **Fixed element z-index**: The interview overlay is `fixed` with `z-[1]` inside the `relative` section. fixed positioning doesn't escape the stacking context — the section must stay `relative` for z-index stacking to work.
- **Interview overlay persists after section**: The interview overlay is `fixed` with opacity 1 after the reveal. It will show through sections below unless faded out or the section covers it. Currently, the subsequent sections have higher z-index values (z-[60] to z-[90]) which keep them above the z-[1] interview overlay.
- **Static export asset paths**: `hero-section.tsx` uses `NEXT_PUBLIC_BASE_PATH` to prefix frame image URLs. Any new hardcoded `/scrollinganimation/` paths must also use this prefix for GH Pages compatibility.
- **Local vs CI builds**: `next.config.ts` conditionally applies `output: 'export'` only when `GITHUB_ACTIONS=true`. Running `npm run build` locally will NOT produce a static export — it uses the default Next.js server build. To test static export locally, set `$env:GITHUB_ACTIONS='true'` and `$env:NEXT_PUBLIC_BASE_PATH='/kiki-s-portfolio-website'`.
