'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Send, ArrowRightLeft, Trash2, MessageSquare, LoaderCircle, CircleAlert } from 'lucide-react';
import { cn, generateId } from '@/lib/utils';
import { speakWithVoice } from '@/lib/speech';
import type {
  ConversationMessage,
  HistoryItem,
  LanguageCode,
  TranslateResponse,
} from '@/types/translator';
import VoiceInput from './VoiceInput';
import TextToSpeechButton from './TextToSpeechButton';

interface ConversationModeProps {
  onTranslate: (
    text: string,
    source: LanguageCode,
    target: LanguageCode
  ) => Promise<TranslateResponse>;
  onPersist?: (item: HistoryItem) => void;
  disabled?: boolean;
}

const SPEAKER_LANG: Record<'A' | 'B', LanguageCode> = {
  A: 'Hausa',
  B: 'Arabic',
};

export default function ConversationMode({
  onTranslate,
  onPersist,
  disabled,
}: ConversationModeProps) {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<'A' | 'B'>('A');
  const [inputText, setInputText] = useState('');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = chatRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages]);

  const submitTurn = useCallback(
    async (text: string, speaker: 'A' | 'B') => {
      const clean = text.trim();
      if (!clean || disabled) return;

      const source = SPEAKER_LANG[speaker];
      const target: LanguageCode = source === 'Hausa' ? 'Arabic' : 'Hausa';
      const id = generateId();

      const message: ConversationMessage = {
        id,
        speaker,
        sourceLanguage: source,
        sourceText: clean,
        targetLanguage: target,
        translation: '',
        createdAt: Date.now(),
        status: 'translating',
      };

      setMessages((prev) => [...prev, message]);
      setSubmitting(true);
      setError(null);

      try {
        const result = await onTranslate(clean, source, target);
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, translation: result.translation, status: 'done' } : m))
        );
        onPersist?.({
          id: generateId(),
          sourceLanguage: source,
          sourceText: clean,
          targetLanguage: target,
          translation: result.translation,
          createdAt: new Date().toISOString(),
        });
        if (autoSpeak) {
          void speakWithVoice(result.translation, target);
        }
      } catch (e) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: 'error' } : m))
        );
        setError(e instanceof Error ? e.message : 'Unable to translate right now. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
    [autoSpeak, disabled, onTranslate, onPersist]
  );

  const handleMicResult = useCallback(
    (transcript: string) => {
      setInputText('');
      void submitTurn(transcript, activeSpeaker);
    },
    [activeSpeaker, submitTurn]
  );

  const handleSend = useCallback(() => {
    if (!inputText.trim() || submitting) return;
    const text = inputText;
    setInputText('');
    void submitTurn(text, activeSpeaker);
  }, [inputText, submitting, activeSpeaker, submitTurn]);

  const switchSpeaker = useCallback(() => {
    setActiveSpeaker((current) => (current === 'A' ? 'B' : 'A'));
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  const activeLang = SPEAKER_LANG[activeSpeaker];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-indigo-500" />
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Conversation mode</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={(e) => setAutoSpeak(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Auto-play translations
          </label>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearConversation}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 transition hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 dark:text-gray-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      <div
        ref={chatRef}
        aria-live="polite"
        aria-label="Conversation messages"
        className="flex h-96 flex-col gap-3 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <MessageSquare className="h-8 w-8 text-gray-300 dark:text-gray-600" />
            <p className="max-w-sm text-sm text-gray-400 dark:text-gray-500">
              Hold the microphone or type below. Each turn is recognized, translated, and shown as a
              conversation bubble in both languages.
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isA = message.speaker === 'A';
            return (
              <div
                key={message.id}
                className={cn(
                  'flex w-full max-w-[85%] flex-col gap-1',
                  isA ? 'self-start items-start' : 'self-end items-end'
                )}
              >
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-medium',
                    isA
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                  )}
                >
                  {isA ? 'Hausa speaker' : 'Arabic speaker'}
                </span>
                <div
                  className={cn(
                    'w-full rounded-2xl px-3.5 py-2.5 shadow-sm',
                    isA
                      ? 'rounded-tl-sm border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20'
                      : 'rounded-tr-sm border border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20'
                  )}
                >
                  <p
                    dir={message.sourceLanguage === 'Arabic' ? 'rtl' : 'ltr'}
                    lang={message.sourceLanguage === 'Arabic' ? 'ar' : 'ha'}
                    className={cn(
                      'text-sm text-gray-800 dark:text-gray-200',
                      message.sourceLanguage === 'Arabic' && 'font-arabic text-right'
                    )}
                  >
                    {message.sourceText}
                  </p>
                  <div className="mt-1.5 flex items-start gap-2">
                    {message.status === 'translating' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                        Translating…
                      </span>
                    ) : message.status === 'error' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-red-500">
                        <CircleAlert className="h-3.5 w-3.5" />
                        Translation failed
                      </span>
                    ) : (
                      <>
                        <p
                          dir={message.targetLanguage === 'Arabic' ? 'rtl' : 'ltr'}
                          lang={message.targetLanguage === 'Arabic' ? 'ar' : 'ha'}
                          className={cn(
                            'text-sm font-medium text-gray-900 dark:text-gray-100',
                            message.targetLanguage === 'Arabic' && 'font-arabic text-right'
                          )}
                        >
                          {message.translation}
                        </p>
                        <TextToSpeechButton
                          text={message.translation}
                          lang={message.targetLanguage}
                          className="-ml-1 -mt-1"
                        />
                      </>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">
                  {new Date(message.createdAt).toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            );
          })
        )}
      </div>

      {error && (
        <p className="mx-4 mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 dark:bg-red-900/30 dark:text-red-400" role="alert">
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 border-t border-gray-100 p-3 dark:border-gray-700">
        <button
          type="button"
          onClick={switchSpeaker}
          disabled={disabled || submitting}
          aria-label="Switch active speaker"
          title="Switch active speaker"
          className={cn(
            'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
            activeSpeaker === 'A'
              ? 'border-emerald-500 bg-emerald-500'
              : 'border-indigo-500 bg-indigo-500'
          )}
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-white',
                activeSpeaker === 'A' ? 'bg-emerald-500' : 'bg-indigo-500'
              )}
            >
              {activeLang}
            </span>
            is the active speaker
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              dir={activeLang === 'Arabic' ? 'rtl' : 'ltr'}
              lang={activeLang === 'Arabic' ? 'ar' : 'ha'}
              disabled={disabled || submitting}
              placeholder={`Type in ${activeLang}…`}
              aria-label={`Type in ${activeLang}`}
              className={cn(
                'min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 shadow-sm transition placeholder-gray-400',
                'focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100',
                'disabled:cursor-not-allowed disabled:opacity-60',
                'dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100',
                activeLang === 'Arabic' && 'font-arabic text-right'
              )}
            />
            <VoiceInput
              lang={activeLang}
              onResult={handleMicResult}
              onTranscriptChange={setInputText}
              disabled={disabled || submitting}
              ariaLabel={`Start ${activeLang} speech input`}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputText.trim() || submitting}
              aria-label="Send message"
              className={cn(
                'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition',
                'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-40'
              )}
            >
              {submitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
