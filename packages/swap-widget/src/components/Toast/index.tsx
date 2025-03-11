import { useMemo } from 'react'
import clsx from 'clsx'

import Yes from '@icons/Yes.svg?react'
import No from '@icons/No.svg?react'
import Close from '@icons/Close.svg?react'
import useChainProviderOptions from '@hooks/useChainProviderOptions'

export interface ToastProps {
  isOpen: boolean
  onClose: VoidFunction
  status: 'success' | 'fail'
  text?: string
  txHash?: string
  errorMessage?: string
}

export default function Toast({ isOpen, onClose, status, txHash, text, errorMessage }: ToastProps) {
  const isSuccess = useMemo(() => status === 'success', [status])
  const { chainExplorerBaseUrl, chainProviderOptions } = useChainProviderOptions()

  return (
    <div
      className={clsx(
        'fixed top-4 min-w-[301px] max-w-[344px] h-[112px] rounded-xl flex transition-all duration-300 bg-white',
        isOpen ? 'right-14' : 'right-[100px] opacity-0',
      )}
    >
      <div className={clsx('flex items-center px-3 w-[42px] h-full rounded-l-xl', isSuccess ? 'bg-green' : 'bg-red')}>
        {isSuccess ? <Yes width={18} height={12} /> : <No width={18} height={18} />}
      </div>

      <div className="flex flex-col gap-2 justify-start w-full p-[18px]">
        <div className="w-full h-fit flex justify-between items-center">
          <div className="text-sm font-bold">Transaction completed</div>
          <Close className="cursor-pointer" onClick={onClose} />
        </div>

        {isSuccess ? (
          <>
            <div className="text-darkGray text-sm">{text}</div>

            <a
              href={`${chainExplorerBaseUrl}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-base text-primary"
            >
              View on {chainProviderOptions.chainName}
            </a>
          </>
        ) : (
          <div className="text-darkGray text-sm overflow-hidden">{errorMessage}</div>
        )}
      </div>
    </div>
  )
}
