import type { Provider, Signer } from 'ethers'

export * from './base'
export * from './contracts'
export * from './trade'

export enum BuiltInChainId {
  CRONOS_MAINNET = 25,
  CRONOS_TESTNET = 338,
}

/**
 * @deprecated. Use `BuiltInChainId` instead.
 */
export const SupportedChainId = BuiltInChainId

export type SignerOrProvider = Signer | Provider
