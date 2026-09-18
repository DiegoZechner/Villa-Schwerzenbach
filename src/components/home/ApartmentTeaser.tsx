import Link from 'next/link';
import Image from 'next/image';

const apartments = [
  { slug: 'salon-bordeaux', name: 'Top 04 - Salon Bordeaux', desc: 'Elegantes Apartment in warmen Bordeaux-Tönen', image: '/images/rooms/top-04.jpg' },
  { slug: 'belle-epoque', name: 'Top 10 - Belle Époque', desc: 'Opulentes Apartment mit Pracht der Belle Époque', image: '/images/rooms/top-10.jpg' },
  { slug: 'villa-suite', name: 'Top 12 - Villa Suite', desc: 'Die Krönung der Villa mit Panoramablick', image: '/images/rooms/top-12.jpg' },
];

export default function ApartmentTeaser() {
  return (
    <section className="py-24 bg-cream-light relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-espresso text-center mb-16">Unsere Apartments</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {apartments.map((apt) => (
            <Link key={apt.slug} href={`/rooms/${apt.slug}`} className="group block">
              <div className="relative h-80 mb-6 overflow-hidden rounded-sm">
                <Image src={apt.image} alt={apt.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-serif text-bordeaux mb-2">{apt.name}</h3>
              <p className="text-espresso/70">{apt.desc}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/rooms" className="inline-block border border-bordeaux text-bordeaux px-8 py-3 rounded-sm hover:bg-bordeaux hover:text-white transition-colors font-medium tracking-wide uppercase text-sm">
            See all apartments
          </Link>
        </div>
      </div>
    </section>
  );
}

