'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

const eventCategories = [
  { id: 'hochzeit', badge: 'CELEBRATE', title: 'Hochzeiten', desc: 'Der schönste Tag in einer unvergesslichen, lebendigen Kulisse.', img: '/images/events/Screenshot 2026-10-01 154804.png' },
  { id: 'apero', badge: 'CONNECT', title: 'Apéros & Treffen', desc: 'Stilvolles Beisammensein, spontane Begegnungen & gute Gespräche.', img: '/images/events/Screenshot 2026-10-01 154830.png' },
  { id: 'firmenparty', badge: 'DANCE', title: 'Firmenpartys', desc: 'Erfolge feiern in pulsierender, exklusiver MIVA-Atmosphäre.', img: '/images/events/Screenshot 2026-10-01 154836.png' },
  { id: 'seminar', badge: 'MEET', title: 'Meetingräume & Seminare', desc: 'Inspirierende Räume für Visionäre, Workshops und neue Ideen.', img: '/images/events/Screenshot 2026-10-01 154744.png' },
  { id: 'andere', badge: 'CREATE', title: 'Individuelle Anfragen', desc: 'Ihre ganz persönliche Event-Vision – wir machen sie möglich.', img: '/images/events/Screenshot 2026-10-01 154804.png' },
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
      {/* MIVA Event Grid (Circular Masks, Asymmetrical/Modern Cards, Lilac/Purple/Tomate Red Palette) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {eventCategories.map((category, idx) => {
          const isSelected = selectedEvent === category.id;
          return (
            <button 
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className={`group text-center relative rounded-3xl p-8 transition-all duration-500 flex flex-col items-center border-2 ${
                isSelected 
                  ? 'bg-miva-purple text-white border-miva-red shadow-2xl -translate-y-1' 
                  : idx % 2 === 1
                    ? 'bg-white text-miva-purple border-miva-lilac/60 hover:border-miva-red shadow-md hover:-translate-y-1'
                    : 'bg-miva-lilac/25 text-miva-purple border-transparent hover:border-miva-purple shadow-md hover:-translate-y-1'
              }`}
            >
              {/* Circular Badge */}
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.2em] uppercase mb-6 ${
                isSelected ? 'bg-miva-red text-white' : 'bg-miva-purple text-miva-lilac'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                {category.badge}
              </span>

              {/* Circular Image Mask (MIVA core visual element) */}
              <div className={`relative w-44 h-44 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 transition-transform duration-700 group-hover:scale-105 ${
                isSelected ? 'border-miva-lilac' : 'border-miva-red'
              }`}>
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
                <span>{isSelected ? 'Ausgewählt' : 'Jetzt Anfragen'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
              </span>
            </button>
          );
        })}
      </div>

      {/* MIVA Inquiry Form */}
      <div 
        ref={formRef} 
        className={`transition-all duration-700 ease-in-out overflow-hidden ${selectedEvent ? 'opacity-100 max-h-[1600px]' : 'opacity-100 max-h-[1600px]'}`}
      >
        <div className="bg-miva-purple text-white p-8 md:p-16 rounded-3xl shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-miva-red/20 pointer-events-none" />
          
          <div className="text-center mb-12 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-miva-lilac text-miva-purple font-sans font-semibold text-[10px] tracking-[0.25em] uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-miva-red"></span>
              MIVA EVENT CONCIERGE
            </span>
            <h2 className="font-miva-display text-3xl md:text-5xl text-white mb-3">
              Event <span className="italic text-miva-lilac">Anfragen</span>
            </h2>
            <p className="font-sans text-white/75 text-xs md:text-sm tracking-wider uppercase">
              Lassen Sie uns gemeinsam einen unvergesslichen Moment gestalten.
            </p>
          </div>

          <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank für Ihre Anfrage! Unser MIVA Event-Team meldet sich in Kürze.'); setSelectedEvent(null); }}>
            
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

            <div className="pt-6 flex justify-center">
              <button 
                type="submit" 
                className="inline-flex items-center gap-3 bg-miva-red text-white font-sans font-semibold text-xs tracking-[0.25em] uppercase px-14 py-4 rounded-full hover:bg-miva-lilac hover:text-miva-purple transition-colors shadow-lg cursor-pointer"
              >
                <span>Anfrage Senden</span>
                <span className="w-2 h-2 rounded-full bg-current"></span>
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
