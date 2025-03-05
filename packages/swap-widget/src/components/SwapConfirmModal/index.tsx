import { useMemo } from 'react'
import { Button } from '../Button'
import { Fraction } from 'bi-fraction'

import Modal from '../Modal'
import { TokenConfig } from '@config/tokens'
import { TokenAmount, Trade } from '@vvs-finance/swap-sdk'
import { TokenLogo } from '@components/TokenLogo'

export interface SwapConfirmModalProps {
  isOpen: boolean
  onClose: VoidFunction
  handleConfirmSwap: VoidFunction
  inputToken: Undefined<TokenConfig>
  outputToken: Undefined<TokenConfig>
  inputAmount: string
  outputAmount: string
  priceImpact: Fraction
  tradeData: Undefined<Trade>
  tradeTypeLabel: string
  getMinReceivedOrMaxSold: NullUndefined<TokenAmount>
}

function SwapConfirmModal({
  tradeTypeLabel,
  getMinReceivedOrMaxSold,
  inputAmount,
  inputToken,
  outputAmount,
  outputToken,
  tradeData,
  isOpen,
  priceImpact,
  onClose,
  handleConfirmSwap,
}: SwapConfirmModalProps) {
  const inputTokenSymbol = useMemo(() => inputToken?.symbol ?? '', [inputToken])
  const outputTokenSymbol = useMemo(() => outputToken?.symbol ?? '', [outputToken])

  return (
    <Modal title="Confirm Swap" isOpen={isOpen} onClose={onClose}>
      <div className="mb-3">
        <p className="text-sm font-normal mb-3">You Pay</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-xl">
            <TokenLogo tokenConfig={inputToken} />
            <div>{inputAmount}</div>
          </div>

          <div className="flex items-center gap-3 text-xl">{inputTokenSymbol}</div>
        </div>
      </div>

      <div className="border-t border-primaryLight w-full my-8" />

      <div className="mb-3">
        <p className="text-sm font-normal mb-3">You Receive</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-xl">
            <TokenLogo tokenConfig={outputToken} />
            <div>{outputAmount}</div>
          </div>

          <div className="flex items-center gap-3 text-xl">{outputTokenSymbol}</div>
        </div>
      </div>

      <div className="text-darkGray text-sm my-8">You will pay at most TODO CRO or the transaction will revert.</div>

      <div className="flex flex-col gap-[6px] bg-primaryLight p-[18px] rounded-[18px]">
        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-darkGray">Price</span>
          <span className="text-sm font-normal text-black">
            {tradeData &&
              new Fraction(tradeData.price.denominator).div(tradeData.price.numerator).toFixed(6, {
                trailingZeros: false,
              })}{' '}
            {inputTokenSymbol} per {outputTokenSymbol}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-darkGray">{tradeTypeLabel}</span>
          <span className="text-sm font-normal text-black">
            {getMinReceivedOrMaxSold?.amount.toFixed(6, {
              trailingZeros: false,
            })}

            {getMinReceivedOrMaxSold?.symbol}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-darkGray">Price Impact</span>

          <span className="text-sm font-normal text-black">
            {priceImpact.lt(0.01) ? '<0.01%' : priceImpact?.toFixed(2, { trailingZeros: false }) + '%'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-normal text-darkGray">Liquidity Provider Fee</span>

          <span className="text-sm font-normal text-black">
            {tradeData?.lpFee.amount.toFixed(6, { trailingZeros: false })} {tradeData?.lpFee.symbol}
          </span>
        </div>
      </div>

      <Button
        onClick={handleConfirmSwap}
        className="w-full py-[18px] px-6 rounded-[18px] bg-primary text-white text-base mt-9 font-semibold"
      >
        Confirm Swap
      </Button>
    </Modal>
  )
}

export default SwapConfirmModal
