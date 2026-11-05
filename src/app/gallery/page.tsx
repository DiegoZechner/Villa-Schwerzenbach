import PageHero from '@/components/ui/PageHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export default function GalleryPage() {
  const images = [
    { id: '1', url: '/images/home/stay.jpg', category: 'Apartments', alt: 'Apartment' },
    { id: '2', url: '/images/home/lobby.jpg', category: 'Villa', alt: 'Lobby' },
    { id: '3', url: '/images/home/celebrate.jpg', category: 'Events', alt: 'Event' },
    { id: '4', url: '/images/home/eat.jpg', category: 'Restaurant', alt: 'Restaurant' },
    { id: '5', url: '/images/rooms/top-04.jpg', category: 'Apartments', alt: 'Top 04 - Die Belle' },
    { id: '6', url: '/images/rooms/top-10.jpg', category: 'Apartments', alt: 'Top 10 - Der Ambitus' },
    { id: '7', url: '/images/rooms/top-12.jpg', category: 'Apartments', alt: 'Top 12 - Die Aura' },
    { id: '8', url: '/images/home/meet.jpg', category: 'Events', alt: 'Meet' },
  ];

  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      <PageHero 
        title="Galerie" 
        subtitle="Same space, different stories" 
        image="/images/home/lobby.jpg"
        brand="villa"
      />
      
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="bg-cream p-8 md:p-14 shadow-2xl border border-cream-light">
            <GalleryGrid images={images} />
          </div>
        </div>
      </section>
    </div>
  );
}
