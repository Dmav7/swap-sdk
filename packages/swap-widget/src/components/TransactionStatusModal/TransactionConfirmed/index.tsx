import Submitted from '@icons/Submitted.svg?react'
import useChainProviderOptions from '@hooks/useChainProviderOptions'

export interface TransactionConfirmedProps {
  txHash: string
}

export default function TransactionConfirmed({ txHash }: TransactionConfirmedProps) {
  const { chainExplorerBaseUrl, chainProviderOptions } = useChainProviderOptions()

  return (
    <div className="flex flex-col items-center">
      <Submitted width={114} height={100} />

      <h2 className="text-[28px] font-normal mt-3">Transaction submitted</h2>

      <a
        href={`${chainExplorerBaseUrl}/tx/${txHash}`}
        target="_blank"
        rel="noreferrer"
        className="text-base text-primary"
      >
        View on {chainProviderOptions.chainName}
      </a>
    </div>
  )
}
