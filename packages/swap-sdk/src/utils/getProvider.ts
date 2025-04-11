import { JsonRpcProvider } from 'ethers'
import type { BuiltInChainId } from '../types'
import { CHAIN_PROVIDER_OPTIONS } from '../config'

export interface ProviderOptions {
  chainName: string
  chainId: number
  rpcUrl: string
}

export function createProvider(providerOptions: ProviderOptions): JsonRpcProvider {
  const { chainName, chainId, rpcUrl } = providerOptions

  return new JsonRpcProvider(rpcUrl, {
    name: chainName,
    chainId,
  })
}

/**
 * providers are created and cached in a record with the
 *  chainId as the access key
 */
const providerMap = new Map<number, JsonRpcProvider>()

export function getProvider(builtInChainIdOrProviderOptions: BuiltInChainId | ProviderOptions) {
  const providerOptions =
    typeof builtInChainIdOrProviderOptions === 'number'
      ? CHAIN_PROVIDER_OPTIONS[builtInChainIdOrProviderOptions]
      : builtInChainIdOrProviderOptions
  if (!providerOptions) {
    console.warn(`getProvider: no providerOptions with ${JSON.stringify(builtInChainIdOrProviderOptions)}`)
    return null
  }
  const { chainId } = providerOptions

  if (!providerMap.has(chainId)) {
    const provider = createProvider(providerOptions)
    providerMap.set(chainId, provider)
  }
  return providerMap.get(chainId)!
}
