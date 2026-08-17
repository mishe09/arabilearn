'use client';

// components/prayers/PrayerLine.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { PrayerLanguageMode, PrayerLine as PrayerLineType } from '@/types/prayers';
import PrayerAudioPlayer from './PrayerAudioPlayer';

interface PrayerLineProps {
  line: PrayerLineType;
  languageMode: PrayerLanguageMode;
  index?: number;
}

export default function PrayerLine({ line, languageMode, index }: PrayerLineProps) {
  // Line-level "currently playing" state. Either the Arabic or Hausa
  // audio track playing is enough to highlight the whole line for now.
  // A future word-timestamp version can narrow this to word spans.
  const [arabicPlaying, setArabicPlaying] = useState(false);
  const [hausaPlaying, setHausaPlaying] = useState(false);
  const isActive = arabicPlaying || hausaPlaying;

  const showArabic = languageMode === 'arabic' || languageMode === 'both';
  const showHausa = languageMode === 'hausa' || languageMode === 'both';

  return (
    <motion.div
      layout
      animate={{
        borderColor: isActive ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.1)',
        backgroundColor: isActive ? 'rgba(251,191,36,0.08)' : 'rgba(255,255,255,0.03)',
      }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border p-4 sm:p-5"
    >
      {typeof index === 'number' && (
        <span className="mb-2 inline-block text-xs font-medium text-amber-200/40">
          {index + 1}
        </span>
      )}

      {showArabic && (
        <p
          dir="rtl"
          lang="ar"
          className="mb-2 text-right text-2xl leading-relaxed text-white sm:text-3xl"
        >
          {line.arabic}
        </p>
      )}

      {showHausa && (
        <p lang="ha" className="text-base leading-relaxed text-amber-100/90 sm:text-lg">
          {line.hausa}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <PrayerAudioPlayer
          src={line.arabicAudio}
          label="Listen Arabic"
          onPlayStateChange={setArabicPlaying}
        />
        {line.hausaAudio && (
          <PrayerAudioPlayer
            src={line.hausaAudio}
            label="Listen Hausa"
            onPlayStateChange={setHausaPlaying}
          />
        )}
      </div>
    </motion.div>
  );
}
