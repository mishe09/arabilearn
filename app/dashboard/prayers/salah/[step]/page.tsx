'use client';

// app/dashboard/prayers/salah/[step]/page.tsx

import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import PrayerHeader from '@/components/prayers/PrayerHeader';
import PrayerLanguageToggle from '@/components/prayers/PrayerLanguageToggle';
import PrayerLine from '@/components/prayers/PrayerLine';
import PrayerProgress from '@/components/prayers/PrayerProgress';
import PrayerNavigation from '@/components/prayers/PrayerNavigation';
import PrayerVerificationBadge from '@/components/prayers/PrayerVerificationBadge';
import { salah } from '@/data/prayers';
import type { PrayerLanguageMode } from '@/types/prayers';

const PROGRESS_KEY = 'lingua-bridge:prayer-progress:salah';

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

export default function SalahStepPage() {
  const params = useParams<{ step: string }>();
  const router = useRouter();
  const lineContainerRef = useRef<HTMLDivElement | null>(null);

  const stepIndex = useMemo(
    () => salah.steps.findIndex((s) => s.slug === params.step),
    [params.step],
  );
  const step = stepIndex >= 0 ? salah.steps[stepIndex] : undefined;
  const previousStep = stepIndex > 0 ? salah.steps[stepIndex - 1] : undefined;
  const nextStep = stepIndex >= 0 && stepIndex < salah.steps.length - 1 ? salah.steps[stepIndex + 1] : undefined;

  const [languageMode, setLanguageMode] = useState<PrayerLanguageMode>('both');
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [repeatKey, setRepeatKey] = useState(0);

  useEffect(() => {
    setCompletedIds(readCompletedIds());
  }, []);

  if (!step) {
    return (
      <div>
        <PrayerHeader
          title="Step not found"
          description="This step doesn't exist in the Salah journey."
          backHref="/dashboard/prayers/salah"
          backLabel="Learn Salah"
        />
      </div>
    );
  }

  const completed = completedIds.includes(step.id);

  const toggleComplete = () => {
    const next = completed
      ? completedIds.filter((id) => id !== step.id)
      : [...completedIds, step.id];
    setCompletedIds(next);
    writeCompletedIds(next);
  };

  const handleRepeat = () => {
    setRepeatKey((k) => k + 1);
    lineContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleListenAgain = () => {
    const container = lineContainerRef.current;
    if (!container) return;
    const audios = Array.from(container.querySelectorAll('audio')).filter((a) => a.src);
    if (audios.length === 0) return;

    let i = 0;
    const playNext = () => {
      if (i >= audios.length) return;
      const audio = audios[i];
      audio.currentTime = 0;
      const onEnded = () => {
        audio.removeEventListener('ended', onEnded);
        i += 1;
        playNext();
      };
      audio.addEventListener('ended', onEnded);
      audio.play();
    };
    playNext();
  };

  const goToStep = (slug: string) => {
    router.push(`/dashboard/prayers/salah/${slug}`);
  };

  return (
    <div>
      <PrayerHeader
        title={step.titleHausa}
        icon={BookOpen}
        backHref="/dashboard/prayers/salah"
        backLabel="Learn Salah"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span dir="rtl" lang="ar" className="text-xl text-amber-200/80">
            {step.titleArabic}
          </span>
          <PrayerVerificationBadge verified={step.verified} />
        </div>
      </PrayerHeader>

      <PrayerProgress
        current={stepIndex + 1}
        total={salah.steps.length}
        className="mb-6 max-w-sm"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        lang="ha"
        className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/70 sm:text-base"
      >
        {step.instructionHausa}
      </motion.p>

      <div className="mb-6">
        <PrayerLanguageToggle value={languageMode} onChange={setLanguageMode} />
      </div>

      <div key={repeatKey} ref={lineContainerRef} className="mb-8 space-y-3">
        {step.lines.map((line, index) => (
          <PrayerLine key={line.id} line={line} languageMode={languageMode} index={index} />
        ))}
      </div>

      <PrayerNavigation
        onPrevious={previousStep ? () => goToStep(previousStep.slug) : undefined}
        onNext={nextStep ? () => goToStep(nextStep.slug) : undefined}
        onRepeat={handleRepeat}
        onListenAgain={handleListenAgain}
        onMarkComplete={toggleComplete}
        isFirst={!previousStep}
        isLast={!nextStep}
        completed={completed}
      />
    </div>
  );
}
