'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Mic, Square, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getSpeechRecognition,
  isSpeechRecognitionSupported,
  speechRecognitionLang,
} from '@/lib/speech';
import type { LanguageCode } from '@/types/translator';

interface VoiceInputProps {
  lang: LanguageCode;
  onResult: (transcript: string) => void;
  onTranscriptChange?: (transcript: string) => void;
  disabled?: boolean;
  size?: 'md' | 'lg';
  ariaLabel?: string;
  className?: string;
  compact?: boolean;
}

function friendlyError(error: string): string {
  switch (error) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'Microphone access was denied. Please allow microphone access in your browser settings and try again.';
    case 'no-speech':
      return 'No speech was detected. Please try speaking again.';
    case 'audio-capture':
      return 'No microphone was found. Please connect a microphone and try again.';
    case 'network':
      return 'Speech recognition failed due to a network error. Please try again.';
    case 'aborted':
      return '';
    default:
      return 'Speech recognition failed. Please try again.';
  }
}

export default function VoiceInput({
  lang,
  onResult,
  onTranscriptChange,
  disabled,
  size = 'md',
  ariaLabel,
  className,
  compact,
}: VoiceInputProps) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalRef = useRef('');
  const listeningRef = useRef(false);
  const onResultRef = useRef(onResult);
  const onTranscriptChangeRef = useRef(onTranscriptChange);
  const langRef = useRef(lang);

  useEffect(() => {
    onResultRef.current = onResult;
    onTranscriptChangeRef.current = onTranscriptChange;
  }, [onResult, onTranscriptChange]);

  useEffect(() => {
    langRef.current = lang;
    if (listeningRef.current && recognitionRef.current) {
      const wasListening = listeningRef.current;
      recognitionRef.current.abort();
      listeningRef.current = false;
      setListening(false);
      if (wasListening) {
        startRecognition();
      }
    }
  }, [lang]);

  useEffect(() => {
    setSupported(isSpeechRecognitionSupported());
  }, []);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      listeningRef.current = false;
    };
  }, []);

  const emitTranscript = useCallback((final: string, interim: string) => {
    const combined = `${final}${interim ? ` ${interim}` : ''}`.trim();
    if (combined) onTranscriptChangeRef.current?.(combined);
  }, []);

  const startRecognition = useCallback(() => {
    const RecognitionCtor = getSpeechRecognition();
    if (!RecognitionCtor) {
      setError('Voice input is not supported in this browser. You can still type your text.');
      setSupported(false);
      return;
    }

    setError(null);
    setStarting(true);

    const recognition = new RecognitionCtor();
    recognitionRef.current = recognition;
    recognition.lang = speechRecognitionLang(langRef.current);
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setStarting(false);
      setListening(true);
      listeningRef.current = true;
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalRef.current = `${finalRef.current} ${result[0].transcript}`.trim();
        } else {
          interim += result[0].transcript;
        }
      }
      emitTranscript(finalRef.current, interim);
    };

    recognition.onerror = (event) => {
      const message = friendlyError(event.error);
      if (message) setError(message);
      setListening(false);
      listeningRef.current = false;
      setStarting(false);
    };

    recognition.onend = () => {
      const finalText = finalRef.current.trim();
      setListening(false);
      listeningRef.current = false;
      setStarting(false);
      if (finalText) {
        onResultRef.current(finalText);
      }
    };

    try {
      recognition.start();
    } catch {
      setStarting(false);
      setError('Could not start voice input. Please try again.');
    }
  }, [emitTranscript]);

  const toggle = useCallback(() => {
    if (disabled) return;
    if (listeningRef.current) {
      finalRef.current = '';
      recognitionRef.current?.stop();
      setListening(false);
      listeningRef.current = false;
      return;
    }
    finalRef.current = '';
    startRecognition();
  }, [disabled, startRecognition]);

  const canRecord = supported !== false && !disabled;

  const baseSize = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <button
        type="button"
        onClick={toggle}
        disabled={!canRecord}
        aria-label={
          listening
            ? `Stop ${lang} speech input`
            : ariaLabel ?? `Start ${lang} speech input`
        }
        title={listening ? 'Stop recording' : `Speak in ${lang}`}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
          baseSize,
          listening
            ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
            : canRecord
              ? 'border border-gray-200 bg-white text-gray-600 shadow-sm hover:border-indigo-400 hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
              : 'cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-300 dark:border-gray-700 dark:bg-gray-700',
          listening && 'recording-pulse'
        )}
      >
        {starting ? (
          <LoaderCircle className="h-5 w-5 animate-spin" />
        ) : listening ? (
          <Square className="h-4 w-4 fill-current" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </button>

      {listening && (
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-500" aria-live="polite">
          <span className="flex h-3 items-end gap-0.5">
            <span className="sound-bar" />
            <span className="sound-bar" />
            <span className="sound-bar" />
          </span>
          Listening…
        </span>
      )}

      {error && (
        <span className="mt-1 max-w-56 text-center text-xs text-red-500" role="alert">
          {error}
        </span>
      )}

      {!compact && supported === false && (
        <span className="mt-1 text-xs text-gray-400">
          Voice input unavailable in this browser
        </span>
      )}
    </div>
  );
}
