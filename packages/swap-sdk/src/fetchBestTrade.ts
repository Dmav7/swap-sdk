import { Fraction } from 'bi-fraction'

import { fetchQuoteApi } from './quoteApi/fetchQuoteApi'
import { parseQuoteApiData } from './quoteApi/parseQuoteApiData'
import type { BuiltInChainId, ChainConfig } from './types'
import type { BestAMMTradeOpts, Trade } from './types/trade'
import { DEFAULT_FETCH_BEST_TRADE_OPTS } from './config'
import { getWrappedNativeTokenInfo } from './utils/nativeWrappedToken'

export const NATIVE_TOKEN_ID = 'NATIVE' as const
export type InputOutputTokenArg = typeof NATIVE_TOKEN_ID | string
export type AmountArg = string | { wei: bigint | string; decimals: number }

/**
 * @param chainId
 * @param inputTokenAddressArg supply string literal "NATIVE" for native token
 * @param outputTokenAddressArg supply string literal "NATIVE" for native token
 * @param amount used as inputAmount when tradeType is EXACT_INPUT, outputAmount when tradeType is EXACT_OUTPUT
 * @param tradeType optional arguments like tradeType, poolTypes. By defaults tradeType is EXACT_INPUT
 *
 * amount string will be treated as with decimals, example of amount:
 * * "1.3" is equivalent to { wei: '1300000000000000000', decimals: 18 }
 * * "0.7" is equivalent to { wei: 7000000000000000000n, decimals: 18 }
 */
export async function fetchBestTrade(
  chainId: BuiltInChainId,
  inputTokenAddressArg: InputOutputTokenArg,
  outputTokenAddressArg: InputOutputTokenArg,
  amount: AmountArg,
  argOpts: Partial<BestAMMTradeOpts> = {},
): Promise<Trade> {
  const [isInputNative, inputTokenAddress] = parseAndWrapNativeTokenAddr(
    chainId,
    inputTokenAddressArg,
    argOpts.chainConfig,
  )
  const [isOutputNative, outputTokenAddress] = parseAndWrapNativeTokenAddr(
    chainId,
    outputTokenAddressArg,
    argOpts.chainConfig,
  )

  const opts = {
    ...DEFAULT_FETCH_BEST_TRADE_OPTS,
    ...argOpts,
  }

  const quoteData = await fetchQuoteApi({
    chainId,
    inputTokenAddress,
    outputTokenAddress,
    amount: parseAmountArg(amount),
    ...opts,
  })

  return parseQuoteApiData(chainId, quoteData, isInputNative, isOutputNative, opts)
}

function parseAmountArg(amount: AmountArg): string {
  if (typeof amount === 'string') {
    return amount
  }
  return new Fraction(amount.wei).shr(amount.decimals).toFixed(amount.decimals)
}

function parseAndWrapNativeTokenAddr(
  chainId: BuiltInChainId,
  inputOutputTokenAddress: InputOutputTokenArg,
  chainConfig?: ChainConfig,
): [isNative: boolean, address: string] {
  if (inputOutputTokenAddress === NATIVE_TOKEN_ID) {
    return [true, getWrappedNativeTokenInfo(chainId, chainConfig).address]
  }
  return [false, inputOutputTokenAddress]
}
