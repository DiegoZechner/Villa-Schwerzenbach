import { SectionHeading } from '@/components/ui/SectionHeading';
import RoomGrid from '@/components/booking/RoomGrid';

export default function RoomsPage() {
  // Mock data for MVP
  const rooms = [
    { id: '1', slug: 'classic-1', name: 'Classic Room', category: 'Classic', price: 150, capacity: 2, size: 22, image: '/images/hero/hero-1.jpg' },
    { id: '2', slug: 'comfort-1', name: 'Comfort Room', category: 'Comfort', price: 180, capacity: 2, size: 26, image: '/images/gallery/gallery-1.jpg' },
    { id: '3', slug: 'superior-1', name: 'Superior Room', category: 'Superior', price: 220, capacity: 2, size: 32, image: '/images/hero/hero-1.jpg' },
    { id: '4', slug: 'deluxe-1', name: 'Deluxe Room', category: 'Deluxe', price: 280, capacity: 3, size: 40, image: '/images/gallery/gallery-1.jpg' },
    { id: '5', slug: 'suite-1', name: 'Villa Suite', category: 'Suite', price: 350, capacity: 4, size: 55, image: '/images/hero/hero-1.jpg' },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title="Unsere Zimmer" 
          subtitle="Ein Zuhause auf Zeit" 
        />
        <RoomGrid initialRooms={rooms} />
      </div>
    </div>
  );
}
