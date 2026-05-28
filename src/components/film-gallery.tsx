'use client';

import React from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';

interface FilmData {
  id: string;
  title: string;
  year: string;
  type: string;
  description: string;
  image: string;
}

function toGallery(film: FilmData): GalleryItem {
  return {
    common: film.title,
    binomial: `${film.year} — ${film.type}`,
    photo: {
      url: film.image,
      text: film.description,
      by: 'Kiki Garod Studio',
    },
  };
}

export default function FilmGallery({ projects }: { projects: FilmData[] }) {
  const galleryData = projects.map(toGallery);

  return (
    <section className="relative z-[60] w-full bg-[#070707]" style={{ height: '500vh' }}>
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-20 z-10">
          <h2 className="font-['Playfair_Display',serif] text-[#f0e8dc] text-[clamp(1.8rem,3.5vw,3rem)] font-bold">
            Film Gallery
          </h2>
          <p className="text-[#f0e8dc]/50 text-[0.7rem] tracking-[0.12em] uppercase mt-2">
            Scroll to rotate
          </p>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} />
        </div>
      </div>
    </section>
  );
}
