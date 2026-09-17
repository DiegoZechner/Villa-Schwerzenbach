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
    <div className="bg-white p-6 rounded-lg shadow-md border border-cream sticky top-24">
      <h3 className="font-serif text-2xl text-bordeaux mb-2">Buchen</h3>
      <div className="flex items-end gap-2 mb-6">
        <span className="text-3xl font-bold text-espresso">CHF {price}</span>
        <span className="text-espresso/60 mb-1">/ Nacht</span>
      </div>

      <div className="space-y-4 mb-6">
        <CalendarPicker onDatesSelected={handleDatesSelected} />
        
        <div>
          <label className="block text-xs text-espresso/60 uppercase font-medium mb-1">Gäste</label>
          <select 
            value={guests} 
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full p-3 border border-cream rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-bordeaux"
          >
            {[1, 2, 3, 4].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? 'Gast' : 'Gäste'}</option>
            ))}
          </select>
        </div>
      </div>

      {checkIn && checkOut && (
        <div className="flex justify-between items-center mb-6 pt-4 border-t border-cream">
          <span className="font-medium text-espresso">Total</span>
          <span className="font-bold text-lg text-bordeaux">CHF {calculateTotal()}</span>
        </div>
      )}

      <Button onClick={handleBook} className="w-full py-4 text-lg">
        Jetzt buchen
      </Button>
      <p className="text-center text-xs text-espresso/50 mt-4">
        Sie werden zur sicheren Zahlung weitergeleitet.
      </p>
    </div>
  );
}
