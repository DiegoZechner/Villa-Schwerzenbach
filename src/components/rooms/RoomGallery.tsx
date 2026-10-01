'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function RoomGallery({ images, fullHeight = false }: { images: string[], fullHeight?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={`flex flex-col ${fullHeight ? 'h-full w-full' : 'gap-4'} relative group`}>
        {/* Main Image */}
        <div className={`relative w-full overflow-hidden ${fullHeight ? 'h-full' : 'h-[50vh] lg:h-[65vh]'} cursor-pointer`} onClick={() => setIsFullscreen(true)}>
          <Image 
            src={images[currentIndex]} 
            alt="Room View" 
            fill 
            className="object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
            priority 
          />
          
          {/* Controls: Chevrons */}
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all text-2xl z-10">
                ‹
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all text-2xl z-10">
                ›
              </button>
            </>
          )}

          {/* Fullscreen Icon */}
          <button onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }} className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            Vollbild
          </button>
          
          {/* Dots */}
          {fullHeight && images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
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

      {/* Lightbox Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center flex-col">
          <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-8 text-white/50 hover:text-white text-4xl z-50 transition-colors">
            ×
          </button>
          
          <div className="relative w-full max-w-7xl h-[80vh] flex items-center justify-center">
             <Image src={images[currentIndex]} alt="Fullscreen Room View" fill className="object-contain" />
          </div>
          
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-6xl px-4 py-8 z-50 transition-colors">
                ‹
              </button>
              <button onClick={nextImage} className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-6xl px-4 py-8 z-50 transition-colors">
                ›
              </button>
              <div className="absolute bottom-8 font-mono tracking-widest text-white/60 text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

