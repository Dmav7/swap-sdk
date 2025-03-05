import { BestAMMTradeOpts, PoolType, TradeType } from '../types'

export const DEFAULT_FETCH_BEST_TRADE_OPTS: BestAMMTradeOpts = {
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
}
