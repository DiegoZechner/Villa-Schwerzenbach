'use client';
import { useState } from 'react';
import Lightbox from './Lightbox';

type GalleryImage = {
  id: string;
  url: string;
  category: string;
  alt: string;
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState('Alle');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const categories = ['Alle', 'Zimmer', 'Events', 'Café', 'Villa'];

  const filteredImages = filter === 'Alle' 
    ? images 
    : images.filter(img => img.category === filter);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-bordeaux text-cream' 
                : 'bg-white border border-cream text-espresso hover:bg-cream-light'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid Simulation */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredImages.map((img) => (
          <div 
            key={img.id} 
            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm bg-cream-light"
            onClick={() => setSelectedImage(img.url)}
          >
            <img 
              src={img.url} 
              alt={img.alt} 
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-bordeaux/0 group-hover:bg-bordeaux/20 transition-colors duration-300" />
          </div>
        ))}
        {filteredImages.length === 0 && (
          <p className="col-span-full text-center py-12 text-espresso/60">Keine Bilder in dieser Kategorie.</p>
        )}
      </div>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
