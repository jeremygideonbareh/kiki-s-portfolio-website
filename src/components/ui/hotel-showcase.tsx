'use client';

import { cn } from '@/lib/utils';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
}

interface HotelShowcaseProps {
  videos?: VideoItem[];
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Ka Daw — Official Trailer',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=640&h=360&fit=crop&auto=format',
    duration: '02:30',
  },
  {
    id: 'v2',
    title: 'Lanot — Documentary Teaser',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=640&h=360&fit=crop&auto=format',
    duration: '01:45',
  },
  {
    id: 'v3',
    title: 'Kñi — Behind the Scenes',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&h=360&fit=crop&auto=format',
    duration: '03:15',
  },
  {
    id: 'v4',
    title: 'Kadaw — Film Clip',
    thumbnail: 'https://images.unsplash.com/photo-1598899134739-24c46f58b5f0?w=640&h=360&fit=crop&auto=format',
    duration: '01:20',
  },
  {
    id: 'v5',
    title: '9-Lad — Interview',
    thumbnail: 'https://images.unsplash.com/photo-1578022761797-b8636e177a88?w=640&h=360&fit=crop&auto=format',
    duration: '05:00',
  },
  {
    id: 'v6',
    title: 'Kiki Garod Studio — Showreel',
    thumbnail: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=640&h=360&fit=crop&auto=format',
    duration: '04:22',
  },
];

export default function HotelShowcase({ videos = DEFAULT_VIDEOS }: HotelShowcaseProps) {
  return (
    <section className="relative z-[90] w-full bg-[#070707] py-24 md:py-32">
      <div className="text-center mb-16 px-4 text-[#f0e8dc]">
        <h2
          className="font-['Playfair_Display',serif] font-bold leading-tight"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
        >
          Music Videos
        </h2>
        <p className="mt-3 text-[0.7rem] tracking-[0.12em] uppercase text-[#f0e8dc]/50">
          Visual stories from Kiki Garod Studio
        </p>
      </div>

      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group relative overflow-hidden rounded-xl"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'transform 0.3s var(--cubic-default)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
                style={{
                  transition: 'transform 0.5s var(--cubic-default)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(4px)',
                    transition: 'transform 0.3s var(--cubic-default)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <svg className="w-7 h-7 ml-1 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {video.duration && (
                <span
                  className="absolute bottom-2 right-2 text-[11px] font-medium px-1.5 py-0.5 rounded text-[#f0e8dc]"
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                  }}
                >
                  {video.duration}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3
                className="font-medium leading-tight text-[#f0e8dc]"
                style={{
                  fontSize: 'var(--size-font)',
                }}
              >
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
