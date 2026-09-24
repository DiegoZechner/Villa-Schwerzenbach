'use client';
import Image from 'next/image';

export default function DiscoverPage() {
  const summerEvents = [
    {
      category: "KULTUR & EVENT",
      date: "Juli - August (Jährlich)",
      title: "Bregenzer Festspiele",
      description: "Ein kulturelles Spektakel von Weltrang. Die Bregenzer Festspiele ziehen jeden Sommer Kunst- und Musikliebhaber auf die beeindruckende Seebühne, die direkt im Wasser des Bodensees verankert ist. Neben der spektakulären Kulisse und den aufwendigen Bühnenbildern erwartet Sie ein hochkarätiges Opernprogramm.",
      img: "/images/home/celebrate.jpg"
    },
    {
      category: "NATUR & AKTIV",
      date: "Mai - September",
      title: "Der Pfänder & Die Weiße Flotte",
      description: "Mit der Seilbahn geht es in nur sechs Minuten auf den Hausberg (1064m). Von dort eröffnet sich ein unvergleichliches Panorama über 240 Alpengipfel. Wieder im Tal bietet die Bodensee-Schifffahrt entspannte Ausflüge in die Nachbarländer – perfekt für einen Tagesausflug nach Lindau oder Meersburg.",
      img: "/images/home/stay.jpg"
    },
    {
      category: "LIFESTYLE & ENTSPANNUNG",
      date: "Juni - August",
      title: "Die Historische Mili",
      description: "Die alte Militärbadeanstalt (Mili) ist ein historischer Holzpfahlbau direkt am See und gilt als eines der charmantesten Freibäder der Region. Hier trifft man sich zum Schwimmen, Sonnenbaden und um bei einem kühlen Drink den Sonnenuntergang zu genießen.",
      img: "/images/home/lobby.jpg"
    }
  ];

  const winterEvents = [
    {
      category: "TRADITION & EVENT",
      date: "Mitte November - Dezember",
      title: "Bregenzer Weihnachtsmarkt",
      description: "In der Adventszeit verwandeln sich der Kornmarktplatz und die malerische Oberstadt in ein stimmungsvolles Winterdorf. Kunsthandwerk, regionale Spezialitäten und der Duft von Glühwein schaffen eine magische Atmosphäre fernab von städtischer Hektik.",
      img: "/images/home/celebrate.jpg"
    },
    {
      category: "SPORT & NATUR",
      date: "Dezember - März",
      title: "Skifahren im Bregenzerwald",
      description: "Wenn der Bodensee unter einer ruhigen Nebeldecke liegt, locken die nahegelegenen Alpen mit strahlendem Sonnenschein. In unter einer Stunde erreichen Sie Premium-Skigebiete wie Mellau-Damüls oder den legendären Arlberg für Tage im frischen Pulverschnee.",
      img: "/images/home/stay.jpg"
    },
    {
      category: "KUNST & ARCHITEKTUR",
      date: "Ganzjährig",
      title: "Kunsthaus Bregenz (KUB)",
      description: "Gerade an kalten Wintertagen bietet das KUB, ein architektonisches Meisterwerk von Peter Zumthor, den idealen Rückzugsort. Genießen Sie zeitgenössische Kunstausstellungen von internationalem Rang in einer unvergleichlichen, lichtdurchfluteten Atmosphäre.",
      img: "/images/home/lobby.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Header Image */}
      <section className="relative w-full h-[60vh] md:h-[70vh]">
        <Image src="/images/home/stay.jpg" alt="Discover Bregenz" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white font-serif text-5xl md:text-7xl tracking-widest uppercase">
            Discover
          </h1>
        </div>
      </section>

      {/* SUMMER SECTION */}
      <section className="container mx-auto px-6 md:px-12 max-w-5xl py-24">
        <h2 className="font-serif text-4xl md:text-5xl tracking-widest uppercase text-bordeaux mb-16 text-center">
          Sommer am Bodensee
        </h2>
        
        <div className="space-y-24">
          {summerEvents.map((event, idx) => (
            <div key={idx} className="flex flex-col border-t border-espresso/20 pt-12 gap-8 lg:flex-row lg:items-center">
              <div className="flex-1 lg:pr-12">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-espresso/50 mb-4">
                  {event.category} <span className="mx-2">|</span> {event.date}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-espresso mb-6">
                  {event.title}
                </h3>
                <p className="font-sans text-sm leading-loose text-espresso/80">
                  {event.description}
                </p>
              </div>
              <div className="flex-1 w-full relative h-[400px]">
                <Image src={event.img} alt={event.title} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WINTER SECTION */}
      <section className="bg-espresso text-cream py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <h2 className="font-serif text-4xl md:text-5xl tracking-widest uppercase text-cream mb-16 text-center">
            Winter in Bregenz
          </h2>
          
          <div className="space-y-24">
            {winterEvents.map((event, idx) => (
              <div key={idx} className="flex flex-col border-t border-cream/20 pt-12 gap-8 lg:flex-row-reverse lg:items-center">
                <div className="flex-1 lg:pl-12">
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream/50 mb-4">
                    {event.category} <span className="mx-2">|</span> {event.date}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-cream mb-6">
                    {event.title}
                  </h3>
                  <p className="font-sans text-sm leading-loose text-cream/80">
                    {event.description}
                  </p>
                </div>
                <div className="flex-1 w-full relative h-[400px]">
                  <Image src={event.img} alt={event.title} fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
