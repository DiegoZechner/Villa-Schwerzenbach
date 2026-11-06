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
      <RoomGrid initialRooms={roomsWithImages} />
    </div>
  );
}
