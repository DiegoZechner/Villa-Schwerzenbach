'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RoomData } from '@/data/rooms';

export default function RoomGrid({ initialRooms }: { initialRooms: RoomData[] }) {
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
      <div className="-mt-16 md:-mt-24 relative z-20 bg-cream-light p-6 md:p-8 shadow-md border border-espresso/15 mb-24 max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
        
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

      {/* Editorial Room List with Arch Masks */}
      <div className="flex flex-col gap-28">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-20 text-espresso/60 font-villa-editorial text-2xl">
            Für diese Filterkriterien wurden leider keine Apartments gefunden.
          </div>
        ) : (
          filteredRooms.map((room, index) => (
            <div key={room.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>
              
              {/* Arch-Masked Image Half */}
              <div className="w-full lg:w-5/12 flex justify-center">
                <Link href={`/rooms/${room.slug}`} className="w-full max-w-md block">
                  <div className="relative h-[44vh] lg:h-[56vh] w-full arch-mask group border-4 border-cream-light shadow-lg">
                    <Image 
                      src={room.image} 
                      alt={room.name}
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                  </div>
                </Link>
              </div>

              {/* Editorial Text Half */}
              <div className="w-full lg:w-7/12 flex flex-col justify-center text-center lg:text-left px-4 lg:px-8">
                <div className="font-script text-2xl md:text-3xl text-villa-red mb-1">
                  {room.tagline}
                </div>
                <h2 className="font-villa-editorial text-3xl lg:text-5xl text-espresso mb-4 uppercase tracking-[0.15em] leading-tight">
                  {room.name}
                </h2>
                
                <div className="font-sans font-medium text-xs tracking-[0.18em] uppercase text-villa-blue mb-6 flex flex-wrap justify-center lg:justify-start items-center gap-3">
                  <span>{room.floor}</span>
                  <span className="w-1 h-1 bg-villa-blue rounded-full"></span>
                  <span>{room.size.toString().replace('.', ',')} M²</span>
                  <span className="w-1 h-1 bg-villa-blue rounded-full"></span>
                  <span>{room.type.toUpperCase()}</span>
                  <span className="w-1 h-1 bg-villa-blue rounded-full"></span>
                  <span>MAX. {room.capacity} PERS.</span>
                  <span className="w-1 h-1 bg-villa-blue rounded-full"></span>
                  <span>{room.orientation.toUpperCase()}</span>
                  {room.balcony && (
                    <>
                      <span className="w-1 h-1 bg-villa-blue rounded-full"></span>
                      <span>BALKON ({room.balcony})</span>
                    </>
                  )}
                </div>
                
                <p className="font-sans text-sm lg:text-base text-espresso/85 leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                  {room.description}
                </p>

                {(room.notes || room.locationNote) && (
                  <p className="font-sans text-xs text-espresso/65 italic mb-8 max-w-xl mx-auto lg:mx-0">
                    {[room.notes, room.locationNote].filter(Boolean).join(' • ')}
                  </p>
                )}
                
                <div>
                  <Link 
                    href={`/rooms/${room.slug}`} 
                    className="inline-block bg-bordeaux text-white px-8 py-3.5 font-sans font-medium text-xs tracking-[0.22em] uppercase hover:bg-villa-red transition-colors"
                  >
                    Apartment Entdecken
                  </Link>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
