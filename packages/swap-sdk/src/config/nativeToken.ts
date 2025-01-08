import { SupportedChainId } from "../types";
import type { NativeOrTokenInfo } from "../types/base";

export const NATIVE_TOKEN_BY_CHAIN: Record<
  SupportedChainId,
  NativeOrTokenInfo
> = {
  [SupportedChainId.CRONOS_MAINNET]: {
    address: "NATIVE",
    symbol: "WCRO",
    decimals: 18,
  },
  [SupportedChainId.CRONOS_TESTNET]: {
    address: "NATIVE",
    symbol: "WCRO",
    decimals: 18,
  },
};
