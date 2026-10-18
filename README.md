# wax-organic-activity-fingerprinter

> **Status:** 🔄 Deep Refinement (PX Perfection Standard v1.1)  
> **Category:** Behavioral analytics / light forensics  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**Goal:** Educational toolkit that turns a series of **action timestamps** into transparent **interval statistics**, flags, and a **heuristic Humanity Certainty Index (HCI)** — so teams can discuss organic vs mechanical timing without black-box magic.

> **This is not identity verification.** Low variance can be a bot *or* a human with a rigid habit. High variance can still be a sophisticated script. Use as one weak signal among many.

---

## What changed in this refinement

Earlier UI used **random numbers** for the index. That is gone. Core math now lives in pure functions:

- `computeIntervals` / `computeIntervalStats`
- `humanityCertaintyFromStats` / `fingerprintTimestamps`
- Demo organic vs fixed-60s series for teaching

---

## Quick Start

1. Read limitations in §1.
2. Import `fingerprintTimestamps` from `examples/engines.ts`.
3. Feed Unix-second timestamps from Hyperion (or any history API).
4. Render `CertaintyGauge`, `StatsPanel`, `FlagsList`.

```ts
import { fingerprintTimestamps } from "./examples/engines";

const result = fingerprintTimestamps([1700000000, 1700000400, 1700004000]);
// result.humanityCertaintyIndex, result.flags, result.intervals
```

---

## 1. Educational Core

| Idea | Meaning |
|------|--------|
| **Inter-action interval** | Seconds between consecutive actions |
| **Std dev / CV** | How steady the cadence is |
| **Near-zero variance** | Cron-like or highly regular behavior |
| **HCI** | 0–100 heuristic from CV + sample size + penalties |

### Limitations (read these)

- Timing only — ignores funding graphs, asset graphs, social graph
- Short histories are noisy (flagged)
- Should not be the sole input to bans or airdrops

### Learning outcomes

- Compute interval stats from timestamps
- Interpret CV and near-zero variance flags
- Wire Hyperion history into the same pure pipeline

---

## 2. Architecture

```
timestamps[] → intervals → stats → HCI + flags → UI panels
```

Hyperion fetch stays at the app edge; engines stay pure and testable.

---

## 3. Integration levels

| Level | Scope |
|-------|--------|
| **Minimal** | `fingerprintTimestamps` + print stats |
| **Recommended** | Gauge + stats + flags + disclaimer |
| **Advanced** | Batch wallets, combine with funding-trail / heatmap tools |

---

## 4. Ecosystem position

Pairs with:
- `wax-temporal-behavior-heatmap`
- `wax-funding-trail-lineage-graph`
- Sybil / airdrop fairness tools (when present)

---

## 5. License

MIT — **Pixel Journey**

*Exemplifies [PX Perfection Standard](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/PX-PERFECTION-STANDARD.md) v1.1 — honesty over inflated status labels.*

*Last major refinement pass: October 2026*
