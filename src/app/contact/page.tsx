import { SectionHeading } from '@/components/ui/SectionHeading';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading title="Kontakt" subtitle="Wir freuen uns auf Sie" />

        <div className="flex flex-col lg:flex-row gap-16 mt-12">
          {/* Contact Form */}
          <div className="flex-1 bg-white p-8 rounded-lg shadow-sm border border-cream">
            <h3 className="font-serif text-2xl text-bordeaux mb-6">Nachricht senden</h3>
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
              <Button type="button" className="w-full">Senden</Button>
            </form>
          </div>

          {/* Contact Info & Map Placeholder */}
          <div className="flex-1 space-y-10">
            <div>
              <h3 className="font-serif text-2xl text-bordeaux mb-6">Informationen</h3>
              <div className="space-y-4 text-espresso/80">
                <p className="flex gap-4">
                  <span className="text-villa-blue">📍</span>
                  <span>Villa Schwerzenbach<br/>Römerstrasse 23<br/>8603 Schwerzenbach<br/>Schweiz</span>
                </p>
                <p className="flex gap-4 items-center">
                  <span className="text-villa-blue">📞</span>
                  <span>+41 44 825 XX XX</span>
                </p>
                <p className="flex gap-4 items-center">
                  <span className="text-villa-blue">✉️</span>
                  <a href="mailto:info@villa-schwerzenbach.ch" className="hover:text-bordeaux transition-colors">info@villa-schwerzenbach.ch</a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl text-bordeaux mb-6">Anreise</h3>
              <div className="bg-cream-light h-64 rounded-lg flex items-center justify-center text-espresso/50 border border-cream">
                [Google Maps Platzhalter]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
