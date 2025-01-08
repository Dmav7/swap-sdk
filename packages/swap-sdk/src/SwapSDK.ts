import type { BaseContract, InterfaceAbi, Signer } from "ethers";

import { SmartRouter as SmartRouterAbi } from "./abis";
import type { ContractAddressMap, ContractName } from "./config";
import { getContractAddress } from "./config";
import { QUOTE_API_ENDPOINT_BY_CHAIN } from "./config/quoteApi";
import type { ExecuteTradeOptions } from "./executeTrade";
import { executeTrade } from "./executeTrade";
import type { AmountArg, InputOutputTokenArg } from "./fetchBestTrade";
import { fetchBestTrade } from "./fetchBestTrade";
import type { BestAMMTradeOpts, SignerOrProvider, Trade } from "./types";
import type { ProviderOptions } from "./utils";
import { getContract, getProvider } from "./utils";

export interface SDKOptions {
  providerOptions: ProviderOptions;
  contractAddressMap?: ContractAddressMap;
  quoteApiEndpoint?: string;
}

export class SwapSDK {
  private providerOptions: SDKOptions["providerOptions"];
  private contractAddressMap?: ContractAddressMap;
  private quoteApiEndpoint?: string;

  constructor(options: SDKOptions) {
    const { providerOptions, contractAddressMap, quoteApiEndpoint } = options;
    this.providerOptions = providerOptions;
    this.contractAddressMap = contractAddressMap;
    this.quoteApiEndpoint = quoteApiEndpoint;
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
    return fetchBestTrade(
      this.providerOptions.chainId,
      inputTokenAddressArg,
      outputTokenAddressArg,
      amount,
      {
        quoteApiEndpoint: this.getQuoteApiEndpoint(),
        ...argOpts,
      },
    );
  }

  public executeTrade(
    trade: Trade,
    signer: Signer,
    options: ExecuteTradeOptions = {},
  ) {
    return executeTrade(this.providerOptions.chainId, trade, signer, {
      routerAddress: this.getContractAddress("SmartRouter"),
      ...options,
    });
  }

  private getContract = <T extends BaseContract = BaseContract>(
    address: string,
    abi: InterfaceAbi,
    signerOrProvider?: SignerOrProvider,
  ): T => {
    if (!signerOrProvider) {
      signerOrProvider = getProvider(this.providerOptions);
    }

    return getContract<T>(address, abi, signerOrProvider);
  };

  public getContractAddress = (contractName: ContractName) => {
    if (this.contractAddressMap) {
      return this.contractAddressMap[contractName];
    }

    return getContractAddress(this.providerOptions.chainId, contractName);
  };

  public getQuoteApiEndpoint() {
    return (
      this.quoteApiEndpoint ??
      QUOTE_API_ENDPOINT_BY_CHAIN[this.providerOptions.chainId]
    );
  }

  public getSmartRouter = (signerOrProvider?: SignerOrProvider) =>
    this.getContract(
      this.getContractAddress("SmartRouter"),
      SmartRouterAbi,
      signerOrProvider,
    );
}
