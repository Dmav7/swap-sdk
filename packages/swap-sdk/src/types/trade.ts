import type { Fraction } from "bi-fraction";

import type {
  NativeOrTokenAmount,
  PoolType,
  TokenAmount,
  TokenInfo,
  TradeType,
  V2PoolTypes,
  V3PoolTypes,
} from "./base";

export interface Trade {
  type: TradeType;

  amountIn: NativeOrTokenAmount;
  amountOut: NativeOrTokenAmount;

  routes: TradeRoute[];

  // gasEstimate: Fraction; // not implemented in quoteApi yet

  price: Fraction;

  lpFeeRatio: Fraction; // trading fee ratio
  lpFee: TokenAmount; // trading fee
  slippage: Slippage;
}

export interface TradeRoute {
  amountIn: TokenAmount;
  amountOut: TokenAmount;
  // gasEstimate: Fraction; // not implemented in quoteApi yet
  percentage: Fraction;

  pool: TradeRoutePool[];

  path: TokenInfo[];
  slippage: Slippage;
}

export interface BasePool {
  token0: TokenInfo;
  token1: TokenInfo;
  address: string;
  version: PoolType;
  token0Price: Fraction;
  token1Price: Fraction;
}
export interface V2Pool extends BasePool {
  version: V2PoolTypes;
  reserve0: TokenAmount;
  reserve1: TokenAmount;
}
export interface V3Pool extends BasePool {
  version: V3PoolTypes;
  // fee: V3PoolTypes,
  liquidity: bigint;
  sqrtRatioX96: bigint;
  tick: number;
  // token0ProtocolFee: number
  // token1ProtocolFee: number
}
export type TradeRoutePool = V2Pool | V3Pool;

interface SlippageMinimumReceived {
  minimumReceived: TokenAmount;
  type: "minimumReceived";
  tolerance: Fraction;
}
interface SlippageMaximumSold {
  maximumSold: TokenAmount;
  type: "maximumSold";
  tolerance: Fraction;
}
export type Slippage = SlippageMinimumReceived | SlippageMaximumSold;

/**
 * options for fetchBestTrade
 */
export interface BestAMMTradeOpts {
  tradeType: TradeType;
  maxHops: number;
  maxSplits: number;
  poolTypes: PoolType[];
  slippageTolerance: number;
  quoteApiEndpoint?: string;
}

export interface TradeExtraInfo {
  lpFeeRatio: number; // trading fee ratio
  lpFee: TokenAmount; // trading fee
  priceImpact: number;
  priceImpactExcludeLpFee: number; // price impact exclude trading fee
  gasEstimate: string; // gas estimate in native token = gasEstimate * gasPrice
  gasRefundMin: number;
  gasRefundMax: number;
  receivedMin: TokenAmount;
  receivedMax: TokenAmount;
  disableSwap: boolean;
}
