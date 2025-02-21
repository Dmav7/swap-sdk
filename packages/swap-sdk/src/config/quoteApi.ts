import { SupportedChainId } from "../types";
import { PoolType, TradeType } from "../types/base";
import type { BestAMMTradeOpts } from "../types/trade";

export const QUOTE_API_ENDPOINT_BY_CHAIN: Partial<
  Record<SupportedChainId, string>
> = {
  [SupportedChainId.CRONOS_MAINNET]:
    "https://public-api.vvs.finance/api/v1/quote",
  [SupportedChainId.CRONOS_TESTNET]:
    "https://testnet-public-api.vvs.finance/api/v1/quote",
};

export const DEFAULT_FETCH_QUOTE_OPTS: BestAMMTradeOpts = {
  tradeType: TradeType.EXACT_INPUT,
  poolTypes: [
    PoolType.V2,
    // PoolType.V3_100,
    // PoolType.V3_500,
    // PoolType.V3_3000,
    // PoolType.V3_10000,
  ],
  maxHops: 1,
  maxSplits: 1,
  slippageTolerance: 0.005,
};
