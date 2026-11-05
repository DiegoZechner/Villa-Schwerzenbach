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
      
      // Check if PowerShell nested the folder during copy
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
    
    // Fallback for rooms without extra gallery images yet
    return [mainImage, '/images/home/stay.jpg', '/images/home/lobby.jpg'];
  };

  const images = getGalleryImages(roomBase.topNumber, roomBase.image);

  return (
    <div className="bg-background min-h-screen relative z-10 font-sans">
      
      {/* Dark Banner Header */}
      <div className="w-full bg-espresso pt-36 pb-16 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl flex flex-col items-start">
          <Link href="/rooms" className="text-cream/60 hover:text-cream transition-colors font-mono text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 mb-4 w-fit">
            <span>←</span> Back to Apartments
          </Link>
          <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream uppercase tracking-[0.15em] leading-tight">
            {roomBase.name}
          </h1>
          {roomBase.tagline && (
            <p className="font-serif italic text-cream/70 text-base md:text-lg mt-2">
              {roomBase.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Interactive Gallery */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mt-8 mb-8">
        <RoomGallery images={images} />
      </div>

      {/* Booking/Filter Bar */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-0">
        <div className="border border-espresso/10 rounded-sm overflow-hidden">
          <BookingWidget roomId={roomBase.slug} roomName={roomBase.name} price={roomBase.price} />
        </div>
      </div>

      {/* Detailed Content */}
      <div className="bg-cream">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl pt-12 pb-24">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left: Description & Key Facts */}
            <div className="w-full lg:w-3/5">
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-bordeaux mb-3">
                {roomBase.type} • {roomBase.floor}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-espresso mb-6 uppercase tracking-widest">
                {roomBase.tagline}
              </h2>
              <p className="text-lg text-espresso/80 leading-loose font-serif mb-10">
                {roomBase.description}
              </p>
              
              {/* Key Metrics Bar */}
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-espresso/60 grid grid-cols-2 sm:grid-cols-3 gap-6 border-y border-espresso/10 py-6 mb-8">
                <div className="flex flex-col">
                  <span className="text-espresso/50 mb-1">Fläche (exkl. Balkon)</span>
                  <strong className="text-espresso text-sm font-sans">{roomBase.size.toString().replace('.', ',')} m²</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/50 mb-1">Bezeichnung</span>
                  <strong className="text-espresso text-sm font-sans">{roomBase.type}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/50 mb-1">Stockwerk</span>
                  <strong className="text-espresso text-sm font-sans">{roomBase.floor}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/50 mb-1">Max. Personen</span>
                  <strong className="text-espresso text-sm font-sans">{roomBase.capacity} Gäste</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/50 mb-1">Schlafzimmer / Betten</span>
                  <strong className="text-espresso text-sm font-sans">{roomBase.bedrooms} ({roomBase.beds} {roomBase.beds === 1 ? 'Bett' : 'Betten'})</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-espresso/50 mb-1">Ausrichtung</span>
                  <strong className="text-espresso text-sm font-sans">{roomBase.orientation}</strong>
                </div>
                {roomBase.balcony && (
                  <div className="flex flex-col">
                    <span className="text-espresso/50 mb-1">Balkon</span>
                    <strong className="text-espresso text-sm font-sans">{roomBase.balcony}</strong>
                  </div>
                )}
              </div>

              {(roomBase.notes || roomBase.locationNote) && (
                <div className="bg-white/60 border-l-2 border-bordeaux p-5 space-y-2 text-sm text-espresso/80">
                  {roomBase.notes && (
                    <p><strong className="font-mono text-[10px] tracking-widest uppercase text-espresso mr-2">Besonderheit:</strong> {roomBase.notes}</p>
                  )}
                  {roomBase.locationNote && (
                    <p><strong className="font-mono text-[10px] tracking-widest uppercase text-espresso mr-2">Lage im Haus:</strong> {roomBase.locationNote}</p>
                  )}
                </div>
              )}
            </div>

            {/* Right: Amenities */}
            <div className="w-full lg:w-2/5">
              <div className="bg-white p-8 md:p-12 border border-espresso/5 shadow-sm">
                <h3 className="font-serif text-2xl text-espresso mb-8 uppercase tracking-widest">Highlights & Ausstattung</h3>
                <ul className="flex flex-col gap-4">
                  {roomBase.amenities.map((amenity, i) => (
                    <li key={i} className="flex items-start gap-4 text-espresso/80 font-sans text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-bordeaux/60 shrink-0 mt-2"></div>
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
