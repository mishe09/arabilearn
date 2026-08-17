'use client';

import { History, RefreshCw, Copy, Check, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/lib/translator-client';
import type { HistoryItem } from '@/types/translator';
import TextToSpeechButton from './TextToSpeechButton';

interface HistoryPanelProps {
  items: HistoryItem[];
  isLoggedIn: boolean;
  onReopen: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-700"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

export default function HistoryPanel({
  items,
  isLoggedIn,
  onReopen,
  onDelete,
  onClear,
}: HistoryPanelProps) {
  return (
    <section
      aria-label="Translation history"
      className="mt-10 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Translation history</h2>
          {items.length > 0 && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-300">
              {items.length}
            </span>
          )}
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 transition hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 dark:text-gray-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear history
          </button>
        )}
      </div>

      {!isLoggedIn && (
        <p className="mb-3 rounded-lg bg-indigo-50 px-3 py-2 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          Sign in to keep your translation history on this device. Guest translations are shown for this session only.
        </p>
      )}

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-gray-400">
          No translations yet. Your recent translations will appear here.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-gray-100 bg-gray-50 p-3 transition hover:border-indigo-200 dark:border-gray-700 dark:bg-gray-700/40 dark:hover:border-indigo-600"
            >
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                    {item.sourceLanguage}
                  </span>
                  <span aria-hidden>→</span>
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                    {item.targetLanguage}
                  </span>
                </span>
                <span className="text-xs text-gray-400">{formatDate(item.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.sourceText}</p>
              <p
                className={cn(
                  'mt-1 text-sm font-medium text-gray-900 dark:text-gray-100',
                  item.targetLanguage === 'Arabic' && 'font-arabic text-right'
                )}
                dir={item.targetLanguage === 'Arabic' ? 'rtl' : 'ltr'}
                lang={item.targetLanguage === 'Arabic' ? 'ar' : 'ha'}
              >
                {item.translation}
              </p>
              <div className="mt-2 flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={() => onReopen(item)}
                  aria-label="Reopen this translation"
                  title="Reopen"
                  className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:hover:bg-gray-700"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <CopyButton text={item.translation} label="Copy this translation" />
                <TextToSpeechButton
                  text={item.translation}
                  lang={item.targetLanguage as 'Hausa' | 'Arabic'}
                  ariaLabel={`Play ${item.targetLanguage} translation`}
                />
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  aria-label="Delete this translation"
                  title="Delete"
                  className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 dark:hover:bg-gray-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
