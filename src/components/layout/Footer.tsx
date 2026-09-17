import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-espresso text-cream py-12 border-t-4 border-bordeaux">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1: Kontakt */}
        <div>
          <h3 className="font-serif text-xl mb-4 text-cream-light">Kontakt</h3>
          <address className="not-italic text-cream/80 space-y-2">
            <p>Villa Schwerzenbach by MIVA</p>
            <p>Römerstrasse 23</p>
            <p>8603 Schwerzenbach</p>
            <p>Schweiz</p>
            <p className="pt-2">Tel: +41 44 825 XX XX</p>
            <p>Email: <a href="mailto:info@villa-schwerzenbach.ch" className="hover:text-white transition-colors">info@villa-schwerzenbach.ch</a></p>
          </address>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="font-serif text-xl mb-4 text-cream-light">Navigation</h3>
          <ul className="space-y-2 text-cream/80">
            <li><Link href="/rooms" className="hover:text-white transition-colors">Zimmer</Link></li>
            <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
            <li><Link href="/cafe" className="hover:text-white transition-colors">Café</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">Galerie</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Kontakt</Link></li>
          </ul>
        </div>

        {/* Column 3: Social & Branding */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <svg width="24" height="24" viewBox="0 0 100 100" fill="currentColor" className="text-cream">
              <path d="M10 90 L10 50 A20 20 0 0 1 30 30 L30 30 A20 20 0 0 1 50 50 L50 90 M30 90 L30 50 A20 20 0 0 1 50 30 L50 30 A20 20 0 0 1 70 50 L70 90 M50 90 L50 50 A20 20 0 0 1 70 30 L70 30 A20 20 0 0 1 90 50 L90 90" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
            <span className="font-serif font-bold text-lg tracking-wider">VILLA SCHWERZENBACH</span>
          </div>
          <p className="font-script text-xl mb-6 text-cream-light opacity-80">A House Full of Life</p>
          <div className="space-x-4 text-sm text-cream/60">
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
            <span>|</span>
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-10 pt-6 border-t border-cream/20 text-center text-sm text-cream/50">
        <p>&copy; {new Date().getFullYear()} Villa Schwerzenbach by MIVA. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
}
