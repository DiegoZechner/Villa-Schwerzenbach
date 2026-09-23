import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Mock data for apartments grid (Section 4)
  const apartments = [
    { name: "Top 04 - Salon Bordeaux", img: "/images/rooms/top-04.jpg", slug: "salon-bordeaux" },
    { name: "Top 05 - Beletage", img: "/images/rooms/top-05.jpg", slug: "beletage" },
    { name: "Top 10 - Belle Époque", img: "/images/rooms/top-10.jpg", slug: "belle-epoque" },
    { name: "Top 12 - Villa Suite", img: "/images/rooms/top-12.jpg", slug: "villa-suite" },
  ];

  return (
    <main className="w-full relative overflow-x-hidden">
      
      {/* Section 1: Hero Split */}
      <section className="h-screen w-full flex flex-col md:flex-row">
        {/* Left */}
        <Link href="/rooms" className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b-[3px] md:border-b-0 md:border-r-[3px] border-white">
          <Image src="/images/home/stay.jpg" alt="Our Apartments" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white font-serif text-4xl md:text-5xl tracking-wider">Our Apartments</h2>
          </div>
        </Link>
        {/* Right */}
        <Link href="/events" className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden">
          <Image src="/images/home/celebrate.jpg" alt="Events" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white font-serif text-4xl md:text-5xl tracking-wider">Events</h2>
          </div>
        </Link>
      </section>

      {/* Section 2: About Us Video Split */}
      <section className="h-screen w-full flex flex-col md:flex-row border-t-[3px] border-white">
        {/* Left: Solid Color Block */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[var(--color-ashby-olive)] flex flex-col justify-center items-center text-center p-8 border-b-[3px] md:border-b-0 md:border-r-[3px] border-white text-white">
          <h2 className="font-serif text-4xl md:text-5xl tracking-widest uppercase mb-4 leading-tight">Villa<br/>Schwerzenbach</h2>
          <p className="font-script text-3xl md:text-4xl opacity-80 mt-6">A House Full of Life</p>
        </div>
        {/* Right: Video */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
           <video 
              src="/video/Lobbyvideo.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover"
           ></video>
        </div>
      </section>

      {/* Section 3: Book Now Split */}
      <section className="h-screen w-full flex flex-col md:flex-row border-t-[3px] border-white">
        {/* Left: Photo */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full border-b-[3px] md:border-b-0 md:border-r-[3px] border-white">
          <Image src="/images/home/lobby.jpg" alt="Lobby" fill className="object-cover" />
        </div>
        {/* Right: Color Block & Text */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[var(--color-ashby-blue)] flex flex-col justify-center items-center text-center p-12 lg:p-24 text-white">
          <h2 className="font-serif text-4xl md:text-5xl tracking-widest uppercase mb-8 leading-tight">Our<br/>Apartments</h2>
          <p className="font-sans text-sm md:text-base leading-loose max-w-md opacity-90 mb-12">
            Discover a home away from home. Carefully curated spaces that blend historical charm with contemporary luxury.
          </p>
          <Link href="/rooms" className="border-b border-white pb-1 font-mono text-xs tracking-[0.25em] uppercase hover:opacity-70 transition-opacity">
            Book Now
          </Link>
        </div>
      </section>

      {/* Section 4: Apartments Grid (Studio Ashby Projects Style) */}
      <section className="w-full pt-16 pb-32 bg-background border-t-[3px] border-white">
        <h2 className="text-center font-mono text-xs tracking-[0.25em] uppercase text-espresso/50 mb-16">Explore</h2>
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-1 md:gap-2 px-1">
          {apartments.map((apt, i) => (
            <Link key={i} href={`/rooms/${apt.slug}`} className="group shrink-0 snap-center w-[85vw] sm:w-[50vw] md:w-[33vw] lg:w-[25vw] flex flex-col">
               <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden mb-6">
                 <Image src={apt.img} alt={apt.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
               </div>
               <p className="text-center font-serif text-sm tracking-widest uppercase text-espresso group-hover:text-[var(--color-ashby-olive)] transition-colors">
                 {apt.name}
               </p>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
