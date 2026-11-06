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
    <section className="w-full bg-cream border-t-[3px] border-white pb-16">
      
      {/* Top Bar with Arrows */}
      <div className="flex justify-between items-center px-6 md:px-12 py-10 md:py-14">
        <div>
          <h2 className="font-villa-editorial text-2xl md:text-3xl tracking-[0.2em] uppercase text-espresso">
            Unsere Apartments
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={scrollLeft} 
            className="text-espresso/60 hover:text-bordeaux transition-colors text-3xl font-light hover:scale-110 transform"
            aria-label="Scroll Left"
          >
            ‹
          </button>
          <button 
            onClick={scrollRight} 
            className="text-espresso/60 hover:text-bordeaux transition-colors text-3xl font-light hover:scale-110 transform"
            aria-label="Scroll Right"
          >
            ›
          </button>
        </div>
      </div>

      {/* Arch Image Slider */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-6 md:px-12 scroll-smooth"
      >
        {allRooms.map((apt, i) => (
          <Link 
            key={i} 
            href={`/rooms/${apt.slug}`} 
            className="group shrink-0 snap-center w-[80vw] sm:w-[44vw] md:w-[30vw] lg:w-[23vw] flex flex-col bg-cream-light p-4 border border-espresso/10"
          >
            {/* Arch-Masked Image (No zoom, subtle color tint on hover as requested) */}
            <div className="relative h-[48vh] md:h-[54vh] w-full arch-mask">
              <Image 
                src={apt.image} 
                alt={apt.name} 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-espresso/20 transition-colors duration-500"></div>
            </div>
             
            {/* Text below image */}
            <div className="pt-6 pb-4 px-2 text-center">
              <p className="font-villa-editorial text-sm md:text-base tracking-[0.18em] uppercase text-espresso group-hover:text-villa-red transition-colors">
                {apt.name}
              </p>
              <p className="font-script text-xl text-villa-blue mt-1">
                {apt.tagline}
              </p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-espresso/60 mt-2">
                {apt.floor} • {apt.size.toString().replace('.', ',')} m² • {apt.type}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
