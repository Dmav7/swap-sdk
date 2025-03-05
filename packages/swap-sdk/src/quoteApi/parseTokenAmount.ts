import { Fraction } from 'bi-fraction'

import type { ChainConfig, TokenAmount, TokenInfo } from '../types'
import type { TradeQuoteAmountData } from './types'
import { getNativeTokenInfo } from '../utils/nativeWrappedToken'

export function parseAmount(
  amount: TradeQuoteAmountData,
  nativeTokenChainId?: number,
  chainConfig?: ChainConfig,
): TokenAmount {
  return tokenAmount(
    new Fraction(amount.rawAmount).shr(amount.token.decimals),
    amount.token,
    nativeTokenChainId,
    chainConfig,
  )
}

export function tokenAmount(
  amount: Fraction,
  tokenInfo: TokenInfo,
  nativeTokenChainId?: number,
  chainConfig?: ChainConfig,
): TokenAmount {
  const { address, symbol, decimals } = nativeTokenChainId
    ? getNativeTokenInfo(nativeTokenChainId, chainConfig)
    : tokenInfo
  return {
    amount,
    address,
    symbol,
    decimals,
  }
}
