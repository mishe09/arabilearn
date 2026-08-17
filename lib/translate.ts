import type {
  LanguageCode,
  TranslateRequest,
  TranslateResponse,
  WordBreakdownItem,
} from '@/types/translator';

export const LANGUAGES: LanguageCode[] = ['Hausa', 'Arabic'];
export const CONTEXTS = [
  'General',
  'Conversation',
  'Formal',
  'Educational',
  'Travel',
  'Business',
] as const;
export const MAX_INPUT_LENGTH = 4000;
export const DEFAULT_MODEL = 'gpt-4o-mini';
export const REQUEST_TIMEOUT_MS = 45000;

const CONTEXT_INSTRUCTIONS: Record<string, string> = {
  General: 'Use neutral, general-purpose wording.',
  Conversation: 'Use natural, friendly conversational wording, as if speaking casually with a friend.',
  Formal: 'Use formal, polite and respectful wording.',
  Educational: 'Use clear, simple, instructive wording suitable for language learners.',
  Travel: 'Use practical, clear wording suitable for travel situations.',
  Business: 'Use professional, polite business wording.',
};

export class TranslateError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = 'TranslateError';
    this.status = status;
    this.code = code;
  }
}

function isSupportedLanguage(value: string): value is LanguageCode {
  return LANGUAGES.includes(value as LanguageCode);
}

function opposite(lang: LanguageCode): LanguageCode {
  return lang === 'Hausa' ? 'Arabic' : 'Hausa';
}

function targetInstruction(target: LanguageCode): string {
  return target === 'Arabic'
    ? '- If translating to Arabic, use natural Modern Standard Arabic (\u0641\u0635\u062D\u0649) with correct grammar, spelling and register.'
    : '- If translating to Hausa, use natural Standard Hausa (Latin script), correctly using special letters such as \u0253, \u0257, \u0194, ts and \u2019 where appropriate.';
}

function commonRules(target: LanguageCode | null, contextLine: string): string {
  const targetText = target ? ` in ${target}` : '';
  return `Instructions:
- Translate accurately and preserve the original meaning and context.
- Produce natural, idiomatic${targetText} output rather than awkward word-for-word translation.
${target ? targetInstruction(target) : ''}
- Handle natural conversational Hausa and standard Arabic fluently.
- Never invent information. Preserve numbers, names and important factual details. Keep proper names unchanged unless they have an established Hausa or Arabic form.
- If a Hausa expression has no literal Arabic equivalent (or vice versa), convey its natural meaning instead of forcing a literal translation.
- Never translate Hausa as another African language.
- Never translate Arabic into English.
- Do not add explanations, notes, quotes, or repeat the source text in your reply.
${contextLine}
Return only valid JSON.`;
}

function buildSystemPrompt(req: TranslateRequest): string {
  const contextLine = `Context: ${CONTEXT_INSTRUCTIONS[req.context ?? 'General'] ?? CONTEXT_INSTRUCTIONS.General}`;
  const sourceAuto = req.sourceLanguage === 'auto';
  const targetAuto = req.targetLanguage === 'auto';

  if (sourceAuto) {
    return `You are HausaArabia, an expert translation engine for Hausa (Latin script) and Modern Standard Arabic.

First identify the language of the user's text: Hausa or Arabic. Do not rely only on script, because Hausa is written in Latin letters and may contain words that resemble English or other languages. Analyze the vocabulary and grammar instead.

Then translate the text into the OPPOSITE language (if Hausa, translate to Arabic; if Arabic, translate to Hausa).

${commonRules(null, contextLine)}
{
  "detectedSourceLanguage": "Hausa" or "Arabic",
  "translation": "the translation in the opposite language"
}`;
  }

  const source: LanguageCode = isSupportedLanguage(req.sourceLanguage) ? req.sourceLanguage : 'Hausa';
  const target: LanguageCode =
    isSupportedLanguage(req.targetLanguage)
      ? req.targetLanguage
      : targetAuto
        ? opposite(source)
        : opposite(source);

  const base = `You are HausaArabia, an expert translation engine translating between Hausa (Latin script) and Modern Standard Arabic.

Translate the user's text from ${source} into ${target}.

${commonRules(target, contextLine)}`;

  if (req.learningMode) {
    return `${base}
Return a JSON object with exactly this shape:
{
  "translation": "the translation in ${target}",
  "pronunciation": "a readable pronunciation guide for the translation (Latin romanization for Arabic; simple phonetic spelling for Hausa)",
  "meaning": "a short explanation in English of the meaning",
  "wordBreakdown": [
    { "word": "an important source word or phrase", "translation": "its translation in ${target}", "pronunciation": "pronunciation of that word" }
  ]
}
Limit wordBreakdown to the most important items, at most 6.`;
  }

  return `${base}
Return only valid JSON: { "translation": "the translation in ${target}" }`;
}

function buildUserPrompt(req: TranslateRequest): string {
  return req.text;
}

interface OpenAIChoice {
  message?: { content?: string };
}

interface OpenAIResponse {
  choices?: OpenAIChoice[];
}

async function callOpenAI(system: string, user: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new TranslateError(
      503,
      'NOT_CONFIGURED',
      'AI translation is not configured yet. Add OPENAI_API_KEY to your .env.local file and restart the server.'
    );
  }

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
      signal: controller.signal,
    });

    if (res.status === 401 || res.status === 403) {
      throw new TranslateError(
        500,
        'AUTH_ERROR',
        'The translation service rejected the API key. Please check your server configuration.'
      );
    }

    if (res.status === 429) {
      throw new TranslateError(429, 'UPSTREAM_RATE_LIMIT', 'The translation service is busy. Please try again in a moment.');
    }

    if (res.status === 400) {
      const body = await res.text().catch(() => '');
      console.error('OpenAI 400:', body);
      throw new TranslateError(500, 'BAD_REQUEST', 'Unable to translate right now. Please try again.');
    }

    if (!res.ok) {
      throw new TranslateError(502, 'UPSTREAM', 'Unable to translate right now. Please try again.');
    }

    const data = (await res.json()) as OpenAIResponse;
    const content = data?.choices?.[0]?.message?.content;
    if (!content || !content.trim()) {
      throw new TranslateError(502, 'EMPTY_RESPONSE', 'Unable to translate right now. Please try again.');
    }
    return content.trim();
  } catch (error) {
    if (error instanceof TranslateError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new TranslateError(504, 'TIMEOUT', 'The translation took too long. Please try again.');
    }
    throw new TranslateError(500, 'NETWORK', 'Unable to translate right now. Please try again.');
  } finally {
    clearTimeout(timer);
  }
}

function extractJsonObject(content: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(content) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>;
    }
  } catch {
    // fall through to regex extraction
  }

  const match = content.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]) as unknown;
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return null;
    }
  }
  return null;
}

function asString(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function sanitizeWordBreakdown(value: unknown): WordBreakdownItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .filter((entry): entry is Record<string, unknown> => !!entry && typeof entry === 'object' && !Array.isArray(entry))
    .map((entry) => ({
      word: asString(entry.word, 200),
      translation: asString(entry.translation, 300),
      pronunciation: asString(entry.pronunciation, 200) || undefined,
    }))
    .filter((item) => item.word && item.translation)
    .slice(0, 6);

  return items.length > 0 ? items : undefined;
}

function buildResponse(
  req: TranslateRequest,
  content: string
): TranslateResponse {
  const sourceAuto = req.sourceLanguage === 'auto';

  if (sourceAuto) {
    const obj = extractJsonObject(content);
    if (!obj) {
      throw new TranslateError(502, 'BAD_RESPONSE', 'The translation service returned an unexpected response. Please try again.');
    }
    const detectedRaw = asString(obj.detectedSourceLanguage, 20);
    const detected: LanguageCode | null =
      detectedRaw === 'Arabic' ? 'Arabic' : detectedRaw === 'Hausa' ? 'Hausa' : null;
    if (!detected) {
      throw new TranslateError(502, 'BAD_RESPONSE', 'The translation service could not determine the input language. Please try again.');
    }
    const translation = asString(obj.translation);
    if (!translation) {
      throw new TranslateError(502, 'BAD_RESPONSE', 'The translation service returned an unexpected response. Please try again.');
    }
    return { translation, detectedSourceLanguage: detected };
  }

  if (req.learningMode) {
    const obj = extractJsonObject(content);
    if (!obj || !asString(obj.translation)) {
      throw new TranslateError(502, 'BAD_RESPONSE', 'The translation service returned an unexpected response. Please try again.');
    }
    return {
      translation: asString(obj.translation),
      pronunciation: asString(obj.pronunciation, 1000) || undefined,
      meaning: asString(obj.meaning, 1000) || undefined,
      wordBreakdown: sanitizeWordBreakdown(obj.wordBreakdown),
    };
  }

  const obj = extractJsonObject(content);
  const translation = obj && typeof obj.translation === 'string'
    ? asString(obj.translation)
    : content;
  if (!translation) {
    throw new TranslateError(502, 'BAD_RESPONSE', 'The translation service returned an unexpected response. Please try again.');
  }
  return { translation };
}

export async function translate(req: TranslateRequest): Promise<TranslateResponse> {
  const system = buildSystemPrompt(req);
  const user = buildUserPrompt(req);
  const content = await callOpenAI(system, user);
  return buildResponse(req, content);
}
