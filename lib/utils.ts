import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export function calculateXPForNextLevel(level: number): number {
  return level * 500;
}

export function formatXP(xp: number): string {
  return xp.toLocaleString();
}

export function getStreakMultiplier(streak: number): number {
  if (streak >= 30) return 1.5;
  if (streak >= 7) return 1.25;
  if (streak >= 3) return 1.1;
  return 1;
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function speakText(text: string, lang: 'ha' | 'ar' | 'en', rate: number = 1): void {
  if (typeof window === 'undefined') return;
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  switch (lang) {
    case 'ha':
      utterance.lang = 'ha-NG';
      break;
    case 'ar':
      utterance.lang = 'ar-SA';
      break;
    case 'en':
      utterance.lang = 'en-US';
      break;
  }
  
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: '' };
}

export function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function getLanguageName(code: 'ha' | 'ar' | 'en'): string {
  const names = {
    ha: 'Hausa',
    ar: 'Arabic',
    en: 'English'
  };
  return names[code];
}

export function getDirection(lang: 'ha' | 'ar' | 'en'): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}