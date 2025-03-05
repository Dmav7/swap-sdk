import type { BestAMMTradeOpts } from '../types/trade'
import {
  NoQuoteApiChainNameError,
  NoQuoteApiClientIdError,
  NoQuoteApiEndpointError,
  PoolUnsupportedError,
  TradeTypeUnsupportedError,
} from '../errors'
import {
  ServerChainUnsupportedError,
  ServerInsufficientLiquidityError,
  ServerOtherError,
  ServerPoolUnsupportedError,
  ServerTokenUnsupportedError,
} from './serverErrors'
import type { TradeQuoteData } from './types'
import {
  QUOTE_API_CHAIN_NAMES,
  QUOTE_API_ENDPOINT_BY_CHAIN,
  QUOTE_API_POOL_TYPES,
  QUOTE_API_TRADE_TYPES,
} from '../config/quoteApi'
import { getEnv } from '../utils/getEnv'

type FetchQuoteApiArgs = {
  chainId: number
  inputTokenAddress: string
  outputTokenAddress: string

  amount: string
} & BestAMMTradeOpts

interface TradeQuoteRes {
  code: number
  data: TradeQuoteData
  message: string
}

export async function fetchQuoteApi(args: FetchQuoteApiArgs): Promise<TradeQuoteData> {
  const {
    chainId,
    inputTokenAddress,
    outputTokenAddress,
    amount,
    tradeType,
    maxHops,
    maxSplits,
    poolTypes,
    quoteApiEndpoint,
    quoteApiClientId,
    quoteApiChainName,
  } = args

  const endpoint =
    quoteApiEndpoint ?? getEnv(`SWAP_SDK_QUOTE_API_ENDPOINT_${chainId}`) ?? QUOTE_API_ENDPOINT_BY_CHAIN[chainId]
  const clientId = quoteApiClientId ?? getEnv(`SWAP_SDK_QUOTE_API_CLIENT_ID_${chainId}`)

  if (!endpoint) {
    throw new NoQuoteApiEndpointError(chainId)
  }
  if (!clientId) {
    throw new NoQuoteApiClientIdError(chainId)
  }

  const apiChainName = quoteApiChainName ?? QUOTE_API_CHAIN_NAMES[chainId]
  if (!apiChainName) {
    throw new NoQuoteApiChainNameError(chainId)
  }
  const apiTradeType = QUOTE_API_TRADE_TYPES[tradeType]
  if (!apiTradeType) {
    throw new TradeTypeUnsupportedError(tradeType)
  }

  const apiPoolTypes = poolTypes.map((poolType) => QUOTE_API_POOL_TYPES[poolType])
  if (apiPoolTypes.some((poolType) => !poolType)) {
    throw new PoolUnsupportedError(poolTypes)
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': clientId,
    },
    body: JSON.stringify({
      chain: apiChainName,
      currencyIn: inputTokenAddress,
      currencyOut: outputTokenAddress,
      amount,
      tradeType: apiTradeType,
      maxHops,
      maxSplits,
      poolTypes: apiPoolTypes,
    }),
  })

  const quoteRes = (await response.json()) as TradeQuoteRes
  throwIfError(quoteRes, args)

  return quoteRes.data
}

function throwIfError(quoteRes: TradeQuoteRes, args: FetchQuoteApiArgs) {
  if (quoteRes.code === 0 && quoteRes.data) return

  switch (quoteRes.code) {
    case 40000:
      throw new ServerChainUnsupportedError(args.chainId)
    case 40001:
      throw new ServerPoolUnsupportedError(args.poolTypes)
    case 40002:
      throw new ServerTokenUnsupportedError(args.inputTokenAddress, args.outputTokenAddress)
    case 40003:
      throw new ServerInsufficientLiquidityError()
    default:
      throw new ServerOtherError(quoteRes.message)
  }
}
