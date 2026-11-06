import PageHero from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function CafePage() {
  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      <PageHero 
        title="Café Schwerzenbach" 
        subtitle="Kaffee, Kuchen & Begegnungen" 
        image="/images/home/eat.jpg"
        brand="villa"
      />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="bg-cream p-8 md:p-16 shadow-2xl border border-cream-light">
            <span className="font-script text-3xl text-villa-red block mb-2">Kaffee, Kuchen &amp; Begegnungen</span>
            <h2 className="font-villa-editorial text-3xl md:text-5xl text-espresso uppercase tracking-[0.18em] mb-8">
              Das Herzstück der Villa
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-espresso/85 mb-12 max-w-3xl mx-auto">
              Hier treffen sich Gäste und Einheimische auf eine Tasse erstklassigen Kaffee, hausgemachte Patisserie und leichte, saisonale Gerichte. Nehmen Sie Platz, lehnen Sie sich zurück und genießen Sie die besondere Atmosphäre.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
              <div className="bg-cream-light p-8 border border-espresso/15">
                <h3 className="font-villa-editorial text-2xl text-bordeaux uppercase tracking-[0.15em] mb-4">Öffnungszeiten</h3>
                <ul className="space-y-3 text-espresso/85 text-sm">
                  <li className="flex justify-between border-b border-espresso/15 pb-2"><span>Montag - Freitag</span> <span>07:30 - 18:00</span></li>
                  <li className="flex justify-between border-b border-espresso/15 pb-2 pt-1"><span>Samstag</span> <span>08:30 - 17:00</span></li>
                  <li className="flex justify-between pt-1"><span>Sonntag</span> <span>09:00 - 15:00 (Brunch)</span></li>
                </ul>
              </div>
              <div className="bg-cream-light p-8 border border-espresso/15 flex flex-col justify-center">
                <h3 className="font-villa-editorial text-2xl text-bordeaux uppercase tracking-[0.15em] mb-4">Angebot</h3>
                <p className="text-espresso/85 text-sm leading-relaxed mb-6">
                  Specialty Coffee Röstungen, hausgemachte Kuchen, frische Croissants, gesunde Bowls und leichte Mittagessen.
                </p>
                <Link href="/contact">
                  <Button>Tisch Reservieren</Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="relative h-64 arch-mask border-4 border-cream-light shadow-md">
                <Image src="/images/home/eat.jpg" alt="Café" fill className="object-cover" />
              </div>
              <div className="relative h-64 arch-mask border-4 border-cream-light shadow-md">
                <Image src="/images/home/lobby.jpg" alt="Villa Interior" fill className="object-cover" />
              </div>
              <div className="relative h-64 arch-mask border-4 border-cream-light shadow-md">
                <Image src="/images/home/stay.jpg" alt="Atmosphere" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
