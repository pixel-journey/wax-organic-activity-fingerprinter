# ARCHITECTURE.md — Organic Activity Fingerprinter

## Intent

Transparent timing heuristics for educational behavioral analysis on WAX action histories.

## Invariants

| # | Invariant |
|---|-----------|
| 1 | Core math is pure and deterministic given timestamps |
| 2 | HCI is labeled heuristic, not identity |
| 3 | Small samples emit warn flags |
| 4 | Near-zero std-dev emits alert-level flag |
| 5 | UI must not claim ban-grade certainty |

## Data flow

```
Hyperion (or mock) action times
  → fingerprintTimestamps
  → CertaintyGauge / StatsPanel / FlagsList
```

---

*Pixel Journey*
