"use client";

import { useId } from "react";
import type { FingerprintResult, FlagLevel } from "./types";

export interface StatsPanelProps {
  result: FingerprintResult;
  className?: string;
}

export function StatsPanel({ result, className = "" }: StatsPanelProps) {
  const headingId = useId();
  const s = result.intervals;
  const rows = [
    ["Actions sampled", String(result.sampleSize)],
    ["Intervals", String(s.count)],
    ["Mean gap (s)", s.meanSeconds.toFixed(1)],
    ["Std dev (s)", s.stdDevSeconds.toFixed(1)],
    ["Min / max (s)", `${s.minSeconds.toFixed(0)} / ${s.maxSeconds.toFixed(0)}`],
    ["Coeff. of variation", s.coefficientOfVariation.toFixed(3)],
  ];

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Timing statistics
      </h3>
      <dl className="space-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-white/5 pb-2">
            <dt className="text-white/50">{k}</dt>
            <dd className="font-mono text-white/90">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

const levelClass: Record<FlagLevel, string> = {
  info: "border-white/10 bg-white/5 text-white/80",
  warn: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  alert: "border-red-500/30 bg-red-500/10 text-red-100",
};

export function FlagsList({ result, className = "" }: StatsPanelProps) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Flags
      </h3>
      <ul className="space-y-3">
        {result.flags.map((f) => (
          <li key={f.id} className={`rounded-xl border p-3 text-sm ${levelClass[f.level]}`}>
            <div className="flex justify-between gap-2">
              <span className="font-medium">{f.message}</span>
              <span className="text-xs uppercase opacity-70">{f.level}</span>
            </div>
            <p className="text-xs opacity-60 mt-1">Trigger: {f.trigger}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
