/**
 * Types for educational organic vs mechanical timing analysis.
 * Heuristic only — not identity proof.
 */

/** Unix seconds (or any monotonic second-scale timestamps). */
export type ActionTimestamp = number;

export interface IntervalStats {
  count: number;
  meanSeconds: number;
  stdDevSeconds: number;
  minSeconds: number;
  maxSeconds: number;
  /** Coefficient of variation = stdDev / mean (0 if mean is 0) */
  coefficientOfVariation: number;
}

export interface FingerprintResult {
  sampleSize: number;
  intervals: IntervalStats;
  /** Normalized 0–100 heuristic; higher ≈ more organic timing variance */
  humanityCertaintyIndex: number;
  classification: "likely_organic" | "mixed" | "likely_mechanical";
  flags: FingerprintFlag[];
}

export type FlagLevel = "info" | "warn" | "alert";

export interface FingerprintFlag {
  id: string;
  level: FlagLevel;
  message: string;
  trigger: string;
}
