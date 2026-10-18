/**
 * Pure timing engines for organic activity fingerprinting.
 * Educational heuristics — never treat as definitive bot/human labels.
 */

import type {
  ActionTimestamp,
  FingerprintFlag,
  FingerprintResult,
  IntervalStats,
} from "./types";

export function computeIntervals(timestamps: ActionTimestamp[]): number[] {
  if (timestamps.length < 2) return [];
  const sorted = [...timestamps].sort((a, b) => a - b);
  const intervals: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const d = sorted[i] - sorted[i - 1];
    if (d >= 0) intervals.push(d);
  }
  return intervals;
}

export function computeIntervalStats(intervals: number[]): IntervalStats {
  const count = intervals.length;
  if (count === 0) {
    return {
      count: 0,
      meanSeconds: 0,
      stdDevSeconds: 0,
      minSeconds: 0,
      maxSeconds: 0,
      coefficientOfVariation: 0,
    };
  }
  const mean = intervals.reduce((s, x) => s + x, 0) / count;
  const variance =
    intervals.reduce((s, x) => s + (x - mean) ** 2, 0) / count;
  const stdDev = Math.sqrt(variance);
  return {
    count,
    meanSeconds: mean,
    stdDevSeconds: stdDev,
    minSeconds: Math.min(...intervals),
    maxSeconds: Math.max(...intervals),
    coefficientOfVariation: mean === 0 ? 0 : stdDev / mean,
  };
}

/**
 * Map coefficient of variation + sample size into a 0–100 index.
 * Low CV + enough samples → more mechanical; high CV → more organic-like.
 */
export function humanityCertaintyFromStats(
  stats: IntervalStats,
  sampleSize: number
): number {
  if (sampleSize < 5 || stats.count < 4) {
    // Insufficient data — stay neutral-low confidence band
    return 45;
  }
  const cv = stats.coefficientOfVariation;
  // Cap CV influence; typical human activity often shows higher relative spread
  const cvScore = Math.min(1, cv / 1.2) * 70;
  const sampleBoost = Math.min(20, Math.log10(sampleSize) * 10);
  const nearZeroPenalty =
    stats.stdDevSeconds < 2 && stats.count >= 8 ? 25 : 0;
  const score = Math.round(
    Math.max(5, Math.min(98, 15 + cvScore + sampleBoost - nearZeroPenalty))
  );
  return score;
}

export function classifyIndex(
  index: number
): FingerprintResult["classification"] {
  if (index >= 70) return "likely_organic";
  if (index >= 45) return "mixed";
  return "likely_mechanical";
}

export function buildFlags(
  stats: IntervalStats,
  sampleSize: number,
  index: number
): FingerprintFlag[] {
  const flags: FingerprintFlag[] = [];

  if (sampleSize < 10) {
    flags.push({
      id: "small-sample",
      level: "warn",
      message: "Small sample — treat index as weak evidence only.",
      trigger: "sampleSize",
    });
  }

  if (stats.count >= 8 && stats.stdDevSeconds < 2) {
    flags.push({
      id: "near-zero-variance",
      level: "alert",
      message:
        "Very low timing variance — consistent with fixed-interval automation (or a narrow manual habit).",
      trigger: "stdDevSeconds",
    });
  }

  if (stats.coefficientOfVariation > 1.5 && stats.count >= 8) {
    flags.push({
      id: "high-cv",
      level: "info",
      message: "High relative timing spread — more consistent with irregular human activity.",
      trigger: "coefficientOfVariation",
    });
  }

  if (index < 40) {
    flags.push({
      id: "mechanical-lean",
      level: "warn",
      message:
        "Index leans mechanical. Corroborate with funding, asset, and social signals before acting.",
      trigger: "humanityCertaintyIndex",
    });
  }

  if (flags.length === 0) {
    flags.push({
      id: "neutral",
      level: "info",
      message:
        "No strong structural timing flags. Timing is only one weak signal among many.",
      trigger: "overall",
    });
  }

  return flags;
}

export function fingerprintTimestamps(
  timestamps: ActionTimestamp[]
): FingerprintResult {
  const intervals = computeIntervals(timestamps);
  const stats = computeIntervalStats(intervals);
  const sampleSize = timestamps.length;
  const humanityCertaintyIndex = humanityCertaintyFromStats(stats, sampleSize);
  return {
    sampleSize,
    intervals: stats,
    humanityCertaintyIndex,
    classification: classifyIndex(humanityCertaintyIndex),
    flags: buildFlags(stats, sampleSize, humanityCertaintyIndex),
  };
}

/** Demo series: irregular human-like gaps (seconds). */
export function demoOrganicTimestamps(count = 24): ActionTimestamp[] {
  const out: ActionTimestamp[] = [];
  let t = 1_700_000_000;
  for (let i = 0; i < count; i++) {
    out.push(t);
    // Roughly minutes to hours with jitter
    t += 600 + Math.floor((i * 97) % 7200);
  }
  return out;
}

/** Demo series: fixed 60s cadence (mechanical). */
export function demoMechanicalTimestamps(count = 24): ActionTimestamp[] {
  const out: ActionTimestamp[] = [];
  let t = 1_700_000_000;
  for (let i = 0; i < count; i++) {
    out.push(t);
    t += 60;
  }
  return out;
}
