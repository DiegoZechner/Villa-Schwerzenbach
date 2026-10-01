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
    price: roomBase.price,
    capacity: roomBase.capacity,
    size: roomBase.size,
    description: roomBase.description,
    amenities: ['Kingsize-Bett', 'Regendusche', 'Espressomaschine', 'High-Speed WLAN', 'Klimaanlage', 'Safe', 'Premium Pflegeprodukte'],
    images: getGalleryImages(roomBase.slug, roomBase.image)
  };

  return (
    <div className="bg-cream h-[100dvh] w-full overflow-hidden relative z-10 flex flex-col lg:flex-row">
      
      {/* Back Button */}
      <Link href="/rooms" className="absolute top-20 lg:top-8 left-6 lg:left-8 z-50 text-white mix-blend-difference font-mono text-[10px] tracking-widest uppercase hover:opacity-50 transition-opacity flex items-center gap-2">
        <span>←</span> BACK TO ROOMS
      </Link>

      {/* Left: Full Height Image Gallery */}
      <div className="w-full lg:w-[60%] h-[40vh] lg:h-full relative bg-espresso shrink-0">
        <RoomGallery images={room.images} fullHeight />
      </div>

      {/* Right: Content & Booking Form (Strictly sized to fit screen without page scrolling) */}
      <div className="w-full lg:w-[40%] h-[60vh] lg:h-full flex flex-col px-6 lg:px-12 pt-8 lg:pt-24 pb-8 overflow-y-auto hide-scrollbar bg-cream">
        
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full justify-center">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/50 mb-4">
            {room.category}
          </div>
          
          <h1 className="font-serif text-3xl lg:text-5xl text-espresso mb-6 uppercase tracking-widest leading-tight">
            {room.name}
          </h1>
          
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 flex items-center gap-3 mb-8 border-y border-espresso/10 py-3">
            <span>{room.capacity} GUESTS</span>
            <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
            <span>{room.size} SQM</span>
          </div>

          <p className="text-sm lg:text-base text-espresso/80 leading-relaxed mb-8 font-serif">
            {room.description}
          </p>

          {/* Compact Amenities */}
          <div className="mb-auto">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {room.amenities.slice(0, 4).map((amenity, i) => (
                <li key={i} className="flex items-center gap-2 text-espresso/80 font-sans text-xs">
                  <span className="w-1 h-1 rounded-full bg-bordeaux"></span>
                  {amenity}
                </li>
              ))}
              <li className="text-xs text-espresso/50 italic">+ more</li>
            </ul>
          </div>

          {/* Booking Widget (now integrated seamlessly at the bottom) */}
          <div className="mt-8">
             <BookingWidget roomId={room.id} roomName={room.name} price={room.price} />
          </div>
        </div>

      </div>
    </div>
  );
}
