# wax-organic-activity-fingerprinter

**Organic Activity Fingerprinter**

A single-wallet search terminal that calculates a "Humanity Certainty Index" by analyzing the entropy and variance of transaction timing patterns. Clearly distinguishes natural human behavior from mechanical, script-driven activity.

**Status:** 🔒 Private (In Development) | Target: Public when v1 complete  
**Category:** Community Forensics, Identity Alignment & Sybil Detection  
**Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

> Built to the same high standard of educational excellence, production readiness, and WAX best practices as the [gkniftyheads-tracker](https://github.com/henrikpiga/gkniftyheads-tracker).

---

## Quick Start

```bash
git clone https://github.com/pixel-journey/wax-organic-activity-fingerprinter.git
cd wax-organic-activity-fingerprinter
npm install
npm run dev
```

Enter any WAX wallet address in the demo to instantly see the Humanity Certainty Index and detailed entropy analysis.

---

## Why This Blueprint?

Bots and scripts often exhibit zero-variance timing (exact cron-like intervals), while humans show natural randomness and daily rhythms. This tool quantifies that difference visually and mathematically, helping projects, guilds, and airdrop distributors separate real community from automated farming.

---

## Architecture & Data Flow

```
Input Wallet Address
       ↓
Fetch Action History (Hyperion)
       ↓
Calculate Time Interval Statistics
  - Mean, std dev, variance of gaps between actions
  - Entropy / randomness score
       ↓
Pattern Classification
  - Flag zero-variance loops (strong bot signal)
  - Highlight natural scatter (human-like)
       ↓
Interactive Results View
  - Certainty Index gauge
  - Timeline scatter of action gaps
  - Detailed statistical breakdown
```

All analysis is client-side after history fetch.

---

## Complete Repository Structure

Follows Pixel Journey high standards.

Key parts:
- `app/` — Main analysis interface
- `components/` — CertaintyGauge, EntropyScatter, PatternFlags, StatisticalTable
- `hooks/` — useActivityEntropy, useHyperionHistory
- `lib/wax/` — entropy-calculator.ts, interval-analyzer.ts, pattern-classifier.ts
- `public/mock-data/` — Sample human vs bot activity profiles
- `.github/workflows/` — CI automation

Detailed educational comments on entropy math and bot detection signals.

---

## Key WAX Concepts Explained

- **Hyperion Action Traces**: Querying timestamped smart contract actions for precise timing analysis.
- **Transaction Entropy**: Statistical measure of randomness in action intervals (low entropy = mechanical).
- **Zero-Variance Detection**: Identifying exact repeating intervals that are strong indicators of scripted behavior.
- **Public History APIs**: Efficient use of Hyperion for behavioral forensics without custom indexing.

This is **WAX-primary** but the entropy analysis and visualization pattern is portable to other Antelope chains with good history data.

---

## Design Specifications

- Clean terminal-style interface with clear scoring
- Interactive scatter plot of action time gaps
- Prominent flags for mechanical patterns
- Responsive and accessible design
- Color-coded certainty levels

Aligned with Pixel Journey Design System.

---

## Technical Architecture & Best Practices

- **Stack**: Next.js 15, TypeScript, Tailwind + shadcn/ui, Chart.js or Recharts for scatter
- **Data**: Hyperion history with efficient fetching and client-side aggregation
- **Performance**: Client-side calculations with React Query caching
- **Demo Mode**: Full functionality with pre-loaded human vs bot profiles
- **Live Mode**: Analyze any public WAX address

See catalog standards for WAX rate limiting and history query best practices.

---

## Demo & Usage

- Explore pre-loaded human vs bot examples
- Input any WAX address for live analysis
- View the Certainty Index and statistical breakdown
- See highlighted mechanical patterns
- Export analysis report

Designed for immediate forensic insight.

---

## Customization

- Adjust entropy thresholds and classification rules
- Add support for specific action types
- Integrate with other forensics tools (Sybil scorer, temporal heatmap, funding trail)
- Customize output and branding

---

## Roadmap

- v1: Core entropy scoring + pattern flagging + demo
- v1.1: Advanced statistical visualizations and batch analysis
- Future: Deeper integration with the full forensics suite

---

## Contributing & Credits

Built with care for a healthier WAX ecosystem.

MIT License.

Following the production-quality educational standards from the gkniftyheads-tracker.

---

*Pixel Journey — Making Web3 interfaces pixel-perfect and delightful.*