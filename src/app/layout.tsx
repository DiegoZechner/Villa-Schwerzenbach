import type { Metadata } from 'next';
import { Montserrat, Playfair_Display, Dancing_Script } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-script' });

export const metadata: Metadata = {
  title: 'Villa Schwerzenbach by MIVA | A House Full of Life',
  description: 'A beautiful boutique hotel located in Schwerzenbach. STAY · EAT · MEET · CELEBRATE · DANCE.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${montserrat.variable} ${playfair.variable} ${dancingScript.variable} font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
