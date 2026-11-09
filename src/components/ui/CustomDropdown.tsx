'use client';
import { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface CustomDropdownProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  variant?: 'villa' | 'miva';
}

export default function CustomDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'Bitte wählen...',
  variant = 'villa',
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const isMiva = variant === 'miva';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full select-none">
      {label && (
        <label
          className={`block font-sans text-[10px] tracking-[0.25em] uppercase mb-2 ${
            isMiva ? 'font-light text-miva-lilac' : 'text-cream/60'
          }`}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between border-b pb-2 font-sans text-sm text-left transition-colors cursor-pointer ${
          isMiva
            ? isOpen
              ? 'border-miva-lilac text-white'
              : 'border-white/30 text-white hover:border-miva-lilac/70'
            : isOpen
            ? 'border-cream text-white'
            : 'border-white/25 text-white hover:border-cream/70'
        }`}
      >
        <span className={selectedOption ? 'text-white' : 'text-white/45'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Animated Chevron */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          } ${
            isMiva
              ? isOpen
                ? 'text-miva-lilac'
                : 'text-miva-lilac/70'
              : isOpen
              ? 'text-cream'
              : 'text-cream/60'
          }`}
        >
          <path d="M5 7.5L10 12.5L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown Popover Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 top-full mt-2.5 z-50 rounded-2xl p-2 shadow-[0_24px_60px_rgba(0,0,0,0.75)] border backdrop-blur-xl max-h-64 overflow-y-auto ${
            isMiva
              ? 'bg-[#26020e]/95 border-miva-lilac/30 text-white'
              : 'bg-[#14171b]/95 border-cream/25 text-white'
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? isMiva
                      ? 'bg-miva-lilac text-[#26020e] font-medium'
                      : 'bg-cream text-[#090a0c] font-medium'
                    : 'text-white/85 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-sans text-xs sm:text-sm tracking-wide">
                    {opt.label}
                  </span>
                  {opt.sublabel && (
                    <span
                      className={`font-sans text-[10px] tracking-[0.18em] uppercase mt-0.5 ${
                        isSelected
                          ? isMiva
                            ? 'text-[#26020e]/70'
                            : 'text-[#090a0c]/70'
                          : isMiva
                          ? 'text-miva-lilac/65'
                          : 'text-cream/55'
                      }`}
                    >
                      {opt.sublabel}
                    </span>
                  )}
                </div>

                {/* Active Dot Indicator */}
                {isSelected && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isMiva ? 'bg-[#26020e]' : 'bg-[#090a0c]'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
