# VVS Finance Swap SDK

## Overview

The Swap SDK provides functionality to fetch the best trade and execute trades on the cronos evm (VVS). This SDK is designed to be used in decentralized finance (DeFi) applications.

## Installation

To install the Swap SDK, run the following command:

```sh
npm install @vvs-finance/swap-sdk
```

## Prepare quote API client ID

`fetchBestTrade` function depends on our optimized quote API for best trading deal and smooth experience.

To access our quote API, please submit a ticket in our [Discord](https://discord.com/invite/V2957zMsmg) to request a client ID.

## Usage

### Fetching the Best Trade

To fetch the best trade, you can use the `fetchBestTrade` function. This function takes the following required parameters:

- `chainId`: The ID of the blockchain network.
- `inputTokenAddressArg`: The address of the input token or "NATIVE" for the native token.
- `outputTokenAddressArg`: The address of the output token or "NATIVE" for the native token.
- `amount`: The amount to be used as input or output.
- `argOpts.quoteApiClientId` or `process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_${chainId}`: Client ID for accessing the quote API

#### Example

```typescript
import { fetchBestTrade, PoolType, BuiltInChainId, utils as SwapSdkUtils } from '@vvs-finance/swap-sdk'

const chainId = BuiltInChainId.CRONOS_TESTNET
const inputToken = '0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a'
const outputToken = 'NATIVE'
const amount = '2.5'

fetchBestTrade(chainId, inputToken, outputToken, amount, {
  poolTypes: [PoolType.V2, PoolType.V3_100, PoolType.V3_500, PoolType.V3_3000, PoolType.V3_10000],
  maxHops: 3,
  maxSplits: 2,
  quoteApiClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // or set process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_338 in nodejs
}).then((trade) => {
  console.log(`fetchBestTrade: ${SwapSdkUtils.formatTrade(trade)}`)
  console.log(trade)
})
```

see [`fetchBestTrade.mjs`](./examples/swap-sdk-example/src/fetchBestTrade.mjs) under [swap-sdk-example](./examples/swap-sdk-example).

### Executing a Trade via `executeTrade`

To execute a trade, you can use the `executeTrade` function. This function takes the following required parameters:

- `chainId`: The ID of the blockchain network.
- `trade`: The trade object obtained from `fetchBestTrade`.
- `signer`: The signer object to sign the transaction.

#### Example

```typescript
import {
  fetchBestTrade,
  executeTrade,
  BuiltInChainId,
  PoolType,
  approveIfNeeded,
  utils as SwapSdkUtils,
} from '@vvs-finance/swap-sdk'
import { ethers } from 'ethers'

const chainId = BuiltInChainId.CRONOS_TESTNET
const inputToken = '0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a'
const outputToken = 'NATIVE'
const amount = '2.5'

fetchBestTrade(chainId, inputToken, outputToken, amount, {
  poolTypes: [PoolType.V2, PoolType.V3_100, PoolType.V3_500, PoolType.V3_3000, PoolType.V3_10000],
  maxHops: 3,
  maxSplits: 2,
  quoteApiClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // or set process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_338 in nodejs
}).then(async (trade) => {
  console.log(`fetchBestTrade: ${SwapSdkUtils.formatTrade(trade)}`)
  console.log(trade)

  const provider = new ethers.BrowserProvider(window.ethereum, chainId)
  const signer = await provider.getSigner()
  console.log(`signer.address: ${signer.address}`)

  const approvalTx = await approveIfNeeded(chainId, trade, signer)
  if (approvalTx) {
    console.log(`approveIfNeeded: ${approvalTx.hash}`)
    await approvalTx.wait()
  }

  const tx = await executeTrade(chainId, trade, signer)
  console.log(`executeTrade: ${tx.hash}`)
})
```

see [`executeTrade.mjs`](./examples/swap-sdk-example/src/executeTrade.mjs) under [swap-sdk-example](./examples/swap-sdk-example).

### Executing a Trade via your own web3 interface

To execute a trade with your own web3 interface, you can use the `prepareTradeTxRequest` function to prepare transaction request object and execute the way you prefer. This function takes the following required parameters:

- `chainId`: The ID of the blockchain network.
- `trade`: The trade object obtained from `fetchBestTrade`.
- `recipient`: Where output token should be sent.

#### Example

```typescript
import {
  fetchBestTrade,
  PoolType,
  prepareTradeTxRequest,
  prepareApprovalTxRequestIfNeeded,
  utils as SwapSdkUtils,
} from '@vvs-finance/swap-sdk'
import { createPublicClient, createWalletClient, custom } from 'viem'
import * as viemChains from 'viem/chains'

const chain = viemChains.cronosTestnet
const chainId = chain.id
const inputToken = '0x904Bd5a5AAC0B9d88A0D47864724218986Ad4a3a'
const outputToken = 'NATIVE'
const amount = '2.5'

fetchBestTrade(chainId, inputToken, outputToken, amount, {
  poolTypes: [PoolType.V2, PoolType.V3_100, PoolType.V3_500, PoolType.V3_3000, PoolType.V3_10000],
  maxHops: 3,
  maxSplits: 2,
  quoteApiClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // or set process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_338 in nodejs
}).then(async (trade) => {
  console.log(`fetchBestTrade: ${SwapSdkUtils.formatTrade(trade)}`)
  console.log(trade)

  const viemClient = {
    public: createPublicClient({ chain, transport: custom(window.ethereum) }),
    wallet: createWalletClient({
      chain,
      transport: custom(window.ethereum),
      account: (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0],
    }),
  }

  const [address] = await viemClient.wallet.getAddresses()
  console.log(`viemClient.wallet.getAddresses(): ${address}`)

  const approvalTxRequest = await prepareApprovalTxRequestIfNeeded(chainId, trade, address)
  if (approvalTxRequest) {
    console.log('prepareApprovalTxRequestIfNeeded:', approvalTxRequest)
    const approvalTxHash = await viemClient.wallet.sendTransaction(approvalTxRequest)
    console.log(`ERC20 approval tx sent: ${approvalTxHash}`)
    await viemClient.public.waitForTransactionReceipt({ hash: approvalTxHash })
  }

  const tradeTxRequest = prepareTradeTxRequest(config.chain.id, trade, address)
  console.log('prepareTradeTxRequest:', tradeTxRequest)
  const txHash = await viemClient.wallet.sendTransaction(tradeTxRequest)
  console.log(`trade sent: ${txHash}`)
})
```

see [`prepareTradeTxRequest.mjs`](./examples/swap-sdk-example/src/prepareTradeTxRequest.mjs) under [swap-sdk-example](./examples/swap-sdk-example).

### `@vvs-finance/swap-sdk` API Reference

see [here](./packages/swap-sdk/README.md#api-reference)

### VVS Finance Swap Widget

`@vvs-finance/swap-widget` is a React library that provides a `<SwapWidget />` component for integrating a swap widget into your application.

see [packages/swap-widget/README.md](./packages/swap-widget/README.md) for more information on how to use and develop the widget.

### License

This project is licensed under the GNU GPLv3 License. See the `LICENSE` file for details.
