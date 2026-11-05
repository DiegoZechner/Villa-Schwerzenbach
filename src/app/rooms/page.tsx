import PageHero from '@/components/ui/PageHero';
import RoomGrid from '@/components/booking/RoomGrid';
import { allRooms } from '@/data/rooms';

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10">
      <PageHero 
        title="Apartments" 
        subtitle="STAY • RELAX • ENJOY" 
        image="/images/home/stay.jpg" 
      />
      
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <RoomGrid initialRooms={allRooms} />
        </div>
      </section>
    </div>
  );
}
