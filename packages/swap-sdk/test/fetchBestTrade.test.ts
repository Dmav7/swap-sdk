import { fetchBestTrade, PoolType, SupportedChainId, TradeType } from "../src";
import * as helpers from "./helpers";

// helpers.setRecording(true);

describe("fetchBestTrade integration", () => {
  beforeEach(() => {
    helpers.setupNockBeforeEach(__filename);
  });

  afterEach(() => {
    helpers.concludeNockAfterEach(__filename);
  });

  it("should fetch best trade NATIVE -> USDC with default options", async () => {
    const inputToken = "NATIVE";
    const outputToken = "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b";

    const request = fetchBestTrade(
      SupportedChainId.CRONOS_TESTNET,
      inputToken,
      outputToken,
      "3.2",
    );

    await expect(request).resolves.toBeDefined();

    const trade = await request;
    const tradeData = helpers.serialization(trade);
    expect(tradeData).toEqual(
      helpers.useFixture(tradeData, __filename, "native-usdc-trade.json"),
    );
  });

  it("should fetch best trade NATIVE -> USDC with EXACT_OUTPUT", async () => {
    const inputToken = "NATIVE";
    const outputToken = "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b";

    const amount = { wei: 418080n, decimals: 6 };
    const request = fetchBestTrade(
      SupportedChainId.CRONOS_TESTNET,
      inputToken,
      outputToken,
      amount,
      {
        tradeType: TradeType.EXACT_OUTPUT,
      },
    );

    await expect(request).resolves.toBeDefined();

    const trade = await request;
    const tradeData = helpers.serialization(trade);
    expect(tradeData).toEqual(
      helpers.useFixture(
        tradeData,
        __filename,
        "native-usdc-exact-output-trade.json",
      ),
    );
  });

  it("should fetch best trade VVS -> USDC with v3 and single-hop", async () => {
    const inputToken = "0x321106e51b78e0e9cebcfec63c5250f0f3ccb82b";
    const outputToken = "0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a";

    const request = fetchBestTrade(
      SupportedChainId.CRONOS_TESTNET,
      inputToken,
      outputToken,
      "5.4",
      {
        poolTypes: [
          PoolType.V3_100,
          PoolType.V3_10000,
          PoolType.V3_3000,
          PoolType.V3_500,
        ],
      },
    );

    await expect(request).resolves.toBeDefined();

    const trade = await request;
    const tradeData = helpers.serialization(trade);
    expect(tradeData).toEqual(
      helpers.useFixture(tradeData, __filename, "usdc-vvs-trade-v3.json"),
    );
  });
});
