'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';
import CustomDatePicker from '@/components/ui/CustomDatePicker';
import CustomDropdown from '@/components/ui/CustomDropdown';

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
  const [guests, setGuests] = useState<string>('1');

  const nights =
    checkIn && checkOut
      ? Math.max(0, differenceInDays(new Date(checkOut), new Date(checkIn)))
      : 0;

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (checkOut && val && val >= checkOut) {
      setCheckOut('');
    }
  };

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
      guests,
    });
    router.push(`/booking?${params.toString()}`);
  };

  const guestOptions = Array.from({ length: Math.max(2, maxGuests) }, (_, i) => {
    const count = i + 1;
    return {
      value: String(count),
      label: `${count} ${count === 1 ? 'Guest' : 'Guests'}`,
    };
  });

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

      {/* Custom Check-in Calendar, Check-out Calendar & Custom Guests Dropdown */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <CustomDatePicker
          label="Check-In"
          value={checkIn}
          onChange={handleCheckInChange}
          rangeStart={checkIn}
          rangeEnd={checkOut}
          placeholder="Datum wählen"
          variant="villa"
        />

        <CustomDatePicker
          label="Check-Out"
          value={checkOut}
          onChange={setCheckOut}
          minDate={checkIn || undefined}
          rangeStart={checkIn}
          rangeEnd={checkOut}
          placeholder="Datum wählen"
          variant="villa"
        />

        <CustomDropdown
          label="Guests"
          value={guests}
          onChange={setGuests}
          options={guestOptions}
          variant="villa"
        />
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
