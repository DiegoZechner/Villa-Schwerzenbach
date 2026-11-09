'use client';
import { useState, useEffect } from 'react';

interface ChoreographedHeroProps {
  primaryText: string;
  secondaryText: string;
  subtitle: string;
  bgClassName?: string;
  glowClassName?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  subtitleClassName?: string;
  scrollIndicatorClassName?: string;
  scrollLineClassName?: string;
  leftSplitVw?: number;
}

export default function ChoreographedHero({
  primaryText,
  secondaryText,
  subtitle,
  bgClassName = 'bg-[#160108]',
  glowClassName = 'bg-miva-purple/50',
  primaryClassName = 'font-miva-display text-white tracking-wider',
  secondaryClassName = 'font-miva-display italic text-miva-lilac tracking-wide',
  subtitleClassName = 'text-white/70',
  scrollIndicatorClassName = 'text-miva-lilac/80',
  scrollLineClassName = 'from-miva-lilac',
  leftSplitVw = -26,
}: ChoreographedHeroProps) {
  // 0 = hidden, 1 = rise from bottom to center, 2 = split left/right, 3 = move to corners (always skippable by scrolling)
  const [heroStage, setHeroStage] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroStage((prev) => Math.max(prev, 1)), 150);
    const t2 = setTimeout(() => setHeroStage((prev) => Math.max(prev, 2)), 1100);
    const t3 = setTimeout(() => setHeroStage(3), 2100);

    const handleScrollSkip = () => {
      if (window.scrollY > 15) {
        setHeroStage(3);
      }
    };

    window.addEventListener('scroll', handleScrollSkip, { passive: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', handleScrollSkip);
    };
  }, []);

  const getPrimaryTransform = () => {
    if (heroStage === 0) return 'translate(0px, 120px)';
    if (heroStage === 1) return 'translate(0px, 0px)';
    if (heroStage === 2) return `translate(${leftSplitVw}vw, 0px)`;
    return `translate(${leftSplitVw}vw, -24vh)`;
  };

  const getSecondaryTransform = () => {
    if (heroStage === 0) return 'translate(0px, 120px)';
    if (heroStage === 1) return 'translate(0px, 0px)';
    if (heroStage === 2) return 'translate(22vw, 0px)';
    return 'translate(22vw, 24vh)';
  };

  return (
    <section
      className={`relative h-screen w-full overflow-hidden flex items-center justify-center select-none ${bgClassName}`}
    >
      <div
        className={`absolute w-[430px] h-[430px] rounded-full blur-[125px] transition-opacity duration-1000 ${glowClassName} ${
          heroStage >= 2 ? 'opacity-100' : 'opacity-30'
        }`}
      />

      <div className="relative w-full h-full flex flex-col items-center justify-center px-6">
        <div
          style={{
            transform: getPrimaryTransform(),
            opacity: heroStage === 0 ? 0 : 1,
            transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out',
          }}
          className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase ${primaryClassName}`}
        >
          {primaryText}
        </div>

        <div
          style={{
            transform: getSecondaryTransform(),
            opacity: heroStage === 0 ? 0 : 1,
            transition: 'transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 800ms ease-out',
          }}
          className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 ${secondaryClassName}`}
        >
          {secondaryText}
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 px-6 text-center ${
            heroStage === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className={`font-sans text-xs md:text-sm tracking-[0.35em] uppercase mb-6 ${subtitleClassName}`}>
            {subtitle}
          </p>
          <div className={`flex flex-col items-center gap-3 ${scrollIndicatorClassName}`}>
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll to Explore</span>
            <div className={`w-px h-12 bg-gradient-to-b ${scrollLineClassName} to-transparent animate-pulse`} />
          </div>
        </div>
      </div>
    </section>
  );
}
