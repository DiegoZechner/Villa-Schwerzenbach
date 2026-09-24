'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Header() {
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
    { name: 'APARTMENTS', href: '/rooms' },
    { name: 'EVENTS', href: '/events' },
    { name: 'DISCOVER', href: '/discover' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'BOOK NOW', href: '/rooms' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${lastScrollY > 10 ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 md:px-8 py-5 flex justify-between items-center">
        
        {/* Left: Main Logo */}
        <div className="flex-1">
          <Link href="/" className="inline-block">
            <Image 
              src="/images/logos/secondary-3.svg" 
              alt="Villa Schwerzenbach" 
              width={200} 
              height={40} 
              className={`h-6 md:h-8 w-auto object-contain transition-all duration-300 ${lastScrollY > 10 ? 'opacity-100' : 'brightness-0 invert'}`}
            />
          </Link>
        </div>
        
        {/* Center: Navigation (Desktop) */}
        <nav className="hidden lg:flex flex-[1.5] justify-center items-center gap-8 xl:gap-12">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`font-mono text-[10px] xl:text-xs tracking-[0.25em] uppercase whitespace-nowrap hover:opacity-50 transition-opacity ${lastScrollY > 10 ? 'text-espresso' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Right: Language & Secondary Icon */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
          
          {/* Language Dropdown */}
          <div className="relative hidden md:block">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`font-mono text-xs tracking-widest uppercase hover:opacity-50 transition-opacity flex items-center gap-1 ${lastScrollY > 10 ? 'text-espresso' : 'text-white'}`}
            >
              DE ▾
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-4 w-24 bg-background shadow-md border border-cream rounded-sm py-2 flex flex-col">
                {['EN', 'FR', 'ESP', 'IT'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setIsLangOpen(false)}
                    className="text-left px-4 py-2 text-xs font-mono tracking-widest uppercase text-espresso hover:bg-cream-light transition-colors"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Secondary Logo/Icon (Hidden on Mobile) */}
          <Link href="/" className="hidden md:block">
             <Image 
                src="/images/logos/brand-6.svg" 
                alt="Brand Mark" 
                width={30} 
                height={30} 
                className={`w-6 h-6 object-contain transition-all ${lastScrollY > 10 ? 'opacity-100' : 'brightness-0 invert'}`}
              />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`w-6 h-px mb-1.5 transition-all ${lastScrollY > 10 ? 'bg-espresso' : 'bg-white'}`}></div>
            <div className={`w-6 h-px mb-1.5 transition-all ${lastScrollY > 10 ? 'bg-espresso' : 'bg-white'}`}></div>
            <div className={`w-6 h-px transition-all ${lastScrollY > 10 ? 'bg-espresso' : 'bg-white'}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden fixed inset-0 bg-background z-40 transition-all duration-500 overflow-y-auto ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'}`} 
        style={{ top: '70px' }}
      >
         <nav className="flex flex-col items-center justify-start min-h-full gap-8 py-12">
            {navLinks.map(link => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="font-serif text-3xl tracking-widest text-espresso uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-4 mt-8">
              {['DE', 'EN', 'FR', 'ESP', 'IT'].map(lang => (
                <span key={lang} className={`font-mono text-sm tracking-widest ${lang === 'DE' ? 'text-bordeaux border-b border-bordeaux' : 'text-espresso/60'}`}>
                  {lang}
                </span>
              ))}
            </div>
         </nav>
      </div>
    </header>
  );
}
