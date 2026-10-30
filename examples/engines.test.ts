import { describe, expect, it } from "vitest";
import {
  demoMechanicalTimestamps,
  demoOrganicTimestamps,
  fingerprintTimestamps,
} from "./engines";

describe("fingerprintTimestamps", () => {
  it("organic demo leans higher HCI than mechanical",
    () => {
      const org = fingerprintTimestamps(demoOrganicTimestamps(28));
      const mech = fingerprintTimestamps(demoMechanicalTimestamps(28));
      expect(org.humanityCertaintyIndex).toBeGreaterThan(
        mech.humanityCertaintyIndex
      );
      expect(mech.classification).toBe("likely_mechanical");
    });
});
