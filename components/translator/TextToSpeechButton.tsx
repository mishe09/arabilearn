'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2, Square, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { speakWithVoice, stopSpeaking } from '@/lib/speech';
import type { LanguageCode } from '@/types/translator';

interface TextToSpeechButtonProps {
  text: string;
  lang: LanguageCode;
  ariaLabel?: string;
  className?: string;
  variant?: 'icon' | 'pill';
  autoPlay?: boolean;
  onAutoPlayError?: (message: string) => void;
}

export default function TextToSpeechButton({
  text,
  lang,
  ariaLabel,
  className,
  variant = 'icon',
  autoPlay = false,
  onAutoPlayError,
}: TextToSpeechButtonProps) {
  const [state, setState] = useState<'idle' | 'starting' | 'speaking'>('idle');
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stopSpeaking();
    };
  }, []);

  const play = useCallback(() => {
    if (!text) return;
    setError(null);
    setState('starting');
    void speakWithVoice(text, lang, {
      onStart: () => {
        if (mountedRef.current) setState('speaking');
      },
      onEnd: () => {
        if (mountedRef.current) setState('idle');
      },
      onError: () => {
        const message = 'Audio playback is not supported in this browser.';
        if (mountedRef.current) {
          setState('idle');
          setError(message);
        }
        onAutoPlayError?.(message);
      },
    });
  }, [text, lang, onAutoPlayError]);

  const toggle = useCallback(() => {
    if (state === 'speaking' || state === 'starting') {
      stopSpeaking();
      setState('idle');
      return;
    }
    play();
  }, [state, play]);

  useEffect(() => {
    if (autoPlay && text) {
      play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  const label =
    ariaLabel ??
    (lang === 'Arabic' ? 'Play Arabic translation' : 'Play Hausa translation');

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={!text}
        aria-label={label}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition',
          'hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200',
          state === 'speaking' && 'border-indigo-400 text-indigo-600 dark:text-indigo-300',
          className
        )}
      >
        {state === 'starting' ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : state === 'speaking' ? (
          <Square className="h-4 w-4 fill-current" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
        {state === 'speaking' ? 'Stop' : 'Listen'}
      </button>
    );
  }

  return (
    <div className={cn('inline-flex items-center', className)}>
      <button
        type="button"
        onClick={toggle}
        disabled={!text}
        aria-label={label}
        title={state === 'speaking' ? 'Stop' : 'Listen'}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition',
          'hover:border-indigo-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'disabled:cursor-not-allowed disabled:opacity-40',
          'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300',
          state === 'speaking' && 'border-indigo-400 text-indigo-600 dark:text-indigo-300'
        )}
      >
        {state === 'starting' ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : state === 'speaking' ? (
          <Square className="h-4 w-4 fill-current" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </button>
      {error && <span className="sr-only" role="alert">{error}</span>}
    </div>
  );
}
