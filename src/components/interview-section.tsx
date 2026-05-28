'use client';

type InterviewProps = {
  label: string;
  name: string;
  duration: string;
  image: string;
};

export default function InterviewSection({ label, name, duration, image }: InterviewProps) {
  return (
    <section className="relative bg-[#070707] text-[#f0e8dc] w-full min-h-screen flex items-center overflow-hidden">
      {/* ── Full-width 16:9 video background ── */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <img
            src={image}
            alt={label}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* ── Dark overlay for readability ── */}
      <div className="absolute inset-0 bg-black/60" />

      {/* ── Content overlay ── */}
      <div className="relative z-10 w-full px-8 md:px-12 lg:px-16 max-w-6xl mx-auto flex flex-col items-start gap-4">
        <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase opacity-30">
          {label}
        </span>
        <h2 className="font-['Playfair_Display',serif] text-[clamp(1.8rem,3.5vw,3rem)] font-bold leading-tight">
          {name}
        </h2>
        <span className="text-[0.65rem] font-medium tracking-[0.15em] uppercase opacity-40">
          {duration}
        </span>
        <p className="text-[0.75rem] leading-relaxed opacity-40 max-w-sm">
          A conversation about storytelling, the Khasi film industry, and the journey behind
          bringing authentic narratives from Meghalaya to the global stage.
        </p>
        <button className="mt-4 flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.12em] uppercase opacity-70 hover:opacity-100 transition-opacity duration-300">
          <span className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center">
            <svg className="w-4 h-4 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          Watch Interview
        </button>
      </div>
    </section>
  );
}
