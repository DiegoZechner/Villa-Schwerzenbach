'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { allRooms } from '@/data/rooms';

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
               <Image 
                 src={apt.image} 
                 alt={apt.name} 
                 fill 
                 className="object-cover" 
               />
               <div className="absolute inset-0 bg-transparent group-hover:bg-espresso/20 transition-colors duration-500"></div>
             </div>
             
             {/* Text below image */}
             <div className="py-8 md:py-10 px-4 text-center">
               <p className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-espresso/80 group-hover:text-bordeaux transition-colors">
                 {apt.name}
               </p>
               <p className="font-serif italic text-xs text-espresso/60 mt-1">
                 {apt.tagline}
               </p>
             </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
