import { Metadata } from 'next';
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
    <div className="bg-background min-h-screen pt-32 pb-24 relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Sticky Image Gallery */}
          <div className="w-full lg:w-[55%]">
            <div className="lg:sticky lg:top-28">
              <RoomGallery images={room.images} />
            </div>
          </div>

          {/* Right: Content & Booking Form */}
          <div className="w-full lg:w-[45%] flex flex-col pt-4">
            
            <h1 className="font-serif text-4xl lg:text-5xl text-espresso mb-4 uppercase tracking-widest leading-tight">
              {room.name}
            </h1>
            
            <div className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-espresso/60 flex flex-wrap items-center gap-3 mb-10">
              <span>{room.capacity} GUESTS</span>
              <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
              <span>{room.size} SQM</span>
              <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
              <span>1 KING BED</span>
            </div>

            <div className="text-lg text-espresso/80 leading-relaxed mb-12 font-serif">
              <p>{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="font-mono text-xs tracking-[0.2em] text-espresso uppercase mb-6 border-b border-cream/50 pb-2">Amenities</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                {room.amenities.map((amenity, i) => (
                  <li key={i} className="flex items-center gap-3 text-espresso/80 font-sans text-sm">
                    <span className="w-1 h-1 rounded-full bg-bordeaux"></span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            {/* Inline Booking Widget (No longer sidebar, integrates perfectly into the page flow) */}
            <div className="mt-auto border-t border-cream/50 pt-10">
               <BookingWidget roomId={room.id} roomName={room.name} price={room.price} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
