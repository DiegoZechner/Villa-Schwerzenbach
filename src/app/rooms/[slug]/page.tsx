import { Metadata } from 'next';
import Image from 'next/image';
import BookingWidget from '@/components/booking/BookingWidget';

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

  const room = {
    id: roomBase.slug,
    name: roomBase.name,
    category: 'Apartment',
    price: roomBase.price,
    capacity: roomBase.capacity,
    size: roomBase.size,
    description: roomBase.description,
    amenities: ['Kingsize-Bett', 'Regendusche', 'Espressomaschine', 'High-Speed WLAN', 'Klimaanlage', 'Safe', 'Premium Pflegeprodukte'],
    images: [
      roomBase.image, 
      '/images/home/stay.jpg', 
      '/images/home/lobby.jpg'
    ] // Using fallback images for the grid since we only have 1 per room currently
  };

  return (
    <div className="bg-background min-h-screen relative z-10">
      
      {/* Huge Hero Image */}
      <div className="relative h-[70vh] md:h-[85vh] w-full">
        <Image src={room.images[0]} alt={room.name} fill className="object-cover" priority />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Editorial Content */}
          <div className="flex-1 lg:w-2/3">
            
            <div className="mb-16 text-center lg:text-left">
              <h1 className="font-serif text-5xl md:text-6xl text-espresso mb-6 uppercase tracking-widest leading-tight">{room.name}</h1>
              <div className="font-mono text-sm tracking-[0.2em] uppercase text-espresso/60 flex flex-wrap justify-center lg:justify-start items-center gap-4">
                <span>{room.capacity} GUESTS</span>
                <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
                <span>{room.size} SQM</span>
                <span className="w-1 h-1 bg-espresso/30 rounded-full"></span>
                <span>1 KING BED</span>
              </div>
            </div>

            <div className="text-lg md:text-xl text-espresso/80 leading-relaxed mb-16 font-serif">
              <p>{room.description}</p>
            </div>

            {/* Editorial Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              <div className="relative h-[40vh] md:h-96">
                <Image src={room.images[1]} alt={`${room.name} Detail`} fill className="object-cover" />
              </div>
              <div className="relative h-[40vh] md:h-96">
                <Image src={room.images[2]} alt={`${room.name} Bathroom`} fill className="object-cover" />
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="font-mono text-sm tracking-[0.2em] text-espresso uppercase mb-8 border-b border-cream/50 pb-4">Room Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {room.amenities.map((amenity, i) => (
                  <li key={i} className="flex items-center gap-4 text-espresso/80 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-bordeaux"></span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar / Booking Widget */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28">
              <BookingWidget roomId={room.id} roomName={room.name} price={room.price} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
