import { TradeType } from "../../src";
import {
  encodeSingleHopV3Swap,
  encodeV3Swaps,
} from "../../src/smartRouter/encodeV3Swaps";
import {
  usdcToFulV3MultiHopExactOutputTradeRoute,
  usdcToFulV3MultiHopTradeRoute,
} from "../fixtures/v3MultiHopTrades";
import {
  usdcToVvsV3SimpleTradeRoute,
  vvsToUsdcV3ExactOutputTradeRoute,
} from "../fixtures/v3Trades";
import * as helpers from "../helpers";

describe("encodeV3Swaps", () => {
  it("encodes usdc to ful multihop route", async () => {
    const route = usdcToFulV3MultiHopTradeRoute();
    const encoded = encodeV3Swaps(route, TradeType.EXACT_INPUT, false, {
      recipient: "0x0000000000000000000000000000000000000003",
    });

    expect(encoded).toBe(
      helpers.useFixture(
        encoded,
        __filename,
        "encoded-usdc-ful-multi-hop.json",
      ),
    );
  });

  it("encodes usdc to ful multihop route with exact output", async () => {
    const route = usdcToFulV3MultiHopExactOutputTradeRoute();
    const encoded = encodeV3Swaps(route, TradeType.EXACT_OUTPUT, false, {
      recipient: "0x0000000000000000000000000000000000000003",
    });

    expect(encoded).toBe(
      helpers.useFixture(
        encoded,
        __filename,
        "encoded-usdc-ful-multi-hop-exact-output.json",
      ),
    );
  });
});

describe("encodeSingleHopV3Swap", () => {
  it("encodes simple usdc to vvs route", async () => {
    const route = usdcToVvsV3SimpleTradeRoute();
    const encoded = encodeSingleHopV3Swap(route, TradeType.EXACT_INPUT, false, {
      recipient: "0x0000000000000000000000000000000000000003",
    });

    expect(encoded).toBe(
      helpers.useFixture(encoded, __filename, "encoded-simple-usdc-vvs.json"),
    );
  });

  it("encodes vvs to exact output usdc route", async () => {
    const route = vvsToUsdcV3ExactOutputTradeRoute();
    const encoded = encodeSingleHopV3Swap(
      route,
      TradeType.EXACT_OUTPUT,
      false,
      { recipient: "0x0000000000000000000000000000000000000003" },
    );

    expect(encoded).toBe(
      helpers.useFixture(
        encoded,
        __filename,
        "encoded-vvs-usdc-exact-output.json",
      ),
    );
  });
});
