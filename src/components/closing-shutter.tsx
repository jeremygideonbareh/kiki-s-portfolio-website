'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ClosingShutter() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const shutterY = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);

  return (
    <section
      ref={sectionRef}
      className="h-[200vh] relative z-50"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[#070707]"
          style={{ y: shutterY }}
        />
      </div>
    </section>
  );
}
