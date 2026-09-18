import PageHero from '@/components/ui/PageHero';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export default function GalleryPage() {
  const images = [
    { id: '1', url: '/images/home/stay.jpg', category: 'Apartments', alt: 'Apartment' },
    { id: '2', url: '/images/home/lobby.jpg', category: 'Villa', alt: 'Lobby' },
    { id: '3', url: '/images/home/celebrate.jpg', category: 'Events', alt: 'Event' },
    { id: '4', url: '/images/home/eat.jpg', category: 'Restaurant', alt: 'Restaurant' },
    { id: '5', url: '/images/rooms/top-04.jpg', category: 'Apartments', alt: 'Salon Bordeaux' },
    { id: '6', url: '/images/rooms/top-10.jpg', category: 'Apartments', alt: 'Belle Epoque' },
    { id: '7', url: '/images/rooms/top-12.jpg', category: 'Apartments', alt: 'Villa Suite' },
    { id: '8', url: '/images/home/meet.jpg', category: 'Events', alt: 'Meet' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background relative z-10">
      <PageHero 
        title="Galerie" 
        subtitle="Einblicke in die Villa" 
        image="/images/home/lobby.jpg" 
      />
      
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <GalleryGrid images={images} />
        </div>
      </section>
    </div>
  );
}
