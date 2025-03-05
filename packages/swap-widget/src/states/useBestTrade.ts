import useSWR from 'swr/immutable'
import { useMemo } from 'react'
import { BestAMMTradeOpts, fetchBestTrade, BuiltInChainId } from '@vvs-finance/swap-sdk'
import { QUERY_KEYS } from '../consts'
import useDebounce from '../utils/useDebounce'

const DEFAULT_AMOUNT_DEBOUNCE_DELAY = 200

export interface UseBestTradeArgs {
  chainId?: BuiltInChainId
  inputTokenAddress?: string
  outputTokenAddress?: string
  getQuoteApiClientId: (chainId: number) => string
}
export interface UseBestTradeOpts extends Partial<BestAMMTradeOpts> {
  amountDebounceDelay?: number
}

export function useBestTrade(
  amount: string,
  args: UseBestTradeArgs,
  { amountDebounceDelay, ...opts }: UseBestTradeOpts = {},
) {
  const argsKey = useMemo(() => JSON.stringify(args), [args])
  const optsKey = useMemo(() => JSON.stringify(opts), [opts])
  const debouuncedAmount = useDebounce(amount, amountDebounceDelay ?? DEFAULT_AMOUNT_DEBOUNCE_DELAY)

  return useSWR(
    args.chainId &&
      args.inputTokenAddress &&
      args.outputTokenAddress &&
      debouuncedAmount && [QUERY_KEYS.BEST_TRADE, argsKey, optsKey, debouuncedAmount],
    async () => {
      try {
        const quoteApiClientId = args.getQuoteApiClientId(args.chainId!)
        return await fetchBestTrade(
          args.chainId!,
          args.inputTokenAddress!,
          args.outputTokenAddress!,
          debouuncedAmount,
          {
            quoteApiClientId,
            ...opts,
          },
        )
      } catch (error) {
        console.error('useBestTrade error:', error)
      }
    },
  )
}
