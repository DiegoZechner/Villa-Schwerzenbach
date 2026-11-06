'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import EventInquiry from '@/components/events/EventInquiry';

const upcomingEvents = [
  {
    id: 'sunset-apero',
    date: '14. JUNI 2026',
    time: '18:00 – 23:00 UHR',
    title: 'MIVA Sunset Apéro & Vinyl Session',
    price: 'CHF 45',
    spots: 'Noch 12 Plätze frei',
    img: '/images/events/Screenshot 2026-10-01 154830.png',
    desc: 'Signature Drinks im Garten der Villa Schwerzenbach, begleitet von kuratierten Vinyl-Sets und sommerlichen Tapas.',
  },
  {
    id: 'Long-Table-Dinner',
    date: '04. JULI 2026',
    time: '19:30 – 23:30 UHR',
    title: 'Secret Garden Long Table Dinner',
    price: 'CHF 120',
    spots: 'Limitiert auf 30 Gäste',
    img: '/images/events/Screenshot 2026-10-01 154804.png',
    desc: 'Ein kulinarischer Abend an einer langen Tafel unter freiem Himmel – 4-Gänge-Menü, erlesene Weine und inspirierende Gespräche.',
  },
  {
    id: 'creative-salon',
    date: '22. AUGUST 2026',
    time: '16:00 – 22:00 UHR',
    title: 'MIVA Art & Sound Salon',
    price: 'CHF 35',
    spots: 'Tickets verfügbar',
    img: '/images/events/Screenshot 2026-10-01 154836.png',
    desc: 'Zeitgenössische Kunstinstallationen treffen auf Live-Akustik und exklusive Drinks in den historischen Räumen der Villa.',
  },
];

const sloganLines = [
  'Wir schaffen',
  'lebendige Räume und',
  'unvergessliche Momente,',
  'die Menschen verbinden',
  'und lange bleiben.',
];

export default function EventsPage() {
  // Hero animation stage: 0 = initial hidden, 1 = rise from bottom to center, 2 = split left/right, 3 = move to top-left & bottom-right corners (scroll unlocked)
  const [heroStage, setHeroStage] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [bookingModalEvent, setBookingModalEvent] = useState<(typeof upcomingEvents)[0] | null>(null);
  const [ticketCount, setTicketCount] = useState<number>(2);

  const sloganSectionRef = useRef<HTMLDivElement>(null);

  // Lock page scrolling until hero animation reaches stage 3
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setHeroStage(1), 150);
    const t2 = setTimeout(() => setHeroStage(2), 1200);
    const t3 = setTimeout(() => {
      setHeroStage(3);
      document.body.style.overflow = '';
    }, 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sloganSectionRef.current) return;
      const rect = sloganSectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH * 0.82;
      const end = windowH * 0.2;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalWords = sloganLines.reduce((acc, line) => acc + line.split(' ').length, 0);
  let globalWordCounter = 0;

  // Compute transform styles for "EVENTS" and "& EXPERIENCES"
  const getEventsTransform = () => {
    if (heroStage === 0) return 'translate(0px, 120px)';
    if (heroStage === 1) return 'translate(0px, 0px)';
    if (heroStage === 2) return 'translate(-26vw, 0px)';
    return 'translate(-26vw, -24vh)';
  };

  const getExperiencesTransform = () => {
    if (heroStage === 0) return 'translate(0px, 120px)';
    if (heroStage === 1) return 'translate(0px, 0px)';
    if (heroStage === 2) return 'translate(22vw, 0px)';
    return 'translate(22vw, 24vh)';
  };

  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      
      {/* 1. Choreographed Dark Intro Hero (Scroll is locked until animation completes) */}
      <section className="relative h-screen w-full bg-[#160108] overflow-hidden flex items-center justify-center select-none">
        {/* Subtle ambient glow */}
        <div
          className={`absolute w-[420px] h-[420px] rounded-full bg-miva-purple/50 blur-[120px] transition-opacity duration-1000 ${
            heroStage >= 2 ? 'opacity-100' : 'opacity-30'
          }`}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
          {/* EVENTS (moves up -> left -> top-left) */}
          <div
            style={{
              transform: getEventsTransform(),
              opacity: heroStage === 0 ? 0 : 1,
              transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out',
            }}
            className="font-miva-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider uppercase"
          >
            Events
          </div>

          {/* & EXPERIENCES (moves up -> right -> bottom-right) */}
          <div
            style={{
              transform: getExperiencesTransform(),
              opacity: heroStage === 0 ? 0 : 1,
              transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out',
            }}
            className="font-miva-display italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-miva-lilac tracking-wide mt-2"
          >
            &amp; Experiences
          </div>

          {/* Center Subtitle & Scroll Cue appearing after split */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 px-6 text-center ${
              heroStage === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-white/70 mb-6">
              VILLA SCHWERZENBACH BY MIVA.
            </p>
            <div className="flex flex-col items-center gap-3 text-miva-lilac/80">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
              <div className="w-px h-12 bg-gradient-to-b from-miva-lilac to-transparent animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Compact Staggered Slogan Widget (Each line shifted progressively to the right) */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div
          ref={sloganSectionRef}
          className="container mx-auto max-w-3xl bg-[#160108] px-8 sm:px-14 md:px-20 py-14 md:py-20 rounded-3xl shadow-2xl border border-miva-lilac/15"
        >
          <div className="flex flex-col gap-1.5 sm:gap-2 font-sans font-light text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug">
            {sloganLines.map((line, lineIdx) => {
              const lineWords = line.split(' ');
              return (
                <div
                  key={lineIdx}
                  style={{ paddingLeft: `${lineIdx * 11}%` }}
                  className="flex flex-wrap gap-x-2.5"
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

      {/* 3. Main MIVA Content: Upcoming Events + Event Inquiry */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-20">
          
          {/* UPCOMING EVENTS (Future Events to View & Book) */}
          <div className="bg-miva-gray p-8 md:p-14 rounded-3xl shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="font-sans font-semibold text-[10px] tracking-[0.3em] uppercase text-miva-red mb-3">
                UPCOMING EVENTS
              </p>
              <h2 className="font-miva-display text-3xl md:text-5xl text-miva-purple mb-4">
                Kommende <span className="italic text-miva-red">Events</span> in der Villa
              </h2>
              <p className="font-sans text-sm md:text-base text-miva-purple/75">
                Erleben Sie besondere Abende, Konzerte, Apéros und kulinarische Highlights direkt bei uns im Haus. Sichern Sie sich jetzt Ihre Plätze.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-miva-purple/10 flex flex-col justify-between transition-transform duration-500 hover:-translate-y-1"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image src={ev.img} alt={ev.title} fill className="object-cover" />
                      <div className="absolute top-4 left-4 bg-miva-purple/90 backdrop-blur-sm text-miva-lilac font-sans font-semibold text-[10px] tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full">
                        {ev.date}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-2">
                        {ev.time} • {ev.spots}
                      </div>
                      <h3 className="font-miva-display text-2xl text-miva-purple mb-3">
                        {ev.title}
                      </h3>
                      <p className="font-sans text-xs text-miva-purple/75 leading-relaxed mb-6">
                        {ev.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-miva-purple/10 flex items-center justify-between">
                    <div>
                      <span className="block font-sans text-[9px] tracking-widest uppercase text-miva-purple/50">Ticket</span>
                      <span className="font-miva-display text-lg text-miva-purple font-semibold">{ev.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBookingModalEvent(ev);
                        setTicketCount(2);
                      }}
                      className="bg-miva-red text-white font-sans font-semibold text-[10px] tracking-[0.2em] uppercase px-6 py-3 rounded-full hover:bg-miva-purple transition-colors cursor-pointer"
                    >
                      Platz Buchen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EVENT REQUESTS (Private / Corporate Event Inquiry) */}
          <div className="bg-miva-gray p-8 md:p-14 rounded-3xl shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="font-sans font-semibold text-[10px] tracking-[0.3em] uppercase text-miva-red mb-3">
                PRIVATE &amp; CORPORATE EVENTS
              </p>
              <h2 className="font-miva-display text-3xl md:text-5xl text-miva-purple mb-4">
                Ihr eigenes Event <span className="italic text-miva-red">anfragen</span>
              </h2>
              <p className="font-sans text-sm md:text-base text-miva-purple/75">
                Sie möchten die Villa Schwerzenbach für Ihre Hochzeit, Firmenfeier, ein Seminar oder eine eigene Idee mieten? Wählen Sie eine Kategorie und senden Sie uns Ihre Anfrage.
              </p>
            </div>

            <EventInquiry />
          </div>

        </div>
      </section>

      {/* Ticket Booking Modal for Upcoming Events */}
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
            <h3 className="font-miva-display text-2xl md:text-3xl mb-6">
              {bookingModalEvent.title}
            </h3>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-1.5">
                    Anzahl Plätze
                  </label>
                  <select
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                    className="w-full border-b border-miva-purple/25 py-2 text-sm focus:outline-none focus:border-miva-red cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Person' : 'Personen'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-miva-purple/60 mb-1.5">
                    Preis pro Ticket
                  </label>
                  <div className="py-2 text-sm font-semibold">{bookingModalEvent.price}</div>
                </div>
              </div>

              <div className="pt-4">
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
