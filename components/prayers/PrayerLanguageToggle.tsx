'use client';

// components/prayers/PrayerLanguageToggle.tsx

import { motion } from 'framer-motion';
import type { PrayerLanguageMode } from '@/types/prayers';

interface PrayerLanguageToggleProps {
  value: PrayerLanguageMode;
  onChange: (mode: PrayerLanguageMode) => void;
  className?: string;
}

const OPTIONS: { mode: PrayerLanguageMode; label: string }[] = [
  { mode: 'arabic', label: 'Arabic' },
  { mode: 'hausa', label: 'Hausa' },
  { mode: 'both', label: 'Both' },
];

export default function PrayerLanguageToggle({
  value,
  onChange,
  className = '',
}: PrayerLanguageToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Display language"
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = value === option.mode;
        return (
          <button
            key={option.mode}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.mode)}
            className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60 ${
              active ? 'text-white' : 'text-amber-200/60 hover:text-amber-200/80'
            }`}
          >
            {active && (
              <motion.span
                layoutId="prayer-language-toggle-pill"
                className="absolute inset-0 rounded-full bg-amber-400/20 border border-amber-400/30"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
