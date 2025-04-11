# VVS Finance Swap Widget

**⚠️ Work in Progress: `@vvs-finance/swap-widget` is currently under development and may undergo significant changes. Use at your own risk.**

`@vvs-finance/swap-widget` is a React library that provides a `<SwapWidget />` component for integrating a swap widget into your application.

## Installation

To install the package, use npm or yarn:

```sh
npm install @vvs-finance/swap-widget
```

## Usage

### Minimal Example

To use the `<SwapWidget />` component in your application, import it and include it in your JSX:

```js
import React from 'react'
import { SwapWidget } from '@vvs-finance/swap-widget'

function App() {
  return (
    <div>
      <SwapWidget
        getQuoteApiClientId={(chainId) => {
          switch (chainId) {
            case BuiltInChainId.CRONOS_MAINNET:
              return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            case BuiltInChainId.CRONOS_TESTNET:
              return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
          }
          return ''
        }}
      />
    </div>
  )
}

export default App
```

For example, a simple Next.js page [index.tsx](../../examples/next-swap-widget-example/src/pages/index.tsx) in [next-swap-widget-example](../../examples/next-swap-widget-example/)

#### Quote API Client ID

`<SwapWidget />` depends on our optimized quote API for best trading deal and smooth experience.

To access our quote API, please submit a ticket in our [Discord](https://discord.com/invite/V2957zMsmg) to request a client ID.

It is best to manage client ID with environment variables depends on your project setup.

### Comprehensive Guide on Wallet Connections

The `<SwapWidget />` component can work with both internal and external (host) wallet connections. Below is a comprehensive guide on how to set up these connections.

#### Internal Wallet Connection

The widget can manage its own wallet connection. This is useful for simple integrations where you don't need to control the wallet connection externally.

#### External (Host) Wallet Connection

For more advanced use cases, you can control the wallet connection externally and pass the provider and account information to the widget.

```js
import { MetaMask } from '@react-web3-wallet/metamask'
import { createWallet } from '@react-web3-wallet/react'

const metamask = createWallet(new MetaMask())

function App() {
  const provider = metamask.useProvider()
  const account = metamask.useAccount()
  const chainId = metamask.useChainId()

  return (
    <SwapWidget
      getQuoteApiClientId={(_chainId) => 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}
      provider={account ? provider : undefined}
      onRequestWalletConnection={metamask.connect}
    />
  )
}

export default App
```

For a complete example, refer to the [App.tsx](./app/App.tsx) file.

## Props Reference

### SwapWidget Props

- `getQuoteApiClientId: (chainId: BuiltInChainId) => string`
  - Function to get the API client ID for fetching quotes based on the chain ID.
- `selfConnectingChainId?: number`
  - Chain ID for the widget to connect to by itself.
- `provider?: ExternalProvider`
  - Optional provider for external wallet connection.
- `onRequestWalletConnection?: () => void`
  - Optional callback to request wallet connection.
- `inputToken?: TokenConfig`
  - Optional input token configuration.
- `outputToken?: TokenConfig`
  - Optional output token configuration.
- `tokens?: TokenConfig[]`
  - Optional list of tokens available for swapping.

## Development

To develop the project, use the following commands at root of the monorepo:

```sh
pnpm dev:widget
```
