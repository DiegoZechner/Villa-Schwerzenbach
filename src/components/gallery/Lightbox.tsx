'use client';

export default function Lightbox({ 
  image, 
  onClose 
}: { 
  image: string | null, 
  onClose: () => void 
}) {
  if (!image) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 text-white hover:text-cream transition-colors"
        onClick={onClose}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div 
        className="relative max-w-5xl w-full max-h-[80vh] h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-full h-full bg-contain bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${image})` }} 
        />
      </div>
    </div>
  );
}
