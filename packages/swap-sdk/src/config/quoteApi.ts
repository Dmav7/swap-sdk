import { BuiltInChainId } from '../types'
import { PoolType, TradeType } from '../types/base'

export const QUOTE_API_ENDPOINT_BY_CHAIN: Record<number, string> = {
  [BuiltInChainId.CRONOS_MAINNET]: 'https://public-api.vvs.finance/api/v1/quote',
  [BuiltInChainId.CRONOS_TESTNET]: 'https://testnet-public-api.vvs.finance/api/v1/quote',
} satisfies Record<BuiltInChainId, string>

export const QUOTE_API_CHAIN_NAMES: Record<number, string> = {
  [BuiltInChainId.CRONOS_MAINNET]: 'CRONOS',
  [BuiltInChainId.CRONOS_TESTNET]: 'CRONOS',
} satisfies Record<BuiltInChainId, string>

export const QUOTE_API_TRADE_TYPES: Record<TradeType, string> = {
  [TradeType.EXACT_INPUT]: 'EXACT_INPUT',
  [TradeType.EXACT_OUTPUT]: 'EXACT_OUTPUT',
}

export const QUOTE_API_POOL_TYPES: Record<PoolType, string> = {
  [PoolType.V2]: 'V2',
  [PoolType.V3_100]: 'V3_100',
  [PoolType.V3_500]: 'V3_500',
  [PoolType.V3_3000]: 'V3_3000',
  [PoolType.V3_10000]: 'V3_10000',
}
