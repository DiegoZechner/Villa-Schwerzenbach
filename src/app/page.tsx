import Image from 'next/image';
import Link from 'next/link';
import ApartmentSlider from '@/components/home/ApartmentSlider';

export default function Home() {

  return (
    <main className="w-full relative overflow-x-hidden">
      
      {/* Section 1: Hero Split */}
      <section className="h-screen w-full flex flex-col md:flex-row">
        {/* Left: Our Apartments */}
        <Link href="/rooms" className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b-[3px] md:border-b-0 md:border-r-[3px] border-white cursor-pointer block">
          <video 
              src="/video/Lobbyvideo.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
           ></video>
          {/* Overlay: permanent dark on mobile, darkens on hover on desktop */}
          <div className="absolute inset-0 bg-black/30 md:bg-transparent md:group-hover:bg-black/40 transition-colors duration-700 pointer-events-none"></div>
          {/* Text: pulsing on mobile, appears on hover on desktop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <h2 className="text-white font-serif text-4xl md:text-5xl tracking-wider animate-[pulse_3s_ease-in-out_infinite] md:animate-none">Our Apartments</h2>
          </div>
        </Link>
        
        {/* Right */}
        <Link href="/events" className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden cursor-pointer block">
          <Image src="/images/home/celebrate.jpg" alt="Events" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
          {/* Overlay: permanent dark on mobile, darkens on hover on desktop */}
          <div className="absolute inset-0 bg-black/30 md:bg-transparent md:group-hover:bg-black/40 transition-colors duration-700 pointer-events-none"></div>
          {/* Text: pulsing on mobile, appears on hover on desktop */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <h2 className="text-white font-serif text-4xl md:text-5xl tracking-wider animate-[pulse_3s_ease-in-out_infinite] md:animate-none">Events</h2>
          </div>
        </Link>
      </section>

      {/* Section 2: Text Block */}
      <section className="w-full bg-bordeaux border-t-[3px] border-white py-16 md:py-20 flex flex-col justify-center items-center text-center text-white px-6 md:px-12">
        <Image 
          src="/images/logos/brand-6.svg" 
          alt="Villa Schwerzenbach Brand Mark" 
          width={40} 
          height={40} 
          className="mb-8 brightness-0 invert opacity-90 w-10 md:w-12 h-auto"
        />
        <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase mb-8">
          VILLA SCHWERZENBACH
        </h2>
        <p className="font-serif italic text-lg md:text-2xl max-w-4xl leading-relaxed opacity-90">
          Die Villa Schwerzenbach schafft Räume mit einer unverwechselbaren, authentischen Identität. Jeder Bereich wird mit tiefgreifender Sorgfalt und kreativer Präzision zum Leben erweckt.
          <br /><br />
          <span className="font-sans text-xs md:text-sm tracking-[0.2em] not-italic uppercase mt-2 block opacity-80">Same Space. Different Stories.</span>
        </p>
      </section>

      {/* Section 3: Book Now Split */}
      <section className="h-screen w-full flex flex-col md:flex-row border-t-[3px] border-white">
        {/* Left: Photo */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full border-b-[3px] md:border-b-0 md:border-r-[3px] border-white">
          <Image src="/images/home/lobby.jpg" alt="Lobby" fill className="object-cover" />
        </div>
        {/* Right: Color Block & Text */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-villa-blue flex flex-col justify-center items-center text-center p-12 lg:p-24 text-white">
          <h2 className="font-serif text-4xl md:text-5xl tracking-widest uppercase mb-8 leading-tight">Our<br/>Apartments</h2>
          <p className="font-sans text-sm md:text-base leading-loose max-w-md opacity-90 mb-12">
            A house full of life. Carefully curated spaces that blend historical charm with contemporary luxury. Good people. Better days.
          </p>
          <Link href="/rooms" className="border-b border-white pb-1 font-mono text-xs tracking-[0.25em] uppercase hover:opacity-70 transition-opacity">
            Book Now
          </Link>
        </div>
      </section>

      {/* Section 4: Apartments Slider */}
      <ApartmentSlider />

    </main>
  );
}
