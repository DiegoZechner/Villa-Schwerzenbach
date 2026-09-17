'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

type Room = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  capacity: number;
  size: number;
  image: string;
};

export default function RoomGrid({ initialRooms }: { initialRooms: Room[] }) {
  const [filter, setFilter] = useState('Alle');
  const categories = ['Alle', 'Classic', 'Comfort', 'Superior', 'Deluxe', 'Suite'];

  const filteredRooms = filter === 'Alle' 
    ? initialRooms 
    : initialRooms.filter(r => r.category === filter);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-bordeaux text-cream' 
                : 'bg-white border border-cream text-espresso hover:bg-cream-light'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="group cursor-pointer flex flex-col">
            <Link href={`/rooms/${room.slug}`} className="flex-grow flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                  style={{ backgroundImage: `url(${room.image})` }} 
                />
              </div>
              <CardContent className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl text-bordeaux">{room.name}</h3>
                  <Badge category={room.category} />
                </div>
                
                <div className="flex gap-4 text-sm text-espresso/70 mb-6">
                  <div className="flex items-center gap-1">
                    <span>👥</span> {room.capacity} Personen
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📐</span> {room.size} m²
                  </div>
                </div>

                <div className="mt-auto flex justify-between items-center border-t border-cream/30 pt-4">
                  <span className="text-lg font-medium text-espresso">ab CHF {room.price} / Nacht</span>
                  <span className="text-villa-blue font-medium group-hover:text-bordeaux transition-colors">Details &rarr;</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
        {filteredRooms.length === 0 && (
          <div className="col-span-full text-center py-12 text-espresso/60">
            Keine Zimmer in dieser Kategorie gefunden.
          </div>
        )}
      </div>
    </div>
  );
}
