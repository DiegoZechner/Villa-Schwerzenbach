import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import BookingWidget from '@/components/booking/BookingWidget';
import RoomGallery from '@/components/rooms/RoomGallery';
import { allRooms } from '@/data/rooms';

export function generateStaticParams() {
  return allRooms.map(r => ({ slug: r.slug }));
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const roomBase = allRooms.find(r => r.slug === resolvedParams.slug) || allRooms[0];

  const getGalleryImages = (topNumber: string, mainImage: string) => {
    try {
      const folderName = `top-${topNumber}`;
      const nestedFolderName = `Top ${topNumber}`;
      let folderPath = path.join(process.cwd(), 'public', 'images', 'rooms', folderName);
      
      if (fs.existsSync(path.join(folderPath, nestedFolderName))) {
        folderPath = path.join(folderPath, nestedFolderName);
      }
      
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(file =>
          file.toLowerCase().endsWith('.jpg') ||
          file.toLowerCase().endsWith('.png') ||
          file.toLowerCase().endsWith('.jpeg')
        );
        
        if (imageFiles.length > 0) {
          const urlPath = folderPath.includes(nestedFolderName) ? `${folderName}/${nestedFolderName}` : folderName;
          return imageFiles.map(file => `/images/rooms/${urlPath}/${file}`);
        }
      }
    } catch (error) {
      console.error('Error reading gallery images:', error);
    }
    
    return [mainImage, '/images/home/stay.jpg', '/images/home/lobby.jpg'];
  };

  const images = getGalleryImages(roomBase.topNumber, roomBase.image);

  return (
    <div className="min-h-screen relative z-10 font-sans pb-24">
      
      {/* Dark Banner Header (Villa World) */}
      <div className="w-full bg-bordeaux pt-36 pb-16 px-6 md:px-12 border-b-[3px] border-cream">
        <div className="container mx-auto max-w-7xl flex flex-col items-start">
          <Link href="/rooms" className="text-cream/70 hover:text-white transition-colors font-sans text-[10px] tracking-[0.22em] uppercase flex items-center gap-2 mb-4 w-fit">
            <span>←</span> Back to Apartments
          </Link>
          <h1 className="font-villa-editorial text-2xl md:text-3xl lg:text-4xl text-white uppercase tracking-[0.18em] leading-tight">
            {roomBase.name}
          </h1>
          {roomBase.tagline && (
            <p className="font-script text-2xl md:text-3xl text-cream mt-2">
              {roomBase.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Main Editorial Content Container */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-10">
        <div className="bg-cream p-6 md:p-12 shadow-2xl border border-cream-light">
          
          {/* Interactive Gallery */}
          <div className="mb-8">
            <RoomGallery images={images} />
          </div>

          {/* Booking/Filter Bar */}
          <div className="mb-12">
            <div className="border border-espresso/15 overflow-hidden">
              <BookingWidget roomId={roomBase.slug} roomName={roomBase.name} price={roomBase.price} />
            </div>
          </div>

          {/* Detailed Editorial Info */}
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 pt-4">
            
            {/* Left: Description & Key Facts */}
            <div className="w-full lg:w-3/5">
              <div className="font-sans font-semibold text-[10px] tracking-[0.25em] uppercase text-villa-red mb-2">
                {roomBase.type} • {roomBase.floor}
              </div>
              <h2 className="font-villa-editorial text-3xl md:text-4xl text-espresso mb-2 uppercase tracking-[0.15em]">
                {roomBase.shortName}
              </h2>
              <p className="font-script text-2xl text-villa-blue mb-6">
                {roomBase.tagline}
              </p>
              <p className="text-base md:text-lg text-espresso/85 leading-relaxed font-sans mb-10">
                {roomBase.description}
              </p>
              
              {/* Key Metrics Bar */}
              <div className="font-sans text-[10px] tracking-[0.2em] uppercase text-espresso/60 grid grid-cols-2 sm:grid-cols-3 gap-6 border-y border-espresso/15 py-6 mb-8">
                <div className="flex flex-col">
                  <span className="text-espresso/55 mb-1">Fläche (exkl. Balkon)</span>
                  <strong className="text-espresso text-sm font-semibold">{roomBase.size.toString().replace('.', ',')} m²</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/55 mb-1">Bezeichnung</span>
                  <strong className="text-espresso text-sm font-semibold">{roomBase.type}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/55 mb-1">Stockwerk</span>
                  <strong className="text-espresso text-sm font-semibold">{roomBase.floor}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/55 mb-1">Max. Personen</span>
                  <strong className="text-espresso text-sm font-semibold">{roomBase.capacity} Gäste</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/55 mb-1">Schlafzimmer / Betten</span>
                  <strong className="text-espresso text-sm font-semibold">{roomBase.bedrooms} ({roomBase.beds} {roomBase.beds === 1 ? 'Bett' : 'Betten'})</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/55 mb-1">Ausrichtung</span>
                  <strong className="text-espresso text-sm font-semibold">{roomBase.orientation}</strong>
                </div>
                {roomBase.balcony && (
                  <div className="flex flex-col">
                    <span className="text-espresso/55 mb-1">Balkon</span>
                    <strong className="text-espresso text-sm font-semibold">{roomBase.balcony}</strong>
                  </div>
                )}
              </div>

              {(roomBase.notes || roomBase.locationNote) && (
                <div className="bg-cream-light border-l-4 border-villa-red p-5 space-y-2 text-sm text-espresso/85">
                  {roomBase.notes && (
                    <p><strong className="font-sans font-semibold text-[10px] tracking-widest uppercase text-bordeaux mr-2">Besonderheit:</strong> {roomBase.notes}</p>
                  )}
                  {roomBase.locationNote && (
                    <p><strong className="font-sans font-semibold text-[10px] tracking-widest uppercase text-bordeaux mr-2">Lage im Haus:</strong> {roomBase.locationNote}</p>
                  )}
                </div>
              )}
            </div>

            {/* Right: Arch-Accented Amenities Card */}
            <div className="w-full lg:w-2/5">
              <div className="bg-cream-light p-8 md:p-10 border border-espresso/10 shadow-sm">
                <h3 className="font-villa-editorial text-2xl text-espresso mb-8 uppercase tracking-[0.15em]">
                  Highlights &amp; Ausstattung
                </h3>
                <ul className="flex flex-col gap-4">
                  {roomBase.amenities.map((amenity, i) => (
                    <li key={i} className="flex items-start gap-4 text-espresso/85 font-sans text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-villa-red shrink-0 mt-2"></div>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
