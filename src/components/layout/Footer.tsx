import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const footerLinks = [
    { name: 'CONTACT', href: '/contact' },
    { name: 'INSTAGRAM', href: 'https://instagram.com' },
    { name: 'CAREERS', href: '#' },
    { name: 'NEWSLETTER', href: '#' },
    { name: 'PRIVACY POLICY', href: '/datenschutz' },
  ];

  return (
    <footer className="bg-espresso text-cream-light py-16 border-t border-[#1a100d]">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-12 md:gap-4">
        
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
              className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase hover:opacity-100 opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-12 text-center md:text-right">
        <p className="font-mono text-[10px] tracking-widest uppercase opacity-40">
          © {new Date().getFullYear()} Villa Schwerzenbach. Site by MIVA.
        </p>
      </div>
    </footer>
  );
}
