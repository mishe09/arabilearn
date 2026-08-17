'use client';

// components/prayers/PrayerNavigation.tsx

import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, Circle, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrayerNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onRepeat: () => void;
  onListenAgain?: () => void;
  onMarkComplete: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  completed: boolean;
}

export default function PrayerNavigation({
  onPrevious,
  onNext,
  onRepeat,
  onListenAgain,
  onMarkComplete,
  isFirst = false,
  isLast = false,
  completed,
}: PrayerNavigationProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-amber-400/30 hover:bg-amber-400/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </button>

        <button
          type="button"
          onClick={onRepeat}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-amber-200/70 transition-colors hover:border-amber-400/30 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Repeat
        </button>

        {onListenAgain && (
          <button
            type="button"
            onClick={onListenAgain}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-amber-200/70 transition-colors hover:border-amber-400/30 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60"
          >
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            Listen Again
          </button>
        )}
      </div>

      <motion.button
        type="button"
        onClick={onMarkComplete}
        whileTap={{ scale: 0.97 }}
        aria-pressed={completed}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60 ${
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
      </motion.button>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-400/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-amber-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60"
      >
        Next
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
