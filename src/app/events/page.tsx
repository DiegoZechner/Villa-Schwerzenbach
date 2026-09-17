import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: 'Sounds from the Villa',
      subtitle: 'Live-Musik-Abende jeden Freitag',
      description: 'Lassen Sie die Woche bei entspannten Klängen ausklingen. Jeden Freitagabend begrüssen wir lokale Künstler in unserer Lounge.',
      image: '/images/hero/hero-1.jpg'
    },
    {
      id: 2,
      title: 'Wine & Dine',
      subtitle: 'Kulinarische Weinabende',
      description: 'Ein exklusives 5-Gänge-Menü, perfekt abgestimmt mit erlesenen Weinen aus der Region und darüber hinaus.',
      image: '/images/gallery/gallery-1.jpg'
    },
    {
      id: 3,
      title: 'Private Celebrations',
      subtitle: 'Feiern in exklusivem Rahmen',
      description: 'Ob Hochzeit, runder Geburtstag oder Jubiläum – die Villa bietet den perfekten Rahmen für Ihre unvergesslichen Momente.',
      image: '/images/hero/hero-1.jpg'
    },
    {
      id: 4,
      title: 'Corporate Events',
      subtitle: 'Meetings und Teambuilding',
      description: 'Inspirierende Räumlichkeiten für produktive Meetings, Workshops oder das nächste Firmenfest.',
      image: '/images/gallery/gallery-1.jpg'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-espresso/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/gallery/gallery-1.jpg')" }}
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl text-cream mb-4 drop-shadow-md">
            Events & Veranstaltungen
          </h1>
          <p className="font-script text-3xl text-cream-light opacity-90">Momente, die bleiben</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden flex flex-col">
                <div className="relative h-72">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }} />
                </div>
                <CardContent className="flex-grow flex flex-col p-8 bg-white">
                  <h3 className="font-serif text-3xl text-bordeaux mb-2">{event.title}</h3>
                  <h4 className="text-villa-blue font-medium mb-4">{event.subtitle}</h4>
                  <p className="text-espresso/70 mb-8 flex-grow">{event.description}</p>
                  <Link href="/contact" className="mt-auto">
                    <Button variant="outline" className="w-full">Anfrage senden</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
