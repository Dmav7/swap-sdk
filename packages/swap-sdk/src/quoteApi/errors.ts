export class NetworkUnsupportedError extends Error {
  constructor(chainId: number) {
    super(`Not support chainId: ${chainId}`);
  }
}

export class NoQuoteApiEndpointError extends Error {
  constructor(chainId: number) {
    super(
      `No quote api endpoint for chain ${chainId}, you may need to specify via quoteApiEndpoint option`,
    );
  }
}

export class TradeTypeUnsupportedError extends Error {
  constructor(tradeType: string) {
    super(`Not supported tradeType: ${tradeType}`);
  }
}

export class PoolUnsupportedError extends Error {
  constructor(poolType: string[]) {
    super(`Not supported pool: ${poolType.join(", ")}`);
  }
}

export class ServerChainUnsupportedError extends Error {
  constructor(chainId: number) {
    super(`Server does not support chainId: ${chainId}`);
  }
}

export class ServerPoolUnsupportedError extends Error {
  constructor(poolTypes: string[]) {
    super(`Server does not support pool types: ${poolTypes.join(", ")}`);
  }
}

export class ServerTokenUnsupportedError extends Error {
  constructor(input: string, output: string) {
    super(`Server does not support token, input: ${input}, output: ${output}`);
  }
}

export class ServerInsufficientLiquidityError extends Error {
  constructor() {
    super(`Server: Inefficient liquidity`);
  }
}

export class ServerOtherError extends Error {
  constructor(message: string) {
    super(`Server error: ${message}`);
  }
}
