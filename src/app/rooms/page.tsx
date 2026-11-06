import RoomGrid from '@/components/booking/RoomGrid';
import { allRooms } from '@/data/rooms';

export default function RoomsPage() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      <RoomGrid initialRooms={allRooms} />
    </div>
  );
}
