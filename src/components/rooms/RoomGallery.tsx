'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function RoomGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative h-[50vh] lg:h-[65vh] w-full overflow-hidden">
        <Image 
          src={images[currentIndex]} 
          alt="Room View" 
          fill 
          className="object-cover transition-opacity duration-500 ease-in-out" 
          priority 
        />
      </div>
      
      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-20 w-32 shrink-0 overflow-hidden transition-all duration-300 ${
                currentIndex === idx 
                  ? 'border-b-4 border-bordeaux opacity-100' 
                  : 'border-b-4 border-transparent opacity-50 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

