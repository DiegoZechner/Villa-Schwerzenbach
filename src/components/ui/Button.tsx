import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
};

export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-sm';
  
  const variants = {
    primary: 'bg-bordeaux text-cream hover:bg-villa-red focus:ring-bordeaux',
    secondary: 'bg-villa-blue text-white hover:bg-blue-700 focus:ring-villa-blue',
    outline: 'border-2 border-bordeaux text-bordeaux hover:bg-bordeaux hover:text-cream',
    ghost: 'text-bordeaux hover:bg-cream-light',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  );
}
