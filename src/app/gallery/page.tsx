import { SectionHeading } from '@/components/ui/SectionHeading';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export default function GalleryPage() {
  // Mock images for MVP
  const images = [
    { id: '1', url: '/images/hero/hero-1.jpg', category: 'Zimmer', alt: 'Zimmer' },
    { id: '2', url: '/images/gallery/gallery-1.jpg', category: 'Villa', alt: 'Villa' },
    { id: '3', url: '/images/hero/hero-1.jpg', category: 'Events', alt: 'Event' },
    { id: '4', url: '/images/gallery/gallery-1.jpg', category: 'Café', alt: 'Café' },
    { id: '5', url: '/images/hero/hero-1.jpg', category: 'Zimmer', alt: 'Zimmer' },
    { id: '6', url: '/images/gallery/gallery-1.jpg', category: 'Events', alt: 'Event' },
    { id: '7', url: '/images/hero/hero-1.jpg', category: 'Villa', alt: 'Villa' },
    { id: '8', url: '/images/gallery/gallery-1.jpg', category: 'Café', alt: 'Café' },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <SectionHeading 
          title="Galerie" 
          subtitle="Einblicke in die Villa" 
        />
        <GalleryGrid images={images} />
      </div>
    </div>
  );
}
