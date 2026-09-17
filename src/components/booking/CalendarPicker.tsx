'use client';
import { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { Button } from '@/components/ui/Button';

// Mock implementation without react-day-picker for now to avoid dependency issues during scaffolding
export default function CalendarPicker({ 
  onDatesSelected 
}: { 
  onDatesSelected: (checkIn: Date | null, checkOut: Date | null) => void 
}) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  // Simple mock simulation for UI
  const handleMockSelect = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    setCheckIn(today);
    setCheckOut(tomorrow);
    onDatesSelected(today, tomorrow);
  };

  return (
    <div className="border border-cream rounded-sm p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-xs text-espresso/60 uppercase font-medium">Check-in</p>
          <p className="text-sm font-medium">{checkIn ? format(checkIn, 'dd.MM.yyyy') : 'Datum wählen'}</p>
        </div>
        <div className="w-px h-8 bg-cream mx-2"></div>
        <div className="text-right">
          <p className="text-xs text-espresso/60 uppercase font-medium">Check-out</p>
          <p className="text-sm font-medium">{checkOut ? format(checkOut, 'dd.MM.yyyy') : 'Datum wählen'}</p>
        </div>
      </div>
      
      {/* MOCK CALENDAR UI */}
      <div className="bg-cream-light p-4 rounded-sm text-center mb-4 text-sm text-espresso">
        [Kalender-Komponente Platzhalter]
        <br/>
        <button onClick={handleMockSelect} className="mt-2 text-villa-blue underline">Test-Daten wählen</button>
      </div>

    </div>
  );
}
