import PageHero from '@/components/ui/PageHero';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10">
      <PageHero 
        title="Kontakt" 
        subtitle="Wir freuen uns auf Sie" 
        image="/images/home/meet.jpg" 
      />

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Contact Form */}
            <div className="flex-1 bg-white p-8 rounded-sm shadow-sm border border-cream">
              <h3 className="font-serif text-2xl text-bordeaux mb-6 uppercase tracking-widest">Nachricht senden</h3>
              <form className="space-y-6">
                <Input label="Name" required />
                <Input label="E-Mail" type="email" required />
                <Input label="Betreff" required />
                <div>
                  <label className="block text-sm font-medium text-espresso mb-1">Nachricht</label>
                  <textarea 
                    required
                    className="w-full px-4 py-3 border border-cream rounded-sm focus:outline-none focus:ring-2 focus:ring-bordeaux bg-white h-40"
                  ></textarea>
                </div>
                <Button type="button" className="w-full bg-bordeaux text-white hover:bg-villa-red rounded-sm">Senden</Button>
              </form>
            </div>

            {/* Contact Info & Map Placeholder */}
            <div className="flex-1 space-y-12">
              <div>
                <h3 className="font-serif text-2xl text-bordeaux mb-6 uppercase tracking-widest">Informationen</h3>
                <div className="space-y-6 text-espresso/80 font-sans tracking-wide leading-relaxed">
                  <p className="flex gap-4">
                    <span className="text-bordeaux font-bold">📍</span>
                    <span>Villa Schwerzenbach by MIVA<br/>Römerstrasse 23<br/>6900 Bregenz<br/>Österreich</span>
                  </p>
                  <p className="flex gap-4 items-center">
                    <span className="text-bordeaux font-bold">📞</span>
                    <span>+43 5574 123456</span>
                  </p>
                  <p className="flex gap-4 items-center">
                    <span className="text-bordeaux font-bold">✉️</span>
                    <a href="mailto:info@villa-schwerzenbach.at" className="hover:text-bordeaux transition-colors">info@villa-schwerzenbach.at</a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-bordeaux mb-6 uppercase tracking-widest">Anreise</h3>
                <div className="bg-cream-light h-64 rounded-sm flex items-center justify-center text-espresso/50 border border-cream font-mono text-sm tracking-widest uppercase">
                  [Google Maps Platzhalter]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
