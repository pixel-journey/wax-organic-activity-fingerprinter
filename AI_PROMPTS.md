# AI handoff — Humanity Certainty Index

## Non-negotiables

1. Organic demo (28 timestamps) → HCI **53**, classification **`mixed`**, flag `neutral`.
2. Mechanical fixed 60 s gaps → HCI **5**, **`likely_mechanical`**, near-zero flags.
3. Sample of **3** timestamps → HCI **45** (early return). Small sample: fewer than 5 timestamps or fewer than 4 intervals.
4. Bands: `likely_organic` ≥70, `mixed` ≥45, else `likely_mechanical`.
5. Formula: CV score, sample boost, near-zero penalty when stdDev < 2 and count ≥ 8; final roughly clamp 5–98.
6. **Not** identity. **Not** a ban authority. HCI ≥70 is not proof of a human.
7. Unit path uses pure local arrays. Do not call Hyperion inside unit tests.

## Prompt seeds

- "Organic vs mechanical demo — HCI and classification."
- "Three timestamps — index?"
- "Refuse a policy that bans on low HCI alone."
- "Contrast with the anomaly detector (low CV raises anomaly there)."

## Do not

- Treat HCI as KYC or sole airdrop exclusion.
- Call the mechanical demo "always a bot."
- Fetch live Hyperion in the pure score path.
