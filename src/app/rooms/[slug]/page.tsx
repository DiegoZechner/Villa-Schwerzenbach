import { Metadata } from 'next';
import Link from 'next/link';
import BookingWidget from '@/components/booking/BookingWidget';
import RoomGallery from '@/components/rooms/RoomGallery';

const allRooms = [
  { id: '1', slug: 'rosengarten', name: 'Top 02 - Rosengarten', category: 'Classic', price: 159, capacity: 2, size: 18, image: '/images/rooms/top-02.jpg', description: 'Gemütliches Zimmer mit Blick auf den hauseigenen Rosengarten. Warme Farben und stilvolles Interieur laden zum Verweilen ein.' },
  { id: '2', slug: 'parkblick', name: 'Top 03 - Parkblick', category: 'Classic', price: 169, capacity: 2, size: 20, image: '/images/rooms/top-03.jpg', description: 'Helles Zimmer mit Panoramablick auf den umliegenden Park. Der ideale Rückzugsort nach einem ereignisreichen Tag.' },
  { id: '3', slug: 'salon-bordeaux', name: 'Top 04 - Salon Bordeaux', category: 'Comfort', price: 189, capacity: 2, size: 24, image: '/images/rooms/top-04.jpg', description: 'Elegantes Zimmer in warmen Bordeaux-Tönen mit einem gemütlichen Sitzbereich. Stilvolle Details und hochwertige Stoffe prägen das Ambiente.' },
  { id: '4', slug: 'beletage', name: 'Top 05 - Beletage', category: 'Comfort', price: 199, capacity: 2, size: 26, image: '/images/rooms/top-05.jpg', description: 'Grosszügiges Zimmer im ersten Obergeschoss mit hohen Decken und historischem Charme. Klassische Eleganz trifft auf modernen Komfort.' },
  { id: '5', slug: 'orangerie', name: 'Top 06 - Orangerie', category: 'Comfort', price: 199, capacity: 3, size: 28, image: '/images/rooms/top-06.jpg', description: 'Lichtdurchflutetes Zimmer mit verspielten botanischen Akzenten. Ideal für Familien oder Gäste, die etwas mehr Platz schätzen.' },
  { id: '6', slug: 'bibliothek', name: 'Top 07 - Bibliothek', category: 'Superior', price: 229, capacity: 2, size: 30, image: '/images/rooms/top-07.jpg', description: 'Ruhiges Refugium mit edlen Holzmöbeln und einer kuratierte Bücherauswahl. Perfekt für Gäste, die Ruhe und Inspiration suchen.' },
  { id: '7', slug: 'villa-blau', name: 'Top 08 - Villa Blau', category: 'Superior', price: 239, capacity: 2, size: 32, image: '/images/rooms/top-08.jpg', description: 'Stilvolles Zimmer in den charakteristischen Blautönen der Villa. Ein harmonisches Zusammenspiel aus Farbe, Licht und Design.' },
  { id: '8', slug: 'dachterrasse', name: 'Top 09 - Dachterrasse', category: 'Superior', price: 249, capacity: 3, size: 35, image: '/images/rooms/top-09.jpg', description: 'Exklusives Zimmer mit privatem Zugang zur Dachterrasse und Blick über die Dächer von Schwerzenbach.' },
  { id: '9', slug: 'belle-epoque', name: 'Top 10 - Belle Époque', category: 'Deluxe', price: 279, capacity: 2, size: 38, image: '/images/rooms/top-10.jpg', description: 'Opulentes Zimmer, das die Pracht der Belle Époque einfängt. Hohe Stuckdecken, Kronleuchter und edle Materialien schaffen ein unvergessliches Erlebnis.' },
  { id: '10', slug: 'grand-suite', name: 'Top 11 - Grand Suite', category: 'Suite', price: 329, capacity: 4, size: 50, image: '/images/rooms/top-11.jpg', description: 'Geräumige Suite mit separatem Wohnbereich und luxuriöser Ausstattung. Der perfekte Rahmen für besondere Anlässe.' },
  { id: '11', slug: 'villa-suite', name: 'Top 12 - Villa Suite', category: 'Suite', price: 379, capacity: 4, size: 65, image: '/images/rooms/top-12.jpg', description: 'Die Krönung der Villa – unsere grösste Suite mit Panoramablick, freistehender Badewanne und einem eigenen Loungebereich.' },
];

export function generateStaticParams() {
  return allRooms.map(r => ({ slug: r.slug }));
}

export default function RoomDetailPage({ params }: { params: { slug: string } }) {
  const roomBase = allRooms.find(r => r.slug === params.slug) || allRooms[0];

  // Helper to resolve specific images if they exist, otherwise fallback to the single main image
  const getGalleryImages = (slug: string, mainImage: string) => {
    if (slug === 'salon-bordeaux') return ['/images/rooms/top-04-1.jpg', '/images/rooms/top-04-2.jpg', '/images/rooms/top-04-3.jpg', '/images/rooms/top-04-4.jpg'];
    if (slug === 'belle-epoque') return ['/images/rooms/top-10-1.jpg', '/images/rooms/top-10-2.jpg', '/images/rooms/top-10-3.jpg', '/images/rooms/top-10-4.jpg'];
    if (slug === 'villa-suite') return ['/images/rooms/top-12-1.jpg', '/images/rooms/top-12-2.jpg', '/images/rooms/top-12-3.jpg', '/images/rooms/top-12-4.jpg'];
    
    // Fallback for rooms without extra gallery images yet
    return [mainImage, '/images/home/stay.jpg', '/images/home/lobby.jpg'];
  };

  const room = {
    id: roomBase.slug,
    name: roomBase.name,
    category: roomBase.category,
    price: roomBase.price,
    capacity: roomBase.capacity,
    size: roomBase.size,
    description: roomBase.description,
    amenities: ['Kingsize-Bett', 'Regendusche', 'Espressomaschine', 'High-Speed WLAN', 'Klimaanlage', 'Safe', 'Premium Pflegeprodukte'],
    images: getGalleryImages(roomBase.slug, roomBase.image)
  };

  return (
    <div className="bg-background min-h-screen relative z-10 font-sans">
      
      {/* Cinematic Hero */}
      <div className="relative w-full h-[60vh] lg:h-[85vh]">
        <Image src={room.images[0]} alt={room.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Back Button */}
        <Link href="/rooms" className="absolute top-24 lg:top-8 left-6 lg:left-12 z-50 text-white font-mono text-[10px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity flex items-center gap-2">
          <span>←</span> Back to Apartments
        </Link>

        {/* Room Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/80 mb-6">
            {room.category}
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white uppercase tracking-[0.15em] leading-tight drop-shadow-md">
            {room.name}
          </h1>
        </div>
      </div>

      {/* Sticky Booking/Filter Bar */}
      <BookingWidget roomId={room.id} roomName={room.name} price={room.price} />

      {/* Detailed Content */}
      <div className="bg-cream">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl py-24 md:py-32">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            
            {/* Left: Description */}
            <div className="w-full lg:w-3/5">
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-8 uppercase tracking-widest">The Experience</h2>
              <p className="text-lg text-espresso/80 leading-loose font-serif mb-12">
                {room.description}
              </p>
              
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 flex flex-wrap items-center gap-6 border-y border-espresso/10 py-6">
                <span className="flex flex-col"><strong className="text-espresso text-sm font-sans mb-1">{room.size}</strong> SQM</span>
                <span className="w-px h-8 bg-espresso/20"></span>
                <span className="flex flex-col"><strong className="text-espresso text-sm font-sans mb-1">{room.capacity}</strong> GUESTS MAX</span>
                <span className="w-px h-8 bg-espresso/20"></span>
                <span className="flex flex-col"><strong className="text-espresso text-sm font-sans mb-1">1</strong> KING BED</span>
              </div>
            </div>

            {/* Right: Amenities */}
            <div className="w-full lg:w-2/5">
              <div className="bg-white p-8 md:p-12 border border-espresso/5 shadow-sm">
                <h3 className="font-serif text-2xl text-espresso mb-8 uppercase tracking-widest">Room Amenities</h3>
                <ul className="flex flex-col gap-4">
                  {room.amenities.map((amenity, i) => (
                    <li key={i} className="flex items-center gap-4 text-espresso/80 font-sans text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-bordeaux/60 shrink-0"></div>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {room.images.length > 1 && (
        <div className="w-full bg-espresso py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-16 text-center uppercase tracking-widest">Gallery</h2>
            <RoomGallery images={room.images.slice(1)} />
          </div>
        </div>
      )}

    </div>
  );
}
