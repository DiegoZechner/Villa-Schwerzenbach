'use client';
import { useState, useRef, useEffect } from 'react';

interface CustomDatePickerProps {
  label?: string;
  value: string; // 'YYYY-MM-DD'
  onChange: (dateStr: string) => void;
  minDate?: string; // 'YYYY-MM-DD'
  rangeStart?: string; // 'YYYY-MM-DD'
  rangeEnd?: string; // 'YYYY-MM-DD'
  placeholder?: string;
  variant?: 'villa' | 'miva';
}

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const MONTHS_DE = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

function parseYMD(str: string): Date | null {
  if (!str) return null;
  const parts = str.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplayDate(str: string): string {
  const d = parseYMD(str);
  if (!d) return '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  minDate,
  rangeStart,
  rangeEnd,
  placeholder = 'Datum wählen',
  variant = 'villa',
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedDate = parseYMD(value);
  const minDateObj = parseYMD(minDate || '') || (() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  })();

  const [viewYear, setViewYear] = useState<number>(() =>
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );
  const [viewMonth, setViewMonth] = useState<number>(() =>
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );

  // Sync calendar view when value or minDate changes externally
  useEffect(() => {
    const target = parseYMD(value) || parseYMD(minDate || '');
    if (target) {
      setViewYear(target.getFullYear());
      setViewMonth(target.getMonth());
    }
  }, [value, minDate]);

  // Close popover on outside click or Escape
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

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Build calendar grid for viewYear & viewMonth (Monday-first)
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const days: (Date | null)[] = [];
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(viewYear, viewMonth, d));
  }

  const todayYMD = toYMD(new Date());
  const minYMD = toYMD(minDateObj);

  const isMiva = variant === 'miva';

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

      {/* Trigger Field */}
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
        <span className={value ? 'text-white tracking-wider' : 'text-white/45'}>
          {value ? formatDisplayDate(value) : placeholder}
        </span>

        {/* Minimal Calendar Icon */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className={`w-4 h-4 shrink-0 transition-colors ${
            isMiva
              ? isOpen
                ? 'text-miva-lilac'
                : 'text-miva-lilac/70'
              : isOpen
              ? 'text-cream'
              : 'text-cream/60'
          }`}
        >
          <rect x="2.5" y="4" width="15" height="13.5" rx="2" />
          <path d="M6.5 2.5v3M13.5 2.5v3M2.5 8h15" strokeLinecap="round" />
        </svg>
      </button>

      {/* Compact Popover Calendar Widget */}
      {isOpen && (
        <div
          className={`absolute left-0 top-full mt-3 z-50 w-[276px] sm:w-[292px] rounded-2xl p-4 shadow-[0_24px_60px_rgba(0,0,0,0.75)] border backdrop-blur-xl transition-all duration-200 ${
            isMiva
              ? 'bg-[#26020e]/95 border-miva-lilac/30 text-white'
              : 'bg-[#14171b]/95 border-cream/25 text-white'
          }`}
        >
          {/* Header: Month / Year + Prev/Next */}
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/10">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Vorheriger Monat"
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors cursor-pointer ${
                isMiva
                  ? 'hover:bg-miva-lilac/20 text-miva-lilac'
                  : 'hover:bg-cream/15 text-cream'
              }`}
            >
              ‹
            </button>

            <span
              className={`text-sm tracking-[0.16em] uppercase ${
                isMiva
                  ? 'font-miva-display italic text-base text-white tracking-wider'
                  : 'font-villa-editorial text-cream'
              }`}
            >
              {MONTHS_DE[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Nächster Monat"
              className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors cursor-pointer ${
                isMiva
                  ? 'hover:bg-miva-lilac/20 text-miva-lilac'
                  : 'hover:bg-cream/15 text-cream'
              }`}
            >
              ›
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className={`font-sans text-[10px] tracking-[0.15em] uppercase ${
                  isMiva ? 'text-miva-lilac/65' : 'text-cream/50'
                }`}
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayObj, idx) => {
              if (!dayObj) {
                return <div key={`empty-${idx}`} className="h-8" />;
              }

              const ymd = toYMD(dayObj);
              const isDisabled = ymd < minYMD;
              const isSelected =
                ymd === value || ymd === rangeStart || ymd === rangeEnd;
              const isInRange =
                rangeStart &&
                rangeEnd &&
                ymd > rangeStart &&
                ymd < rangeEnd;
              const isToday = ymd === todayYMD;

              let cellStyle = 'text-white/85 hover:bg-white/10';
              if (isDisabled) {
                cellStyle = 'text-white/20 pointer-events-none';
              } else if (isSelected) {
                cellStyle = isMiva
                  ? 'bg-miva-lilac text-[#26020e] font-semibold shadow-sm'
                  : 'bg-cream text-[#090a0c] font-semibold shadow-sm';
              } else if (isInRange) {
                cellStyle = isMiva
                  ? 'bg-miva-lilac/20 text-white'
                  : 'bg-cream/20 text-white';
              } else if (isToday) {
                cellStyle = isMiva
                  ? 'border border-miva-lilac/50 text-miva-lilac hover:bg-miva-lilac/15'
                  : 'border border-cream/50 text-cream hover:bg-cream/15';
              }

              return (
                <button
                  key={ymd}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onChange(ymd);
                    setIsOpen(false);
                  }}
                  className={`h-8 w-full rounded-lg font-sans text-xs flex items-center justify-center transition-all cursor-pointer ${cellStyle}`}
                >
                  {dayObj.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer helper */}
          {value && (
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase">
              <span className={isMiva ? 'text-miva-lilac/80' : 'text-cream/70'}>
                {formatDisplayDate(value)}
              </span>
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className="text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
