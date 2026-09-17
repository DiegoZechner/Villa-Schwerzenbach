'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Buchungen', href: '/admin/bookings' },
  { name: 'Zimmer', href: '/admin/rooms' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#d9c8b9] flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col bg-[#35271f] text-white">
        <div className="flex h-16 items-center px-4 bg-[#4b1716]">
          <span className="text-xl font-bold font-playfair">Admin Bereich</span>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-[#4b1716] text-white'
                      : 'text-gray-300 hover:bg-[#4b1716] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-shrink-0 bg-[#2a1f18] p-4">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="group block w-full flex-shrink-0 text-left text-sm font-medium text-gray-300 hover:text-white"
          >
            Abmelden
          </button>
        </div>
      </div>

      {/* Mobile top bar */}
      <div className="md:hidden bg-[#35271f] text-white flex h-16 items-center justify-between px-4">
        <span className="text-xl font-bold font-playfair">Admin</span>
        <button
          type="button"
          className="text-gray-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#35271f] text-white">
          <nav className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive
                      ? 'bg-[#4b1716] text-white'
                      : 'text-gray-300 hover:bg-[#4b1716] hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-[#4b1716] hover:text-white"
            >
              Abmelden
            </button>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-[#d9c8b9]">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
