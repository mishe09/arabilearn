'use client';

import { useCallback, useState } from 'react';
import { Copy, Check, LoaderCircle, CircleAlert, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/translator-client';
import { isRtlLanguage } from '@/types/translator';
import type { TranslateResponse } from '@/types/translator';
import TextToSpeechButton from './TextToSpeechButton';

interface TranslationResultProps {
  result: TranslateResponse | null;
  isLoading: boolean;
  error: string | null;
  targetLanguage: string;
  learningMode: boolean;
  hasInput: boolean;
  onClear: () => void;
  onRetry: () => void;
  className?: string;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={copy}
      disabled={!text}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition',
        'hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500',
        'disabled:cursor-not-allowed disabled:opacity-40',
        'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300',
        copied && 'border-green-500 text-green-600'
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

export default function TranslationResult({
  result,
  isLoading,
  error,
  targetLanguage,
  learningMode,
  hasInput,
  onClear,
  onRetry,
  className,
}: TranslationResultProps) {
  const isRtl = isRtlLanguage(targetLanguage);
  const targetLangCode = targetLanguage === 'Arabic' ? 'Arabic' : 'Hausa';

  return (
    <div
      className={cn(
        'flex min-h-72 flex-col rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-2 dark:border-gray-700">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {targetLanguage === 'Arabic' ? 'Arabic' : 'Hausa'} translation
        </span>
        <div className="flex items-center gap-2">
          {result?.translation && (
            <>
              <TextToSpeechButton text={result.translation} lang={targetLangCode} />
              <CopyButton
                text={result.translation}
                label={`Copy ${targetLanguage} translation`}
              />
            </>
          )}
          {hasInput && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear translation result"
              title="Clear"
              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {isLoading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
            <LoaderCircle className="h-7 w-7 animate-spin text-indigo-500" />
            <p className="text-sm font-medium">Translating…</p>
          </div>
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center" role="alert">
            <CircleAlert className="h-7 w-7 text-red-500" />
            <p className="max-w-sm text-sm text-red-600 dark:text-red-400">{error}</p>
            <button
              type="button"
              onClick={onRetry}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              Try again
            </button>
          </div>
        ) : result?.translation ? (
          <div className="animate-fade-in flex flex-1 flex-col">
            <p
              dir={isRtl ? 'rtl' : 'ltr'}
              lang={targetLangCode.toLowerCase()}
              className={cn(
                'text-xl leading-relaxed text-gray-900 dark:text-gray-100',
                isRtl ? 'break-words font-arabic text-right' : 'text-left'
              )}
              aria-live="polite"
            >
              {result.translation}
            </p>

            {learningMode && (
              <div className="mt-6 space-y-5 border-t border-gray-100 pt-5 dark:border-gray-700">
                {result.pronunciation && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Pronunciation
                    </h4>
                    <p className="text-base text-gray-700 dark:text-gray-300">{result.pronunciation}</p>
                  </div>
                )}
                {result.meaning && (
                  <div>
                    <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Meaning
                    </h4>
                    <p className="text-base text-gray-700 dark:text-gray-300">{result.meaning}</p>
                  </div>
                )}
                {result.wordBreakdown && result.wordBreakdown.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Word breakdown
                    </h4>
                    <ul className="space-y-2">
                      {result.wordBreakdown.map((item, index) => (
                        <li
                          key={`${item.word}-${index}`}
                          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50"
                        >
                          <span className="font-medium text-gray-800 dark:text-gray-200">{item.word}</span>
                          <span className="text-right text-gray-600 dark:text-gray-300">
                            {item.translation}
                            {item.pronunciation && (
                              <span className="ml-2 block text-xs text-gray-400">{item.pronunciation}</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <Sparkles className="h-7 w-7 text-gray-300 dark:text-gray-600" />
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {hasInput
                ? 'Press Translate to see the result here.'
                : 'Translation will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
