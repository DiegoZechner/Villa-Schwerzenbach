'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

const eventCategories = [
  { id: 'hochzeit', title: 'Hochzeiten', desc: 'Der schönste Tag in einer unvergesslichen, lebendigen Kulisse.', img: '/images/events/Screenshot 2026-10-01 154804.png' },
  { id: 'apero', title: 'Apéros & Treffen', desc: 'Stilvolles Beisammensein, spontane Begegnungen & gute Gespräche.', img: '/images/events/Screenshot 2026-10-01 154830.png' },
  { id: 'firmenparty', title: 'Firmenpartys', desc: 'Erfolge feiern in pulsierender, exklusiver MIVA-Atmosphäre.', img: '/images/events/Screenshot 2026-10-01 154836.png' },
  { id: 'seminar', title: 'Meetingräume & Seminare', desc: 'Inspirierende Räume für Visionäre, Workshops und neue Ideen.', img: '/images/events/Screenshot 2026-10-01 154744.png' },
  { id: 'andere', title: 'Individuelle Anfragen', desc: 'Ihre ganz persönliche Event-Vision – wir machen sie möglich.', img: '/images/events/Screenshot 2026-10-01 154804.png' },
];

export default function EventInquiry() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    setSelectedEvent(id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="w-full font-sans">
      {/* Event Category Cards (No tag widgets above cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {eventCategories.map((category, idx) => {
          const isSelected = selectedEvent === category.id;
          return (
            <button 
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className={`group text-center relative rounded-3xl p-8 transition-all duration-500 flex flex-col items-center border-2 cursor-pointer ${
                isSelected 
                  ? 'bg-miva-purple text-white border-miva-red shadow-2xl -translate-y-1' 
                  : idx % 2 === 1
                    ? 'bg-white text-miva-purple border-miva-lilac/60 hover:border-miva-red shadow-md hover:-translate-y-1'
                    : 'bg-miva-lilac/25 text-miva-purple border-transparent hover:border-miva-purple shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Circular Image Mask */}
              <div className={`relative w-44 h-44 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 transition-transform duration-700 group-hover:scale-105`}>
                <Image src={category.img} alt={category.title} fill className="object-cover" />
              </div>
              
              <h3 className={`font-miva-display text-2xl md:text-3xl mb-3 ${
                isSelected ? 'text-white' : 'text-miva-purple'
              }`}>
                {category.title}
              </h3>
              <p className={`font-sans text-sm leading-relaxed mb-6 ${
                isSelected ? 'text-white/85' : 'text-miva-purple/75'
              }`}>
                {category.desc}
              </p>

              <span className={`mt-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors ${
                isSelected
                  ? 'bg-miva-lilac text-miva-purple'
                  : 'bg-miva-red text-white group-hover:bg-miva-purple'
              }`}>
                <span>{isSelected ? 'Ausgewählt' : 'Anfragen'}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* MIVA Inquiry Form */}
      <div ref={formRef}>
        <div className="bg-miva-purple text-white p-8 md:p-14 rounded-3xl shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="text-center mb-10 relative z-10">
            <h3 className="font-miva-display text-3xl md:text-4xl text-white mb-2">
              Event <span className="italic text-miva-lilac">Anfrageformular</span>
            </h3>
            <p className="font-sans text-white/75 text-xs tracking-wider uppercase">
              Beschreiben Sie uns Ihre Idee – wir melden uns umgehend bei Ihnen.
            </p>
          </div>

          <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank für Ihre Anfrage! Unser Event-Team meldet sich in Kürze.'); setSelectedEvent(null); }}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-miva-lilac mb-2">Event Art</label>
                <select 
                  value={selectedEvent || ''}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-white focus:outline-none focus:border-miva-lilac cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-miva-purple">Bitte wählen...</option>
                  {eventCategories.map(c => <option key={c.id} value={c.id} className="text-miva-purple">{c.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-miva-lilac mb-2">Geschätzte Gästezahl</label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="z.B. 50"
                  className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac" 
                  required
                />
              </div>

              <div>
                <label className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-miva-lilac mb-2">Wunschdatum</label>
                <input 
                  type="date" 
                  className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-white focus:outline-none focus:border-miva-lilac" 
                />
              </div>
              
              <div>
                <label className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-miva-lilac mb-2">Telefon</label>
                <input 
                  type="tel" 
                  placeholder="+43 / +41 ..."
                  className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-miva-lilac mb-2">Name / Firma</label>
                <input 
                  type="text" 
                  placeholder="Vorname Nachname / Firmenname"
                  className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac" 
                  required
                />
              </div>

              <div>
                <label className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-miva-lilac mb-2">E-Mail</label>
                <input 
                  type="email" 
                  placeholder="ihre.email@beispiel.com"
                  className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-sans font-medium text-[10px] tracking-[0.2em] uppercase text-miva-lilac mb-2">Ihre Idee / Beschreibung</label>
              <textarea 
                rows={4}
                placeholder="Erzählen Sie uns von Ihrer Vision, speziellen Wünschen oder Anforderungen..."
                className="w-full bg-transparent border-b border-white/30 pb-2 font-sans text-white placeholder:text-white/40 focus:outline-none focus:border-miva-lilac resize-none" 
                required
              ></textarea>
            </div>

            <div className="pt-4 flex justify-center">
              <button 
                type="submit" 
                className="bg-miva-red text-white font-sans font-semibold text-xs tracking-[0.25em] uppercase px-14 py-4 rounded-full hover:bg-miva-lilac hover:text-miva-purple transition-colors shadow-lg cursor-pointer"
              >
                Anfrage Senden
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
