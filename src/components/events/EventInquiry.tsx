'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const eventCategories = [
  {
    id: 'hochzeit',
    chapter: '01 / 05',
    subtitle: 'Bregenz • Villa Schwerzenbach',
    title: 'Hochzeiten',
    desc: 'Der schönste Tag in einer unvergesslichen, lebendigen Kulisse – vom Empfang im Garten bis zum Festsaal.',
    img: '/images/events/Screenshot 2026-10-01 154804.png',
    bgImg: '/images/home/celebrate.jpg',
  },
  {
    id: 'apero',
    chapter: '02 / 05',
    subtitle: 'Garden & Lounge • Villa Schwerzenbach',
    title: 'Apéros & Treffen',
    desc: 'Stilvolles Beisammensein, kuratierte Drinks, spontane Begegnungen & gute Gespräche in entspannter Atmosphäre.',
    img: '/images/events/Screenshot 2026-10-01 154830.png',
    bgImg: '/images/home/eat.jpg',
  },
  {
    id: 'firmenparty',
    chapter: '03 / 05',
    subtitle: 'Corporate & Culture • Villa Schwerzenbach',
    title: 'Firmenpartys',
    desc: 'Erfolge feiern und Teams verbinden in einer pulsierenden, exklusiven MIVA-Atmosphäre.',
    img: '/images/events/Screenshot 2026-10-01 154836.png',
    bgImg: '/images/home/lobby.jpg',
  },
  {
    id: 'seminar',
    chapter: '04 / 05',
    subtitle: 'Workshops & Offsites • Villa Schwerzenbach',
    title: 'Meetingräume & Seminare',
    desc: 'Inspirierende Räume mit Charakter für Visionäre, strategische Meetings und kreative Workshops.',
    img: '/images/events/Screenshot 2026-10-01 154744.png',
    bgImg: '/images/home/meet.jpg',
  },
  {
    id: 'andere',
    chapter: '05 / 05',
    subtitle: 'Bespoke Concepts • Villa Schwerzenbach',
    title: 'Individuelle Anfragen',
    desc: 'Sie haben eine ganz eigene Event-Idee? Wir verwandeln die Villa in die Bühne für Ihre persönliche Vision.',
    img: '/images/events/Screenshot 2026-10-01 154804.png',
    bgImg: '/images/home/stay.jpg',
  },
];

export default function EventInquiry() {
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [galleryProgress, setGalleryProgress] = useState<number>(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const raw = scrolled / totalScrollable;
      setGalleryProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalSlides = eventCategories.length;
  // Continuous index from 0 to (totalSlides - 1)
  const floatIndex = galleryProgress * (totalSlides - 1);
  const activeIndex = Math.min(totalSlides - 1, Math.max(0, Math.round(floatIndex)));
  const currentSlide = eventCategories[activeIndex];
  const nextSlide = eventCategories[Math.min(totalSlides - 1, activeIndex + 1)];

  const handleSelectAndScrollToForm = (id: string) => {
    setSelectedEvent(id);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full font-sans">
      
      {/* 1. Stationary Scroll-Pinned Gallery (CL16-inspired depth + split layout) */}
      {/* Tall outer track (450vh) keeps the inner 100vh screen stationary while scrolling through all 5 event types */}
      <div ref={trackRef} className="relative h-[450vh] w-full">
        <div className="sticky top-0 h-screen w-full bg-[#0d0105] overflow-hidden flex flex-col lg:flex-row text-white">
          
          {/* Left Side: Atmospheric Depth Stage with Approaching Thumbnail & Thin Elegant Caption */}
          <div className="relative w-full lg:w-[54%] h-[45%] lg:h-full overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Subtle blurred ambient background */}
            <Image
              src={currentSlide.bgImg}
              alt={currentSlide.title}
              fill
              className="object-cover opacity-25 scale-110 blur-sm transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0105] via-[#0d0105]/50 to-[#0d0105]/80" />

            {/* Top-left Chapter Counter */}
            <div className="absolute top-24 left-6 md:left-12 z-20 flex items-center gap-4">
              <span className="font-sans font-light text-xs tracking-[0.35em] uppercase text-white/70">
                EVENTS GALLERY
              </span>
              <span className="w-8 h-px bg-white/30" />
              <span className="font-sans font-light text-xs tracking-[0.25em] text-miva-lilac">
                {currentSlide.chapter}
              </span>
            </div>

            {/* Center Floating Preview Card (like the center floating photo in the screenshot) */}
            <div className="relative z-20 flex items-center justify-center">
              {/* Background next-slide depth card */}
              {activeIndex < totalSlides - 1 && (
                <div
                  style={{
                    transform: `translate(90px, -20px) scale(0.75)`,
                  }}
                  className="hidden sm:block absolute w-36 h-48 md:w-44 md:h-56 overflow-hidden opacity-35 transition-all duration-500 pointer-events-none"
                >
                  <Image src={nextSlide.img} alt={nextSlide.title} fill className="object-cover" />
                </div>
              )}

              {/* Foreground floating image */}
              <div
                onClick={() => handleSelectAndScrollToForm(currentSlide.id)}
                className="relative w-44 h-56 sm:w-52 sm:h-68 md:w-60 md:h-80 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] cursor-pointer group transition-transform duration-700 hover:scale-105"
              >
                <Image
                  src={currentSlide.img}
                  alt={currentSlide.title}
                  fill
                  className="object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* Bottom Thin Elegant Caption & Progress Bar */}
            <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="font-sans font-extralight text-[11px] tracking-[0.28em] uppercase text-white/60 mb-1">
                  {currentSlide.subtitle}
                </p>
                <p className="font-sans font-light text-sm md:text-base tracking-wider text-white/90">
                  {currentSlide.title} — <span className="text-miva-lilac/80">Weiter scrollen für nächste Kategorie</span>
                </p>
              </div>

              {/* Minimal Progress Line */}
              <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden shrink-0">
                <div
                  style={{ width: `${((activeIndex + 1) / totalSlides) * 100}%` }}
                  className="absolute inset-y-0 left-0 bg-miva-lilac transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Full-Height Featured Event Photo with Thin Elegant Overlay Typography */}
          <div className="relative w-full lg:w-[46%] h-[55%] lg:h-full overflow-hidden group">
            <Image
              src={currentSlide.img}
              alt={currentSlide.title}
              fill
              className="object-cover transition-all duration-700 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

            {/* Top-Right Chapter Indicator */}
            <div className="absolute top-8 lg:top-24 right-6 md:right-12 z-20 flex items-center gap-2">
              {eventCategories.map((cat, idx) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectAndScrollToForm(cat.id)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIndex ? 'w-8 bg-miva-lilac' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={cat.title}
                />
              ))}
            </div>

            {/* Bottom Content Overlay with Thin Elegant Typography */}
            <div className="absolute bottom-10 left-8 right-8 md:left-14 md:right-14 z-20">
              <span className="font-sans font-light text-[10px] tracking-[0.35em] uppercase text-miva-lilac block mb-3">
                EVENT FORMAT {currentSlide.chapter}
              </span>
              <h3 className="font-sans font-extralight text-3xl sm:text-4xl md:text-5xl text-white tracking-wide mb-4">
                {currentSlide.title}
              </h3>
              <p className="font-sans font-light text-xs sm:text-sm text-white/80 leading-relaxed max-w-md mb-8">
                {currentSlide.desc}
              </p>

              <button
                type="button"
                onClick={() => handleSelectAndScrollToForm(currentSlide.id)}
                className="inline-flex items-center gap-3 border border-white/50 hover:border-miva-lilac hover:bg-miva-lilac hover:text-miva-purple text-white font-sans font-light text-[11px] tracking-[0.28em] uppercase px-7 py-3.5 rounded-full transition-all cursor-pointer"
              >
                <span>Dieses Format Anfragen</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Event Request Form Section (Reached automatically once the stationary gallery finishes scrolling) */}
      <section ref={formSectionRef} className="py-20 md:py-28 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-miva-purple text-white p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden border border-miva-lilac/20">
            <div className="text-center mb-12 relative z-10">
              <p className="font-sans font-light text-[10px] tracking-[0.35em] uppercase text-miva-lilac mb-3">
                PRIVATE &amp; CORPORATE INQUIRY
              </p>
              <h2 className="font-miva-display text-3xl md:text-5xl text-white mb-3">
                Event <span className="italic text-miva-lilac">Anfragen</span>
              </h2>
              <p className="font-sans font-light text-white/75 text-xs md:text-sm tracking-wider">
                Beschreiben Sie uns Ihre Idee, Ihr Wunschdatum und Ihre Kontaktdaten – wir melden uns umgehend bei Ihnen.
              </p>
            </div>

            <form
              className="space-y-8 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Vielen Dank für Ihre Anfrage! Unser Event-Team meldet sich in Kürze.');
                setSelectedEvent('');
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-sans font-light text-[10px] tracking-[0.25em] uppercase text-miva-lilac mb-2">
                    Event Art
                  </label>
                  <select
                    value={selectedEvent}
                    onChange={(e) => setSelectedEvent(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-sm text-white focus:outline-none focus:border-miva-lilac cursor-pointer"
                    required
                  >
                    <option value="" disabled className="text-miva-purple">
                      Bitte wählen...
                    </option>
                    {eventCategories.map((c) => (
                      <option key={c.id} value={c.id} className="text-miva-purple">
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans font-light text-[10px] tracking-[0.25em] uppercase text-miva-lilac mb-2">
                    Geschätzte Gästezahl
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="z.B. 50"
                    className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac"
                    required
                  />
                </div>

                <div>
                  <label className="block font-sans font-light text-[10px] tracking-[0.25em] uppercase text-miva-lilac mb-2">
                    Wunschdatum
                  </label>
                  <input
                    type="date"
                    className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-sm text-white focus:outline-none focus:border-miva-lilac"
                  />
                </div>

                <div>
                  <label className="block font-sans font-light text-[10px] tracking-[0.25em] uppercase text-miva-lilac mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+43 / +41 ..."
                    className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-sans font-light text-[10px] tracking-[0.25em] uppercase text-miva-lilac mb-2">
                    Name / Firma
                  </label>
                  <input
                    type="text"
                    placeholder="Vorname Nachname / Firmenname"
                    className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac"
                    required
                  />
                </div>

                <div>
                  <label className="block font-sans font-light text-[10px] tracking-[0.25em] uppercase text-miva-lilac mb-2">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    placeholder="ihre.email@beispiel.com"
                    className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-sans font-light text-[10px] tracking-[0.25em] uppercase text-miva-lilac mb-2">
                  Ihre Idee / Beschreibung
                </label>
                <textarea
                  rows={4}
                  placeholder="Erzählen Sie uns von Ihrer Vision, speziellen Wünschen oder Anforderungen..."
                  className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac resize-none"
                  required
                ></textarea>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="bg-miva-red text-white font-sans font-medium text-xs tracking-[0.25em] uppercase px-14 py-4 rounded-full hover:bg-miva-lilac hover:text-miva-purple transition-colors shadow-lg cursor-pointer"
                >
                  Anfrage Senden
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
