import type { Metadata } from 'next';
import { Montserrat, Playfair_Display, Bodoni_Moda, Great_Vibes, EB_Garamond } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackgroundDesign from '@/components/layout/BackgroundDesign';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-garamond',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-miva',
});

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
});

export const metadata: Metadata = {
  title: 'Villa Schwerzenbach by MIVA',
  description: 'A beautiful boutique residence & event location in Bregenz. STAY · EAT · MEET · CELEBRATE · DANCE.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${montserrat.variable} ${playfair.variable} ${bodoni.variable} ${greatVibes.variable} ${ebGaramond.variable} font-sans min-h-screen flex flex-col relative`}>
        <BackgroundDesign />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
