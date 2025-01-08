import { SupportedChainId } from "../types";
import type { TokenInfo } from "../types/base";

export const WRAPPED_NATIVE_TOKEN_BY_CHAIN: Record<
  SupportedChainId,
  TokenInfo
> = {
  [SupportedChainId.CRONOS_MAINNET]: {
    address: "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23",
    symbol: "WCRO",
    decimals: 18,
  },
  [SupportedChainId.CRONOS_TESTNET]: {
    address: "0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4",
    symbol: "WCRO",
    decimals: 18,
  },
};
