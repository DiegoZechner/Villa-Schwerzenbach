import HeroZoom from '@/components/home/HeroZoom';
import StickyExperience from '@/components/home/StickyExperience';
import ApartmentTeaser from '@/components/home/ApartmentTeaser';
import InstagramGallery from '@/components/home/InstagramGallery';

export default function Home() {
  return (
    <main className="w-full relative">
      <HeroZoom />
      <StickyExperience />
      <ApartmentTeaser />
      <InstagramGallery />
    </main>
  );
}
