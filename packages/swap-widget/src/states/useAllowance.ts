import { useMemo, useCallback, useEffect, useState } from 'react'
import { allowance, CHAIN_CONFIGS } from '@vvs-finance/swap-sdk'

import { useWidgetWallet } from '@states/wallet'

const useAllowance = (tokenAddress: string) => {
  const [allowanceAmount, setAllowanceAmount] = useState<Null<bigint>>(null)
  const { account, signer, chainId } = useWidgetWallet()

  const spenderAddress = useMemo(
    () => (chainId ? CHAIN_CONFIGS[chainId]?.contractAddresses.smartRouter : ''),
    [chainId],
  )

  const getAllowance = useCallback(async () => {
    if (tokenAddress === 'NATIVE' || !spenderAddress) return null

    if (tokenAddress && tokenAddress !== 'NATIVE' && account && signer && spenderAddress) {
      const allowanceRes = await allowance(tokenAddress, account, spenderAddress, signer)

      return allowanceRes
    }

    return null
  }, [tokenAddress, account, signer, spenderAddress])

  useEffect(() => {
    getAllowance().then((res) => setAllowanceAmount(res))
  }, [getAllowance])

  return { getAllowance, allowanceAmount }
}

export default useAllowance
