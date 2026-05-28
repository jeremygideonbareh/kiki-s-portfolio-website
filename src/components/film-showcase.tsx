'use client';

import { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

type FilmProject = {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  image: string;
};

type InterviewData = {
  label: string;
  name: string;
  duration: string;
  image: string;
};

const HANDOFF_RANGES = [
  { start: 0.09, end: 0.15 },
  { start: 0.34, end: 0.40 },
  { start: 0.59, end: 0.65 },
  { start: 0.76, end: 0.82 },
];

export default function FilmShowcase({ projects, interview }: { projects: FilmProject[]; interview?: InterviewData }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const n = projects.length;
  const metaRefs = useRef<(HTMLDivElement | null)[]>(Array(n).fill(null));

  const setMetaRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    metaRefs.current[i] = el;
    if (el) el.style.opacity = '1';
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const baseY = useTransform(scrollYProgress, [0, 1], ['0vh', `-${(n - 1) * 100}vh`]);

  // ── Bump offsets ──
  const bump0 = useTransform(scrollYProgress, [0, 0.05, 0.15, 1], ['0vh', '0vh', '100vh', '100vh']);
  const bump1 = useTransform(scrollYProgress, [0, 0.30, 0.40, 1], ['0vh', '0vh', '100vh', '100vh']);
  const bump2 = useTransform(scrollYProgress, [0, 0.55, 0.65, 1], ['0vh', '0vh', '100vh', '100vh']);
  const bump3 = useTransform(scrollYProgress, [0, 0.72, 0.82, 1], ['0vh', '0vh', '100vh', '100vh']);
  const bump4 = useTransform(scrollYProgress, [0, 1], ['0vh', '0vh']);
  // Kñi lift: metadata text scoots up inside its container — no flex-col gap
  const kniLift = useTransform(scrollYProgress, [0, 0.90, 0.96, 1], ['0vh', '0vh', '-50vh', '-50vh']);
  // Image lift for Kñi (matches metadata)
  const imgLift4 = useTransform(scrollYProgress, [0, 0.90, 0.96, 1], ['0vh', '0vh', '-50vh', '-50vh']);
  // Interview overlay (layer 1) snaps solid behind Kñi as it lifts
  const interviewOpacity = useTransform(scrollYProgress, [0, 0.90, 0.91, 1], [0, 0, 1, 1]);
  const interviewPE = useTransform(scrollYProgress, [0, 0.90, 0.91, 1], ['none', 'none', 'auto', 'auto']);
  // Interview text animations (staggered as shutter lifts)
  const labelO = useTransform(scrollYProgress, [0, 0.90, 0.92, 1], [0, 0, 1, 1]);
  const labelY = useTransform(scrollYProgress, [0, 0.90, 0.92, 1], ['1.5rem', '1.5rem', '0rem', '0rem']);
  const nameO = useTransform(scrollYProgress, [0, 0.91, 0.93, 1], [0, 0, 1, 1]);
  const nameY = useTransform(scrollYProgress, [0, 0.91, 0.93, 1], ['2rem', '2rem', '0rem', '0rem']);
  const durationO = useTransform(scrollYProgress, [0, 0.92, 0.935, 1], [0, 0, 1, 1]);
  const durationY = useTransform(scrollYProgress, [0, 0.92, 0.935, 1], ['1.5rem', '1.5rem', '0rem', '0rem']);
  const descO = useTransform(scrollYProgress, [0, 0.925, 0.945, 1], [0, 0, 1, 1]);
  const descY = useTransform(scrollYProgress, [0, 0.925, 0.945, 1], ['1.5rem', '1.5rem', '0rem', '0rem']);
  const btnO = useTransform(scrollYProgress, [0, 0.94, 0.96, 1], [0, 0, 1, 1]);
  const btnY = useTransform(scrollYProgress, [0, 0.94, 0.96, 1], ['1.5rem', '1.5rem', '0rem', '0rem']);

  const bumps = [bump0, bump1, bump2, bump3, bump4];

  // ── Direct DOM opacity ──
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    for (let i = 0; i < n; i++) {
      const el = metaRefs.current[i];
      if (!el) continue;
      const range = HANDOFF_RANGES[i];
      if (!range) continue;
      const { start, end } = range;
      if (p <= start) {
        el.style.opacity = '1';
      } else if (p >= end) {
        el.style.opacity = '0';
      } else {
        const t = (p - start) / (end - start);
        el.style.opacity = String(1 - t);
      }
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#070707]"
      style={{ height: `${n * 100}vh` }}
    >
      {/* ── LAYER 1 — Interview (fixed behind film content) ── */}
      {interview && (
        <motion.div
          className="fixed inset-0 z-[1]"
          style={{ opacity: interviewOpacity, pointerEvents: interviewPE }}
        >
          <div className="absolute inset-0 w-full h-full">
            <img
              src={interview.image}
              alt={interview.label}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 w-full h-full flex items-center">
            <div className="w-full px-8 md:px-12 lg:px-16 max-w-6xl mx-auto flex flex-col items-start gap-4">
              <motion.span
                className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[#f0e8dc]"
                style={{ opacity: labelO, y: labelY }}
              >
                {interview.label}
              </motion.span>
              <motion.h2
                className="font-['Playfair_Display',serif] text-[#f0e8dc] text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-tight"
                style={{ opacity: nameO, y: nameY }}
              >
                {interview.name}
              </motion.h2>
              <motion.span
                className="text-[0.65rem] font-medium tracking-[0.15em] uppercase text-[#f0e8dc]"
                style={{ opacity: durationO, y: durationY }}
              >
                {interview.duration}
              </motion.span>
              <motion.p
                className="text-[0.75rem] leading-relaxed text-[#f0e8dc] max-w-sm"
                style={{ opacity: descO, y: descY }}
              >
                A conversation about storytelling, the Khasi film industry, and the journey behind
                bringing authentic narratives from Meghalaya to the global stage.
              </motion.p>
              <motion.button
                className="mt-4 flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.12em] uppercase text-[#f0e8dc] hover:opacity-100 transition-opacity duration-300"
                style={{ opacity: btnO, y: btnY }}
              >
                <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
                  <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch Interview
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── LAYER 2 — Film section (on top of interview) ── */}
      <div className="sticky top-0 h-screen flex overflow-hidden relative z-[2]">
        <motion.div className="flex w-full bg-[#070707]" style={{ y: kniLift }}>
        {/* ── LEFT 35% — Metadata ── */}
        <div className="w-[35%] relative overflow-hidden z-10">
          <motion.div className="flex flex-col" style={{ y: baseY }}>
            {projects.map((film, i) => (
              <motion.div
                key={film.id}
                className={`h-screen flex flex-col ${i === n - 1 ? 'justify-start pt-20 md:pt-24 lg:pt-28' : 'justify-center'} px-8 md:px-12 lg:px-16`}
                style={{ y: bumps[i] }}
              >
                <div ref={setMetaRef(i)}>
                  <motion.div style={{ y: '0vh' }}>
                    <span className="block text-[0.55rem] font-medium tracking-[0.2em] uppercase text-[#f0e8dc] opacity-30 mb-2">
                      {film.year}
                    </span>
                    <h2 className="font-['Playfair_Display',serif] text-[#f0e8dc] text-[clamp(1.6rem,3.5vw,3rem)] font-bold leading-tight mb-2">
                      {film.title}
                    </h2>
                    <span className="block text-[0.6rem] font-medium tracking-[0.15em] uppercase text-[#f0e8dc] opacity-40 mb-4">
                      {film.type}
                    </span>
                    <p className="text-[0.7rem] leading-relaxed text-[#f0e8dc] opacity-40 max-w-xs">
                      {film.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT 65% — Images ── */}
        <div className="w-[65%] relative overflow-hidden">
          <motion.div className="flex flex-col" style={{ y: baseY }}>
            {projects.map((film, i) => (
              <motion.div
                key={film.id}
                className="h-screen w-full flex-shrink-0"
                style={{ y: '0vh' }}
              >
                <img
                  src={film.image}
                  alt={film.title}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
