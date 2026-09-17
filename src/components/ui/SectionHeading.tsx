import React from 'react';

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeading({ title, subtitle, centered = true, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {subtitle && (
        <p className="font-script text-3xl md:text-4xl text-villa-blue mb-2">{subtitle}</p>
      )}
      <h2 className="font-serif text-3xl md:text-5xl text-bordeaux">{title}</h2>
      <div className={`w-16 h-1 bg-bordeaux mt-6 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
