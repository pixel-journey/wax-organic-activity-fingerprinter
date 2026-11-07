# Education — interval variance into a soft Humanity Certainty Index

> **Rung:** `npm test` passes. The lab computes interval statistics from timestamps you supply and maps coefficient of variation into a 0–100 index. It is not identity verification.  
> **The test is the rule.**

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Run the organic demo and the fixed-60 s demo and see the organic index higher |
| Intermediate | Explain why low variance plus enough samples lowers the index, and why small samples stay near 45 |
| Masterclass | Say why a timing index is only one weak signal, and what the lab still refuses to claim |

---

## Beginner — one scene

```ts
const organic = fingerprintTimestamps(demoOrganicTimestamps(28));
const mechanical = fingerprintTimestamps(demoMechanicalTimestamps(28));

organic.humanityCertaintyIndex > mechanical.humanityCertaintyIndex
mechanical.classification === "likely_mechanical"
```

The organic demo adds jittered gaps of hundreds to thousands of seconds. The mechanical demo adds a fixed 60 s every step. Both start from the same base timestamp.

### Words

| Word | Meaning here |
| --- | --- |
| Interval | Difference between consecutive sorted timestamps (seconds) |
| CV | Coefficient of variation: stdDev / mean. Higher means more relative spread |
| HCI | Humanity Certainty Index, 5–98 after the formula. Higher leans organic |
| Classification | `likely_organic` (≥70), `mixed` (≥45), `likely_mechanical` otherwise |
| Small sample | Fewer than 5 timestamps or fewer than 4 intervals → index forced to 45 |

### Predict, then run

```bash
npm test
```

1. Organic demo HCI is greater than mechanical demo HCI.
2. Mechanical classification is `"likely_mechanical"`.
3. Fixed 60 s series produces near-zero standard deviation.

---

## Intermediate — the formula and the flags

`computeIntervals` sorts and diffs. `computeIntervalStats` returns mean, population stdDev, min, max, and CV.

`humanityCertaintyFromStats`:

- Early return 45 when sampleSize < 5 or interval count < 4.
- `cvScore = min(1, CV / 1.2) * 70`
- `sampleBoost = min(20, log10(sampleSize) * 10)`
- `nearZeroPenalty = 25` when stdDev < 2 and count ≥ 8
- Final: `round(max(5, min(98, 15 + cvScore + sampleBoost - nearZeroPenalty)))`

Flags are added for small samples, near-zero variance, high CV, or a low index. A neutral info flag is added when nothing else fires.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Treat HCI as identity | Ban or airdrop decision | soft index only; flags warn | engines.test.ts + POLICY |
| Ignore sample size | Over-confident on 3 points | forced 45 below thresholds | formula early return |
| Call Hyperion from the unit test | Network dependency | demos are pure local arrays | engines.test.ts |
| Claim the mechanical demo is always a bot | False positive | classification is a label on the index, not a verdict | mechanical.classification |

---

## Masterclass — variance is one weak signal

Humans can have regular habits. Bots can add jitter. A single index computed from timestamps cannot separate them with certainty. The lab never reads an account, never fetches live data in the test path, and never emits a ban recommendation.

What is still not here:

- A live Hyperion subscription (the optional soft-fail helper is out of the unit tests).
- Funding, asset, or social corroboration.
- A calibrated false-positive rate on real WAX activity.
- Any claim that a high HCI proves a human or a low HCI proves a bot.

Companions that stay separate: `wax-behavioral-anomaly-detector` (rises when variance collapses) and `wax-temporal-behavior-heatmap` (day × hour grid).

### Exercise

1. Why does the mechanical demo classify as `likely_mechanical`? (Near-zero stdDev triggers the penalty and a low CV; tested.)
2. What index does a 3-timestamp series receive? (45. Early return.)
3. Is a high HCI proof of humanity? (No. The course and POLICY say it is a weak signal.)

---

## What this course will not teach

- How to ban an account from timing data alone
- A production bot-detection model
- Identity verification
