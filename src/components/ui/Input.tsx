import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-espresso mb-1">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-bordeaux focus:border-transparent bg-white ${
            error ? 'border-red-500' : 'border-cream'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
