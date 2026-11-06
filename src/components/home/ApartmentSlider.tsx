'use client';
import { useRef, useState } from 'react';
import { allRooms } from '@/data/rooms';
import { RoomPhotoTile, CursorTooltip } from '@/components/rooms/RoomPhotoTile';

export default function ApartmentSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const orderedRooms = [
    ...allRooms.filter((r) => r.topNumber === '11' || r.topNumber === '12'),
    ...allRooms.filter((r) => r.topNumber !== '11' && r.topNumber !== '12'),
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.4, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.4, behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="w-full border-t-[3px] border-white/20 py-10 md:py-12 relative overflow-hidden"
      style={{
        backgroundColor: '#08090a',
        backgroundImage:
          "linear-gradient(rgba(6, 7, 9, 0.58), rgba(6, 7, 9, 0.58)), url('/images/backgroundimage_black.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '420px auto',
      }}
    >
      <CursorTooltip visible={isHoveringPhoto} x={mousePos.x} y={mousePos.y} label="Book Now" />

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 px-6 md:px-12 pb-6">
        <div className="flex items-baseline gap-4">
          <h2 className="font-villa-editorial text-2xl sm:text-4xl md:text-5xl tracking-[0.22em] uppercase text-cream">
            Suites &amp; Apartments
          </h2>
          <span className="font-sans text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-cream/75">
            {orderedRooms.length} Units
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-cream hover:text-[#08090a] text-cream transition-colors text-xl font-light flex items-center justify-center cursor-pointer"
            aria-label="Scroll Left"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-cream hover:text-[#08090a] text-cream transition-colors text-xl font-light flex items-center justify-center cursor-pointer"
            aria-label="Scroll Right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Equal-Height Compact Room Cards so the whole widget fits on one screen */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 px-6 md:px-12 scroll-smooth items-stretch"
      >
        {orderedRooms.map((apt) => (
          <RoomPhotoTile
            key={apt.id}
            room={apt}
            sizes="(max-width: 768px) 72vw, 25vw"
            onHoverChange={setIsHoveringPhoto}
            onMouseMove={handleMouseMove}
            className="shrink-0 snap-center w-[72vw] sm:w-[40vw] md:w-[29vw] lg:w-[23vw] h-[240px] sm:h-[275px] md:h-[310px]"
          />
        ))}
      </div>
    </section>
  );
}
