import { JsonRpcProvider } from "ethers";

import type { SupportedChainId } from "../types";

export interface ProviderOptions {
  chainName: string;
  chainId: SupportedChainId;
  rpcUrl: string;
  ensAddress?: string;
  wsUrl?: string;
}

export function createProvider(
  providerOptions: ProviderOptions,
): JsonRpcProvider {
  const { chainName, chainId, rpcUrl } = providerOptions;

  return new JsonRpcProvider(rpcUrl, {
    name: chainName,
    chainId,
  });
}

export function createWsProvider(
  providerOptions: ProviderOptions,
): JsonRpcProvider {
  const { chainName, chainId, wsUrl } = providerOptions;

  if (!wsUrl) throw new Error(`must wsUrl wsUrl`);

  return new JsonRpcProvider(wsUrl, {
    name: chainName,
    chainId,
  });
}

/**
 * providers are created and cached in a record with the
 *  chainId as the access key
 */
type ProviderMap = Map<SupportedChainId, JsonRpcProvider>;
const providerMap: ProviderMap = new Map<SupportedChainId, JsonRpcProvider>();

export function getProvider(providerOptions: ProviderOptions): JsonRpcProvider {
  const chainId = providerOptions.chainId;

  if (!providerMap.get(chainId)) {
    const provider = createProvider(providerOptions);
    providerMap.set(chainId, provider);
  }
  return providerMap.get(chainId)!;
}
