// components/prayers/PrayerHeader.tsx

import Link from 'next/link';
import { ChevronLeft, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface PrayerHeaderProps {
  title: string;
  subtitleHausa?: string;
  description?: string;
  icon?: LucideIcon;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
}

export default function PrayerHeader({
  title,
  subtitleHausa,
  description,
  icon: Icon,
  backHref,
  backLabel = 'Back',
  children,
}: PrayerHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 sm:mb-8"
    >
      {backHref && (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1 text-sm text-amber-200/60 transition-colors hover:text-amber-200"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>
      )}

      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 sm:h-12 sm:w-12">
            <Icon className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" aria-hidden="true" />
          </div>
        )}
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
          {subtitleHausa && (
            <p lang="ha" className="mt-1 text-sm text-amber-200/60 sm:text-base">
              {subtitleHausa}
            </p>
          )}
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>

      {children && <div className="mt-5">{children}</div>}
    </motion.header>
  );
}
