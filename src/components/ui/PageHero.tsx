import Image from 'next/image';

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-espresso/40 z-10" />
      <div className="relative z-20 text-center px-4">
        <h1 className="font-serif text-5xl md:text-7xl text-cream mb-4 drop-shadow-lg uppercase tracking-widest">
          {title}
        </h1>
        <p className="font-sans text-sm md:text-base tracking-[0.4em] uppercase text-cream-light opacity-90 drop-shadow-md">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

