'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/rooms', label: 'Zimmer' },
    { href: '/events', label: 'Events' },
    { href: '/cafe', label: 'Café' },
    { href: '/gallery', label: 'Galerie' },
    { href: '/contact', label: 'Kontakt' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <svg width="32" height="32" viewBox="0 0 100 100" fill="currentColor" className="text-bordeaux">
            <path d="M10 90 L10 50 A20 20 0 0 1 30 30 L30 30 A20 20 0 0 1 50 50 L50 90 M30 90 L30 50 A20 20 0 0 1 50 30 L50 30 A20 20 0 0 1 70 50 L70 90 M50 90 L50 50 A20 20 0 0 1 70 30 L70 30 A20 20 0 0 1 90 50 L90 90" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
          <span className="font-serif font-bold text-xl tracking-wider text-bordeaux">VILLA SCHWERZENBACH</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-foreground hover:text-bordeaux font-medium transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/rooms" className="bg-bordeaux text-cream px-6 py-2 rounded-sm hover:bg-villa-red transition-colors font-medium">
            Buchen
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-lg md:hidden">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-6 py-3 text-foreground hover:bg-cream-light" onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-3">
              <Link href="/rooms" className="inline-block bg-bordeaux text-cream px-6 py-2 rounded-sm hover:bg-villa-red w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Buchen
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
