'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';

const eventCategories = [
  { id: 'hochzeit', title: 'Hochzeiten', desc: 'Der schönste Tag im perfekten Rahmen.', img: '/images/events/Screenshot 2026-10-01 154804.png' },
  { id: 'apero', title: 'Apéros & Treffen', desc: 'Stilvolles Beisammensein für besondere Momente.', img: '/images/events/Screenshot 2026-10-01 154830.png' },
  { id: 'firmenparty', title: 'Firmenpartys', desc: 'Erfolge feiern in exklusiver Atmosphäre.', img: '/images/events/Screenshot 2026-10-01 154836.png' },
  { id: 'seminar', title: 'Meetingräume & Seminare', desc: 'Inspirierende Räume für produktives Arbeiten.', img: '/images/events/Screenshot 2026-10-01 154744.png' },
  { id: 'andere', title: 'Individuelle Anfragen', desc: 'Ihre ganz persönliche Event-Idee.', img: '/images/events/Screenshot 2026-10-01 154804.png' },
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
    <div className="w-full">
      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {eventCategories.map((category) => (
          <button 
            key={category.id}
            onClick={() => handleSelect(category.id)}
            className={`group text-left relative overflow-hidden h-80 flex flex-col justify-end p-8 transition-all duration-500 border ${selectedEvent === category.id ? 'border-bordeaux' : 'border-transparent'}`}
          >
            <Image src={category.img} alt={category.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className={`absolute inset-0 transition-colors duration-500 ${selectedEvent === category.id ? 'bg-black/60' : 'bg-black/40 group-hover:bg-black/50'}`}></div>
            
            <div className="relative z-10">
              <h3 className="font-serif text-2xl text-white mb-2 tracking-widest uppercase">{category.title}</h3>
              <p className="font-sans text-white/80 text-sm">{category.desc}</p>
            </div>
            
            {/* Highlight Indicator */}
            {selectedEvent === category.id && (
              <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-bordeaux shadow-[0_0_10px_rgba(180,40,40,0.8)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Inquiry Form */}
      <div 
        ref={formRef} 
        className={`transition-all duration-1000 ease-in-out overflow-hidden ${selectedEvent ? 'opacity-100 max-h-[1500px]' : 'opacity-0 max-h-0'}`}
      >
        <div className="bg-white p-8 md:p-16 border border-espresso/10 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-4 uppercase tracking-widest">
              Event Anfragen
            </h2>
            <p className="font-sans text-espresso/60 text-sm tracking-wider uppercase">
              Lassen Sie uns gemeinsam etwas Besonderes planen.
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Vielen Dank für Ihre Anfrage! Wir melden uns in Kürze.'); setSelectedEvent(null); }}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 mb-2">Event Art</label>
                <select 
                  value={selectedEvent || ''}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className="w-full bg-transparent border-b border-espresso/20 pb-2 font-sans text-espresso focus:outline-none focus:border-bordeaux cursor-pointer"
                  required
                >
                  <option value="" disabled>Bitte wählen...</option>
                  {eventCategories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 mb-2">Geschätzte Gästezahl</label>
                <input 
                  type="number" 
                  min="1"
                  placeholder="z.B. 50"
                  className="w-full bg-transparent border-b border-espresso/20 pb-2 font-sans text-espresso focus:outline-none focus:border-bordeaux" 
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 mb-2">Wunschdatum</label>
                <input 
                  type="date" 
                  className="w-full bg-transparent border-b border-espresso/20 pb-2 font-sans text-espresso focus:outline-none focus:border-bordeaux" 
                />
              </div>
              
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 mb-2">Telefon</label>
                <input 
                  type="tel" 
                  placeholder="+41 44 ..."
                  className="w-full bg-transparent border-b border-espresso/20 pb-2 font-sans text-espresso focus:outline-none focus:border-bordeaux" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 mb-2">Name / Firma</label>
                <input 
                  type="text" 
                  placeholder="Vorname Nachname / Firmenname"
                  className="w-full bg-transparent border-b border-espresso/20 pb-2 font-sans text-espresso focus:outline-none focus:border-bordeaux" 
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 mb-2">E-Mail</label>
                <input 
                  type="email" 
                  placeholder="ihre.email@beispiel.ch"
                  className="w-full bg-transparent border-b border-espresso/20 pb-2 font-sans text-espresso focus:outline-none focus:border-bordeaux" 
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 mb-2">Ihre Idee / Beschreibung</label>
              <textarea 
                rows={5}
                placeholder="Erzählen Sie uns von Ihrer Vision, speziellen Wünschen oder Anforderungen..."
                className="w-full bg-transparent border-b border-espresso/20 pb-2 font-sans text-espresso focus:outline-none focus:border-bordeaux resize-none" 
                required
              ></textarea>
            </div>

            <div className="pt-8 flex justify-center">
              <button 
                type="submit" 
                className="bg-bordeaux text-cream font-mono text-[10px] tracking-[0.25em] uppercase px-16 py-5 hover:bg-espresso transition-colors"
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
