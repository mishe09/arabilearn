// components/prayers/PrayerProgress.tsx

import { motion } from 'framer-motion';

interface PrayerProgressProps {
  current: number;
  total: number;
  className?: string;
}

export default function PrayerProgress({ current, total, className = '' }: PrayerProgressProps) {
  const percent = total > 0 ? Math.min(100, Math.max(0, (current / total) * 100)) : 0;

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between text-xs text-amber-200/60">
        <span>
          Step {current} of {total}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
