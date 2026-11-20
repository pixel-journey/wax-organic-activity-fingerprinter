import { describe, expect, it } from "vitest";
import {
  demoMechanicalTimestamps,
  demoOrganicTimestamps,
  fingerprintTimestamps,
} from "./engines";

describe("fingerprintTimestamps", () => {
  it("locks the demo indexes and the short-sample floor", () => {
    const org = fingerprintTimestamps(demoOrganicTimestamps(28));
    const mech = fingerprintTimestamps(demoMechanicalTimestamps(28));
    expect(org.humanityCertaintyIndex).toBe(53);
    expect(org.classification).toBe("mixed");
    expect(org.flags.map((flag) => flag.id)).toEqual(["neutral"]);
    expect(mech.humanityCertaintyIndex).toBe(5);
    expect(mech.classification).toBe("likely_mechanical");
    expect(mech.flags.map((flag) => flag.id)).toEqual([
      "near-zero-variance",
      "mechanical-lean",
    ]);
    expect(fingerprintTimestamps([1, 2, 3]).humanityCertaintyIndex).toBe(45);
  });
});
