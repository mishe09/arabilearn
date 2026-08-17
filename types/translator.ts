export type LanguageCode = 'Hausa' | 'Arabic';

export type TranslationContext =
  | 'General'
  | 'Conversation'
  | 'Formal'
  | 'Educational'
  | 'Travel'
  | 'Business';

export const LANGUAGE_CODES: LanguageCode[] = ['Hausa', 'Arabic'];
export const TRANSLATION_CONTEXTS: TranslationContext[] = [
  'General',
  'Conversation',
  'Formal',
  'Educational',
  'Travel',
  'Business',
];

export const MAX_TRANSLATION_LENGTH = 4000;

export interface TranslateRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  context?: TranslationContext;
  learningMode?: boolean;
}

export interface WordBreakdownItem {
  word: string;
  translation: string;
  pronunciation?: string;
}

export interface TranslateResponse {
  translation: string;
  pronunciation?: string;
  meaning?: string;
  wordBreakdown?: WordBreakdownItem[];
  detectedSourceLanguage?: LanguageCode | null;
}

export interface UsageInfo {
  limit: number;
  remaining: number;
  resetAt: number;
}

export interface HistoryItem {
  id: string;
  userId?: string;
  sourceLanguage: string;
  sourceText: string;
  targetLanguage: string;
  translation: string;
  context?: string;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  speaker: 'A' | 'B';
  sourceLanguage: LanguageCode;
  sourceText: string;
  targetLanguage: LanguageCode;
  translation: string;
  createdAt: number;
  status: 'translating' | 'done' | 'error';
}

export function oppositeLanguage(lang: LanguageCode): LanguageCode {
  return lang === 'Hausa' ? 'Arabic' : 'Hausa';
}

export function isRtlLanguage(lang: string): boolean {
  return lang === 'Arabic';
}
