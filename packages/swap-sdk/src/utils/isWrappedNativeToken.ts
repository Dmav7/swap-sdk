import { WRAPPED_NATIVE_TOKEN_BY_CHAIN } from "../config/wrappedNativeToken";
import type { SupportedChainId, TokenInfo } from "../types";
import { isSameAddr } from "./isSameAddr";

export function isWrappedNativeToken(
  chainId: SupportedChainId,
  token: TokenInfo,
) {
  return isWrappedNativeTokenAddr(chainId, token.address);
}

export function isWrappedNativeTokenAddr(
  chainId: SupportedChainId,
  address: string,
) {
  return isSameAddr(address, WRAPPED_NATIVE_TOKEN_BY_CHAIN[chainId].address);
}
