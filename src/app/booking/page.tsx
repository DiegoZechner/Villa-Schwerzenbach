'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { format, differenceInDays } from 'date-fns';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roomId = searchParams.get('roomId');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  // For MVP, calculate mock total if data is missing, just to show UI
  const pricePerNight = 220; // Mock price
  let nights = 1;
  if (checkIn && checkOut) {
    try {
      nights = differenceInDays(new Date(checkOut), new Date(checkIn)) || 1;
    } catch(e) {}
  }
  const total = nights * pricePerNight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call and redirect
    setTimeout(() => {
      router.push('/booking/confirmation');
    }, 1500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 mt-12">
      {/* Form */}
      <div className="flex-1 bg-white p-8 rounded-lg shadow-sm border border-cream">
        <h3 className="font-serif text-2xl text-espresso mb-6">Gastinformationen</h3>
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
              className="w-full px-4 py-3 border border-cream rounded-sm focus:outline-none focus:ring-2 focus:ring-bordeaux focus:border-transparent bg-white h-32"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-cream">
            <Button type="submit" size="lg" className="w-full text-lg" disabled={isSubmitting}>
              {isSubmitting ? 'Verarbeite...' : 'Weiter zur Zahlung'}
            </Button>
            <p className="text-center text-xs text-espresso/60 mt-4">
              Mit Klick auf "Weiter zur Zahlung" akzeptieren Sie unsere AGB.
            </p>
          </div>
        </form>
      </div>

      {/* Summary Sidebar */}
      <div className="w-full lg:w-96">
        <div className="bg-cream-light p-6 rounded-lg sticky top-24">
          <h3 className="font-serif text-xl text-bordeaux mb-4 border-b border-cream/50 pb-4">Zusammenfassung</h3>
          
          <div className="space-y-4 mb-6 text-espresso/80">
            <div>
              <span className="block text-xs uppercase text-espresso/60 font-medium">Zimmer</span>
              <span className="font-medium">Superior Room</span>
            </div>
            
            <div className="flex justify-between">
              <div>
                <span className="block text-xs uppercase text-espresso/60 font-medium">Check-in</span>
                <span>{checkIn ? format(new Date(checkIn), 'dd.MM.yyyy') : 'Nicht gewählt'}</span>
              </div>
              <div className="text-right">
                <span className="block text-xs uppercase text-espresso/60 font-medium">Check-out</span>
                <span>{checkOut ? format(new Date(checkOut), 'dd.MM.yyyy') : 'Nicht gewählt'}</span>
              </div>
            </div>

            <div>
              <span className="block text-xs uppercase text-espresso/60 font-medium">Gäste & Nächte</span>
              <span>{guests || 1} {Number(guests) === 1 ? 'Gast' : 'Gäste'}, {nights} {nights === 1 ? 'Nacht' : 'Nächte'}</span>
            </div>
          </div>

          <div className="border-t border-cream pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-espresso/70">Zimmerpreis pro Nacht</span>
              <span>CHF {pricePerNight}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-cream">
              <span className="font-serif text-xl text-espresso">Total</span>
              <span className="font-bold text-2xl text-bordeaux">CHF {total}</span>
            </div>
            <p className="text-right text-xs text-espresso/50 mt-1">inkl. MwSt. & Kurtaxe</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <SectionHeading title="Ihre Buchung" subtitle="Fast geschafft" />
        <Suspense fallback={<div className="mt-12 text-center text-espresso">Lade Buchungsdaten...</div>}>
          <BookingContent />
        </Suspense>
      </div>
    </div>
  );
}
