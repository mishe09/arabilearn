'use client';

import { cn } from '@/lib/utils';
import { TRANSLATION_CONTEXTS } from '@/types/translator';
import type { TranslationContext } from '@/types/translator';

interface ContextSelectorProps {
  value: TranslationContext;
  onChange: (value: TranslationContext) => void;
  disabled?: boolean;
}

const labels: Record<TranslationContext, string> = {
  General: 'General',
  Conversation: 'Conversation',
  Formal: 'Formal',
  Educational: 'Educational',
  Travel: 'Travel',
  Business: 'Business',
};

export default function ContextSelector({ value, onChange, disabled }: ContextSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Translation context">
      <span className="mr-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Context
      </span>
      {TRANSLATION_CONTEXTS.map((context) => {
        const selected = context === value;
        return (
          <button
            key={context}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={disabled}
            onClick={() => onChange(context)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-xs font-medium transition',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1',
              selected
                ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-indigo-500',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {labels[context]}
          </button>
        );
      })}
    </div>
  );
}
