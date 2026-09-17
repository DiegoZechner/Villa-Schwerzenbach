import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-cream/50 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
