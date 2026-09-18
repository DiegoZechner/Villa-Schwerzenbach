'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const items = [
  { title: "STAY", image: "/images/home/stay.jpg", textColor: "text-villa-blue" },
  { title: "EAT", image: "/images/home/eat.jpg", textColor: "text-villa-red" },
  { title: "MEET", image: "/images/home/meet.jpg", textColor: "text-villa-red" },
  { title: "CELEBRATE", image: "/images/home/celebrate.jpg", textColor: "text-villa-blue" },
];

export default function StickyExperience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      {/* Intro Text vor den 4 Bildern */}
      <div className="py-24 text-center bg-background relative z-10">
        <h2 className="font-script text-6xl md:text-8xl text-bordeaux">Villa Schwerzenbach</h2>
        <p className="font-sans text-sm md:text-base tracking-[0.4em] uppercase mt-4 text-espresso">by MIVA</p>
      </div>

      {/* Scroll-Jacking Bereich für die 4 Bilder */}
      <div ref={containerRef} className="h-[400vh] relative bg-background">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background">
          
          {/* Grid with spacing and max-width instead of fullscreen */}
          <div className="w-full h-full max-w-6xl max-h-[70vh] grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-4 md:gap-8 px-4">
             {items.map((item, index) => {
               const start = index * 0.25;
               
               // Jedes Bild blendet sich einzeln nacheinander ein und bleibt dann sichtbar
               const opacity = useTransform(
                 scrollYProgress, 
                 [Math.max(0, start - 0.05), start + 0.1], 
                 [0, 1]
               );

               return (
                 <motion.div 
                   key={item.title}
                   style={{ opacity }}
                   className="relative w-full h-full rounded-md overflow-hidden shadow-2xl"
                 >
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover"
                   />
                   {/* Abdunklung für besseren Kontrast */}
                   <div className="absolute inset-0 bg-black/10" />
                   
                   {/* Text über dem Bild */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <h3 className={`text-6xl md:text-8xl lg:text-[9rem] font-serif tracking-widest uppercase ${item.textColor} drop-shadow-md`}>
                       {item.title}
                     </h3>
                   </div>
                 </motion.div>
               )
             })}
          </div>
        </div>
      </div>
    </>
  );
}
