'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function HeroZoom() {
  const containerRef = useRef(null);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Nur das Hintergrundbild zoomt auf 20%
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  useEffect(() => {
    // Show prompt after 2 seconds if user hasn't scrolled
    const timer = setTimeout(() => {
      if (window.scrollY < 20) {
        setShowScrollPrompt(true);
      }
    }, 2000);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowScrollPrompt(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
            src="/images/logos/hero-logo.svg"
            alt="Villa Schwerzenbach"
            width={800}
            height={400}
            className="w-4/5 md:w-1/2 h-auto drop-shadow-2xl" 
          />
        </div>

        {/* Scroll Prompt */}
        <AnimatePresence>
          {showScrollPrompt && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white z-20 pointer-events-none"
            >
              <span className="text-xs md:text-sm font-sans tracking-widest uppercase opacity-90 drop-shadow-md">
                Start Scrolling
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronDown className="w-8 h-8 opacity-90 drop-shadow-md" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
