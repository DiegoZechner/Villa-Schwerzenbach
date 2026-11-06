'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import EventInquiry from '@/components/events/EventInquiry';
import ChoreographedHero from '@/components/ui/ChoreographedHero';

const upcomingEvents = [
  {
    id: 'sunset-apero',
    date: '14. JUNI 2026',
    shortDate: '14. JUN',
    time: '18:00 – 23:00 UHR',
    title: 'MIVA Sunset Apéro & Vinyl',
    price: 'CHF 45',
    spots: 'Noch 12 Plätze frei',
    img: '/images/events/Screenshot 2026-10-01 154830.png',
    desc: 'Signature Drinks, Vinyl-Sets & Tapas im Garten.',
  },
  {
    id: 'Long-Table-Dinner',
    date: '04. JULI 2026',
    shortDate: '04. JUL',
    time: '19:30 – 23:30 UHR',
    title: 'Secret Garden Dinner',
    price: 'CHF 120',
    spots: 'Limitiert auf 30 Gäste',
    img: '/images/events/Screenshot 2026-10-01 154804.png',
    desc: '4-Gänge-Menü & Weine an der langen Tafel im Freien.',
  },
  {
    id: 'creative-salon',
    date: '22. AUGUST 2026',
    shortDate: '22. AUG',
    time: '16:00 – 22:00 UHR',
    title: 'MIVA Art & Sound Salon',
    price: 'CHF 35',
    spots: 'Tickets verfügbar',
    img: '/images/events/Screenshot 2026-10-01 154836.png',
    desc: 'Kunstinstallationen, Live-Akustik & exklusive Drinks.',
  },
];

const sloganLines = [
  'Ein Ort',
  'für Musik, Genuss und',
  'echte Momente, an dem',
  'wir feiern, lachen',
  'und frei sind.',
];

export default function EventsPage() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [timelineProgress, setTimelineProgress] = useState<number>(0);
  const [bookingModalEvent, setBookingModalEvent] = useState<(typeof upcomingEvents)[0] | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(2);

  const sloganTrackRef = useRef<HTMLDivElement>(null);
  const upcomingTrackRef = useRef<HTMLDivElement>(null);
  const upcomingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const windowH = window.innerHeight;

      if (sloganTrackRef.current) {
        const rect = sloganTrackRef.current.getBoundingClientRect();
        // Slower reading across the slogan track
        const start = windowH * 0.88;
        const end = -windowH * 0.45;
        const raw = (start - rect.top) / (start - end);
        setScrollProgress(Math.max(0, Math.min(1, raw)));
      }

      if (upcomingTrackRef.current && upcomingCardsRef.current) {
        const trackRect = upcomingTrackRef.current.getBoundingClientRect();
        const cardsRect = upcomingCardsRef.current.getBoundingClientRect();

        // Timeline scroll only starts once the upcoming event cards are completely visible in the viewport
        const totalPinnedScroll = trackRect.height - windowH;
        if (totalPinnedScroll > 0 && trackRect.top <= 24) {
          const scrolledInTrack = Math.max(0, 24 - trackRect.top);
          const raw = scrolledInTrack / totalPinnedScroll;
          setTimelineProgress(Math.max(0, Math.min(1, raw)));
        } else if (totalPinnedScroll <= 0 && cardsRect.bottom <= windowH) {
          const start = windowH - cardsRect.height;
          const end = 24;
          const raw = (start - cardsRect.top) / Math.max(1, start - end);
          setTimelineProgress(Math.max(0, Math.min(1, raw)));
        } else {
          setTimelineProgress(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalWords = sloganLines.reduce((acc, line) => acc + line.split(' ').length, 0);
  let globalWordCounter = 0;

  // Virtual timeline coordinate from 0.8 to 3.2:
  // Point 1 = 1.0, Point 2 = 2.0, Point 3 = 3.0, invisible 4th end-point = 3.2
  const timelineStep = 0.8 + timelineProgress * 2.4;
  const activeEventIdx =
    timelineStep < 1.0
      ? -1
      : timelineStep < 2.0
        ? 0
        : timelineStep < 3.0
          ? 1
          : 2;
  // Fill bar goes from 0% (at Point 1 = 1.0) to 100% (at Point 3 = 3.0), and holds at 100% until 3.2
  const timelineFillPercent = Math.min(100, Math.max(0, ((timelineStep - 1.0) / 2.0) * 100));

  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      
      {/* 1. Choreographed Dark Intro Hero */}
      <ChoreographedHero
        primaryText="Events"
        secondaryText="& Experiences"
        subtitle="VILLA SCHWERZENBACH BY MIVA."
      />

      {/* 2. 95% Width, Compact-Height Staggered Slogan Widget with Shorter Words & Slower Scroll Reading */}
      <section ref={sloganTrackRef} className="relative md:h-[95vh] pt-4 pb-8">
        <div className="md:sticky md:top-24 w-[95%] mx-auto bg-[#160108] px-6 sm:px-12 md:px-16 py-5 md:py-7 rounded-3xl shadow-2xl border border-miva-lilac/15">
          <div className="flex flex-col gap-0.5 sm:gap-1 font-sans font-light text-2xl sm:text-4xl md:text-5xl tracking-tight leading-[1.06]">
            {sloganLines.map((line, lineIdx) => {
              const lineWords = line.split(' ');
              return (
                <div
                  key={lineIdx}
                  style={{ paddingLeft: `${lineIdx * 11}%` }}
                  className="flex flex-wrap gap-x-2.5 sm:gap-x-3.5"
                >
                  {lineWords.map((word, wIdx) => {
                    const currentWordIndex = globalWordCounter++;
                    const wordThreshold = currentWordIndex / totalWords;
                    const isLit = scrollProgress > wordThreshold;
                    return (
                      <span
                        key={wIdx}
                        className={`transition-colors duration-300 ${
                          isLit ? 'text-miva-lilac' : 'text-miva-lilac/25'
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. UPCOMING EVENTS (Same 95% width as Slogan Widget above, starts timeline when cards are completely visible, ends at virtual point 3.2) */}
      <section ref={upcomingTrackRef} className="relative md:h-[165vh] pb-14 md:pb-20">
        <div className="md:sticky md:top-6 w-[95%] mx-auto bg-miva-gray p-5 md:p-7 rounded-3xl shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <p className="font-sans font-semibold text-[10px] tracking-[0.3em] uppercase text-miva-red">
              UPCOMING EVENTS
            </p>
          </div>

          {/* Scroll-Reactive Timeline (Dot - Line - Dot - Line - Dot, with invisible 4th end point at 3.2) */}
          <div className="max-w-3xl mx-auto mb-6 px-4">
            <div className="relative flex items-center justify-between">
              {/* Background Track Line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-miva-purple/15 z-0" />
              {/* Animated Pink/Lilac Fill Line */}
              <div
                style={{ width: `${timelineFillPercent}%` }}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-miva-red to-miva-lilac z-0 transition-all duration-200"
              />

              {upcomingEvents.map((ev, idx) => {
                const isReached = activeEventIdx >= idx;
                const isCurrent = activeEventIdx === idx;
                return (
                  <div key={ev.id} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                        isCurrent
                          ? 'bg-miva-lilac border-miva-purple scale-125 shadow-[0_0_16px_rgba(232,180,244,0.9)]'
                          : isReached
                            ? 'bg-miva-red border-miva-red'
                            : 'bg-white border-miva-purple/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isCurrent ? 'bg-miva-purple' : isReached ? 'bg-white' : 'bg-transparent'
                        }`}
                      />
                    </div>
                    <span
                      className={`mt-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                        isCurrent ? 'text-miva-purple font-bold' : 'text-miva-purple/55 font-medium'
                      }`}
                    >
                      {ev.shortDate}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event Cards (Compact so all 3 cards + buttons fit 100% in viewport when sticky) */}
          <div ref={upcomingCardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {upcomingEvents.map((ev, idx) => {
              const isHighlighted = activeEventIdx === idx;
              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    setBookingModalEvent(ev);
                    setTicketCount(2);
                  }}
                  className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-500 cursor-pointer border-2 ${
                    isHighlighted
                      ? 'bg-[#fae8ff] border-miva-lilac shadow-[0_12px_35px_rgba(232,180,244,0.45)] -translate-y-1.5'
                      : 'bg-white border-miva-purple/10 shadow-md hover:-translate-y-1 hover:border-miva-lilac/60'
                  }`}
                >
                  <div>
                    <div className="relative h-40 md:h-44 w-full overflow-hidden">
                      <Image src={ev.img} alt={ev.title} fill className="object-cover" />
                      <div
                        className={`absolute top-3 left-3 backdrop-blur-sm font-sans font-semibold text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full transition-colors ${
                          isHighlighted
                            ? 'bg-miva-lilac text-miva-purple'
                            : 'bg-miva-purple/90 text-miva-lilac'
                        }`}
                      >
                        {ev.date}
                      </div>
                    </div>

                    <div className="p-4 md:p-5">
                      <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-1.5">
                        {ev.time} • {ev.spots}
                      </div>
                      <h3 className="font-miva-display text-xl md:text-2xl text-miva-purple mb-1.5">
                        {ev.title}
                      </h3>
                      <p className="font-sans text-xs text-miva-purple/75 leading-relaxed">
                        {ev.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 md:px-5 pb-4 pt-3 border-t border-miva-purple/10 flex items-center justify-between">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/70 font-medium">
                      Details &amp; Tickets
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBookingModalEvent(ev);
                        setTicketCount(2);
                      }}
                      className="bg-miva-red text-white font-sans font-semibold text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full hover:bg-miva-purple transition-colors cursor-pointer"
                    >
                      Event Ansehen
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Stationary 3D/Horizontal Scroll Gallery + Event Inquiry Form */}
      <EventInquiry />

      {/* Ticket Booking Modal for Upcoming Events (Price revealed inside modal) */}
      {bookingModalEvent && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-miva-purple rounded-3xl max-w-lg w-full p-8 md:p-10 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setBookingModalEvent(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-miva-gray text-miva-purple flex items-center justify-center hover:bg-miva-red hover:text-white transition-colors cursor-pointer"
              aria-label="Schließen"
            >
              ✕
            </button>

            <span className="font-sans font-semibold text-[10px] tracking-[0.25em] uppercase text-miva-red block mb-2">
              {bookingModalEvent.date} • {bookingModalEvent.time}
            </span>
            <h3 className="font-miva-display text-2xl md:text-3xl mb-3">
              {bookingModalEvent.title}
            </h3>
            <p className="font-sans text-xs text-miva-purple/75 leading-relaxed mb-6">
              {bookingModalEvent.desc}
            </p>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Vielen Dank! Ihre Reservierung für "${bookingModalEvent.title}" (${ticketCount} Tickets) ist eingegangen.`);
                setBookingModalEvent(null);
              }}
            >
              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-1.5">
                  Vor- und Nachname
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ihr Name"
                  className="w-full border-b border-miva-purple/25 py-2 text-sm focus:outline-none focus:border-miva-red"
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-1.5">
                  E-Mail Adresse
                </label>
                <input
                  type="email"
                  required
                  placeholder="ihre.email@beispiel.com"
                  className="w-full border-b border-miva-purple/25 py-2 text-sm focus:outline-none focus:border-miva-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 bg-miva-lilac/20 p-4 rounded-2xl">
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-1">
                    Anzahl Plätze
                  </label>
                  <select
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                    className="w-full bg-transparent border-b border-miva-purple/25 py-1.5 text-sm font-medium focus:outline-none focus:border-miva-red cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Person' : 'Personen'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-1">
                    Ticketpreis
                  </label>
                  <div className="py-1.5 text-base font-bold text-miva-purple">
                    {bookingModalEvent.price} <span className="font-normal text-xs text-miva-purple/60">/ Person</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-miva-red text-white font-sans font-semibold text-xs tracking-[0.22em] uppercase py-4 rounded-full hover:bg-miva-purple transition-colors cursor-pointer"
                >
                  Jetzt Verbindlich Reservieren
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
