import { approveIfNeeded, fetchTradeInputTokenAllowanceWei, Trade } from '@vvs-finance/swap-sdk'
import useSWR from 'swr/immutable'
import { useWidgetWallet } from './wallet'
import { useState, useMemo } from 'react'
import { TransactionResponse } from 'ethers'

interface Erc20ApprovalState {
  isApprovalLoading: boolean
  isApproving: boolean
  isApprovalNeeded: boolean
  approve: () => Promise<TransactionResponse | undefined>
}

export function useErc20Approval(trade?: Trade): Erc20ApprovalState {
  const { account, supportedChainId, signer } = useWidgetWallet()
  const [isApproving, setIsApproving] = useState(false)

  const {
    data: allowance,
    mutate,
    isLoading,
  } = useSWR(
    trade &&
      account &&
      supportedChainId &&
      signer && ['erc20-allowance', account, supportedChainId, trade.amountIn.address],
    async () => {
      if (!trade || !account || !supportedChainId) return null

      try {
        return fetchTradeInputTokenAllowanceWei(supportedChainId, trade, account, { provider: signer })
      } catch (error) {
        console.error('Error checking for approval:', error)
        return null
      }
    },
  )

  return useMemo(() => {
    if (!trade || !signer) {
      return {
        isApprovalLoading: false,
        isApproving: false,
        isApprovalNeeded: false,
        approve: async () => undefined,
      }
    }

    const amount = BigInt(trade.amountIn.amount.shl(trade.amountIn.decimals).toFixed(0))
    const isApprovalNeeded = typeof allowance === 'bigint' ? amount > allowance : false
    const approve = async () => {
      try {
        setIsApproving(true)
        const tx = await approveIfNeeded(supportedChainId, trade, signer)

        if (tx) {
          await tx.wait()
          await mutate()
          return tx
        }
      } catch (error) {
        console.error('Error approving token:', error)
        throw error
      } finally {
        setIsApproving(false)
      }
    }

    return {
      isApprovalLoading: isLoading,
      isApproving,
      isApprovalNeeded,
      approve,
    }
  }, [trade, allowance, signer, mutate, isLoading, isApproving])
}
