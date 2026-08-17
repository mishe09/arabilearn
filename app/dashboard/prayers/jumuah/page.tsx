'use client';

// app/dashboard/prayers/jumuah/page.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import PrayerHeader from '@/components/prayers/PrayerHeader';
import PrayerLanguageToggle from '@/components/prayers/PrayerLanguageToggle';
import PrayerLine from '@/components/prayers/PrayerLine';
import PrayerProgress from '@/components/prayers/PrayerProgress';
import PrayerVerificationBadge from '@/components/prayers/PrayerVerificationBadge';
import { jumuah } from '@/data/prayers';
import type { PrayerLanguageMode } from '@/types/prayers';

const PROGRESS_KEY = 'lingua-bridge:prayer-progress:jumuah';

function readCompletedIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

function writeCompletedIds(ids: string[]) {
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(ids));
}

export default function JumuahPage() {
  const [languageMode, setLanguageMode] = useState<PrayerLanguageMode>('both');
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    setCompletedIds(readCompletedIds());
  }, []);

  const toggleComplete = (stepId: string) => {
    const next = completedIds.includes(stepId)
      ? completedIds.filter((id) => id !== stepId)
      : [...completedIds, stepId];
    setCompletedIds(next);
    writeCompletedIds(next);
  };

  return (
    <div>
      <PrayerHeader
        title="Jumu'ah"
        subtitleHausa="Sallar Jumu'a"
        description="What Jumu'ah is, how to carry yourself during the khutbah, and how the prayer itself connects to Salah."
        icon={Users}
        backHref="/dashboard/prayers"
        backLabel="Prayer Learning"
      >
        <PrayerProgress current={completedIds.length} total={jumuah.steps.length} className="max-w-xs" />
      </PrayerHeader>

      <div className="mb-6">
        <PrayerLanguageToggle value={languageMode} onChange={setLanguageMode} />
      </div>

      <div className="space-y-6">
        {jumuah.steps.map((step, index) => {
          const completed = completedIds.includes(step.id);
          return (
            <motion.section
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`rounded-2xl border p-4 sm:p-6 ${
                completed ? 'border-amber-400/30 bg-amber-400/10' : 'border-white/20 bg-white/10'
              }`}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h2 className="text-lg font-semibold text-white">{step.titleHausa}</h2>
                    <span dir="rtl" lang="ar" className="text-base text-amber-200/70">
                      {step.titleArabic}
                    </span>
                  </div>
                  <p lang="ha" className="mt-1 text-sm leading-relaxed text-white/60">
                    {step.instructionHausa}
                  </p>
                </div>
                <PrayerVerificationBadge verified={step.verified} />
              </div>

              <div className="space-y-3">
                {step.lines.map((line, lineIndex) => (
                  <PrayerLine key={line.id} line={line} languageMode={languageMode} index={lineIndex} />
                ))}
              </div>

              {step.slug === 'jumuah-prayer' && (
                <Link
                  href="/dashboard/prayers/salah/suratul-fatiha"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-300 hover:gap-2.5 transition-all"
                >
                  Review the core recitations in the Salah module
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}

              <button
                type="button"
                onClick={() => toggleComplete(step.id)}
                aria-pressed={completed}
                className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60 ${
                  completed
                    ? 'border-amber-400/40 bg-amber-400/20 text-amber-200'
                    : 'border-white/20 bg-white/10 text-white hover:border-amber-400/30 hover:bg-amber-400/10'
                }`}
              >
                {completed ? (
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Circle className="h-4 w-4" aria-hidden="true" />
                )}
                {completed ? 'Completed' : 'Mark Complete'}
              </button>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
