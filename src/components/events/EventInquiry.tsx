'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const eventCategories = [
  {
    id: 'hochzeit',
    chapter: '01 / 06',
    subtitle: 'Festsaal & Garten',
    title: 'Hochzeiten',
    caption: 'Hochzeiten — Villa Schwerzenbach',
    desc: 'Der schönste Tag in einer unvergesslichen, lebendigen Kulisse – vom Empfang im Garten bis zum Festsaal.',
    img: '/images/events/Screenshot 2026-10-01 154804.png',
  },
  {
    id: 'apero',
    chapter: '02 / 06',
    subtitle: 'Garden & Lounge',
    title: 'Apéros & Treffen',
    caption: 'Apéros & Garden Sessions — Villa Schwerzenbach',
    desc: 'Stilvolles Beisammensein, kuratierte Drinks, spontane Begegnungen & gute Gespräche in entspannter Atmosphäre.',
    img: '/images/events/Screenshot 2026-10-01 154830.png',
  },
  {
    id: 'firmenparty',
    chapter: '03 / 06',
    subtitle: 'Corporate & Culture',
    title: 'Firmenpartys',
    caption: 'Firmenpartys & Celebrations — Villa Schwerzenbach',
    desc: 'Erfolge feiern und Teams verbinden in einer pulsierenden, exklusiven MIVA-Atmosphäre.',
    img: '/images/events/Screenshot 2026-10-01 154836.png',
  },
  {
    id: 'seminar',
    chapter: '04 / 06',
    subtitle: 'Workshops & Offsites',
    title: 'Meetingräume & Seminare',
    caption: 'Meetings & Creative Offsites — Villa Schwerzenbach',
    desc: 'Inspirierende Räume mit Charakter für Visionäre, strategische Meetings und kreative Workshops.',
    img: '/images/events/Screenshot 2026-10-01 154744.png',
  },
  {
    id: 'dining',
    chapter: '05 / 06',
    subtitle: 'Private Dining',
    title: 'Long Table Dinners',
    caption: 'Private Dining & Kulinarik — Villa Schwerzenbach',
    desc: 'Exklusive Genussmomente an langen Tafeln – drinnen im historischen Ambiente oder unter freiem Himmel.',
    img: '/images/home/eat.jpg',
  },
  {
    id: 'andere',
    chapter: '06 / 06',
    subtitle: 'Bespoke Concepts',
    title: 'Individuelle Anfragen',
    caption: 'Individuelle Konzepte — Villa Schwerzenbach',
    desc: 'Sie haben eine ganz eigene Event-Idee? Wir verwandeln die Villa in die Bühne für Ihre persönliche Vision.',
    img: '/images/home/celebrate.jpg',
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

  const totalItems = eventCategories.length;
  // Start cameraZ at -1.0 so the 1st photo starts further back in the corridor (where the 2nd photo was), not directly in the foreground
  const startCameraZ = -1.0;
  const endCameraZ = totalItems - 0.55;
  const cameraZ = startCameraZ + galleryProgress * (endCameraZ - startCameraZ);
  const activeIndex = Math.min(totalItems - 1, Math.max(0, Math.round(cameraZ)));
  const currentItem = eventCategories[activeIndex];

  const handleSelectAndScrollToForm = (id: string) => {
    setSelectedEvent(id);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full font-sans">
      
      {/* 1. Stationary 3D Museum Corridor Gallery (CL16-style left/right perspective hallway) */}
      <div ref={trackRef} className="relative h-[540vh] w-full">
        <div className="sticky top-0 h-screen w-full bg-[#06020a] overflow-hidden select-none text-white">
          
          {/* Atmospheric Museum Corridor Lighting & Perspective Floor */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Deep ambient center glow (vanishing point) */}
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] rounded-full bg-[#1a1030]/40 blur-[130px]" />

            {/* Subtle perspective floor at bottom (like the blurred track in the screenshots) */}
            <div
              className="absolute bottom-0 left-[-10%] right-[-10%] h-[32vh] opacity-40"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(35, 45, 70, 0.25) 35%, rgba(232, 180, 244, 0.12) 70%, rgba(10, 5, 18, 0.95) 100%)',
                transform: 'perspective(500px) rotateX(60deg)',
              }}
            />

            {/* Architectural corridor wall light streaks on left and right */}
            <div className="absolute top-[18%] left-[4%] w-28 h-2 bg-white/15 blur-[2px] -rotate-6" />
            <div className="absolute top-[34%] left-[2%] w-24 h-1.5 bg-white/10 blur-[2px] -rotate-3" />
            <div className="absolute top-[52%] left-[15%] w-20 h-1 bg-white/15 blur-[1px] -rotate-2" />

            <div className="absolute top-[20%] right-[6%] w-28 h-2 bg-white/15 blur-[2px] rotate-6" />
            <div className="absolute top-[38%] right-[3%] w-24 h-1.5 bg-white/10 blur-[2px] rotate-3" />
            <div className="absolute top-[56%] right-[14%] w-24 h-1 bg-white/15 blur-[1px] rotate-2" />
          </div>

          {/* Top Bar: Minimal Museum Chapter Header */}
          <div className="absolute top-24 left-6 md:left-12 right-6 md:right-12 z-40 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="font-sans font-light text-[11px] tracking-[0.35em] uppercase text-white/75">
                MIVA
              </span>
              <span className="w-6 h-px bg-white/25" />
              <span className="font-sans font-extralight text-[11px] tracking-[0.25em] uppercase text-miva-lilac">
                {currentItem.chapter}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleSelectAndScrollToForm(currentItem.id)}
              className="pointer-events-auto font-sans font-light text-[10px] tracking-[0.28em] uppercase text-white/75 hover:text-miva-lilac transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>CHAPTERS / ANFRAGEN</span>
              <span className="text-xs">↓</span>
            </button>
          </div>

          {/* 3D Corridor Stage: Photos alternating Right & Left with small depth spacing */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {eventCategories.map((item, idx) => {
              // Relative distance from camera:
              // relDepth > 0 means ahead of the viewer in the corridor
              // relDepth = 0 means right next to the viewer in the foreground (huge on right or left)
              // relDepth < 0 means passing behind the viewer
              const relDepth = idx - cameraZ;

              // Only render photos within visible corridor range [-0.45, 2.85]
              if (relDepth < -0.45 || relDepth > 2.85) return null;

              // Alternate sides: even idx on the right (+1), odd idx on the left (-1)
              const side = idx % 2 === 0 ? 1 : -1;

              // Slightly smaller / more distant perspective scale
              const scale = Math.pow(2.2, -relDepth * 0.88) * 0.88;

              // In 3D corridor perspective, screen X offset is proportional to scale
              const xOffsetVw = side * 20.5 * scale;
              const yOffsetVh = (1 - Math.min(1.1, scale)) * -2;

              // Smooth fade-in in the far distance and fade-out when passing the camera
              let opacity = 1;
              if (relDepth > 2.15) {
                opacity = Math.max(0, 1 - (relDepth - 2.15) / 0.7);
              } else if (relDepth < -0.15) {
                opacity = Math.max(0, 1 - (-0.15 - relDepth) / 0.3);
              }

              // Closer items always render on top of distant items
              const zIndex = Math.round((10 - relDepth) * 10);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectAndScrollToForm(item.id)}
                  style={{
                    transform: `translate3d(${xOffsetVw}vw, ${yOffsetVh}vh, 0) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                  className="absolute w-[185px] sm:w-[230px] md:w-[275px] lg:w-[310px] aspect-[3/4] shadow-[0_30px_90px_rgba(0,0,0,0.85)] cursor-pointer group will-change-transform"
                >
                  <div className="relative w-full h-full overflow-hidden bg-black">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 320px, 450px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Subtle thin elegant caption inside frame on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <span className="font-sans font-extralight text-[9px] tracking-[0.28em] uppercase text-miva-lilac mb-1">
                        {item.subtitle}
                      </span>
                      <span className="font-sans font-light text-sm tracking-wider text-white">
                        {item.title} anfragen →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Center Thin Elegant Typography (matches "Monza - September 2024" in reference screenshots) */}
          <div className="absolute bottom-7 left-0 right-0 z-40 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
            <p className="font-sans font-light text-xs sm:text-sm md:text-base tracking-[0.06em] text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {currentItem.caption}
            </p>
            <p className="font-sans font-extralight text-[11px] sm:text-xs text-white/60 tracking-wider max-w-md mt-1">
              {currentItem.desc}
            </p>
          </div>

        </div>
      </div>

      {/* 2. Event Request Form Section (Same 95% width as the widgets above) */}
      <section ref={formSectionRef} className="py-16 md:py-24">
        <div className="w-[95%] mx-auto">
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
