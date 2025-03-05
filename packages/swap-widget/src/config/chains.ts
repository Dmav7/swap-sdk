import { SDKOptions, BuiltInChainId } from '@vvs-finance/swap-sdk'

export const CHAIN_PROVIDER_OPTIONS: Record<BuiltInChainId, SDKOptions['providerOptions']> = {
  [BuiltInChainId.CRONOS_MAINNET]: {
    chainName: 'Cronos EVM Mainnet',
    chainId: BuiltInChainId.CRONOS_MAINNET,
    rpcUrl: 'https://evm.cronos.org/',
  },
  [BuiltInChainId.CRONOS_TESTNET]: {
    chainName: 'Cronos EVM Testnet',
    chainId: BuiltInChainId.CRONOS_TESTNET,
    rpcUrl: 'https://evm-t3.cronos.org/',
  },
}

export const DEFAULT_CHAIN_ID = BuiltInChainId.CRONOS_MAINNET
export const SELECTABLE_CHAIN_IDS = [BuiltInChainId.CRONOS_MAINNET, BuiltInChainId.CRONOS_TESTNET]

export const CHAIN_EXPLORER_BASE_URL: Record<BuiltInChainId, string> = {
  [BuiltInChainId.CRONOS_MAINNET]: 'https://explorer.cronos.org',
  [BuiltInChainId.CRONOS_TESTNET]: 'https://explorer.cronos.org/testnet',
}
