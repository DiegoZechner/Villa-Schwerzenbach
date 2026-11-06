'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { format, differenceInDays } from 'date-fns';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { allRooms } from '@/data/rooms';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roomId = searchParams.get('roomId');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  const selectedRoom = allRooms.find(r => r.slug === roomId || r.id === roomId) || allRooms[0];
  const pricePerNight = selectedRoom.price;
  let nights = 1;
  if (checkIn && checkOut) {
    try {
      nights = differenceInDays(new Date(checkOut), new Date(checkIn)) || 1;
    } catch {}
  }
  const total = nights * pricePerNight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/booking/confirmation');
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 mt-10">
      {/* Form */}
      <div className="flex-1 bg-cream-light p-8 shadow-sm border border-espresso/15">
        <h3 className="font-villa-editorial text-2xl text-espresso uppercase tracking-[0.15em] mb-6">Gastinformationen</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Vorname" required />
            <Input label="Nachname" required />
          </div>
          <Input label="E-Mail Adresse" type="email" required />
          <Input label="Telefonnummer" type="tel" required />
          
          <div>
            <label className="block text-sm font-medium text-espresso mb-1">Besondere Wünsche (Optional)</label>
            <textarea 
              className="w-full px-4 py-3 border border-espresso/20 focus:outline-none focus:ring-2 focus:ring-bordeaux focus:border-transparent bg-white h-32"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-espresso/15">
            <Button type="submit" size="lg" className="w-full text-sm tracking-[0.2em] uppercase" disabled={isSubmitting}>
              {isSubmitting ? 'Verarbeite...' : 'Weiter zur Zahlung'}
            </Button>
            <p className="text-center text-xs text-espresso/60 mt-4">
              Mit Klick auf &quot;Weiter zur Zahlung&quot; akzeptieren Sie unsere AGB.
            </p>
          </div>
        </form>
      </div>

      {/* Summary Sidebar */}
      <div className="w-full lg:w-96">
        <div className="bg-cream-light p-8 border border-espresso/15 sticky top-24">
          <h3 className="font-villa-editorial text-xl text-bordeaux uppercase tracking-[0.15em] mb-4 border-b border-espresso/15 pb-4">Zusammenfassung</h3>
          
          <div className="space-y-4 mb-6 text-espresso/85 text-sm">
            <div>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-espresso/60 font-semibold mb-1">Apartment</span>
              <span className="font-semibold text-base">{selectedRoom.name}</span>
              <span className="block text-xs text-villa-blue">{selectedRoom.type} • {selectedRoom.floor} • {selectedRoom.size.toString().replace('.', ',')} m²</span>
            </div>
            
            <div className="flex justify-between pt-2">
              <div>
                <span className="block text-[10px] tracking-[0.2em] uppercase text-espresso/60 font-semibold">Check-in</span>
                <span>{checkIn ? format(new Date(checkIn), 'dd.MM.yyyy') : 'Nicht gewählt'}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] tracking-[0.2em] uppercase text-espresso/60 font-semibold">Check-out</span>
                <span>{checkOut ? format(new Date(checkOut), 'dd.MM.yyyy') : 'Nicht gewählt'}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-espresso/60 font-semibold">Gäste &amp; Nächte</span>
              <span>{guests || 1} {Number(guests) === 1 ? 'Gast' : 'Gäste'}, {nights} {nights === 1 ? 'Nacht' : 'Nächte'}</span>
            </div>
          </div>

          <div className="border-t border-espresso/15 pt-4 text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-espresso/70">Apartmentpreis / Nacht</span>
              <span>CHF {pricePerNight}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-espresso/15">
              <span className="font-villa-editorial text-xl text-espresso uppercase">Total</span>
              <span className="font-bold text-2xl text-bordeaux">CHF {total}</span>
            </div>
            <p className="text-right text-xs text-espresso/50 mt-1">inkl. MwSt. &amp; Kurtaxe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-36 pb-24 min-h-screen font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-cream p-8 md:p-14 shadow-2xl border border-cream-light">
          <div className="text-center mb-8">
            <span className="font-script text-3xl text-villa-red block mb-1">Fast geschafft</span>
            <h1 className="font-villa-editorial text-4xl md:text-5xl text-espresso uppercase tracking-[0.18em]">Ihre Buchung</h1>
          </div>
          <Suspense fallback={<div className="mt-12 text-center text-espresso">Lade Buchungsdaten...</div>}>
            <BookingContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
