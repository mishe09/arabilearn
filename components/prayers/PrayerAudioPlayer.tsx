'use client';

// components/prayers/PrayerAudioPlayer.tsx
//
// Structured so real word-level timestamps can be layered on later:
// `onPlayStateChange` reports play/pause up to the parent, which is
// what PrayerLine uses to decide whether to show a "currently playing"
// highlight. When word timestamps exist, this component can be extended
// to also emit onTimeUpdate(currentTime) without changing its API shape.

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';

export type PlaybackSpeed = 0.75 | 1;

interface PrayerAudioPlayerProps {
  src?: string;
  label: string; // e.g. "Listen Arabic" / "Listen Hausa"
  onPlayStateChange?: (playing: boolean) => void;
}

export default function PrayerAudioPlayer({
  src,
  label,
  onPlayStateChange,
}: PrayerAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);

  const available = Boolean(src);

  useEffect(() => {
    onPlayStateChange?.(isPlaying);
  }, [isPlaying, onPlayStateChange]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  if (!available) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-amber-200/40">
        <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
        Audio coming soon
      </div>
    );
  }

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const replay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    setIsPlaying(true);
  };

  const toggleSpeed = () => {
    setSpeed((prev) => (prev === 1 ? 0.75 : 1));
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? `Pause ${label}` : label}
        aria-pressed={isPlaying}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60 ${
          isPlaying
            ? 'border-amber-400/30 bg-amber-400/10 text-amber-200'
            : 'border-white/20 bg-white/10 text-white hover:border-amber-400/30 hover:bg-amber-400/10'
        }`}
      >
        {isPlaying ? (
          <Pause className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Play className="h-3.5 w-3.5" aria-hidden="true" />
        )}
        {label}
      </button>

      <button
        type="button"
        onClick={replay}
        aria-label={`Replay ${label}`}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-200/60 transition-colors hover:border-amber-400/30 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60"
      >
        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={toggleSpeed}
        aria-label={`Playback speed, currently ${speed}x`}
        className="inline-flex h-7 items-center justify-center rounded-full border border-white/10 bg-white/5 px-2 text-[11px] font-medium text-amber-200/60 transition-colors hover:border-amber-400/30 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400/60"
      >
        {speed}x
      </button>
    </div>
  );
}
