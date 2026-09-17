import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function Home() {
  // Hardcoded for MVP as requested
  const featuredRooms = [
    { id: '1', slug: 'classic-room', name: 'Classic Room', category: 'Classic', price: 150, image: '/images/hero/hero-1.jpg' },
    { id: '2', slug: 'superior-room', name: 'Superior Room', category: 'Superior', price: 220, image: '/images/gallery/gallery-1.jpg' },
    { id: '3', slug: 'suite', name: 'Villa Suite', category: 'Suite', price: 350, image: '/images/hero/hero-1.jpg' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-espresso/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/hero/hero-1.jpg')" }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <svg width="64" height="64" viewBox="0 0 100 100" fill="currentColor" className="text-cream mb-6 animate-fade-in-up">
            <path d="M10 90 L10 50 A20 20 0 0 1 30 30 L30 30 A20 20 0 0 1 50 50 L50 90 M30 90 L30 50 A20 20 0 0 1 50 30 L50 30 A20 20 0 0 1 70 50 L70 90 M50 90 L50 50 A20 20 0 0 1 70 30 L70 30 A20 20 0 0 1 90 50 L90 90" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
          <h1 className="font-serif text-5xl md:text-7xl text-cream mb-4 tracking-tight drop-shadow-md">
            A House Full of Life
          </h1>
          <p className="text-cream-light text-lg md:text-xl tracking-[0.2em] mb-10 font-medium">
            STAY · EAT · MEET · CELEBRATE · DANCE
          </p>
          <Link href="/rooms">
            <Button size="lg" className="text-lg px-10">Verfügbarkeit prüfen</Button>
          </Link>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="font-script text-4xl md:text-5xl text-villa-blue mb-8">
            Same Space. Different Stories.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-espresso/80">
            Willkommen in der Villa Schwerzenbach. Einem Ort, an dem Geschichte auf Moderne trifft und wo jeder Raum seine eigene Geschichte erzählt. Ob Sie einen ruhigen Rückzugsort suchen, ein inspirierendes Meeting planen oder eine unvergessliche Feier veranstalten möchten – unser Boutique-Hotel bietet den perfekten Rahmen für Ihre Erlebnisse.
          </p>
        </div>
      </section>

      {/* 3. Room Teaser */}
      <section className="py-20 bg-cream-light">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading title="Unsere Zimmer" subtitle="Wohnen mit Stil" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <Card key={room.id} className="group cursor-pointer">
                <Link href={`/rooms/${room.slug}`}>
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${room.image})` }} />
                  </div>
                  <CardContent>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-2xl text-bordeaux">{room.name}</h3>
                      <Badge category={room.category} />
                    </div>
                    <p className="text-espresso/70 mb-4">ab CHF {room.price} / Nacht</p>
                    <span className="text-villa-blue font-medium group-hover:text-bordeaux transition-colors">Zimmer ansehen &rarr;</span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/rooms">
              <Button variant="outline">Alle Zimmer entdecken</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Experience Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading title="Erleben Sie die Villa" subtitle="Mehr als nur Übernachten" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-cream rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl text-bordeaux">🛏️</span>
              </div>
              <h3 className="font-serif text-2xl text-espresso mb-4">Stay</h3>
              <p className="text-espresso/70">Individuell gestaltete Zimmer, die Charme und modernen Komfort vereinen.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-cream rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl text-bordeaux">☕</span>
              </div>
              <h3 className="font-serif text-2xl text-espresso mb-4">Dine</h3>
              <p className="text-espresso/70">Genießen Sie Kaffeespezialitäten und feine Leckereien in unserem hauseigenen Café.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-cream rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl text-bordeaux">🥂</span>
              </div>
              <h3 className="font-serif text-2xl text-espresso mb-4">Celebrate</h3>
              <p className="text-espresso/70">Perfekte Räumlichkeiten für Hochzeiten, Firmenfeiern und private Anlässe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gallery Teaser (Masonry Placeholder) */}
      <section className="py-20 bg-espresso text-cream">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeading title="Eindrücke" subtitle="Blicke in die Villa" className="[&_h2]:text-cream [&_div]:bg-cream" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`bg-gray-800 ${i === 1 || i === 4 ? 'row-span-2' : ''} relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/gallery/gallery-1.jpg')" }} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                {/* Fallback placeholder text if image fails */}
                <div className="relative min-h-[200px] flex items-center justify-center text-white/50">Bild {i}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button variant="outline" className="border-cream text-cream hover:bg-cream hover:text-espresso">Zur Galerie</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-24 bg-bordeaux text-cream text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Bereit für Ihren Aufenthalt?</h2>
          <p className="text-lg mb-10 text-cream/80">Buchen Sie Ihr Zimmer direkt bei uns für die besten Konditionen und einen unvergesslichen Aufenthalt in der Villa Schwerzenbach.</p>
          <Link href="/rooms">
            <Button size="lg" className="bg-cream text-bordeaux hover:bg-cream-light px-10">Jetzt Buchen</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
