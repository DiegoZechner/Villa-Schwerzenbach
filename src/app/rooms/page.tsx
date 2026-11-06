import fs from 'fs';
import path from 'path';
import RoomGrid from '@/components/booking/RoomGrid';
import { allRooms, RoomData } from '@/data/rooms';

function getRoomGalleryImages(topNumber: string, mainImage: string): string[] {
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
}

export default function RoomsPage() {
  const roomsWithImages: (RoomData & { images: string[] })[] = allRooms.map(room => ({
    ...room,
    images: getRoomGalleryImages(room.topNumber, room.image),
  }));

  return (
    <div className="flex flex-col min-h-screen relative z-10 font-sans">
      
      {/* Red Header Banner (No Hero Image) */}
      <div className="w-full bg-bordeaux pt-36 pb-16 px-6 md:px-12 border-b-[3px] border-cream">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-cream/80 mb-3">
            STAY • RELAX • ENJOY
          </p>
          <h1 className="font-villa-editorial text-4xl md:text-6xl text-white uppercase tracking-[0.2em]">
            Apartments
          </h1>
        </div>
      </div>
      
      <section className="pb-24 pt-12">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <RoomGrid initialRooms={roomsWithImages} />
        </div>
      </section>
    </div>
  );
}
