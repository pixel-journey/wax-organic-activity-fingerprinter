# Interval variance into a soft Humanity Certainty Index

> **Trust:** `educational-reference`  
> **Catalog:** `wax-ecosystem-blueprint-catalog` (private index; not this public course)

**One-sentence goal:** Teach pure interval statistics that map coefficient of variation into a 0–100 Humanity Certainty Index, with organic-jitter versus fixed-60 s demos — without claiming identity verification.

**Real code:** `npm test`. **Does not** ban, airdrop, or treat the index as proof.

The course is [EDUCATION.md](EDUCATION.md) (beginner, intermediate, masterclass).

## What is true (executed)

| Rule | Result |
| --- | --- |
| organic demo (28) | HCI `53`, classification `mixed`, flag `neutral` |
| mechanical demo (28) | HCI `5`, classification `likely_mechanical`, flags `near-zero-variance` and `mechanical-lean` |
| three timestamps | HCI `45` |
| `likely_organic` | starts at `70`. The jittered demo does not reach it. |

## What is in the repo

| Piece | Role |
| --- | --- |
| `examples/engines.ts` | intervals, stats, HCI formula, flags, demos |
| `examples/engines.test.ts` | the locked indexes above |
| `examples/live/hyperion.ts` | optional soft-fail timestamp fetch (not in unit tests) |
| `app/page.tsx` | interactive demo |
| Docs | EDUCATION · POLICY · ARCHITECTURE · VERIFICATION-LOG |

## Run

```bash
npm install
npm test
npm run dev
```

## Best practice and the opposite

**Do** keep the engines pure so the demos stay deterministic.  
**Do** treat HCI as one weak signal that needs corroboration.  
**Do** re-check any live Hyperion helper before using it in a host.

**Do not** ban or airdrop from the index alone.  
**Do not** claim a high score proves a human.  
**Do not** ignore the small-sample early return of 45.

## Related

- `wax-behavioral-anomaly-detector`
- `wax-temporal-behavior-heatmap`

MIT — Pixel Journey
