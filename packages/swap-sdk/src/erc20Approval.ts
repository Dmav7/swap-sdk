import { MaxInt256, Signer, TransactionRequest, TransactionResponse } from 'ethers'
import { BuiltInChainId, ERC20, SignerOrProvider, Trade } from './types'
import { CHAIN_CONFIGS } from './config'
import { ERC20 as ERC20ABI } from './abis'
import { getContract } from './utils/getContract'
import { tokenAmountToWei } from './utils/tokenAmountToWei'

interface FetchAllowanceOpts {
  /**
   * defaults to smartRouter
   */
  spender?: string
  provider?: SignerOrProvider
}

export async function fetchTradeInputTokenAllowanceWei(
  chainId: BuiltInChainId,
  trade: Trade,
  walletAddress: string,
  opts?: FetchAllowanceOpts,
) {
  if (trade.amountIn.address === 'NATIVE') {
    return MaxInt256
  }

  const tokenAddress = trade.amountIn.address
  const spenderAddress = getSmartRouterAddrAsSpender(chainId, opts?.spender)
  const erc20 = getContract<ERC20>(tokenAddress, ERC20ABI, opts?.provider ?? chainId)
  return erc20.allowance(walletAddress, spenderAddress)
}

/**
 * returns `Promise<ContractTransaction>` if ERC20 approval is required, otherwise `Promise<null>`
 */
export async function prepareApprovalTxRequestIfNeeded(
  chainId: BuiltInChainId,
  trade: Trade,
  walletAddress: string,
  opts?: FetchAllowanceOpts,
): Promise<TransactionRequest | null> {
  const tokenAddress = trade.amountIn.address
  const spenderAddress = getSmartRouterAddrAsSpender(chainId, opts?.spender)

  const erc20 = getContract<ERC20>(tokenAddress, ERC20ABI, opts?.provider ?? chainId)
  const currentAllowance = await fetchTradeInputTokenAllowanceWei(chainId, trade, walletAddress, opts)
  const amount = tokenAmountToWei(trade.amountIn)

  if (currentAllowance >= amount) {
    return null
  }

  return {
    to: tokenAddress,
    data: erc20.interface.encodeFunctionData('approve', [spenderAddress, amount]),
  }
}

/**
 * sends approval tx and returns `Promise<TransactionResponse>` if ERC20 approval is required, otherwise `Promise<null>`
 */
export async function approveIfNeeded(
  chainId: BuiltInChainId,
  trade: Trade,
  signer: Signer,
  opts?: Omit<FetchAllowanceOpts, 'provider'> & {
    gasPrice?: number | bigint
  },
): Promise<TransactionResponse | null> {
  const walletAddress = await signer.getAddress()
  const approveTxRequest = await prepareApprovalTxRequestIfNeeded(chainId, trade, walletAddress, {
    ...opts,
    provider: signer,
  })

  if (!approveTxRequest) {
    return null
  }
  return signer.sendTransaction({
    ...approveTxRequest,
    gasPrice: opts?.gasPrice,
  })
}

function getSmartRouterAddrAsSpender(chainId: BuiltInChainId, spender?: string) {
  const spenderAddress = spender ?? CHAIN_CONFIGS[chainId]?.contractAddresses.smartRouter
  if (!spenderAddress) {
    throw new Error(`No spender address found for chain ${chainId}`)
  }
  return spenderAddress
}
