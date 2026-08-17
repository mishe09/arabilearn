// components/prayers/PrayerStepCard.tsx

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import type { PrayerStep } from '@/types/prayers';
import PrayerVerificationBadge from './PrayerVerificationBadge';

interface PrayerStepCardProps {
  step: PrayerStep;
  prayerSlug: string;
  completed?: boolean;
  index?: number;
}

export default function PrayerStepCard({
  step,
  prayerSlug,
  completed = false,
  index = 0,
}: PrayerStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Link
        href={`/dashboard/prayers/${prayerSlug}/${step.slug}`}
        className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60 sm:p-5 ${
          completed
            ? 'border-amber-400/30 bg-amber-400/10'
            : 'border-white/20 bg-white/10 hover:border-amber-400/30 hover:bg-amber-400/10'
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold sm:h-10 sm:w-10 ${
            completed
              ? 'border-amber-400/40 bg-amber-400/20 text-amber-200'
              : 'border-white/20 bg-white/10 text-white/70'
          }`}
        >
          {completed ? (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          ) : (
            step.order
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-sm font-semibold text-white sm:text-base">{step.titleHausa}</h3>
            <span dir="rtl" lang="ar" className="text-sm text-amber-200/70 sm:text-base">
              {step.titleArabic}
            </span>
          </div>
          <p className="mt-1 line-clamp-1 text-xs text-white/50 sm:text-sm">
            {step.instructionHausa}
          </p>
        </div>

        <div className="hidden shrink-0 sm:block">
          <PrayerVerificationBadge verified={step.verified} />
        </div>

        <ChevronRight className="h-4 w-4 shrink-0 text-amber-200/40" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
