'use client';

import { ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageSwapButtonProps {
  onSwap: () => void;
  disabled?: boolean;
  className?: string;
}

export default function LanguageSwapButton({
  onSwap,
  disabled,
  className,
}: LanguageSwapButtonProps) {
  return (
    <button
      type="button"
      onClick={onSwap}
      disabled={disabled}
      aria-label="Swap languages"
      title={disabled ? 'Swap is disabled while Auto Detect is active' : 'Swap languages'}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition',
        'hover:border-indigo-400 hover:text-indigo-600 hover:shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
      )}
    >
      <ArrowRightLeft className="h-4 w-4" />
    </button>
  );
}
