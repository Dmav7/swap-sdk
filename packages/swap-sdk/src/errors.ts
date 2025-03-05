export class IncompleteChainConfigError extends Error {
  constructor(chainId: number, chainConfig: any) {
    super(`Imcomplete chain config, chainId ${chainId}, chainConfig: ${JSON.stringify(chainConfig)}`)
  }
}

export class NoQuoteApiEndpointError extends Error {
  constructor(chainId: number) {
    super(
      `No quote api endpoint for chain ${chainId}, you may need to specify via quoteApiEndpoint option or SWAP_SDK_QUOTE_API_ENDPOINT_${chainId} environment variable`,
    )
  }
}

export class NoQuoteApiClientIdError extends Error {
  constructor(chainId: number) {
    super(
      `No quote api client id, please specify via quoteApiClientId option or SWAP_SDK_QUOTE_API_CLIENT_ID_${chainId} environment variable`,
    )
  }
}

export class NoQuoteApiChainNameError extends Error {
  constructor(chainId: number) {
    super(`No network name for quote api on chain ${chainId}, you may need to specify via quoteApiChainName option`)
  }
}

export class TradeTypeUnsupportedError extends Error {
  constructor(tradeType: string) {
    super(`Not supported tradeType: ${tradeType}`)
  }
}

export class PoolUnsupportedError extends Error {
  constructor(poolType: string[]) {
    super(`Not supported pool: ${poolType.join(', ')}`)
  }
}

export class NoRouterAddressError extends Error {
  constructor(chainId: number) {
    super(`No router address for chain: ${chainId}`)
  }
}
