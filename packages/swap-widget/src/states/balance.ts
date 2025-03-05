import useSWR from 'swr/immutable'
import { QUERY_KEYS } from '../consts'
import { useWidgetWallet } from './wallet'
import { Fraction } from 'bi-fraction'
import { CHAIN_CONFIGS, NATIVE_TOKEN_ID } from '@vvs-finance/swap-sdk'
import { getSDK } from './sdk'

export function useTokenBalance(addressOrNative: string, decimals?: number) {
  const { supportedChainId, account, signer } = useWidgetWallet()
  return useSWR<Fraction>([QUERY_KEYS.BALANCE, supportedChainId, account, addressOrNative], async () => {
    if (!account || !signer || !addressOrNative) return Fraction.ZERO

    if (addressOrNative === NATIVE_TOKEN_ID) {
      const nativeBalance = await signer.provider.getBalance(account)
      const nativeToken = CHAIN_CONFIGS[supportedChainId].nativeTokenInfo
      return new Fraction(nativeBalance).shr(decimals ?? nativeToken.decimals)
    }

    const erc20Contract = getSDK(supportedChainId).getERC20(addressOrNative, signer)
    const [erc20Balance, erc20Decimals] = await Promise.all([
      erc20Contract.balanceOf(account),
      decimals ?? erc20Contract.decimals(),
    ])
    return new Fraction(erc20Balance).shr(Number(erc20Decimals))
  })
}
