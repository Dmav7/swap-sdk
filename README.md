# VVS Finance Swap SDK

## Overview

The Swap SDK provides functionality to fetch the best trade and execute trades on the cronos evm (VVS). This SDK is designed to be used in decentralized finance (DeFi) applications.

## Installation

To install the Swap SDK, run the following command:

```sh
npm install @vvs-finance/swap-sdk
```

## Usage

### Fetching the Best Trade

To fetch the best trade, you can use the `fetchBestTrade` function. This function takes the following required parameters:

- `chainId`: The ID of the blockchain network.
- `inputTokenAddressArg`: The address of the input token or "NATIVE" for the native token.
- `outputTokenAddressArg`: The address of the output token or "NATIVE" for the native token.
- `amount`: The amount to be used as input or output.

#### Example

```typescript
import { fetchBestTrade, SupportedChainId } from "@vvs-finance/swap-sdk";

const inputToken = "NATIVE";
const outputToken = "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03";
const amount = "2.5";

fetchBestTrade(SupportedChainId.CRONOS_MAINNET, inputToken, outputToken, amount)
  .then((trade) => {
    console.log(trade);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Executing a Trade

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

const inputToken = "NATIVE";
const outputToken = "0x2D03bECE6747ADC00E1a131BBA1469C15fD11e03";
const amount = "2.5";

fetchBestTrade(SupportedChainId.CRONOS_MAINNET, inputToken, outputToken, amount)
  .then(async (trade) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return executeTrade(SupportedChainId.CRONOS_MAINNET, trade, signer);
  })
  .catch((error) => {
    console.error(error);
  });
```

### API Reference

#### `fetchBestTrade`

Fetches the best trade for the given parameters.

##### Parameters

- `chainId`: The ID of the blockchain network. can be:
  - `SupportedChainId.CRONOS_MAINNET`
  - `SupportedChainId.CRONOS_TESTNET` (please set `argOpts.quoteApiEndpoint` or `QUOTE_API_ENDPOINT_338` env)
- `inputTokenAddressArg`: The address of the input token or "NATIVE" for the native token.
- `outputTokenAddressArg`: The address of the output token or "NATIVE" for the native token.
- `amount`: The amount to be used as input or output.
- `argOpts`: `Partial<BestAMMTradeOpts>` - Optional arguments for the trade.
  - `tradeType`: `TradeType.EXACT_INPUT` or `TradeType.EXACT_OUTPUT`
    - By default `tradeType` is `TradeType.EXACT_INPUT`
    - When set to `TradeType.EXACT_OUTPUT`, `amount` will be used as output amount
  - `maxHops`: how much steps to consider between input and output token
    - default: `1`
  - `maxSplits`: for example swapping 100 CRO to VVS, `{ maxSplits: 2 }` means the algorithm will consider splitting 100 CRO into 2 parts: 5 and 95 CRO to VVS, then 10 and 90 CRO to VVS...to see which one is most beneficial,
    - default: `1`
  - `poolTypes`: pool types to consider
    - possible types: `PoolType.V2`, `PoolType.V3_100`, `PoolType.V3_500`, `PoolType.V3_3000` and `PoolType.V3_10000`
    - default: `[PoolType.V2]`
    - `PoolType.V3_*` types are not available for now
  - `slippageTolerance`,
    - When `TradeType.EXACT_INPUT`: this is used to calculate minimal output amount, transaction will revert if contract can't send out such amount
    - When `TradeType.EXACT_OUTPUT`: this is used to calculate maximum input amount, transaction will revert if contract is using more than such amount
  - `quoteApiEndpoint`: URL of routing API endpoint to overwrite

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
- `options`: `Partial<ExecuteTradeOptions>` - Optional arguments for executing the trade.
  - `recipient`: where output token should be sent
  - `deadlineOrPreviousBlockhash`
  - `fee`: compensation for token taxes
  - `routerAddress`: SmartRouter contract address to overwrite

##### Returns

- `Promise<TransactionResponse>` - A promise that resolves to the transaction response.

### `swap-sdk` Development

```shell
git clone https://github.com/vvs-finance/swap-sdk
cd swap-sdk
pnpm install
cp .env.example .env
pnpm test
```

- package source entrypoint: `packages/swap-sdk/src/index.ts`
- tests: `packages/swap-sdk/test/`

### License

This project is licensed under the GNU GPLv3 License. See the `LICENSE` file for details.
