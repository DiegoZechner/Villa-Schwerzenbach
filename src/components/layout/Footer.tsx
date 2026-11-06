import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1b] py-24 flex justify-center items-center px-4">
      {/* Die Visitenkarte */}
      <div
        className="relative w-full max-w-[600px] aspect-[1.75/1] bg-[#f4f1ea] shadow-2xl p-8 md:p-12 flex flex-col justify-between font-serif text-gray-900"
        style={{ fontFamily: 'var(--font-garamond), "EB Garamond", "Times New Roman", serif' }}
      >
        {/* Obere Reihe: Links (Telefon/Mail) & Rechts (Logo/Brand) */}
        <div className="flex justify-between items-start">
          <div className="text-xs md:text-sm tracking-wider font-semibold">
            <a href="mailto:hallo@villasschwerzenbach.ch" className="hover:text-gray-500 transition-colors">
              hallo@villasschwerzenbach.ch
            </a>
          </div>
          <div className="text-right flex flex-col items-end">
            <Link href="/" className="uppercase tracking-[0.2em] font-semibold text-sm md:text-base hover:text-gray-500 transition-colors">
              Villas Schwerzenbach
            </Link>
            <span className="uppercase tracking-[0.15em] text-[8px] md:text-[10px] text-gray-600 mt-1">
              Boutique Apartments
            </span>
          </div>
        </div>

        {/* Mitte: Hauptlinks (anstelle des Namens) */}
        <div className="text-center flex flex-col items-center justify-center space-y-2 mt-4">
          <Link href="/rooms" className="uppercase tracking-[0.15em] text-lg md:text-2xl font-semibold hover:text-gray-500 transition-colors">
            Zimmer Buchen
          </Link>
          <Link href="/contact" className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-gray-700 hover:text-black transition-colors">
            Kontakt &amp; Anfahrt
          </Link>
        </div>

        {/* Untere Reihe: Rechtliche Links (anstelle der Adresse) */}
        <div className="text-center text-[9px] md:text-[11px] uppercase tracking-widest text-gray-800 flex justify-center flex-wrap gap-x-3 md:gap-x-6 w-full">
          <Link href="/impressum" className="hover:text-gray-500 transition-colors">
            Impressum
          </Link>
          <span>•</span>
          <Link href="/datenschutz" className="hover:text-gray-500 transition-colors">
            Datenschutz
          </Link>
          <span>•</span>
          <Link href="/impressum" className="hover:text-gray-500 transition-colors">
            AGB
          </Link>
        </div>
      </div>
    </footer>
  );
}
