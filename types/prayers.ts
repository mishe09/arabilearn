// types/prayers.ts

/**
 * A single religious/instructional line within a prayer step.
 * `english` is optional and hidden by default in the UI.
 * `verified` marks whether the Arabic/Hausa wording has been checked
 * by a qualified reviewer. Unverified content must never be presented
 * as authoritative — the UI should show a "Needs scholarly review" badge.
 */
export interface PrayerLine {
  id: string;
  arabic: string;
  hausa: string;
  english?: string;
  arabicAudio?: string; // path under /public/audio/prayers/arabic/
  hausaAudio?: string; // path under /public/audio/prayers/hausa/
  verified: boolean;
}

/**
 * Groups the audio sources for a single line so components can request
 * "the audio for this line" without caring about language mode.
 */
export interface PrayerAudio {
  arabicSrc?: string;
  hausaSrc?: string;
}

/** One teachable step within a prayer (e.g. "Suratul Fatiha", "Ruku'"). */
export interface PrayerStep {
  id: string;
  slug: string;
  order: number;
  titleHausa: string;
  titleArabic: string;
  titleEnglish?: string;
  instructionHausa: string;
  instructionEnglish?: string;
  lines: PrayerLine[];
  verified: boolean;
}

/** A full prayer (Salah, Jumu'ah, future Du'as, etc.), made up of steps. */
export interface Prayer {
  id: string;
  slug: string;
  nameHausa: string;
  nameArabic: string;
  nameEnglish: string;
  descriptionHausa: string;
  descriptionEnglish?: string;
  steps: PrayerStep[];
  verified: boolean;
}

/** Verification status used by badges and filters. */
export type VerificationStatus = 'verified' | 'needs_review';

export function getVerificationStatus(verified: boolean): VerificationStatus {
  return verified ? 'verified' : 'needs_review';
}

/** Language display mode for the step-learning experience. */
export type PrayerLanguageMode = 'arabic' | 'hausa' | 'both';

/** Per-user progress on an individual step. Shape is ready for persistence. */
export interface PrayerStepProgress {
  stepId: string;
  completed: boolean;
  lastVisitedAt?: string;
}

/** Per-user progress across an entire prayer. */
export interface PrayerProgressState {
  prayerId: string;
  completedStepIds: string[];
}

/** Summary card data shown on the /dashboard/prayers landing page. */
export interface PrayerModuleSummary {
  id: string;
  slug: string;
  titleHausa: string;
  titleEnglish: string;
  descriptionHausa: string;
  icon: 'salah' | 'jumuah' | 'duas';
  status: 'available' | 'coming_soon';
  totalSteps?: number;
}
