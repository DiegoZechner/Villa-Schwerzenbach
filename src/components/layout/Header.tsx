'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const isMivaWorld = pathname?.startsWith('/events');

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling DOWN and past 100px, hide header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // If scrolling UP, show header
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'APARTMENTS', href: '/rooms', brand: 'villa' },
    { name: 'MIVA EVENTS', href: '/events', brand: 'miva' },
    { name: 'DISCOVER', href: '/discover', brand: 'villa' },
    { name: 'CONTACT', href: '/contact', brand: 'villa' },
    { name: 'BOOK NOW', href: '/rooms', brand: 'villa' },
  ];

  const scrolledBg = isMivaWorld
    ? 'bg-miva-purple/95 backdrop-blur-md shadow-md'
    : 'bg-bordeaux/95 backdrop-blur-md shadow-md';

  const scrolledText = 'text-white';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${lastScrollY > 10 ? scrolledBg : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4 md:px-8 py-5 flex justify-between items-center">
          
          {/* Left: Main Logo */}
          <div className="flex-1 flex items-center gap-3">
            <Link href="/" className="inline-block">
              <Image 
                src="/images/logos/secondary-3.svg" 
                alt="Villa Schwerzenbach" 
                width={260} 
                height={64} 
                className="h-10 sm:h-11 md:h-14 w-auto object-contain transition-all duration-300 brightness-0 invert"
              />
            </Link>
          </div>
          
          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex flex-[1.5] justify-center items-center gap-8 xl:gap-10">
            {navLinks.map(link => {
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`group relative font-sans font-medium text-[10px] xl:text-xs tracking-[0.22em] uppercase whitespace-nowrap transition-all duration-300 flex items-center ${
                    lastScrollY > 10 ? scrolledText : 'text-white'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-full h-px bg-current origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>
              );
            })}
          </nav>
          
          {/* Right: Language & Mobile Toggle (Icon top-right removed as requested) */}
          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            
            {/* Language Dropdown */}
            <div className="relative hidden md:block">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`font-sans font-medium text-xs tracking-widest uppercase hover:opacity-60 transition-opacity flex items-center gap-1 ${
                  lastScrollY > 10 ? scrolledText : 'text-white'
                }`}
              >
                DE ▾
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-4 w-24 bg-cream-light shadow-md border border-cream rounded-sm py-2 flex flex-col">
                  {['EN', 'FR', 'ESP', 'IT'].map(lang => (
                    <button 
                      key={lang}
                      onClick={() => setIsLangOpen(false)}
                      className="text-left px-4 py-2 text-xs font-sans tracking-widest uppercase text-espresso hover:bg-cream transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 ml-2 relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className={`w-6 h-px mb-1.5 transition-all ${isMobileMenuOpen ? 'bg-espresso rotate-45 translate-y-2' : 'bg-white'}`}></div>
              <div className={`w-6 h-px mb-1.5 transition-all ${isMobileMenuOpen ? 'bg-espresso opacity-0' : 'bg-white opacity-100'}`}></div>
              <div className={`w-6 h-px transition-all ${isMobileMenuOpen ? 'bg-espresso -rotate-45 -translate-y-1' : 'bg-white'}`}></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden fixed inset-0 bg-cream transition-all duration-500 overflow-y-auto ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto z-40' : '-translate-y-full opacity-0 pointer-events-none z-[-1]'}`} 
        style={{ top: '70px' }}
      >
        <nav className="flex flex-col items-center justify-start min-h-full gap-8 py-12">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-3xl tracking-widest uppercase ${
                link.brand === 'miva' ? 'font-miva-display italic text-miva-purple' : 'font-villa-editorial text-espresso'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-4 mt-8">
            {['DE', 'EN', 'FR', 'ESP', 'IT'].map(lang => (
              <span key={lang} className={`font-sans text-sm tracking-widest ${lang === 'DE' ? 'text-bordeaux border-b border-bordeaux' : 'text-espresso/60'}`}>
                {lang}
              </span>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
