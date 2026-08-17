// components/prayers/PrayerVerificationBadge.tsx

import { ShieldCheck, BookOpenCheck } from 'lucide-react';

interface PrayerVerificationBadgeProps {
  verified: boolean;
  className?: string;
}

/**
 * Intentionally subtle — this is informational, not a warning.
 * Verified content gets a quiet amber confirmation; unverified content
 * gets a neutral "needs review" note so learners know to double-check
 * with a scholar, without feeling like something is wrong.
 */
export default function PrayerVerificationBadge({
  verified,
  className = '',
}: PrayerVerificationBadgeProps) {
  if (verified) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-200/80 ${className}`}
      >
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Verified
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-amber-200/60 ${className}`}
    >
      <BookOpenCheck className="h-3.5 w-3.5" aria-hidden="true" />
      Needs scholarly review
    </span>
  );
}
