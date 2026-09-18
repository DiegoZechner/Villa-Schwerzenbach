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

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="h-[200vh] relative bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-espresso">
        <motion.div 
          style={{ scale }}
          className="relative w-full h-full origin-center"
        >
          <Image 
            src="/images/home/lobby.jpg" 
            alt="Villa Schwerzenbach Lobby" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <motion.div 
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Image 
              src="/images/logos/villa-logo-primary.png"
              alt="Villa Schwerzenbach"
              width={800}
              height={400}
              className="w-4/5 md:w-1/2 h-auto drop-shadow-2xl brightness-0 invert" 
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
