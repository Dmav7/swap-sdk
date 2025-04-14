# @vvs-finance/swap-sdk

- [Installation](https://github.com/vvs-finance/swap-sdk?tab=readme-ov-file#installation)
- [Usage](https://github.com/vvs-finance/swap-sdk?tab=readme-ov-file#usage)

## API Reference

### Trade Functions

#### `fetchBestTrade`

Fetches the best trade for a given pair of tokens.

```typescript
import { fetchBestTrade } from '@vvs-finance/swap-sdk'

function fetchBestTrade(
  chainId: BuiltInChainId,
  inputTokenAddressArg: InputOutputTokenArg,
  outputTokenAddressArg: InputOutputTokenArg,
  amount: AmountArg,
  argOpts?: Partial<BestAMMTradeOpts>,
): Promise<Trade>
```

##### Parameters

- `chainId`: The ID of the blockchain network. can be:
  - `BuiltInChainId.CRONOS_MAINNET` (25)
  - `BuiltInChainId.CRONOS_TESTNET` (338)
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
    - Please see [here](https://github.com/vvs-finance/swap-sdk?tab=readme-ov-file#prepare-quote-api-client-id)

This function also tries to read these environment variables on Nodejs:

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

```typescript
import { executeTrade } from '@vvs-finance/swap-sdk'

function executeTrade(
  chainId: number,
  trade: Trade,
  signer: Signer,
  options?: ExecuteTradeOptions,
): Promise<TransactionResponse>
```

##### Parameters

- `chainId`: The ID of the blockchain network. can be:
  - `BuiltInChainId.CRONOS_MAINNET`
  - `BuiltInChainId.CRONOS_TESTNET`
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

```typescript
import { prepareTradeTxRequest } from '@vvs-finance/swap-sdk'

function prepareTradeTxRequest(
  chainId: number,
  trade: Trade,
  recipient: string,
  options?: TradeTxOptions,
): TransactionRequest
```

##### Parameters

- `chainId`: The ID of the blockchain network. can be:
  - `BuiltInChainId.CRONOS_MAINNET`
  - `BuiltInChainId.CRONOS_TESTNET`
- `trade`: `Trade` - The trade object obtained from `fetchBestTrade`.
- `recipient`: where output token should be sent
- `options`: `TradeTxOptions` - Optional arguments for executing the trade.
  - `deadlineOrPreviousBlockhash`
  - `fee`: compensation for token taxes
  - `routerAddress`: SmartRouter contract address to overwrite

##### Returns

- `ethers.TransactionReceipt` - transaction request object. This object contains `to`, `data`, `value`

### Token Functions

#### `fetchTokenBalanceWei`

Fetches the balance of a token for a given wallet address.

```typescript
import { fetchTokenBalanceWei } from '@vvs-finance/swap-sdk'

function fetchTokenBalanceWei(
  chainId: BuiltInChainId,
  tokenAddress: string,
  walletAddress: string,
  provider?: Provider,
): Promise<bigint>
```

#### `fetchNativeTokenBalanceWei`

Fetches the balance of the native token for a given wallet address.

```typescript
import { fetchNativeTokenBalanceWei } from '@vvs-finance/swap-sdk'

function fetchNativeTokenBalanceWei(
  chainId: BuiltInChainId,
  walletAddress: string,
  providerArg?: Provider,
): Promise<bigint>
```

### ERC20 Approval Functions

#### `fetchTradeInputTokenAllowanceWei`

Fetches the allowance of the input token for a trade.

```typescript
import { fetchTradeInputTokenAllowanceWei } from '@vvs-finance/swap-sdk'

function fetchTradeInputTokenAllowanceWei(
  chainId: BuiltInChainId,
  trade: Trade,
  walletAddress: string,
  opts?: FetchAllowanceOpts,
): Promise<bigint>
```

#### `prepareApprovalTxRequestIfNeeded`

Prepares an approval transaction request if needed.

```typescript
import { prepareApprovalTxRequestIfNeeded } from '@vvs-finance/swap-sdk'

function prepareApprovalTxRequestIfNeeded(
  chainId: BuiltInChainId,
  trade: Trade,
  walletAddress: string,
  opts?: FetchAllowanceOpts,
): Promise<TransactionRequest | null>
```

#### `approveIfNeeded`

Sends an approval transaction if needed.

```typescript
import { approveIfNeeded } from '@vvs-finance/swap-sdk'

function approveIfNeeded(
  chainId: BuiltInChainId,
  trade: Trade,
  signer: Signer,
  opts?: Omit<FetchAllowanceOpts, 'provider'> & {
    gasPrice?: number | bigint
  },
): Promise<TransactionResponse | null>
```

### Native Token Wrapping Functions

#### `prepareWrapNativeTxRequest`

Prepares a transaction request to wrap native tokens.

```typescript
import { prepareWrapNativeTxRequest } from '@vvs-finance/swap-sdk'

function prepareWrapNativeTxRequest(chainId: number, amount: string | number | bigint): TransactionRequest
```

#### `wrapNative`

Wraps native tokens.

```typescript
import { wrapNative } from '@vvs-finance/swap-sdk'

function wrapNative(
  chainId: number,
  amount: string | number | bigint,
  signer: Signer,
  opts?: NativeWrappingOpts,
): Promise<TransactionResponse>
```

#### `prepareUnwrapNativeTxRequest`

Prepares a transaction request to unwrap native tokens.

```typescript
import { prepareUnwrapNativeTxRequest } from '@vvs-finance/swap-sdk'

function prepareUnwrapNativeTxRequest(chainId: number, amount: string | number | bigint): TransactionRequest
```

#### `unwrapNative`

Unwraps native tokens.

```typescript
import { unwrapNative } from '@vvs-finance/swap-sdk'

function unwrapNative(
  chainId: number,
  amount: string | number | bigint,
  signer: Signer,
  opts?: NativeWrappingOpts,
): Promise<TransactionResponse>
```

### Enums

#### `BuiltInChainId`

```typescript
import { BuiltInChainId } from '@vvs-finance/swap-sdk'

enum BuiltInChainId {
  CRONOS_MAINNET = 25,
  CRONOS_TESTNET = 338,
}
```

#### `TradeType`

```typescript
import { TradeType } from '@vvs-finance/swap-sdk'

enum TradeType {
  EXACT_INPUT = 'EXACT_INPUT',
  EXACT_OUTPUT = 'EXACT_OUTPUT',
}
```

#### `PoolType`

```typescript
import { PoolType } from '@vvs-finance/swap-sdk'

enum PoolType {
  V2 = 'V2',
  V3_100 = 'V3_100',
  V3_500 = 'V3_500',
  V3_3000 = 'V3_3000',
  V3_10000 = 'V3_10000',
}
```

### Utilities

The SDK provides various utility functions:

```typescript
import { utils } from '@vvs-finance/swap-sdk'
```

- `utils.formatTrade`
- `utils.getNativeTokenInfo`
- `utils.getWrappedNativeTokenInfo`
- `utils.isSameAddr`

### ABIs

The SDK includes the following ABIs:

```typescript
import { abi } from '@vvs-finance/swap-sdk'
```

- `abi.SmartRouter`
- `abi.ERC20`
- `abi.WCRO`

---

## Development

```shell
git clone https://github.com/vvs-finance/swap-sdk
cd swap-sdk
pnpm install
cp .env.example .env
pnpm test
pnpm test:swap-sdk -- packages/swap-sdk/test/development.test.ts # run a test suite file in swap-sdk
```

- package source entrypoint: `packages/swap-sdk/src/index.ts`
- tests: `packages/swap-sdk/test/`
