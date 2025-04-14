import { print, jsonStr, getViemClient } from './utils.mjs'
import * as config from './config.mjs'

import {
  fetchBestTrade,
  PoolType,
  prepareTradeTxRequest,
  prepareApprovalTxRequestIfNeeded,
  utils as SwapSdkUtils,
} from '@vvs-finance/swap-sdk'

export function runPrepareTradeTxRequestAndSendWithViem() {
  const chainId = config.chain.id
  const inputToken = config.inputToken
  const outputToken = config.outputToken
  const amount = config.amount

  print(jsonStr({ chainId, inputToken, outputToken, amount }))

  return fetchBestTrade(chainId, inputToken, outputToken, amount, {
    poolTypes: [PoolType.V2, PoolType.V3_100, PoolType.V3_500, PoolType.V3_3000, PoolType.V3_10000],
    maxHops: 3,
    maxSplits: 2,
    quoteApiClientId: config.quoteApiClientId, // or set process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_338 in nodejs
  }).then(async (trade) => {
    print(`fetchBestTrade: ${SwapSdkUtils.formatTrade(trade)}`)
    console.log(trade)

    const viemClient = await getViemClient()

    const [address] = await viemClient.wallet.getAddresses()
    print(`viemClient.wallet.getAddresses(): ${address}`)

    const approvalTxRequest = await prepareApprovalTxRequestIfNeeded(chainId, trade, address)
    if (approvalTxRequest) {
      print('prepareApprovalTxRequestIfNeeded:', approvalTxRequest)
      const approvalTxHash = await viemClient.wallet.sendTransaction(approvalTxRequest)
      print(`ERC20 approval tx sent: ${approvalTxHash}`)
      await viemClient.public.waitForTransactionReceipt({ hash: approvalTxHash })
    }

    const tradeTxRequest = prepareTradeTxRequest(config.chain.id, trade, address)
    print('prepareTradeTxRequest:', tradeTxRequest)
    const txHash = await viemClient.wallet.sendTransaction(tradeTxRequest)
    print(`trade sent: ${txHash}`)
  })
}
