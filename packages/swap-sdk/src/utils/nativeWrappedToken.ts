import type { ChainConfig, NativeOrTokenInfo, TokenInfo } from '../types'
import { CHAIN_CONFIGS } from '../config'
import { IncompleteChainConfigError } from '../errors'

export function getNativeTokenInfo(nativeTokenChainId: number, chainConfig?: ChainConfig): NativeOrTokenInfo {
  const nativeTokenInfo = chainConfig?.nativeTokenInfo ?? CHAIN_CONFIGS[nativeTokenChainId]?.nativeTokenInfo
  if (!nativeTokenInfo) throw new IncompleteChainConfigError(nativeTokenChainId, chainConfig)
  return nativeTokenInfo
}

export function getWrappedNativeTokenInfo(nativeTokenChainId: number, chainConfig?: ChainConfig): TokenInfo {
  const nativeTokenInfo = chainConfig?.wrappedTokenInfo ?? CHAIN_CONFIGS[nativeTokenChainId]?.wrappedTokenInfo
  if (!nativeTokenInfo) throw new IncompleteChainConfigError(nativeTokenChainId, chainConfig)
  return nativeTokenInfo
}
