import type { Fraction } from 'bi-fraction'

export interface ChainConfig {
  nativeTokenInfo: NativeOrTokenInfo
  wrappedTokenInfo: TokenInfo
  contractAddresses: {
    smartRouter: string
  }
}

export interface TokenInfo {
  address: string
  symbol: string
  decimals: number
}
export type NativeOrTokenInfo = TokenInfo & {
  address: string | 'NATIVE'
}

export type TokenAmount = TokenInfo & {
  amount: Fraction
}
export type NativeOrTokenAmount = NativeOrTokenInfo & {
  amount: Fraction
}

export enum TradeType {
  EXACT_INPUT = 'EXACT_INPUT',
  EXACT_OUTPUT = 'EXACT_OUTPUT',
}

export enum PoolType {
  V2 = 'V2',
  V3_100 = 'V3_100',
  V3_500 = 'V3_500',
  V3_3000 = 'V3_3000',
  V3_10000 = 'V3_10000',
}
export type V2PoolTypes = PoolType.V2
export type V3PoolTypes = PoolType.V3_100 | PoolType.V3_500 | PoolType.V3_3000 | PoolType.V3_10000
