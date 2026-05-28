'use client';

import TeamShowcase from '@/components/ui/team-showcase';

export default function TeamSection() {
  return (
    <section className="relative z-[70] w-full bg-[#070707] py-24 md:py-32">
      <div className="text-center mb-16 px-4">
        <h2 className="font-['Playfair_Display',serif] text-[#f0e8dc] text-[clamp(1.8rem,3.5vw,3rem)] font-bold">
          The Team
        </h2>
        <p className="text-[#f0e8dc]/50 text-[0.7rem] tracking-[0.12em] uppercase mt-3">
          Behind the lens
        </p>
      </div>
      <TeamShowcase />
    </section>
  );
}
