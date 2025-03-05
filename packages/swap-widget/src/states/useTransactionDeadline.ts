import { useEffect, useState, useCallback } from 'react'
import { useWidgetWallet } from './wallet'
import useSettings from './useSettings'

export default function useTransactionDeadline(): bigint {
  const [blockTimestamp, setBlockTimestamp] = useState<number>(0)

  const { deadline } = useSettings()

  const walletContext = useWidgetWallet()
  const { provider } = walletContext

  const getBlockTimestamp = useCallback(async () => {
    const now = Date.now() / 1000 // get the seconds

    if (!provider) return now

    const blockNumber = await provider.getBlockNumber()
    const block = await provider.getBlock(blockNumber)

    return block?.timestamp ?? now
  }, [provider])

  useEffect(() => {
    getBlockTimestamp().then((ts) => setBlockTimestamp(ts))
  }, [getBlockTimestamp])

  return BigInt(Math.floor(blockTimestamp + deadline))
}
