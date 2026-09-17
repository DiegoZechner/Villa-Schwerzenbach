import React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  category: 'Classic' | 'Comfort' | 'Superior' | 'Deluxe' | 'Suite' | string;
};

export function Badge({ category, className = '', ...props }: BadgeProps) {
  const getBadgeStyle = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'classic': return 'bg-cream text-espresso';
      case 'comfort': return 'bg-villa-blue text-white';
      case 'superior': return 'bg-bordeaux text-cream';
      case 'deluxe': return 'bg-yellow-600 text-white'; // Gold placeholder
      case 'suite': return 'bg-espresso text-cream';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeStyle(category)} ${className}`} {...props}>
      {category}
    </span>
  );
}
