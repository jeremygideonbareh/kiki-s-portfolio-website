# Kiki Garod Portfolio

A single-page cinematic portfolio for **Kiki Garod**, a Khasi film director and cinematographer from Meghalaya, India. Built with Next.js 16, Framer Motion, Tailwind CSS, and shadcn.

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **Animation**: Framer Motion 12 (`useScroll`, `useTransform`, `useInView`)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: lucide-react
- **Language**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── globals.css        — Tailwind base, custom properties, skeleton shimmer
│   ├── layout.tsx         — HTML/body setup (no flex constraints)
│   └── page.tsx           — Entry point: loads sections in sequence
├── components/
│   ├── hero-section.tsx          — Canvas 240-frame animation
│   ├── screen-reveal.tsx         — Clip-path wrapper for scroll reveal
│   ├── film-showcase.tsx         — Pinned 65/35 scroll-through (500vh)
│   ├── closing-shutter.tsx       — 200vh black shutter rises from bottom
│   ├── film-gallery.tsx          — Wrapper for CircularGallery
│   ├── section-reveal.tsx        — Reusable scroll-triggered slide-in wrapper
│   ├── team-section.tsx          — Heading wrapper for TeamShowcase
│   ├── demo.tsx                  — HotelShowcase demo
│   ├── demo-about.tsx            — AboutSection demo
│   ├── demo-contact.tsx          — ContactPage demo
│   ├── contact-section.tsx       — Legacy contact section
│   ├── interview-section.tsx     — Dead file (kept for reference)
│   ├── music-video-section.tsx   — Legacy (replaced by HotelShowcase)
│   └── ui/
│       ├── about-section.tsx      — About Me page with grid overlay
│       ├── button.tsx             — shadcn button (base-ui)
│       ├── circular-gallery.tsx   — 3D rotating film gallery
│       ├── contact-page.tsx       — Contact form with social links
│       ├── full-screen-scroll-fx.tsx — Full-screen parallax effect
│       ├── hotel-showcase.tsx     — Music video grid showcase
│       ├── team-showcase.tsx      — Team photo grid with hover effect
│       └── zoom-parallax.tsx      — Zoom parallax component
├── lib/
│   └── utils.ts           — cn() helper (clsx + tailwind-merge)
```

## Scroll Architecture

The film showcase uses a **500vh pinned section** with 5 films scrolling through a 65/35 split:

| # | Film | Year | Type |
|---|------|------|------|
| 0 | Ka Daw | 2022 | Feature Film |
| 1 | Lanot | 2024 | Documentary |
| 2 | Kadaw | 2022 | Feature Film |
| 3 | 9-Lad / Khyndai Lad | 2020 | Feature Film |
| 4 | Kñi | 2026 | Feature Film |

### Scroll Ranges (scrollYProgress)

| Range | Event |
|---|---|
| 0 → 0.05 | KaDaw visible |
| 0.05 → 0.15 | KaDaw bumps + fades |
| 0.15 → 0.30 | Lanot visible |
| 0.30 → 0.40 | Lanot bumps + fades |
| 0.40 → 0.55 | Kadaw visible |
| 0.55 → 0.65 | Kadaw bumps + fades |
| 0.65 → 0.72 | 9-Lad visible |
| 0.72 → 0.82 | 9-Lad bumps + fades. Kñi enters |
| 0.82 → 0.86 | Kñi visible (pause) |
| **0.86 → 0.94** | **Kñi lifts –50vh. Interview reveals behind** |
| 0.94 → 1.0 | Interview fully visible. Section unpins |

## Layer System

| Layer | z-index | Content |
|---|---|---|
| Layer 1 | `z-[1]` | Interview overlay (fixed, revealed through gap) |
| Layer 2 | `z-[2]` | Film wrapper (sticky, 65/35 split) |
| Spacer | auto | 100vh `bg-[#070707]` for unpin room |
| ClosingShutter | auto | 200vh black shutter after spacer |
| FilmGallery | `z-[60]` | 3D circular gallery |
| TeamSection | `z-[70]` | Team photo grid |
| HotelShowcase | `z-[80]` | Music video grid |
| ContactPage | `z-[90]` | Contact info + social links |

## Color Palette

- `--background`: `#070707` (near-black)
- `--foreground`: `#f0e8dc` (warm cream)
- `--secondary`: `#1a1a1a` (dark gray)
- Font: `Playfair Display` (headings), `Inter` (body)

## GitHub Pages Deployment

The site automatically deploys to GitHub Pages via a GitHub Actions workflow on every push to `main`.

### Workflow (`.github/workflows/deploy.yml`)
1. Checks out the code
2. Sets up Node.js 22
3. Installs dependencies (`npm ci`)
4. Builds with `NEXT_PUBLIC_BASE_PATH=/kiki-s-portfolio-website`
5. Uploads `./out` as a Pages artifact
6. Deploys via `actions/deploy-pages`

### Local Development

```bash
npm install
npm run dev       # → localhost:3000
npm run build     # → production build (static export on CI only)
```

> **Note**: `output: 'export'` and `basePath` are only active during CI builds (`GITHUB_ACTIONS=true`). Local dev runs without these settings.

## Key Implementation Details

- **No `h-full` / `flex-col` on layout**: These constrain the document to 100vh, preventing scroll-up reversal after the pinned section ends.
- **Unified shutter**: Both columns are wrapped in a single `motion.div` with `bg-[#070707]` and `y: kniLift`, creating a single black shutter rather than split left/right.
- **Interview reveal**: Layer 1 sits behind Layer 2 at `z-[1]`. During Kñi, the content lifts –50vh, creating a gap at the viewport bottom through which the interview is visible.

## Contact

- YouTube: [KIKI GAROD STUDIO](https://www.youtube.com/channel/UCYJxADThoDDEbhpGa6mSaGw)
- Instagram: [@kiki_garod_studio](https://www.instagram.com/kiki_garod_studio/)
