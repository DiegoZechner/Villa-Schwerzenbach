'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const allRooms = [
  { slug: 'rosengarten', name: 'Top 02 - Rosengarten', img: '/images/rooms/top-02.jpg' },
  { slug: 'parkblick', name: 'Top 03 - Parkblick', img: '/images/rooms/top-03.jpg' },
  { slug: 'salon-bordeaux', name: 'Top 04 - Salon Bordeaux', img: '/images/rooms/top-04.jpg' },
  { slug: 'beletage', name: 'Top 05 - Beletage', img: '/images/rooms/top-05.jpg' },
  { slug: 'orangerie', name: 'Top 06 - Orangerie', img: '/images/rooms/top-06.jpg' },
  { slug: 'bibliothek', name: 'Top 07 - Bibliothek', img: '/images/rooms/top-07.jpg' },
  { slug: 'villa-blau', name: 'Top 08 - Villa Blau', img: '/images/rooms/top-08.jpg' },
  { slug: 'dachterrasse', name: 'Top 09 - Dachterrasse', img: '/images/rooms/top-09.jpg' },
  { slug: 'belle-epoque', name: 'Top 10 - Belle Époque', img: '/images/rooms/top-10.jpg' },
  { slug: 'grand-suite', name: 'Top 11 - Grand Suite', img: '/images/rooms/top-11.jpg' },
  { slug: 'villa-suite', name: 'Top 12 - Villa Suite', img: '/images/rooms/top-12.jpg' },
];

export default function ApartmentSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -window.innerWidth / 3, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth / 3, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-cream border-t-[3px] border-white">
      
      {/* Top Bar with Arrows */}
      <div className="flex justify-between items-center px-6 md:px-12 py-10 md:py-14">
        <h2 className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-espresso/90 font-medium">
          Apartments
        </h2>
        <div className="flex items-center gap-6">
          <button 
            onClick={scrollLeft} 
            className="text-espresso/50 hover:text-espresso transition-colors text-3xl font-light hover:scale-110 transform"
          >
            ‹
          </button>
          <button 
            onClick={scrollRight} 
            className="text-espresso/50 hover:text-espresso transition-colors text-3xl font-light hover:scale-110 transform"
          >
            ›
          </button>
        </div>
      </div>

      {/* Image Slider */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-[2px] bg-white scroll-smooth"
      >
        {allRooms.map((apt, i) => (
          <Link 
            key={i} 
            href={`/rooms/${apt.slug}`} 
            className="group shrink-0 snap-center w-[85vw] sm:w-[50vw] md:w-[33vw] lg:w-[25vw] flex flex-col bg-cream"
          >
             {/* Image */}
             <div className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden">
               {/* Using fallback to stay.jpg for missing images in local dev if any, but they are all there */}
               <Image 
                 src={apt.img} 
                 alt={apt.name} 
                 fill 
                 className="object-cover transition-transform duration-1000 group-hover:scale-105" 
               />
             </div>
             
             {/* Text below image */}
             <div className="py-8 md:py-10 px-4">
               <p className="text-center font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-espresso/80 group-hover:text-bordeaux transition-colors">
                 {apt.name}
               </p>
             </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

