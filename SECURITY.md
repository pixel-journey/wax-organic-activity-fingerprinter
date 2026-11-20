# Security — Humanity Certainty Index

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Sample < 5 timestamps | HCI forced to **45** (`mixed`) |
| Near-zero stdDev with enough intervals | penalty; mechanical demo → HCI **5** |
| Organic jitter demo | HCI **53**, classification `mixed` |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Live Hyperion | Unit path uses pure local arrays |
| Ban / airdrop | Index is a **soft signal only** |
| Corroboration | Funding, assets, social not included |

## Attack angles

1. Banning accounts from low HCI alone.  
2. Treating HCI ≥70 as proof of a human.  
3. Calling the mechanical demo "always a bot."

## Honesty limits

No network on the score path. Not identity verification. [docs.wax.io](https://docs.wax.io/) · [anomaly detector](https://github.com/pixel-journey/wax-behavioral-anomaly-detector) · [temporal heatmap](https://github.com/pixel-journey/wax-temporal-behavior-heatmap).
