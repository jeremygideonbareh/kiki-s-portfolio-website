'use client';

import { useEffect, useState, useCallback } from 'react';
import HeroSection from '@/components/hero-section';
import ScreenReveal from '@/components/screen-reveal';
import FilmShowcase from '@/components/film-showcase';
import ClosingShutter from '@/components/closing-shutter';
import FilmGallery from '@/components/film-gallery';
import TeamSection from '@/components/team-section';
import HotelShowcase from '@/components/ui/hotel-showcase';
import { ContactPage } from '@/components/ui/contact-page';
import { AboutSection } from '@/components/ui/about-section';
import SectionReveal from '@/components/section-reveal';

const filmProjects = [
  {
    id: 'ka-daw',
    title: 'Ka Daw',
    year: '2022',
    type: 'Feature Film',
    description: 'A gripping Khasi thriller that explores the raw realities of premarital pregnancy and the unspoken shame faced by women in Meghalayan society. Screened at MeghIFF.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=1600&fit=crop&auto=format',
  },
  {
    id: 'lanot',
    title: 'Lanot',
    year: '2024',
    type: 'Documentary',
    description: 'A cinematic cry from the coal dust \u2014 unveiling silenced voices of post-mining Meghalaya. Cinematography by Kiki Garod.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1600&fit=crop&auto=format',
  },
  {
    id: 'kadaw',
    title: 'Kadaw',
    year: '2022',
    type: 'Feature Film',
    description: 'A Khasi feature film weaving cultural authenticity with cinematic storytelling.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=1600&fit=crop&auto=format',
  },
  {
    id: '9-lad',
    title: '9-Lad / Khyndai Lad',
    year: '2020',
    type: 'Feature Film',
    description: 'A Khasi feature film blending local narratives with universal themes. Part of Meghalayan cinema gaining global recognition.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=1600&fit=crop&auto=format',
  },
  {
    id: 'kni',
    title: 'K\u00f1i',
    year: '2026',
    type: 'Feature Film',
    description: 'A Khasi feature highlighting the role of the maternal uncle in Khasi society. Screened at Shillong International Film Festival 2026, where Kiki Garod was felicitated.',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=1600&fit=crop&auto=format',
  },
];

/* ── Skeleton Loader ── */
function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 800);
    }, 600);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#070707] flex flex-col items-center justify-center transition-opacity duration-800">
      <div className="grid grid-cols-3 gap-4 w-[min(90vw,800px)]">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-video rounded-sm bg-[#1a1a1a] relative overflow-hidden"
          >
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="h-[10px] w-[180px] rounded-sm bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
        <div className="h-[10px] w-[120px] rounded-sm bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const loaderDone = useCallback(() => setShowLoader(false), []);

  /* ── Scroll to top on mount ── */
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      {showLoader && <Loader onDone={loaderDone} />}

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-5 max-sm:px-4 max-sm:py-3"
        style={{
          background: 'rgba(7,7,7,0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="font-serif text-[1.15rem] font-bold tracking-[0.18em] uppercase text-white"
        >
          Kiki Garod
        </div>
        <nav className="flex gap-8 max-sm:gap-3">
          {['About', 'Works', 'Casting'].map((item) => (
            <a
              key={item}
              href={item === 'About' ? '#about' : '#'}
              className="text-[rgba(255,255,255,0.55)] text-[0.7rem] font-medium tracking-[0.12em] uppercase no-underline transition-colors duration-300 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex gap-4">
          <a
            href="https://www.youtube.com/channel/UCffneAgo2PbKkfivkvlMBWA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(255,255,255,0.4)] text-[0.65rem] tracking-[0.12em] uppercase no-underline transition-colors duration-300 hover:text-white"
          >
            YT
          </a>
          <a
            href="https://www.instagram.com/kiki_garod_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(255,255,255,0.4)] text-[0.65rem] tracking-[0.12em] uppercase no-underline transition-colors duration-300 hover:text-white"
          >
            IG
          </a>
        </div>
      </header>

      <main className="bg-[#070707] text-[#f0e8dc]">
        {/* ST1 — Hero */}
        <HeroSection />

        {/* About Section */}
        <SectionReveal>
          <AboutSection />
        </SectionReveal>

        {/* ST2 — Portfolio screen reveal → Film showcase */}
        <ScreenReveal>
          <FilmShowcase
            projects={filmProjects}
            interview={{
              label: 'In Conversation',
              name: 'with Kiki Garod',
              duration: '06:13',
              image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&h=675&fit=crop&auto=format',
            }}
          />
        </ScreenReveal>

        {/* spacer — gives pinned section room to unpin after Kñi */}
        <div className="h-screen bg-[#070707]" />
        {/* Closer — black shutter rises from bottom to cover the interview */}
        <ClosingShutter />
        {/* Film Gallery — 3D circular gallery */}
        <FilmGallery projects={filmProjects} />
        {/* Team Section — about the team */}
        <SectionReveal>
          <TeamSection />
        </SectionReveal>
        {/* Music Videos — video showcase */}
        <SectionReveal delay={0.15}>
          <HotelShowcase />
        </SectionReveal>
        {/* Contact Page */}
        <SectionReveal delay={0.3}>
          <ContactPage />
        </SectionReveal>
      </main>
    </>
  );
}
