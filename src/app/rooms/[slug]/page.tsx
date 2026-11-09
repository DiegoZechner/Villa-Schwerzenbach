import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import BookingWidget from '@/components/booking/BookingWidget';
import RoomGallery from '@/components/rooms/RoomGallery';
import { allRooms } from '@/data/rooms';

export function generateStaticParams() {
  return allRooms.map((r) => ({ slug: r.slug }));
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const roomBase = allRooms.find((r) => r.slug === resolvedParams.slug) || allRooms[0];

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
        const imageFiles = files.filter(
          (file) =>
            file.toLowerCase().endsWith('.jpg') ||
            file.toLowerCase().endsWith('.png') ||
            file.toLowerCase().endsWith('.jpeg')
        );

        if (imageFiles.length > 0) {
          const urlPath = folderPath.includes(nestedFolderName)
            ? `${folderName}/${nestedFolderName}`
            : folderName;
          return imageFiles.map((file) => `/images/rooms/${urlPath}/${file}`);
        }
      }
    } catch (error) {
      console.error('Error reading gallery images:', error);
    }

    return [mainImage, '/images/home/stay.jpg', '/images/home/lobby.jpg'];
  };

  const images = getGalleryImages(roomBase.topNumber, roomBase.image);

  return (
    <div className="min-h-screen relative z-10 font-sans pb-16 text-white">
      {/* 1. Header Banner (Stays at the top) */}
      <div className="w-full bg-[#090a0c]/95 pt-32 pb-12 px-6 md:px-12 border-b border-white/15">
        <div className="container mx-auto max-w-7xl flex flex-col items-start">
          <Link
            href="/rooms"
            className="text-cream/70 hover:text-white transition-colors font-sans text-[10px] tracking-[0.25em] uppercase flex items-center gap-2 mb-4 w-fit"
          >
            <span>←</span> Back to Suites &amp; Apartments
          </Link>
          <h1 className="font-villa-editorial text-3xl sm:text-4xl md:text-5xl text-cream uppercase tracking-[0.18em] leading-tight">
            {roomBase.name}
          </h1>
          {roomBase.tagline && (
            <p className="font-script text-2xl md:text-3xl text-white/85 mt-1">
              {roomBase.tagline}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mt-8 space-y-10">
        {/* 2. Mosaic of Images (1 Big One + Several Small & Medium-Bigger Ones, Named + Click to Enlarge) */}
        <section>
          <RoomGallery images={images} topNumber={roomBase.topNumber} />
        </section>

        {/* 3. Calendar for Check-In & Check-Out, Pricing & Book Now */}
        <section>
          <BookingWidget
            roomId={roomBase.slug}
            roomName={roomBase.name}
            price={roomBase.price}
            maxGuests={roomBase.capacity}
          />
        </section>

        {/* 4. Simple Layout: FIRST the Facts, THEN the Text on the Room */}
        <section className="bg-[#0e1013]/95 border border-white/15 p-7 sm:p-10 md:p-14 shadow-2xl space-y-12">
          
          {/* FIRST: The Facts */}
          <div>
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-cream/60 block mb-3">
              01 / ROOM FACTS &amp; HIGHLIGHTS
            </span>
            <h2 className="font-villa-editorial text-2xl sm:text-3xl text-cream uppercase tracking-[0.18em] mb-8">
              The Facts — Top {roomBase.topNumber}
            </h2>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 border-y border-white/15 py-7 mb-8">
              <div>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-white/50 mb-1.5">
                  Fläche
                </span>
                <strong className="font-sans text-base sm:text-lg text-white font-medium">
                  {roomBase.size.toString().replace('.', ',')} m²
                </strong>
              </div>

              <div>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-white/50 mb-1.5">
                  Typ
                </span>
                <strong className="font-sans text-base sm:text-lg text-white font-medium">
                  {roomBase.type}
                </strong>
              </div>

              <div>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-white/50 mb-1.5">
                  Stockwerk
                </span>
                <strong className="font-sans text-base sm:text-lg text-white font-medium">
                  {roomBase.floor}
                </strong>
              </div>

              <div>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-white/50 mb-1.5">
                  Kapazität
                </span>
                <strong className="font-sans text-base sm:text-lg text-white font-medium">
                  Max. {roomBase.capacity} Gäste
                </strong>
              </div>

              <div>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-white/50 mb-1.5">
                  Schlafzimmer / Betten
                </span>
                <strong className="font-sans text-sm sm:text-base text-white font-medium">
                  {roomBase.bedrooms} ({roomBase.beds} {roomBase.beds === 1 ? 'Bett' : 'Betten'})
                </strong>
              </div>

              <div>
                <span className="block font-sans text-[10px] tracking-[0.22em] uppercase text-white/50 mb-1.5">
                  Ausrichtung{roomBase.balcony ? ' & Balkon' : ''}
                </span>
                <strong className="font-sans text-sm sm:text-base text-white font-medium">
                  {roomBase.orientation}
                  {roomBase.balcony ? ` • Balkon (${roomBase.balcony})` : ''}
                </strong>
              </div>
            </div>

            {/* Amenities / Ausstattung Bullet Points */}
            <div>
              <h3 className="font-sans text-[11px] tracking-[0.25em] uppercase text-cream/75 mb-4">
                Ausstattung &amp; Details
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {roomBase.amenities.map((amenity, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 font-sans text-xs sm:text-sm text-white/85 bg-white/[0.04] px-4 py-3 border border-white/10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cream shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/15" />

          {/* SECOND: The Text on the Room */}
          <div className="max-w-4xl">
            <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-cream/60 block mb-3">
              02 / THE EXPERIENCE
            </span>
            <h2 className="font-villa-editorial text-2xl sm:text-4xl text-cream uppercase tracking-[0.18em] mb-2">
              {roomBase.shortName}
            </h2>
            <p className="font-script text-2xl sm:text-3xl text-white/80 mb-6">
              {roomBase.tagline}
            </p>
            <p className="font-sans font-light text-base sm:text-lg text-white/85 leading-relaxed mb-8">
              {roomBase.description}
            </p>

            {(roomBase.notes || roomBase.locationNote) && (
              <div className="bg-white/[0.04] border-l-2 border-cream p-5 space-y-2 text-xs sm:text-sm text-white/80">
                {roomBase.notes && (
                  <p>
                    <strong className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase text-cream mr-2">
                      Besonderheit:
                    </strong>
                    {roomBase.notes}
                  </p>
                )}
                {roomBase.locationNote && (
                  <p>
                    <strong className="font-sans font-semibold text-[10px] tracking-[0.22em] uppercase text-cream mr-2">
                      Lage im Haus:
                    </strong>
                    {roomBase.locationNote}
                  </p>
                )}
              </div>
            )}
          </div>

        </section>
      </div>
    </div>
  );
}
