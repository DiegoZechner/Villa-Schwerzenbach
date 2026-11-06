'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allRooms } from '@/data/rooms';

export default function ApartmentSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Order Suites (Top 11 & 12) first, then Apartments (Top 02 - 10) for consistency with /rooms
  const orderedRooms = [
    ...allRooms.filter((r) => r.topNumber === '11' || r.topNumber === '12'),
    ...allRooms.filter((r) => r.topNumber !== '11' && r.topNumber !== '12'),
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.42, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.42, behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="w-full border-t-[3px] border-white/20 pb-20 pt-14 relative overflow-hidden"
      style={{
        backgroundColor: '#08090a',
        backgroundImage:
          "linear-gradient(rgba(6, 7, 9, 0.58), rgba(6, 7, 9, 0.58)), url('/images/backgroundimage_black.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '420px auto',
      }}
    >
      {/* Floating "Book Now" Cursor Tooltip on Photo Hover */}
      <div
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y - 14}px`,
          transform: `translate(-50%, -100%) scale(${isHoveringPhoto ? 1 : 0.75})`,
          opacity: isHoveringPhoto ? 1 : 0,
        }}
        className="fixed z-50 pointer-events-none transition-[opacity,transform] duration-150 ease-out bg-[#e5dec9]/95 text-[#1a1612] backdrop-blur-md px-3.5 py-1.5 rounded-md font-sans text-xs font-medium tracking-wide shadow-[0_8px_24px_rgba(0,0,0,0.45)] whitespace-nowrap"
      >
        Book Now
      </div>

      {/* Top Bar with Large Editorial Header, Units Count & Arrows (Consistent with /rooms) */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 px-6 md:px-12 pb-8">
        <div className="flex items-baseline gap-5">
          <h2 className="font-villa-editorial text-3xl sm:text-5xl md:text-6xl tracking-[0.22em] uppercase text-cream">
            Suites &amp; Apartments
          </h2>
          <span className="font-sans text-xs sm:text-sm md:text-base font-medium tracking-[0.25em] uppercase text-cream/75">
            {orderedRooms.length} Units
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-cream hover:text-[#08090a] text-cream transition-colors text-2xl font-light flex items-center justify-center cursor-pointer"
            aria-label="Scroll Left"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-cream hover:text-[#08090a] text-cream transition-colors text-2xl font-light flex items-center justify-center cursor-pointer"
            aria-label="Scroll Right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Mosaic-Style Frameless Photo Slider with Narrow Gap & Bottom-Right Badges */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3.5 px-6 md:px-12 scroll-smooth items-end"
      >
        {orderedRooms.map((apt, i) => {
          const isTall = i % 2 === 0;
          const formattedSize = `${apt.size.toString().replace('.', ',')} m²`;

          return (
            <Link
              key={apt.id}
              href={`/rooms/${apt.slug}`}
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
              onMouseMove={handleMouseMove}
              className={`group relative shrink-0 snap-center w-[84vw] sm:w-[46vw] md:w-[36vw] lg:w-[30vw] overflow-hidden cursor-none ${
                isTall
                  ? 'h-[360px] sm:h-[430px] md:h-[490px]'
                  : 'h-[300px] sm:h-[360px] md:h-[410px]'
              }`}
            >
              <Image
                src={apt.image}
                alt={apt.name}
                fill
                sizes="(max-width: 768px) 84vw, 35vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Subtle dark gradient at bottom for crisp legibility */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Bottom-Right Info inside the Photo: Room Name, m², Stylish Avatar Capacity Icon */}
              <div className="absolute bottom-3.5 right-3.5 left-3.5 z-20 flex flex-wrap items-center justify-end gap-1.5 sm:gap-2 pointer-events-none">
                <span className="bg-black/75 backdrop-blur-md text-[#f3efe6] font-sans font-light text-xs sm:text-[13px] tracking-wide px-3 py-1.5 rounded-md border border-white/10">
                  {apt.name}
                </span>

                {/* Size (m²) Badge */}
                <span className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-[#e0dacb] font-sans text-xs px-2.5 py-1.5 rounded-md border border-white/10">
                  <svg
                    className="w-3.5 h-3.5 text-[#c8c0ae]"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  >
                    <path d="M2.5 5.5V2.5H5.5M10.5 2.5H13.5V5.5M13.5 10.5V13.5H10.5M5.5 13.5H2.5V10.5" />
                  </svg>
                  <span>{formattedSize}</span>
                </span>

                {/* Persons Capacity Badge with Stylish WhatsApp-style Avatar Silhouette */}
                <span className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-[#e0dacb] font-sans text-xs px-2.5 py-1.5 rounded-md border border-white/10">
                  <span className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center overflow-hidden shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[#e6dfd1] translate-y-[1px]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2.5c-3.33 0-10 1.67-10 5v2.5h20v-2.5c0-3.33-6.67-5-10-5z" />
                    </svg>
                  </span>
                  <span>{apt.capacity}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
