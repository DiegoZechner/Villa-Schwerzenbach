import RoomGrid from '@/components/booking/RoomGrid';
import { allRooms } from '@/data/rooms';

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      
      {/* Red Header Banner (No Hero Image) */}
      <div className="w-full bg-bordeaux pt-36 pb-20 px-6 md:px-12 border-b-[3px] border-cream">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-cream/80 mb-3">
            STAY • RELAX • ENJOY
          </p>
          <h1 className="font-villa-editorial text-4xl md:text-6xl text-white uppercase tracking-[0.2em]">
            Apartments
          </h1>
        </div>
      </div>
      
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="bg-cream px-6 md:px-14 pb-24 pt-10 shadow-2xl border border-cream-light">
            <RoomGrid initialRooms={allRooms} />
          </div>
        </div>
      </section>
    </div>
  );
}
