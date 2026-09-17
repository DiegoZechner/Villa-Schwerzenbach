import { Metadata } from 'next';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import BookingWidget from '@/components/booking/BookingWidget';

// In a real app, generateStaticParams would fetch all room slugs
export function generateStaticParams() {
  return [
    { slug: 'classic-1' },
    { slug: 'comfort-1' },
    { slug: 'superior-1' },
    { slug: 'deluxe-1' },
    { slug: 'suite-1' },
  ];
}

export default function RoomDetailPage({ params }: { params: { slug: string } }) {
  // Mock data for MVP
  const room = {
    id: params.slug,
    name: 'Superior Room',
    category: 'Superior',
    price: 220,
    capacity: 2,
    size: 32,
    description: 'Erleben Sie luxuriösen Komfort in unserem Superior Room. Ausgestattet mit einem Kingsize-Bett, einem grosszügigen Bad mit Regendusche und erlesenen Pflegeprodukten. Grosse Fenster sorgen für viel natürliches Licht und bieten einen wunderbaren Blick auf die Umgebung.',
    amenities: ['Kingsize-Bett', 'Regendusche', 'Kaffeemaschine', 'Kostenloses WLAN', 'Klimaanlage', 'Safe'],
    images: ['/images/hero/hero-1.jpg', '/images/gallery/gallery-1.jpg', '/images/hero/hero-1.jpg']
  };

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      {/* Gallery Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 h-[50vh] mb-12">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 relative">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${room.images[0]})` }} />
        </div>
        <div className="hidden lg:flex flex-col gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${room.images[1]})` }} />
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${room.images[2]})` }} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <Badge category={room.category} className="mb-4" />
              <h1 className="font-serif text-4xl md:text-5xl text-bordeaux mb-4">{room.name}</h1>
              <div className="flex gap-6 text-espresso/70 border-b border-cream/50 pb-6">
                <span className="flex items-center gap-2">👥 {room.capacity} Personen max.</span>
                <span className="flex items-center gap-2">📐 {room.size} m²</span>
              </div>
            </div>

            <div className="prose prose-lg prose-p:text-espresso/80 max-w-none mb-12">
              <h2 className="font-serif text-2xl text-espresso mb-4">Über dieses Zimmer</h2>
              <p>{room.description}</p>
            </div>

            <div className="mb-12">
              <h2 className="font-serif text-2xl text-espresso mb-6">Ausstattung</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.amenities.map((amenity, i) => (
                  <li key={i} className="flex items-center gap-3 text-espresso/80">
                    <span className="text-villa-blue">✓</span> {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar / Booking Widget */}
          <div className="w-full lg:w-96">
            <BookingWidget roomId={room.id} roomName={room.name} price={room.price} />
          </div>

        </div>
      </div>
    </div>
  );
}
