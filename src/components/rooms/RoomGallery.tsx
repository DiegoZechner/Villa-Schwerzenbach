'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function RoomGallery({ images, fullHeight = false }: { images: string[], fullHeight?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`flex flex-col ${fullHeight ? 'h-full w-full' : 'gap-4'}`}>
      {/* Main Image */}
      <div className={`relative w-full overflow-hidden ${fullHeight ? 'h-full' : 'h-[50vh] lg:h-[65vh]'}`}>
        <Image 
          src={images[currentIndex]} 
          alt="Room View" 
          fill 
          className="object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
          priority 
        />
        
        {/* Built-in controls for full height mode */}
        {fullHeight && images.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Thumbnails Row (Only if not full height) */}
      {!fullHeight && images.length > 1 && (
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

