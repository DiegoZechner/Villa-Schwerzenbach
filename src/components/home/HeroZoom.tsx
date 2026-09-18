'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function HeroZoom() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Nur das Hintergrundbild zoomt auf 20%
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <div ref={containerRef} className="h-[200vh] relative bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-espresso">
        
        {/* Skalierender Hintergrund */}
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 w-full h-full origin-center"
        >
          <Image 
            src="/images/home/lobby.jpg" 
            alt="Villa Schwerzenbach Lobby" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
        
        {/* Fixiertes Logo im Zentrum (bewegt sich nicht, skaliert nicht) */}
        <div className="relative z-10 flex items-center justify-center pointer-events-none">
          <Image 
            src="/images/logos/villa-logo-secondary.png"
            alt="Villa Schwerzenbach"
            width={800}
            height={400}
            className="w-4/5 md:w-1/2 h-auto drop-shadow-2xl" 
          />
        </div>

      </div>
    </div>
  );
}
