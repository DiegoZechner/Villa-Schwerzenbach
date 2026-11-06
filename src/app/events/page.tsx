import EventInquiry from '@/components/events/EventInquiry';

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      
      {/* MIVA Header Banner (No Hero Image) */}
      <div className="w-full bg-miva-purple pt-36 pb-20 px-6 md:px-12 border-b-[3px] border-miva-lilac/40">
        <div className="container mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-miva-red text-white font-sans font-medium text-[10px] tracking-[0.25em] uppercase mb-5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-miva-lilac"></span>
            MIVA EVENTS &amp; HOSPITALITY
          </div>
          <h1 className="font-miva-display italic text-4xl md:text-6xl text-white tracking-wide mb-3">
            Events &amp; Experiences
          </h1>
          <p className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-miva-lilac">
            Ein farbenfroheres Morgen
          </p>
        </div>
      </div>

      {/* MIVA World Section: White Gray (#f4f4f4) background with Lilac, Dark Purple & Tomate Red accents */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="bg-miva-gray p-8 md:p-16 rounded-3xl shadow-2xl border-2 border-miva-lilac/40 relative overflow-hidden">
            
            {/* Decorative MIVA Circles */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-miva-lilac/35 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-miva-red/10 pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-miva-purple text-miva-lilac font-sans font-semibold text-[10px] tracking-[0.25em] uppercase mb-5">
                <span className="w-2 h-2 rounded-full bg-miva-red"></span>
                BY MIVA. • HOSPITALITY &amp; KONZEPTE
              </div>
              <h2 className="font-miva-display text-4xl md:text-6xl text-miva-purple mb-6 leading-tight">
                Feiern, Tagen &amp; <span className="italic text-miva-red">Erleben</span>
              </h2>
              <p className="font-sans text-base md:text-lg text-miva-purple/80 leading-relaxed">
                MIVA steht für Lebendigkeit, Spontanität und erlebnisorientierte Momente in der Villa Schwerzenbach. Wählen Sie Ihr Event-Format – von Hochzeiten und Apéros über Firmenpartys und Seminare bis hin zu Ihrer ganz individuellen Idee.
              </p>
            </div>
            
            <div className="relative z-10">
              <EventInquiry />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
