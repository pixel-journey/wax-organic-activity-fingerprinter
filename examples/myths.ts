export const HCI_MYTHS = [
  {
    myth: "HCI is identity verification",
    reality:
      "It is a timing heuristic only. Low variance can be bots or rigid human habits.",
  },
  {
    myth: "High HCI proves a human",
    reality:
      "Sophisticated scripts can inject jitter. Use as one weak signal among many.",
  },
  {
    myth: "Ban solely on HCI",
    reality:
      "Never. Pair with anomaly detector, heatmap, and funding analysis.",
  },
] as const;
