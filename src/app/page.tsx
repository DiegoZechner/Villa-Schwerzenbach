'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ApartmentSlider from '@/components/home/ApartmentSlider';

export default function Home() {
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

      {/* Section 1: Dual Brand Hero Split (Suites & Apartments vs. Events & Experience) */}
      <section className="h-screen w-full flex flex-col md:flex-row">
        
        {/* Left: Villa Schwerzenbach (Suites & Apartments) */}
        <Link
          href="/rooms"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
          onMouseMove={handleHeroMouseMove}
          className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b-[3px] md:border-b-0 md:border-r-[3px] border-cream cursor-none block"
        >
          <video 
            src="/video/Lobbyvideo.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#090a0c]/45 md:bg-[#090a0c]/35 md:group-hover:bg-[#090a0c]/65 transition-colors duration-700 pointer-events-none"></div>
          
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
          <div className="absolute inset-0 bg-[#4e041c]/45 md:bg-[#4e041c]/30 md:group-hover:bg-[#4e041c]/65 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase bg-[#ea2d39] text-white mb-4 px-4 py-1.5 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#e8b4f4]"></span>
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

      {/* Section 3: MIVA Events Teaser (Circles, Lilac, Dark Purple & Tomate Red) */}
      <section className="w-full bg-miva-purple text-white py-20 md:py-28 px-6 md:px-12 border-t-[3px] border-white/20 relative overflow-hidden">
        {/* Decorative MIVA Circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-miva-lilac/15 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-miva-red/15 pointer-events-none" />

        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-miva-lilac text-miva-purple font-sans font-semibold text-[10px] tracking-[0.25em] uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-miva-red"></span>
              MIVA HOSPITALITY &amp; EVENTS
            </div>
            <h2 className="font-miva-display text-4xl md:text-6xl leading-tight mb-6">
              Lebendige Momente. <span className="italic text-miva-lilac">Spontane Begegnungen.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-white/85 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Von Hochzeiten und Apéros über Firmenpartys bis hin zu kreativen Meetings und Seminaren: Mit MIVA verwandelt sich die Villa Schwerzenbach in eine pulsierende Bühne für unvergessliche Erlebnisse.
            </p>
            <Link 
              href="/events" 
              className="inline-flex items-center gap-3 bg-miva-red text-white font-sans font-medium text-xs tracking-[0.22em] uppercase px-9 py-4 rounded-full hover:bg-miva-lilac hover:text-miva-purple transition-colors shadow-lg"
            >
              <span>Event Anfragen</span>
              <span className="w-2 h-2 rounded-full bg-current"></span>
            </Link>
          </div>

          {/* Circular Image Collage */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-miva-lilac shadow-2xl">
              <Image src="/images/home/celebrate.jpg" alt="MIVA Events" fill className="object-cover" />
            </div>
            <div className="hidden sm:block relative -ml-12 mt-28 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-miva-red shadow-xl">
              <Image src="/images/events/Screenshot 2026-10-01 154830.png" alt="MIVA Apéro" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Die Villa – Philosophie, Standort & Konzept Widget (Bottom of Homepage) */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 md:px-10 border-t-[3px] border-white/15">
        <div className="w-[95%] max-w-6xl mx-auto bg-bordeaux text-cream rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl border border-cream/20">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 mb-12 border-b border-cream/20">
            <div>
              <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-cream/75 block mb-3">
                DIE VILLA • PHILOSOPHIE • STANDORT • KONZEPT
              </span>
              <h2 className="font-villa-editorial text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-[0.16em] leading-tight">
                Villa Schwerzenbach
              </h2>
            </div>
            <span className="font-script text-3xl md:text-4xl text-cream/90">
              Same space, different stories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* 1. Philosophie */}
            <div className="bg-black/20 p-6 sm:p-8 rounded-2xl border border-cream/10 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-villa-blue font-semibold block mb-3">
                  01 / UNSERE PHILOSOPHIE
                </span>
                <h3 className="font-villa-editorial text-2xl text-white uppercase tracking-[0.14em] mb-4">
                  Historie &amp; Charakter
                </h3>
                <p className="font-sans text-xs sm:text-sm text-cream/85 leading-relaxed">
                  Die Villa Schwerzenbach verbindet den geschichtsträchtigen Charme der Belle Époque mit zeitgemäßer Ästhetik. Jeder Raum wurde mit höchster Sorgfalt gestaltet, um Geborgenheit, Inspiration und echte Begegnungen zu schaffen.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-cream/10">
                <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream/60">
                  Zeitlose Architektur
                </span>
              </div>
            </div>

            {/* 2. Standort */}
            <div className="bg-black/20 p-6 sm:p-8 rounded-2xl border border-cream/10 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-villa-blue font-semibold block mb-3">
                  02 / DER STANDORT
                </span>
                <h3 className="font-villa-editorial text-2xl text-white uppercase tracking-[0.14em] mb-4">
                  Im Herzen von Bregenz
                </h3>
                <p className="font-sans text-xs sm:text-sm text-cream/85 leading-relaxed">
                  Nur wenige Schritte vom Bodensee, den Bregenzer Festspielen und dem Pfänder entfernt: Unsere Lage in der Schwerzenbachstraße 9 vereint ruhige Rückzugsmöglichkeiten mit direkter Nähe zu Kultur, Natur und dem Dreiländereck.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-cream/10">
                <Link
                  href="/discover"
                  className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream hover:text-white transition-colors"
                >
                  Umgebung Entdecken →
                </Link>
              </div>
            </div>

            {/* 3. Das Konzept */}
            <div className="bg-black/20 p-6 sm:p-8 rounded-2xl border border-cream/10 flex flex-col justify-between">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-villa-blue font-semibold block mb-3">
                  03 / DAS KONZEPT
                </span>
                <h3 className="font-villa-editorial text-2xl text-white uppercase tracking-[0.14em] mb-4">
                  Stay • Meet • Celebrate
                </h3>
                <p className="font-sans text-xs sm:text-sm text-cream/85 leading-relaxed">
                  Ein Haus, zwei perfekt harmonierende Welten: Oben bieten 11 individuelle Suites &amp; Apartments ein stilvolles Zuhause auf Zeit – im Erdgeschoss und Garten schafft MIVA den Rahmen für Events, Apéros, Seminare und besondere Feiern.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-cream/10 flex items-center justify-between">
                <Link
                  href="/rooms"
                  className="font-sans text-[10px] tracking-[0.22em] uppercase text-cream hover:text-white transition-colors"
                >
                  Suites &amp; Apartments →
                </Link>
                <Link
                  href="/events"
                  className="font-sans text-[10px] tracking-[0.22em] uppercase text-miva-lilac hover:text-white transition-colors"
                >
                  MIVA Events →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
