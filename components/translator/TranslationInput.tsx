'use client';

import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TranslationInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  dir: 'ltr' | 'rtl';
  langAttr: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  label?: string;
  actions?: ReactNode;
  className?: string;
}

export default function TranslationInput({
  value,
  onChange,
  onClear,
  dir,
  langAttr,
  placeholder,
  maxLength = 4000,
  disabled,
  label,
  actions,
  className,
}: TranslationInputProps) {
  const hasText = value.length > 0;
  const overLimit = maxLength > 0 && value.length > maxLength;

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition',
        'focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100',
        'dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-2 dark:border-gray-700">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {label ?? 'Input'}
        </span>
        <div className="flex items-center gap-2">
          {actions}
          {hasText && onClear && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input text"
              title="Clear"
              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        lang={langAttr}
        placeholder={placeholder ?? 'Type or paste text here…'}
        maxLength={maxLength > 0 ? maxLength : undefined}
        disabled={disabled}
        aria-label={label ?? 'Translation input'}
        className={cn(
          'min-h-40 w-full flex-1 resize-y rounded-b-2xl bg-transparent p-4 text-lg leading-relaxed text-gray-900 placeholder-gray-400',
          'focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
          dir === 'rtl' ? 'text-right font-arabic' : 'text-left',
          'dark:text-gray-100'
        )}
      />

      <div className="flex items-center justify-between gap-2 px-4 pb-2">
        <span
          className={cn(
            'text-xs text-gray-400',
            overLimit && 'font-semibold text-red-500'
          )}
          aria-live="polite"
        >
          {value.length.toLocaleString()} / {maxLength.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
