'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const items = [
  { title: "STAY", image: "/images/home/stay.jpg" },
  { title: "EAT", image: "/images/home/eat.jpg" },
  { title: "MEET", image: "/images/home/meet.jpg" },
  { title: "CELEBRATE", image: "/images/home/celebrate.jpg" },
];

export default function StickyExperience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="h-[400vh] relative bg-background">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <div className="text-center z-10 mb-8 md:mb-12 pt-10">
          <h2 className="font-script text-6xl md:text-8xl text-bordeaux">Villa Schwerzenbach</h2>
          <p className="font-sans text-sm md:text-base tracking-[0.4em] uppercase mt-4 text-espresso">by MIVA</p>
        </div>

        <div className="relative w-full max-w-5xl h-[50vh] md:h-[60vh] flex justify-center items-center px-4">
           {items.map((item, index) => {
             const start = index * 0.25;
             const end = start + 0.25;
             
             // Opacity logic:
             // Fade in slightly before 'start', stay solid until 'end', then fade out (unless it's the last one)
             const opacity = useTransform(
               scrollYProgress, 
               [Math.max(0, start - 0.05), start + 0.05, end - 0.05, Math.min(1, end + 0.05)], 
               [0, 1, 1, index === 3 ? 1 : 0]
             );
             
             const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.9, 1]);

             return (
               <motion.div 
                 key={item.title}
                 style={{ opacity, scale }}
                 className="absolute inset-0 flex items-center justify-center px-4"
               >
                 <div className="relative w-full h-full rounded-sm overflow-hidden shadow-2xl border border-cream">
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     fill 
                     className="object-cover"
                   />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                     <h3 className="text-white text-5xl md:text-8xl font-serif tracking-widest uppercase drop-shadow-lg">
                       {item.title}
                     </h3>
                   </div>
                 </div>
               </motion.div>
             )
           })}
        </div>
      </div>
    </div>
  );
}
