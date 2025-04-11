import LoadingDiamond from '@icons/loadingDiamond.gif'
import Warning from '@icons/Warning.svg?react'

export interface TransactionPendingProps {
  text?: string
}

export default function TransactionPending({ text }: TransactionPendingProps) {
  return (
    <div className="flex flex-col items-center">
      <img src={LoadingDiamond} alt="loading" className="w-[116px] mt-6" />
      <h2 className="text-[28px] font-normal mt-3">Waiting for confirmation</h2>
      {text && <div className="text-base text-darkGray font-normal mt-1">{text}</div>}

      <div className="flex items-center p-[18px] rounded-2xl mt-4 bg-primaryLight">
        <Warning />
        <span className="text-xs font-medium">Please do not close the window or refresh the page</span>
      </div>
    </div>
  )
}
