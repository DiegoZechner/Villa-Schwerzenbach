'use client';
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
  return (
    <div className="flex flex-col gap-32">
      {initialRooms.map((room, index) => (
        <div key={room.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center`}>
          
          {/* Image Half */}
          <div className="w-full lg:w-3/5">
            <Link href={`/rooms/${room.slug}`}>
              <div className="relative h-[50vh] lg:h-[75vh] w-full overflow-hidden group">
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
          <div className="w-full lg:w-2/5 flex flex-col justify-center text-center lg:text-left px-4 lg:px-0">
            <h2 className="font-serif text-4xl lg:text-5xl text-espresso mb-6 uppercase tracking-widest leading-tight">
              {room.name}
            </h2>
            
            <div className="font-mono text-xs lg:text-sm tracking-[0.2em] uppercase text-espresso/60 mb-8 flex justify-center lg:justify-start items-center gap-4">
              <span>{room.capacity} GUESTS</span>
              <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
              <span>{room.size} SQM</span>
            </div>
            
            <p className="text-espresso/80 leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
              {room.description || "Ein luxuriöses Erlebnis mit Liebe zum Detail und modernem Komfort."}
            </p>
            
            <div>
              <Link 
                href={`/rooms/${room.slug}`} 
                className="inline-block border-b border-espresso pb-1 font-bold text-sm tracking-widest uppercase hover:text-bordeaux hover:border-bordeaux transition-colors"
              >
                EXPLORE ROOM
              </Link>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
