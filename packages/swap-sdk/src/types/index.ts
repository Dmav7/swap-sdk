import type { Provider, Signer } from "ethers";

export * from "./base";
export * from "./contracts";
export * from "./trade";

export enum SupportedChainId {
  CRONOS_MAINNET = 25,
  CRONOS_TESTNET = 338,
}

export type SignerOrProvider = Signer | Provider;
