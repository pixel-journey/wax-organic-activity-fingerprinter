# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX context |
| [anomaly detector](https://github.com/pixel-journey/wax-behavioral-anomaly-detector) | Inverse framing (low CV raises anomaly) |
| [temporal heatmap](https://github.com/pixel-journey/wax-temporal-behavior-heatmap) | Day × hour grid |
| [POLICY.md](POLICY.md) | Soft-signal rules |

## Product facts locked by tests

- Organic demo (28 timestamps) → HCI **53**, `mixed`, flag `neutral`.
- Mechanical fixed 60s gaps → HCI **5**, `likely_mechanical`, near-zero flags.
- Sample of 3 timestamps → HCI **45** (early return).
- Bands: `likely_organic` ≥70, `mixed` ≥45, else `likely_mechanical`.
- Formula uses CV, sample boost, near-zero penalty; clamp roughly 5–98.
- **Not** identity. **Not** a ban authority.
