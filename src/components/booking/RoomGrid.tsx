'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RoomData } from '@/data/rooms';

type RoomWithImages = RoomData & { images?: string[] };

function RoomCard({ room, index }: { room: RoomWithImages; index: number }) {
  const images = room.images && room.images.length > 0 ? room.images : [room.image];
  const [imgIdx, setImgIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const bulletPoints = [
    `${room.size.toString().replace('.', ',')} m² • ${room.type} (${room.floor})`,
    `Max. ${room.capacity} Personen • ${room.bedrooms} Schlafzimmer (${room.beds} ${room.beds === 1 ? 'Bett' : 'Betten'})`,
    `Ausrichtung: ${room.orientation}${room.balcony ? ` • Privater Balkon (${room.balcony})` : ''}`,
    ...(room.notes ? [room.notes] : []),
    ...(room.locationNote ? [room.locationNote] : []),
  ];

  return (
    <div
      ref={cardRef}
      className={`bg-cream shadow-2xl overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.97]'
      }`}
    >
      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch`}>
        
        {/* Frameless Image Carousel with Skip Arrows */}
        <div className="relative w-full lg:w-1/2 h-[360px] sm:h-[420px] lg:h-[480px] overflow-hidden group shrink-0">
          <Link href={`/rooms/${room.slug}`} className="block w-full h-full relative">
            <Image
              src={images[imgIdx]}
              alt={`${room.name} - Bild ${imgIdx + 1}`}
              fill
              className="object-cover transition-transform duration-700"
            />
          </Link>

          {/* Left / Right Skip Buttons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImg}
                aria-label="Vorheriges Bild"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-bordeaux text-white flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextImg}
                aria-label="Nächstes Bild"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/45 hover:bg-bordeaux text-white flex items-center justify-center transition-all opacity-85 group-hover:opacity-100 cursor-pointer"
              >
                ›
              </button>

              {/* Counter Badge */}
              <div className="absolute bottom-4 right-4 z-20 bg-black/55 text-white font-sans text-[10px] tracking-[0.2em] px-3 py-1">
                {imgIdx + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Info Half with Bullet Points (No Long Text Paragraph) */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="font-script text-2xl md:text-3xl text-villa-red">
                {room.tagline}
              </span>
              <span className="font-villa-editorial text-lg text-bordeaux">
                CHF {room.price} <span className="font-sans text-[10px] tracking-widest uppercase text-espresso/60">/ Nacht</span>
              </span>
            </div>

            <h2 className="font-villa-editorial text-2xl sm:text-3xl lg:text-4xl text-espresso mb-6 uppercase tracking-[0.15em] leading-tight">
              {room.name}
            </h2>

            {/* Key Bullet Points */}
            <ul className="space-y-3 mb-8 border-t border-espresso/15 pt-6">
              {bulletPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-sm text-espresso/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-villa-red shrink-0 mt-2"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-espresso/15 flex items-center justify-between gap-4">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-villa-blue font-semibold">
              {room.floor} • {room.type}
            </span>
            <Link
              href={`/rooms/${room.slug}`}
              className="inline-block bg-bordeaux text-white px-7 py-3.5 font-sans font-medium text-xs tracking-[0.22em] uppercase hover:bg-villa-red transition-colors"
            >
              Apartment Ansehen
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function RoomGrid({ initialRooms }: { initialRooms: RoomWithImages[] }) {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterGuests, setFilterGuests] = useState<number | null>(null);

  const categories = ['All', 'Studio', '1-Zimmer-Wohnung', '3-Zimmer-Wohnung'];
  const guestOptions = [
    { label: 'Any Guests', value: null },
    { label: '2 Guests', value: 2 },
    { label: '3 Guests', value: 3 },
    { label: '5 Guests', value: 5 },
  ];

  const filteredRooms = initialRooms.filter(room => {
    const matchCategory = filterCategory === 'All' || room.category === filterCategory;
    const matchGuests = filterGuests === null || room.capacity >= filterGuests;
    return matchCategory && matchGuests;
  });

  return (
    <div>
      {/* Filter Bar */}
      <div className="relative z-20 bg-cream p-6 md:p-8 shadow-xl mb-14 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
        
        <div className="flex-1 w-full flex flex-col gap-2">
          <label className="font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-espresso/60">Check-In</label>
          <input 
            type="date" 
            className="w-full bg-transparent border-b border-espresso/25 pb-2 font-sans text-sm text-espresso focus:outline-none focus:border-bordeaux transition-colors"
          />
        </div>

        <div className="flex-1 w-full flex flex-col gap-2">
          <label className="font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-espresso/60">Check-Out</label>
          <input 
            type="date" 
            className="w-full bg-transparent border-b border-espresso/25 pb-2 font-sans text-sm text-espresso focus:outline-none focus:border-bordeaux transition-colors"
          />
        </div>

        <div className="flex-1 w-full flex flex-col gap-2">
          <label className="font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-espresso/60">Guests</label>
          <select 
            value={filterGuests === null ? '' : filterGuests} 
            onChange={(e) => setFilterGuests(e.target.value ? Number(e.target.value) : null)}
            className="w-full bg-transparent border-b border-espresso/25 pb-2 font-sans text-sm text-espresso focus:outline-none focus:border-bordeaux transition-colors cursor-pointer appearance-none"
          >
            {guestOptions.map(opt => (
              <option key={opt.label} value={opt.value ?? ''}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 w-full flex flex-col gap-2">
          <label className="font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-espresso/60">Typ</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full bg-transparent border-b border-espresso/25 pb-2 font-sans text-sm text-espresso focus:outline-none focus:border-bordeaux transition-colors cursor-pointer appearance-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? 'Alle Typen' : cat}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Individual Room Cards with Scroll Motion */}
      <div className="flex flex-col gap-12">
        {filteredRooms.length === 0 ? (
          <div className="bg-cream text-center py-20 text-espresso/60 font-villa-editorial text-2xl shadow-xl">
            Für diese Filterkriterien wurden leider keine Apartments gefunden.
          </div>
        ) : (
          filteredRooms.map((room, index) => (
            <RoomCard key={room.id} room={room} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
