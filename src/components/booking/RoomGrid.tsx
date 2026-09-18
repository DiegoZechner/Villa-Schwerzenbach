'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Room = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  capacity: number;
  size: number;
  image: string;
  description?: string;
};

export default function RoomGrid({ initialRooms }: { initialRooms: Room[] }) {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterGuests, setFilterGuests] = useState<number | null>(null);

  const categories = ['All', 'Classic', 'Comfort', 'Superior', 'Deluxe', 'Suite'];
  const guestOptions = [
    { label: 'Any Guests', value: null },
    { label: '2 Guests', value: 2 },
    { label: '3 Guests', value: 3 },
    { label: '4 Guests', value: 4 },
  ];

  const filteredRooms = initialRooms.filter(room => {
    const matchCategory = filterCategory === 'All' || room.category === filterCategory;
    const matchGuests = filterGuests === null || room.capacity >= filterGuests;
    return matchCategory && matchGuests;
  });

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-24 border-b border-cream/50 pb-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-espresso/60 uppercase">Category:</span>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-transparent border-none font-serif text-lg text-espresso focus:ring-0 cursor-pointer outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="hidden md:block w-px h-6 bg-cream/50"></div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-espresso/60 uppercase">Capacity:</span>
          <select 
            value={filterGuests === null ? '' : filterGuests} 
            onChange={(e) => setFilterGuests(e.target.value ? Number(e.target.value) : null)}
            className="bg-transparent border-none font-serif text-lg text-espresso focus:ring-0 cursor-pointer outline-none"
          >
            {guestOptions.map(opt => (
              <option key={opt.label} value={opt.value ?? ''}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Room List */}
      <div className="flex flex-col gap-32">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-20 text-espresso/60 font-serif text-xl">
            Für diese Filterkriterien wurden leider keine Zimmer gefunden.
          </div>
        ) : (
          filteredRooms.map((room, index) => (
            <div key={room.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
              
              {/* Image Half */}
              <div className="w-full lg:w-1/2">
                <Link href={`/rooms/${room.slug}`}>
                  <div className="relative h-[40vh] lg:h-[55vh] w-full overflow-hidden group">
                    <Image 
                      src={room.image} 
                      alt={room.name}
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                  </div>
                </Link>
              </div>

              {/* Text Half */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left px-4 lg:px-8">
                <h2 className="font-serif text-3xl lg:text-4xl text-espresso mb-4 uppercase tracking-widest leading-tight">
                  {room.name}
                </h2>
                
                <div className="font-mono text-xs tracking-[0.2em] uppercase text-espresso/60 mb-6 flex justify-center lg:justify-start items-center gap-4">
                  <span>{room.capacity} GUESTS</span>
                  <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
                  <span>{room.size} SQM</span>
                  <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
                  <span>{room.category.toUpperCase()}</span>
                </div>
                
                <p className="text-sm lg:text-base text-espresso/80 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                  {room.description || "Ein luxuriöses Erlebnis mit Liebe zum Detail und modernem Komfort."}
                </p>
                
                <div>
                  <Link 
                    href={`/rooms/${room.slug}`} 
                    className="inline-block border-b border-espresso pb-1 font-bold text-xs tracking-widest uppercase hover:text-bordeaux hover:border-bordeaux transition-colors"
                  >
                    EXPLORE ROOM
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
