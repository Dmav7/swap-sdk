import { BuiltInChainId, SwapSDK } from '@vvs-finance/swap-sdk'
import { CHAIN_PROVIDER_OPTIONS } from '../config/chains'

const genSDK = (chainId: BuiltInChainId) => {
  return new SwapSDK({
    providerOptions: CHAIN_PROVIDER_OPTIONS[chainId],
  })
}

const sdkByChain: Partial<Record<BuiltInChainId, SwapSDK>> = {}

export const getSDK = (chainId: BuiltInChainId) => {
  if (!sdkByChain[chainId]) {
    sdkByChain[chainId] = genSDK(chainId)
  }
  return sdkByChain[chainId]
}
