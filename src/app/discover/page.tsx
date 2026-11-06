'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type Season = 'none' | 'summer' | 'winter';

export default function DiscoverPage() {
  const [activeSeason, setActiveSeason] = useState<Season>('none');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getWidths = () => {
    if (activeSeason === 'none') return { summer: 'w-full lg:w-1/2', winter: 'hidden lg:block lg:w-1/2' };
    if (activeSeason === 'summer') return { summer: 'w-full lg:w-[95%]', winter: 'hidden lg:block lg:w-[5%]' };
    return { summer: 'hidden lg:block lg:w-[5%]', winter: 'w-full lg:w-[95%]' };
  };

  const widths = getWidths();

  if (!isMounted) return null;

  const summerEvents = [
    {
      category: "KULTUR & EVENT",
      date: "Juli - August (Jährlich)",
      title: "Bregenzer Festspiele",
      description: "Ein kulturelles Spektakel von Weltrang. Die Bregenzer Festspiele ziehen jeden Sommer Kunst- und Musikliebhaber auf die beeindruckende Seebühne, die direkt im Wasser des Bodensees verankert ist.",
      img: "/images/home/celebrate.jpg"
    },
    {
      category: "NATUR & AKTIV",
      date: "Mai - September",
      title: "Der Pfänder & Bodenseeschifffahrt",
      description: "Mit der Seilbahn geht es in nur sechs Minuten auf den Hausberg (1064m). Wieder im Tal bietet die Bodensee-Schifffahrt entspannte Ausflüge in die Nachbarländer.",
      img: "/images/home/stay.jpg"
    },
    {
      category: "LIFESTYLE & ENTSPANNUNG",
      date: "Juni - August",
      title: "Die Historische Mili",
      description: "Die alte Militärbadeanstalt (Mili) ist ein historischer Holzpfahlbau direkt am See und gilt als eines der charmantesten Freibäder der Region.",
      img: "/images/home/lobby.jpg"
    }
  ];

  const winterEvents = [
    {
      category: "TRADITION & EVENT",
      date: "Mitte November - Dezember",
      title: "Bregenzer Weihnachtsmarkt",
      description: "In der Adventszeit verwandeln sich der Kornmarktplatz und die malerische Oberstadt in ein stimmungsvolles Winterdorf.",
      img: "/images/home/celebrate.jpg"
    },
    {
      category: "SPORT & NATUR",
      date: "Dezember - März",
      title: "Skifahren im Bregenzerwald",
      description: "In unter einer Stunde erreichen Sie Premium-Skigebiete wie Mellau-Damüls oder den legendären Arlberg für Tage im frischen Pulverschnee.",
      img: "/images/home/stay.jpg"
    },
    {
      category: "KUNST & ARCHITEKTUR",
      date: "Ganzjährig",
      title: "Kunsthaus Bregenz (KUB)",
      description: "Das KUB, ein architektonisches Meisterwerk von Peter Zumthor, bietet den idealen Rückzugsort. Genießen Sie zeitgenössische Kunstausstellungen.",
      img: "/images/home/lobby.jpg"
    }
  ];

  return (
    <main className="w-full h-screen flex overflow-hidden bg-espresso text-cream lg:pt-0 font-sans">
      
      {/* Mobile Top Tab Navigation */}
      <div className="lg:hidden absolute top-20 left-0 w-full z-[100] flex justify-center gap-2 px-4 pointer-events-auto">
        <button 
          onClick={() => setActiveSeason('summer')} 
          className={`px-8 py-3 font-sans text-[10px] tracking-[0.25em] border transition-colors ${activeSeason !== 'winter' ? 'bg-cream text-espresso border-cream' : 'border-white/50 text-white backdrop-blur-sm'}`}
        >
          SOMMER
        </button>
        <button 
          onClick={() => setActiveSeason('winter')} 
          className={`px-8 py-3 font-sans text-[10px] tracking-[0.25em] border transition-colors ${activeSeason === 'winter' ? 'bg-cream text-espresso border-cream' : 'border-white/50 text-white backdrop-blur-sm'}`}
        >
          WINTER
        </button>
      </div>

      {/* Summer Section */}
      <div 
        className={`${widths.summer} relative h-full transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] lg:border-r border-white/20 cursor-pointer group flex-shrink-0`}
        onClick={() => {
          if (activeSeason !== 'summer') setActiveSeason('summer');
        }}
      >
        <Image src="/images/home/stay.jpg" alt="Summer in Bregenz" fill className="object-cover" />
        <div className={`absolute inset-0 bg-[#35271f] transition-opacity duration-1000 ${activeSeason === 'winter' ? 'opacity-65' : 'opacity-30 group-hover:opacity-15'}`}></div>
        
        {/* Title */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${activeSeason === 'summer' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <h2 
            className="text-white font-villa-editorial text-4xl md:text-6xl tracking-[0.2em] uppercase transition-transform duration-1000" 
            style={{ writingMode: activeSeason === 'winter' ? 'vertical-rl' : 'horizontal-tb' }}
          >
            Sommer
          </h2>
        </div>

        {/* Expanded Content (Editorial Layout with Arch Masks) */}
        <div className={`absolute inset-0 bg-cream overflow-y-auto hide-scrollbar transition-all duration-1000 ${activeSeason === 'summer' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-[-1]'}`}>
          <div className="container mx-auto px-6 md:px-12 max-w-5xl py-32">
            <p className="font-script text-3xl text-villa-red text-center mb-2">Same space, different stories</p>
            <h2 className="font-villa-editorial text-5xl md:text-7xl tracking-[0.2em] uppercase text-bordeaux mb-24 text-center">
              Sommer
            </h2>
            
            <div className="space-y-24">
              {summerEvents.map((event, idx) => (
                <div key={idx} className="flex flex-col border-t border-espresso/20 pt-12 gap-8 lg:flex-row lg:items-center">
                  <div className="flex-1 lg:pr-12">
                    <div className="font-sans font-semibold text-[10px] tracking-[0.25em] uppercase text-villa-blue mb-4">
                      {event.category} <span className="mx-2">|</span> {event.date}
                    </div>
                    <h3 className="font-villa-editorial text-2xl md:text-4xl text-espresso uppercase tracking-[0.12em] mb-6">
                      {event.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base leading-loose text-espresso/85">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex-1 w-full relative h-[380px] max-w-sm mx-auto arch-mask border-4 border-cream-light shadow-lg">
                    <Image src={event.img} alt={event.title} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Winter Section */}
      <div 
        className={`${widths.winter} relative h-full transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer group flex-shrink-0`}
        onClick={() => {
          if (activeSeason !== 'winter') setActiveSeason('winter');
        }}
      >
        <Image src="/images/home/celebrate.jpg" alt="Winter in Bregenz" fill className="object-cover" />
        <div className={`absolute inset-0 bg-[#35271f] transition-opacity duration-1000 ${activeSeason === 'summer' ? 'opacity-65' : 'opacity-30 group-hover:opacity-15'}`}></div>
        
        {/* Title */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${activeSeason === 'winter' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {activeSeason === 'none' && (
            <span className="font-script text-3xl text-cream mb-2">Same space, different stories</span>
          )}
          <h2 
            className="text-white font-villa-editorial text-4xl md:text-6xl tracking-[0.2em] uppercase transition-transform duration-1000" 
            style={{ 
              writingMode: activeSeason === 'summer' ? 'vertical-rl' : 'horizontal-tb',
              transform: activeSeason === 'summer' ? 'rotate(180deg)' : 'none' 
            }}
          >
            Winter
          </h2>
        </div>

        {/* Expanded Content (Editorial Layout with Arch Masks) */}
        <div className={`absolute inset-0 bg-espresso overflow-y-auto hide-scrollbar transition-all duration-1000 ${activeSeason === 'winter' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-[-1]'}`}>
          <div className="container mx-auto px-6 md:px-12 max-w-5xl py-32">
            <h2 className="font-villa-editorial text-5xl md:text-7xl tracking-[0.2em] uppercase text-cream mb-24 text-center">
              Winter
            </h2>
            
            <div className="space-y-24">
              {winterEvents.map((event, idx) => (
                <div key={idx} className="flex flex-col border-t border-cream/20 pt-12 gap-8 lg:flex-row lg:items-center">
                  <div className="flex-1 lg:pr-12">
                    <div className="font-sans font-semibold text-[10px] tracking-[0.25em] uppercase text-villa-blue mb-4">
                      {event.category} <span className="mx-2">|</span> {event.date}
                    </div>
                    <h3 className="font-villa-editorial text-2xl md:text-4xl text-cream uppercase tracking-[0.12em] mb-6">
                      {event.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base leading-loose text-cream/85">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex-1 w-full relative h-[380px] max-w-sm mx-auto arch-mask border-4 border-cream/30 shadow-lg">
                    <Image src={event.img} alt={event.title} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
