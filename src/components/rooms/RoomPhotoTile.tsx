'use client';
import Link from 'next/link';
import Image from 'next/image';
import { RoomData } from '@/data/rooms';

export function CursorTooltip({
  visible,
  x,
  y,
  label = 'Book Now',
}: {
  visible: boolean;
  x: number;
  y: number;
  label?: string;
}) {
  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y - 14}px`,
        transform: `translate(-50%, -100%) scale(${visible ? 1 : 0.75})`,
        opacity: visible ? 1 : 0,
      }}
      className="fixed z-50 pointer-events-none transition-[opacity,transform] duration-150 ease-out bg-[#e5dec9]/95 text-[#1a1612] backdrop-blur-md px-3.5 py-1.5 rounded-md font-sans text-xs font-medium tracking-wide shadow-[0_8px_24px_rgba(0,0,0,0.45)] whitespace-nowrap"
    >
      {label}
    </div>
  );
}

export function RoomPhotoTile({
  room,
  className,
  sizes = '(max-width: 768px) 100vw, 50vw',
  onHoverChange,
  onMouseMove,
}: {
  room: RoomData;
  className: string;
  sizes?: string;
  onHoverChange: (hovering: boolean) => void;
  onMouseMove: (e: React.MouseEvent) => void;
}) {
  const formattedSize = `${room.size.toString().replace('.', ',')} m²`;

  return (
    <Link
      href={`/rooms/${room.slug}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onMouseMove={onMouseMove}
      className={`block relative overflow-hidden group cursor-none ${className}`}
    >
      <Image
        src={room.image}
        alt={room.name}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Subtle dark gradient at bottom for crisp legibility */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

      {/* Bottom-Right Info inside the Photo: Room Name, m², Stylish Avatar Capacity Icon */}
      <div className="absolute bottom-3.5 right-3.5 left-3.5 z-20 flex flex-wrap items-center justify-end gap-1.5 sm:gap-2 pointer-events-none">
        <span className="bg-black/75 backdrop-blur-md text-[#f3efe6] font-sans font-light text-xs sm:text-[13px] tracking-wide px-3 py-1.5 rounded-md border border-white/10">
          {room.name}
        </span>

        {/* Size (m²) Badge */}
        <span className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-[#e0dacb] font-sans text-xs px-2.5 py-1.5 rounded-md border border-white/10">
          <svg
            className="w-3.5 h-3.5 text-[#c8c0ae]"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M2.5 5.5V2.5H5.5M10.5 2.5H13.5V5.5M13.5 10.5V13.5H10.5M5.5 13.5H2.5V10.5" />
          </svg>
          <span>{formattedSize}</span>
        </span>

        {/* Persons Capacity Badge with Stylish WhatsApp-style Avatar Silhouette */}
        <span className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-[#e0dacb] font-sans text-xs px-2.5 py-1.5 rounded-md border border-white/10">
          <span className="w-4 h-4 rounded-full bg-white/15 flex items-center justify-center overflow-hidden shrink-0">
            <svg
              className="w-3.5 h-3.5 text-[#e6dfd1] translate-y-[1px]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2.5c-3.33 0-10 1.67-10 5v2.5h20v-2.5c0-3.33-6.67-5-10-5z" />
            </svg>
          </span>
          <span>{room.capacity}</span>
        </span>
      </div>
    </Link>
  );
}
