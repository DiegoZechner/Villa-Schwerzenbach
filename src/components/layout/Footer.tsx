import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-[#120606]/95 border-t border-[#d9c8b9]/15 py-20 md:py-28 flex justify-center items-center px-4">
      {/* Die Visitenkarte im Villa Schwerzenbach & MIVA Guideline-Design */}
      <div className="relative w-full max-w-[640px] aspect-[1.75/1] bg-[#ede3d7] shadow-[0_30px_80px_rgba(0,0,0,0.75)] p-7 sm:p-10 md:p-12 flex flex-col justify-between text-[#35271f] border border-[#4b1716]/15 overflow-hidden">
        
        {/* Dezenter Rundbogen-Rahmen (Arch Guideline Element) im Hintergrund der Karte */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 border border-[#4b1716]/12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[340px] h-[240px] rounded-t-full border border-[#4b1716]/[0.07]"
        />

        {/* Obere Reihe: Links (Kontakt in Montserrat) & Rechts (Villa Rundbogen-Signet & Brand) */}
        <div className="relative z-10 flex justify-between items-start gap-4">
          <div className="font-sans text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#4b1716] font-medium flex flex-col gap-1">
            <a
              href="mailto:hallo@villaschwerzenbach.at"
              className="hover:text-[#932b28] transition-colors"
            >
              hallo@villaschwerzenbach.at
            </a>
            <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#6b889f]">
              Bregenz • Bodensee
            </span>
          </div>

          <div className="text-right flex flex-col items-end">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 font-villa-editorial uppercase tracking-[0.22em] text-sm sm:text-base md:text-lg text-[#4b1716] hover:text-[#932b28] transition-colors"
            >
              <Image
                src="/images/logos/brand-6.svg"
                alt="Villa Schwerzenbach Signet"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain opacity-85"
              />
              <span>Villa Schwerzenbach</span>
            </Link>
            <span className="inline-flex items-center gap-1.5 font-sans uppercase tracking-[0.22em] text-[8px] sm:text-[9px] text-[#932b28] font-semibold mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ea2d39]" />
              <span>by MIVA • Suites &amp; Events</span>
            </span>
          </div>
        </div>

        {/* Mitte: Hauptlinks in Pendory/Editorial + Montserrat */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center my-auto py-2">
          <Link
            href="/rooms"
            className="font-villa-editorial uppercase tracking-[0.22em] text-xl sm:text-2xl md:text-3xl text-[#4b1716] hover:text-[#932b28] transition-colors"
          >
            Suites &amp; Apartments Buchen
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2.5 font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.22em] text-[#35271f]/80">
            <Link href="/events" className="hover:text-[#4e041c] transition-colors">
              Events &amp; Experience
            </Link>
            <span className="text-[#932b28]">•</span>
            <Link href="/discover" className="hover:text-[#932b28] transition-colors">
              Discover
            </Link>
            <span className="text-[#932b28]">•</span>
            <Link href="/contact" className="hover:text-[#932b28] transition-colors">
              Kontakt &amp; Anfahrt
            </Link>
          </div>
        </div>

        {/* Untere Reihe: Rechtliche Links & Adresse in Montserrat */}
        <div className="relative z-10 text-center font-sans text-[8px] sm:text-[10px] uppercase tracking-[0.22em] text-[#35271f]/75 flex justify-between items-center flex-wrap gap-2 pt-3 border-t border-[#4b1716]/15 w-full">
          <span className="text-[#4b1716]/80">Schwerzenbachstraße 9 • 6900 Bregenz</span>

          <div className="flex items-center gap-x-2.5 sm:gap-x-4">
            <Link href="/impressum" className="hover:text-[#932b28] transition-colors">
              Impressum
            </Link>
            <span className="text-[#932b28]">•</span>
            <Link href="/datenschutz" className="hover:text-[#932b28] transition-colors">
              Datenschutz
            </Link>
            <span className="text-[#932b28]">•</span>
            <Link href="/impressum" className="hover:text-[#932b28] transition-colors">
              AGB
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
