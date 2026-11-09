'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ApartmentSlider from '@/components/home/ApartmentSlider';

const mivaGallerySlides = [
  {
    src: '/images/home/celebrate.jpg',
    label: 'Celebrations & Private Events',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154830.png',
    label: 'Sunset Apéros & Garden Sessions',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154804.png',
    label: 'Long Table Dinners & Kulinarik',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154836.png',
    label: 'Art, Sound & Corporate Culture',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154744.png',
    label: 'Creative Workshops & Offsites',
  },
];

export default function Home() {
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [eventSlideIdx, setEventSlideIdx] = useState(0);

  // Auto-rotate MIVA photo gallery every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setEventSlideIdx((prev) => (prev + 1) % mivaGallerySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevEventSlide = () => {
    setEventSlideIdx((prev) => (prev === 0 ? mivaGallerySlides.length - 1 : prev - 1));
  };

  const nextEventSlide = () => {
    setEventSlideIdx((prev) => (prev + 1) % mivaGallerySlides.length);
  };

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="w-full relative overflow-x-hidden">
      {/* Floating "Explore More" Cursor Badge on Hero Hover */}
      <div
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y - 14}px`,
          transform: `translate(-50%, -100%) scale(${isHoveringHero ? 1 : 0.75})`,
          opacity: isHoveringHero ? 1 : 0,
        }}
        className="fixed z-50 pointer-events-none transition-[opacity,transform] duration-150 ease-out bg-[#e5dec9]/95 text-[#1a1612] backdrop-blur-md px-4 py-1.5 rounded-md font-sans text-xs font-medium tracking-[0.15em] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.45)] whitespace-nowrap"
      >
        Explore More
      </div>

      {/* Section 1: Dual Brand Hero Split (Suites & Apartments vs. Events & Experience, without video) */}
      <section className="h-screen w-full flex flex-col md:flex-row">
        
        {/* Left: Villa Schwerzenbach (Suites & Apartments) */}
        <Link
          href="/rooms"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
          onMouseMove={handleHeroMouseMove}
          className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b-[3px] md:border-b-0 md:border-r-[3px] border-cream cursor-none block"
        >
          <Image
            src="/images/rooms/top-11.jpg"
            alt="Villa Schwerzenbach Suites & Apartments"
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#090a0c]/45 md:bg-[#090a0c]/35 md:group-hover:bg-[#090a0c]/65 transition-colors duration-700 pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#d9c8b9] mb-3 px-4 py-1.5 border border-[#d9c8b9]/40">
              VILLA SCHWERZENBACH
            </span>
            <h2 className="text-white font-villa-editorial text-4xl md:text-6xl uppercase tracking-[0.18em]">
              Suites &amp; Apartments
            </h2>
            <span className="mt-4 font-sans text-xs tracking-[0.28em] uppercase text-cream opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Explore More →
            </span>
          </div>
        </Link>
        
        {/* Right: MIVA (Events & Experience) */}
        <Link
          href="/events"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
          onMouseMove={handleHeroMouseMove}
          className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden cursor-none block"
        >
          <Image src="/images/home/celebrate.jpg" alt="MIVA Events" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
          <div className="absolute inset-0 bg-[#4e041c]/45 md:bg-[#4e041c]/30 md:group-hover:bg-[#4e041c]/65 transition-colors duration-700 pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase bg-[#ea2d39] text-white mb-4 px-4 py-1.5 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#e8b4f4]" />
              BY MIVA.
            </span>
            <h2 className="text-white font-miva-display italic text-4xl md:text-6xl tracking-wide mb-2">
              Events &amp; Experience
            </h2>
            <span className="mt-3 font-sans text-xs tracking-[0.28em] uppercase text-miva-lilac opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Explore More →
            </span>
          </div>
        </Link>
      </section>

      {/* Section 2: Compact Suites & Apartments Slider */}
      <ApartmentSlider />

      {/* Section 3: MIVA Events Teaser with Auto-Rotating Photo Gallery + Arrow Controls + Short Description + Inquiry Button */}
      <section className="w-full bg-miva-purple text-white py-20 md:py-28 px-6 md:px-12 border-t-[3px] border-white/20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-miva-lilac/10 pointer-events-none blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-miva-red/10 pointer-events-none blur-2xl" />

        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
          {/* Left: Short Description & Event Inquiry Button */}
          <div className="w-full lg:w-[44%] text-center lg:text-left">
            <span className="font-sans font-semibold text-[10px] tracking-[0.3em] uppercase text-miva-lilac block mb-4">
              MIVA HOSPITALITY &amp; EVENTS
            </span>
            <h2 className="font-miva-display text-4xl md:text-6xl leading-tight mb-6">
              Lebendige Momente. <span className="italic text-miva-lilac">Spontane Begegnungen.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
              Hochzeiten, Sommer-Apéros, Private Dinners, Firmenpartys oder kreative Seminare: Mit MIVA wird die Villa Schwerzenbach zur Bühne für besondere Erlebnisse.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-3 bg-miva-red text-white font-sans font-medium text-xs tracking-[0.22em] uppercase px-9 py-4 rounded-full hover:bg-miva-lilac hover:text-miva-purple transition-colors shadow-lg"
            >
              <span>Event Anfragen</span>
              <span>→</span>
            </Link>
          </div>

          {/* Right: Auto-Rotating Photo Gallery with Left/Right Arrow Click Controls */}
          <div className="w-full lg:w-[56%]">
            <div className="relative w-full h-[340px] sm:h-[420px] md:h-[470px] rounded-2xl overflow-hidden shadow-2xl border border-miva-lilac/20 group">
              {mivaGallerySlides.map((slide, idx) => (
                <div
                  key={slide.src}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === eventSlideIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                </div>
              ))}

              {/* Left / Right Arrow Buttons */}
              <button
                type="button"
                onClick={prevEventSlide}
                aria-label="Vorheriges Event-Foto"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-miva-red text-white flex items-center justify-center text-2xl font-light backdrop-blur-md transition-all cursor-pointer"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextEventSlide}
                aria-label="Nächstes Event-Foto"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-miva-red text-white flex items-center justify-center text-2xl font-light backdrop-blur-md transition-all cursor-pointer"
              >
                ›
              </button>

              {/* Bottom Caption & Progress Dots */}
              <div className="absolute bottom-5 left-6 right-6 z-20 flex items-center justify-between gap-4">
                <span className="font-sans font-light text-xs sm:text-sm tracking-[0.15em] uppercase text-white/95">
                  {mivaGallerySlides[eventSlideIdx].label}
                </span>

                <div className="flex items-center gap-2">
                  {mivaGallerySlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEventSlideIdx(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === eventSlideIdx ? 'w-7 bg-miva-lilac' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: DIE VILLA • PHILOSOPHIE • STANDORT • KONZEPT (Large Spaces, Simple & Elegant Editorial Layout) */}
      <section className="w-full bg-bordeaux text-cream border-t-[3px] border-white/15 py-28 md:py-40 px-6 sm:px-12 md:px-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Large Spacious Header */}
          <div className="pb-20 md:pb-28 border-b border-cream/20 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-cream/70 block mb-6">
                DIE VILLA • PHILOSOPHIE • STANDORT • KONZEPT
              </span>
              <h2 className="font-villa-editorial text-5xl sm:text-7xl md:text-8xl text-white uppercase tracking-[0.14em] leading-[0.95]">
                Villa Schwerzenbach
              </h2>
            </div>
            <span className="font-script text-4xl sm:text-5xl text-cream/90">
              Same space, different stories
            </span>
          </div>

          {/* Spacious Editorial Rows with Generous Breathing Room */}
          <div className="divide-y divide-cream/20">
            
            {/* 01 / Philosophie */}
            <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
              <div className="lg:col-span-4">
                <span className="font-sans text-xs tracking-[0.35em] uppercase text-cream/60 block mb-3">
                  01 / PHILOSOPHIE
                </span>
                <h3 className="font-villa-editorial text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-[0.14em]">
                  Historie &amp; Charakter
                </h3>
              </div>
              <div className="lg:col-span-8 lg:pl-8">
                <p className="font-sans font-light text-lg sm:text-xl md:text-2xl text-cream/90 leading-relaxed max-w-3xl">
                  Die Villa Schwerzenbach verbindet den geschichtsträchtigen Glanz der Belle Époque mit zeitgemäßer Klarheit. Jeder Raum ist mit Ruhe, Weite und Charakter gestaltet – als Rückzugsort und Ort echter Begegnung.
                </p>
              </div>
            </div>

            {/* 02 / Standort */}
            <div className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
              <div className="lg:col-span-4">
                <span className="font-sans text-xs tracking-[0.35em] uppercase text-cream/60 block mb-3">
                  02 / STANDORT
                </span>
                <h3 className="font-villa-editorial text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-[0.14em]">
                  Im Herzen von Bregenz
                </h3>
              </div>
              <div className="lg:col-span-8 lg:pl-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <p className="font-sans font-light text-lg sm:text-xl md:text-2xl text-cream/90 leading-relaxed max-w-2xl">
                  Wenige Schritte vom Bodensee, den Bregenzer Festspielen und dem Pfänder entfernt: Unsere Lage in Bregenz vereint entspannte Privatsphäre mit direkter Nähe zu Kultur, See und dem Dreiländereck.
                </p>
                <Link
                  href="/discover"
                  className="shrink-0 font-sans text-xs tracking-[0.3em] uppercase text-white border-b border-white/50 pb-2 hover:border-white transition-colors"
                >
                  Umgebung Entdecken →
                </Link>
              </div>
            </div>

            {/* 03 / Konzept */}
            <div className="pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-baseline">
              <div className="lg:col-span-4">
                <span className="font-sans text-xs tracking-[0.35em] uppercase text-cream/60 block mb-3">
                  03 / KONZEPT
                </span>
                <h3 className="font-villa-editorial text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-[0.14em]">
                  Stay • Meet • Celebrate
                </h3>
              </div>
              <div className="lg:col-span-8 lg:pl-8 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <p className="font-sans font-light text-lg sm:text-xl md:text-2xl text-cream/90 leading-relaxed max-w-2xl">
                  Ein Haus, zwei harmonierende Welten: Oben bieten 11 individuelle Suites &amp; Apartments ein stilvolles Zuhause auf Zeit – im Haus und Garten schafft MIVA den Rahmen für Events, Apéros und besondere Feiern.
                </p>
                <div className="flex flex-col sm:items-end gap-4 shrink-0">
                  <Link
                    href="/rooms"
                    className="font-sans text-xs tracking-[0.3em] uppercase text-white border-b border-white/50 pb-2 hover:border-white transition-colors"
                  >
                    Suites &amp; Apartments →
                  </Link>
                  <Link
                    href="/events"
                    className="font-sans text-xs tracking-[0.3em] uppercase text-miva-lilac border-b border-miva-lilac/50 pb-2 hover:border-miva-lilac transition-colors"
                  >
                    MIVA Events →
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
