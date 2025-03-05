import { CHAIN_EXPLORER_BASE_URL, CHAIN_PROVIDER_OPTIONS } from '@config/chains'
import Submitted from '@icons/Submitted.svg?react'
import { useWidgetWallet } from '@states/wallet'

export interface TransactionConfirmedProps {
  txHash: string
}

export default function TransactionConfirmed({ txHash }: TransactionConfirmedProps) {
  const { supportedChainId } = useWidgetWallet()

  return (
    <div className="flex flex-col items-center">
      <Submitted width={114} height={100} />

      <h2 className="text-[28px] font-normal mt-3">Transaction submitted</h2>

      <a
        href={`${CHAIN_EXPLORER_BASE_URL[supportedChainId]}/tx/${txHash}`}
        target="_blank"
        rel="noreferrer"
        className="text-base text-primary"
      >
        View on {CHAIN_PROVIDER_OPTIONS[supportedChainId].chainName}
      </a>
    </div>
  )
}
