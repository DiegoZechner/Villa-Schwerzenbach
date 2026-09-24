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
    if (activeSeason === 'none') return { summer: 'w-1/2', winter: 'w-1/2' };
    if (activeSeason === 'summer') return { summer: 'w-[95%]', winter: 'w-[5%]' };
    return { summer: 'w-[5%]', winter: 'w-[95%]' };
  };

  const widths = getWidths();

  if (!isMounted) return null;

  return (
    <main className="w-full h-screen flex overflow-hidden bg-espresso text-cream pt-20 lg:pt-0">
      {/* Summer Section */}
      <div 
        className={`${widths.summer} relative h-full transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] border-r border-white/20 cursor-pointer group flex-shrink-0`}
        onClick={() => setActiveSeason(activeSeason === 'summer' ? 'none' : 'summer')}
      >
        <Image src="/images/home/stay.jpg" alt="Summer in Bregenz" fill className="object-cover" />
        <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${activeSeason === 'winter' ? 'opacity-60' : 'opacity-20 group-hover:opacity-10'}`}></div>
        
        {/* Title */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${activeSeason === 'summer' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <h2 
            className="text-white font-serif text-3xl md:text-5xl tracking-widest uppercase transition-transform duration-1000" 
            style={{ writingMode: activeSeason === 'winter' ? 'vertical-rl' : 'horizontal-tb' }}
          >
            Sommer
          </h2>
        </div>

        {/* Expanded Content */}
        <div className={`absolute inset-0 flex flex-col justify-center p-6 md:p-12 lg:p-32 transition-all duration-1000 delay-300 overflow-y-auto ${activeSeason === 'summer' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="bg-background/95 backdrop-blur-md p-8 md:p-12 max-w-3xl border border-cream shadow-2xl mt-20 md:mt-0">
             <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase text-espresso mb-8">Sommer am Bodensee</h2>
             <div className="font-sans text-xs md:text-sm leading-loose text-espresso/80 space-y-6">
                <p>Der Sommer in Bregenz bietet eine unvergleichliche Mischung aus Kultur, Natur und Entspannung. Die Region rund um die Villa Schwerzenbach erwacht zum Leben und bietet vielfältige Möglichkeiten.</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Bregenzer Festspiele:</strong> Erleben Sie Weltklasse-Opern auf der spektakulärsten Seebühne Europas direkt auf dem Wasser.</li>
                  <li><strong>Bodensee Schifffahrt:</strong> Erkunden Sie das Dreiländereck mit der weißen Flotte. Konstanz, Lindau oder Meersburg sind nur eine Bootsfahrt entfernt.</li>
                  <li><strong>Pfänderbahn & Wandern:</strong> In sechs Minuten auf den Hausberg (1064m). Genießen Sie ein einzigartiges Panorama über 240 Alpengipfel und den gesamten See.</li>
                  <li><strong>Die historische Mili:</strong> Schwimmen in der alten Militärbadeanstalt, einem Holzpfahlbau direkt im See.</li>
                  <li><strong>Bodenseeradweg:</strong> Einer der schönsten Radwege Europas führt direkt am Wasser entlang.</li>
                  <li><strong>Kunst & Kultur:</strong> Das Kunsthaus Bregenz (KUB) und das Vorarlberg Museum bieten herausragende Ausstellungen in preisgekrönter Architektur.</li>
                </ul>
             </div>
          </div>
        </div>
      </div>

      {/* Winter Section */}
      <div 
        className={`${widths.winter} relative h-full transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] cursor-pointer group flex-shrink-0`}
        onClick={() => setActiveSeason(activeSeason === 'winter' ? 'none' : 'winter')}
      >
        <Image src="/images/home/celebrate.jpg" alt="Winter in Bregenz" fill className="object-cover" />
        <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${activeSeason === 'summer' ? 'opacity-60' : 'opacity-20 group-hover:opacity-10'}`}></div>
        
        {/* Title */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${activeSeason === 'winter' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <h2 
            className="text-white font-serif text-3xl md:text-5xl tracking-widest uppercase transition-transform duration-1000" 
            style={{ 
              writingMode: activeSeason === 'summer' ? 'vertical-rl' : 'horizontal-tb',
              transform: activeSeason === 'summer' ? 'rotate(180deg)' : 'none' 
            }}
          >
            Winter
          </h2>
        </div>

        {/* Expanded Content */}
        <div className={`absolute inset-0 flex flex-col justify-center p-6 md:p-12 lg:p-32 transition-all duration-1000 delay-300 overflow-y-auto ${activeSeason === 'winter' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="bg-background/95 backdrop-blur-md p-8 md:p-12 max-w-3xl border border-cream shadow-2xl mt-20 md:mt-0">
             <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase text-espresso mb-8">Winter in Bregenz</h2>
             <div className="font-sans text-xs md:text-sm leading-loose text-espresso/80 space-y-6">
                <p>Wenn Schnee die Landschaft bedeckt, verwandelt sich die Bodenseeregion in einen stillen, magischen Rückzugsort mit unmittelbarer Nähe zu den besten Skigebieten der Alpen.</p>
                <ul className="list-disc pl-5 space-y-4">
                  <li><strong>Bregenzer Weihnachtsmarkt:</strong> Stimmungsvolle Stände in der Oberstadt und am Kornmarktplatz mit Handwerkskunst und regionalen Spezialitäten.</li>
                  <li><strong>Skigebiete in Reichweite:</strong> In unter einer Stunde erreichen Sie die Weltklasse-Pisten des Bregenzerwaldes (Mellau-Damüls) oder den Arlberg.</li>
                  <li><strong>Winterwandern am Pfänder:</strong> Klare Bergluft und präparierte Winterwanderwege hoch über dem Nebelmeer des Bodensees.</li>
                  <li><strong>Thermen & Wellness:</strong> Entspannen Sie in den umliegenden Thermalbädern nach einem kalten Tag an der frischen Luft.</li>
                  <li><strong>Kulturelle Stille:</strong> Genießen Sie die Ausstellungen im KUB oder einen Abend im Vorarlberger Landestheater abseits des sommerlichen Trubels.</li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
