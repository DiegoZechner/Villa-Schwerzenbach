'use client';
import { useState, useEffect, useRef } from 'react';
import { RoomData } from '@/data/rooms';
import ChoreographedHero from '@/components/ui/ChoreographedHero';
import { RoomPhotoTile, CursorTooltip } from '@/components/rooms/RoomPhotoTile';

type ToggleFilter = 'all' | 'suites' | 'apartments';

function MosaicRoomItem({
  room,
  isTall,
  onHoverChange,
  onMouseMove,
}: {
  room: RoomData;
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

  return (
    <div
      ref={itemRef}
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <RoomPhotoTile
        room={room}
        onHoverChange={onHoverChange}
        onMouseMove={onMouseMove}
        className={`w-full ${
          isTall
            ? 'h-[360px] sm:h-[440px] md:h-[510px]'
            : 'h-[280px] sm:h-[330px] md:h-[380px]'
        }`}
      />
    </div>
  );
}

function TwoColumnMosaic({
  rooms,
  onHoverChange,
  onMouseMove,
}: {
  rooms: RoomData[];
  onHoverChange: (hovering: boolean) => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) {
  const leftColRooms = rooms.filter((_, idx) => idx % 2 === 0);
  const rightColRooms = rooms.filter((_, idx) => idx % 2 === 1);

  return (
    <div className="flex flex-col md:flex-row gap-2.5 sm:gap-3.5">
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

export default function RoomGrid({ initialRooms }: { initialRooms: RoomData[] }) {
  const [islandProgress, setIslandProgress] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<ToggleFilter>('all');
  const [isHoveringPhoto, setIsHoveringPhoto] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const notchTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowH = window.innerHeight;
      const scrollY = window.scrollY;
      // Fast expansion as soon as user starts scrolling down from hero
      const start = windowH * 0.04;
      const end = windowH * 0.24;
      const raw = (scrollY - start) / (end - start);
      setIslandProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleClick = (target: 'suites' | 'apartments') => {
    setActiveFilter((prev) => (prev === target ? 'all' : target));
  };

  const handlePhotoMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const suitesList = initialRooms.filter((r) => r.topNumber === '11' || r.topNumber === '12');
  const apartmentsList = initialRooms.filter((r) => r.topNumber !== '11' && r.topNumber !== '12');

  const showSuites = activeFilter === 'all' || activeFilter === 'suites';
  const showApartments = activeFilter === 'all' || activeFilter === 'apartments';

  const islandWidth = Math.round(92 + islandProgress * 258);
  const islandHeight = Math.round(26 + islandProgress * 26);
  const isIslandExpanded = islandProgress > 0.7;

  return (
    <div className="w-full">
      <CursorTooltip visible={isHoveringPhoto} x={mousePos.x} y={mousePos.y} label="Book Now" />

      <ChoreographedHero
        primaryText="Suites"
        secondaryText="& Apartments"
        subtitle="VILLA SCHWERZENBACH • BREGENZ"
        bgClassName="bg-[#090a0c]/95 border-b border-white/10"
        glowClassName="bg-white/5"
        primaryClassName="font-villa-editorial text-white tracking-[0.14em]"
        secondaryClassName="font-miva-display italic text-cream tracking-wide"
        subtitleClassName="text-cream/75"
        scrollIndicatorClassName="text-cream/80"
        scrollLineClassName="from-cream"
        leftSplitVw={-24}
      />

      <div className="relative pt-6 pb-20 px-3 sm:px-6 md:px-10 max-w-[1440px] mx-auto">
        <div ref={notchTrackRef} className="flex justify-center mb-6">
          <div
            style={{
              width: `${islandWidth}px`,
              height: `${islandHeight}px`,
            }}
            className="bg-[#050607]/95 backdrop-blur-xl rounded-full border border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.8)] flex items-center justify-center p-1.5 overflow-hidden"
          >
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

        {showSuites && (
          <div className="mb-12">
            <div className="flex items-baseline justify-between mb-6 px-1">
              <h2 className="font-villa-editorial text-4xl sm:text-5xl md:text-6xl text-cream uppercase tracking-[0.22em]">
                Suites
              </h2>
              <span className="font-sans text-sm sm:text-base md:text-lg font-medium tracking-[0.25em] uppercase text-cream/80">
                {suitesList.length} Units
              </span>
            </div>

            <TwoColumnMosaic
              rooms={suitesList}
              onHoverChange={setIsHoveringPhoto}
              onMouseMove={handlePhotoMouseMove}
            />
          </div>
        )}

        {showSuites && showApartments && (
          <div className="my-12 md:my-16">
            <div className="w-full h-px bg-white/30" />
          </div>
        )}

        {showApartments && (
          <div>
            <div className="flex items-baseline justify-between mb-6 px-1">
              <h2 className="font-villa-editorial text-4xl sm:text-5xl md:text-6xl text-cream uppercase tracking-[0.22em]">
                Apartments
              </h2>
              <span className="font-sans text-sm sm:text-base md:text-lg font-medium tracking-[0.25em] uppercase text-cream/80">
                {apartmentsList.length} Units
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
