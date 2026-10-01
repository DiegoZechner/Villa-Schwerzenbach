'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CalendarPicker from './CalendarPicker';
import { Button } from '@/components/ui/Button';

export default function BookingWidget({ roomId, roomName, price }: { roomId: string, roomName: string, price: number }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  const handleDatesSelected = (inDate: Date | null, outDate: Date | null) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
  };

  const calculateTotal = () => {
    // Simple mock calculation
    if (!checkIn || !checkOut) return price;
    return price * 1; // Assuming 1 night for mock
  };

  const handleBook = () => {
    if (!checkIn || !checkOut) {
      alert('Bitte wählen Sie Ihre Reisedaten aus.');
      return;
    }
    const params = new URLSearchParams({
      roomId,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: guests.toString()
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white border-b border-espresso/10 shadow-sm sticky top-0 lg:top-[70px] z-[60] py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
      
      {/* Price Info */}
      <div className="flex items-baseline gap-2 shrink-0">
        <span className="font-serif text-2xl text-espresso">CHF {price}</span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-espresso/50">/ Night</span>
      </div>

      {/* Date & Guest Selectors (The "Filter") */}
      <div className="flex-1 flex flex-col md:flex-row w-full md:w-auto gap-4 md:gap-8 items-center max-w-2xl">
        <div className="w-full flex-1">
          <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-espresso/50 mb-1">Check-in</label>
          <input 
            type="date" 
            onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
            className="w-full bg-transparent border-b border-espresso/20 pb-1 font-sans text-sm focus:outline-none focus:border-bordeaux transition-colors text-espresso" 
          />
        </div>
        <div className="w-full flex-1">
          <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-espresso/50 mb-1">Check-out</label>
          <input 
            type="date" 
            onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
            className="w-full bg-transparent border-b border-espresso/20 pb-1 font-sans text-sm focus:outline-none focus:border-bordeaux transition-colors text-espresso" 
          />
        </div>
        <div className="w-full flex-[0.7]">
          <label className="block font-mono text-[9px] tracking-[0.2em] uppercase text-espresso/50 mb-1">Guests</label>
          <select 
            value={guests} 
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent border-b border-espresso/20 pb-1 font-sans text-sm focus:outline-none focus:border-bordeaux transition-colors text-espresso cursor-pointer"
          >
            {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Book Button */}
      <button onClick={handleBook} className="w-full md:w-auto bg-bordeaux text-cream font-mono text-[10px] tracking-[0.25em] uppercase px-12 py-4 hover:bg-espresso transition-colors shrink-0">
        Book Now
      </button>

    </div>
  );
}
