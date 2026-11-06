'use client';
import { usePathname } from 'next/navigation';

export default function BackgroundDesign() {
  const pathname = usePathname();
  const isRoomsPage = pathname?.startsWith('/rooms');

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: isRoomsPage ? '#08090a' : '#4b1716',
        backgroundImage: isRoomsPage
          ? "linear-gradient(rgba(6, 7, 9, 0.55), rgba(6, 7, 9, 0.55)), url('/images/backgroundimage_black.jpg')"
          : "url('/images/backgrounddesign.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '420px auto',
      }}
    />
  );
}
