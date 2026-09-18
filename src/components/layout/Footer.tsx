import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#f6f4ed] pt-20 relative z-10">
      <div className="container mx-auto px-4 text-center">
        
        {/* Address & Phone */}
        <div className="font-mono text-sm tracking-wider text-espresso mb-10 leading-relaxed">
          <p>Römerstrasse 23, 6900 Bregenz, Österreich</p>
          <p className="mt-2">+43 5574 123456</p>
        </div>

        {/* Links */}
        <div className="flex justify-center items-center gap-4 text-sm font-bold tracking-widest text-espresso mb-12">
          <Link href="/faqs" className="hover:text-bordeaux transition-colors">FAQS</Link>
          <span className="text-gray-400 font-light">|</span>
          <Link href="/contact" className="hover:text-bordeaux transition-colors">CONTACT</Link>
          <span className="text-gray-400 font-light">|</span>
          <Link href="/careers" className="hover:text-bordeaux transition-colors">CAREERS</Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="#" className="w-10 h-10 rounded-full bg-[#cb6b57] flex items-center justify-center hover:bg-bordeaux transition-colors">
            {/* Instagram SVG */}
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#cb6b57] flex items-center justify-center hover:bg-bordeaux transition-colors">
            {/* MapPin / Tripadvisor fallback SVG */}
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
          </a>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image 
            src="/images/logos/header-logo.png" 
            alt="Villa Schwerzenbach" 
            width={300} 
            height={120} 
            className="w-48 md:w-64 h-auto object-contain"
          />
        </div>

        {/* Credit */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-widest text-espresso/70">
            Built by <a href="#" className="underline hover:text-bordeaux">MIVA</a>
          </p>
        </div>

      </div>

      {/* Bottom Black Bar */}
      <div className="bg-black py-6 text-center text-xs text-gray-400 font-sans">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-x-4 gap-y-3">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookie Center</Link>
          <span className="hidden md:inline">|</span>
          <Link href="/security" className="hover:text-white transition-colors">Security & Safety</Link>
          <span className="hidden md:inline">|</span>
          <span>© {new Date().getFullYear()} Villa Schwerzenbach</span>
        </div>
      </div>
    </footer>
  );
}
