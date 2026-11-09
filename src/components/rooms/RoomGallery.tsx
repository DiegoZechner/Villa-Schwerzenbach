'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const areaTitles = [
  'Living Room',
  'Master Bedroom',
  'Kitchen & Dining',
  'Bathroom & Spa',
  'Interior View',
  'Lounge & Detail',
  'Architecture & Light',
  'Suite Impression',
  'Sleeping Area',
  'Private Corner',
  'Ambient View',
  'Design Detail',
];

function getPhotoTitle(index: number, topNumber: string): string {
  const area = areaTitles[index % areaTitles.length];
  return `${area} Top ${topNumber}`;
}

function getMosaicSpanClass(index: number, total: number): string {
  if (total === 1) return 'md:col-span-12 h-[420px] md:h-[540px]';
  if (total === 2) return 'md:col-span-6 h-[340px] md:h-[480px]';
  if (total === 3) {
    if (index === 0) return 'md:col-span-7 md:row-span-2 h-[360px] md:h-[520px]';
    return 'md:col-span-5 h-[250px] md:h-[254px]';
  }

  // 4 or more images:
  // Index 0: 1 Big Main Image (left, 7 cols, 2 rows tall)
  // Index 1: Medium-bigger image (top-right, 5 cols)
  // Index 2 & 3: Smaller & medium pair (bottom-right, 2 cols + 3 cols)
  if (index === 0) return 'md:col-span-7 md:row-span-2 h-[360px] sm:h-[440px] md:h-[520px]';
  if (index === 1) return 'md:col-span-5 h-[220px] sm:h-[254px]';
  if (index === 2) return 'md:col-span-2 h-[220px] sm:h-[254px]';
  if (index === 3) return 'md:col-span-3 h-[220px] sm:h-[254px]';

  // Subsequent rows alternate small (3 cols), bigger (5 cols), medium (4 cols)
  const mod = (index - 4) % 6;
  if (mod === 0) return 'md:col-span-5 h-[230px] md:h-[270px]';
  if (mod === 1) return 'md:col-span-4 h-[230px] md:h-[270px]';
  if (mod === 2) return 'md:col-span-3 h-[230px] md:h-[270px]';
  if (mod === 3) return 'md:col-span-3 h-[230px] md:h-[270px]';
  if (mod === 4) return 'md:col-span-5 h-[230px] md:h-[270px]';
  return 'md:col-span-4 h-[230px] md:h-[270px]';
}

export default function RoomGallery({
  images,
  topNumber = '12',
}: {
  images: string[];
  topNumber?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
  };

  // Allow keyboard navigation in Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <>
      {/* Mosaic of Images: 1 Big One + Several Small & Medium-Bigger Ones */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {images.map((img, idx) => {
          const title = getPhotoTitle(idx, topNumber);
          const spanClass = getMosaicSpanClass(idx, images.length);

          return (
            <div
              key={`${img}-${idx}`}
              onClick={() => setLightboxIndex(idx)}
              className={`relative overflow-hidden group cursor-pointer bg-[#141416] ${spanClass}`}
            >
              <Image
                src={img}
                alt={title}
                fill
                priority={idx === 0}
                sizes={idx === 0 ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 768px) 100vw, 35vw'}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle bottom gradient for caption legibility */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

              {/* Hover Dark Tint & Zoom Icon */}
              <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/55 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/15">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>

              {/* Image Name Label (e.g. "Living Room Top 12") */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                <span className="bg-black/70 backdrop-blur-md text-[#f3efe6] font-sans font-light text-[11px] sm:text-xs tracking-[0.12em] uppercase px-3 py-1.5 rounded border border-white/10">
                  {title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal when user clicks any image */}
      {lightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Schließen"
            className="absolute top-6 right-6 sm:right-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl transition-colors z-50 cursor-pointer"
          >
            ✕
          </button>

          {/* Main Enlarged Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[75vh] sm:h-[80vh] flex items-center justify-center"
          >
            <Image
              src={images[lightboxIndex]}
              alt={getPhotoTitle(lightboxIndex, topNumber)}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Left / Right Navigation & Bottom Title */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Vorheriges Bild"
                className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl flex items-center justify-center z-50 transition-colors cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Nächstes Bild"
                className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl flex items-center justify-center z-50 transition-colors cursor-pointer"
              >
                ›
              </button>
            </>
          )}

          {/* Caption & Counter inside Lightbox */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex items-center gap-4 text-white/90 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase"
          >
            <span>{getPhotoTitle(lightboxIndex, topNumber)}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/60">
              {lightboxIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
