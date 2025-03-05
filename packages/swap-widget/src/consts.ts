import { BuiltInChainId } from '@vvs-finance/swap-sdk'

export const QUERY_KEYS = {
  BALANCE: 'BALANCE',
  BEST_TRADE: 'BEST_TRADE',
  TOKEN_PRICE: 'TOKEN_PRICE',
}

export const TOKEN_ENDPOINT_MAPPING: Record<BuiltInChainId, string> = {
  [BuiltInChainId.CRONOS_MAINNET]: 'https://api.vvs.finance/general/api/v1/token',
  [BuiltInChainId.CRONOS_TESTNET]: '',
}
