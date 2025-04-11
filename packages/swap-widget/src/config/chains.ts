import { BuiltInChainId } from '@vvs-finance/swap-sdk'

export const DEFAULT_CHAIN_ID = BuiltInChainId.CRONOS_MAINNET
export const SELECTABLE_CHAIN_IDS = [BuiltInChainId.CRONOS_MAINNET, BuiltInChainId.CRONOS_TESTNET]

export const CHAIN_EXPLORER_BASE_URL: Record<BuiltInChainId, string> = {
  [BuiltInChainId.CRONOS_MAINNET]: 'https://explorer.cronos.org',
  [BuiltInChainId.CRONOS_TESTNET]: 'https://explorer.cronos.org/testnet',
}
