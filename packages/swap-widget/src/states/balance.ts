import useSWR from 'swr/immutable'
import { Fraction } from 'bi-fraction'
import { fetchTokenBalanceWei } from '@vvs-finance/swap-sdk'
import { TokenConfig } from '@config/tokens'
import { QUERY_KEYS } from '../consts'
import { useWidgetWallet } from './wallet'

export function useTokenBalance(tokenConfig?: TokenConfig) {
  const { supportedChainId, account, signer } = useWidgetWallet()
  return useSWR<Fraction>([QUERY_KEYS.BALANCE, supportedChainId, account, tokenConfig?.address], async () => {
    if (!account || !signer || !tokenConfig) return Fraction.ZERO

    return new Fraction(await fetchTokenBalanceWei(supportedChainId, tokenConfig.address, account)).shr(
      Number(tokenConfig.decimals),
    )
  })
}
