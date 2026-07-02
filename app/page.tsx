'use client';

import React, { useState } from 'react';

export default function OrganicActivityFingerprinter() {
  const [wallet, setWallet] = useState('pxjourney');
  const [result, setResult] = useState<any>(null);

  const analyze = () => {
    // Mock entropy analysis for demo
    const certainty = Math.floor(Math.random() * 35) + 60;
    setResult({
      certaintyIndex: certainty,
      classification: certainty > 80 ? 'Highly Likely Human' : certainty > 65 ? 'Probably Human' : 'Likely Automated',
      entropy: (Math.random() * 2 + 1).toFixed(2),
      zeroVarianceFlags: certainty < 70 ? 3 : 0,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="font-press-start text-2xl tracking-widest text-emerald-400 mb-2">ORGANIC ACTIVITY FINGERPRINTER</div>
        <div className="text-xs opacity-60 mb-8">Pixel Journey • Behavioral Forensics • Humanity Certainty Index</div>

        <div className="glassmorphic-crt pixel-border p-6 rounded-2xl mb-6">
          <div className="flex gap-3 mb-6">
            <input
              value={wallet}
              onChange={e => setWallet(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
            />
            <button onClick={analyze} className="px-8 py-3 bg-emerald-600 rounded-2xl">Analyze Activity</button>
          </div>

          {result && (
            <div>
              <div className="text-center mb-6">
                <div className="text-sm opacity-70">HUMANITY CERTAINTY INDEX</div>
                <div className="text-7xl font-mono text-emerald-400 mt-1">{result.certaintyIndex}</div>
                <div className="text-emerald-400 mt-1">{result.classification}</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Transaction Entropy</span>
                  <span className="font-mono">{result.entropy}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Zero-Variance Flags (Bot Signal)</span>
                  <span className="font-mono text-amber-400">{result.zeroVarianceFlags}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs opacity-70">
          In production, this fetches real action history from Hyperion and calculates statistical entropy of timing intervals to produce a clear Humanity Certainty Index.
        </div>
      </div>
    </div>
  );
}
