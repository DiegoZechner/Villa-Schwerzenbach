import PageHero from '@/components/ui/PageHero';
import RoomGrid from '@/components/booking/RoomGrid';

export default function RoomsPage() {
  const rooms = [
    { id: '1', slug: 'rosengarten', name: 'Top 02 - Rosengarten', category: 'Classic', price: 159, capacity: 2, size: 18, image: '/images/rooms/top-02.jpg', description: 'Gemütliches Zimmer mit Blick auf den hauseigenen Rosengarten. Warme Farben und stilvolles Interieur laden zum Verweilen ein.' },
    { id: '2', slug: 'parkblick', name: 'Top 03 - Parkblick', category: 'Classic', price: 169, capacity: 2, size: 20, image: '/images/rooms/top-03.jpg', description: 'Helles Zimmer mit Panoramablick auf den umliegenden Park. Der ideale Rückzugsort nach einem ereignisreichen Tag.' },
    { id: '3', slug: 'salon-bordeaux', name: 'Top 04 - Salon Bordeaux', category: 'Comfort', price: 189, capacity: 2, size: 24, image: '/images/rooms/top-04.jpg', description: 'Elegantes Zimmer in warmen Bordeaux-Tönen mit einem gemütlichen Sitzbereich. Stilvolle Details und hochwertige Stoffe prägen das Ambiente.' },
    { id: '4', slug: 'beletage', name: 'Top 05 - Beletage', category: 'Comfort', price: 199, capacity: 2, size: 26, image: '/images/rooms/top-05.jpg', description: 'Grosszügiges Zimmer im ersten Obergeschoss mit hohen Decken und historischem Charme. Klassische Eleganz trifft auf modernen Komfort.' },
    { id: '5', slug: 'orangerie', name: 'Top 06 - Orangerie', category: 'Comfort', price: 199, capacity: 3, size: 28, image: '/images/rooms/top-06.jpg', description: 'Lichtdurchflutetes Zimmer mit verspielten botanischen Akzenten. Ideal für Familien oder Gäste, die etwas mehr Platz schätzen.' },
    { id: '6', slug: 'bibliothek', name: 'Top 07 - Bibliothek', category: 'Superior', price: 229, capacity: 2, size: 30, image: '/images/rooms/top-07.jpg', description: 'Ruhiges Refugium mit edlen Holzmöbeln und einer kuratierte Bücherauswahl. Perfekt für Gäste, die Ruhe und Inspiration suchen.' },
    { id: '7', slug: 'villa-blau', name: 'Top 08 - Villa Blau', category: 'Superior', price: 239, capacity: 2, size: 32, image: '/images/rooms/top-08.jpg', description: 'Stilvolles Zimmer in den charakteristischen Blautönen der Villa. Ein harmonisches Zusammenspiel aus Farbe, Licht und Design.' },
    { id: '8', slug: 'dachterrasse', name: 'Top 09 - Dachterrasse', category: 'Superior', price: 249, capacity: 3, size: 35, image: '/images/rooms/top-09.jpg', description: 'Exklusives Zimmer mit privatem Zugang zur Dachterrasse und Blick über die Dächer von Schwerzenbach.' },
    { id: '9', slug: 'belle-epoque', name: 'Top 10 - Belle Époque', category: 'Deluxe', price: 279, capacity: 2, size: 38, image: '/images/rooms/top-10.jpg', description: 'Opulentes Zimmer, das die Pracht der Belle Époque einfängt. Hohe Stuckdecken, Kronleuchter und edle Materialien schaffen ein unvergessliches Erlebnis.' },
    { id: '10', slug: 'grand-suite', name: 'Top 11 - Grand Suite', category: 'Suite', price: 329, capacity: 4, size: 50, image: '/images/rooms/top-11.jpg', description: 'Geräumige Suite mit separatem Wohnbereich und luxuriöser Ausstattung. Der perfekte Rahmen für besondere Anlässe.' },
    { id: '11', slug: 'villa-suite', name: 'Top 12 - Villa Suite', category: 'Suite', price: 379, capacity: 4, size: 65, image: '/images/rooms/top-12.jpg', description: 'Die Krönung der Villa – unsere grösste Suite mit Panoramablick, freistehender Badewanne und einem eigenen Loungebereich.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10">
      <PageHero 
        title="Apartments" 
        subtitle="STAY • RELAX • ENJOY" 
        image="/images/home/stay.jpg" 
      />
      
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <RoomGrid initialRooms={rooms} />
        </div>
      </section>
    </div>
  );
}
