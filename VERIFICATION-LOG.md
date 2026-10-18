# Verification Log

Honest record of what has and has not been tested.
Never mark something verified without running it and recording evidence.

## Status legend
- `VERIFIED` — ran against live endpoint or unit test
- `UNTESTED` — code exists, never executed
- `BROKEN` — ran, failed
- `N/A` — not applicable

## Claims in this repo
| Claim | Status | Evidence |
| --- | --- | --- |
| computeIntervals / computeIntervalStats correctly derive seconds between timestamps | UNTESTED | examples/engines.ts |
| humanityCertaintyFromStats produces deterministic 0–100 heuristic from CV + sample size | UNTESTED | fingerprintTimestamps |
| Near-zero variance flag triggers on fixed-interval series | UNTESTED | demo organic vs fixed-60s |
| Not identity verification — weak signal only | VERIFIED | README limitations section |
| Demo runs with mock timestamps (zero network) | UNTESTED | examples |

## How to verify
```bash
# Typecheck
npm run typecheck

# (Future) Unit tests on engines.ts
# npx vitest run examples/engines.test.ts
```

**Trust label:** educational-reference
