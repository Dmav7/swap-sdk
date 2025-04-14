import { print, jsonStr, getEthersSigner } from './utils.mjs'
import * as config from './config.mjs'

import { fetchBestTrade, executeTrade, PoolType, approveIfNeeded, utils as SwapSdkUtils } from '@vvs-finance/swap-sdk'

export function runEtherExecuteTrade() {
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

    const signer = await getEthersSigner()
    print(`signer.address: ${signer.address}`)

    const approvalTx = await approveIfNeeded(chainId, trade, signer)
    if (approvalTx) {
      print(`approveIfNeeded: ${approvalTx.hash}`)
      await approvalTx.wait()
    }

    const tx = await executeTrade(chainId, trade, signer)
    print(`executeTrade: ${tx.hash}`)
  })
}
