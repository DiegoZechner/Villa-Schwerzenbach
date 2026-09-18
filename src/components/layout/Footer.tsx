import Link from 'next/link';
import Image from 'next/image';
import { Instagram, MapPin } from 'lucide-react'; 

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
            <Instagram className="w-5 h-5 text-white" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-[#cb6b57] flex items-center justify-center hover:bg-bordeaux transition-colors">
            <MapPin className="w-5 h-5 text-white" />
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
