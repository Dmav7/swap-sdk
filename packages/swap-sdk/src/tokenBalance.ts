import { BuiltInChainId, ERC20 } from './types'
import { ERC20 as ERC20ABI } from './abis'
import { getContract, getProvider } from './utils'
import { NATIVE_TOKEN_ID } from './fetchBestTrade'
import { Provider } from 'ethers'

export async function fetchTokenBalanceWei(
  chainId: BuiltInChainId,
  tokenAddress: string,
  walletAddress: string,

  provider?: Provider,
) {
  if (tokenAddress === NATIVE_TOKEN_ID) {
    return fetchNativeTokenBalanceWei(chainId, walletAddress, provider)
  }

  const erc20 = getContract<ERC20>(tokenAddress, ERC20ABI, provider ?? chainId)
  return erc20.balanceOf(walletAddress)
}

export async function fetchNativeTokenBalanceWei(
  chainId: BuiltInChainId,
  walletAddress: string,

  providerArg?: Provider,
) {
  const provider = providerArg ?? getProvider(chainId)
  if (!provider) {
    throw new Error('fetchTokenBalance: no provider to fetch nativeToken balance')
  }

  return provider.getBalance(walletAddress)
}
