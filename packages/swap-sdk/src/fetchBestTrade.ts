import { Fraction } from "bi-fraction";

import {
  DEFAULT_FETCH_QUOTE_OPTS,
  QUOTE_API_ENDPOINT_BY_CHAIN,
} from "./config/quoteApi";
import { WRAPPED_NATIVE_TOKEN_BY_CHAIN } from "./config/wrappedNativeToken";
import { fetchQuoteApi } from "./quoteApi/fetchQuoteApi";
import { parseQuoteApiData } from "./quoteApi/parseQuoteApiData";
import type { SupportedChainId } from "./types";
import type { BestAMMTradeOpts, Trade } from "./types/trade";

export const NATIVE_TOKEN_ID = "NATIVE" as const;
export type InputOutputTokenArg = typeof NATIVE_TOKEN_ID | string;
export type AmountArg = string | { wei: bigint | string; decimals: number };

/**
 * @param chainId
 * @param inputTokenAddressArg supply string literal "NATIVE" for native token
 * @param outputTokenAddressArg supply string literal "NATIVE" for native token
 * @param amount used as inputAmount when tradeType is EXACT_INPUT, outputAmount when tradeType is EXACT_OUTPUT
 * @param tradeType optional arguments like tradeType, poolTypes. By defaults tradeType is EXACT_INPUT
 *
 * amount string will be treated as with decimals, example of amount:
 * * "1.3" is equivalent to { wei: '1300000000000000000', decimals: 18 }
 * * "0.7" is equivalent to { wei: 7000000000000000000n, decimals: 18 }
 */
export async function fetchBestTrade(
  chainId: SupportedChainId,
  inputTokenAddressArg: InputOutputTokenArg,
  outputTokenAddressArg: InputOutputTokenArg,
  amount: AmountArg,
  argOpts: Partial<BestAMMTradeOpts> = {},
): Promise<Trade> {
  const [isInputNative, inputTokenAddress] = parseAndWrapNativeTokenAddr(
    chainId,
    inputTokenAddressArg,
  );
  const [isOutputNative, outputTokenAddress] = parseAndWrapNativeTokenAddr(
    chainId,
    outputTokenAddressArg,
  );

  const opts = {
    ...DEFAULT_FETCH_QUOTE_OPTS,
    ...argOpts,
  };

  const quoteData = await fetchQuoteApi({
    chainId,
    inputTokenAddress,
    outputTokenAddress,
    amount: parseAmountArg(amount),
    ...opts,
  });

  return parseQuoteApiData(
    chainId,
    quoteData,
    isInputNative,
    isOutputNative,
    opts,
  );
}

function parseAmountArg(amount: AmountArg): string {
  if (typeof amount === "string") {
    return amount;
  }
  return new Fraction(amount.wei).shr(amount.decimals).toFixed(amount.decimals);
}

function parseAndWrapNativeTokenAddr(
  chainId: SupportedChainId,
  inputOutputTokenAddress: InputOutputTokenArg,
): [isNative: boolean, address: string] {
  if (inputOutputTokenAddress === NATIVE_TOKEN_ID) {
    return [true, WRAPPED_NATIVE_TOKEN_BY_CHAIN[chainId].address];
  }
  return [false, inputOutputTokenAddress];
}
