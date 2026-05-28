'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center p-8 sm:p-16 z-[2]"
      style={{
        background: 'rgba(7,7,7,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        opacity,
      }}
    >
      <div className="text-center max-w-[620px]">
        <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[1.1] text-[#f0e8dc] mb-5">
          Let&apos;s Create<br />Something <span className="italic font-normal opacity-70">Cinematic</span>
        </h2>
        <p className="text-[0.85rem] text-[rgba(255,255,255,0.5)] tracking-[0.04em] leading-[1.6] mb-10">
          Available for film projects, music videos, and creative collaborations.
        </p>
        <a
          href="mailto:hello@kikigarod.com"
          className="inline-block px-[2.8rem] py-[0.9rem] border border-[rgba(255,255,255,0.2)] text-[#f0e8dc] font-sans text-[0.7rem] font-semibold tracking-[0.15em] uppercase no-underline transition-all duration-[0.35s] cursor-pointer bg-transparent hover:bg-[#f0e8dc] hover:text-[#070707] hover:border-[#f0e8dc]"
        >
          Book Now
        </a>
        <div className="mt-12 flex justify-center gap-12 text-[0.7rem] tracking-[0.04em] max-sm:flex-col max-sm:gap-6">
          <div className="flex flex-col gap-[0.3rem]">
            <span className="text-[rgba(255,255,255,0.3)] uppercase text-[0.6rem] tracking-[0.1em]">Email</span>
            <span className="text-[rgba(255,255,255,0.7)]">hello@kikigarod.com</span>
          </div>
          <div className="flex flex-col gap-[0.3rem]">
            <span className="text-[rgba(255,255,255,0.3)] uppercase text-[0.6rem] tracking-[0.1em]">Based in</span>
            <span className="text-[rgba(255,255,255,0.7)]">Shillong, Meghalaya</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
