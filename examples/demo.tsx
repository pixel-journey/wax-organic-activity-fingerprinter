"use client";

import { useMemo, useState } from "react";
import {
  demoMechanicalTimestamps,
  demoOrganicTimestamps,
  fingerprintTimestamps,
} from "./engines";
import { CertaintyGauge } from "./CertaintyGauge";
import { FlagsList, StatsPanel } from "./StatsPanel";

type Mode = "organic" | "mechanical";

export default function OrganicFingerprintDemo() {
  const [mode, setMode] = useState<Mode>("organic");

  const result = useMemo(() => {
    const ts =
      mode === "organic"
        ? demoOrganicTimestamps(28)
        : demoMechanicalTimestamps(28);
    return fingerprintTimestamps(ts);
  }, [mode]);

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/80">
          Pixel Journey · Behavioral forensics
        </p>
        <h1 className="text-2xl font-bold text-white">
          Organic Activity Fingerprinter
        </h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Pure client-side timing heuristics on demo series. Wire Hyperion action
          timestamps the same way in production — never ban from this signal alone.
        </p>
      </header>

      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "organic"
              ? "bg-emerald-600 text-white"
              : "bg-white/10 text-white/70"
          }`}
          onClick={() => setMode("organic")}
        >
          Demo organic timing
        </button>
        <button
          type="button"
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "mechanical"
              ? "bg-amber-600 text-white"
              : "bg-white/10 text-white/70"
          }`}
          onClick={() => setMode("mechanical")}
        >
          Demo mechanical (60s)
        </button>
      </div>

      <CertaintyGauge result={result} />
      <div className="grid gap-6 md:grid-cols-2">
        <StatsPanel result={result} />
        <FlagsList result={result} />
      </div>
    </div>
  );
}
