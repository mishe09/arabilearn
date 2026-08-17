import { NextRequest } from 'next/server';

const DAY_MS = 24 * 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;
const DUPLICATE_WINDOW_MS = 3000;

export const DEFAULT_DAILY_LIMIT = 50;
export const DEFAULT_BURST_LIMIT = 10;

interface DailyEntry {
  timestamps: number[];
  resetAt: number;
}

interface RecentRequest {
  signature: string;
  at: number;
}

const dailyUsage = new Map<string, DailyEntry>();
const recentRequests = new Map<string, RecentRequest>();

export function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim();
  return (
    ip ||
    request.headers.get('x-real-ip')?.trim() ||
    'anonymous'
  );
}

export interface UsageResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  code: 'OK' | 'DAILY_LIMIT' | 'BURST_LIMIT';
}

function cleanupOld(entry: DailyEntry, now: number, windowMs: number): DailyEntry {
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
  return entry;
}

export function checkUsage(
  key: string,
  dailyLimit = DEFAULT_DAILY_LIMIT,
  burstLimit = DEFAULT_BURST_LIMIT
): UsageResult {
  const now = Date.now();
  const entry = dailyUsage.get(key);
  const resetAt = entry ? entry.resetAt : now + DAY_MS;

  let current = entry;
  if (!current || now >= current.resetAt) {
    current = { timestamps: [], resetAt: now + DAY_MS };
    dailyUsage.set(key, current);
  } else {
    current = cleanupOld(current, now, DAY_MS);
  }

  const burst = cleanupOld(
    { timestamps: current.timestamps.filter((t) => now - t < MINUTE_MS), resetAt: 0 },
    now,
    MINUTE_MS
  ).timestamps;

  if (burst.length >= burstLimit) {
    return { allowed: false, limit: dailyLimit, remaining: Math.max(0, dailyLimit - current.timestamps.length), resetAt: current.resetAt, code: 'BURST_LIMIT' };
  }

  if (current.timestamps.length >= dailyLimit) {
    return { allowed: false, limit: dailyLimit, remaining: 0, resetAt: current.resetAt, code: 'DAILY_LIMIT' };
  }

  current.timestamps.push(now);

  return {
    allowed: true,
    limit: dailyLimit,
    remaining: Math.max(0, dailyLimit - current.timestamps.length),
    resetAt: current.resetAt,
    code: 'OK',
  };
}

export function isDuplicateRequest(key: string, signature: string): boolean {
  const now = Date.now();
  const previous = recentRequests.get(key);
  if (previous && previous.signature === signature && now - previous.at < DUPLICATE_WINDOW_MS) {
    return true;
  }
  recentRequests.set(key, { signature, at: now });

  if (recentRequests.size > 5000) {
    for (const [k, value] of recentRequests) {
      if (now - value.at > 10 * MINUTE_MS) recentRequests.delete(k);
    }
  }
  return false;
}
