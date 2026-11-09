'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ApartmentSlider from '@/components/home/ApartmentSlider';

const mivaGallerySlides = [
  {
    src: '/images/home/celebrate.jpg',
    label: 'Celebrations & Private Events',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154830.png',
    label: 'Sunset Apéros & Garden Sessions',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154804.png',
    label: 'Long Table Dinners & Kulinarik',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154836.png',
    label: 'Art, Sound & Corporate Culture',
  },
  {
    src: '/images/events/Screenshot 2026-10-01 154744.png',
    label: 'Creative Workshops & Offsites',
  },
];

interface VillaStoryWidget {
  number: string;
  category: string;
  title: string;
  text: string;
  links?: { label: string; href: string; accent?: boolean }[];
}

const villaStoryWidgets: VillaStoryWidget[] = [
  {
    number: '01',
    category: 'PHILOSOPHIE',
    title: 'Historie & Charakter',
    text: 'Die Villa Schwerzenbach verbindet den geschichtsträchtigen Glanz der Belle Époque mit zeitgemäßer Klarheit. Jeder Raum ist mit Ruhe, Weite und Charakter gestaltet – als Rückzugsort und Ort echter Begegnung.',
  },
  {
    number: '02',
    category: 'STANDORT',
    title: 'Im Herzen von Bregenz',
    text: 'Wenige Schritte vom Bodensee, den Bregenzer Festspielen und dem Pfänder entfernt: Unsere Lage in Bregenz vereint entspannte Privatsphäre mit direkter Nähe zu Kultur, See und dem Dreiländereck.',
    links: [{ label: 'Umgebung Entdecken →', href: '/discover' }],
  },
  {
    number: '03',
    category: 'KONZEPT',
    title: 'Stay • Meet • Celebrate',
    text: 'Ein Haus, zwei harmonierende Welten: Oben bieten 11 individuelle Suites & Apartments ein stilvolles Zuhause auf Zeit – im Haus und Garten schafft MIVA den Rahmen für Events, Apéros und besondere Feiern.',
    links: [
      { label: 'Suites & Apartments →', href: '/rooms' },
      { label: 'MIVA Events →', href: '/events', accent: true },
    ],
  },
];

function LetterByLetterText({ text, progress }: { text: string; progress: number }) {
  const totalChars = text.length;
  const words = text.split(' ');
  let globalCharIdx = 0;

  return (
    <p className="font-sans font-light text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-[1.45] tracking-wide">
      {words.map((word, wIdx) => {
        const chars = word.split('');
        const wordElement = (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {chars.map((char, cIdx) => {
              const currentIdx = globalCharIdx++;
              const threshold = currentIdx / totalChars;
              const isLit = progress > threshold;
              return (
                <span
                  key={cIdx}
                  className={`transition-colors duration-150 ${
                    isLit ? 'text-white' : 'text-cream/20'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
        // Account for space character after word
        globalCharIdx++;
        return (
          <span key={wIdx}>
            {wordElement}
            {wIdx < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
}

export default function Home() {
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [eventSlideIdx, setEventSlideIdx] = useState(0);

  // Refs & state for the 3 sequential letter-by-letter philosophy widgets
  const storyTrackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [storyProgress, setStoryProgress] = useState<number[]>([0, 0, 0]);

  // Auto-rotate MIVA revolver photo gallery every 4.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setEventSlideIdx((prev) => (prev + 1) % mivaGallerySlides.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener for the 3 sequential sticky letter-by-letter widgets
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const nextProgress = villaStoryWidgets.map((_, idx) => {
        const el = storyTrackRefs.current[idx];
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        // Start lighting up letters shortly before the card pins at top-28 (112px),
        // and finish lighting all letters right before the sticky track releases.
        const startY = vh * 0.38;
        const endY = -(rect.height - vh * 0.78);
        const total = startY - endY;
        if (total <= 0) return 0;
        const current = startY - rect.top;
        return Math.min(1, Math.max(0, current / total));
      });
      setStoryProgress(nextProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prevEventSlide = () => {
    setEventSlideIdx((prev) => (prev === 0 ? mivaGallerySlides.length - 1 : prev - 1));
  };

  const nextEventSlide = () => {
    setEventSlideIdx((prev) => (prev + 1) % mivaGallerySlides.length);
  };

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const totalSlides = mivaGallerySlides.length;

  return (
    <main className="w-full relative overflow-x-clip">
      {/* Floating "Explore More" Cursor Badge on Hero Hover */}
      <div
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y - 14}px`,
          transform: `translate(-50%, -100%) scale(${isHoveringHero ? 1 : 0.75})`,
          opacity: isHoveringHero ? 1 : 0,
        }}
        className="fixed z-50 pointer-events-none transition-[opacity,transform] duration-150 ease-out bg-[#e5dec9]/95 text-[#1a1612] backdrop-blur-md px-4 py-1.5 rounded-md font-sans text-xs font-medium tracking-[0.15em] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.45)] whitespace-nowrap"
      >
        Explore More
      </div>

      {/* Section 1: Dual Brand Hero Split (Suites & Apartments vs. Events & Experience, without video) */}
      <section className="h-screen w-full flex flex-col md:flex-row">
        
        {/* Left: Villa Schwerzenbach (Suites & Apartments) */}
        <Link
          href="/rooms"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
          onMouseMove={handleHeroMouseMove}
          className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden border-b-[3px] md:border-b-0 md:border-r-[3px] border-cream cursor-none block"
        >
          <Image
            src="/images/rooms/top-11.jpg"
            alt="Villa Schwerzenbach Suites & Apartments"
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[#090a0c]/45 md:bg-[#090a0c]/35 md:group-hover:bg-[#090a0c]/65 transition-colors duration-700 pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#d9c8b9] mb-3 px-4 py-1.5 border border-[#d9c8b9]/40">
              VILLA SCHWERZENBACH
            </span>
            <h2 className="text-white font-villa-editorial text-4xl md:text-6xl uppercase tracking-[0.18em]">
              Suites &amp; Apartments
            </h2>
            <span className="mt-4 font-sans text-xs tracking-[0.28em] uppercase text-cream opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Explore More →
            </span>
          </div>
        </Link>
        
        {/* Right: MIVA (Events & Experience) */}
        <Link
          href="/events"
          onMouseEnter={() => setIsHoveringHero(true)}
          onMouseLeave={() => setIsHoveringHero(false)}
          onMouseMove={handleHeroMouseMove}
          className="relative w-full md:w-1/2 h-1/2 md:h-full group overflow-hidden cursor-none block"
        >
          <Image src="/images/home/celebrate.jpg" alt="MIVA Events" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" priority />
          <div className="absolute inset-0 bg-[#4e041c]/45 md:bg-[#4e041c]/30 md:group-hover:bg-[#4e041c]/65 transition-colors duration-700 pointer-events-none" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase bg-[#ea2d39] text-white mb-4 px-4 py-1.5 rounded-full shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#e8b4f4]" />
              BY MIVA.
            </span>
            <h2 className="text-white font-miva-display italic text-4xl md:text-6xl tracking-wide mb-2">
              Events &amp; Experience
            </h2>
            <span className="mt-3 font-sans text-xs tracking-[0.28em] uppercase text-miva-lilac opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Explore More →
            </span>
          </div>
        </Link>
      </section>

      {/* Section 2: Compact Suites & Apartments Slider */}
      <ApartmentSlider />

      {/* Section 3: Compact MIVA Events Teaser with Revolver / Open-Folder Stacked Gallery */}
      <section className="w-full bg-miva-purple text-white py-12 md:py-16 px-6 md:px-12 border-t-[3px] border-white/20 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-miva-lilac/10 pointer-events-none blur-2xl" />
        <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-miva-red/10 pointer-events-none blur-2xl" />

        <div className="container mx-auto max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 relative z-10">
          {/* Left: Compact Heading, Short Description & Event Inquiry Button with Animated Arrow */}
          <div className="w-full lg:w-[42%] text-center lg:text-left">
            <span className="font-sans font-semibold text-[10px] tracking-[0.3em] uppercase text-miva-lilac block mb-3">
              MIVA HOSPITALITY &amp; EVENTS
            </span>
            <h2 className="font-miva-display text-2xl sm:text-3xl md:text-4xl leading-snug mb-4">
              Lebendige Momente. <span className="italic text-miva-lilac">Spontane Begegnungen.</span>
            </h2>
            <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed mb-7 max-w-md mx-auto lg:mx-0">
              Hochzeiten, Sommer-Apéros, Private Dinners, Firmenpartys oder kreative Seminare: Mit MIVA wird die Villa Schwerzenbach zur Bühne für besondere Erlebnisse.
            </p>
            <Link
              href="/events"
              className="group inline-flex items-center gap-3 bg-miva-red text-white font-sans font-medium text-xs tracking-[0.22em] uppercase px-7 py-3.5 rounded-full hover:bg-miva-lilac hover:text-miva-purple transition-colors shadow-lg overflow-hidden"
            >
              <span>Event Anfragen</span>
              <span className="inline-block animate-arrow-shoot">→</span>
            </Link>
          </div>

          {/* Right: Revolver / Open Physical Folder Stacked Photo Gallery */}
          <div className="w-full lg:w-[58%] flex flex-col items-center">
            <div className="relative w-full max-w-[520px] h-[250px] sm:h-[300px] md:h-[330px] flex items-center justify-center px-8 sm:px-12">
              {mivaGallerySlides.map((slide, idx) => {
                // Relative position in circular revolver stack:
                // 0 = active front card
                // 1 = next card peeking out on the right behind (open folder look)
                // 2 = second next card further right behind
                // totalSlides - 1 = previous card shifted to the left behind
                const diff = (idx - eventSlideIdx + totalSlides) % totalSlides;

                let transform = 'translate3d(0px, -24px, 0px) scale(0.75) rotate(0deg)';
                let zIndex = 0;
                let opacity = 0;
                let pointerEvents = 'pointer-events-none';

                if (diff === 0) {
                  transform = 'translate3d(0px, 0px, 0px) scale(1) rotate(0deg)';
                  zIndex = 30;
                  opacity = 1;
                  pointerEvents = 'pointer-events-auto';
                } else if (diff === 1) {
                  transform = 'translate3d(44px, -10px, 0px) scale(0.9) rotate(3deg)';
                  zIndex = 20;
                  opacity = 0.88;
                  pointerEvents = 'pointer-events-auto cursor-pointer';
                } else if (diff === 2) {
                  transform = 'translate3d(78px, -20px, 0px) scale(0.82) rotate(5.5deg)';
                  zIndex = 10;
                  opacity = 0.52;
                  pointerEvents = 'pointer-events-auto cursor-pointer';
                } else if (diff === totalSlides - 1) {
                  transform = 'translate3d(-46px, -12px, 0px) scale(0.88) rotate(-3.5deg)';
                  zIndex = 15;
                  opacity = 0.72;
                  pointerEvents = 'pointer-events-auto cursor-pointer';
                }

                return (
                  <div
                    key={slide.src}
                    onClick={() => {
                      if (diff === 1 || diff === 2) nextEventSlide();
                      if (diff === totalSlides - 1) prevEventSlide();
                    }}
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      transition:
                        'transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out',
                    }}
                    className={`absolute inset-x-8 sm:inset-x-12 inset-y-2 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.55)] border border-miva-lilac/30 bg-[#2b0310] ${pointerEvents}`}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.label}
                      fill
                      sizes="(max-width: 1024px) 85vw, 460px"
                      className="object-cover select-none"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        diff === 0
                          ? 'bg-gradient-to-t from-black/75 via-transparent to-transparent'
                          : 'bg-black/40'
                      }`}
                    />

                    {/* Active card caption */}
                    {diff === 0 && (
                      <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-3">
                        <span className="font-sans font-light text-[11px] sm:text-xs tracking-[0.15em] uppercase text-white/95 truncate">
                          {slide.label}
                        </span>
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-miva-lilac/90 shrink-0">
                          0{idx + 1} / 0{totalSlides}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Left / Right Revolver Controls */}
              <button
                type="button"
                onClick={prevEventSlide}
                aria-label="Vorheriges Event-Foto"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-black/55 hover:bg-miva-red text-white flex items-center justify-center text-xl font-light backdrop-blur-md transition-all cursor-pointer border border-white/15 shadow-lg"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextEventSlide}
                aria-label="Nächstes Event-Foto"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-black/55 hover:bg-miva-red text-white flex items-center justify-center text-xl font-light backdrop-blur-md transition-all cursor-pointer border border-white/15 shadow-lg"
              >
                ›
              </button>
            </div>

            {/* Compact Progress Dots */}
            <div className="flex items-center gap-2 mt-3">
              {mivaGallerySlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setEventSlideIdx(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === eventSlideIdx ? 'w-6 bg-miva-lilac' : 'w-1.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: DIE VILLA • PHILOSOPHIE • STANDORT • KONZEPT (3 Sequential Sticky Letter-by-Letter Reading Widgets) */}
      <section className="w-full bg-bordeaux text-cream border-t-[3px] border-white/15 pt-24 md:pt-32 pb-20 md:pb-28 px-4 sm:px-8 md:px-14">
        <div className="w-[95%] max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="pb-14 md:pb-20 border-b border-cream/20 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-cream/70 block mb-5">
                DIE VILLA • PHILOSOPHIE • STANDORT • KONZEPT
              </span>
              <h2 className="font-villa-editorial text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-[0.14em] leading-[0.95]">
                Villa Schwerzenbach
              </h2>
            </div>
            <span className="font-script text-3xl sm:text-5xl text-cream/90">
              Same space, different stories
            </span>
          </div>

          {/* 3 Sequential Scroll-Pinned Letter-by-Letter Widgets */}
          <div className="mt-10 md:mt-14 space-y-10 md:space-y-14">
            {villaStoryWidgets.map((widget, idx) => {
              const progress = storyProgress[idx] ?? 0;

              return (
                <div
                  key={widget.number}
                  ref={(el) => {
                    storyTrackRefs.current[idx] = el;
                  }}
                  className="relative h-[145vh]"
                >
                  <div className="sticky top-24 md:top-28 w-full rounded-3xl bg-[#3d000a] border border-cream/20 p-8 sm:p-12 md:p-16 lg:p-20 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                    {/* Top Meta Bar + Reading Progress Line */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 md:mb-12 border-b border-cream/15">
                      <div className="flex items-center gap-4">
                        <span className="font-sans text-xs tracking-[0.35em] uppercase text-cream/70">
                          {widget.number} / {widget.category}
                        </span>
                      </div>
                      <h3 className="font-villa-editorial text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-[0.14em]">
                        {widget.title}
                      </h3>
                    </div>

                    {/* Letter-by-Letter Scroll-Illuminated Text */}
                    <div className="max-w-5xl">
                      <LetterByLetterText text={widget.text} progress={progress} />
                    </div>

                    {/* Optional Links + Subtle Progress Bar at Bottom */}
                    <div className="mt-10 md:mt-14 pt-6 border-t border-cream/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      <div className="w-full sm:w-48 h-0.5 bg-cream/15 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cream transition-all duration-150"
                          style={{ width: `${Math.round(progress * 100)}%` }}
                        />
                      </div>

                      {widget.links && widget.links.length > 0 && (
                        <div className="flex flex-wrap items-center gap-6">
                          {widget.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className={`font-sans text-xs tracking-[0.28em] uppercase border-b pb-1.5 transition-colors ${
                                link.accent
                                  ? 'text-miva-lilac border-miva-lilac/50 hover:border-miva-lilac'
                                  : 'text-white border-white/50 hover:border-white'
                              }`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </main>
  );
}
