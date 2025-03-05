import type { BaseContract, ContractTransactionResponse, ContractTransactionReceipt } from 'ethers'

import { ERC20 as ERC20ABI } from '../abis'
import { getContract } from '../utils/getContract'
import type { SignerOrProvider } from '../types'

interface ERC20ContractTypes extends BaseContract {
  approve: (spender: string, amount: bigint) => Promise<ContractTransactionResponse>
  allowance: (owner: string, spender: string) => Promise<bigint>
}

export async function approve(
  tokenAddress: string,
  spender: string,
  amount: bigint,
  signer: SignerOrProvider,
): Promise<ContractTransactionReceipt | null> {
  const contract = getContract<ERC20ContractTypes>(tokenAddress, ERC20ABI, signer)

  const tx = await contract.approve(spender, amount)

  const reciept = await tx?.wait()

  return reciept
}

export async function allowance(
  tokenAddress: string,
  owner: string,
  spender: string,
  signer: SignerOrProvider,
): Promise<bigint> {
  const contract = getContract<ERC20ContractTypes>(tokenAddress, ERC20ABI, signer)

  return contract.allowance(owner, spender)
}
