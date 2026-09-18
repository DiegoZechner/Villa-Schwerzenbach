'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

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

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Left: Hamburger Menu */}
        <div className="flex-1">
          <button className="text-bordeaux hover:text-villa-red transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
        
        {/* Center: Villa Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Image 
              src="/images/logos/villa-logo-primary.png" 
              alt="Villa Schwerzenbach" 
              width={160} 
              height={80} 
              className="h-10 md:h-14 w-auto object-contain transition-all duration-300"
            />
          </Link>
        </div>
        
        {/* Right: Language + Book Now */}
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className={`hidden md:flex gap-3 text-sm font-medium uppercase tracking-widest ${isScrolled ? 'text-espresso' : 'text-white'}`}>
            <span className="cursor-pointer font-bold text-bordeaux border-b-2 border-bordeaux">DE</span>
            <span className="cursor-pointer hover:text-bordeaux transition-colors">EN</span>
            <span className="cursor-pointer hover:text-bordeaux transition-colors">ES</span>
            <span className="cursor-pointer hover:text-bordeaux transition-colors">FR</span>
          </div>
          <Link href="/rooms" className="bg-bordeaux text-cream px-6 py-2 rounded-sm hover:bg-villa-red transition-colors font-medium text-sm md:text-base whitespace-nowrap">
            Book Now
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background shadow-lg">
          <nav className="flex flex-col py-4">
            <Link href="/rooms" className="px-6 py-4 border-b border-cream text-espresso hover:bg-cream-light font-serif text-lg" onClick={() => setIsMobileMenuOpen(false)}>Apartments</Link>
            <Link href="/events" className="px-6 py-4 border-b border-cream text-espresso hover:bg-cream-light font-serif text-lg" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
            <Link href="/gallery" className="px-6 py-4 border-b border-cream text-espresso hover:bg-cream-light font-serif text-lg" onClick={() => setIsMobileMenuOpen(false)}>Galerie</Link>
            <div className="px-6 py-6 flex gap-6 text-base font-medium">
              <span className="text-bordeaux font-bold border-b-2 border-bordeaux">DE</span>
              <span className="text-espresso">EN</span>
              <span className="text-espresso">ES</span>
              <span className="text-espresso">FR</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
