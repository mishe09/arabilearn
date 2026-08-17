'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LanguageOption {
  value: string;
  label: string;
}

interface LanguageSelectorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: LanguageOption[];
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
}

export default function LanguageSelector({
  id,
  value,
  onChange,
  options,
  ariaLabel,
  className,
  disabled,
}: LanguageSelectorProps) {
  return (
    <div className={cn('relative', className)}>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className={cn(
          'w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-800 shadow-sm transition',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500',
          'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
