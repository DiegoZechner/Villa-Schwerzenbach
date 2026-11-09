'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';

export default function BookingWidget({
  roomId,
  roomName,
  price,
  maxGuests = 4,
}: {
  roomId: string;
  roomName: string;
  price: number;
  maxGuests?: number;
}) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);

  const nights =
    checkIn && checkOut
      ? Math.max(0, differenceInDays(new Date(checkOut), new Date(checkIn)))
      : 0;

  const handleBook = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert('Bitte wählen Sie ein gültiges Check-in und Check-out Datum aus.');
      return;
    }
    const params = new URLSearchParams({
      roomId,
      roomName,
      checkIn: new Date(checkIn).toISOString(),
      checkOut: new Date(checkOut).toISOString(),
      guests: guests.toString(),
    });
    router.push(`/booking?${params.toString()}`);
  };

  const guestOptions = Array.from({ length: Math.max(2, maxGuests) }, (_, i) => i + 1);

  return (
    <div className="w-full bg-[#111316] border border-white/15 p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 shadow-2xl">
      {/* Price & Total Info */}
      <div className="flex flex-col justify-center shrink-0 pr-4 lg:border-r border-white/15">
        <div className="flex items-baseline gap-2">
          <span className="font-villa-editorial text-3xl sm:text-4xl text-cream tracking-wider">
            CHF {price}
          </span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-cream/60">
            / Night
          </span>
        </div>
        {nights > 0 && (
          <span className="font-sans text-xs tracking-wider text-cream/80 mt-1">
            {nights} {nights === 1 ? 'Nacht' : 'Nächte'} • Gesamt:{' '}
            <strong className="text-white">CHF {nights * price}</strong>
          </span>
        )}
      </div>

      {/* Check-in, Check-out & Guests */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div>
          <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-cream/60 mb-2">
            Check-In
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-transparent border-b border-white/25 pb-2 font-sans text-sm text-white focus:outline-none focus:border-cream transition-colors cursor-pointer [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-cream/60 mb-2">
            Check-Out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || undefined}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-transparent border-b border-white/25 pb-2 font-sans text-sm text-white focus:outline-none focus:border-cream transition-colors cursor-pointer [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="block font-sans text-[10px] tracking-[0.25em] uppercase text-cream/60 mb-2">
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-[#111316] border-b border-white/25 pb-2 font-sans text-sm text-white focus:outline-none focus:border-cream transition-colors cursor-pointer"
          >
            {guestOptions.map((n) => (
              <option key={n} value={n} className="bg-[#111316] text-white">
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Book Now Button */}
      <button
        type="button"
        onClick={handleBook}
        className="w-full lg:w-auto bg-cream text-[#090a0c] hover:bg-white font-sans font-semibold text-xs tracking-[0.25em] uppercase px-10 py-4 transition-colors shrink-0 cursor-pointer"
      >
        Book Now
      </button>
    </div>
  );
}
