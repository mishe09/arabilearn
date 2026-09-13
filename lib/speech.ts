// interface SpeechRecognitionAlternative {
//   readonly transcript: string;
//   readonly confidence: number;
// }

// interface SpeechRecognitionResult {
//   readonly isFinal: boolean;
//   readonly length: number;
//   item(index: number): SpeechRecognitionAlternative;
//   [index: number]: SpeechRecognitionAlternative;
// }

// interface SpeechRecognitionResultList {
//   readonly length: number;
//   item(index: number): SpeechRecognitionResult;
//   [index: number]: SpeechRecognitionResult;
// }

// interface SpeechRecognitionEvent extends Event {
//   readonly resultIndex: number;
//   readonly results: SpeechRecognitionResultList;
// }

// interface SpeechRecognitionErrorEvent extends Event {
//   readonly error: string;
//   readonly message: string;
// }

// interface SpeechGrammar {
//   src: string;
//   weight: number;
// }

// interface SpeechGrammarList {
//   readonly length: number;
//   item(index: number): SpeechGrammar;
//   addFromString(string: string, weight?: number): void;
//   addFromURI(src: string, weight?: number): void;
//   [index: number]: SpeechGrammar;
// }

// interface SpeechRecognition extends EventTarget {
//   continuous: boolean;
//   grammars: SpeechGrammarList;
//   interimResults: boolean;
//   lang: string;
//   maxAlternatives: number;
//   serviceURI: string;

//   onaudiostart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
//   onaudioend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
//   onend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
//   onerror:
//     | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => unknown)
//     | null;
//   onnomatch:
//     | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown)
//     | null;
//   onresult:
//     | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown)
//     | null;
//   onsoundstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
//   onsoundend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
//   onspeechstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;
//   onspeechend: ((this: SpeechRecognition, ev: Event) => unknown) | null;
//   onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null;

//   abort(): void;
//   start(): void;
//   stop(): void;
// }

// declare var SpeechRecognition: {
//   prototype: SpeechRecognition;
//   new (): SpeechRecognition;
// };

// interface Window {
//   SpeechRecognition?: typeof SpeechRecognition;
//   webkitSpeechRecognition?: typeof SpeechRecognition;
// }



type SpeechLanguage = 'hausa' | 'arabic' | 'Hausa' | 'Arabic' | string;

type SpeakOptions = {
  rate?: number;
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
  onError?: (event: SpeechSynthesisErrorEvent) => void;
};

function normalizeLanguage(language: SpeechLanguage): string {
  const value = String(language).trim().toLowerCase();

  if (value === 'hausa' || value === 'ha' || value.startsWith('ha-')) {
    return 'ha-NG';
  }

  if (value === 'arabic' || value === 'ar' || value.startsWith('ar-')) {
    return 'ar-SA';
  }

  return language || 'en-US';
}

export function speechRecognitionLang(language: SpeechLanguage): string {
  return normalizeLanguage(language);
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(
    window.SpeechRecognition || window.webkitSpeechRecognition
  );
}

export function getSpeechRecognition(): SpeechRecognition | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const Recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!Recognition) {
    return null;
  }

  return new Recognition();
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  window.speechSynthesis.cancel();
}

export function speakWithVoice(
  text: string,
  language: SpeechLanguage,
  optionsOrOnEnd?: SpeakOptions | (() => void),
): boolean {
  if (
    typeof window === 'undefined' ||
    !('speechSynthesis' in window) ||
    !text.trim()
  ) {
    if (typeof optionsOrOnEnd === 'function') {
      optionsOrOnEnd();
    } else {
      optionsOrOnEnd?.onEnd?.();
    }

    return false;
  }

  const options: SpeakOptions =
    typeof optionsOrOnEnd === 'function'
      ? { onEnd: optionsOrOnEnd }
      : optionsOrOnEnd ?? {};

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = normalizeLanguage(language);
  utterance.rate = options.rate ?? 0.85;
  utterance.pitch = options.pitch ?? 1;
  utterance.volume = options.volume ?? 1;

  const voices = window.speechSynthesis.getVoices();
  const exactVoice = voices.find(
    (voice) => voice.lang.toLowerCase() === utterance.lang.toLowerCase(),
  );
  const languagePrefix = utterance.lang.split('-')[0].toLowerCase();
  const fallbackVoice = voices.find((voice) =>
    voice.lang.toLowerCase().startsWith(languagePrefix),
  );

  if (exactVoice || fallbackVoice) {
    utterance.voice = exactVoice ?? fallbackVoice ?? null;
  }

  utterance.onend = () => {
    options.onEnd?.();
  };

  utterance.onerror = (event) => {
    options.onError?.(event);
  };

  window.speechSynthesis.speak(utterance);

  return true;
}
