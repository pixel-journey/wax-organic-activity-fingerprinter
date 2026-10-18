"use client";

import { useId } from "react";
import type { FingerprintResult } from "./types";

export interface CertaintyGaugeProps {
  result: FingerprintResult;
  className?: string;
}

const label: Record<FingerprintResult["classification"], string> = {
  likely_organic: "Leans organic (timing)",
  mixed: "Mixed / inconclusive",
  likely_mechanical: "Leans mechanical (timing)",
};

export function CertaintyGauge({ result, className = "" }: CertaintyGaugeProps) {
  const headingId = useId();
  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/30 p-6 text-center ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="text-xs uppercase tracking-wider text-white/50">
        Humanity Certainty Index (heuristic)
      </h3>
      <p className="mt-2 font-mono text-6xl text-emerald-400 tabular-nums">
        {result.humanityCertaintyIndex}
      </p>
      <p className="mt-2 text-sm text-emerald-200/80">
        {label[result.classification]}
      </p>
      <p className="mt-3 text-xs text-white/40 max-w-sm mx-auto leading-relaxed">
        Based on inter-action timing variance only. Not identity, not proof of
        personhood, not a ban recommendation by itself.
      </p>
    </section>
  );
}
