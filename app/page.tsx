'use client';

import React, { useMemo, useState } from 'react';
import {
  demoMechanicalTimestamps,
  demoOrganicTimestamps,
  fingerprintTimestamps,
} from '../examples/engines';

type Mode = 'organic' | 'mechanical';

export default function OrganicActivityFingerprinter() {
  const [mode, setMode] = useState<Mode>('organic');

  const result = useMemo(() => {
    const ts =
      mode === 'organic'
        ? demoOrganicTimestamps(28)
        : demoMechanicalTimestamps(28);
    return fingerprintTimestamps(ts);
  }, [mode]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          ORGANIC ACTIVITY FINGERPRINTER
        </div>
        <div className="text-xs opacity-60 mb-6">
          Pixel Journey · Timing heuristics only · Not identity proof
        </div>

        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode('organic')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'organic' ? 'bg-emerald-600' : 'bg-white/10'
            }`}
          >
            Demo organic
          </button>
          <button
            type="button"
            onClick={() => setMode('mechanical')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'mechanical' ? 'bg-amber-600' : 'bg-white/10'
            }`}
          >
            Demo mechanical (60s)
          </button>
        </div>

        <div className="border border-white/10 bg-black/40 p-6 rounded-2xl mb-6">
          <div className="text-center mb-6">
            <div className="text-sm opacity-70">HUMANITY CERTAINTY INDEX (heuristic)</div>
            <div className="text-7xl font-mono text-emerald-400 mt-1">
              {result.humanityCertaintyIndex}
            </div>
            <div className="text-emerald-400/90 mt-1 text-sm">{result.classification}</div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-70">Sample size</span>
              <span className="font-mono">{result.sampleSize}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-70">Mean gap (s)</span>
              <span className="font-mono">{result.intervals.meanSeconds.toFixed(1)}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-70">Std dev (s)</span>
              <span className="font-mono">{result.intervals.stdDevSeconds.toFixed(1)}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="opacity-70">Coeff. of variation</span>
              <span className="font-mono">{result.intervals.coefficientOfVariation.toFixed(3)}</span>
            </div>
          </div>

          <ul className="mt-6 space-y-2 text-xs opacity-80">
            {result.flags.map((f) => (
              <li key={f.id}>
                [{f.level}] {f.message}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs opacity-60 leading-relaxed">
          Production apps should pass real Hyperion action timestamps into{" "}
          <code className="text-emerald-400/80">fingerprintTimestamps</code>. See{" "}
          <code className="text-emerald-400/80">/examples</code> for reusable panels.
          Do not use this score alone for bans or airdrop exclusion.
        </p>
      </div>
    </div>
  );
}
