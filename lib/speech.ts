import type { LanguageCode } from '@/types/translator';

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function isSpeechRecognitionSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  );
}

export function getSpeechRecognition(): { new (): SpeechRecognition } | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as {
    SpeechRecognition?: { new (): SpeechRecognition };
    webkitSpeechRecognition?: { new (): SpeechRecognition };
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export function speechRecognitionLang(lang: LanguageCode): string {
  return lang === 'Arabic' ? 'ar-SA' : 'ha-NG';
}

function loadVoices(): SpeechSynthesisVoice[] {
  if (!isSpeechSynthesisSupported()) return [];
  return window.speechSynthesis.getVoices();
}

/**
 * Voices can load asynchronously. Resolves once voices are available (or after a
 * short timeout) so we can pick the best matching voice for the language.
 */
export function getAvailableVoices(timeoutMs = 1500): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener('voiceschanged', done);
      resolve(synth.getVoices());
    };
    window.addEventListener('voiceschanged', done);
    setTimeout(done, timeoutMs);
  });
}

export async function pickVoice(lang: LanguageCode): Promise<SpeechSynthesisVoice | null> {
  const voices = await getAvailableVoices();
  if (voices.length === 0) return null;
  const target = speechRecognitionLang(lang).toLowerCase();
  const prefix = target.split('-')[0];

  const exact = voices.find((v) => v.lang.toLowerCase() === target);
  if (exact) return exact;
  const byPrefix = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
  if (byPrefix) return byPrefix;
  return voices[0] ?? null;
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}

export async function speakWithVoice(
  text: string,
  lang: LanguageCode,
  options: SpeakOptions = {}
): Promise<void> {
  if (!isSpeechSynthesisSupported()) {
    options.onError?.();
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechRecognitionLang(lang);
  utterance.rate = options.rate ?? 1;
  utterance.pitch = options.pitch ?? 1;
  utterance.volume = 1;

  const voice = await pickVoice(lang);
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => options.onStart?.();
  utterance.onend = () => options.onEnd?.();
  utterance.onerror = () => options.onError?.();

  synth.speak(utterance);
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}
