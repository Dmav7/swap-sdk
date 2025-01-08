import { Fraction } from "bi-fraction";

import { tokenAmountToWei } from "../../src/utils/tokenAmountToWei";

// helpers.setRecording(true);

describe("tokenAmountToWei", () => {
  it("converts", async () => {
    expect(
      tokenAmountToWei({
        amount: new Fraction(
          "145711685636420343340996797",
          "200000000000000000000",
        ),
        address: "0x904bd5a5aac0b9d88a0d47864724218986ad4a3a",
        symbol: "VVS",
        decimals: 18,
      }),
    ).toBe(728558428182101716704984n);
  });
});
