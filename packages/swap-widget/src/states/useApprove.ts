import { useCallback, useMemo } from 'react'
import { approve, CHAIN_CONFIGS } from '@vvs-finance/swap-sdk'
import { MaxInt256 } from 'ethers'

import { useWidgetWallet } from '@states/wallet'

const useApprove = (tokenAddress: string) => {
  const { signer, chainId } = useWidgetWallet()

  const spenderAddress = useMemo(
    () => (chainId ? CHAIN_CONFIGS[chainId]?.contractAddresses.smartRouter : ''),
    [chainId],
  )

  const getApprove = useCallback(async () => {
    if (tokenAddress === 'NATIVE' || !signer || !spenderAddress) return null

    await approve(tokenAddress, spenderAddress, MaxInt256, signer)
  }, [tokenAddress, spenderAddress, signer])

  return { getApprove }
}

export default useApprove
