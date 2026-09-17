import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CafePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-espresso/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/hero/hero-1.jpg')" }}
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl text-cream mb-4 drop-shadow-md">
            Café Schwerzenbach
          </h1>
          <p className="font-script text-3xl text-cream-light opacity-90">Kaffee, Kuchen & Begegnungen</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xl leading-relaxed text-espresso/80 mb-12">
            Unser Café ist das Herzstück der Villa. Hier treffen sich Hotelgäste und Einheimische auf eine Tasse erstklassigen Kaffee, hausgemachte Patisserie und leichte, saisonale Gerichte. Nehmen Sie Platz, lehnen Sie sich zurück und geniessen Sie die besondere Atmosphäre.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-cream-light p-8 rounded-lg border border-cream">
              <h3 className="font-serif text-2xl text-bordeaux mb-4">Öffnungszeiten</h3>
              <ul className="space-y-2 text-espresso/80">
                <li className="flex justify-between border-b border-cream/50 pb-2"><span>Montag - Freitag</span> <span>07:30 - 18:00</span></li>
                <li className="flex justify-between border-b border-cream/50 pb-2 pt-2"><span>Samstag</span> <span>08:30 - 17:00</span></li>
                <li className="flex justify-between pt-2"><span>Sonntag</span> <span>09:00 - 15:00 (Brunch)</span></li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg border border-cream shadow-sm flex flex-col justify-center">
              <h3 className="font-serif text-2xl text-bordeaux mb-4">Angebot</h3>
              <p className="text-espresso/80 mb-6">
                Specialty Coffee Röstungen, hausgemachte Kuchen, frische Croissants, gesunde Bowls und leichte Mittagessen.
              </p>
              <Link href="/contact">
                <Button>Tisch Reservieren</Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             <div className="h-48 bg-cover bg-center rounded-sm" style={{ backgroundImage: "url('/images/gallery/gallery-1.jpg')" }}></div>
             <div className="h-48 bg-cover bg-center rounded-sm" style={{ backgroundImage: "url('/images/hero/hero-1.jpg')" }}></div>
             <div className="h-48 bg-cover bg-center rounded-sm hidden md:block" style={{ backgroundImage: "url('/images/gallery/gallery-1.jpg')" }}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
