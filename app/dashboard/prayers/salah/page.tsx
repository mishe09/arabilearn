'use client';

// app/dashboard/prayers/salah/page.tsx

import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import PrayerHeader from '@/components/prayers/PrayerHeader';
import PrayerProgress from '@/components/prayers/PrayerProgress';
import PrayerStepCard from '@/components/prayers/PrayerStepCard';
import { salah } from '@/data/prayers';

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

export default function SalahOverviewPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    setCompletedIds(readCompletedIds());
  }, []);

  return (
    <div>
      <PrayerHeader
        title="Learn Salah"
        subtitleHausa="Koyon Sallah Mataki-Mataki"
        description="Work through each part of the prayer in order, from intention to the closing salutation."
        icon={BookOpen}
        backHref="/dashboard/prayers"
        backLabel="Prayer Learning"
      >
        <PrayerProgress current={completedIds.length} total={salah.steps.length} className="max-w-xs" />
      </PrayerHeader>

      <div className="space-y-2.5">
        {salah.steps.map((step, index) => (
          <PrayerStepCard
            key={step.id}
            step={step}
            prayerSlug="salah"
            completed={completedIds.includes(step.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
