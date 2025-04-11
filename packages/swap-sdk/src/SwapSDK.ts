import type { BaseContract, InterfaceAbi, Signer } from 'ethers'

import { ERC20 as ERC20Abi, SmartRouter as SmartRouterAbi } from './abis'
import { CHAIN_CONFIGS } from './config'
import { QUOTE_API_CHAIN_NAMES, QUOTE_API_ENDPOINT_BY_CHAIN } from './config/quoteApi'
import type { ExecuteTradeOptions, TradeTxOptions } from './executeTrade'
import { executeTrade, prepareTradeTxRequest } from './executeTrade'
import type { AmountArg, InputOutputTokenArg } from './fetchBestTrade'
import { fetchBestTrade } from './fetchBestTrade'
import type {
  BestAMMTradeOpts,
  SignerOrProvider,
  Trade,
  ERC20,
  SmartRouter,
  ChainConfig,
  BuiltInChainId,
} from './types'
import type { ProviderOptions } from './utils'
import { getContract } from './utils'
import { IncompleteChainConfigError, NoQuoteApiEndpointError, NoQuoteApiChainNameError } from './errors'

export interface SDKOptions {
  providerOptions: ProviderOptions
  chainConfig?: ChainConfig
  quoteApiEndpoint?: string
  quoteApiChainName?: string
  quoteApiClientId?: string
}

export class SwapSDK {
  private providerOptions: SDKOptions['providerOptions']
  private chainConfig: ChainConfig
  private quoteApiEndpoint: string
  private quoteApiChainName: string
  private quoteApiClientId?: string

  constructor(options: SDKOptions) {
    this.providerOptions = options.providerOptions
    const chainConfig = options.chainConfig ?? CHAIN_CONFIGS[this.providerOptions.chainId]
    const quoteApiEndpoint = options.quoteApiEndpoint ?? QUOTE_API_ENDPOINT_BY_CHAIN[this.providerOptions.chainId]
    const quoteApiChainName = options.quoteApiChainName ?? QUOTE_API_CHAIN_NAMES[this.providerOptions.chainId]

    if (!chainConfig) throw new IncompleteChainConfigError(this.providerOptions.chainId, chainConfig)
    if (!quoteApiEndpoint) throw new NoQuoteApiEndpointError(this.providerOptions.chainId)
    if (!quoteApiChainName) throw new NoQuoteApiChainNameError(this.providerOptions.chainId)

    this.chainConfig = chainConfig
    this.quoteApiEndpoint = quoteApiEndpoint
    this.quoteApiChainName = quoteApiChainName
    this.quoteApiClientId = options.quoteApiClientId
  }

  /**
   * @param inputTokenAddressArg supply string literal "NATIVE" for native token
   * @param outputTokenAddressArg supply string literal "NATIVE" for native token
   * @param amount used as inputAmount when tradeType is EXACT_INPUT, outputAmount when tradeType is EXACT_OUTPUT
   * @param tradeType optional arguments like tradeType, poolTypes. By defaults tradeType is EXACT_INPUT
   *
   * amount string will be treated as with decimals, example of amount:
   * * "1.3" is equivalent to { wei: '1300000000000000000', decimals: 18 }
   * * "0.7" is equivalent to { wei: 7000000000000000000n, decimals: 18 }
   */
  public fetchBestTrade(
    inputTokenAddressArg: InputOutputTokenArg,
    outputTokenAddressArg: InputOutputTokenArg,
    amount: AmountArg,
    argOpts: Partial<BestAMMTradeOpts> = {},
  ) {
    return fetchBestTrade(this.providerOptions.chainId, inputTokenAddressArg, outputTokenAddressArg, amount, {
      chainConfig: this.chainConfig,
      quoteApiEndpoint: this.getQuoteApiEndpoint(),
      quoteApiChainName: this.quoteApiChainName,
      quoteApiClientId: this.quoteApiClientId,
      ...argOpts,
    })
  }

  public executeTrade(trade: Trade, signer: Signer, options: ExecuteTradeOptions = {}) {
    return executeTrade(this.providerOptions.chainId, trade, signer, {
      routerAddress: this.chainConfig.contractAddresses.smartRouter,
      ...options,
    })
  }

  public prepareTradeTxRequest(trade: Trade, recipient: string, options: TradeTxOptions = {}) {
    return prepareTradeTxRequest(this.providerOptions.chainId, trade, recipient, options)
  }

  private getContract = <T extends BaseContract = BaseContract>(
    address: string,
    abi: InterfaceAbi,
    chainIdOrSignerOrProvider?: BuiltInChainId | SignerOrProvider,
  ): T => {
    return getContract<T>(address, abi, chainIdOrSignerOrProvider)
  }

  public getQuoteApiEndpoint() {
    return this.quoteApiEndpoint ?? QUOTE_API_ENDPOINT_BY_CHAIN[this.providerOptions.chainId]
  }

  public getSmartRouter = (signerOrProvider?: SignerOrProvider) =>
    this.getContract<SmartRouter>(this.chainConfig?.contractAddresses.smartRouter, SmartRouterAbi, signerOrProvider)

  public getERC20 = (address: string, signerOrProvider?: SignerOrProvider): ERC20 =>
    this.getContract<ERC20>(address, ERC20Abi, signerOrProvider)
}
