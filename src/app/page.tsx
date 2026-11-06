import Image from 'next/image';
import Link from 'next/link';
import ApartmentSlider from '@/components/home/ApartmentSlider';

export default function Home() {
  return (
    <main className="w-full relative overflow-x-hidden">
      
      {/* Section 1: Dual Brand Hero Split (Villa vs. MIVA) */}
      <section className="h-screen w-full flex flex-col md:flex-row">
        
        {/* Left: Villa Schwerzenbach (Apartments & Stay) */}
        <Link href="/rooms" className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b-[3px] md:border-b-0 md:border-r-[3px] border-cream cursor-pointer block">
          <video 
            src="/video/Lobbyvideo.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#35271f]/35 md:bg-[#35271f]/25 md:group-hover:bg-[#4b1716]/55 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#d9c8b9] mb-3 px-4 py-1.5 border border-[#d9c8b9]/40">
              VILLA SCHWERZENBACH
            </span>
            <h2 className="text-white font-villa-editorial text-4xl md:text-6xl uppercase tracking-[0.18em]">
              Our Apartments
            </h2>
          </div>
        </Link>
        
        {/* Right: MIVA (Events & Experiences) */}
        <Link href="/events" className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden cursor-pointer block">
          <Image src="/images/home/celebrate.jpg" alt="MIVA Events" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
          <div className="absolute inset-0 bg-[#4e041c]/45 md:bg-[#4e041c]/30 md:group-hover:bg-[#4e041c]/65 transition-colors duration-700 pointer-events-none"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase bg-[#ea2d39] text-white mb-4 px-4 py-1.5 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#e8b4f4]"></span>
              BY MIVA.
            </span>
            <h2 className="text-white font-miva-display italic text-4xl md:text-6xl tracking-wide mb-3">
              Events &amp; Spaces
            </h2>
            <p className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#e8b4f4]">
              Für ein farbenfroheres Morgen
            </p>
          </div>
        </Link>
      </section>

      {/* Section 2: Villa Editorial Statement */}
      <section className="w-full bg-bordeaux border-t-[3px] border-cream py-16 md:py-24 flex flex-col justify-center items-center text-center text-cream px-6 md:px-12">
        <Image 
          src="/images/logos/brand-6.svg" 
          alt="Villa Schwerzenbach Brand Mark" 
          width={48} 
          height={48} 
          className="mb-8 brightness-0 invert opacity-90 w-12 md:w-14 h-auto"
        />
        <h2 className="font-villa-editorial text-3xl md:text-5xl tracking-[0.2em] uppercase mb-6 text-white">
          VILLA SCHWERZENBACH
        </h2>
        <p className="font-sans text-sm md:text-lg max-w-3xl leading-relaxed text-cream/90 mb-8">
          Die Villa Schwerzenbach schafft Räume mit einer unverwechselbaren, authentischen Identität. Jeder Bereich wird mit tiefgreifender Sorgfalt und kreativer Präzision zum Leben erweckt – ein Ort zum Übernachten, Essen, Treffen, Feiern und Tanzen.
        </p>
        <span className="font-script text-3xl md:text-4xl text-cream">
          Same space, different stories
        </span>
      </section>

      {/* Section 3: Villa World Showcase (Arch Mask & Dove Blue / Beige Palette) */}
      <section className="w-full bg-cream border-t-[3px] border-white py-20 md:py-28 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Arch-Masked Photo */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-[460px] md:h-[560px] arch-mask border-4 border-white shadow-xl">
              <Image src="/images/home/lobby.jpg" alt="Villa Schwerzenbach Interior" fill className="object-cover" />
            </div>
          </div>

          {/* Right: Editorial Text Block */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-villa-red font-semibold mb-3">
              STAY • RELAX • ENJOY
            </span>
            <h2 className="font-villa-editorial text-4xl md:text-6xl text-espresso uppercase tracking-[0.15em] mb-6 leading-tight">
              Zeitlose Eleganz
            </h2>
            <p className="font-sans text-sm md:text-base text-espresso/80 leading-loose mb-10 max-w-lg">
              Unsere 11 individuell gestalteten Apartments (Top 02 bis Top 12) vereinen den historischen Glanz der Belle Époque mit zeitgenössischem Komfort. Warme Erdtöne, lichtdurchflutete Räume und die charakteristischen Rundbögen machen jeden Aufenthalt einzigartig.
            </p>
            <Link 
              href="/rooms" 
              className="bg-bordeaux text-white font-sans font-medium text-xs tracking-[0.25em] uppercase px-10 py-4 hover:bg-villa-red transition-colors"
            >
              Apartments Entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Apartments Slider (Villa World with Arch Cards) */}
      <ApartmentSlider />

      {/* Section 5: MIVA Events Teaser (Circles, Lilac, Dark Purple & Tomate Red) */}
      <section className="w-full bg-miva-purple text-white py-20 md:py-28 px-6 md:px-12 border-t-[3px] border-white relative overflow-hidden">
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

    </main>
  );
}
