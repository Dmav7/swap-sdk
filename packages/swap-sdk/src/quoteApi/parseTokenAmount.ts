import { Fraction } from "bi-fraction";

import { NATIVE_TOKEN_BY_CHAIN } from "../config/nativeToken";
import type { SupportedChainId, TokenAmount, TokenInfo } from "../types";
import type { TradeQuoteAmountData } from "./types";

export function parseAmount(
  amount: TradeQuoteAmountData,
  isNativeChainId?: SupportedChainId,
): TokenAmount {
  return tokenAmount(
    new Fraction(amount.rawAmount).shr(amount.token.decimals),
    amount.token,
    isNativeChainId,
  );
}

export function tokenAmount(
  amount: Fraction,
  tokenInfo: TokenInfo,
  isNativeChainId?: SupportedChainId,
): TokenAmount {
  const { address, symbol, decimals } = isNativeChainId
    ? NATIVE_TOKEN_BY_CHAIN[isNativeChainId]
    : tokenInfo;
  return {
    amount,
    address,
    symbol,
    decimals,
  };
}
