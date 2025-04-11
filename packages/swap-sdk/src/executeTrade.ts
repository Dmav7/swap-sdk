import type { Signer, TransactionRequest } from 'ethers'

import { CHAIN_CONFIGS } from './config'
import { encodeTrade } from './smartRouter/encodeTrade'
import type { EncodeArgs } from './smartRouter/types'
import type { Trade } from './types'
import { NoRouterAddressError } from './errors'

export type TradeTxOptions = Omit<EncodeArgs, 'recipient'> & {
  routerAddress?: string
}
export type ExecuteTradeOptions = TradeTxOptions & {
  recipient?: string
}

export async function executeTrade(chainId: number, trade: Trade, signer: Signer, options: ExecuteTradeOptions = {}) {
  const recipient = options.recipient ?? (await signer.getAddress())
  return signer.sendTransaction(prepareTradeTxRequest(chainId, trade, recipient, options))
}

export function prepareTradeTxRequest(
  chainId: number,
  trade: Trade,
  recipient: string,
  options: TradeTxOptions = {},
): TransactionRequest {
  const routerAddress = options.routerAddress ?? CHAIN_CONFIGS[chainId]?.contractAddresses.smartRouter
  if (!routerAddress) throw new NoRouterAddressError(chainId)

  const { value, calldata } = encodeTrade(trade, {
    recipient,
    ...options,
  })
  return {
    to: routerAddress,
    data: calldata,
    value,
    gasPrice: options.gasPrice,
  }
}
