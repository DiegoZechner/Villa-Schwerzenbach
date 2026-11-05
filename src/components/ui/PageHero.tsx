import Image from 'next/image';

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  brand?: 'villa' | 'miva';
}

export default function PageHero({ title, subtitle, image, brand = 'villa' }: PageHeroProps) {
  const isMiva = brand === 'miva';

  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className={`absolute inset-0 z-10 ${isMiva ? 'bg-[#4e041c]/55' : 'bg-[#35271f]/45'}`} />
      <div className="relative z-20 text-center px-4">
        {isMiva && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ea2d39] text-white font-sans font-medium text-[10px] tracking-[0.25em] uppercase mb-5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#e8b4f4]"></span>
            MIVA EVENTS &amp; HOSPITALITY
          </div>
        )}
        <h1 className={`${isMiva ? 'font-miva-display italic text-5xl md:text-7xl tracking-wide' : 'font-villa-editorial text-5xl md:text-7xl uppercase tracking-[0.2em]'} text-white mb-4 drop-shadow-lg`}>
          {title}
        </h1>
        <p className={`${isMiva ? 'font-sans text-xs md:text-sm tracking-[0.35em] uppercase text-[#e8b4f4]' : 'font-script text-3xl md:text-4xl text-[#d9c8b9]'} drop-shadow-md`}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
