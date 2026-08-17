'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, LoaderCircle, GraduationCap, Sparkles } from 'lucide-react';
import { cn, generateId } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { requestTranslation } from '@/lib/translator-client';
import { isSpeechRecognitionSupported } from '@/lib/speech';
import {
  getTranslationHistory,
  saveTranslation,
  deleteTranslation,
  clearTranslationHistory,
} from '@/lib/db';
import type {
  HistoryItem,
  LanguageCode,
  TranslateResponse,
  TranslationContext,
  UsageInfo,
} from '@/types/translator';
import { oppositeLanguage } from '@/types/translator';
import LanguageSelector from '@/components/translator/LanguageSelector';
import LanguageSwapButton from '@/components/translator/LanguageSwapButton';
import ContextSelector from '@/components/translator/ContextSelector';
import TranslationInput from '@/components/translator/TranslationInput';
import TranslationResult from '@/components/translator/TranslationResult';
import VoiceInput from '@/components/translator/VoiceInput';
import HistoryPanel from '@/components/translator/HistoryPanel';
import ConversationMode from '@/components/translator/ConversationMode';

function TranslatorInner() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [sourceLanguage, setSourceLanguage] = useState<string>('Hausa');
  const [targetLanguage, setTargetLanguage] = useState<string>('Arabic');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<TranslateResponse | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [context, setContext] = useState<TranslationContext>('General');
  const [learningMode, setLearningMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'translate' | 'conversation'>('translate');

  useEffect(() => {
    document.title = 'HausaArabia AI Translator';
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (isAuthenticated && user) {
      getTranslationHistory(user.id)
        .then((items) =>
          setHistory(
            items.map((item) => ({
              id: item.id,
              userId: item.userId,
              sourceLanguage: item.sourceLanguage,
              sourceText: item.sourceText,
              targetLanguage: item.targetLanguage,
              translation: item.translation,
              context: item.context,
              createdAt: item.createdAt,
            }))
          )
        )
        .catch(() => setHistory([]));
    } else {
      setHistory([]);
    }
  }, [authLoading, isAuthenticated, user]);

  const runTranslation = useCallback(
    async (
      text: string,
      source: string,
      target: string,
      overrides?: { context?: TranslationContext; learningMode?: boolean }
    ) => {
      const clean = text.trim();
      if (!clean) {
        setError('Please enter some text to translate.');
        return;
      }
      if (isTranslating) return;

      const ctx = overrides?.context ?? context;
      const lm = overrides?.learningMode ?? learningMode;

      setError(null);
      setIsTranslating(true);

      try {
        const { data, usage: usageData } = await requestTranslation({
          text: clean,
          sourceLanguage: source,
          targetLanguage: target,
          context: ctx,
          learningMode: lm,
        });
        setResult(data);
        if (usageData) setUsage(usageData);

        let effectiveSource: string | null =
          source === 'auto' ? (data.detectedSourceLanguage ?? null) : source;
        let effectiveTarget: string | null = target;

        if (data.detectedSourceLanguage) {
          effectiveSource = data.detectedSourceLanguage;
          effectiveTarget = oppositeLanguage(data.detectedSourceLanguage);
        } else if (target === 'auto' && effectiveSource) {
          effectiveTarget = oppositeLanguage(effectiveSource as LanguageCode);
        }

        if (effectiveSource && effectiveTarget) {
          setSourceLanguage(effectiveSource);
          setTargetLanguage(effectiveTarget);

          const item: HistoryItem = {
            id: generateId(),
            userId: user?.id,
            sourceLanguage: effectiveSource,
            sourceText: clean,
            targetLanguage: effectiveTarget,
            translation: data.translation,
            context: ctx,
            createdAt: new Date().toISOString(),
          };

          if (user?.id) {
            try {
              const saved = await saveTranslation({ ...item, userId: user.id });
              item.id = saved.id;
            } catch {
              // history persistence is best-effort
            }
            setHistory((prev) => [item, ...prev].slice(0, 100));
          } else {
            setHistory((prev) => [item, ...prev].slice(0, 50));
          }
        }
      } catch (e) {
        setError(
          e instanceof Error ? e.message : 'Unable to translate right now. Please try again.'
        );
      } finally {
        setIsTranslating(false);
      }
    },
    [context, isTranslating, learningMode, user?.id]
  );

  const handleTranslate = useCallback(() => {
    void runTranslation(inputText, sourceLanguage, targetLanguage);
  }, [inputText, sourceLanguage, targetLanguage, runTranslation]);

  const handleSourceChange = useCallback((value: string) => {
    if (value === 'auto') {
      setSourceLanguage('auto');
      setTargetLanguage('auto');
      return;
    }
    setSourceLanguage(value);
    setTargetLanguage((current) =>
      current === 'auto' || current === value
        ? oppositeLanguage(value as LanguageCode)
        : current
    );
  }, []);

  const handleTargetChange = useCallback((value: string) => {
    if (value === sourceLanguage) return;
    setTargetLanguage(value);
    if (sourceLanguage === 'auto') {
      setSourceLanguage(oppositeLanguage(value as LanguageCode));
    }
  }, [sourceLanguage]);

  const handleSwap = useCallback(() => {
    if (sourceLanguage === 'auto') return;
    const resolvedTarget =
      targetLanguage === 'auto'
        ? oppositeLanguage(sourceLanguage as LanguageCode)
        : (targetLanguage as LanguageCode);
    setSourceLanguage(resolvedTarget);
    setTargetLanguage(sourceLanguage);
  }, [sourceLanguage, targetLanguage]);

  const handleClear = useCallback(() => {
    setInputText('');
    setResult(null);
    setError(null);
  }, []);

  const handleSpeechResult = useCallback(
    (transcript: string) => {
      setInputText(transcript);
      void runTranslation(transcript, sourceLanguage, targetLanguage);
    },
    [runTranslation, sourceLanguage, targetLanguage]
  );

  const handleReopen = useCallback(
    (item: HistoryItem) => {
      setInputText(item.sourceText);
      setSourceLanguage(item.sourceLanguage);
      setTargetLanguage(item.targetLanguage);
      if (item.context) setContext(item.context as TranslationContext);
      void runTranslation(item.sourceText, item.sourceLanguage, item.targetLanguage, {
        context: (item.context as TranslationContext) ?? context,
      });
    },
    [context, runTranslation]
  );

  const handleDeleteHistory = useCallback(
    async (id: string) => {
      if (user?.id) {
        await deleteTranslation(id).catch(() => undefined);
      }
      setHistory((prev) => prev.filter((item) => item.id !== id));
    },
    [user?.id]
  );

  const handleClearHistory = useCallback(async () => {
    if (user?.id) {
      await clearTranslationHistory(user.id).catch(() => undefined);
    }
    setHistory([]);
  }, [user?.id]);

  const inputLang = sourceLanguage === 'Arabic' ? 'Arabic' : 'Hausa';
  const outputLang = targetLanguage === 'Arabic' ? 'Arabic' : 'Hausa';

  const sourceOptions = useMemo(
    () => [
      { value: 'Hausa', label: 'Hausa' },
      { value: 'Arabic', label: 'Arabic' },
      { value: 'auto', label: 'Auto Detect' },
    ],
    []
  );

  const targetOptions = useMemo(() => {
    if (sourceLanguage === 'auto') {
      return [{ value: 'auto', label: 'Auto (opposite)' }];
    }
    const list = [
      { value: 'Hausa', label: 'Hausa' },
      { value: 'Arabic', label: 'Arabic' },
    ];
    return list;
  }, [sourceLanguage]);

  const directionLabel = useMemo(() => {
    if (sourceLanguage === 'auto') return 'Auto Detect → Auto';
    const target = targetLanguage === 'auto' ? oppositeLanguage(sourceLanguage as LanguageCode) : targetLanguage;
    return `${sourceLanguage} → ${target}`;
  }, [sourceLanguage, targetLanguage]);

  const tabButton = (tab: 'translate' | 'conversation', label: string, icon: React.ReactNode) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      aria-pressed={activeTab === tab}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500',
        activeTab === tab
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      )}
    >
      {icon}
      {label}
    </button>
  );

  return (

  <div className="min-h-screen px-4 pb-16 pt-10 sm:px-6">
    <div className="mx-auto max-w-6xl">

      {/* Header */}
      <div className="mb-8 text-center">
        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          AI-powered · Secure · Two-way
        </span>

        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          HausaArabia{' '}
          <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            AI Translator
          </span>
        </h1>

        <p className="mx-auto mt-2 max-w-2xl text-amber-200/60">
          Translate naturally between Hausa and Arabic. Type or speak,
          listen to pronunciation, and practice real two-way conversations.
        </p>

        {usage && (
          <p className="mt-3 text-xs font-medium text-amber-200/40">
            {usage.remaining > 0
              ? `${usage.remaining.toLocaleString()} translations left today`
              : 'Daily translation limit reached'}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {tabButton(
          'translate',
          'Translator',
          <Languages className="h-4 w-4" />
        )}

        {tabButton(
          'conversation',
          'Conversation',
          <GraduationCap className="h-4 w-4" />
        )}
      </div>

      {activeTab === 'translate' ? (
        <motion.div
          key="translate"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Translator Container */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-4 shadow-lg backdrop-blur-sm sm:p-6">

            {/* Language Selectors */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">

              <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-white/10 border border-white/20 p-2 shadow-lg backdrop-blur-sm">
                <LanguageSelector
                  id="source-language"
                  value={sourceLanguage}
                  onChange={handleSourceChange}
                  options={sourceOptions}
                  ariaLabel="Source language"
                />
              </div>

              <div className="flex items-center justify-center gap-3 lg:pb-1">
                <span className="hidden text-sm font-medium text-amber-200/50 sm:block">
                  {directionLabel}
                </span>

                <LanguageSwapButton
                  onSwap={handleSwap}
                  disabled={sourceLanguage === 'auto'}
                />
              </div>

              <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-white/10 border border-white/20 p-2 shadow-lg backdrop-blur-sm">
                <LanguageSelector
                  id="target-language"
                  value={targetLanguage}
                  onChange={handleTargetChange}
                  options={targetOptions}
                  ariaLabel="Target language"
                  disabled={sourceLanguage === 'auto'}
                />
              </div>
            </div>

            {/* Context + Learning Mode */}
            <div className="mt-4 flex flex-col gap-3  border-white/20 pt-4">

              <div className="rounded-xl border  border-white/20 bg-white/10 p-3">
                <ContextSelector
                  value={context}
                  onChange={setContext}
                  disabled={isTranslating}
                />
              </div>

              <label className="inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-medium text-amber-100/80">

                <button
                  type="button"
                  role="switch"
                  aria-checked={learningMode}
                  onClick={() => {
                    const next = !learningMode;

                    setLearningMode(next);

                    if (result?.translation && inputText.trim()) {
                      void runTranslation(
                        inputText,
                        sourceLanguage,
                        targetLanguage,
                        {
                          learningMode: next,
                        }
                      );
                    }
                  }}
                  className={cn(
                    'relative h-6 w-11 rounded-full border transition-all',
                    learningMode
                      ? 'border-orange-400/40 bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'border-white/20 bg-white/10'
                  )}
                >
                  <span
                    className={cn(
                      'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                      learningMode && 'translate-x-5'
                    )}
                  />
                </button>

                <span>
                  Learning Mode

                  <span className="ml-1 text-xs text-amber-200/40">
                    (pronunciation · meaning · word breakdown)
                  </span>
                </span>
              </label>
            </div>

            {/* Translation Area */}
            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto_1fr]">

              {/* Input Box */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-2">
                <TranslationInput
                  value={inputText}
                  onChange={setInputText}
                  onClear={handleClear}
                  dir={inputLang === 'Arabic' ? 'rtl' : 'ltr'}
                  langAttr={inputLang === 'Arabic' ? 'ar' : 'ha'}
                  label="Input"
                  placeholder={
                    inputLang === 'Arabic'
                      ? 'اكتب أو ألصق النص هنا…'
                      : 'Rubuta ko manna rubutu anan…'
                  }
                  disabled={isTranslating}
                  actions={
                    <VoiceInput
                      lang={inputLang}
                      onResult={handleSpeechResult}
                      onTranscriptChange={setInputText}
                      disabled={isTranslating}
                      compact
                    />
                  }
                />
              </div>

              {/* Translate Button */}
              <div className="flex items-center justify-center gap-3 lg:flex-col">
                <button
                  type="button"
                  onClick={handleTranslate}
                  disabled={isTranslating || !inputText.trim()}
                  className={cn(
                    'inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-400/30 bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/30 transition-all',
                    'hover:from-amber-400 hover:to-orange-500 hover:shadow-xl hover:shadow-orange-950/40',
                    'focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-transparent',
                    'disabled:cursor-not-allowed disabled:opacity-40',
                    'lg:w-auto'
                  )}
                >
                  {isTranslating ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Translating…
                    </>
                  ) : (
                    <>
                      <Languages className="h-4 w-4" />
                      Translate
                    </>
                  )}
                </button>
              </div>

              {/* Output Box */}
              <div className="rounded-2xl border border-white/20 bg-white/10 p-2">
                <TranslationResult
                  result={result}
                  isLoading={isTranslating}
                  error={error}
                  targetLanguage={outputLang}
                  learningMode={learningMode}
                  hasInput={inputText.trim().length > 0}
                  onClear={handleClear}
                  onRetry={handleTranslate}
                />
              </div>
            </div>
          </div>

          {/* History */}
          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-2">
            <HistoryPanel
              items={history}
              isLoggedIn={!!user}
              onReopen={handleReopen}
              onDelete={handleDeleteHistory}
              onClear={handleClearHistory}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="conversation"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-6">
            <ConversationMode
              onTranslate={async (text, source, target) => {
                const { data } = await requestTranslation({
                  text,
                  sourceLanguage: source,
                  targetLanguage: target,
                  context,
                  learningMode: false,
                });

                return data;
              }}

              onPersist={(item) => {
                if (user?.id) {
                  void saveTranslation({
                    ...item,
                    userId: user.id,
                  })
                    .then((saved) => {
                      setHistory((prev) =>
                        [{ ...saved }, ...prev].slice(0, 100)
                      );
                    })
                    .catch(() => undefined);
                } else {
                  setHistory((prev) =>
                    [item, ...prev].slice(0, 50)
                  );
                }
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="mt-10 text-center text-xs text-amber-200/30">
        Translations are processed securely on the server.
        {!isSpeechRecognitionSupported() &&
          ' Voice input is not supported in this browser; typed translation still works.'}
      </footer>
    </div>
  </div>
    
  );
}

export default function TranslatorPage() {
  return <TranslatorInner />;
}
