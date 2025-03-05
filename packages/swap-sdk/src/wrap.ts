import type { BaseContract, ContractTransactionResponse } from 'ethers'

import { WCRO as WCROABI } from './abis'
import { getContract } from './utils/getContract'
import type { SignerOrProvider } from './types'
import { getWrappedNativeTokenInfo } from './utils/nativeWrappedToken'

type Override = {
  value?: bigint
  gasPrice?: number | bigint
}

interface WCROContractTypes extends BaseContract {
  deposit: (overrides?: Override) => Promise<ContractTransactionResponse>
  withdraw: (amount: string | number | bigint, overrides?: Override) => Promise<ContractTransactionResponse>
}

export async function wrap(chainId: number, signer: SignerOrProvider, overrides?: Override) {
  const wrappedNativeTokenInfo = getWrappedNativeTokenInfo(chainId)

  const contract = getContract<WCROContractTypes>(wrappedNativeTokenInfo.address, WCROABI, signer)

  return contract.deposit(overrides)
}

export async function unwrap(
  amount: string | number | bigint,
  chainId: number,
  signer: SignerOrProvider,
  overrides: Override,
) {
  const wrappedNativeTokenInfo = getWrappedNativeTokenInfo(chainId)

  const contract = getContract<WCROContractTypes>(wrappedNativeTokenInfo.address, WCROABI, signer)

  return contract.withdraw(amount, overrides)
}
