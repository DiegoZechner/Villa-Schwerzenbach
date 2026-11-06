'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RoomData } from '@/data/rooms';

type RoomWithImages = RoomData & { images?: string[] };
type ToggleFilter = 'all' | 'suites' | 'apartments';

function MosaicRoomItem({
  room,
  isTall,
  onHoverChange,
  onMouseMove,
}: {
  room: RoomWithImages;
  isTall: boolean;
  onHoverChange: (hovering: boolean) => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const formattedSize = `${room.size.toString().replace('.', ',')} m²`;

  return (
    <div
      ref={itemRef}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <Link
        href={`/rooms/${room.slug}`}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onMouseMove={onMouseMove}
        className={`block relative w-full overflow-hidden group cursor-none ${
          isTall
            ? 'h-[360px] sm:h-[440px] md:h-[510px]'
            : 'h-[280px] sm:h-[330px] md:h-[380px]'
        }`}
      >
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Subtle dark gradient at bottom for crisp legibility */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Bottom-Right Info inside the Photo: Room Name, m², Stylish Avatar Capacity Icon */}
        <div className="absolute bottom-3.5 right-3.5 left-3.5 z-20 flex flex-wrap items-center justify-end gap-1.5 sm:gap-2 pointer-events-none">
          <span className="bg-black/75 backdrop-blur-md text-[#f3efe6] font-sans font-light text-xs sm:text-[13px] tracking-wide px-3 py-1.5 rounded-md border border-white/10">
            {room.name}
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
            <span>{room.capacity}</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

function TwoColumnMosaic({
  rooms,
  onHoverChange,
  onMouseMove,
}: {
  rooms: RoomWithImages[];
  onHoverChange: (hovering: boolean) => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) {
  const leftColRooms = rooms.filter((_, idx) => idx % 2 === 0);
  const rightColRooms = rooms.filter((_, idx) => idx % 2 === 1);

  return (
    <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3.5">
      {/* Left Mosaic Column: Tall, Short, Tall, Short */}
      <div className="w-full md:w-1/2 flex flex-col gap-2.5 sm:gap-3.5">
        {leftColRooms.map((room, colIdx) => (
          <MosaicRoomItem
            key={room.id}
            room={room}
            isTall={colIdx % 2 === 0}
            onHoverChange={onHoverChange}
            onMouseMove={onMouseMove}
          />
        ))}
      </div>

      {/* Right Mosaic Column: Short, Tall, Short, Tall */}
      <div className="w-full md:w-1/2 flex flex-col gap-2.5 sm:gap-3.5">
        {rightColRooms.map((room, colIdx) => (
          <MosaicRoomItem
            key={room.id}
            room={room}
            isTall={colIdx % 2 === 1}
            onHoverChange={onHoverChange}
            onMouseMove={onMouseMove}
          />
        ))}
      </div>
    </div>
  );
}

export default function RoomGrid({ initialRooms }: { initialRooms: RoomWithImages[] }) {
  // Hero animation stage: 0 = initial hidden, 1 = rise from bottom to center, 2 = split left/right, 3 = move to corners (scroll unlocked)
  const [heroStage, setHeroStage] = useState<number>(0);
  // Dynamic Island expansion progress (0 = tiny notch, 1 = full toggle island)
  const [islandProgress, setIslandProgress] = useState<number>(0);
  // Filter: 'all' (default), 'suites', or 'apartments'
  const [activeFilter, setActiveFilter] = useState<ToggleFilter>('all');

  // Cursor-following "Book Now" tooltip state
  const [isHoveringPhoto, setIsHoveringPhoto] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const notchTrackRef = useRef<HTMLDivElement>(null);

  // Lock page scrolling until hero animation reaches stage 3
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setHeroStage(1), 150);
    const t2 = setTimeout(() => setHeroStage(2), 1200);
    const t3 = setTimeout(() => {
      setHeroStage(3);
      document.body.style.overflow = '';
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, []);

  // Stationary scroll track for the Dynamic Island Notch:
  // When the notch reaches its stationary position on screen, scrolling expands it from 0 -> 1 before scrolling further down
  useEffect(() => {
    const handleScroll = () => {
      if (!notchTrackRef.current) return;
      const rect = notchTrackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const pinTop = 96; // top-24 (96px)
      const totalPinnedScroll = Math.max(1, rect.height - 90);

      if (rect.top > windowH * 0.75) {
        setIslandProgress(0);
      } else if (rect.top <= pinTop) {
        const scrolled = pinTop - rect.top;
        const raw = 0.25 + (scrolled / totalPinnedScroll) * 0.75;
        setIslandProgress(Math.max(0, Math.min(1, raw)));
      } else {
        // Pre-expansion as it approaches pinTop
        const approachRaw = ((windowH * 0.75 - rect.top) / (windowH * 0.75 - pinTop)) * 0.25;
        setIslandProgress(Math.max(0, Math.min(0.25, approachRaw)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleClick = (target: 'suites' | 'apartments') => {
    // Clicking the same active toggle resets back to 'all' (default)
    setActiveFilter((prev) => (prev === target ? 'all' : target));
  };

  const handlePhotoMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Suites (Studios) shown first, Apartments (multi-room units) shown second
  const suitesList = initialRooms.filter((r) => r.category === 'Studio');
  const apartmentsList = initialRooms.filter((r) => r.category !== 'Studio');

  const showSuites = activeFilter === 'all' || activeFilter === 'suites';
  const showApartments = activeFilter === 'all' || activeFilter === 'apartments';

  const getApartmentsTransform = () => {
    if (heroStage === 0) return 'translate(0px, 120px)';
    if (heroStage === 1) return 'translate(0px, 0px)';
    if (heroStage === 2) return 'translate(-24vw, 0px)';
    return 'translate(-24vw, -24vh)';
  };

  const getSuitesTransform = () => {
    if (heroStage === 0) return 'translate(0px, 120px)';
    if (heroStage === 1) return 'translate(0px, 0px)';
    if (heroStage === 2) return 'translate(22vw, 0px)';
    return 'translate(22vw, 24vh)';
  };

  // Interpolate Dynamic Island dimensions from small notch (92x26) to full interactive island (350x52)
  const islandWidth = Math.round(92 + islandProgress * 258);
  const islandHeight = Math.round(26 + islandProgress * 26);
  const isIslandExpanded = islandProgress > 0.7;

  return (
    <div className="w-full">
      {/* Floating "Book Now" Cursor Tooltip (directly above mouse cursor on photo hover) */}
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

      {/* 1. Choreographed Dark Intro Hero ("Apartments & Suites") */}
      <section className="relative h-screen w-full bg-[#090a0c]/95 overflow-hidden flex items-center justify-center select-none border-b border-white/10">
        <div
          className={`absolute w-[440px] h-[440px] rounded-full bg-white/5 blur-[130px] transition-opacity duration-1000 ${
            heroStage >= 2 ? 'opacity-100' : 'opacity-35'
          }`}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
          <div
            style={{
              transform: getApartmentsTransform(),
              opacity: heroStage === 0 ? 0 : 1,
              transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out',
            }}
            className="font-villa-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-[0.14em] uppercase"
          >
            Apartments
          </div>

          <div
            style={{
              transform: getSuitesTransform(),
              opacity: heroStage === 0 ? 0 : 1,
              transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out',
            }}
            className="font-miva-display italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-cream tracking-wide mt-2"
          >
            &amp; Suites
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 px-6 text-center ${
              heroStage === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-cream/75 mb-6">
              VILLA SCHWERZENBACH • BREGENZ
            </p>
            <div className="flex flex-col items-center gap-3 text-cream/80">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
              <div className="w-px h-12 bg-gradient-to-b from-cream to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stationary Apple Dynamic Island Notch + Tight Mosaic Content Section */}
      <div className="relative pt-8 pb-28 px-3 sm:px-6 md:px-10 max-w-[1440px] mx-auto">
        
        {/* Dedicated Scroll Track: Notch stays stationary while opening, and once open stays stationary at the top of the section */}
        <div ref={notchTrackRef} className="relative h-[48vh] mb-6">
          <div className="sticky top-24 z-30 flex justify-center">
            <div
              style={{
                width: `${islandWidth}px`,
                height: `${islandHeight}px`,
              }}
              className="bg-[#050607]/95 backdrop-blur-xl rounded-full border border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.8)] flex items-center justify-center p-1.5 overflow-hidden"
            >
              {/* Compact Notch Indicator (visible while opening) */}
              {!isIslandExpanded && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cream/80 animate-pulse" />
                  <span className="w-6 h-1 rounded-full bg-white/25" />
                </div>
              )}

              {/* Expanded Toggle Buttons: Suites | Apartments (clicking active button resets to 'all') */}
              {isIslandExpanded && (
                <div className="w-full h-full grid grid-cols-2 gap-1.5 items-center">
                  <button
                    type="button"
                    onClick={() => handleToggleClick('suites')}
                    className={`h-full rounded-full font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                      activeFilter === 'suites'
                        ? 'bg-cream text-[#090a0c] font-semibold shadow-md'
                        : 'text-cream/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Suites
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleClick('apartments')}
                    className={`h-full rounded-full font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                      activeFilter === 'apartments'
                        ? 'bg-cream text-[#090a0c] font-semibold shadow-md'
                        : 'text-cream/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Apartments
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. SUITES MOSAIC (Shown First, with narrow spacing between images) */}
        {showSuites && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="font-villa-editorial text-xl sm:text-2xl text-cream uppercase tracking-[0.22em]">
                Suites
              </h2>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-cream/60">
                {suitesList.length} Suites
              </span>
            </div>

            <TwoColumnMosaic
              rooms={suitesList}
              onHoverChange={setIsHoveringPhoto}
              onMouseMove={handlePhotoMouseMove}
            />
          </div>
        )}

        {/* Thin Horizontal Line Divider between Suites and Apartments */}
        {showSuites && showApartments && (
          <div className="my-10 md:my-14">
            <div className="w-full h-px bg-white/25" />
          </div>
        )}

        {/* 4. APARTMENTS MOSAIC (Shown Second, with narrow spacing between images) */}
        {showApartments && (
          <div>
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="font-villa-editorial text-xl sm:text-2xl text-cream uppercase tracking-[0.22em]">
                Apartments
              </h2>
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-cream/60">
                {apartmentsList.length} Apartments
              </span>
            </div>

            <TwoColumnMosaic
              rooms={apartmentsList}
              onHoverChange={setIsHoveringPhoto}
              onMouseMove={handlePhotoMouseMove}
            />
          </div>
        )}

      </div>
    </div>
  );
}
