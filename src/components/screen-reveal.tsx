'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function ScreenReveal({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const clipInset = useTransform(
    scrollYProgress,
    [0, 1],
    ['0 0 0 100%', '0 0 0 0%']
  );

  return (
    <div ref={sectionRef} className="relative bg-[#070707]">
      <motion.div
        className="w-full min-h-screen bg-[#070707]"
        style={{
          clipPath: clipInset,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
