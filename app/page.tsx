'use client';

import React, { useCallback, useMemo, useState } from 'react';
import {
  demoMechanicalTimestamps,
  demoOrganicTimestamps,
  fingerprintTimestamps,
} from '../examples/engines';
import { downloadText, exportFingerprintMarkdown } from '../examples/exportReport';
import { fetchAccountActionTimestamps } from '../examples/live/hyperion';
import { HCI_MYTHS } from '../examples/myths';

type Mode = 'live' | 'organic' | 'mechanical';

export default function OrganicActivityFingerprinter() {
  const [mode, setMode] = useState<Mode>('live');
  const [account, setAccount] = useState('eosio');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [liveTs, setLiveTs] = useState<number[] | null>(null);
  const [meta, setMeta] = useState<string | null>(null);

  const demoResult = useMemo(() => {
    if (mode === 'organic')
      return fingerprintTimestamps(demoOrganicTimestamps(28));
    if (mode === 'mechanical')
      return fingerprintTimestamps(demoMechanicalTimestamps(28));
    return null;
  }, [mode]);

  const liveResult = useMemo(
    () => (liveTs && liveTs.length >= 2 ? fingerprintTimestamps(liveTs) : null),
    [liveTs]
  );

  const result = mode === 'live' ? liveResult : demoResult;
  const label = mode === 'live' ? account : mode;

  const runLive = useCallback(async () => {
    setLoading(true);
    setError(null);
    setMeta(null);
    try {
      const { timestamps, source, rawCount } =
        await fetchAccountActionTimestamps(account, { limit: 100 });
      if (timestamps.length < 2) {
        setError('Not enough actions returned to fingerprint intervals.');
        setLiveTs(null);
        return;
      }
      setLiveTs(timestamps);
      setMeta(`${rawCount} actions from Hyperion · ${source}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Live fetch failed');
      setLiveTs(null);
    } finally {
      setLoading(false);
    }
  }, [account]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-2xl tracking-widest text-emerald-400 mb-2 font-bold">
          ORGANIC ACTIVITY FINGERPRINTER
        </div>
        <div className="text-xs opacity-60 mb-2">
          Pixel Journey · educational-reference · not identity proof
        </div>
        <p className="text-xs opacity-50 mb-6 max-w-2xl">
          HCI rewards timing variance. Soft signal only — never ban from this score
          alone.
        </p>

        <section
          className="rounded-2xl border border-fuchsia-500/25 bg-fuchsia-500/5 p-4 text-xs space-y-3 max-w-2xl mb-6"
          aria-label="Myths"
        >
          <h2 className="text-sm font-semibold text-fuchsia-100">Myths vs reality</h2>
          {HCI_MYTHS.map((m) => (
            <div key={m.myth}>
              <p className="text-red-200/90">
                <span className="opacity-60">Myth: </span>
                {m.myth}
              </p>
              <p className="text-emerald-100/90 mt-0.5">
                <span className="opacity-60">Reality: </span>
                {m.reality}
              </p>
            </div>
          ))}
        </section>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setMode('live')}
            className={`px-4 py-2 rounded-xl text-sm ${
              mode === 'live' ? 'bg-sky-600' : 'bg-white/10'
            }`}
          >
            Live Hyperion
          </button>
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

        {mode === 'live' && (
          <div className="border border-white/10 bg-black/40 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row gap-3">
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 px-4 py-3 rounded-xl font-mono text-sm"
              placeholder="WAX account"
            />
            <button
              type="button"
              onClick={runLive}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-sky-600 text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Fetching…' : 'Fingerprint live'}
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400 border border-red-500/30 rounded-xl p-3">
            {error}
          </div>
        )}
        {status && (
          <p className="mb-4 text-xs text-emerald-200/80" role="status">
            {status}
          </p>
        )}
        {meta && (
          <div className="mb-4 text-xs opacity-50 break-all">{meta}</div>
        )}

        {result && (
          <div className="border border-white/10 bg-black/40 p-6 rounded-2xl mb-6">
            <div className="text-center mb-6">
              <div className="text-sm opacity-70">
                HUMANITY CERTAINTY INDEX (heuristic)
              </div>
              <div className="text-7xl font-mono text-emerald-400 mt-1">
                {result.humanityCertaintyIndex}
              </div>
              <div className="text-emerald-400/90 mt-1 text-sm">
                {result.classification}
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-70">Sample size</span>
                <span className="font-mono">{result.sampleSize}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-70">Mean gap (s)</span>
                <span className="font-mono">
                  {result.intervals.meanSeconds.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-70">Std dev (s)</span>
                <span className="font-mono">
                  {result.intervals.stdDevSeconds.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="opacity-70">Coeff. of variation</span>
                <span className="font-mono">
                  {result.intervals.coefficientOfVariation.toFixed(3)}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 px-3 py-2 text-xs rounded-lg bg-emerald-900"
              onClick={() => {
                downloadText(
                  `${label}-hci.md`,
                  exportFingerprintMarkdown(label, result),
                  'text/markdown;charset=utf-8'
                );
                setStatus('Report downloaded');
              }}
            >
              Download MD
            </button>

            <ul className="mt-6 space-y-2 text-xs opacity-80">
              {result.flags.map((f) => (
                <li key={f.id}>
                  [{f.level}] {f.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!result && mode === 'live' && !loading && !error && (
          <p className="text-sm opacity-50 mb-6">
            Enter a WAX account and fetch recent Hyperion actions.
          </p>
        )}

        <p className="text-xs opacity-60 leading-relaxed">
          Live: Hyperion →{' '}
          <code className="text-emerald-400/80">fingerprintTimestamps</code>. Trio:
          anomaly-detector · temporal-heatmap. See POLICY.md.
        </p>
      </div>
    </div>
  );
}
