import PageHero from '@/components/ui/PageHero';
import RoomGrid from '@/components/booking/RoomGrid';

export default function RoomsPage() {
  const rooms = [
    { id: '1', slug: 'salon-bordeaux', name: 'Top 04 - Salon Bordeaux', category: 'Comfort', price: 180, capacity: 2, size: 24, image: '/images/rooms/top-04.jpg' },
    { id: '2', slug: 'belle-epoque', name: 'Top 10 - Belle Époque', category: 'Deluxe', price: 280, capacity: 2, size: 38, image: '/images/rooms/top-10.jpg' },
    { id: '3', slug: 'villa-suite', name: 'Top 12 - Villa Suite', category: 'Suite', price: 380, capacity: 4, size: 65, image: '/images/rooms/top-12.jpg' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10">
      <PageHero 
        title="Apartments" 
        subtitle="STAY • RELAX • ENJOY" 
        image="/images/home/stay.jpg" 
      />
      
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <RoomGrid initialRooms={rooms} />
        </div>
      </section>
    </div>
  );
}
