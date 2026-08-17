// components/prayers/PrayerCard.tsx

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, LucideIcon } from 'lucide-react';
import type { PrayerModuleSummary } from '@/types/prayers';

interface PrayerCardProps {
  module: PrayerModuleSummary;
  icon: LucideIcon;
  completedSteps?: number;
  index?: number;
}

export default function PrayerCard({ module, icon: Icon, completedSteps = 0, index = 0 }: PrayerCardProps) {
  const comingSoon = module.status === 'coming_soon';
  const hasStarted = completedSteps > 0;
  const isComplete = module.totalSteps ? completedSteps >= module.totalSteps : false;

  const ctaLabel = comingSoon ? 'Coming soon' : isComplete ? 'Review' : hasStarted ? 'Continue' : 'Start Learning';

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={comingSoon ? undefined : { y: -3 }}
      className={`group relative flex h-full flex-col justify-between rounded-2xl border p-5 transition-colors sm:p-6 ${
        comingSoon
          ? 'border-white/10 bg-white/5'
          : 'border-white/20 bg-white/10 hover:border-amber-400/30 hover:bg-amber-400/10'
      }`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
              comingSoon
                ? 'border-white/10 bg-white/5 text-amber-200/40'
                : 'border-amber-400/30 bg-amber-400/10 text-amber-300'
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          {comingSoon && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-amber-200/50">
              <Clock3 className="h-3 w-3" aria-hidden="true" />
              Coming soon
            </span>
          )}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">{module.titleEnglish}</h3>
        <p lang="ha" className="text-sm text-amber-200/60">
          {module.titleHausa}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{module.descriptionHausa}</p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        {!comingSoon && module.totalSteps ? (
          <span className="text-xs text-amber-200/50">
            {completedSteps}/{module.totalSteps} steps
          </span>
        ) : (
          <span />
        )}

        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium ${
            comingSoon ? 'text-amber-200/30' : 'text-amber-300 group-hover:gap-2.5 transition-all'
          }`}
        >
          {ctaLabel}
          {!comingSoon && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </span>
      </div>
    </motion.div>
  );

  if (comingSoon) {
    return <div aria-disabled="true">{cardContent}</div>;
  }

  return (
    <Link
      href={`/dashboard/prayers/${module.slug}`}
      className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60"
    >
      {cardContent}
    </Link>
  );
}
