import { isSameAddr } from "../../src/utils/isSameAddr";

describe("isSameAddr", () => {
  it("should return true for same addresses with different cases", () => {
    expect(
      isSameAddr(
        "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "0x321106E51B78E0E9CEBCFEC63C5250F0F3CCB82B",
      ),
    ).toBe(true);
  });

  it("should return true for identical addresses", () => {
    expect(
      isSameAddr(
        "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
      ),
    ).toBe(true);
  });

  it("should return false for different addresses", () => {
    expect(
      isSameAddr(
        "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82c",
      ),
    ).toBe(false);
  });

  it("should handle special cases", () => {
    // Empty strings
    expect(isSameAddr("", "")).toBe(true);

    // Different lengths
    expect(
      isSameAddr(
        "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b",
        "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82",
      ),
    ).toBe(false);
  });
});
