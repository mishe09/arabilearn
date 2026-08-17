import type { TranslateRequest, TranslateResponse, UsageInfo } from '@/types/translator';

export class ClientTranslateError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ClientTranslateError';
    this.status = status;
  }
}

function fallbackMessage(status: number): string {
  switch (status) {
    case 400:
      return 'The request could not be processed. Please check your input and try again.';
    case 401:
      return 'Your session has expired. Please sign in again.';
    case 429:
      return 'You have reached the translation limit. Please try again later.';
    case 503:
      return 'The translation service is not configured. Please contact support.';
    case 504:
      return 'The translation took too long. Please try again.';
    default:
      return 'Unable to translate right now. Please try again.';
  }
}

export interface TranslateResult {
  data: TranslateResponse;
  usage?: UsageInfo;
}

const REQUEST_TIMEOUT_MS = 50000;

export async function requestTranslation(
  payload: TranslateRequest
): Promise<TranslateResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    let json: { message?: string; usage?: UsageInfo } & TranslateResponse = { translation: '' };
    try {
      json = await res.json();
    } catch {
      json = { translation: '' };
    }

    if (!res.ok) {
      throw new ClientTranslateError(res.status, json.message || fallbackMessage(res.status));
    }

    return { data: json, usage: json.usage };
  } catch (error) {
    if (error instanceof ClientTranslateError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ClientTranslateError(0, 'The translation took too long. Please try again.');
    }
    throw new ClientTranslateError(0, 'Network error. Please check your connection and try again.');
  } finally {
    clearTimeout(timer);
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
