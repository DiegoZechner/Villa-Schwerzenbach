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
          {/* Overlay: transparent by default, darkens on hover */}
          <div className="absolute inset-0 bg-transparent group-hover:bg-black/40 transition-colors duration-700 pointer-events-none"></div>
          {/* Text: hidden by default, appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <h2 className="text-white font-serif text-4xl md:text-5xl tracking-wider">Our Apartments</h2>
          </div>
        </Link>
        
        {/* Right */}
        <Link href="/events" className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden cursor-pointer">
          <Image src="/images/home/celebrate.jpg" alt="Events" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
          {/* Overlay: transparent by default, darkens on hover */}
          <div className="absolute inset-0 bg-transparent group-hover:bg-black/40 transition-colors duration-700"></div>
          {/* Text: hidden by default, appears on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <h2 className="text-white font-serif text-4xl md:text-5xl tracking-wider">Events</h2>
          </div>
        </Link>
      </section>

      {/* Section 2: Text Block */}
      <section className="w-full bg-bordeaux border-t-[3px] border-white py-24 md:py-32 flex flex-col justify-center items-center text-center text-white px-6 md:px-12">
        <h2 className="font-serif text-3xl md:text-5xl tracking-widest uppercase mb-10">
          VILLA SCHWERZENBACH
        </h2>
        <p className="font-serif italic text-lg md:text-2xl max-w-4xl leading-relaxed opacity-90">
          Die Villa Schwerzenbach schafft Räume mit einer unverwechselbaren, authentischen Identität. Jeder Bereich wird mit tiefgreifender Sorgfalt und kreativer Präzision zum Leben erweckt.
          <br /><br />
          <span className="font-sans text-sm tracking-[0.2em] not-italic uppercase mt-4 block opacity-80">Same Space. Different Stories.</span>
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

      {/* Section 4: Apartments Grid */}
      <section className="w-full bg-cream border-t-[3px] border-white">
        
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 md:px-12 py-10 md:py-14">
          <h2 className="font-sans text-xs md:text-sm tracking-[0.25em] uppercase text-espresso/90 font-medium">
            Apartments
          </h2>
          <span className="text-espresso/80 text-xl font-light">›</span>
        </div>

        {/* Image Grid */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 snap-x snap-mandatory hide-scrollbar gap-[2px] bg-white">
          {apartments.map((apt, i) => (
            <Link 
              key={i} 
              href={`/rooms/${apt.slug}`} 
              className="group shrink-0 snap-center w-[85vw] sm:w-[50vw] md:w-[33vw] lg:w-full flex flex-col bg-cream"
            >
               {/* Image */}
               <div className="relative h-[55vh] md:h-[65vh] w-full overflow-hidden">
                 <Image 
                   src={apt.img} 
                   alt={apt.name} 
                   fill 
                   className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                 />
               </div>
               
               {/* Text below image */}
               <div className="py-8 md:py-10 px-4">
                 <p className="text-center font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-espresso/80 group-hover:text-bordeaux transition-colors">
                   {apt.name}
                 </p>
               </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
