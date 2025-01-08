import type {
  PoolType,
  TokenInfo,
  V2PoolTypes,
  V3PoolTypes,
} from "../types/base";

export interface TradeQuoteData {
  amountIn: TradeQuoteAmountData;
  amountOut: TradeQuoteAmountData;
  gasEstimate: string;
  routes: {
    amountIn: TradeQuoteAmountData;
    amountOut: TradeQuoteAmountData;
    gasEstimate: string;
    percentage: number;
    pool: TradeQuotePoolData[];
  }[];
}
export interface TradeQuoteAmountData {
  rawAmount: string;
  token: TokenInfo;

  /**
   * @deprecated string value with decimals, please use rawAmount with token.decimals
   */
  amount: string;
}
export interface TradeQuoteBasePoolData {
  token0: TokenInfo;
  token1: TokenInfo;
  address: string;
  version: PoolType;
}
export interface TradeQuoteV2PoolData extends TradeQuoteBasePoolData {
  version: V2PoolTypes;
  reserve0: TradeQuoteAmountData;
  reserve1: TradeQuoteAmountData;
}
export interface TradeQuoteV3PoolData extends TradeQuoteBasePoolData {
  version: V3PoolTypes;
  fee: V3PoolTypes;
  liquidity: string;
  sqrtRatioX96: string;
  tick: string;
  token0ProtocolFee: number;
  token1ProtocolFee: number;
}
export type TradeQuotePoolData = TradeQuoteV2PoolData | TradeQuoteV3PoolData;
