import type { InterfaceAbi } from "ethers";
import { BaseContract } from "ethers";

import type { SignerOrProvider } from "../types";

/**
 * @param chainId the chain on which the contract is deployed
 * @param address the contract address
 * @param abi the contract abi
 * @param SignerOrProvider signer is required when you need to write to the contract.
 * @returns the contract instance
 */
export function getContract<T extends BaseContract = BaseContract>(
  address: string,
  abi: InterfaceAbi,
  signerOrProvider?: SignerOrProvider,
): T {
  return new BaseContract(address, abi, signerOrProvider) as T;
}
