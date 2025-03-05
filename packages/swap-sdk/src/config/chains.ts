import { BuiltInChainId, ChainConfig } from '../types'

export const CHAIN_CONFIGS: Record<number, ChainConfig> = {
  [BuiltInChainId.CRONOS_MAINNET]: {
    nativeTokenInfo: {
      address: 'NATIVE',
      symbol: 'WCRO',
      decimals: 18,
    },
    wrappedTokenInfo: {
      address: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
      symbol: 'WCRO',
      decimals: 18,
    },
    contractAddresses: {
      smartRouter: '0x66C0893E38B2a52E1Dc442b2dE75B802CcA49566',
    },
  },
  [BuiltInChainId.CRONOS_TESTNET]: {
    nativeTokenInfo: {
      address: 'NATIVE',
      symbol: 'WCRO',
      decimals: 18,
    },
    wrappedTokenInfo: {
      address: '0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4',
      symbol: 'WCRO',
      decimals: 18,
    },
    contractAddresses: {
      smartRouter: '0xC74C960708f043E04a84038c6D1136EA7Fcb16a1',
    },
  },
} satisfies Record<BuiltInChainId, ChainConfig>
