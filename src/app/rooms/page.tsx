import PageHero from '@/components/ui/PageHero';
import RoomGrid from '@/components/booking/RoomGrid';
import { allRooms } from '@/data/rooms';

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <PageHero 
        title="Apartments" 
        subtitle="A home full of life" 
        image="/images/home/stay.jpg"
        brand="villa"
      />
      
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="bg-cream px-6 md:px-14 pb-24 shadow-2xl border border-cream-light">
            <RoomGrid initialRooms={allRooms} />
          </div>
        </div>
      </section>
    </div>
  );
}
