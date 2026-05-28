'use client';

const VIDEOS = [
  {
    id: 'v1',
    title: 'Ka Daw — Official Trailer',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=640&h=360&fit=crop&auto=format',
  },
  {
    id: 'v2',
    title: 'Lanot — Documentary Teaser',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=640&h=360&fit=crop&auto=format',
  },
  {
    id: 'v3',
    title: 'Kñi — Behind the Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&h=360&fit=crop&auto=format',
  },
  {
    id: 'v4',
    title: 'Kadaw — Film Clip',
    thumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b5f0?w=640&h=360&fit=crop&auto=format',
  },
];

export default function MusicVideoSection() {
  return (
    <section className="relative z-[80] w-full bg-[#070707] py-24 md:py-32">
      <div className="text-center mb-16 px-4">
        <h2 className="font-['Playfair_Display',serif] text-[#f0e8dc] text-[clamp(1.8rem,3.5vw,3rem)] font-bold">
          Music Videos
        </h2>
        <p className="text-[#f0e8dc]/50 text-[0.7rem] tracking-[0.12em] uppercase mt-3">
          Visual stories from Kiki Garod Studio
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-xl bg-[#111] border border-white/5"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/10">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-7 h-7 ml-1 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[#f0e8dc] text-sm font-medium leading-tight">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
