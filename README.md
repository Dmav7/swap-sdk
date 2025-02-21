# VVS Finance Swap SDK

## Overview

The Swap SDK provides functionality to fetch the best trade and execute trades on the cronos evm (VVS). This SDK is designed to be used in decentralized finance (DeFi) applications.

## Installation

To install the Swap SDK, run the following command:

```sh
npm install @vvs-finance/swap-sdk
```

## Prepare client ID

`fetchBestTrade` function depends on our optimized quote API for best trading deal and smooth experience.

To access our quote API, please submit a ticket in our [Discord](https//discord.com/invite/V2957zMsmg) to request a client ID.

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
import {
  fetchBestTrade,
  PoolType,
  SupportedChainId,
} from "@vvs-finance/swap-sdk";

const chainId = SupportedChainId.CRONOS_MAINNET;
const inputToken = "NATIVE";
const outputToken = "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03";
const amount = "2.5";

fetchBestTrade(chainId, inputToken, outputToken, amount, {
  maxHops: 3,
  maxSplits: 2,
  poolTypes: [
    PoolType.V2,
    PoolType.V3_100,
    PoolType.V3_500,
    PoolType.V3_3000,
    PoolType.V3_10000,
  ],
  quoteApiClientId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // or set process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_25
}).then((trade) => {
  console.log(trade);
});
```

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
  SupportedChainId,
} from "@vvs-finance/swap-sdk";
import { ethers } from "ethers";

const chainId = SupportedChainId.CRONOS_MAINNET;
const inputToken = "NATIVE";
const outputToken = "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03";
const amount = "2.5";

fetchBestTrade(chainId, inputToken, outputToken, amount, {
  quoteApiClientId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // or set process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_25
}).then(async (trade) => {
  console.log(trade);
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const tx = await executeTrade(chainId, trade, signer);
  console.log(tx);
  return tx.wait();
});
```

### Executing a Trade via your own web3 interface

To execute a trade with your own web3 interface, you can use the `prepareTradeTxRequest` function to prepare transaction request object and execute the way you prefer. This function takes the following required parameters:

- `chainId`: The ID of the blockchain network.
- `trade`: The trade object obtained from `fetchBestTrade`.
- `recipient`: Where output token should be sent.

#### Example

```typescript
import {
  fetchBestTrade,
  SupportedChainId,
  prepareTradeTxRequest,
} from "@vvs-finance/swap-sdk";
import { ethers } from "ethers";

const chainId = SupportedChainId.CRONOS_MAINNET;
const inputToken = "NATIVE";
const outputToken = "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03";
const amount = "2.5";

const provider = new ethers.JsonRpcProvider("https://evm.cronos.org/");
const wallet = new ethers.Wallet("PRIVATE_KEY", provider);

fetchBestTrade(chainId, inputToken, outputToken, amount, {
  quoteApiClientId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // or set process.env.SWAP_SDK_QUOTE_API_CLIENT_ID_25
}).then(async (trade) => {
  console.log(trade);
  const txRequest = prepareTradeTxRequest(chainId, trade, wallet.address);
  const tx = await wallet.sendTransaction(txRequest);
  console.log({ txRequest, tx });
  return tx.wait();
});
```

### API Reference

#### `fetchBestTrade`

Fetches the best trade for the given parameters.

##### Parameters

- `chainId`: The ID of the blockchain network. can be:
  - `SupportedChainId.CRONOS_MAINNET` (25)
  - `SupportedChainId.CRONOS_TESTNET` (338)
- `inputTokenAddressArg`: The address of the input token or "NATIVE" for the native token.
- `outputTokenAddressArg`: The address of the output token or "NATIVE" for the native token.
- `amount`: The amount to be used as input or output.
- `argOpts`: `Partial<BestAMMTradeOpts>` - Optional arguments for the trade.
  - `tradeType`: `TradeType.EXACT_INPUT` or `TradeType.EXACT_OUTPUT`
    - By default `tradeType` is `TradeType.EXACT_INPUT`
    - When set to `TradeType.EXACT_OUTPUT`, `amount` will be used as output amount
  - `maxHops`: how much steps to consider between input and output token
    - default: `1`, max: `3`
  - `maxSplits`: for example swapping 100 CRO to VVS, `{ maxSplits: 2 }` means the algorithm will consider splitting 100 CRO into 2 parts: 5 and 95 CRO to VVS, then 10 and 90 CRO to VVS...to see which one is most beneficial
    - default: `1`, max: `2`
  - `poolTypes`: pool types to consider
    - possible types: `PoolType.V2`, `PoolType.V3_100`, `PoolType.V3_500`, `PoolType.V3_3000` and `PoolType.V3_10000`
    - default: `[PoolType.V2]`
  - `slippageTolerance`,
    - When `TradeType.EXACT_INPUT`: this is used to calculate minimal output amount, transaction will revert if contract can't send out such amount
    - When `TradeType.EXACT_OUTPUT`: this is used to calculate maximum input amount, transaction will revert if contract is using more than such amount
  - `quoteApiEndpoint`: URL of quote API endpoint to overwrite
  - `quoteApiClientId`: client ID for accessing the quote API

Environment variables:

- `SWAP_SDK_QUOTE_API_CLIENT_ID_${chainId}`: client ID for accessing the quote API
  - `SWAP_SDK_QUOTE_API_CLIENT_ID_25`: for cronos mainnet
  - `SWAP_SDK_QUOTE_API_CLIENT_ID_338`: for cronos testnet
- `SWAP_SDK_QUOTE_API_ENDPOINT_${chainId}`: Optional custom API endpoint
  - `SWAP_SDK_QUOTE_API_ENDPOINT_25`: for cronos mainnet
  - `SWAP_SDK_QUOTE_API_ENDPOINT_338`: for cronos testnet

##### Returns

- `Promise<Trade>` - A promise that resolves to the trade object. This object contains `amountIn`, `amountOut`, `routes`

#### `executeTrade`

Executes the given trade on the blockchain.

##### Parameters

- `chainId`: The ID of the blockchain network. can be:
  - `SupportedChainId.CRONOS_MAINNET`
  - `SupportedChainId.CRONOS_TESTNET`
- `trade`: `Trade` - The trade object obtained from `fetchBestTrade`.
- `signer`: `Signer` - The signer object to sign the transaction.
- `options`: `ExecuteTradeOptions` - Optional arguments for executing the trade.
  - `recipient`: where output token should be sent
  - `deadlineOrPreviousBlockhash`
  - `fee`: compensation for token taxes
  - `routerAddress`: SmartRouter contract address to overwrite

##### Returns

- `Promise<TransactionResponse>` - A promise that resolves to the transaction response.

#### `prepareTradeTxRequest`

Encode calldata and prepare transaction request object.

##### Parameters

- `chainId`: The ID of the blockchain network. can be:
  - `SupportedChainId.CRONOS_MAINNET`
  - `SupportedChainId.CRONOS_TESTNET`
- `trade`: `Trade` - The trade object obtained from `fetchBestTrade`.
- `recipient`: where output token should be sent
- `options`: `TradeTxOptions` - Optional arguments for executing the trade.
  - `deadlineOrPreviousBlockhash`
  - `fee`: compensation for token taxes
  - `routerAddress`: SmartRouter contract address to overwrite

##### Returns

- `ethers.TransactionReceipt` - transaction request object. This object contains `to`, `data`, `value`

### `swap-sdk` Development

```shell
git clone https://github.com/vvs-finance/swap-sdk
cd swap-sdk
pnpm install
cp .env.example .env
pnpm test
pnpm test:swap-sdk -- packages/swap-sdk/test/fetchBestTrade.test.ts # run a test suite file in swap-sdk
```

- package source entrypoint: `packages/swap-sdk/src/index.ts`
- tests: `packages/swap-sdk/test/`

### License

This project is licensed under the GNU GPLv3 License. See the `LICENSE` file for details.
