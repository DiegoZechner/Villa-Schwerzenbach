'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const footerLinks = [
    { name: 'CONTACT', href: '/contact' },
    { name: 'INSTAGRAM', href: 'https://instagram.com' },
    { name: 'CAREERS', href: '#' },
    { name: 'NEWSLETTER', href: '#' },
    { name: 'PRIVACY POLICY', href: '/datenschutz' },
  ];

  return (
    <footer ref={footerRef} className="bg-espresso text-cream-light py-16 border-t border-[#1a100d] overflow-hidden">
      <div className={`container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        
        {/* Left: Logo */}
        <div className="flex-1 flex justify-center md:justify-start">
          <Link href="/">
             <Image 
                src="/images/logos/primary-1.svg" 
                alt="Villa Schwerzenbach" 
                width={250} 
                height={80} 
                className="h-10 md:h-12 w-auto object-contain brightness-0 invert opacity-90"
              />
          </Link>
        </div>

        {/* Center/Right: Links */}
        <div className="flex-[2] flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
          {footerLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href}
              className="group relative font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase opacity-70 hover:opacity-100 transition-all duration-300"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-current origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className={`container mx-auto px-4 md:px-8 mt-12 text-center md:text-right transition-all duration-1000 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <p className="font-mono text-[10px] tracking-widest uppercase opacity-40">
          © {new Date().getFullYear()} Villa Schwerzenbach. Site by MIVA.
        </p>
      </div>
    </footer>
  );
}
