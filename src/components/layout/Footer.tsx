import Link from 'next/link';

const leftLinks = [
  { name: 'SUITES & APARTMENTS', href: '/rooms' },
  { name: 'MIVA EVENTS', href: '/events' },
  { name: 'DISCOVER', href: '/discover' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'INSTAGRAM', href: 'https://instagram.com' },
];

const rightLinks = [
  { name: 'IMPRESSUM', href: '/impressum' },
  { name: 'DATENSCHUTZ', href: '/datenschutz' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#191919] text-white border-t border-white/10 pt-8 md:pt-10 pb-0 overflow-hidden select-none">
      {/* Obere Leiste: Links Navigation/Socials, Rechts Rechtliches & Copyright */}
      <div className="w-full px-5 sm:px-8 md:px-12 pb-10 md:pb-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Links */}
        <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3">
          {leftLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative font-sans font-semibold text-[11px] sm:text-xs tracking-[0.14em] uppercase text-white/90 hover:text-white transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-full h-px bg-current origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </Link>
          ))}
        </div>

        {/* Rechts */}
        <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3">
          {rightLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative font-sans font-semibold text-[11px] sm:text-xs tracking-[0.14em] uppercase text-white/90 hover:text-white transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1.5 left-0 w-full h-px bg-current origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </Link>
          ))}
          <span className="font-sans font-semibold text-[11px] sm:text-xs tracking-[0.14em] uppercase text-white/90">
            © {new Date().getFullYear()} VILLA SCHWERZENBACH
          </span>
        </div>
      </div>

      {/* Großer durchlaufender Schriftzug von rechts nach links (in der Größe wie ALMAVE im Screenshot) */}
      <div className="relative w-full overflow-hidden pt-2 pb-1">
        <div className="animate-footer-marquee flex items-baseline whitespace-nowrap">
          {[0, 1].map((groupIdx) => (
            <div key={groupIdx} className="flex items-baseline shrink-0">
              <span className="font-villa-editorial font-semibold text-[20vw] sm:text-[18vw] md:text-[16.5vw] leading-[0.82] tracking-[0.06em] uppercase text-white/90 px-6 md:px-10">
                VILLA SCHWERZENBACH
              </span>
              <span className="font-villa-editorial text-[10vw] sm:text-[9vw] leading-[0.82] text-villa-red px-4 md:px-8">
                •
              </span>
              <span className="font-villa-editorial font-semibold text-[20vw] sm:text-[18vw] md:text-[16.5vw] leading-[0.82] tracking-[0.06em] uppercase text-white/90 px-6 md:px-10">
                VILLA SCHWERZENBACH
              </span>
              <span className="font-villa-editorial text-[10vw] sm:text-[9vw] leading-[0.82] text-villa-red px-4 md:px-8">
                •
              </span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
