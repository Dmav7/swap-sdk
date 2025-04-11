import type { Signer, TransactionRequest } from 'ethers'

import { WCRO as WCROABI } from './abis'
import { getContract } from './utils/getContract'
import type { WCRO } from './types'
import { getWrappedNativeTokenInfo } from './utils/nativeWrappedToken'

interface NativeWrappingOpts {
  gasPrice?: number | bigint
}

export function prepareWrapNativeTxRequest(chainId: number, amount: string | number | bigint): TransactionRequest {
  const wrappedNativeTokenInfo = getWrappedNativeTokenInfo(chainId)

  const contract = getContract<WCRO>(wrappedNativeTokenInfo.address, WCROABI, chainId)

  return {
    to: wrappedNativeTokenInfo.address,
    data: contract.interface.encodeFunctionData('deposit'),
    value: BigInt(amount),
  }
}

export async function wrapNative(
  chainId: number,
  amount: string | number | bigint,
  signer: Signer,
  opts?: NativeWrappingOpts,
) {
  return signer.sendTransaction({
    ...prepareWrapNativeTxRequest(chainId, amount),
    gasPrice: opts?.gasPrice,
  })
}

export function prepareUnwrapNativeTxRequest(chainId: number, amount: string | number | bigint): TransactionRequest {
  const wrappedNativeTokenInfo = getWrappedNativeTokenInfo(chainId)

  const contract = getContract<WCRO>(wrappedNativeTokenInfo.address, WCROABI, chainId)

  return {
    to: wrappedNativeTokenInfo.address,
    data: contract.interface.encodeFunctionData('withdraw', [amount]),
  }
}

export async function unwrapNative(
  chainId: number,
  amount: string | number | bigint,
  signer: Signer,
  opts?: NativeWrappingOpts,
) {
  return signer.sendTransaction({
    ...prepareUnwrapNativeTxRequest(chainId, amount),
    gasPrice: opts?.gasPrice,
  })
}
