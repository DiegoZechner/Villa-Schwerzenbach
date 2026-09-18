import { Metadata } from 'next';
import Image from 'next/image';
import BookingWidget from '@/components/booking/BookingWidget';

export function generateStaticParams() {
  return [
    { slug: 'salon-bordeaux' },
    { slug: 'belle-epoque' },
    { slug: 'villa-suite' },
  ];
}

export default function RoomDetailPage({ params }: { params: { slug: string } }) {
  // Generiere dynamisch korrekte Mock-Daten basierend auf dem Slug
  const getRoomData = () => {
    if (params.slug === 'salon-bordeaux') {
      return { name: 'Top 04 - Salon Bordeaux', image: '/images/rooms/top-04.jpg', price: 180, capacity: 2, size: 24 };
    }
    if (params.slug === 'belle-epoque') {
      return { name: 'Top 10 - Belle Époque', image: '/images/rooms/top-10.jpg', price: 280, capacity: 2, size: 38 };
    }
    return { name: 'Top 12 - Villa Suite', image: '/images/rooms/top-12.jpg', price: 380, capacity: 4, size: 65 };
  };

  const roomBase = getRoomData();

  const room = {
    id: params.slug,
    name: roomBase.name,
    category: 'Apartment',
    price: roomBase.price,
    capacity: roomBase.capacity,
    size: roomBase.size,
    description: 'Erleben Sie luxuriösen Komfort in unserem exklusiven Apartment. Ausgestattet mit hochwertigen Betten, einem grosszügigen Bad mit Regendusche und erlesenen Details. Grosse Fenster sorgen für viel natürliches Licht und bieten einen wunderbaren Blick auf die ruhige Umgebung der Villa.',
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
