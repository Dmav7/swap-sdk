import type { InterfaceAbi } from 'ethers'
import { BaseContract } from 'ethers'

import type { BuiltInChainId, SignerOrProvider } from '../types'
import { getProvider } from './getProvider'

/**
 * @param chainId the chain on which the contract is deployed
 * @param address the contract address
 * @param abi the contract abi
 * @param chainIdOrSignerOrProvider signer is required when you need to write to the contract.
 * @returns the contract instance
 */
export function getContract<T extends BaseContract = BaseContract>(
  address: string,
  abi: InterfaceAbi,
  chainIdOrSignerOrProvider?: BuiltInChainId | SignerOrProvider,
): T {
  const signerOrProvider =
    typeof chainIdOrSignerOrProvider === 'number' ? getProvider(chainIdOrSignerOrProvider) : chainIdOrSignerOrProvider

  return new BaseContract(address, abi, signerOrProvider) as T
}
